import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || 'Missing API Key');

export const digestModel = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
export const chatModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
