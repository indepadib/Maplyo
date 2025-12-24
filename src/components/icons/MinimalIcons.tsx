import type { BlockType } from "@/types/blocks";

interface IconProps {
    className?: string;
    color?: string;
}

// Pictos SVG minimalistes et épurés
export const MinimalIcons: Record<BlockType, React.FC<IconProps>> = {
    hero: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    wifi: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M5 12.55a11 11 0 0114.08 0" />
            <path d="M1.42 9a16 16 0 0121.16 0" />
            <path d="M8.53 16.11a6 6 0 016.95 0" />
            <circle cx="12" cy="20" r="1" fill={color} />
        </svg>
    ),
    access_codes: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
            <circle cx="12" cy="16" r="1" fill={color} />
        </svg>
    ),
    welcome: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
        </svg>
    ),
    upsells: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
            <path d="M12 21a9 9 0 1 0-9-9c0 4.97 4.02 9 9 9Z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    ),
    trash: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
        </svg>
    ),
    parking: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="4" />
            <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
        </svg>
    ),
    breakfast: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
            <path d="M8 8V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4" />
            <path d="M16 8h-8a4 4 0 0 0-4 4v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a4 4 0 0 0-4-4Z" />
            <path d="M10 14h4" />
        </svg>
    ),
    transport: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M16 18v2" />
            <path d="M8 18v2" />
            <path d="M3 11h18" />
            <path d="M7 11v-2" />
            <path d="M17 11v-2" />
        </svg>
    ),
    contact: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
    ),
    checkin: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M15 3h6v18h-6M10 17l5-5-5-5M3 12h12" />
        </svg>
    ),
    location: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    rules: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="15" x2="15" y2="15" />
            <line x1="9" y1="11" x2="15" y2="11" />
        </svg>
    ),
    amenities: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    checkout: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M9 3h6v18H9M3 12h12M10 7l-5 5 5 5" />
        </svg>
    ),
    faq: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
            <circle cx="12" cy="17" r="0.5" fill={color} />
        </svg>
    ),
    places: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
    ),
    events: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    documents: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
            <polyline points="13 2 13 9 20 9" />
        </svg>
    ),

    embed: ({ className, color = "currentColor" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    ),
};
