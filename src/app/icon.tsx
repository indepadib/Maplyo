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
                    {/* Navy Pillars */}
                    <path
                        d="M15 10 H35 V60 L25 70 L15 60 V10Z"
                        fill="#1e293b"
                    />
                    <path
                        d="M65 10 H85 V60 L75 70 L65 60 V10Z"
                        fill="#1e293b"
                    />

                    {/* Gold Feet */}
                    <path
                        d="M15 75 L25 85 L35 75 L35 85 L25 95 L15 85 Z"
                        fill="#d4af37"
                    />
                    <path
                        d="M65 75 L75 85 L85 75 L85 85 L75 95 L65 85 Z"
                        fill="#d4af37"
                    />

                    {/* Central Gold V */}
                    <path
                        d="M35 10 L50 25 L65 10 L65 35 L50 80 L35 35 Z"
                        fill="#d4af37"
                    />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
        }
    );
}
