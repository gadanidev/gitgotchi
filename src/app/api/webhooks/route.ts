import { NextRequest, NextResponse } from 'next/server';
import { verifySignature, fetchDiff } from '@/lib/github';
import { digestCommit } from '@/lib/digestion';
import { updatePetState } from '@/lib/db';
import { PetState, Mood } from '@/lib/types';

export async function POST(req: NextRequest) {
    const bodyText = await req.text();
    const signature = req.headers.get('x-hub-signature-256');
    const secret = process.env.GITHUB_WEBHOOK_SECRET;

    if (!secret) {
        return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    if (!signature || !(await verifySignature(bodyText, signature, secret))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = JSON.parse(bodyText);
    const commits = payload.commits || [];

    if (commits.length === 0) {
        return NextResponse.json({ message: 'No commits to process' });
    }

    // Process last 3 commits to ensure responsiveness
    const recentCommits = commits.slice(-3);
    let digestedCount = 0;

    for (const commit of recentCommits) {
        const diffUrl = commit.url + '.diff';
        const diff = await fetchDiff(diffUrl);

        if (!diff) {
            console.log(`No diff found for ${commit.id}`);
            continue;
        }

        console.log(`Digesting commit ${commit.id}...`);
        const digestion = await digestCommit(diff);

        await updatePetState((state: PetState) => {
            // Health calc
            let newHealth = state.health + (digestion.codeCleanliness >= 7 ? 5 : -5);
            // Cap health
            newHealth = Math.min(100, Math.max(0, newHealth));

            // Hunger
            const newHunger = Math.max(0, state.hunger - 20);

            // Mood logic
            let newMood: Mood = state.mood;
            if (newHealth < 30) newMood = 'sick';
            else if (digestion.codeCleanliness < 4) newMood = 'angry';
            else if (digestion.summary.toLowerCase().includes('great') || newHealth > 80) newMood = 'happy';
            else newMood = 'neutral';

            // Level XP (Cleanliness * Complexity)
            const xpGain = Math.round((digestion.codeCleanliness * digestion.complexity) / 10);

            return {
                ...state,
                health: newHealth,
                hunger: newHunger,
                mood: newMood,
                // Add rudimentary leveling
                level: state.level + (xpGain > 5 ? 1 : 0),
                lastFedAt: new Date().toISOString(),
                history: [
                    ...state.history,
                    {
                        id: commit.id,
                        type: 'commit' as const,
                        content: commit.message,
                        timestamp: commit.timestamp,
                        analysis: digestion
                    }
                ].slice(-20) // Keep last 20 instructions
            };
        });
        digestedCount++;
    }

    return NextResponse.json({ message: `Digested ${digestedCount} commits` });
}
