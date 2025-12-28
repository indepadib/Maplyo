import { NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/ai/openai";

export async function POST(req: Request) {
    try {
        const { messages, guideContext } = await req.json();

        if (!messages || !guideContext) {
            return NextResponse.json({ error: "Missing messages or context" }, { status: 400 });
        }

        const openai = getOpenAIClient();

        // Create a system prompt that injects the guide data
        const systemPrompt = `
You are a helpful, polite, and knowledgeable concierge for a vacation rental property.
The guest is asking questions. You have access to the full guide content below.
Answer their questions accurately based ONLY on the provided guide information.
If the information is not in the guide, politely say you don't have that specific information but they can contact the host.
Be concise and friendly.

GUIDE DATA:
${JSON.stringify(guideContext)}
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                ...messages.slice(-5) // Keep last 5 messages for context
            ],
            temperature: 0.5,
            max_tokens: 300,
        });

        const reply = response.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error("AI Chat Error:", error);
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }
}
