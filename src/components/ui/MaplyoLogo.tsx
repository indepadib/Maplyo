export function MaplyoLogo({
    className = "w-8 h-8",
    classNameText = "text-xl",
    showText = true,
    monochrome = false,
    classNamePath = "text-current"
}: {
    className?: string;
    classNameText?: string;
    showText?: boolean;
    monochrome?: boolean;
    classNamePath?: string;
}) {
    // Minimal geometric "M" - Clean and Premium
    // Points: M starts bottom left, goes up, goes to middle, goes up, goes down.
    // Simplifying to a solid, bold shape.

    return (
        <div className="flex items-center gap-2">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                <path
                    d="M4 19V5C4 5 8 5 12 9C16 5 20 5 20 5V19"
                    stroke={monochrome ? "currentColor" : "url(#brandGradient)"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={monochrome || classNamePath !== "text-current" ? classNamePath : ""}
                />
                <defs>
                    <linearGradient id="brandGradient" x1="4" y1="5" x2="20" y2="19" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                </defs>
            </svg>
            {showText && <span className={`font-bold tracking-tight ${classNameText}`}>Maplyo</span>}
        </div>
    );
}
