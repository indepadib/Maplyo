import { createOpenAIClient } from '@/lib/ai/openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const openai = createOpenAIClient();
        if (!openai) {
            return NextResponse.json({ error: 'OpenAI configuration missing' }, { status: 500 });
        }
        const { text, targetLang } = await req.json();

        if (!text || !targetLang) {
            return NextResponse.json({ error: 'Missing text or targetLang' }, { status: 400 });
        }

        // Limit length to prevent abuse/cost
        if (text.length > 2000) {
            return NextResponse.json({ error: 'Text too long' }, { status: 400 });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a professional translator for a luxury travel guidebook. Translate the following text into ${targetLang}. 
                    CRITICAL: Return ONLY the translated text. No explanations, no conversational filler, no "Here is the translation". 
                    If the input is a single word or short phrase, keep it as a single word or short phrase. 
                    Keep the tone professional and welcoming.`
                },
                {
                    role: "user",
                    content: text
                }
            ],
            temperature: 0.3,
            max_tokens: 1000,
        });

        const translatedText = completion.choices[0].message.content;

        return NextResponse.json({ translatedText });
    } catch (error) {
        console.error('Translation error:', error);
        return NextResponse.json({ error: 'Failed to translate' }, { status: 500 });
    }
}
