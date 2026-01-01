import { digestModel } from './gemini';
import { DigestResult } from './types';

export async function digestCommit(diff: string): Promise<DigestResult> {
    const prompt = `
    You are the digestive system of a digital pet that feeds on code.
    Analyze the following git diff as "food".
    
    Code Diff:
    ${diff.substring(0, 30000)} // Limit context if needed, though 1.5 Pro has large window
    
    Return a JSON object with this exact schema:
    {
      "codeCleanliness": number, // 0-10
      "complexity": number, // 0-10
      "flavor": string, // e.g., "Spicy TypeScript refactor"
      "nutritionalValue": number, // 0-100 score
      "summary": string // 1 sentence stomach comment
    }
  `;

    try {
        const result = await digestModel.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" } // Force JSON mode
        });

        const response = result.response;
        return JSON.parse(response.text());
    } catch (error) {
        console.error("Indigestion error:", error);
        // Return bland fallback food
        return {
            codeCleanliness: 5,
            complexity: 1,
            flavor: "Unidentifiable mush",
            nutritionalValue: 10,
            summary: "I couldn't really taste that..."
        };
    }
}
