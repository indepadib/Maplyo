import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { createClient } from "@supabase/supabase-js";

// Lazy initialization for build resilience
const getOpenAIClient = () => {
    return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
    });
};

const getSupabaseAdmin = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
        process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key"
    );
};

export const maxDuration = 60; // Allow up to 60s for multi-language generation

export async function POST(req: Request) {
    try {
        // Secure the endpoint: check for a secret admin key
        const authHeader = req.headers.get("Authorization");
        const adminSecret = process.env.ADMIN_SECRET_KEY;
        
        // In local/dev environments where ADMIN_SECRET_KEY might not be set, allow it.
        // In production, require it.
        if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json().catch(() => ({}));
        const customTopic = body.topic || null;

        const openai = getOpenAIClient();
        const supabase = getSupabaseAdmin();

        const prompt = `You are an SEO copywriter for Airbnb hosts. Write a blog post about: "${customTopic || "a relevant topic for short-term rental hosts (maximizing revenue, digital welcome books, improving guest experience, QR codes for Airbnb, smart automation for hosts)"}".

Target audience: Airbnb hosts, property managers, conciergeries.

Rules:
- Write the full article ONLY in French (fr) and English (en). Each article: 350-450 words max, using semantic HTML tags (h2, h3, p, ul, li, strong). NO markdown code blocks.
- For Spanish (es), Arabic (ar), Dutch (nl), Chinese (zh): provide ONLY "title" and "excerpt" (2 sentences). Set "content" to "".
- The slug must be lowercase French, no accents, no special chars, hyphens only.
- Include 3-4 relevant SEO keywords.

Return ONLY this exact JSON structure, nothing else:
{
  "slug": "french-slug-here",
  "seo_keywords": ["keyword1", "keyword2", "keyword3"],
  "fr": { "title": "...", "excerpt": "...", "content": "<h2>...</h2><p>...</p>" },
  "en": { "title": "...", "excerpt": "...", "content": "<h2>...</h2><p>...</p>" },
  "es": { "title": "...", "excerpt": "...", "content": "" },
  "ar": { "title": "...", "excerpt": "...", "content": "" },
  "nl": { "title": "...", "excerpt": "...", "content": "" },
  "zh": { "title": "...", "excerpt": "...", "content": "" }
}`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
            temperature: 0.7,
            max_tokens: 3000,
        });

        const resultText = response.choices[0].message.content;
        if (!resultText) throw new Error("No content generated");

        const blogData = JSON.parse(resultText);

        const translations = {
            en: blogData.en,
            es: blogData.es,
            ar: blogData.ar,
            nl: blogData.nl,
            zh: blogData.zh
        };

        // Insert into Supabase
        const { data, error } = await supabase
            .from("blog_posts")
            .insert({
                title: blogData.fr.title,
                slug: blogData.slug,
                excerpt: blogData.fr.excerpt,
                content: blogData.fr.content,
                seo_keywords: blogData.seo_keywords,
                translations: translations,
                generated_by_ai: true,
                published_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ error: "Database error", details: error }, { status: 500 });
        }

        return NextResponse.json({ success: true, post: data });

    } catch (err: any) {
        console.error("Generate Blog Error:", err);
        return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
    }
}
