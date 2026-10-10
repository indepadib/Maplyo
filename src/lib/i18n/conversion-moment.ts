import type { Language } from "./dictionary";

export type ConversionMomentCopy = {
  firstGuestTitle: string;
  firstGuestText: string;
  openGuestLink: string;
  proofTitle: string;
  proofBefore: string;
  proofAfter: string;
  daysBefore: string;
  daysAfter: string;
  annualReason: string;
  annualCta: string;
  keepTesting: string;
};

export const CONVERSION_MOMENT_COPY: Record<Language, ConversionMomentCopy> = {
  fr: {
    firstGuestTitle: "Votre expérience est publiée. Maintenant, obtenez votre première vraie vue.",
    firstGuestText: "Partagez le lien voyageur avec une réservation réelle. Le meilleur moment pour juger Maplyo est pendant un vrai séjour.",
    openGuestLink: "Ouvrir le lien voyageur",
    proofTitle: "Maplyo est déjà utilisé par vos voyageurs.",
    proofBefore: "Votre expérience a généré",
    proofAfter: "vues voyageur pendant votre période Pro.",
    daysBefore: "Il vous reste",
    daysAfter: "jours de Pro inclus.",
    annualReason: "Passez à l’annuel maintenant pour conserver l’IA, le multilingue et les automatisations avec 2 mois offerts.",
    annualCta: "Conserver Pro · annuel",
    keepTesting: "Continuer à tester"
  },
  en: {
    firstGuestTitle: "Your experience is live. Now get your first real guest view.",
    firstGuestText: "Share the guest link with a real reservation. The best way to judge Maplyo is during an actual stay.",
    openGuestLink: "Open guest link",
    proofTitle: "Guests are already using your Maplyo experience.",
    proofBefore: "Your experience generated",
    proofAfter: "guest views during your Pro period.",
    daysBefore: "You have",
    daysAfter: "Pro days left.",
    annualReason: "Switch to annual now to keep AI, multilingual and automation capabilities with 2 months free.",
    annualCta: "Keep Pro · annual",
    keepTesting: "Keep testing"
  },
  es: {
    firstGuestTitle: "Tu experiencia está publicada. Consigue ahora la primera vista real.",
    firstGuestText: "Comparte el enlace con una reserva real. La mejor forma de evaluar Maplyo es durante una estancia.",
    openGuestLink: "Abrir enlace huésped",
    proofTitle: "Tus huéspedes ya están usando Maplyo.",
    proofBefore: "Tu experiencia ha generado",
    proofAfter: "vistas de huéspedes durante el periodo Pro.",
    daysBefore: "Te quedan",
    daysAfter: "días Pro.",
    annualReason: "Pasa al anual para conservar IA, multilingüe y automatizaciones con 2 meses gratis.",
    annualCta: "Mantener Pro · anual",
    keepTesting: "Seguir probando"
  },
  ar: {
    firstGuestTitle: "تجربة الضيف منشورة. الآن احصل على أول مشاهدة حقيقية.",
    firstGuestText: "شارك رابط الضيف مع حجز حقيقي. أفضل طريقة لتقييم Maplyo هي أثناء إقامة فعلية.",
    openGuestLink: "فتح رابط الضيف",
    proofTitle: "ضيوفك يستخدمون Maplyo بالفعل.",
    proofBefore: "حققت تجربتك",
    proofAfter: "مشاهدة من الضيوف خلال فترة Pro.",
    daysBefore: "متبقي لديك",
    daysAfter: "أيام من Pro.",
    annualReason: "انتقل إلى السنوي للحفاظ على الذكاء الاصطناعي والتعدد اللغوي والأتمتة مع شهرين مجاناً.",
    annualCta: "الاحتفاظ بـ Pro · سنوي",
    keepTesting: "متابعة التجربة"
  },
  nl: {
    firstGuestTitle: "Je ervaring staat live. Zorg nu voor de eerste echte gastweergave.",
    firstGuestText: "Deel de gastlink met een echte reservering. Beoordeel Maplyo tijdens een werkelijk verblijf.",
    openGuestLink: "Gastlink openen",
    proofTitle: "Gasten gebruiken je Maplyo-ervaring al.",
    proofBefore: "Je ervaring kreeg",
    proofAfter: "gastweergaven tijdens je Pro-periode.",
    daysBefore: "Je hebt nog",
    daysAfter: "Pro-dagen.",
    annualReason: "Kies jaarlijks om AI, meertaligheid en automatisering te behouden met 2 maanden gratis.",
    annualCta: "Pro behouden · jaarlijks",
    keepTesting: "Verder testen"
  },
  zh: {
    firstGuestTitle: "住客体验已经上线。现在获得第一位真实住客访问。",
    firstGuestText: "把住客链接发给一个真实预订。真实入住才是判断 Maplyo 价值的最佳方式。",
    openGuestLink: "打开住客链接",
    proofTitle: "住客已经在使用你的 Maplyo 体验。",
    proofBefore: "你的体验在 Pro 期间已获得",
    proofAfter: "次住客访问。",
    daysBefore: "Pro 还剩",
    daysAfter: "天。",
    annualReason: "现在选择年付，继续保留 AI、多语言和自动化，并赠送 2 个月。",
    annualCta: "保留 Pro · 年付",
    keepTesting: "继续试用"
  },
  pt: {
    firstGuestTitle: "A experiência está publicada. Agora obtenha a primeira visita real.",
    firstGuestText: "Partilhe o link com uma reserva real. A melhor forma de avaliar Maplyo é durante uma estadia verdadeira.",
    openGuestLink: "Abrir link do hóspede",
    proofTitle: "Os seus hóspedes já estão a usar Maplyo.",
    proofBefore: "A sua experiência gerou",
    proofAfter: "visualizações durante o período Pro.",
    daysBefore: "Restam",
    daysAfter: "dias Pro.",
    annualReason: "Passe ao anual para manter IA, multilingue e automações com 2 meses grátis.",
    annualCta: "Manter Pro · anual",
    keepTesting: "Continuar a testar"
  }
};

export function conversionMomentCopy(lang: Language): ConversionMomentCopy {
  return CONVERSION_MOMENT_COPY[lang] || CONVERSION_MOMENT_COPY.en;
}
