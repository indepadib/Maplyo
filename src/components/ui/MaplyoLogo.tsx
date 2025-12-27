import React from "react";

interface LogoProps {
    className?: string;
    classNamePath?: string;
    monochrome?: boolean;
}

export const MaplyoLogo = ({ className = "w-10 h-10", classNamePath, monochrome = false }: LogoProps) => {
    return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e11d48" /> {/* Rose-600 */}
                    <stop offset="100%" stopColor="#9333ea" /> {/* Purple-600 */}
                </linearGradient>
            </defs>

            {/* 
                CONCEPT: "Folded Map M"
                An abstract M formed by three segments that look like a folded map or a path.
                Seamless, fluid, ultra-modern.
            */}

            {/* Left Wing (Rose) */}
            <path
                d="M20 20 L40 20 L40 80 L20 60 Z"
                fill={monochrome ? "currentColor" : "url(#brandGradient)"}
                className={monochrome ? classNamePath : ""}
            />

            {/* Right Wing (Purple) */}
            <path
                d="M80 20 L60 20 L60 80 L80 60 Z"
                fill={monochrome ? "currentColor" : "url(#brandGradient)"}
                className={monochrome ? classNamePath : ""}
            />

            {/* Central Fold (Connector/Path) */}
            <path
                d="M40 20 L60 20 L60 55 L50 65 L40 55 Z"
                fill={monochrome ? "currentColor" : "url(#brandGradient)"}
                opacity={monochrome ? 1 : 0.8} // Slightly distinct
                className={monochrome ? classNamePath : ""}
            />

            {/* 
                OPTIONAL: A sleek "Location Pin" negative space or accent
                Let's simplify. The M shape above is strong (Pillars + V).
                Let's make it cleaner - a continuous strip.
            */}

            <path
                d="M25 85 L50 95 L75 85"
                stroke={monochrome ? "currentColor" : "url(#brandGradient)"}
                strokeWidth="6"
                strokeLinecap="round"
                className={monochrome ? classNamePath : ""}
            />

        </svg>
    );
};
