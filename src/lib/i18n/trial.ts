import type { Language } from "./dictionary";

export type TrialCopy = {
  active: string;
  day: string;
  days: string;
  fallback: string;
  cta: string;
};

export const TRIAL_COPY: Record<Language, TrialCopy> = {
  fr: { active: "Pro offert encore", day: "jour", days: "jours", fallback: "Ensuite, votre premier guide reste actif gratuitement.", cta: "Voir Pro" },
  en: { active: "Pro included for", day: "day", days: "days", fallback: "After that, your first guide stays live on Free.", cta: "View Pro" },
  es: { active: "Pro incluido durante", day: "día", days: "días", fallback: "Después, tu primera guía sigue activa en Free.", cta: "Ver Pro" },
  ar: { active: "Pro متاح لمدة", day: "يوم", days: "أيام", fallback: "بعدها يبقى دليلك الأول فعالاً مجاناً.", cta: "عرض Pro" },
  nl: { active: "Pro inbegrepen voor", day: "dag", days: "dagen", fallback: "Daarna blijft je eerste gids gratis live.", cta: "Bekijk Pro" },
  zh: { active: "Pro 还可免费使用", day: "天", days: "天", fallback: "之后你的第一份指南仍会在 Free 中保持在线。", cta: "查看 Pro" },
  pt: { active: "Pro incluído por mais", day: "dia", days: "dias", fallback: "Depois, o primeiro guia continua ativo no Free.", cta: "Ver Pro" }
};

export function trialCopy(lang: Language): TrialCopy {
  return TRIAL_COPY[lang] || TRIAL_COPY.en;
}
