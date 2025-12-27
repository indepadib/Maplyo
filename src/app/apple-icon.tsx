import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 180,
    height: 180,
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
                    background: '#1e293b', // Navy background for the app icon
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 36, // Rounded corners for Apple style
                }}
            >
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Navy Pillars (White/Lighter on dark bg) */}
                    <path
                        d="M15 10 H35 V60 L25 70 L15 60 V10Z"
                        fill="#ffffff"
                    />
                    <path
                        d="M65 10 H85 V60 L75 70 L65 60 V10Z"
                        fill="#ffffff"
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
            ...size,
        }
    );
}
