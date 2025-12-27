import React from "react";

export const MaplyoLogo = ({ className = "w-10 h-10", classNamePath = "fill-white" }: { className?: string, classNamePath?: string }) => {
    return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 
                Maplyo "M" Logo Construction 
                Geometric, sharp, modern.
                Structure: Two vertical pillars with chevron ends + Central floating V
            */}

            {/* Left Pillar */}
            <path
                d="M25 15 L25 85 L40 75 L40 25 L25 15Z"
                className={classNamePath}
            />

            {/* Right Pillar */}
            <path
                d="M95 15 L95 85 L80 75 L80 25 L95 15Z"
                className={classNamePath}
            />

            {/* Central V (The "Heart" of the map) */}
            <path
                d="M40 35 L60 75 L80 35 L80 50 L60 90 L40 50 L40 35Z"
                className={classNamePath}
                fillOpacity="0.9"
            />

            {/* Bottom Chevron Accents (Optional, adds the "Map" pin feel) */}
            <path
                d="M25 95 L40 85 L40 95 L25 105 L25 95Z"
                className={classNamePath}
                fillOpacity="0.7"
            />
            <path
                d="M95 95 L80 85 L80 95 L95 105 L95 95Z"
                className={classNamePath}
                fillOpacity="0.7"
            />
        </svg>
    );
};
