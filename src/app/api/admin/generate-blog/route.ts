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

        const prompt = `
        You are an expert SEO copywriter and Airbnb superhost consultant.
        Write a highly engaging, SEO-optimized blog post in French about ${customTopic ? `"${customTopic}"` : "a relevant topic for short-term rental hosts (e.g., maximizing revenue, creating digital welcome books, improving guest experience, local SEO for Airbnb, smart home tech for hosts)"}.
        
        The target audience is Airbnb hosts, property managers, and conciergeries.
        
        Return the result EXACTLY as a JSON object with the following structure, and nothing else:
        {
            "title": "A catchy, SEO-friendly title",
            "slug": "a-clean-url-slug-without-special-chars",
            "excerpt": "A compelling 2-3 sentence meta description for the blog list and SEO.",
            "seo_keywords": ["keyword1", "keyword2", "keyword3"],
            "content": "The full blog post content written in clean, semantic HTML formatting. Do NOT wrap it in \`\`\`html markdown blocks. Use <h2>, <h3>, <p>, <ul>, <li>, and <strong> tags to format the content beautifully. It should be at least 800 words."
        }\`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const resultText = response.choices[0].message.content;
        if (!resultText) throw new Error("No content generated");

        const blogData = JSON.parse(resultText);

        // Insert into Supabase
        const { data, error } = await supabase
            .from("blog_posts")
            .insert({
                title: blogData.title,
                slug: blogData.slug,
                excerpt: blogData.excerpt,
                content: blogData.content,
                seo_keywords: blogData.seo_keywords,
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
