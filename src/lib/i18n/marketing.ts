import type { Language } from "./dictionary";

export type MarketingCopy = {
  nav: {
    product: string;
    solutions: string;
    pricing: string;
    demo: string;
    login: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
    offer: string;
    fallback: string;
    importHint: string;
  };
  outcomes: {
    title: string;
    subtitle: string;
    cards: Array<{ title: string; text: string }>;
  };
  proof: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: Array<{ title: string; text: string }>;
  };
  how: {
    eyebrow: string;
    title: string;
    steps: Array<{ title: string; text: string }>;
  };
  segments: {
    title: string;
    subtitle: string;
    cards: Array<{ title: string; text: string; cta: string }>;
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    free: {
      name: string;
      price: string;
      desc: string;
      badge: string;
      features: string[];
      cta: string;
    };
    pro: {
      name: string;
      priceSuffix: string;
      desc: string;
      badge: string;
      features: string[];
      cta: string;
    };
    business: {
      name: string;
      price: string;
      desc: string;
      features: string[];
      cta: string;
    };
    reassurance: string;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  final: {
    title: string;
    subtitle: string;
    cta: string;
    subtext: string;
  };
  signup: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    passwordPlaceholder: string;
    button: string;
    loading: string;
    checkInbox: string;
    checkInboxBody: string;
    continueLogin: string;
    existing: string;
    signIn: string;
    termsPrefix: string;
    terms: string;
    privacy: string;
  };
};

