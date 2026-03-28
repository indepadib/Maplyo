export type CurrencyCode = 'MAD' | 'EUR' | 'GBP' | 'USD';

export interface PlanPricing {
    basic: number;
    pro: number;
    addon: number;
    symbol: string;
}

export const PRICING_BY_CURRENCY: Record<CurrencyCode, PlanPricing> = {
    MAD: { basic: 49, pro: 99, addon: 20, symbol: 'DH' },
    EUR: { basic: 4.9, pro: 9.9, addon: 2, symbol: '€' },
    GBP: { basic: 3.9, pro: 7.9, addon: 1.5, symbol: '£' },
    USD: { basic: 4.9, pro: 9.9, addon: 2, symbol: '$' }
};

export function getCurrencyByCountry(countryCode: string): CurrencyCode {
    const c = countryCode.toLowerCase();
    if (c === 'ma') return 'MAD';
    
    const eurCountries = ['fr', 'de', 'es', 'it', 'nl', 'be', 'at', 'gr', 'pt', 'ie', 'fi', 'cy', 'ee', 'lv', 'lt', 'lu', 'mt', 'sk', 'si'];
    if (eurCountries.includes(c)) return 'EUR';
    
    if (c === 'gb' || c === 'uk') return 'GBP';
    
    return 'USD';
}
