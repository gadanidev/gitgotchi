export type Mood = 'happy' | 'neutral' | 'sick' | 'angry' | 'dead';

export interface Interaction {
    id: string;
    type: 'commit' | 'chat';
    content: string;
    timestamp: string;
    analysis?: DigestResult;
}

export interface DigestResult {
    codeCleanliness: number; // 0-10
    complexity: number; // 0-10
    flavor: string;
    nutritionalValue: number; // calculated score
    summary: string;
}

export interface PetState {
    name: string;
    level: number;
    health: number; // 0-100
    hunger: number; // 0-100
    mood: Mood;
    lastFedAt: string; // ISO Date
    history: Interaction[];
}
