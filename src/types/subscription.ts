export type PlanId = 'demo' | 'basic' | 'pro';

export interface SubscriptionPlan {
    id: PlanId;
    name: string;
    price: number;
    currency: string;
    features: string[];
    limits: {
        guides: number;
        ai: boolean;
        themes: boolean; // all themes
    };
}

export const PLANS: Record<PlanId, SubscriptionPlan> = {
    demo: {
        id: 'demo',
        name: 'Démo',
        price: 0,
        currency: 'EUR',
        features: [
            'Accès au Créateur',
            'Pas de publication',
            'Thèmes limités'
        ],
        limits: {
            guides: 1, // Can create 1 but not publish (handled elsewhere)
            ai: false,
            themes: false
        }
    },
    basic: {
        id: 'basic',
        name: 'Basique',
        price: 9,
        currency: 'EUR',
        features: [
            '1 Guide Actif',
            'Thèmes Essentiels',
            'Support Standard',
            'Hébergement Inclus'
        ],
        limits: {
            guides: 1,
            ai: false,
            themes: false
        }
    },
    pro: {
        id: 'pro',
        name: 'Pro',
        price: 29,
        currency: 'EUR',
        features: [
            '3 Guides Actifs',
            'Assistant IA Invités',
            'Tous les Thèmes Premium',
            'Support Prioritaire',
            'Statistiques Avancées'
        ],
        limits: {
            guides: 3,
            ai: true,
            themes: true
        }
    }
};

export interface UserSubscription {
    userId: string;
    planId: PlanId;
    status: 'active' | 'past_due' | 'canceled' | 'incomplete';
    currentPeriodEnd: number;
}
