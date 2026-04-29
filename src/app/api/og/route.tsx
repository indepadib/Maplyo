import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        
        // Dynamic params
        const title = searchParams.get('title') || 'Votre Livret d\'Accueil Numérique';
        const type = searchParams.get('type') || 'Guide Maplyo';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#020617', // slate-950
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #ffffff11 2%, transparent 0%), radial-gradient(circle at 75px 75px, #ffffff11 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        padding: '40px',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        {/* Fake Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', backgroundColor: '#e11d48', borderRadius: '20px', marginBottom: '40px', color: 'white', fontSize: '40px', fontWeight: 'bold' }}>
                            M
                        </div>
                        
                        <div style={{
                            fontSize: 32,
                            fontWeight: 'bold',
                            color: '#94a3b8', // slate-400
                            textTransform: 'uppercase',
                            letterSpacing: '4px',
                            marginBottom: '20px',
                        }}>
                            {type}
                        </div>
                        
                        <div style={{
                            fontSize: 72,
                            fontWeight: 'bold',
                            color: 'white',
                            lineHeight: 1.1,
                            padding: '0 80px',
                            wordBreak: 'break-word',
                        }}>
                            {title}
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        return new Response('Failed to generate OG image', { status: 500 });
    }
}
