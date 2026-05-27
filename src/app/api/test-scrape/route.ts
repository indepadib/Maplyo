import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = request.nextUrl.searchParams.get("url");
        if (!url) {
            return NextResponse.json({ error: "Missing url param" }, { status: 400 });
        }

        console.log(`[TEST SCRAPE] Fetching: ${url}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'fr-FR,fr;q=0.8'
            },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        const text = await response.text();
        const titleMatch = text.match(/<title>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : 'not found';

        const jsonLdRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
        let ldMatch;
        const jsonLds: string[] = [];
        while ((ldMatch = jsonLdRegex.exec(text)) !== null) {
            jsonLds.push(ldMatch[1].trim());
        }

        return NextResponse.json({
            status: response.status,
            statusText: response.statusText,
            length: text.length,
            title: title,
            jsonLdCount: jsonLds.length,
            jsonLdSnippets: jsonLds.map(s => s.slice(0, 500)),
            snippet: text.slice(0, 1000)
        });
    } catch (e: any) {
        return NextResponse.json({
            error: e.message,
            stack: e.stack
        }, { status: 500 });
    }
}
