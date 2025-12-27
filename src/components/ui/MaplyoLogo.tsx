import React from "react";

interface LogoProps {
    className?: string;
    classNamePath?: string; // Used for converting to single color/fill if needed
    monochrome?: boolean;
}

export const MaplyoLogo = ({ className = "w-10 h-10", classNamePath, monochrome = false }: LogoProps) => {
    // Colors based on the luxurious reference
    const navy = "#1e293b"; // Classic dark navy
    const gold = "#d4af37"; // Metallic gold

    return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E5C769" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B5922F" />
                </linearGradient>
            </defs>

            {/* 
                THE "M" FRAME (Navy Pillars) 
                Left and Right vertical strokes with sharp angled cuts.
            */}
            <path
                d="M20 10 L40 10 L40 65 L20 50 Z" // Top left start
                fill={monochrome ? "currentColor" : navy}
                className={monochrome ? classNamePath : ""}
            />
            <path
                d="M40 10 L40 65 L60 85 L60 30 Z" // Inner Left
                fill={monochrome ? "currentColor" : navy}
                opacity={monochrome ? 0.7 : 0.9} // Slight depth
                className={monochrome ? classNamePath : ""}
            />

            {/* Mirror for Right Side */}
            <path
                d="M80 10 L60 10 L60 65 L80 50 Z"
                fill={monochrome ? "currentColor" : navy}
                className={monochrome ? classNamePath : ""}
            />
            <path
                d="M60 10 L60 65 L40 85 L40 30 Z" // Inner Right (Creates the deep V void)
                fill={monochrome ? "currentColor" : navy} // Overlapped to create the V shape void
                opacity={monochrome ? 0.7 : 0.9}
                className={monochrome ? classNamePath : ""}
                style={{ display: 'none' }} // Actually, let's redraw simpler.
            />

            {/* 
                 RETRYING GEOMETRY FOR CLEANER "M" 
                 Let's draw two separate pillars that look like the legs.
            */}

            {/* Left Leg */}
            <path
                d="M15 10 H35 V60 L25 70 L15 60 V10Z"
                fill={monochrome ? "currentColor" : navy}
                className={monochrome ? classNamePath : ""}
            />
            {/* Bottom Chevron Detail Left */}
            <path
                d="M15 75 L25 85 L35 75 L35 85 L25 95 L15 85 Z"
                fill={monochrome ? "currentColor" : gold} // Gold accent feet
                className={monochrome ? classNamePath : ""}
            />

            {/* Right Leg */}
            <path
                d="M65 10 H85 V60 L75 70 L65 60 V10Z"
                fill={monochrome ? "currentColor" : navy}
                className={monochrome ? classNamePath : ""}
            />
            {/* Bottom Chevron Detail Right */}
            <path
                d="M65 75 L75 85 L85 75 L85 85 L75 95 L65 85 Z"
                fill={monochrome ? "currentColor" : gold} // Gold accent feet
                className={monochrome ? classNamePath : ""}
            />

            {/* Central "V" Jewel (The Connector) */}
            <path
                d="M35 10 L50 25 L65 10 L65 35 L50 80 L35 35 Z"
                fill={monochrome ? "currentColor" : "url(#goldGradient)"}
                className={monochrome ? classNamePath : ""}
            />
        </svg>
    );
};
