import OpenAI from 'openai';

// Helper to create client only when needed (runtime)
// preventing build-time errors if env var is missing
export const createOpenAIClient = () => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return null; // Handle gracefully in caller

    return new OpenAI({
        apiKey: apiKey,
    });
};

// Helper to clean JSON output from AI (sometimes they add markdown blocks)
export function cleanAIJSON(text: string) {
    let clean = text.trim();
    if (clean.startsWith('```json')) {
        clean = clean.replace(/^```json/, '').replace(/```$/, '');
    } else if (clean.startsWith('```')) {
        clean = clean.replace(/^```/, '').replace(/```$/, '');
    }
    return JSON.parse(clean);
}
