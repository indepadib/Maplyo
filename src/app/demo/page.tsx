"use client";

import { EnhancedBuilder } from "@/components/builder/EnhancedBuilder";
import { BlockType } from "@/types/blocks";

export default function DemoPage() {
    const demoGuide = {
        id: "demo-guest",
        slug: "demo-guide",
        title: "Mon Guide Démo",
        theme: { themeId: "minimal-white" },
        blocks: [
            {
                id: "hero-1",
                type: "hero" as BlockType,
                title: "Hero",
                visibility: { mode: "always" },
                data: {
                    title: "Bienvenue",
                    subtitle: "Guide de démonstration",
                    coverImageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200",
                    badges: ["Demo"]
                }
            }
        ],
        updatedAt: new Date().toISOString(),
        isPublished: false
    };

    const mockSubscription = {
        userId: 'guest',
        planId: 'demo',
        status: 'active',
        currentPeriodEnd: 0
    };

    return <EnhancedBuilder initialGuide={demoGuide as any} subscription={mockSubscription as any} isGuest={true} />;
}
