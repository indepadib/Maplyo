import { NextRequest, NextResponse } from "next/server";
import { openai, cleanAIJSON } from "@/lib/ai/openai";

export async function POST(request: NextRequest) {
    try {
        const { city, lang, weather } = await request.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "No API Key" }, { status: 500 });
        }

        const prompt = `
        Generate a "Tip of the Day" for a visitor in ${city || "this city"}.
        Context:
        - Date: ${new Date().toLocaleDateString()}
        - Weather: ${weather || "Normal"}
        - Language: ${lang || "en"}

        Output strictly 2 short sentences:
        1. A specific activity suggestion based on weather/season.
        2. A "Pro Tip" for locals (e.g. transport, food, mannerism).
        
        Format as JSON:
        {
            "title": "Topic (e.g. Rainy Day Art, Sunny Park)",
            "text": "The 2 sentences...",
            "icon": "Sun|Umbrella|Coffee|Camera|MapPin"
        }
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "system", content: prompt }],
            temperature: 0.8,
            max_tokens: 150
        });

        const content = response.choices[0]?.message?.content || "{}";
        const json = cleanAIJSON(content);

        return NextResponse.json(json);

    } catch (error) {
        console.error("Tip Error:", error);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
