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
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                <path
                    d={path}
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={classNamePath}
                />
            </svg>
            {showText && <span className={`font-bold tracking-tight ${classNameText}`}>Maplyo</span>}
        </div>
    );
}
