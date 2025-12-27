import { NextRequest, NextResponse } from "next/server";
import { createOpenAIClient, cleanAIJSON } from "@/lib/ai/openai";

export async function POST(request: NextRequest) {
    try {
        const { city, blockType } = await request.json();

        const openai = createOpenAIClient();
        if (!openai) {
            return NextResponse.json({ error: "No API Key" }, { status: 500 });
        }

        let prompt = "";
        let structure = "";

        if (blockType === "places") {
            prompt = `List 3 distinct, high-quality restaurants or cafes in ${city}. Mix of local and modern. 
            Detailed descriptions (1 sentence). Real addresses.`;
            structure = `[{ "name": "string", "description": "string", "address": "string", "url": "string" }]`;
        } else if (blockType === "events") {
            prompt = `List 3 upcoming or seasonal events/activities in ${city}. 
            Format dates for next month.`;
            structure = `[{ "title": "string", "description": "string", "location": "string", "month": "JAN", "day": 1, "time": "20:00" }]`;
        } else {
            return NextResponse.json({ error: "Invalid block type" }, { status: 400 });
        }

        const systemPrompt = `
        You are a local expert for ${city}.
        ${prompt}
        Output strictly valid JSON array: ${structure}
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "system", content: systemPrompt }],
            temperature: 0.7,
        });

        const content = response.choices[0]?.message?.content || "[]";
        const json = cleanAIJSON(content);

        return NextResponse.json({ items: json });

    } catch (error) {
        console.error("Block Gen Error:", error);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
