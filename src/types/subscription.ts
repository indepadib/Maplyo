export type SubscriptionPlan = 'free' | 'pro';

export const PLANS = {
    free: {
        id: 'free',
        name: 'Gratuit',
        price: 0,
        limits: {
            guides: 1,
            blocks: 15,
            mediaUploads: false, // Videos/Images in blocks
            aiTips: false,
        },
        features: [
            "1 Guide",
            "Blocs basiques (Wifi, Check-in)",
            "QR Code simple",
            "Support communautaire"
        ]
    },
    pro: {
        id: 'pro',
        name: 'Pro',
        price: 9, // €/month
        limits: {
            guides: 100,
            blocks: 1000,
            mediaUploads: true,
            aiTips: true,
        },
        features: [
            "Guides illimités",
            "Tous les blocs (Vidéos, Maps dynamiques)",
            "IA Génératrice de contenu",
            "Support Prioritaire",
            "Marque blanche (Logo perso)" // Future
        ]
    }
} as const;

export type UserSubscription = {
    planId: SubscriptionPlan;
    status: 'active' | 'past_due' | 'canceled' | 'trialing' | null;
    stripeCustomerId?: string;
    currentPeriodEnd?: string;
};
