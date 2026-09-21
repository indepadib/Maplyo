import type { Language } from "./dictionary";

export type TrialLifecycleCopy = {
  activation: {
    subject: string;
    noGuide: string;
    unpublished: string;
    published: string;
  };
  value: {
    subject: string;
    noGuide: string;
    unpublished: string;
    published: string;
  };
  ending3: {
    subject: string;
    body: string;
  };
  ending1: {
    subject: string;
    body: string;
  };
  cta: {
    create: string;
    finish: string;
    open: string;
    upgrade: string;
  };
  footer: string;
};

export const TRIAL_LIFECYCLE_COPY: Record<Language, TrialLifecycleCopy> = {
  fr: {
    activation: { subject: "Votre Maplyo est prêt à prendre vie", noGuide: "Vous avez activé Pro, mais aucun guide n’est encore créé. Collez votre lien Airbnb ou le site de votre établissement et laissez Maplyo préparer la première version.", unpublished: "Votre première expérience existe déjà. Le prochain vrai jalon est simple : vérifiez les informations essentielles puis publiez-la pour un voyageur réel.", published: "Votre guide est déjà publié. Ajoutez maintenant un premier service — late checkout, transfert ou petit-déjeuner — pour tester la partie revenue de Maplyo." },
    value: { subject: "10 jours avec Maplyo : passez du guide à l’exploitation", noGuide: "Votre essai Pro avance mais aucun guide n’est actif. Le meilleur moyen d’évaluer Maplyo reste de créer une expérience sur un vrai établissement.", unpublished: "Votre guide attend encore sa première publication. Publiez-le, partagez le lien avec un vrai voyageur et utilisez les prochains jours pour juger Maplyo sur l’usage.", published: "Votre expérience est en ligne. Utilisez maintenant les jours Pro restants pour tester concierge IA, services additionnels et parcours voyageur avant de décider." },
    ending3: { subject: "Il reste 3 jours de Pro — votre guide Free restera actif", body: "Votre accès Pro arrive à son terme. Rien ne disparaît brutalement : votre premier guide reste publié sur Free. Pro sert à conserver les capacités avancées comme l’IA, le multilingue premium et la croissance multi-guides." },
    ending1: { subject: "Dernier jour de Pro — aucune perte de votre premier guide", body: "Votre période Pro se termine bientôt. Si vous ne souscrivez pas, Maplyo revient simplement sur Free et votre premier guide reste utilisable. Passez à Pro uniquement si les fonctionnalités avancées vous apportent assez de valeur." },
    cta: { create: "Créer mon premier guide", finish: "Finaliser et publier", open: "Ouvrir Maplyo", upgrade: "Voir Pro" },
    footer: "Maplyo · Guest Experience & Revenue OS"
  },
  en: {
    activation: { subject: "Your Maplyo is ready to go live", noGuide: "You activated Pro, but no guide exists yet. Paste your Airbnb listing or property website and let Maplyo build the first version.", unpublished: "Your first guest experience already exists. The next meaningful milestone is simple: review the essentials and publish it for a real guest.", published: "Your guide is already live. Add your first service — late checkout, transfer or breakfast — to test Maplyo’s revenue layer." },
    value: { subject: "10 days with Maplyo: move from guide to operations", noGuide: "Your Pro period is moving forward but no guide is active yet. The best way to evaluate Maplyo is to build one for a real property.", unpublished: "Your guide is still waiting for its first publication. Publish it, share the link with a real guest and judge Maplyo on actual use.", published: "Your experience is live. Use the remaining Pro days to test AI concierge, ancillary services and guest journeys before deciding." },
    ending3: { subject: "3 Pro days left — your Free guide will stay live", body: "Your Pro access is approaching its end. Nothing disappears suddenly: your first guide stays published on Free. Pro keeps advanced capabilities such as AI, premium multilingual features and multi-guide growth." },
    ending1: { subject: "Last Pro day — you keep your first guide", body: "Your Pro period is almost over. If you do not subscribe, Maplyo simply falls back to Free and your first guide remains usable. Upgrade only if the advanced capabilities create enough value for you." },
    cta: { create: "Create my first guide", finish: "Finish and publish", open: "Open Maplyo", upgrade: "View Pro" },
    footer: "Maplyo · Guest Experience & Revenue OS"
  },
  es: {
    activation: { subject: "Tu Maplyo está listo para ponerse en marcha", noGuide: "Has activado Pro, pero aún no hay guía. Pega tu anuncio de Airbnb o la web del alojamiento y deja que Maplyo cree la primera versión.", unpublished: "Tu primera experiencia ya existe. El siguiente paso importante es revisar lo esencial y publicarla para un huésped real.", published: "Tu guía ya está publicada. Añade un primer servicio — late checkout, traslado o desayuno — para probar la capa de ingresos." },
    value: { subject: "10 días con Maplyo: del guía a la operación", noGuide: "Tu periodo Pro avanza pero aún no hay guía activa. La mejor forma de evaluar Maplyo es crearlo para un alojamiento real.", unpublished: "Tu guía sigue esperando su primera publicación. Publícala y compártela con un huésped real.", published: "Tu experiencia está online. Usa los días Pro restantes para probar conserje IA, servicios y journeys antes de decidir." },
    ending3: { subject: "Quedan 3 días Pro — tu guía Free seguirá activa", body: "Tu acceso Pro se acerca al final. Tu primera guía seguirá publicada en Free. Pro mantiene las funciones avanzadas de IA, multilingüe premium y crecimiento multi-guía." },
    ending1: { subject: "Último día Pro — conservas tu primera guía", body: "Si no te suscribes, Maplyo vuelve a Free y tu primera guía sigue funcionando. Pasa a Pro solo si las funciones avanzadas te aportan valor." },
    cta: { create: "Crear mi primera guía", finish: "Finalizar y publicar", open: "Abrir Maplyo", upgrade: "Ver Pro" },
    footer: "Maplyo · Guest Experience & Revenue OS"
  },
  ar: {
    activation: { subject: "Maplyo الخاص بك جاهز للانطلاق", noGuide: "تم تفعيل Pro لكن لم يتم إنشاء دليل بعد. أضف رابط Airbnb أو موقع المنشأة ودع Maplyo ينشئ النسخة الأولى.", unpublished: "تجربة الضيف الأولى موجودة. راجع المعلومات الأساسية ثم انشرها لضيف حقيقي.", published: "دليلك منشور بالفعل. أضف أول خدمة مثل تسجيل خروج متأخر أو نقل أو فطور لاختبار طبقة الإيرادات." },
    value: { subject: "10 أيام مع Maplyo: من الدليل إلى التشغيل", noGuide: "فترة Pro تمر ولم يتم تفعيل دليل بعد. أفضل طريقة لتقييم Maplyo هي استخدامه مع منشأة حقيقية.", unpublished: "دليلك ما زال ينتظر أول نشر. انشره وشاركه مع ضيف حقيقي.", published: "تجربتك متاحة الآن. اختبر المساعد الذكي والخدمات ورحلة الضيف قبل اتخاذ القرار." },
    ending3: { subject: "بقيت 3 أيام Pro — دليلك المجاني سيبقى فعالاً", body: "اقتربت نهاية Pro. دليلك الأول سيبقى منشوراً على Free. Pro يحافظ على المزايا المتقدمة مثل الذكاء الاصطناعي والتعدد اللغوي والنمو بعدة أدلة." },
    ending1: { subject: "آخر يوم Pro — دليلك الأول يبقى معك", body: "إذا لم تشترك، يعود Maplyo ببساطة إلى Free ويبقى دليلك الأول قابلاً للاستخدام. اشترك فقط إذا كانت المزايا المتقدمة تقدم قيمة حقيقية." },
    cta: { create: "إنشاء أول دليل", finish: "إكمال ونشر", open: "فتح Maplyo", upgrade: "عرض Pro" },
    footer: "Maplyo · Guest Experience & Revenue OS"
  },
  nl: {
    activation: { subject: "Je Maplyo is klaar om live te gaan", noGuide: "Pro is actief, maar er is nog geen gids. Plak je Airbnb-link of accommodatiewebsite en laat Maplyo de eerste versie bouwen.", unpublished: "Je eerste gastervaring bestaat al. Controleer de essentials en publiceer voor een echte gast.", published: "Je gids staat al live. Voeg een eerste service toe — late checkout, transfer of ontbijt — om de revenue-laag te testen." },
    value: { subject: "10 dagen Maplyo: van gids naar operatie", noGuide: "Je Pro-periode loopt, maar er is nog geen actieve gids. Test Maplyo met een echte accommodatie.", unpublished: "Je gids wacht nog op publicatie. Zet hem live en deel de link met een echte gast.", published: "Je ervaring staat live. Test nu AI-conciërge, services en guest journeys voordat je beslist." },
    ending3: { subject: "Nog 3 Pro-dagen — je Free-gids blijft live", body: "Pro loopt bijna af. Je eerste gids blijft gepubliceerd op Free. Pro behoudt geavanceerde AI-, meertalige en multi-guide mogelijkheden." },
    ending1: { subject: "Laatste Pro-dag — je behoudt je eerste gids", body: "Zonder abonnement val je terug op Free en blijft je eerste gids bruikbaar. Upgrade alleen als de geavanceerde functies voldoende waarde leveren." },
    cta: { create: "Mijn eerste gids maken", finish: "Afronden en publiceren", open: "Maplyo openen", upgrade: "Bekijk Pro" },
    footer: "Maplyo · Guest Experience & Revenue OS"
  },
  zh: {
    activation: { subject: "你的 Maplyo 已准备上线", noGuide: "Pro 已开启，但还没有指南。粘贴 Airbnb 房源或酒店网站，让 Maplyo 创建第一版。", unpublished: "第一份住客体验已经存在。下一步很简单：检查基础信息并发布给真实住客。", published: "指南已经上线。现在添加第一项服务，例如延迟退房、接送或早餐，测试 Maplyo 的收入能力。" },
    value: { subject: "使用 Maplyo 10 天：从指南走向运营", noGuide: "Pro 正在进行，但还没有激活指南。最好的评估方式是用于真实物业。", unpublished: "指南还未首次发布。发布并分享给真实住客，用实际使用判断 Maplyo。", published: "体验已上线。利用剩余 Pro 时间测试 AI 礼宾、增值服务和住客旅程。" },
    ending3: { subject: "Pro 剩余 3 天 — Free 指南仍会在线", body: "Pro 即将结束，但第一份指南会继续在 Free 上发布。Pro 用于保留 AI、高级多语言和多指南增长能力。" },
    ending1: { subject: "Pro 最后一天 — 第一份指南不会丢失", body: "如果不订阅，Maplyo 会回到 Free，第一份指南继续可用。只有当高级功能真正创造价值时再升级。" },
    cta: { create: "创建第一份指南", finish: "完成并发布", open: "打开 Maplyo", upgrade: "查看 Pro" },
    footer: "Maplyo · Guest Experience & Revenue OS"
  },
  pt: {
    activation: { subject: "O seu Maplyo está pronto para entrar em ação", noGuide: "O Pro está ativo, mas ainda não existe guia. Cole o Airbnb ou site do alojamento e deixe o Maplyo criar a primeira versão.", unpublished: "A primeira experiência já existe. Reveja o essencial e publique-a para um hóspede real.", published: "O guia já está publicado. Adicione um primeiro serviço — late checkout, transfer ou pequeno-almoço — para testar a camada de receita." },
    value: { subject: "10 dias com Maplyo: do guia à operação", noGuide: "O Pro está a avançar, mas ainda não existe um guia ativo. Teste Maplyo num alojamento real.", unpublished: "O guia ainda não foi publicado. Coloque-o online e partilhe com um hóspede real.", published: "A experiência está online. Use os dias Pro restantes para testar concierge IA, serviços e jornadas antes de decidir." },
    ending3: { subject: "Restam 3 dias Pro — o guia Free continua ativo", body: "O Pro está perto do fim. O primeiro guia continua publicado no Free. Pro mantém IA, multilingue premium e crescimento com vários guias." },
    ending1: { subject: "Último dia Pro — mantém o primeiro guia", body: "Sem subscrição, Maplyo volta ao Free e o primeiro guia continua utilizável. Faça upgrade apenas se as capacidades avançadas criarem valor suficiente." },
    cta: { create: "Criar primeiro guia", finish: "Finalizar e publicar", open: "Abrir Maplyo", upgrade: "Ver Pro" },
    footer: "Maplyo · Guest Experience & Revenue OS"
  }
};

export function trialLifecycleCopy(lang: Language): TrialLifecycleCopy {
  return TRIAL_LIFECYCLE_COPY[lang] || TRIAL_LIFECYCLE_COPY.en;
}
