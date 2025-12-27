import OpenAI from 'openai';

// Initialize OpenAI Client
// Requires OPENAI_API_KEY in .env.local
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Only strictly if needed on client, but better keep it server side. 
    // We will use this primarily in server actions/api routes.
});

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
