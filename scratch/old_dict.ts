export type Language = 'fr' | 'en' | 'es' | 'ar';

export const DICTIONARY = {
    fr: {
        common: {
            getStarted: "Commencer",
            login: "Connexion",
            signup: "S'inscrire",
            tryFree: "Essayer Gratuitement",
            popular: "Le plus populaire",
            month: "/mois",
            loading: "Chargement...",
            choose: "Choisir",
            viewGuide: "Voir le guide complet",
            more: "Voir plus",
            checkin: "Arriv├®e",
            qrCodeWall: "Scannez pour tester",
            checkout: "D├®part",
            location: "Localisation",
            viewOnMap: "Voir sur la carte",
            wifi: "WiFi",
        },
        socialProof: {
            trustpilot: "4.9/5 par 500+ H├┤tes",
            usedBy: "Utilis├® par les meilleures conciergeries",
            autoTranslate: {
                title: "Auto-Traduit",
                desc: "Vos guides parlent la langue de vos invit├®s."
            },
            googleMaps: {
                title: "Google Maps Int├®gr├®",
                desc: "Google Maps directement dans le guide."
            }
        },
        hero: {
            tag: "POUR LES H├öTES ET CONCIERGERIES",
            title: "Ne r├®p├®tez plus jamais le code WiFi.",
            subtitle: "Digitalisez votre livret d'accueil. Offrez une exp├®rience 5 ├®toiles, r├®duisez les messages de 50%, et augmentez vos avis positifs.",
            cta: "Cr├®er mon guide gratuit",
            demo: "Voir un exemple",
            noCreditCard: "Pas de carte requise",
            setupTime: "Configur├® en 2 min",
        },
        features: {
            title: "Tout ce dont vous avez besoin.",
            subtitle: "Rien de superflu.",
            description: "Des outils puissants pour automatiser votre accueil et rassurer vos voyageurs, sans la complexit├® technique.",
            items: {
                mobileFirst: {
                    title: "100% Mobile First",
                    desc: "Pas d'application ├á t├®l├®charger. Vos guides s'ouvrent instantan├®ment dans n'importe quel navigateur mobile."
                },
                secure: {
                    title: "Codes S├®curis├®s",
                    desc: "Prot├®gez l'acc├¿s au WiFi et aux bo├«tes ├á cl├®s. D├®verrouillage par email ou code unique."
                },
                map: {
                    title: "Carte Interactive",
                    desc: "Int├®grez vos restaurants, bars et activit├®s pr├®f├®r├®s avec itin├®raires Google Maps en un clic."
                },
                live: {
                    title: "Modifications Live",
                    desc: "Changez le code WiFi ou une recommandation, c'est mis ├á jour instantan├®ment sur tous les t├®l├®phones."
                },
                translate: {
                    title: "Traduction Auto",
                    desc: "D├®tecte automatiquement la langue du t├®l├®phone du visiteur et traduit votre guide."
                },
                checklist: {
                    title: "Check-lists",
                    desc: "Instructions claires pour l'arriv├®e et le d├®part. R├®duisez les questions r├®p├®titives de 80%."
                }
            }
        },
        pricing: {
            title: "Tarification Transparente",
            subtitle: "Commencez gratuitement. ├ëvoluez quand vous voulez.",
            bestOffer: "La meilleure offre du monde :",
            addon: "+20 DH / guide suppl├®mentaire",
            enterprise: {
                title: "Besoin d'une solution Enterprise ?",
                desc: "Pour les gestionnaires de plus de 50 propri├®t├®s, nous proposons des tarifs d├®gressifs et une int├®gration PMS.",
                cta: "Contacter l'├®quipe commerciale"
            },
            plans: {
                demo: {
                    name: "D├®couverte",
                    price: "Gratuit",
                    desc: "Testez la puissance de Maplyo sans carte bancaire.",
                    button: "Cr├®er un guide (Gratuit)",
                    features: [
                        'Acc├¿s complet au Cr├®ateur',
                        'Pr├®visualisation Mobile',
                        'Sans publication'
                    ]
                },
                basic: {
                    name: "Essentiel", // Was Basic
                    desc: "Pour lancer votre premi├¿re propri├®t├®.",
                    button: "D├®marrer",
                    features: [
                        'Livret Digital Complet',
                        'QR Code WiFi Instantan├®',
                        'Carte Interactive (Google Maps)',
                        'Th├¿mes Gratuits (Pack Premium +15 DH)',
                        '1 Guide Unique'
                    ]
                },
                pro: {
                    name: "Croissance", // Was Pro
                    desc: "Pour maximiser vos revenus & avis.",
                    button: "Passer en Croissance",
                    features: [
                        'Guides Illimit├®s (+20 DH/supp.)',
                        'Th├¿mes Premium INCLUS',
                        'Traduction Automatique (IA)',
                        'Assistant Voyageur 24/7 (IA)',
                        'Support Prioritaire WhatsApp'
                    ]
                },
                business: {
                    name: "Agence",
                    desc: "Pour les portfolios de 10+ biens.",
                    button: "Parler ├á un Expert",
                    price: "Sur mesure",
                    features: [
                        'Guides Illimit├®s',
                        'Tableau de Bord Multi-Propri├®t├®s',
                        'Marque Blanche (Sans logo Maplyo)',
                        'Int├®gration PMS & Channel Mgr',
                        'Facturation Centralis├®e'
                    ]
                }
            },
            trust: "Garantie Satisfait ou Rembours├® (30 jours) ÔÇó Paiement S├®curis├® SSL"
        },
        testimonials: {
            title: "Approuv├® par les Pros",
            subtitle: "Rejoignez plus de 500 h├┤tes qui ont automatis├® leur accueil.",
            items: [
                {
                    name: "Jean-Philippe R.",
                    role: "Superhost Airbnb (Marrakech)",
                    text: "Mes voyageurs arr├¬taient pas de demander le code Wifi ou comment allumer la clim. Avec Maplyo, ils ont tout sur leur t├®l├®phone. J'ai gagn├® facile 2h par semaine.",
                    result: "-60% de messages",
                },
                {
                    name: "Sofia B.",
                    role: "G├®rante Conciergerie (Casablanca)",
                    text: "Le game changer pour nous, c'est l'upsell. On propose des services de m├®nage ou de transport directement dans le guide. ├ça a boost├® notre chiffre d'affaires.",
                    result: "+15% revenus",
                },
                {
                    name: "Karim M.",
                    role: "Propri├®taire Riad (F├¿s)",
                    text: "Tr├¿s pro. L'aspect multilingue est bluffant, mes clients am├®ricains et espagnols sont ravis d'avoir les infos dans leur langue sans que je fasse rien.",
                    result: "5Ôÿà Avis",
                }
            ]
        },
        faq: {
            title: "Questions Fr├®quentes",
            subtitle: "Tout ce que vous devez savoir pour d├®marrer.",
            questions: [
                {
                    q: "Faut-il des comp├®tences techniques ?",
                    a: "Aucune. C'est aussi simple que de remplir un profil Facebook. Vous ajoutez vos infos, on g├®n├¿re le design."
                },
                {
                    q: "Comment mes voyageurs acc├¿dent au guide ?",
                    a: "Via un simple QR Code que vous placez dans le logement, ou un lien que vous envoyez par message avant leur arriv├®e."
                },
                {
                    q: "Puis-je modifier le guide apr├¿s impression du QR Code ?",
                    a: "Oui ! C'est la magie du num├®rique. Mettez ├á jour vos infos (code wifi, restos...) et le QR Code reste le m├¬me."
                },
                {
                    q: "Y a-t-il un engagement ?",
                    a: "Non, c'est sans engagement. Vous pouvez arr├¬ter quand vous voulez."
                }
            ]
        },
        footer: {
            product: "Produit",
            support: "Support",
            legal: "L├®gal",
            desc: "Maplyo aide les h├┤tes et les conciergeries ├á offrir une exp├®rience 5 ├®toiles gr├óce ├á des guides digitaux intelligents.",
            links: {
                features: "Fonctionnalit├®s",
                pricing: "Tarifs",
                testimonials: "T├®moignages",
                roadmap: "Roadmap",
                help: "Aide",
                contact: "Contact",
                privacy: "Confidentialit├®",
                terms: "Conditions",
                legal: "Mentions l├®gales"
            },
            securePayment: "Paiement S├®curis├®",
            rights: "Tous droits r├®serv├®s."
        },
        cta: {
            title: "Pr├¬t ├á impressionner ?",
            subtitle: "Rejoignez la nouvelle g├®n├®ration d'h├┤tes qui offrent une exp├®rience exceptionnelle.",
            button: "Cr├®er mon premier guide",
            subtext: "Aucune carte de cr├®dit requise ÔÇó Annulable ├á tout moment"
        },
        // Daily Tips
        tipOfTheDay: "Conseil du Jour",
        sunday: "Dimanche",
        monday: "Lundi",
        tuesday: "Mardi",
        wednesday: "Mercredi",
        thursday: "Jeudi",
        friday: "Vendredi",
        saturday: "Samedi",
        lazy: "D├®tente",
        mood: "Motiv├®",
        discovery: "D├®couverte",
        tasty: "Gourmand",
        adventure: "Aventure",
        festive: "Festif",
        outing: "Sortie",
        brunch: "Un brunch ├á",
        explore: "Explorez le centre de",
        museums: "Visitez les mus├®es de",
        taste: "Goutez aux sp├®cialit├®s de",
        excursion: "Partez en excursion.",
        nightlife: "La vie nocturne de",
        walk: "Baladez-vous ├á",
        guide: {
            accessCode: "Codes d'acc├¿s",
            locked: "Ce bloc est prot├®g├® par un code.",
            enterCode: "Code d'acc├¿s",
            apartmentDoor: "Porte logement :",
            buildingDoor: "Porte immeuble :",
            gate: "Portail :",
            notes: "Notes"
        },
        ai: {
            assistant: "Assistant Guide",
            online: "IA en ligne",
            placeholder: "Message...",
            empty: "Posez une question sur ce guide.",
            error: "D├®sol├®, je ne parviens pas ├á r├®pondre pour le moment.",
            thinking: "R├®daction..."
        },
        qrCodeWall: {
            titlePart1: "Partagez votre guide",
            titlePart2: "partout",
            description: "Un simple scan suffit pour vos voyageurs.",
            items: {
                wifi: { title: "Connexion Wi-Fi", desc: "Le code est pr├®-compl├®t├®" },
                perpetual: { title: "Acc├¿s Permanent", desc: "Le lien reste valide" },
                remote: { title: "Mises ├á jour en direct", desc: "Toujours ├á jour" }
            },
            visual: {
                welcome: "Bienvenue",
                scan: "Scannez-moi",
                detected: "Code QR D├®tect├®",
                notification: {
                    app: "Maplyo",
                    title: "Ouvrir le guide"
                }
            }
        },
        upsells: "Extras",
        legalPage: {
            titlePrivacy: "Politique de Confidentialit├®",
            titleTerms: "Conditions G├®n├®rales d'Utilisation (CGU)",
            lastUpdated: "Derni├¿re mise ├á jour :",
            effectiveDate: "En vigueur au :",
            privacy: {
                intro: "La pr├®sente politique de confidentialit├® d├®crit comment Maplyo ('nous', 'notre') collecte, utilise et prot├¿ge vos donn├®es personnelles, conform├®ment ├á la loi marocaine n┬░ 09-08 relative ├á la protection des personnes physiques ├á l'├®gard du traitement des donn├®es ├á caract├¿re personnel.",
                section1: {
                    title: "1. Collecte des Donn├®es",
                    items: [
                        "Donn├®es d'identification : Nom, pr├®nom, adresse email.",
                        "Donn├®es de transaction : Historique de paiements (trait├®s de mani├¿re s├®curis├®e par Stripe, nous ne stockons pas vos donn├®es bancaires compl├¿tes).",
                        "Donn├®es d'utilisation : Informations sur la cr├®ation et la consultation des guides num├®riques."
                    ]
                },
                section2: {
                    title: "2. Finalit├®s du Traitement",
                    intro: "Vos donn├®es sont collect├®es pour :",
                    items: [
                        "Fournir et g├®rer le service de guide num├®rique.",
                        "G├®rer votre abonnement et la facturation.",
                        "Vous communiquer les mises ├á jour importantes du service.",
                        "Am├®liorer nos fonctionnalit├®s gr├óce ├á des statistiques anonymis├®es."
                    ]
                },
                section3: {
                    title: "3. Partage des Donn├®es",
                    content: "Nous ne vendons jamais vos donn├®es. Elles peuvent ├¬tre partag├®es uniquement avec nos prestataires techniques essentiels (ex: Stripe pour les paiements, Supabase pour l'h├®bergement, Resend pour les emails) qui sont tenus ├á une stricte confidentialit├®."
                },
                section4: {
                    title: "4. S├®curit├®",
                    content: "Nous mettons en ┼ôuvre des mesures de s├®curit├® techniques (chiffrement SSL, protocoles s├®curis├®s) pour prot├®ger vos donn├®es contre tout acc├¿s non autoris├®."
                },
                section5: {
                    title: "5. Vos Droits",
                    content: "Conform├®ment ├á la loi 09-08, vous disposez d'un droit d'acc├¿s, de rectification et d'opposition concernant vos donn├®es.",
                    contact: "Pour exercer ce droit, contactez-nous ├á : contact@maplyo.com"
                }
            },
            terms: {
                intro: "Bienvenue sur Maplyo. En acc├®dant ├á notre plateforme ou en utilisant nos services, vous acceptez d'├¬tre li├® par les pr├®sentes Conditions G├®n├®rales d'Utilisation.",
                section1: {
                    title: "1. Description du Service",
                    content: "Maplyo est une plateforme SaaS (Software as a Service) permettant aux h├┤tes et gestionnaires immobiliers de cr├®er, h├®berger et partager des livrets d'accueil num├®riques pour leurs voyageurs."
                },
                section2: {
                    title: "2. Abonnements et Paiements",
                    items: [
                        "Facturation : Les services sont factur├®s mensuellement ou annuellement, d'avance.",
                        "Annulation : Vous pouvez annuler votre abonnement ├á tout moment via votre tableau de bord. L'acc├¿s aux fonctionnalit├®s Premium reste actif jusqu'├á la fin de la p├®riode factur├®e.",
                        "Remboursement : Nous offrons une garantie 'Satisfait ou Rembours├®' de 30 jours pour tout nouvel abonnement."
                    ]
                },
                section3: {
                    title: "3. Responsabilit├®s de l'Utilisateur",
                    intro: "Vous vous engagez ├á :",
                    items: [
                        "Fournir des informations exactes lors de votre inscription.",
                        "Ne pas publier de contenu illicite, diffamatoire ou contraire aux bonnes m┼ôurs dans vos guides.",
                        "├ètre seul responsable des informations (codes wifi, adresses) partag├®es avec vos voyageurs."
                    ]
                },
                section4: {
                    title: "4. Propri├®t├® Intellectuelle",
                    content: "Maplyo reste propri├®taire de la plateforme, du code, et de la marque. Vous restez propri├®taire du contenu (textes, photos) que vous ajoutez dans vos guides."
                },
                section5: {
                    title: "5. Limitation de Responsabilit├®",
                    content: "Maplyo ne saurait ├¬tre tenu responsable des dommages indirects, pertes de revenus ou probl├¿mes survenus suite ├á l'utilisation d'informations contenues dans les guides cr├®├®s par les utilisateurs."
                },
                section6: {
                    title: "6. Droit Applicable",
                    content: "Ces conditions sont r├®gies par le droit marocain. Tout litige relatif ├á leur interpr├®tation et/ou ├á leur ex├®cution rel├¿ve des tribunaux comp├®tents de Casablanca."
                }
            }
        }
    },



    en: {
        common: {
            getStarted: "Get Started",
            login: "Login",
            signup: "Sign up",
            tryFree: "Try for Free",
            popular: "Most Popular",
            month: "/month",
            loading: "Loading...",
            choose: "Choose",
            viewGuide: "View full guide",
            more: "See more",
            checkin: "Check-in",
            qrCodeWall: "Scan to test",
            checkout: "Check-out",
            location: "Location",
            viewOnMap: "View on map",
            wifi: "WiFi",
        },
        socialProof: {
            trustpilot: "4.9/5 by 500+ Hosts",
            usedBy: "Used by top property managers",
            autoTranslate: {
                title: "Auto-Translated",
                desc: "Your guides speak your guests' language."
            },
            googleMaps: {
                title: "Integrated Google Maps",
                desc: "Google Maps directly inside the guide."
            }
        },
        hero: {
            tag: "FOR HOSTS & PROPERTY MANAGERS",
            title: "Never repeat the WiFi code again.",
            subtitle: "Digitalize your welcome book. Offer a 5-star experience, reduce messages by 50%, and boost your positive reviews.",
            cta: "Create my free guide",
            demo: "See an example",
            noCreditCard: "No credit card required",
            setupTime: "Set up in 2 min",
        },
        features: {
            title: "Everything you need.",
            subtitle: "Nothing you don't.",
            description: "Powerful tools to automate your guest welcome and reassure your travelers, without technical complexity.",
            items: {
                mobileFirst: {
                    title: "100% Mobile First",
                    desc: "No app to download. Your guides open instantly in any mobile browser."
                },
                secure: {
                    title: "Secure Codes",
                    desc: "Protect access to WiFi and key boxes. Unlock via email or unique code."
                },
                map: {
                    title: "Interactive Map",
                    desc: "Embed your favorite restaurants, bars, and activities with one-click Google Maps directions."
                },
                live: {
                    title: "Live Updates",
                    desc: "Change a WiFi code or a recommendation, it updates instantly on all phones."
                },
                translate: {
                    title: "Auto-Translation",
                    desc: "Automatically detects guest's phone language and translates your guide."
                },
                checklist: {
                    title: "Checklists",
                    desc: "Clear check-in and check-out instructions. Reduce repetitive questions by 80%."
                }
            }
        },
        pricing: {
            title: "Transparent Pricing",
            subtitle: "Start for free. Scale when you want.",
            bestOffer: "The best offer in the world:",
            addon: "+20 DH / additional guide",
            enterprise: {
                title: "Need an Enterprise solution?",
                desc: "For managers with 50+ properties, we offer volume discounts and PMS integration.",
                cta: "Contact Sales Team"
            },
            plans: {
                demo: {
                    name: "Discovery",
                    price: "Free",
                    desc: "Test the power of Maplyo without a credit card.",
                    button: "Create a guide (Free)",
                    features: [
                        'Full access to Creator',
                        'Mobile Preview',
                        'No publishing'
                    ]
                },
                basic: {
                    name: "Essential",
                    desc: "To launch your first property.",
                    button: "Start Now",
                    features: [
                        'Complete Digital Guidebook',
                        'Instant WiFi QR Code',
                        'Interactive Map (Google Maps)',
                        'Free Themes (Premium Pack +15 DH)',
                        '1 Unique Guide'
                    ]
                },
                pro: {
                    name: "Growth",
                    desc: "To maximize your revenue & reviews.",
                    button: "Upgrade to Growth",
                    features: [
                        'Unlimited Guides (+20 DH/ea.)',
                        'INCLUDED Premium Themes',
                        'Automatic Translation (AI)',
                        '24/7 Guest Assistant (AI)',
                        'Priority WhatsApp Support'
                    ]
                },
                business: {
                    name: "Agency",
                    desc: "For portfolios of 10+ properties.",
                    button: "Talk to an Expert",
                    price: "Custom",
                    features: [
                        'Unlimited Guides',
                        'Multi-Property Dashboard',
                        'White Label (No Maplyo logo)',
                        'PMS & Channel Mgr Integration',
                        'Centralized Billing'
                    ]
                }
            },
            trust: "30-Day Money Back Guarantee ÔÇó Secure SSL Payment"
        },
        testimonials: {
            title: "Approved by Pros",
            subtitle: "Join over 500 hosts who automated their welcome.",
            items: [
                {
                    name: "Jean-Philippe R.",
                    role: "Superhost Airbnb (Marrakech)",
                    text: "My guests kept asking for the Wifi code or how to turn on the AC. With Maplyo, they have everything on their phone. I easily saved 2 hours a week.",
                    result: "-60% messages",
                },
                {
                    name: "Sofia B.",
                    role: "Concierge Manager (Casablanca)",
                    text: "The game changer for us is the upsell. We offer cleaning or transport services directly in the guide. It boosted our revenue.",
                    result: "+15% revenue",
                },
                {
                    name: "Karim M.",
                    role: "Riad Owner (Fes)",
                    text: "Very professional. The multilingual aspect is stunning, my American and Spanish clients are delighted to have info in their language without me doing anything.",
                    result: "5Ôÿà Reviews",
                }
            ]
        },
        faq: {
            title: "Frequently Asked Questions",
            subtitle: "Everything you need to know to get started.",
            questions: [
                {
                    q: "Do I need technical skills?",
                    a: "None at all. It's as easy as filling out a social media profile. You add info, we handle the design."
                },
                {
                    q: "How do guests access the guide?",
                    a: "Via a simple QR Code you place in the rental, or a link you send via message before arrival."
                },
                {
                    q: "Can I update the guide after printing the QR Code?",
                    a: "Yes! That's the magic. Update your info (wifi, restaurants...) and the QR Code stays exactly the same."
                },
                {
                    q: "Is there a contract?",
                    a: "No, cancel anytime."
                }
            ]
        },
        footer: {
            product: "Product",
            support: "Support",
            legal: "Legal",
            desc: "Maplyo helps hosts and property managers offer a 5-star experience with smart digital guides.",
            links: {
                features: "Features",
                pricing: "Pricing",
                testimonials: "Testimonials",
                roadmap: "Roadmap",
                help: "Help",
                contact: "Contact",
                privacy: "Privacy",
                terms: "Terms",
                legal: "Legal Notice"
            },
            securePayment: "Secure Payment",
            rights: "All rights reserved."
        },
        cta: {
            title: "Ready to impress?",
            subtitle: "Join the new generation of hosts offering an exceptional experience.",
            button: "Create my first guide",
            subtext: "No credit card required ÔÇó Cancel anytime"
        },
        tipOfTheDay: "Tip of the Day",
        sunday: "Sunday",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        lazy: "Relax",
        mood: "Motivated",
        discovery: "Discovery",
        tasty: "Tasty",
        adventure: "Adventure",
        festive: "Festive",
        outing: "Outing",
        brunch: "A brunch at",
        explore: "Explore the center of",
        museums: "Visit the museums of",
        taste: "Taste the specialties of",
        excursion: "Go on an excursion.",
        nightlife: "Nightlife in",
        walk: "Take a walk in",
        guide: {
            accessCode: "Access Codes",
            locked: "This block is protected by a code.",
            enterCode: "Access code",
            apartmentDoor: "Apartment door:",
            buildingDoor: "Building door:",
            gate: "Gate:",
            notes: "Notes"
        },
        ai: {
            assistant: "Guide Assistant",
            online: "AI online",
            placeholder: "Message...",
            empty: "Ask a question about this guide.",
            error: "Sorry, I can't answer right now.",
            thinking: "Drafting..."
        },
        qrCodeWall: {
            titlePart1: "Share your guide",
            titlePart2: "everywhere",
            description: "A simple scan is all it takes for your guests.",
            items: {
                wifi: { title: "Wi-Fi Connection", desc: "Password pre-filled" },
                perpetual: { title: "Permanent Access", desc: "The link remains valid" },
                remote: { title: "Live Updates", desc: "Always up to date" }
            },
            visual: {
                welcome: "Welcome",
                scan: "Scan me",
                detected: "QR Code Detected",
                notification: {
                    app: "Maplyo",
                    title: "Open guide"
                }
            }
        },
        upsells: "Extras",
        legalPage: {
            titlePrivacy: "Privacy Policy",
            titleTerms: "Terms of Use",
            lastUpdated: "Last updated:",
            effectiveDate: "Effective as of:",
            privacy: {
                intro: "This privacy policy describes how Maplyo ('we', 'us', 'our') collects, uses, and protects your personal data, in accordance with Moroccan Law No. 09-08 regarding the protection of individuals with respect to the processing of personal data.",
                section1: {
                    title: "1. Data Collection",
                    items: [
                        "Identification data: Last name, first name, email address.",
                        "Transaction data: Payment history (processed securely by Stripe, we do not store your full bank details).",
                        "Usage data: Information on the creation and consultation of digital guides."
                    ]
                },
                section2: {
                    title: "2. Purpose of Processing",
                    intro: "Your data is collected to:",
                    items: [
                        "Provide and manage the digital guide service.",
                        "Manage your subscription and billing.",
                        "Communicate important service updates.",
                        "Improve our features through anonymized statistics."
                    ]
                },
                section3: {
                    title: "3. Data Sharing",
                    content: "We never sell your data. It may be shared only with our essential technical providers (e.g., Stripe for payments, Supabase for hosting, Resend for emails) who are bound by strict confidentiality."
                },
                section4: {
                    title: "4. Security",
                    content: "We implement technical security measures (SSL encryption, secure protocols) to protect your data from unauthorized access."
                },
                section5: {
                    title: "5. Your Rights",
                    content: "In accordance with Law 09-08, you have the right to access, rectify, and oppose your data.",
                    contact: "To exercise this right, contact us at: contact@maplyo.com"
                }
            },
            terms: {
                intro: "Welcome to Maplyo. By accessing our platform or using our services, you agree to be bound by these Terms of Use.",
                section1: {
                    title: "1. Description of Service",
                    content: "Maplyo is a SaaS (Software as a Service) platform allowing hosts and property managers to create, host, and share digital welcome books with their guests."
                },
                section2: {
                    title: "2. Subscriptions and Payments",
                    items: [
                        "Billing: Services are billed monthly or annually, in advance.",
                        "Cancellation: You can cancel your subscription at any time via your dashboard. Access to Premium features remains active until the end of the billed period.",
                        "Refund: We offer a 30-day 'Money Back Guarantee' for all new subscriptions."
                    ]
                },
                section3: {
                    title: "3. User Responsibilities",
                    intro: "You agree to:",
                    items: [
                        "Provide accurate information during registration.",
                        "Not publish illegal, defamatory, or immoral content in your guides.",
                        "Be solely responsible for the information (WiFi codes, addresses) shared with your guests."
                    ]
                },
                section4: {
                    title: "4. Intellectual Property",
                    content: "Maplyo remains the owner of the platform, the code, and the brand. You remain the owner of the content (texts, photos) you add to your guides."
                },
                section5: {
                    title: "5. Limitation of Liability",
                    content: "Maplyo shall not be held liable for indirect damages, loss of revenue, or issues arising from the use of information contained in guides created by users."
                },
                section6: {
                    title: "6. Governing Law",
                    content: "These terms are governed by Moroccan law. Any dispute relating to their interpretation and/or execution shall be subject to the competent courts of Casablanca."
                }
            }
        }
    },
    es: {
        common: {
            getStarted: "Empezar",
            login: "Iniciar sesi├│n",
            signup: "Reg├¡strate",
            tryFree: "Prueba gratis",
            popular: "M├ís popular",
            month: "/mes",
            loading: "Cargando...",
            choose: "Elegir",
            viewGuide: "Ver gu├¡a completa",
            more: "Ver m├ís",
            checkin: "Llegada",
            qrCodeWall: "Escanea para probar",
            checkout: "Salida",
            location: "Ubicaci├│n",
            viewOnMap: "Ver en el mapa",
            wifi: "WiFi",
        },
        socialProof: {
            trustpilot: "4.9/5 por 500+ Anfitriones",
            usedBy: "Usado por los mejores gestores",
            autoTranslate: { title: "Auto-Traducido", desc: "Tus gu├¡as hablan su idioma." },
            googleMaps: { title: "Google Maps Integrado", desc: "Maps directamente en la gu├¡a." }
        },
        hero: {
            tag: "PARA ANFITRIONES",
            title: "Nunca repitas el c├│digo WiFi.",
            subtitle: "Digitaliza tu gu├¡a de bienvenida. Mayor valoraci├│n, menos mensajes.",
            cta: "Crear mi gu├¡a",
            demo: "Ver ejemplo",
            noCreditCard: "Sin tarjeta",
            setupTime: "Configura en 2 min",
        },
        features: {
            title: "Todo lo que necesitas.", subtitle: "Nada m├ís.", description: "Herramientas poderosas.",
            items: {
                mobileFirst: { title: "100% M├│vil", desc: "Abre instant├íneo." },
                secure: { title: "C├│digos Seguros", desc: "Protege acceso WiFi." },
                map: { title: "Mapa Interactivo", desc: "Recomendaciones un clic." },
                live: { title: "Cambios en Vivo", desc: "Se actualiza ahora." },
                translate: { title: "Auto Traducci├│n", desc: "Detecta idioma del hu├®sped." },
                checklist: { title: "Check-lists", desc: "Instrucciones claras." }
            }
        },
        pricing: {
            title: "Precios Transparentes",
            subtitle: "Inicia gratis, escala despu├®s.",
            bestOffer: "Mejor oferta:",
            addon: "+ Extra",
            enterprise: { title: "Enterprise?", desc: "Plan a medida.", cta: "Contactar" },
            plans: {
                demo: { name: "Descubrir", price: "Gratis", desc: "Pru├®balo", button: "Crear gu├¡a", features: ['Acceso total', 'Vista m├│vil', 'Sin publicar'] },
                basic: { name: "Esencial", desc: "Lanza tu primera", button: "Iniciar", features: ['Gu├¡a Digital', 'QR WiFi', 'Mapa', '1 Gu├¡a'] },
                pro: { name: "Crecimiento", desc: "Maximiza ingresos", button: "Mejorar", features: ['Gu├¡as ilimitadas', 'Traductor autom├ítico', 'Soporte prioritario'] },
                business: { name: "Agencia", desc: "Para portfolios", button: "Hablar", price: "Por medida", features: ['Ilimitado', 'Dashboard multi', 'Marca blanca'] }
            },
            trust: "Pago seguro"
        },
        testimonials: {
            title: "Aprobado por Profesionales",
            subtitle: "├Ünase a m├ís de 500 anfitriones que han automatizado su bienvenida.",
            items: [
                {
                    name: "Jean-Philippe R.",
                    role: "Superhost Airbnb (Marrakech)",
                    text: "Mis hu├®spedes no paraban de pedir la clave del Wifi o c├│mo encender el aire acondicionado. Con Maplyo, lo tienen todo en su tel├®fono. Ahorr├® f├ícilmente 2 horas a la semana.",
                    result: "-60% mensajes",
                },
                {
                    name: "Sofia B.",
                    role: "Gerente de Conserjer├¡a (Casablanca)",
                    text: "El cambio de juego para nosotros es la venta adicional. Ofrecemos servicios de limpieza o transporte directamente en la gu├¡a. Aument├│ nuestros ingresos.",
                    result: "+15% ingresos",
                },
                {
                    name: "Karim M.",
                    role: "Propietario de Riad (Fez)",
                    text: "Muy profesional. El aspecto multiling├╝e es impresionante, mis clientes americanos y espa├▒oles est├ín encantados de tener la informaci├│n en su idioma sin que yo haga nada.",
                    result: "5Ôÿà Rese├▒as",
                }
            ]
        },
        faq: {
            title: "Preguntas Frecuentes",
            subtitle: "Todo lo que necesitas saber para empezar.",
            questions: [
                {
                    q: "┬┐Necesito habilidades t├®cnicas?",
                    a: "Ninguna en absoluto. Es tan f├ícil como completar un perfil de red social. T├║ a├▒ades la info, nosotros nos encargamos del dise├▒o."
                },
                {
                    q: "┬┐C├│mo acceden los hu├®spedes a la gu├¡a?",
                    a: "A trav├®s de un simple c├│digo QR que colocas en el alojamiento, o un enlace que env├¡as por mensaje antes de su llegada."
                },
                {
                    q: "┬┐Puedo actualizar la gu├¡a despu├®s de imprimir el c├│digo QR?",
                    a: "┬íS├¡! Esa es la magia. Actualiza tu informaci├│n (wifi, restaurantes...) y el c├│digo QR sigue siendo el mismo."
                },
                {
                    q: "┬┐Hay alg├║n compromiso o contrato?",
                    a: "No, cancela cuando quieras."
                }
            ]
        },
        footer: {
            product: "Producto", support: "Soporte", legal: "Legal", desc: "Maplyo para anfitriones.",
            links: { features: "Caracter├¡sticas", pricing: "Precios", testimonials: "Testimonios", roadmap: "Roadmap", help: "Ayuda", contact: "Contacto", privacy: "Privacidad", terms: "T├®rminos", legal: "Aviso Legal" },
            securePayment: "Pago Seguro", rights: "Derechos reservados."
        },
        cta: { title: "┬┐Listo para impresionar?", subtitle: "├Ünete a la nueva generaci├│n.", button: "Crear mi gu├¡a", subtext: "Cancelaci├│n flexible" },
        tipOfTheDay: "Consejo del D├¡a", sunday: "Dom", monday: "Lun", tuesday: "Mar", wednesday: "Mi├®", thursday: "Jue", friday: "Vie", saturday: "S├íb",
        lazy: "Relajado", mood: "Motivado", discovery: "Descubrimiento", tasty: "Sabroso", adventure: "Aventura", festive: "Fiesta", outing: "Salida",
        brunch: "Brunch", explore: "Explorar", museums: "Museos", taste: "Saborear", excursion: "Excursi├│n", nightlife: "Noche", walk: "Paseo",
        guide: { accessCode: "C├│digos", locked: "Protegido por c├│digo.", enterCode: "C├│digo de acceso", apartmentDoor: "Puerta", buildingDoor: "Edificio", gate: "Port├│n", notes: "Notas" },
        ai: { assistant: "Asistente", online: "En l├¡nea", placeholder: "Mensaje...", empty: "Haz una pregunta.", error: "Error.", thinking: "Escribiendo..." },
        qrCodeWall: {
            titlePart1: "Comparte", titlePart2: "donde sea", description: "Un scan basta.",
            items: { wifi: { title: "Wi-Fi", desc: "Pre-llenado" }, perpetual: { title: "Permanente", desc: "V├ílido siempre" }, remote: { title: "En Vivo", desc: "Actualizado" } },
            visual: { welcome: "Bienvenido", scan: "Escan├®ame", detected: "Detectado", notification: { app: "Maplyo", title: "Abrir gu├¡a" } }
        },
        upsells: "Extras",
        legalPage: {
            titlePrivacy: "Privacidad", titleTerms: "T├®rminos", lastUpdated: "Actualizado", effectiveDate: "En vigor",
            privacy: { intro: "Pol├¡tica.", section1: { title: "Datos", items: ["Nombre"] }, section2: { title: "Fines", intro: "Para:", items: ["Proveer el servicio"] }, section3: { title: "Compartir", content: "No vendemos datos." }, section4: { title: "Seguridad", content: "Seguro." }, section5: { title: "Derechos", content: "Puedes pedir acceder.", contact: "contact@maplyo.com" } },
            terms: { intro: "T├®rminos.", section1: { title: "Servicio", content: "SaaS" }, section2: { title: "Pagos", items: ["Facturaci├│n"] }, section3: { title: "Responsabilidad", intro: "Deberes:", items: ["Veracidad"] }, section4: { title: "IP", content: "Propiedad" }, section5: { title: "L├¡mites", content: "Sin da├▒os indirectos" }, section6: { title: "Ley", content: "Marruecos" } }
        }
    },
    ar: {
        common: {
            getStarted: "ÏºÏ¿Ï»Ïú", login: "Ï¬Ï│Ï¼┘è┘ä Ïº┘äÏ»Ï«┘ê┘ä", signup: "ÏºÏ┤Ï¬Ï▒Ïº┘â", tryFree: "Ï¼Ï▒Ï¿ ┘àÏ¼Ïº┘åÏº┘ï", popular: "Ïº┘äÏú┘âÏ½Ï▒ Ï┤┘è┘êÏ╣Ïº┘ï", month: "/Ï┤┘çÏ▒", loading: "Ï¼ÏºÏ▒┘è Ïº┘äÏ¬Ï¡┘à┘è┘ä...", choose: "ÏºÏ«Ï¬Ï▒", viewGuide: "Ï╣Ï▒ÏÂ Ïº┘äÏ»┘ä┘è┘ä", more: "Ï╣Ï▒ÏÂ Ïº┘ä┘àÏ▓┘èÏ»", checkin: "Ï¬Ï│Ï¼┘è┘ä Ïº┘ä┘êÏÁ┘ê┘ä", qrCodeWall: "Ïº┘àÏ│Ï¡ ┘ä┘äÏ¬Ï¼Ï▒Ï¿Ï®", checkout: "Ïº┘ä┘àÏ║ÏºÏ»Ï▒Ï®", location: "Ïº┘ä┘à┘ê┘éÏ╣", viewOnMap: "Ï╣Ï▒ÏÂ Ï╣┘ä┘ë Ïº┘äÏ«Ï▒┘èÏÀÏ®", wifi: "┘êÏº┘è ┘üÏº┘è",
        },
        socialProof: {
            trustpilot: "4.9/5 Ï¿┘êÏºÏ│ÏÀÏ® +500", usedBy: "┘èÏ│Ï¬Ï«Ï»┘à┘ç Ïú┘üÏÂ┘ä Ïº┘ä┘àÏ»┘èÏ▒┘è┘å", autoTranslate: { title: "┘àÏ¬Ï▒Ï¼┘à Ïó┘ä┘èÏº┘ï", desc: "Ï»┘ä┘è┘ä┘â ┘èÏ¬Ï¡Ï»Ï½ ┘äÏ║Ï¬┘ç┘à." }, googleMaps: { title: "Ï«Ï▒ÏºÏªÏÀ Ï¼┘êÏ¼┘ä ┘àÏ»┘àÏ¼Ï®", desc: "Ïº┘äÏ«Ï▒ÏºÏªÏÀ ┘ü┘è Ïº┘äÏ»┘ä┘è┘ä ┘àÏ¿ÏºÏ┤Ï▒Ï®." }
        },
        hero: {
            tag: "┘ä┘ä┘àÏÂ┘è┘ü┘è┘å", title: "┘äÏº Ï¬┘âÏ▒Ï▒ Ïº┘äÏ▒┘àÏ▓ ÏúÏ¿Ï»Ïº┘ï.", subtitle: "Ï¡┘ê┘ä Ï»┘ä┘è┘ä┘â ┘ä┘äÏ▒┘é┘à┘èÏ®. Ï¬Ï¼Ï▒Ï¿Ï® Ï«┘àÏ│ ┘åÏ¼┘ê┘à.", cta: "ÏÑ┘åÏ┤ÏºÏí Ï»┘ä┘è┘ä┘è ┘àÏ¼Ïº┘åÏº┘ï", demo: "┘àÏ┤Ïº┘çÏ»Ï® ┘àÏ½Ïº┘ä", noCreditCard: "Ï¿Ï»┘ê┘å Ï¿ÏÀÏº┘éÏ®", setupTime: "┘à┘ÅÏ╣Ï»┘æ ┘ü┘è Ï»┘é┘è┘éÏ¬┘è┘å",
        },
        features: {
            title: "┘â┘ä ┘àÏº Ï¬Ï¡Ï¬ÏºÏ¼┘ç.", subtitle: "Ï»┘ê┘å Ï¬Ï╣┘é┘èÏ».", description: "ÏúÏ»┘êÏºÏ¬ ┘é┘ê┘èÏ®.",
            items: { mobileFirst: { title: "┘à┘êÏ¿Ïº┘è┘ä Ïú┘ê┘äÏº┘ï", desc: "┘è┘Å┘üÏ¬Ï¡ ┘ü┘êÏ▒Ïº┘ï." }, secure: { title: "Ï▒┘à┘êÏ▓ Ïó┘à┘åÏ®", desc: "Ïú┘é┘üÏº┘ä ┘àÏ¡┘à┘èÏ®." }, map: { title: "Ï¬┘üÏºÏ╣┘ä┘è", desc: "Ï«Ï▒┘èÏÀÏ® ┘àÏ»┘àÏ¼Ï®." }, live: { title: "Ï¬Ï╣Ï»┘è┘ä ┘àÏ¿ÏºÏ┤Ï▒", desc: "Ïº┘ä┘â┘ä ┘à┘ÅÏ»Ï▒Ï¼." }, translate: { title: "Ï¬Ï▒Ï¼┘àÏ® Ïó┘ä┘èÏ®", desc: "┘äÏ║Ï® Ïº┘äÏ▓ÏºÏªÏ▒." }, checklist: { title: "┘é┘êÏºÏª┘à", desc: "ÏÑÏ▒Ï┤ÏºÏ»ÏºÏ¬." } }
        },
        pricing: {
            title: "Ï¬Ï│Ï╣┘èÏ▒ ┘êÏºÏÂÏ¡", subtitle: "ÏºÏ¿Ï»Ïú ┘àÏ¼Ïº┘åÏº┘ïÏî ┘ê┘é┘à Ï¿Ïº┘äÏ¬Ï▒┘é┘èÏ® Ï╣┘åÏ» Ïº┘äÏ¡ÏºÏ¼Ï®.", bestOffer: "Ïú┘üÏÂ┘ä Ï╣Ï▒ÏÂ:", addon: "+ ÏÑÏÂÏº┘ü┘è",
            enterprise: { title: "┘ä┘äÏ┤Ï▒┘âÏºÏ¬Ïƒ", desc: "Ï¡┘ä ┘àÏ«ÏÁÏÁ.", cta: "ÏºÏ¬ÏÁ┘ä Ï¿┘åÏº" },
            plans: {
                demo: { name: "Ïº┘âÏ¬Ï┤Ïº┘ü", price: "┘àÏ¼Ïº┘å┘è", desc: "Ï¬Ï¼Ï▒Ï¿Ï® Ïº┘äÏ«Ï»┘àÏ®", button: "ÏÑ┘åÏ┤ÏºÏí Ï»┘ä┘è┘ä", features: ['┘êÏÁ┘ê┘ä ┘âÏº┘à┘ä', '┘àÏ╣Ïº┘è┘åÏ® Ïº┘äÏ¼┘êÏº┘ä', 'Ï╣Ï»┘à Ïº┘ä┘åÏ┤Ï▒'] },
                basic: { name: "ÏúÏ│ÏºÏ│┘è", desc: "┘äÏÑÏÀ┘äÏº┘é Ï╣┘éÏºÏ▒┘â Ïº┘äÏú┘ê┘ä.", button: "ÏºÏ¿Ï»Ïú", features: ['Ï»┘ä┘è┘ä Ï▒┘é┘à┘è', '┘êÏº┘è ┘üÏº┘è ┘ü┘êÏ▒┘è', 'Ï«Ï▒┘èÏÀÏ®', 'Ï»┘ä┘è┘ä ┘êÏºÏ¡Ï»'] },
                pro: { name: "┘å┘à┘ê", desc: "Ï¬Ï¡Ï│┘è┘å Ïº┘äÏ»Ï«┘ä.", button: "Ï¬Ï¡Ï»┘èÏ½", features: ['ÏúÏ»┘äÏ® ┘äÏº ┘àÏ¡Ï»┘êÏ»Ï®', 'Ï¬Ï▒Ï¼┘àÏ® Ï¬┘ä┘éÏºÏª┘èÏ®', 'Ï»Ï╣┘à ┘êÏºÏ¬Ï│ÏºÏ¿'] },
                business: { name: "┘ê┘âÏº┘äÏ®", desc: "┘ä┘ä┘àÏ¼┘à┘êÏ╣ÏºÏ¬", button: "Ï¬┘êÏºÏÁ┘ä", price: "┘àÏ«ÏÁÏÁ", features: ['┘äÏº ┘àÏ¡Ï»┘êÏ»', '┘ä┘êÏ¡Ï® Ï¬Ï¡┘â┘à', 'Ï╣┘äÏº┘àÏ® Ï¿┘èÏÂÏºÏí'] }
            },
            trust: "Ï»┘üÏ╣ Ïó┘à┘å SSL"
        },
        testimonials: {
            title: "┘àÏ╣Ï¬┘àÏ» ┘à┘å Ïº┘ä┘àÏ¡Ï¬Ï▒┘ü┘è┘å",
            subtitle: "Ïº┘åÏÂ┘à ÏÑ┘ä┘ë Ïú┘âÏ½Ï▒ ┘à┘å 500 ┘àÏÂ┘è┘ü ┘éÏº┘à┘êÏº Ï¿ÏúÏ¬┘àÏ¬Ï® ÏºÏ│Ï¬┘éÏ¿Ïº┘ä┘ç┘à.",
            items: [
                {
                    name: "Ï¼┘ê┘å ┘ü┘è┘ä┘èÏ¿ Ï▒.",
                    role: "┘àÏÂ┘è┘ü ┘à┘à┘èÏ▓ ┘ü┘è Airbnb (┘àÏ▒Ïº┘âÏ┤)",
                    text: "┘âÏº┘å ÏÂ┘è┘ê┘ü┘è ┘èÏ│Ïú┘ä┘ê┘å Ï¿ÏºÏ│Ï¬┘àÏ▒ÏºÏ▒ Ï╣┘å Ï▒┘àÏ▓ Ïº┘ä┘êÏº┘è ┘üÏº┘è Ïú┘ê ┘â┘è┘ü┘èÏ® Ï¬Ï┤Ï║┘è┘ä ┘à┘â┘è┘ü Ïº┘ä┘ç┘êÏºÏí. ┘àÏ╣ MaplyoÏî ┘â┘ä Ï┤┘èÏí ┘à┘êÏ¼┘êÏ» Ï╣┘ä┘ë ┘ç┘êÏºÏ¬┘ü┘ç┘à. ┘ä┘éÏ» ┘ê┘üÏ▒Ï¬ Ï│ÏºÏ╣Ï¬┘è┘å ┘ü┘è Ïº┘äÏúÏ│Ï¿┘êÏ╣ Ï¿Ï│┘ç┘ê┘äÏ®.",
                    result: "-60% ┘à┘å Ïº┘äÏ▒Ï│ÏºÏª┘ä"
                },
                {
                    name: "ÏÁ┘ê┘ü┘èÏº Ï¿.",
                    role: "┘àÏ»┘èÏ▒Ï® Ï┤Ï▒┘âÏ® ┘â┘ê┘åÏ│┘èÏ▒Ï¼ (Ïº┘äÏ»ÏºÏ▒ Ïº┘äÏ¿┘èÏÂÏºÏí)",
                    text: "┘å┘éÏÀÏ® Ïº┘äÏ¬Ï¡┘ê┘ä Ï¿Ïº┘ä┘åÏ│Ï¿Ï® ┘ä┘åÏº ┘ç┘è Ïº┘äÏ«Ï»┘àÏºÏ¬ Ïº┘äÏÑÏÂÏº┘ü┘èÏ®. ┘åÏ¡┘å ┘å┘éÏ»┘à Ï«Ï»┘àÏºÏ¬ Ï¬┘åÏ©┘è┘ü Ïú┘ê ┘å┘é┘ä ┘àÏ¿ÏºÏ┤Ï▒Ï® ┘ü┘è Ïº┘äÏ»┘ä┘è┘ä. ┘ä┘éÏ» Ï╣Ï▓Ï▓ Ï░┘ä┘â ┘à┘å ÏÑ┘èÏ▒ÏºÏ»ÏºÏ¬┘åÏº.",
                    result: "+15% ÏÑ┘èÏ▒ÏºÏ»ÏºÏ¬"
                },
                {
                    name: "┘âÏ▒┘è┘à ┘à.",
                    role: "┘àÏº┘ä┘â Ï▒┘èÏºÏÂ (┘üÏºÏ│)",
                    text: "┘àÏ¡Ï¬Ï▒┘ü Ï¼Ï»Ïº┘ï. Ïº┘äÏ¼Ïº┘åÏ¿ ┘àÏ¬Ï╣Ï»Ï» Ïº┘ä┘äÏ║ÏºÏ¬ ┘àÏ¿┘çÏ▒Ïî Ï╣┘à┘äÏºÏª┘è Ïº┘äÏú┘àÏ▒┘è┘â┘è┘ê┘å ┘êÏº┘ä┘à┘éÏ▒Ï¿┘ê┘å Ï│Ï╣Ï»ÏºÏí Ï¼Ï»Ïº┘ï Ï¿Ïº┘äÏ¡ÏÁ┘ê┘ä Ï╣┘ä┘ë Ïº┘ä┘àÏ╣┘ä┘ê┘àÏºÏ¬ Ï¿┘äÏ║Ï¬┘ç┘à Ï»┘ê┘å Ïú┘å Ïú┘üÏ╣┘ä Ïú┘è Ï┤┘èÏí.",
                    result: "5Ôÿà Ï¬┘é┘è┘è┘àÏºÏ¬"
                }
            ]
        },
        faq: {
            title: "Ïº┘äÏúÏ│Ïª┘äÏ® Ïº┘äÏ┤ÏºÏªÏ╣Ï®",
            subtitle: "┘â┘ä ┘àÏº Ï¬Ï¡Ï¬ÏºÏ¼ ┘ä┘àÏ╣Ï▒┘üÏ¬┘ç ┘ä┘äÏ¿Ï»Ïí.",
            questions: [
                {
                    q: "┘ç┘ä ÏúÏ¡Ï¬ÏºÏ¼ ÏÑ┘ä┘ë ┘à┘çÏºÏ▒ÏºÏ¬ Ï¬┘é┘å┘èÏ®Ïƒ",
                    a: "┘äÏº Ï╣┘ä┘ë Ïº┘äÏÑÏÀ┘äÏº┘é. Ïº┘äÏú┘àÏ▒ Ï│┘ç┘ä ┘àÏ½┘ä ┘à┘äÏí ┘à┘ä┘ü Ï┤Ï«ÏÁ┘è Ï╣┘ä┘ë ┘êÏ│ÏºÏª┘ä Ïº┘äÏ¬┘êÏºÏÁ┘ä Ïº┘äÏºÏ¼Ï¬┘àÏºÏ╣┘è. Ïú┘åÏ¬ Ï¬ÏÂ┘è┘ü Ïº┘ä┘àÏ╣┘ä┘ê┘àÏºÏ¬Ïî ┘ê┘åÏ¡┘å ┘åÏ¬Ï╣Ïº┘à┘ä ┘àÏ╣ Ïº┘äÏ¬ÏÁ┘à┘è┘à."
                },
                {
                    q: "┘â┘è┘ü ┘èÏÁ┘ä Ïº┘äÏÂ┘è┘ê┘ü ÏÑ┘ä┘ë Ïº┘äÏ»┘ä┘è┘äÏƒ",
                    a: "Ï╣Ï¿Ï▒ Ï▒┘àÏ▓ QR Ï¿Ï│┘èÏÀ Ï¬ÏÂÏ╣┘ç ┘ü┘è ┘à┘âÏº┘å Ïº┘äÏÑ┘éÏº┘àÏ®Ïî Ïú┘ê Ï▒ÏºÏ¿ÏÀ Ï¬Ï▒Ï│┘ä┘ç ┘ü┘è Ï▒Ï│Ïº┘äÏ® ┘éÏ¿┘ä ┘êÏÁ┘ê┘ä┘ç┘à."
                },
                {
                    q: "┘ç┘ä ┘è┘à┘â┘å┘å┘è Ï¬Ï¡Ï»┘èÏ½ Ïº┘äÏ»┘ä┘è┘ä Ï¿Ï╣Ï» ÏÀÏ¿ÏºÏ╣Ï® Ï▒┘àÏ▓ Ïº┘ä┘Ç QRÏƒ",
                    a: "┘åÏ╣┘à! ┘çÏ░Ïº ┘ç┘ê Ïº┘äÏ│Ï¡Ï▒. ┘é┘à Ï¿Ï¬Ï¡Ï»┘èÏ½ ┘àÏ╣┘ä┘ê┘àÏºÏ¬┘â (Ïº┘ä┘êÏº┘è ┘üÏº┘èÏî Ïº┘ä┘àÏÀÏºÏ╣┘à...) ┘êÏ│┘èÏ¿┘é┘ë Ï▒┘àÏ▓ Ïº┘ä┘Ç QR ┘â┘àÏº ┘ç┘ê Ï¬┘àÏº┘àÏº┘ï."
                },
                {
                    q: "┘ç┘ä ┘ç┘åÏº┘â Ïú┘è Ïº┘äÏ¬Ï▓Ïº┘à Ïú┘ê Ï╣┘éÏ»Ïƒ",
                    a: "┘äÏºÏî ┘è┘à┘â┘å┘â Ïº┘äÏÑ┘äÏ║ÏºÏí ┘ü┘è Ïú┘è ┘ê┘éÏ¬."
                }
            ]
        },
        footer: {
            product: "Ïº┘ä┘à┘åÏ¬Ï¼", support: "Ïº┘äÏ»Ï╣┘à", legal: "┘éÏº┘å┘ê┘å┘è", desc: "┘àÏºÏ¿┘ä┘è┘ê ┘ä┘ä┘àÏÂ┘è┘ü┘è┘å.",
            links: { features: "Ïº┘ä┘à┘èÏ▓ÏºÏ¬", pricing: "Ïº┘äÏ¬Ï│Ï╣┘èÏ▒", testimonials: "Ï┤┘çÏºÏ»ÏºÏ¬", roadmap: "Ï«ÏºÏ▒ÏÀÏ® ÏÀÏ▒┘è┘é", help: "┘àÏ│ÏºÏ╣Ï»Ï®", contact: "ÏºÏ¬ÏÁÏº┘ä", privacy: "Ïº┘äÏ«ÏÁ┘êÏÁ┘èÏ®", terms: "Ïº┘äÏ┤Ï▒┘êÏÀ", legal: "ÏÑÏ┤Ï╣ÏºÏ▒" },
            securePayment: "Ï»┘üÏ╣ Ïó┘à┘å", rights: "Ï¼┘à┘èÏ╣ Ïº┘äÏ¡┘é┘ê┘é ┘àÏ¡┘ü┘êÏ©Ï®."
        },
        cta: { title: "Ï¼Ïº┘çÏ▓ ┘ä┘äÏ¬┘à┘èÏ▓Ïƒ", subtitle: "Ïº┘åÏÂ┘à ┘ä┘äÏ¼┘è┘ä Ïº┘ä┘éÏºÏ»┘à.", button: "ÏÑ┘åÏ┤ÏºÏí Ï»┘ä┘è┘ä┘è", subtext: "ÏÑ┘äÏ║ÏºÏí ┘ü┘è Ïú┘è ┘ê┘éÏ¬" },
        tipOfTheDay: "┘åÏÁ┘èÏ¡Ï® Ïº┘ä┘è┘ê┘à", sunday: "Ïº┘äÏúÏ¡Ï»", monday: "Ïº┘äÏÑÏ½┘å┘è┘å", tuesday: "Ïº┘äÏ½┘äÏºÏ½ÏºÏí", wednesday: "Ïº┘äÏúÏ▒Ï¿Ï╣ÏºÏí", thursday: "Ïº┘äÏ«┘à┘èÏ│", friday: "Ïº┘äÏ¼┘àÏ╣Ï®", saturday: "Ïº┘äÏ│Ï¿Ï¬",
        lazy: "┘àÏ│Ï¬Ï▒Ï«┘è", mood: "┘àÏ¬Ï¡┘àÏ│", discovery: "Ïº┘âÏ¬Ï┤Ïº┘ü", tasty: "┘äÏ░┘èÏ░", adventure: "┘àÏ║Ïº┘àÏ▒Ï®", festive: "ÏºÏ¡Ï¬┘üÏº┘ä┘è", outing: "┘åÏ▓┘çÏ®",
        brunch: "┘üÏÀ┘êÏ▒ ┘àÏ¬ÏúÏ«Ï▒", explore: "ÏºÏ│Ï¬┘âÏ┤┘ü", museums: "┘àÏ¬ÏºÏ¡┘ü", taste: "Ï¬Ï░┘ê┘é", excursion: "Ï▒Ï¡┘äÏ®", nightlife: "Ïº┘äÏ¡┘èÏºÏ® Ïº┘ä┘ä┘è┘ä┘èÏ®", walk: "Ï¬┘àÏ┤┘èÏ®",
        guide: { accessCode: "Ï▒┘à┘êÏ▓ Ïº┘äÏ»Ï«┘ê┘ä", locked: "┘çÏ░Ïº Ïº┘ä┘éÏ│┘à ┘àÏ¡┘à┘è Ï¿Ï▒┘àÏ▓.", enterCode: "Ï▒┘àÏ▓ Ïº┘äÏ»Ï«┘ê┘ä", apartmentDoor: "Ï¿ÏºÏ¿ Ïº┘äÏ┤┘éÏ®", buildingDoor: "Ï¿ÏºÏ¿ Ïº┘äÏ╣┘àÏºÏ▒Ï®", gate: "Ïº┘äÏ¿┘êÏºÏ¿Ï®", notes: "┘à┘äÏºÏ¡Ï©ÏºÏ¬" },
        ai: { assistant: "Ïº┘ä┘àÏ│ÏºÏ╣Ï»", online: "┘àÏ¬ÏºÏ¡", placeholder: "Ï▒Ï│Ïº┘äÏ®...", empty: "ÏºÏ│Ïú┘ä Ïú┘è Ï┤┘èÏí.", error: "Ï«ÏÀÏú ┘ü┘è Ïº┘äÏ┤Ï¿┘âÏ®.", thinking: "Ï¼ÏºÏ▒┘è Ïº┘ä┘âÏ¬ÏºÏ¿Ï®..." },
        qrCodeWall: {
            titlePart1: "Ï┤ÏºÏ▒┘â", titlePart2: "Ï»┘ä┘è┘ä┘â", description: "┘àÏ¼Ï▒Ï» ┘àÏ│Ï¡ ┘ä┘äÏ▓┘êÏºÏ▒.",
            items: { wifi: { title: "Wi-Fi", desc: "┘àÏ╣Ï¿Ïú ┘àÏ│Ï¿┘éÏº┘ï" }, perpetual: { title: "┘êÏÁ┘ê┘ä Ï»ÏºÏª┘à", desc: "Ïº┘äÏ▒ÏºÏ¿ÏÀ ÏÁÏº┘äÏ¡" }, remote: { title: "Ï¬Ï¡Ï»┘èÏ½ ┘àÏ¿ÏºÏ┤Ï▒", desc: "Ï»ÏºÏª┘àÏº┘ï ┘àÏ¡Ï»Ï½" } },
            visual: { welcome: "┘àÏ▒Ï¡Ï¿Ïº┘ï", scan: "Ïº┘àÏ│Ï¡┘å┘è", detected: "Ï¬┘à Ïº┘ä┘âÏ┤┘ü", notification: { app: "Maplyo", title: "Ïº┘üÏ¬Ï¡ Ïº┘äÏ»┘ä┘è┘ä" } }
        },
        upsells: "ÏÑÏÂÏº┘üÏºÏ¬",
        legalPage: {
            titlePrivacy: "Ï│┘èÏºÏ│Ï® Ïº┘äÏ«ÏÁ┘êÏÁ┘èÏ®", titleTerms: "Ï┤Ï▒┘êÏÀ Ïº┘äÏºÏ│Ï¬Ï«Ï»Ïº┘à", lastUpdated: "ÏóÏ«Ï▒ Ï¬Ï¡Ï»┘èÏ½", effectiveDate: "Ï│ÏºÏ▒┘è Ïº┘ä┘à┘üÏ╣┘ê┘ä",
            privacy: { intro: "Ï│┘èÏºÏ│Ï®.", section1: { title: "Ï¿┘èÏº┘åÏºÏ¬", items: ["Ïº┘äÏºÏ│┘à"] }, section2: { title: "ÏúÏ║Ï▒ÏºÏÂ", intro: "ÏÑ┘ä┘ë:", items: ["Ï¬┘éÏ»┘è┘à Ïº┘äÏ«Ï»┘àÏ®"] }, section3: { title: "┘àÏ┤ÏºÏ▒┘âÏ®", content: "┘äÏº ┘åÏ¿┘èÏ╣ Ï¿┘èÏº┘åÏºÏ¬." }, section4: { title: "Ïú┘àÏº┘å", content: "┘åÏ©Ïº┘à Ïó┘à┘å." }, section5: { title: "Ï¡┘é┘ê┘é", content: "Ï¬┘êÏºÏÁ┘ä ┘àÏ╣┘åÏº.", contact: "contact@maplyo.com" } },
            terms: { intro: "Ï┤Ï▒┘êÏÀ.", section1: { title: "Ï«Ï»┘àÏ®", content: "┘à┘åÏÁÏ® ┘ê┘èÏ¿" }, section2: { title: "Ï»┘üÏ╣", items: ["┘ü┘êÏºÏ¬┘èÏ▒"] }, section3: { title: "┘àÏ│Ïñ┘ê┘ä┘èÏ®", intro: "Ï╣┘ä┘è┘â:", items: ["Ïº┘ä┘àÏ╣┘ä┘ê┘àÏºÏ¬"] }, section4: { title: "Ï¡┘é┘ê┘é ┘à┘ä┘â┘èÏ®", content: "┘à┘ä┘â ┘ä┘à┘åÏ┤Ïª Ïº┘ä┘àÏ¡Ï¬┘ê┘ë" }, section5: { title: "Ï¡Ï»┘êÏ»", content: "Ï║┘èÏ▒ ┘àÏ│Ïñ┘ê┘ä" }, section6: { title: "┘éÏº┘å┘ê┘å", content: "Ïº┘ä┘àÏ║Ï▒Ï¿" } }
        }
    }
}



