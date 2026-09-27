import type { Language } from "./dictionary";

export type BillingCopy = {
  monthly: string;
  annual: string;
  annualBadge: string;
  perMonth: string;
  perYear: string;
  billedYearly: string;
  annualSaving: string;
  chooseAnnual: string;
  chooseMonthly: string;
  checkoutError: string;
  secureCheckout: string;
};

export const BILLING_COPY: Record<Language, BillingCopy> = {
  fr: { monthly: "Mensuel", annual: "Annuel", annualBadge: "2 mois offerts", perMonth: "/mois", perYear: "/an", billedYearly: "facturé une fois par an", annualSaving: "Économisez 2 mois avec l’abonnement annuel.", chooseAnnual: "Choisir Pro annuel", chooseMonthly: "Choisir Pro mensuel", checkoutError: "Impossible d’ouvrir le paiement sécurisé.", secureCheckout: "Paiement sécurisé Stripe · résiliable depuis votre espace" },
  en: { monthly: "Monthly", annual: "Annual", annualBadge: "2 months free", perMonth: "/month", perYear: "/year", billedYearly: "billed once per year", annualSaving: "Save two months with annual billing.", chooseAnnual: "Choose annual Pro", chooseMonthly: "Choose monthly Pro", checkoutError: "Could not open secure checkout.", secureCheckout: "Secure Stripe checkout · cancel from your account" },
  es: { monthly: "Mensual", annual: "Anual", annualBadge: "2 meses gratis", perMonth: "/mes", perYear: "/año", billedYearly: "facturado una vez al año", annualSaving: "Ahorra dos meses con la facturación anual.", chooseAnnual: "Elegir Pro anual", chooseMonthly: "Elegir Pro mensual", checkoutError: "No se pudo abrir el pago seguro.", secureCheckout: "Pago seguro con Stripe · cancela desde tu cuenta" },
  ar: { monthly: "شهري", annual: "سنوي", annualBadge: "شهران مجاناً", perMonth: "/شهر", perYear: "/سنة", billedYearly: "يُدفع مرة واحدة سنوياً", annualSaving: "وفّر قيمة شهرين مع الاشتراك السنوي.", chooseAnnual: "اختيار Pro السنوي", chooseMonthly: "اختيار Pro الشهري", checkoutError: "تعذر فتح صفحة الدفع الآمنة.", secureCheckout: "دفع آمن عبر Stripe · يمكنك الإلغاء من حسابك" },
  nl: { monthly: "Maandelijks", annual: "Jaarlijks", annualBadge: "2 maanden gratis", perMonth: "/maand", perYear: "/jaar", billedYearly: "één keer per jaar gefactureerd", annualSaving: "Bespaar twee maanden met jaarlijkse facturatie.", chooseAnnual: "Kies jaarlijkse Pro", chooseMonthly: "Kies maandelijkse Pro", checkoutError: "Veilige checkout kon niet worden geopend.", secureCheckout: "Veilige Stripe-checkout · opzegbaar vanuit je account" },
  zh: { monthly: "按月", annual: "按年", annualBadge: "赠送 2 个月", perMonth: "/月", perYear: "/年", billedYearly: "每年一次性计费", annualSaving: "年付相当于免费 2 个月。", chooseAnnual: "选择 Pro 年付", chooseMonthly: "选择 Pro 月付", checkoutError: "无法打开安全支付页面。", secureCheckout: "Stripe 安全支付 · 可在账户中取消" },
  pt: { monthly: "Mensal", annual: "Anual", annualBadge: "2 meses grátis", perMonth: "/mês", perYear: "/ano", billedYearly: "cobrado uma vez por ano", annualSaving: "Poupe dois meses com faturação anual.", chooseAnnual: "Escolher Pro anual", chooseMonthly: "Escolher Pro mensal", checkoutError: "Não foi possível abrir o checkout seguro.", secureCheckout: "Checkout seguro Stripe · cancele na sua conta" }
};

export function billingCopy(lang: Language): BillingCopy {
  return BILLING_COPY[lang] || BILLING_COPY.en;
}
