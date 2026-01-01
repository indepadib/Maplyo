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
    // Abstract geometric "M" formed by a folded map concept (Original Design)
    const path = "M4 6V18C4 18 8 16 12 18S20 18 20 18V6C20 6 16 8 12 6S4 6 4 6Z M12 6V18";

    return (
        <div className="flex items-center gap-2">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                <path d="M20 20 L40 20 L40 80 L20 60 Z" className={monochrome ? classNamePath : "fill-rose-600"} />
                <path d="M80 20 L60 20 L60 80 L80 60 Z" className={monochrome ? classNamePath : "fill-purple-600"} />
                <path d="M40 20 L60 20 L60 55 L50 65 L40 55 Z" className={monochrome ? classNamePath : "fill-pink-700"} />
                <path
                    d="M25 85 L50 95 L75 85"
                    stroke={monochrome ? "currentColor" : "#be185d"}
                    strokeWidth="6"
                    strokeLinecap="round"
                    className={monochrome ? classNamePath : ""}
                />
            </svg>
            {showText && <span className={`font-bold tracking-tight ${classNameText}`}>Maplyo</span>}
        </div>
    );
}
