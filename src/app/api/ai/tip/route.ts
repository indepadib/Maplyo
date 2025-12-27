import { NextRequest, NextResponse } from "next/server";
import { createOpenAIClient, cleanAIJSON } from "@/lib/ai/openai";

export async function POST(request: NextRequest) {
    try {
        const { city, lang, weather } = await request.json();

        const openai = createOpenAIClient();
        if (!openai) {
            return NextResponse.json({ error: "No API Key" }, { status: 500 });
        }

        const prompt = `
        You are a local expert for ${city || "this city"}.
        Generate a "Tip of the Day" for a visitor.
        Context:
        - Date: ${new Date().toLocaleDateString()}
        - Weather: ${weather || "Normal"}
        - Language: ${lang || "en"} (Output strictly in this language)

        Requirements:
        1. BE SPECIFIC: Name a real restaurant, museum, park, or event. Do NOT say "visit a local museum", say "Visit the Louvre".
        2. BE TIMELY: If it's raining, suggest an indoor activity. If it's generic, you fail.
        3. BE BRIEF: 2 sentences max.

        Output JSON:
        {
            "title": "Specific Topic (e.g. Visit [Place Name])",
            "text": "Specific advice clearly naming the place/activity.",
            "icon": "Sun|Umbrella|Coffee|Camera|MapPin"
        }
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "system", content: prompt }],
            temperature: 0.7,
            max_tokens: 200
        });

        const content = response.choices[0]?.message?.content || "{}";
        const json = cleanAIJSON(content);

        return NextResponse.json(json);

    } catch (error) {
        console.error("Tip Error:", error);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
