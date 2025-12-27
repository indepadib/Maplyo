import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Left Wing (Rose) */}
                    <path
                        d="M20 20 L40 20 L40 80 L20 60 Z"
                        fill="#e11d48"
                    />
                    {/* Right Wing (Purple) */}
                    <path
                        d="M80 20 L60 20 L60 80 L80 60 Z"
                        fill="#9333ea"
                    />
                    {/* Central Fold */}
                    <path
                        d="M40 20 L60 20 L60 55 L50 65 L40 55 Z"
                        fill="#be185d"
                    />
                    {/* Bottom Smile */}
                    <path
                        d="M25 85 L50 95 L75 85"
                        stroke="#be185d"
                        strokeWidth="6"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    );
}
