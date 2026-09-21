import type { Language } from "./dictionary";

export type OnboardingCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  offer: string;
  typeTitle: string;
  types: Record<"airbnb"|"guest_house"|"hotel"|"other", { label: string; description: string }>;
  sourceTitle: string;
  airbnbLabel: string;
  websiteLabel: string;
  authorizationAirbnb: string;
  authorizationWebsite: string;
  city: string;
  cityFallback: string;
  generate: string;
  generating: string;
  generatingSteps: string[];
  reassurance: string;
  errors: { generic: string; save: string };
};

export const ONBOARDING_COPY: Record<Language, OnboardingCopy> = {
  fr: {
    eyebrow: "VOTRE PREMIER MAPLYO",
    title: "Partez de votre établissement, pas des réglages.",
    subtitle: "Donnez-nous le minimum. Maplyo construit une première expérience voyageur que vous pourrez corriger et enrichir ensuite.",
    offer: "1 guide publié gratuit à vie + 30 jours Pro offerts",
    typeTitle: "1. Quel type d’établissement exploitez-vous ?",
    types: {
      airbnb: { label: "Location / Airbnb", description: "Appartement, villa ou location courte durée" },
      guest_house: { label: "Riad / maison d’hôtes", description: "Riad, B&B ou maison d’hôtes indépendante" },
      hotel: { label: "Hôtel", description: "Boutique hôtel, aparthotel ou hôtel indépendant" },
      other: { label: "Autre hébergement", description: "Résidence, serviced apartment ou autre format" }
    },
    sourceTitle: "2. Donnez à Maplyo un point de départ",
    airbnbLabel: "Lien de l’annonce Airbnb",
    websiteLabel: "Site de l’établissement",
    authorizationAirbnb: "Je possède, gère ou suis autorisé à utiliser les informations de cette annonce dans Maplyo.",
    authorizationWebsite: "Je possède, gère ou suis autorisé à utiliser les informations de ce site dans Maplyo.",
    city: "Ville",
    cityFallback: "Ville (fallback recommandé)",
    generate: "Générer mon Maplyo",
    generating: "Création de votre expérience…",
    generatingSteps: ["Import des informations", "Structuration du guide", "Préparation du concierge IA", "Création des blocs de services"],
    reassurance: "Aucun choix de plan maintenant. Voyez la valeur d’abord ; votre premier guide reste gratuit.",
    errors: { generic: "Une erreur est survenue", save: "Impossible d’enregistrer l’expérience" }
  },
  en: {
    eyebrow: "YOUR FIRST MAPLYO",
    title: "Start with the property, not the settings.",
    subtitle: "Give us the minimum. Maplyo builds a first guest experience you can review and enrich afterwards.",
    offer: "1 published guide free forever + 30 days Pro included",
    typeTitle: "1. What are you operating?",
    types: {
      airbnb: { label: "Vacation rental / Airbnb", description: "Apartment, villa or short-term rental" },
      guest_house: { label: "Riad / guest house", description: "Riad, B&B or independent guest house" },
      hotel: { label: "Hotel", description: "Boutique hotel, aparthotel or independent hotel" },
      other: { label: "Other hospitality", description: "Serviced apartment, residence or another format" }
    },
    sourceTitle: "2. Give Maplyo a starting point",
    airbnbLabel: "Airbnb listing link",
    websiteLabel: "Property website",
    authorizationAirbnb: "I own, manage, or am authorized to use the listing information I provide to Maplyo.",
    authorizationWebsite: "I own, manage, or am authorized to use this property website information in Maplyo.",
    city: "City",
    cityFallback: "City (recommended fallback)",
    generate: "Generate my Maplyo",
    generating: "Building your guest experience…",
    generatingSteps: ["Importing property information", "Structuring the guest guide", "Preparing the AI concierge", "Creating service blocks"],
    reassurance: "No plan decision now. See the value first; your first guide stays free.",
    errors: { generic: "Something went wrong", save: "Could not save the experience" }
  },
  es: {
    eyebrow: "TU PRIMER MAPLYO",
    title: "Empieza por el alojamiento, no por los ajustes.",
    subtitle: "Danos lo mínimo. Maplyo crea una primera experiencia huésped que podrás revisar y mejorar después.",
    offer: "1 guía publicada gratis para siempre + 30 días Pro",
    typeTitle: "1. ¿Qué tipo de alojamiento gestionas?",
    types: {
      airbnb: { label: "Alquiler / Airbnb", description: "Apartamento, villa o alquiler vacacional" },
      guest_house: { label: "Riad / casa de huéspedes", description: "Riad, B&B o guest house independiente" },
      hotel: { label: "Hotel", description: "Boutique hotel, aparthotel u hotel independiente" },
      other: { label: "Otro alojamiento", description: "Serviced apartment, residencia u otro formato" }
    },
    sourceTitle: "2. Dale a Maplyo un punto de partida",
    airbnbLabel: "Enlace del anuncio Airbnb",
    websiteLabel: "Web del alojamiento",
    authorizationAirbnb: "Soy propietario, gestor o estoy autorizado a usar la información de este anuncio en Maplyo.",
    authorizationWebsite: "Soy propietario, gestor o estoy autorizado a usar la información de esta web en Maplyo.",
    city: "Ciudad",
    cityFallback: "Ciudad (fallback recomendado)",
    generate: "Generar mi Maplyo",
    generating: "Creando tu experiencia…",
    generatingSteps: ["Importando información", "Estructurando la guía", "Preparando el conserje IA", "Creando bloques de servicios"],
    reassurance: "No elijas plan todavía. Prueba el valor primero; tu primera guía sigue siendo gratis.",
    errors: { generic: "Algo salió mal", save: "No se pudo guardar la experiencia" }
  },
  ar: {
    eyebrow: "أول تجربة MAPLYO",
    title: "ابدأ بالمنشأة، لا بالإعدادات.",
    subtitle: "أعطنا الحد الأدنى من المعلومات. ينشئ Maplyo تجربة ضيف أولية يمكنك مراجعتها وتطويرها لاحقاً.",
    offer: "دليل منشور مجاني دائماً + 30 يوماً Pro",
    typeTitle: "1. ما نوع المنشأة التي تديرها؟",
    types: {
      airbnb: { label: "إيجار / Airbnb", description: "شقة أو فيلا أو إيجار قصير المدة" },
      guest_house: { label: "رياض / دار ضيافة", description: "رياض أو B&B أو دار ضيافة مستقلة" },
      hotel: { label: "فندق", description: "Boutique hotel أو aparthotel أو فندق مستقل" },
      other: { label: "إقامة أخرى", description: "شقق مخدومة أو إقامة أو نموذج آخر" }
    },
    sourceTitle: "2. أعط Maplyo نقطة بداية",
    airbnbLabel: "رابط إعلان Airbnb",
    websiteLabel: "موقع المنشأة",
    authorizationAirbnb: "أنا المالك أو المدير أو مخول باستخدام معلومات هذا الإعلان في Maplyo.",
    authorizationWebsite: "أنا المالك أو المدير أو مخول باستخدام معلومات هذا الموقع في Maplyo.",
    city: "المدينة",
    cityFallback: "المدينة (خيار احتياطي موصى به)",
    generate: "إنشاء Maplyo الخاص بي",
    generating: "جارٍ إنشاء تجربة الضيف…",
    generatingSteps: ["استيراد المعلومات", "تنظيم دليل الضيف", "إعداد المساعد الذكي", "إنشاء خدمات إضافية"],
    reassurance: "لا حاجة لاختيار خطة الآن. جرّب القيمة أولاً؛ دليلك الأول يبقى مجانياً.",
    errors: { generic: "حدث خطأ", save: "تعذر حفظ التجربة" }
  },
  nl: {
    eyebrow: "JE EERSTE MAPLYO",
    title: "Begin met de accommodatie, niet met de instellingen.",
    subtitle: "Geef ons het minimum. Maplyo maakt een eerste gastervaring die je daarna kunt controleren en verbeteren.",
    offer: "1 gepubliceerde gids altijd gratis + 30 dagen Pro",
    typeTitle: "1. Wat voor accommodatie beheer je?",
    types: {
      airbnb: { label: "Vakantieverhuur / Airbnb", description: "Appartement, villa of korte verhuur" },
      guest_house: { label: "Riad / guest house", description: "Riad, B&B of onafhankelijke guest house" },
      hotel: { label: "Hotel", description: "Boutique hotel, aparthotel of onafhankelijk hotel" },
      other: { label: "Andere accommodatie", description: "Serviced apartment, residence of ander type" }
    },
    sourceTitle: "2. Geef Maplyo een startpunt",
    airbnbLabel: "Airbnb-listinglink",
    websiteLabel: "Website van de accommodatie",
    authorizationAirbnb: "Ik ben eigenaar, beheerder of bevoegd om de listinginformatie in Maplyo te gebruiken.",
    authorizationWebsite: "Ik ben eigenaar, beheerder of bevoegd om de website-informatie in Maplyo te gebruiken.",
    city: "Plaats",
    cityFallback: "Plaats (aanbevolen fallback)",
    generate: "Mijn Maplyo genereren",
    generating: "Je gastervaring wordt gebouwd…",
    generatingSteps: ["Accommodatiegegevens importeren", "Gastgids structureren", "AI-conciërge voorbereiden", "Serviceblokken maken"],
    reassurance: "Nog geen plankeuze. Test eerst de waarde; je eerste gids blijft gratis.",
    errors: { generic: "Er ging iets mis", save: "Kon de ervaring niet opslaan" }
  },
  zh: {
    eyebrow: "你的第一个 MAPLYO",
    title: "从物业开始，而不是从设置开始。",
    subtitle: "只需提供最少信息。Maplyo 会先创建一版住客体验，你之后可以检查和完善。",
    offer: "1 个已发布指南永久免费 + 30 天 Pro",
    typeTitle: "1. 你经营什么类型的住宿？",
    types: {
      airbnb: { label: "短租 / Airbnb", description: "公寓、别墅或短期出租" },
      guest_house: { label: "Riad / 民宿", description: "Riad、B&B 或独立民宿" },
      hotel: { label: "酒店", description: "精品酒店、公寓酒店或独立酒店" },
      other: { label: "其他住宿", description: "服务式公寓、住宅或其他类型" }
    },
    sourceTitle: "2. 给 Maplyo 一个起点",
    airbnbLabel: "Airbnb 房源链接",
    websiteLabel: "住宿网站",
    authorizationAirbnb: "我是房源所有者、管理者或被授权在 Maplyo 中使用这些信息。",
    authorizationWebsite: "我是该网站所有者、管理者或被授权在 Maplyo 中使用这些信息。",
    city: "城市",
    cityFallback: "城市（建议作为备用）",
    generate: "生成我的 Maplyo",
    generating: "正在创建住客体验…",
    generatingSteps: ["导入物业信息", "组织住客指南", "准备 AI 礼宾", "创建服务模块"],
    reassurance: "现在无需选择套餐。先体验价值；你的第一份指南永久免费。",
    errors: { generic: "出现错误", save: "无法保存体验" }
  },
  pt: {
    eyebrow: "O SEU PRIMEIRO MAPLYO",
    title: "Comece pelo alojamento, não pelas definições.",
    subtitle: "Dê-nos o mínimo. O Maplyo cria uma primeira experiência que poderá rever e melhorar depois.",
    offer: "1 guia publicado grátis para sempre + 30 dias Pro",
    typeTitle: "1. Que tipo de alojamento gere?",
    types: {
      airbnb: { label: "Alojamento / Airbnb", description: "Apartamento, villa ou arrendamento de curta duração" },
      guest_house: { label: "Riad / guest house", description: "Riad, B&B ou guest house independente" },
      hotel: { label: "Hotel", description: "Boutique hotel, aparthotel ou hotel independente" },
      other: { label: "Outro alojamento", description: "Serviced apartment, residência ou outro formato" }
    },
    sourceTitle: "2. Dê ao Maplyo um ponto de partida",
    airbnbLabel: "Link do anúncio Airbnb",
    websiteLabel: "Site do alojamento",
    authorizationAirbnb: "Sou proprietário, gestor ou tenho autorização para usar as informações deste anúncio no Maplyo.",
    authorizationWebsite: "Sou proprietário, gestor ou tenho autorização para usar as informações deste site no Maplyo.",
    city: "Cidade",
    cityFallback: "Cidade (fallback recomendado)",
    generate: "Gerar o meu Maplyo",
    generating: "A criar a experiência…",
    generatingSteps: ["A importar informações", "A estruturar o guia", "A preparar o concierge IA", "A criar blocos de serviços"],
    reassurance: "Sem escolha de plano agora. Veja primeiro o valor; o primeiro guia continua grátis.",
    errors: { generic: "Algo correu mal", save: "Não foi possível guardar a experiência" }
  }
};

export function onboardingCopy(lang: Language): OnboardingCopy {
  return ONBOARDING_COPY[lang] || ONBOARDING_COPY.en;
}