export const MARKETING_COPY: Record<Language, MarketingCopy> = {
  fr: {
    nav: { product: "Produit", solutions: "Solutions", pricing: "Tarifs", demo: "Démo", login: "Connexion", cta: "Créer gratuitement" },
    hero: {
      eyebrow: "POUR LOCATIONS, CONCIERGERIES, RIADS & HÔTELS",
      title: "Moins de messages. Plus de services vendus. Une meilleure expérience voyageur.",
      subtitle: "Collez votre lien Airbnb ou le site de votre établissement. Maplyo transforme vos informations en une expérience voyageur multilingue avec concierge IA, services additionnels, QR code et parcours de séjour — sans application à télécharger.",
      primary: "Créer mon guide gratuit",
      secondary: "Voir une vraie démo",
      offer: "1 guide publié gratuit à vie · 30 jours Pro offerts · Sans carte bancaire",
      fallback: "Après 30 jours, votre guide reste actif gratuitement. Vous ne perdez pas votre travail.",
      importHint: "Airbnb · Site hôtel/riad · Saisie manuelle"
    },
    outcomes: {
      title: "Maplyo doit produire un résultat, pas juste être joli.",
      subtitle: "Chaque module répond à un problème concret de l’exploitation hôtelière et locative.",
      cards: [
        { title: "Réduire les questions répétitives", text: "Wi‑Fi, arrivée, parking, règles, recommandations et infos pratiques restent accessibles 24/7." },
        { title: "Créer des revenus additionnels", text: "Late checkout, transfert, petit-déjeuner, ménage ou expérience locale sont proposés dans le parcours voyageur." },
        { title: "Servir dans la langue du client", text: "Une expérience multilingue et un concierge IA qui utilisent les informations validées de votre établissement." },
        { title: "Piloter plusieurs établissements", text: "Portfolio, séjours, demandes, revenus et automations depuis un seul cockpit." }
      ]
    },
    proof: {
      eyebrow: "PREUVES PRODUIT, PAS PROMESSES",
      title: "Ce que vous pouvez réellement tester aujourd’hui.",
      subtitle: "Pas de faux avis ni de chiffres inventés : ouvrez la démo, créez votre guide et vérifiez le produit vous-même.",
      cards: [
        { title: "1 lien voyageur", text: "QR code ou lien web. Aucun téléchargement côté client." },
        { title: "Création assistée", text: "Import Airbnb, site d’établissement ou informations saisies manuellement." },
        { title: "Concierge IA", text: "Réponses basées sur les informations publiées par l’établissement." },
        { title: "Services & commandes", text: "Les voyageurs peuvent demander des extras directement depuis leur expérience." },
        { title: "7 langues", text: "Français, anglais, espagnol, arabe, néerlandais, chinois et portugais." },
        { title: "Mode multi-propriétés", text: "Portfolio Command Center, équipe, séjours, requests et revenue." }
      ]
    },
    how: {
      eyebrow: "3 ÉTAPES",
      title: "De votre propriété à une expérience voyageur active.",
      steps: [
        { title: "1. Importez", text: "Ajoutez votre lien Airbnb, votre site ou vos informations existantes." },
        { title: "2. Personnalisez", text: "Validez le contenu, ajoutez vos services, votre branding et vos informations opérationnelles." },
        { title: "3. Partagez & mesurez", text: "Envoyez le lien avant l’arrivée, placez le QR sur site et suivez engagement, demandes et revenus." }
      ]
    },
    segments: {
      title: "Un même moteur, trois parcours commerciaux.",
      subtitle: "Maplyo adapte la profondeur du produit à votre niveau d’exploitation.",
      cards: [
        { title: "Locations & Airbnb", text: "Un guide utile, rapide à créer, avec moins de questions répétitives et plus d’extras.", cta: "Pour les hôtes" },
        { title: "Conciergeries", text: "Centralisez des dizaines de biens, l’équipe, les séjours, les demandes et les revenus.", cta: "Pour les conciergeries" },
        { title: "Riads & hôtels", text: "Expérience chambre/séjour, concierge, services, requests et automatisations pré-arrivée.", cta: "Pour hôtels & riads" }
      ]
    },
    pricing: {
      eyebrow: "COMMENCEZ SANS RISQUE",
      title: "Votre premier guide ne doit pas nécessiter une décision d’achat.",
      subtitle: "Testez la vraie valeur de Maplyo. Payez uniquement quand vous voulez aller plus loin.",
      free: {
        name: "Free",
        price: "0 DH",
        desc: "Pour lancer un établissement et garder votre guide actif.",
        badge: "Gratuit à vie",
        features: ["1 guide publié", "Lien + QR code permanent", "Éditeur complet", "Thèmes essentiels", "30 jours de Pro offerts au démarrage"],
        cta: "Créer gratuitement"
      },
      pro: {
        name: "Pro",
        priceSuffix: "/mois",
        desc: "Pour automatiser, personnaliser et développer les revenus.",
        badge: "30 jours offerts",
        features: ["2 guides inclus", "Concierge IA", "Traduction multilingue", "Thèmes premium", "Analytics & support prioritaire"],
        cta: "Essayer Pro gratuitement"
      },
      business: {
        name: "Business",
        price: "Sur mesure",
        desc: "Pour conciergeries, portfolios, riads et hôtels.",
        features: ["Multi-propriétés", "Team & rôles", "Stay Operations", "Guest Requests", "Guest Journey & Revenue Center"],
        cta: "Parler à l’équipe"
      },
      reassurance: "Sans carte bancaire pour commencer · Sans engagement · Votre guide Free reste actif après l’essai"
    },
    faq: {
      title: "Les questions qui bloquent l’achat.",
      items: [
        { q: "Que se passe-t-il après les 30 jours Pro ?", a: "Si vous ne souscrivez pas, votre compte revient simplement sur Free. Votre premier guide reste publié et utilisable." },
        { q: "Faut-il une carte bancaire pour essayer ?", a: "Non. Vous créez votre compte et profitez du reverse trial Pro sans carte bancaire." },
        { q: "Puis-je créer le guide depuis mon annonce Airbnb ?", a: "Oui. Vous pouvez fournir le lien de votre annonce pour accélérer la création, puis vous vérifiez et modifiez les informations avant publication." },
        { q: "Mes voyageurs doivent-ils installer une application ?", a: "Non. Maplyo fonctionne dans le navigateur via un lien ou un QR code." },
        { q: "Maplyo remplace-t-il mon PMS ou mon channel manager ?", a: "Non. Maplyo se place au-dessus de vos outils existants pour gérer l’expérience voyageur, les services, les demandes et l’engagement." }
      ]
    },
    final: {
      title: "Créez-le avant de décider si vous voulez payer.",
      subtitle: "Votre premier guide est gratuit. Les fonctionnalités Pro sont ouvertes pendant 30 jours pour que vous puissiez juger Maplyo sur un vrai séjour.",
      cta: "Créer mon guide maintenant",
      subtext: "0 DH · sans carte bancaire · guide Free conservé après l’essai"
    },
    signup: {
      title: "Créez votre première expérience voyageur",
      subtitle: "1 guide publié gratuit à vie + 30 jours Pro offerts. Sans carte bancaire.",
      email: "Email",
      password: "Mot de passe",
      passwordPlaceholder: "6 caractères minimum",
      button: "Continuer vers ma propriété",
      loading: "Création du compte…",
      checkInbox: "Vérifiez votre boîte mail",
      checkInboxBody: "Nous avons envoyé un lien de confirmation. Après validation, vous continuerez directement vers votre propriété.",
      continueLogin: "Continuer vers la connexion",
      existing: "Vous avez déjà un compte ?",
      signIn: "Se connecter",
      termsPrefix: "En continuant, vous acceptez les",
      terms: "Conditions",
      privacy: "Politique de confidentialité"
    }
  },
  en: {
    nav: { product: "Product", solutions: "Solutions", pricing: "Pricing", demo: "Demo", login: "Log in", cta: "Create free" },
    hero: {
      eyebrow: "FOR RENTALS, PROPERTY MANAGERS, RIADS & HOTELS",
      title: "Fewer repetitive messages. More services sold. A better guest experience.",
      subtitle: "Paste your Airbnb listing or property website. Maplyo turns your information into a multilingual guest experience with AI concierge, add-on services, QR access and stay journeys — no guest app required.",
      primary: "Create my free guide",
      secondary: "See a real demo",
      offer: "1 published guide free forever · 30 days of Pro included · No credit card",
      fallback: "After 30 days, your guide stays live on Free. You keep your work.",
      importHint: "Airbnb · Hotel/riad website · Manual setup"
    },
    outcomes: {
      title: "Maplyo should create an outcome, not just look good.",
      subtitle: "Every module targets a real hospitality operating problem.",
      cards: [
        { title: "Reduce repetitive questions", text: "Wi‑Fi, arrival, parking, rules, recommendations and practical details stay available 24/7." },
        { title: "Create ancillary revenue", text: "Late checkout, transfers, breakfast, cleaning and local experiences live inside the guest journey." },
        { title: "Serve guests in their language", text: "A multilingual experience and AI concierge grounded in property-approved information." },
        { title: "Operate multiple properties", text: "Portfolio, stays, requests, revenue and automations from one command center." }
      ]
    },
    proof: {
      eyebrow: "PRODUCT PROOF, NOT HYPE",
      title: "What you can actually test today.",
      subtitle: "No fabricated reviews or invented numbers: open the demo, create your guide and judge the product yourself.",
      cards: [
        { title: "One guest link", text: "QR code or web link. No guest download." },
        { title: "Assisted creation", text: "Import from Airbnb, your property website or manual information." },
        { title: "AI concierge", text: "Answers grounded in information the property chooses to publish." },
        { title: "Services & orders", text: "Guests can request extras directly from their experience." },
        { title: "7 languages", text: "French, English, Spanish, Arabic, Dutch, Chinese and Portuguese." },
        { title: "Multi-property mode", text: "Portfolio Command Center, team, stays, requests and revenue." }
      ]
    },
    how: {
      eyebrow: "3 STEPS",
      title: "From property information to a live guest experience.",
      steps: [
        { title: "1. Import", text: "Add your Airbnb link, website or existing property information." },
        { title: "2. Personalize", text: "Review the content and add services, branding and operational information." },
        { title: "3. Share & measure", text: "Send the link pre-arrival, place the QR on site and track engagement, requests and revenue." }
      ]
    },
    segments: {
      title: "One engine, three commercial journeys.",
      subtitle: "Maplyo scales with the complexity of your operation.",
      cards: [
        { title: "Vacation rentals", text: "A useful guide built fast, fewer repetitive messages and more add-on sales.", cta: "For hosts" },
        { title: "Property managers", text: "Centralize dozens of properties, your team, stays, requests and revenue.", cta: "For property managers" },
        { title: "Riads & hotels", text: "Room/stay experience, concierge, services, requests and pre-arrival automation.", cta: "For hotels & riads" }
      ]
    },
    pricing: {
      eyebrow: "START WITHOUT RISK",
      title: "Your first guide should not require a buying decision.",
      subtitle: "Experience the real value of Maplyo first. Pay when you want to go further.",
      free: {
        name: "Free",
        price: "$0",
        desc: "Launch one property and keep your guide live.",
        badge: "Free forever",
        features: ["1 published guide", "Permanent link + QR code", "Full editor", "Essential themes", "30 days of Pro included at signup"],
        cta: "Create for free"
      },
      pro: {
        name: "Pro",
        priceSuffix: "/month",
        desc: "Automate, personalize and grow guest revenue.",
        badge: "30 days included",
        features: ["2 guides included", "AI concierge", "Multilingual translation", "Premium themes", "Analytics & priority support"],
        cta: "Try Pro free"
      },
      business: {
        name: "Business",
        price: "Custom",
        desc: "For property managers, portfolios, riads and hotels.",
        features: ["Multi-property", "Team & roles", "Stay Operations", "Guest Requests", "Guest Journey & Revenue Center"],
        cta: "Talk to sales"
      },
      reassurance: "No credit card to start · No commitment · Your Free guide remains live after the trial"
    },
    faq: {
      title: "The questions that usually block signup.",
      items: [
        { q: "What happens after the 30 Pro days?", a: "If you do not subscribe, the account simply falls back to Free. Your first guide remains published and usable." },
        { q: "Do I need a credit card to try it?", a: "No. Create your account and use the Pro reverse trial without entering a card." },
        { q: "Can I create the guide from my Airbnb listing?", a: "Yes. You can provide your listing URL to accelerate creation, then review and edit the information before publishing." },
        { q: "Do guests need to install an app?", a: "No. Maplyo runs in the browser through a link or QR code." },
        { q: "Does Maplyo replace my PMS or channel manager?", a: "No. Maplyo sits above your existing stack for guest experience, services, requests and engagement." }
      ]
    },
    final: {
      title: "Build it before deciding whether to pay.",
      subtitle: "Your first guide is free. Pro features are open for 30 days so you can judge Maplyo on a real stay.",
      cta: "Create my guide now",
      subtext: "$0 · no credit card · keep your Free guide after the trial"
    },
    signup: {
      title: "Create your first guest experience",
      subtitle: "1 published guide free forever + 30 days of Pro included. No credit card.",
      email: "Email",
      password: "Password",
      passwordPlaceholder: "6+ characters",
      button: "Continue to my property",
      loading: "Creating account…",
      checkInbox: "Check your inbox",
      checkInboxBody: "We sent a confirmation link. After confirming, you will continue directly to your property.",
      continueLogin: "Continue to login",
      existing: "Already have an account?",
      signIn: "Sign in",
      termsPrefix: "By continuing, you agree to the",
      terms: "Terms",
      privacy: "Privacy Policy"
    }
  },
  es: {
    nav: { product: "Producto", solutions: "Soluciones", pricing: "Precios", demo: "Demo", login: "Entrar", cta: "Crear gratis" },
    hero: {
      eyebrow: "PARA ALQUILERES, GESTORES, RIADS Y HOTELES",
      title: "Menos mensajes repetitivos. Más servicios vendidos. Una mejor experiencia huésped.",
      subtitle: "Pega tu anuncio de Airbnb o la web del alojamiento. Maplyo convierte tu información en una experiencia multilingüe con conserje IA, servicios extra, QR y recorridos de estancia, sin app para el huésped.",
      primary: "Crear mi guía gratis",
      secondary: "Ver una demo real",
      offer: "1 guía publicada gratis para siempre · 30 días Pro incluidos · Sin tarjeta",
      fallback: "Después de 30 días, tu guía sigue activa en Free. Conservas todo tu trabajo.",
      importHint: "Airbnb · Web de hotel/riad · Configuración manual"
    },
    outcomes: {
      title: "Maplyo debe generar resultados, no solo verse bien.",
      subtitle: "Cada módulo resuelve un problema operativo real.",
      cards: [
        { title: "Reducir preguntas repetitivas", text: "Wi‑Fi, llegada, parking, normas y recomendaciones disponibles 24/7." },
        { title: "Crear ingresos extra", text: "Late checkout, traslados, desayuno, limpieza y experiencias dentro del recorrido huésped." },
        { title: "Atender en su idioma", text: "Experiencia multilingüe y conserje IA basado en información validada." },
        { title: "Gestionar varias propiedades", text: "Portfolio, estancias, solicitudes, ingresos y automatizaciones desde un solo panel." }
      ]
    },
    proof: {
      eyebrow: "PRUEBA DE PRODUCTO, NO PROMESAS",
      title: "Lo que puedes probar hoy.",
      subtitle: "Sin reseñas inventadas: abre la demo, crea tu guía y evalúa Maplyo por ti mismo.",
      cards: [
        { title: "Un enlace para el huésped", text: "QR o enlace web. Sin descargar ninguna app." },
        { title: "Creación asistida", text: "Importa desde Airbnb, tu web o información manual." },
        { title: "Conserje IA", text: "Respuestas basadas en la información publicada por el alojamiento." },
        { title: "Servicios y pedidos", text: "Los huéspedes pueden solicitar extras desde su experiencia." },
        { title: "7 idiomas", text: "Francés, inglés, español, árabe, neerlandés, chino y portugués." },
        { title: "Multi-propiedad", text: "Portfolio, equipo, estancias, solicitudes e ingresos." }
      ]
    },
    how: {
      eyebrow: "3 PASOS",
      title: "De la propiedad a una experiencia huésped activa.",
      steps: [
        { title: "1. Importa", text: "Añade tu enlace Airbnb, web o información existente." },
        { title: "2. Personaliza", text: "Revisa el contenido y añade servicios, marca e información operativa." },
        { title: "3. Comparte y mide", text: "Envía el enlace antes de la llegada, coloca el QR y mide interacción, solicitudes e ingresos." }
      ]
    },
    segments: {
      title: "Un motor, tres recorridos comerciales.",
      subtitle: "Maplyo crece con la complejidad de tu operación.",
      cards: [
        { title: "Alquileres vacacionales", text: "Guía rápida, menos mensajes y más ventas adicionales.", cta: "Para anfitriones" },
        { title: "Gestores de propiedades", text: "Centraliza propiedades, equipo, estancias, solicitudes e ingresos.", cta: "Para gestores" },
        { title: "Riads y hoteles", text: "Experiencia de estancia, conserje, servicios y automatización pre-llegada.", cta: "Para hoteles y riads" }
      ]
    },
    pricing: {
      eyebrow: "EMPIEZA SIN RIESGO",
      title: "Tu primera guía no debería exigir una decisión de compra.",
      subtitle: "Prueba el valor real de Maplyo. Paga solo cuando quieras ir más lejos.",
      free: { name: "Free", price: "0 €", desc: "Lanza un alojamiento y mantén tu guía activa.", badge: "Gratis para siempre", features: ["1 guía publicada", "Enlace + QR permanente", "Editor completo", "Temas esenciales", "30 días Pro incluidos"], cta: "Crear gratis" },
      pro: { name: "Pro", priceSuffix: "/mes", desc: "Automatiza, personaliza y aumenta ingresos.", badge: "30 días incluidos", features: ["2 guías incluidas", "Conserje IA", "Traducción multilingüe", "Temas premium", "Analítica y soporte prioritario"], cta: "Probar Pro gratis" },
      business: { name: "Business", price: "A medida", desc: "Para gestores, portfolios, riads y hoteles.", features: ["Multi-propiedad", "Equipo y roles", "Stay Operations", "Guest Requests", "Guest Journey y Revenue Center"], cta: "Hablar con ventas" },
      reassurance: "Sin tarjeta para empezar · Sin compromiso · Tu guía Free sigue activa tras la prueba"
    },
    faq: {
      title: "Las preguntas que frenan el registro.",
      items: [
        { q: "¿Qué pasa después de los 30 días Pro?", a: "Si no te suscribes, vuelves a Free y tu primera guía sigue publicada." },
        { q: "¿Necesito tarjeta bancaria?", a: "No. El periodo Pro se activa sin tarjeta." },
        { q: "¿Puedo crear la guía desde Airbnb?", a: "Sí. Añade la URL del anuncio, revisa la información y publícala." },
        { q: "¿El huésped debe instalar una app?", a: "No. Todo funciona por enlace o QR en el navegador." },
        { q: "¿Maplyo sustituye mi PMS?", a: "No. Se coloca sobre tus herramientas para gestionar experiencia, servicios y solicitudes." }
      ]
    },
    final: { title: "Créala antes de decidir si quieres pagar.", subtitle: "Tu primera guía es gratis y Pro está abierto durante 30 días para probarlo en una estancia real.", cta: "Crear mi guía ahora", subtext: "0 € · sin tarjeta · conserva tu guía Free" },
    signup: { title: "Crea tu primera experiencia huésped", subtitle: "1 guía publicada gratis para siempre + 30 días Pro. Sin tarjeta.", email: "Email", password: "Contraseña", passwordPlaceholder: "6+ caracteres", button: "Continuar a mi propiedad", loading: "Creando cuenta…", checkInbox: "Revisa tu email", checkInboxBody: "Te enviamos un enlace de confirmación. Después continuarás directamente a tu propiedad.", continueLogin: "Continuar al acceso", existing: "¿Ya tienes cuenta?", signIn: "Entrar", termsPrefix: "Al continuar aceptas los", terms: "Términos", privacy: "Política de privacidad" }
  },
  ar: {
    nav: { product: "المنتج", solutions: "الحلول", pricing: "الأسعار", demo: "تجربة", login: "تسجيل الدخول", cta: "ابدأ مجاناً" },
    hero: {
      eyebrow: "للإيجارات ومديري العقارات والرياض والفنادق",
      title: "رسائل متكررة أقل. خدمات مباعة أكثر. تجربة ضيف أفضل.",
      subtitle: "ألصق رابط Airbnb أو موقع المنشأة. يحول Maplyo معلوماتك إلى تجربة ضيف متعددة اللغات مع مساعد ذكي وخدمات إضافية ورمز QR ورحلة إقامة كاملة، بدون تطبيق للضيف.",
      primary: "إنشاء دليلي المجاني",
      secondary: "مشاهدة تجربة حقيقية",
      offer: "دليل منشور مجاني دائماً · 30 يوماً Pro مجاناً · بدون بطاقة",
      fallback: "بعد 30 يوماً يبقى دليلك فعالاً على الخطة المجانية ولن تفقد عملك.",
      importHint: "Airbnb · موقع الفندق/الرياض · إعداد يدوي"
    },
    outcomes: {
      title: "Maplyo يجب أن يحقق نتيجة، لا أن يبدو جميلاً فقط.",
      subtitle: "كل وحدة تعالج مشكلة تشغيلية حقيقية في الضيافة.",
      cards: [
        { title: "تقليل الأسئلة المتكررة", text: "الواي فاي والوصول والمواقف والقواعد والتوصيات متاحة للضيف طوال الوقت." },
        { title: "زيادة الإيرادات الإضافية", text: "تسجيل خروج متأخر ونقل وفطور وتنظيف وتجارب محلية داخل رحلة الضيف." },
        { title: "خدمة الضيف بلغته", text: "تجربة متعددة اللغات ومساعد ذكي يعتمد على معلومات المنشأة المعتمدة." },
        { title: "إدارة عدة منشآت", text: "المحفظة والإقامات والطلبات والإيرادات والأتمتة من لوحة واحدة." }
      ]
    },
    proof: {
      eyebrow: "دليل منتج، لا وعود",
      title: "ما يمكنك تجربته فعلاً اليوم.",
      subtitle: "لا تقييمات مختلقة ولا أرقام مصطنعة: افتح التجربة وأنشئ دليلك واحكم بنفسك.",
      cards: [
        { title: "رابط ضيف واحد", text: "QR أو رابط ويب بدون تحميل تطبيق." },
        { title: "إنشاء مساعد", text: "استيراد من Airbnb أو موقع المنشأة أو إدخال يدوي." },
        { title: "مساعد ذكي", text: "إجابات مبنية على المعلومات التي تنشرها المنشأة." },
        { title: "خدمات وطلبات", text: "يمكن للضيف طلب الخدمات الإضافية مباشرة." },
        { title: "7 لغات", text: "الفرنسية والإنجليزية والإسبانية والعربية والهولندية والصينية والبرتغالية." },
        { title: "عدة منشآت", text: "محفظة وفريق وإقامات وطلبات وإيرادات." }
      ]
    },
    how: {
      eyebrow: "3 خطوات",
      title: "من معلومات المنشأة إلى تجربة ضيف فعالة.",
      steps: [
        { title: "1. استورد", text: "أضف رابط Airbnb أو موقعك أو معلوماتك الحالية." },
        { title: "2. خصص", text: "راجع المحتوى وأضف الخدمات والهوية والمعلومات التشغيلية." },
        { title: "3. شارك وقِس", text: "أرسل الرابط قبل الوصول، ضع QR في الموقع وتابع التفاعل والطلبات والإيرادات." }
      ]
    },
    segments: {
      title: "محرك واحد لثلاثة أنواع من الأعمال.",
      subtitle: "Maplyo يتوسع مع تعقيد عملياتك.",
      cards: [
        { title: "الإيجارات السياحية", text: "دليل سريع وأسئلة أقل ومبيعات إضافية أكثر.", cta: "للمضيفين" },
        { title: "مديرو العقارات", text: "مركزة العقارات والفريق والإقامات والطلبات والإيرادات.", cta: "لمديري العقارات" },
        { title: "الرياض والفنادق", text: "تجربة إقامة ومساعد وخدمات وطلبات وأتمتة قبل الوصول.", cta: "للفنادق والرياض" }
      ]
    },
    pricing: {
      eyebrow: "ابدأ بدون مخاطرة",
      title: "دليلك الأول لا يجب أن يتطلب قرار شراء.",
      subtitle: "جرّب قيمة Maplyo الحقيقية أولاً وادفع عندما تحتاج المزيد.",
      free: { name: "Free", price: "0", desc: "شغّل منشأة واحدة واحتفظ بدليلك فعالاً.", badge: "مجاني دائماً", features: ["دليل منشور واحد", "رابط + QR دائم", "محرر كامل", "قوالب أساسية", "30 يوماً Pro عند التسجيل"], cta: "ابدأ مجاناً" },
      pro: { name: "Pro", priceSuffix: "/شهر", desc: "أتمت وخصص ونمِّ إيرادات الضيوف.", badge: "30 يوماً مجاناً", features: ["دليلان", "مساعد ذكي", "ترجمة متعددة اللغات", "قوالب Premium", "تحليلات ودعم أولوية"], cta: "جرب Pro مجاناً" },
      business: { name: "Business", price: "حسب الطلب", desc: "للمحافظ والرياض والفنادق.", features: ["عدة منشآت", "فريق وصلاحيات", "Stay Operations", "Guest Requests", "Guest Journey وRevenue Center"], cta: "تحدث مع المبيعات" },
      reassurance: "بدون بطاقة للبدء · بدون التزام · دليلك المجاني يبقى فعالاً"
    },
    faq: {
      title: "الأسئلة التي تمنع التسجيل.",
      items: [
        { q: "ماذا يحدث بعد 30 يوماً Pro؟", a: "إذا لم تشترك تعود إلى Free ويبقى دليلك الأول منشوراً وقابلاً للاستخدام." },
        { q: "هل أحتاج بطاقة بنكية؟", a: "لا. يبدأ Pro لمدة 30 يوماً بدون بطاقة." },
        { q: "هل يمكن إنشاء الدليل من Airbnb؟", a: "نعم. أضف رابط الإعلان ثم راجع المعلومات وعدّلها قبل النشر." },
        { q: "هل يحتاج الضيف لتطبيق؟", a: "لا. كل شيء يعمل عبر رابط أو QR في المتصفح." },
        { q: "هل يستبدل Maplyo نظام PMS؟", a: "لا. يعمل فوق أدواتك لإدارة تجربة الضيف والخدمات والطلبات." }
      ]
    },
    final: { title: "أنشئه أولاً ثم قرر إن كنت تريد الدفع.", subtitle: "دليلك الأول مجاني وميزات Pro مفتوحة 30 يوماً لتجربتها مع إقامة حقيقية.", cta: "أنشئ دليلي الآن", subtext: "بدون بطاقة · دليلك المجاني يبقى بعد التجربة" },
    signup: { title: "أنشئ أول تجربة ضيف", subtitle: "دليل منشور مجاني دائماً + 30 يوماً Pro. بدون بطاقة.", email: "البريد الإلكتروني", password: "كلمة المرور", passwordPlaceholder: "6 أحرف على الأقل", button: "المتابعة إلى منشأتي", loading: "جارٍ إنشاء الحساب…", checkInbox: "تحقق من بريدك", checkInboxBody: "أرسلنا رابط تأكيد. بعد التأكيد ستنتقل مباشرة لإعداد منشأتك.", continueLogin: "المتابعة لتسجيل الدخول", existing: "لديك حساب؟", signIn: "تسجيل الدخول", termsPrefix: "بالمتابعة أنت توافق على", terms: "الشروط", privacy: "سياسة الخصوصية" }
  },
  nl: {
    nav: { product: "Product", solutions: "Oplossingen", pricing: "Prijzen", demo: "Demo", login: "Inloggen", cta: "Gratis starten" },
    hero: {
      eyebrow: "VOOR VERHUURDERS, BEHEERDERS, RIADS & HOTELS",
      title: "Minder herhaalvragen. Meer verkochte services. Een betere gastervaring.",
      subtitle: "Plak je Airbnb-link of accommodatiewebsite. Maplyo maakt er een meertalige gastervaring van met AI-conciërge, extra services, QR-code en verblijfstrajecten — zonder gast-app.",
      primary: "Mijn gratis gids maken",
      secondary: "Bekijk een echte demo",
      offer: "1 gepubliceerde gids altijd gratis · 30 dagen Pro inbegrepen · Geen creditcard",
      fallback: "Na 30 dagen blijft je gids actief op Free. Je werk blijft behouden.",
      importHint: "Airbnb · Hotel/riad-website · Handmatig"
    },
    outcomes: {
      title: "Maplyo moet resultaat opleveren, niet alleen mooi zijn.",
      subtitle: "Elke module lost een echt hospitality-probleem op.",
      cards: [
        { title: "Minder herhaalvragen", text: "Wifi, aankomst, parkeren, regels en tips zijn 24/7 beschikbaar." },
        { title: "Meer extra omzet", text: "Late checkout, transfer, ontbijt, schoonmaak en lokale ervaringen in de gastreis." },
        { title: "Service in de taal van de gast", text: "Meertalige ervaring en AI-conciërge op basis van goedgekeurde informatie." },
        { title: "Meerdere accommodaties beheren", text: "Portfolio, verblijven, verzoeken, omzet en automatisering vanuit één cockpit." }
      ]
    },
    proof: {
      eyebrow: "PRODUCTBEWIJS, GEEN HYPE",
      title: "Wat je vandaag echt kunt testen.",
      subtitle: "Geen verzonnen reviews: open de demo, maak je gids en beoordeel Maplyo zelf.",
      cards: [
        { title: "Eén gastlink", text: "QR of web-link. Geen download." },
        { title: "Ondersteunde creatie", text: "Importeer vanuit Airbnb, je website of handmatige gegevens." },
        { title: "AI-conciërge", text: "Antwoorden op basis van gepubliceerde accommodatie-informatie." },
        { title: "Services & bestellingen", text: "Gasten vragen extra services direct aan." },
        { title: "7 talen", text: "Frans, Engels, Spaans, Arabisch, Nederlands, Chinees en Portugees." },
        { title: "Multi-property", text: "Portfolio, team, verblijven, verzoeken en omzet." }
      ]
    },
    how: {
      eyebrow: "3 STAPPEN",
      title: "Van accommodatie-info naar een actieve gastervaring.",
      steps: [
        { title: "1. Importeren", text: "Voeg je Airbnb-link, website of bestaande informatie toe." },
        { title: "2. Personaliseren", text: "Controleer content en voeg services, branding en operationele info toe." },
        { title: "3. Delen & meten", text: "Stuur de link vooraf, plaats de QR en meet engagement, verzoeken en omzet." }
      ]
    },
    segments: {
      title: "Eén motor, drie commerciële trajecten.",
      subtitle: "Maplyo groeit mee met je operatie.",
      cards: [
        { title: "Vakantieverhuur", text: "Snel een nuttige gids, minder berichten en meer extra verkoop.", cta: "Voor hosts" },
        { title: "Property managers", text: "Centraliseer accommodaties, team, verblijven, verzoeken en omzet.", cta: "Voor beheerders" },
        { title: "Riads & hotels", text: "Verblijfservaring, conciërge, services en pre-arrival automation.", cta: "Voor hotels & riads" }
      ]
    },
    pricing: {
      eyebrow: "START ZONDER RISICO",
      title: "Je eerste gids mag geen aankoopbeslissing vereisen.",
      subtitle: "Test eerst de echte waarde van Maplyo. Betaal pas als je verder wilt.",
      free: { name: "Free", price: "€0", desc: "Start één accommodatie en houd je gids live.", badge: "Altijd gratis", features: ["1 gepubliceerde gids", "Permanente link + QR", "Volledige editor", "Essentiële thema's", "30 dagen Pro inbegrepen"], cta: "Gratis maken" },
      pro: { name: "Pro", priceSuffix: "/maand", desc: "Automatiseer, personaliseer en groei gastomzet.", badge: "30 dagen inbegrepen", features: ["2 gidsen", "AI-conciërge", "Meertalige vertaling", "Premium thema's", "Analytics & prioriteitsupport"], cta: "Pro gratis proberen" },
      business: { name: "Business", price: "Op maat", desc: "Voor beheerders, portfolio's, riads en hotels.", features: ["Multi-property", "Team & rollen", "Stay Operations", "Guest Requests", "Guest Journey & Revenue Center"], cta: "Praat met sales" },
      reassurance: "Geen creditcard · Geen verplichting · Je Free-gids blijft actief"
    },
    faq: {
      title: "Vragen die registratie meestal tegenhouden.",
      items: [
        { q: "Wat gebeurt er na 30 Pro-dagen?", a: "Zonder abonnement val je terug op Free en blijft je eerste gids gepubliceerd." },
        { q: "Heb ik een creditcard nodig?", a: "Nee. De 30 Pro-dagen starten zonder kaart." },
        { q: "Kan ik mijn Airbnb-link gebruiken?", a: "Ja. Voeg de URL toe, controleer de informatie en publiceer." },
        { q: "Moeten gasten een app installeren?", a: "Nee. Alles werkt via link of QR in de browser." },
        { q: "Vervangt Maplyo mijn PMS?", a: "Nee. Maplyo werkt bovenop je bestaande tools voor gastervaring en operations." }
      ]
    },
    final: { title: "Bouw het voordat je beslist te betalen.", subtitle: "Je eerste gids is gratis en Pro staat 30 dagen open om Maplyo tijdens een echt verblijf te testen.", cta: "Mijn gids maken", subtext: "€0 · geen creditcard · behoud je Free-gids" },
    signup: { title: "Maak je eerste gastervaring", subtitle: "1 gepubliceerde gids altijd gratis + 30 dagen Pro. Geen creditcard.", email: "E-mail", password: "Wachtwoord", passwordPlaceholder: "Minimaal 6 tekens", button: "Naar mijn accommodatie", loading: "Account maken…", checkInbox: "Controleer je inbox", checkInboxBody: "We stuurden een bevestigingslink. Daarna ga je direct naar je accommodatie.", continueLogin: "Ga naar inloggen", existing: "Heb je al een account?", signIn: "Inloggen", termsPrefix: "Door verder te gaan accepteer je de", terms: "Voorwaarden", privacy: "Privacyverklaring" }
  },
  zh: {
    nav: { product: "产品", solutions: "解决方案", pricing: "价格", demo: "演示", login: "登录", cta: "免费创建" },
    hero: {
      eyebrow: "适用于短租、物业管理、RIAD 与酒店",
      title: "更少重复消息。销售更多服务。提供更好的住客体验。",
      subtitle: "粘贴 Airbnb 房源链接或酒店网站。Maplyo 会将信息转化为多语言住客体验，包含 AI 礼宾、增值服务、二维码和入住旅程，无需下载住客 App。",
      primary: "创建免费指南",
      secondary: "查看真实演示",
      offer: "1 个已发布指南永久免费 · 30 天 Pro 免费 · 无需信用卡",
      fallback: "30 天后指南仍会在 Free 方案中保持在线，你不会丢失内容。",
      importHint: "Airbnb · 酒店/riad 网站 · 手动设置"
    },
    outcomes: {
      title: "Maplyo 应该带来结果，而不只是好看。",
      subtitle: "每个模块都解决真实的住宿运营问题。",
      cards: [
        { title: "减少重复问题", text: "Wi‑Fi、入住、停车、规则与推荐全天可用。" },
        { title: "增加附加收入", text: "延迟退房、接送、早餐、清洁和本地体验直接进入住客旅程。" },
        { title: "用住客的语言服务", text: "多语言体验与基于酒店已确认信息的 AI 礼宾。" },
        { title: "管理多家物业", text: "一个指挥中心管理组合、入住、请求、收入和自动化。" }
      ]
    },
    proof: {
      eyebrow: "产品证据，而不是宣传",
      title: "今天就能真正测试的功能。",
      subtitle: "没有虚构评价或数字：打开演示、创建指南，自己判断 Maplyo。",
      cards: [
        { title: "一个住客链接", text: "二维码或网页链接，无需下载。" },
        { title: "辅助创建", text: "从 Airbnb、酒店网站或手动信息导入。" },
        { title: "AI 礼宾", text: "根据酒店选择发布的信息回答。" },
        { title: "服务与订单", text: "住客可直接申请增值服务。" },
        { title: "7 种语言", text: "法语、英语、西班牙语、阿拉伯语、荷兰语、中文和葡萄牙语。" },
        { title: "多物业模式", text: "组合、团队、入住、请求与收入。" }
      ]
    },
    how: {
      eyebrow: "3 步",
      title: "从物业信息到在线住客体验。",
      steps: [
        { title: "1. 导入", text: "添加 Airbnb 链接、网站或现有物业信息。" },
        { title: "2. 个性化", text: "检查内容并添加服务、品牌和运营信息。" },
        { title: "3. 分享与衡量", text: "入住前发送链接，现场放置二维码，并跟踪互动、请求和收入。" }
      ]
    },
    segments: {
      title: "一个引擎，三类商业场景。",
      subtitle: "Maplyo 会随着运营复杂度扩展。",
      cards: [
        { title: "度假短租", text: "快速创建实用指南，减少消息并增加附加销售。", cta: "面向房东" },
        { title: "物业管理", text: "集中管理物业、团队、入住、请求和收入。", cta: "面向管理公司" },
        { title: "Riads 与酒店", text: "入住体验、礼宾、服务、请求与入住前自动化。", cta: "面向酒店" }
      ]
    },
    pricing: {
      eyebrow: "零风险开始",
      title: "第一份指南不应该要求你先做购买决定。",
      subtitle: "先体验 Maplyo 的真实价值，需要更多时再付费。",
      free: { name: "Free", price: "¥0", desc: "上线一家物业并保持指南在线。", badge: "永久免费", features: ["1 个已发布指南", "永久链接 + 二维码", "完整编辑器", "基础主题", "注册即含 30 天 Pro"], cta: "免费创建" },
      pro: { name: "Pro", priceSuffix: "/月", desc: "自动化、个性化并提升住客收入。", badge: "30 天免费", features: ["2 个指南", "AI 礼宾", "多语言翻译", "高级主题", "分析与优先支持"], cta: "免费试用 Pro" },
      business: { name: "Business", price: "定制", desc: "适用于管理公司、组合、riads 与酒店。", features: ["多物业", "团队与角色", "Stay Operations", "Guest Requests", "Guest Journey 与 Revenue Center"], cta: "联系销售" },
      reassurance: "无需信用卡 · 无长期承诺 · 试用后 Free 指南继续在线"
    },
    faq: {
      title: "通常阻碍注册的问题。",
      items: [
        { q: "30 天 Pro 后会怎样？", a: "如果不订阅，会自动回到 Free，第一份指南仍保持发布。" },
        { q: "需要信用卡吗？", a: "不需要。30 天 Pro 无需信用卡即可开始。" },
        { q: "可以从 Airbnb 创建吗？", a: "可以。添加房源链接，检查和编辑信息后发布。" },
        { q: "住客需要安装 App 吗？", a: "不需要。通过网页链接或二维码即可使用。" },
        { q: "Maplyo 会替代 PMS 吗？", a: "不会。Maplyo 位于现有系统之上，负责住客体验、服务和请求。" }
      ]
    },
    final: { title: "先做出来，再决定是否付费。", subtitle: "第一份指南免费，Pro 功能开放 30 天，让你在真实入住中体验。", cta: "立即创建指南", subtext: "¥0 · 无需信用卡 · 试用后保留 Free 指南" },
    signup: { title: "创建第一份住客体验", subtitle: "1 个已发布指南永久免费 + 30 天 Pro。无需信用卡。", email: "邮箱", password: "密码", passwordPlaceholder: "至少 6 个字符", button: "继续设置物业", loading: "正在创建账户…", checkInbox: "检查邮箱", checkInboxBody: "我们已发送确认链接。确认后将直接进入物业设置。", continueLogin: "继续登录", existing: "已有账户？", signIn: "登录", termsPrefix: "继续即表示你同意", terms: "条款", privacy: "隐私政策" }
  },
  pt: {
    nav: { product: "Produto", solutions: "Soluções", pricing: "Preços", demo: "Demo", login: "Entrar", cta: "Criar grátis" },
    hero: {
      eyebrow: "PARA ALUGUERES, GESTORES, RIADS E HOTÉIS",
      title: "Menos mensagens repetidas. Mais serviços vendidos. Uma melhor experiência do hóspede.",
      subtitle: "Cole o link do Airbnb ou o site do alojamento. O Maplyo transforma as informações numa experiência multilíngue com concierge IA, serviços extra, QR e jornadas de estadia — sem app para o hóspede.",
      primary: "Criar meu guia grátis",
      secondary: "Ver uma demo real",
      offer: "1 guia publicado grátis para sempre · 30 dias Pro incluídos · Sem cartão",
      fallback: "Depois de 30 dias, o seu guia continua ativo no Free e o trabalho fica guardado.",
      importHint: "Airbnb · Site hotel/riad · Configuração manual"
    },
    outcomes: {
      title: "O Maplyo deve gerar resultado, não apenas ser bonito.",
      subtitle: "Cada módulo resolve um problema real de operação.",
      cards: [
        { title: "Reduzir perguntas repetidas", text: "Wi‑Fi, chegada, estacionamento, regras e recomendações disponíveis 24/7." },
        { title: "Criar receita adicional", text: "Late checkout, transfer, pequeno-almoço, limpeza e experiências dentro da jornada." },
        { title: "Atender na língua do hóspede", text: "Experiência multilíngue e concierge IA baseado em informação validada." },
        { title: "Gerir vários alojamentos", text: "Portfolio, estadias, pedidos, receita e automações num único cockpit." }
      ]
    },
    proof: {
      eyebrow: "PROVA DE PRODUTO, NÃO HYPE",
      title: "O que pode realmente testar hoje.",
      subtitle: "Sem avaliações inventadas: abra a demo, crie o seu guia e avalie o Maplyo.",
      cards: [
        { title: "Um link para o hóspede", text: "QR ou link web. Sem download." },
        { title: "Criação assistida", text: "Importe do Airbnb, site ou informações manuais." },
        { title: "Concierge IA", text: "Respostas baseadas nas informações publicadas pelo alojamento." },
        { title: "Serviços e pedidos", text: "Hóspedes podem pedir extras diretamente." },
        { title: "7 idiomas", text: "Francês, inglês, espanhol, árabe, neerlandês, chinês e português." },
        { title: "Multi-property", text: "Portfolio, equipa, estadias, pedidos e receita." }
      ]
    },
    how: {
      eyebrow: "3 PASSOS",
      title: "Da informação do alojamento a uma experiência ativa.",
      steps: [
        { title: "1. Importe", text: "Adicione o link Airbnb, site ou informações existentes." },
        { title: "2. Personalize", text: "Revise o conteúdo e adicione serviços, branding e informações operacionais." },
        { title: "3. Partilhe e meça", text: "Envie antes da chegada, coloque o QR e acompanhe interação, pedidos e receita." }
      ]
    },
    segments: {
      title: "Um motor, três jornadas comerciais.",
      subtitle: "O Maplyo cresce com a complexidade da operação.",
      cards: [
        { title: "Alojamento local", text: "Guia rápido, menos mensagens e mais vendas adicionais.", cta: "Para anfitriões" },
        { title: "Gestores de propriedades", text: "Centralize alojamentos, equipa, estadias, pedidos e receita.", cta: "Para gestores" },
        { title: "Riads e hotéis", text: "Experiência de estadia, concierge, serviços e automação pré-chegada.", cta: "Para hotéis e riads" }
      ]
    },
    pricing: {
      eyebrow: "COMECE SEM RISCO",
      title: "O primeiro guia não deve exigir uma decisão de compra.",
      subtitle: "Teste primeiro o valor real do Maplyo. Pague apenas quando quiser avançar.",
      free: { name: "Free", price: "€0", desc: "Lance um alojamento e mantenha o guia ativo.", badge: "Grátis para sempre", features: ["1 guia publicado", "Link + QR permanente", "Editor completo", "Temas essenciais", "30 dias Pro incluídos"], cta: "Criar grátis" },
      pro: { name: "Pro", priceSuffix: "/mês", desc: "Automatize, personalize e aumente receita.", badge: "30 dias incluídos", features: ["2 guias", "Concierge IA", "Tradução multilíngue", "Temas premium", "Analytics e suporte prioritário"], cta: "Testar Pro grátis" },
      business: { name: "Business", price: "Sob consulta", desc: "Para gestores, portfolios, riads e hotéis.", features: ["Multi-property", "Equipa e funções", "Stay Operations", "Guest Requests", "Guest Journey e Revenue Center"], cta: "Falar com vendas" },
      reassurance: "Sem cartão · Sem compromisso · O seu guia Free continua ativo"
    },
    faq: {
      title: "As perguntas que costumam bloquear o registo.",
      items: [
        { q: "O que acontece após 30 dias Pro?", a: "Sem subscrição, volta ao Free e o primeiro guia continua publicado." },
        { q: "Preciso de cartão?", a: "Não. Os 30 dias Pro começam sem cartão." },
        { q: "Posso criar a partir do Airbnb?", a: "Sim. Adicione o URL, reveja os dados e publique." },
        { q: "O hóspede precisa de app?", a: "Não. Tudo funciona por link ou QR no navegador." },
        { q: "O Maplyo substitui o meu PMS?", a: "Não. Funciona sobre a sua stack para experiência, serviços e pedidos." }
      ]
    },
    final: { title: "Crie primeiro e decida depois se quer pagar.", subtitle: "O primeiro guia é grátis e o Pro fica aberto 30 dias para testar numa estadia real.", cta: "Criar meu guia agora", subtext: "€0 · sem cartão · mantenha o guia Free" },
    signup: { title: "Crie a primeira experiência do hóspede", subtitle: "1 guia publicado grátis para sempre + 30 dias Pro. Sem cartão.", email: "Email", password: "Palavra-passe", passwordPlaceholder: "6+ caracteres", button: "Continuar para o alojamento", loading: "A criar conta…", checkInbox: "Verifique o email", checkInboxBody: "Enviámos um link de confirmação. Depois seguirá diretamente para o alojamento.", continueLogin: "Continuar para login", existing: "Já tem conta?", signIn: "Entrar", termsPrefix: "Ao continuar aceita os", terms: "Termos", privacy: "Política de privacidade" }
  }
};

export function marketingCopy(lang: Language): MarketingCopy {
  return MARKETING_COPY[lang] || MARKETING_COPY.en;
}
