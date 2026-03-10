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
            checkin: "Arrivée",
            qrCodeWall: "Scannez pour tester",
            checkout: "Départ",
            location: "Localisation",
            viewOnMap: "Voir sur la carte",
            wifi: "WiFi",
        },
        socialProof: {
            trustpilot: "4.9/5 par 500+ Hôtes",
            usedBy: "Utilisé par les meilleures conciergeries",
            autoTranslate: {
                title: "Auto-Traduit",
                desc: "Vos guides parlent la langue de vos invités."
            },
            googleMaps: {
                title: "Google Maps Intégré",
                desc: "Google Maps directement dans le guide."
            }
        },
        hero: {
            tag: "POUR LES HÔTES ET CONCIERGERIES",
            title: "Ne répétez plus jamais le code WiFi.",
            subtitle: "Digitalisez votre livret d'accueil. Offrez une expérience 5 étoiles, réduisez les messages de 50%, et augmentez vos avis positifs.",
            cta: "Créer mon guide gratuit",
            demo: "Voir un exemple",
            noCreditCard: "Pas de carte requise",
            setupTime: "Configuré en 2 min",
        },
        features: {
            title: "Tout ce dont vous avez besoin.",
            subtitle: "Rien de superflu.",
            description: "Des outils puissants pour automatiser votre accueil et rassurer vos voyageurs, sans la complexité technique.",
            items: {
                mobileFirst: {
                    title: "100% Mobile First",
                    desc: "Pas d'application à télécharger. Vos guides s'ouvrent instantanément dans n'importe quel navigateur mobile."
                },
                secure: {
                    title: "Codes Sécurisés",
                    desc: "Protégez l'accès au WiFi et aux boîtes à clés. Déverrouillage par email ou code unique."
                },
                map: {
                    title: "Carte Interactive",
                    desc: "Intégrez vos restaurants, bars et activités préférés avec itinéraires Google Maps en un clic."
                },
                live: {
                    title: "Modifications Live",
                    desc: "Changez le code WiFi ou une recommandation, c'est mis à jour instantanément sur tous les téléphones."
                },
                translate: {
                    title: "Traduction Auto",
                    desc: "Détecte automatiquement la langue du téléphone du visiteur et traduit votre guide."
                },
                checklist: {
                    title: "Check-lists",
                    desc: "Instructions claires pour l'arrivée et le départ. Réduisez les questions répétitives de 80%."
                }
            }
        },
        pricing: {
            title: "Tarification Transparente",
            subtitle: "Commencez gratuitement. Évoluez quand vous voulez.",
            bestOffer: "La meilleure offre du monde :",
            addon: "+20 DH / guide supplémentaire",
            enterprise: {
                title: "Besoin d'une solution Enterprise ?",
                desc: "Pour les gestionnaires de plus de 50 propriétés, nous proposons des tarifs dégressifs et une intégration PMS.",
                cta: "Contacter l'équipe commerciale"
            },
            plans: {
                demo: {
                    name: "Découverte",
                    price: "Gratuit",
                    desc: "Testez la puissance de Maplyo sans carte bancaire.",
                    button: "Créer un guide (Gratuit)",
                    features: [
                        'Accès complet au Créateur',
                        'Prévisualisation Mobile',
                        'Sans publication'
                    ]
                },
                basic: {
                    name: "Essentiel", // Was Basic
                    desc: "Pour lancer votre première propriété.",
                    button: "Démarrer",
                    features: [
                        'Livret Digital Complet',
                        'QR Code WiFi Instantané',
                        'Carte Interactive (Google Maps)',
                        'Thèmes Gratuits (Pack Premium +15 DH)',
                        '1 Guide Unique'
                    ]
                },
                pro: {
                    name: "Croissance", // Was Pro
                    desc: "Pour maximiser vos revenus & avis.",
                    button: "Passer en Croissance",
                    features: [
                        'Guides Illimités (+20 DH/supp.)',
                        'Thèmes Premium INCLUS',
                        'Traduction Automatique (IA)',
                        'Assistant Voyageur 24/7 (IA)',
                        'Support Prioritaire WhatsApp'
                    ]
                },
                business: {
                    name: "Agence",
                    desc: "Pour les portfolios de 10+ biens.",
                    button: "Parler à un Expert",
                    price: "Sur mesure",
                    features: [
                        'Guides Illimités',
                        'Tableau de Bord Multi-Propriétés',
                        'Marque Blanche (Sans logo Maplyo)',
                        'Intégration PMS & Channel Mgr',
                        'Facturation Centralisée'
                    ]
                }
            },
            trust: "Garantie Satisfait ou Remboursé (30 jours) • Paiement Sécurisé SSL"
        },
        testimonials: {
            title: "Approuvé par les Pros",
            subtitle: "Rejoignez plus de 500 hôtes qui ont automatisé leur accueil.",
            items: [
                {
                    name: "Jean-Philippe R.",
                    role: "Superhost Airbnb (Marrakech)",
                    text: "Mes voyageurs arrêtaient pas de demander le code Wifi ou comment allumer la clim. Avec Maplyo, ils ont tout sur leur téléphone. J'ai gagné facile 2h par semaine.",
                    result: "-60% de messages",
                },
                {
                    name: "Sofia B.",
                    role: "Gérante Conciergerie (Casablanca)",
                    text: "Le game changer pour nous, c'est l'upsell. On propose des services de ménage ou de transport directement dans le guide. Ça a boosté notre chiffre d'affaires.",
                    result: "+15% revenus",
                },
                {
                    name: "Karim M.",
                    role: "Propriétaire Riad (Fès)",
                    text: "Très pro. L'aspect multilingue est bluffant, mes clients américains et espagnols sont ravis d'avoir les infos dans leur langue sans que je fasse rien.",
                    result: "5★ Avis",
                }
            ]
        },
        faq: {
            title: "Questions Fréquentes",
            subtitle: "Tout ce que vous devez savoir pour démarrer.",
            questions: [
                {
                    q: "Faut-il des compétences techniques ?",
                    a: "Aucune. C'est aussi simple que de remplir un profil Facebook. Vous ajoutez vos infos, on génère le design."
                },
                {
                    q: "Comment mes voyageurs accèdent au guide ?",
                    a: "Via un simple QR Code que vous placez dans le logement, ou un lien que vous envoyez par message avant leur arrivée."
                },
                {
                    q: "Puis-je modifier le guide après impression du QR Code ?",
                    a: "Oui ! C'est la magie du numérique. Mettez à jour vos infos (code wifi, restos...) et le QR Code reste le même."
                },
                {
                    q: "Y a-t-il un engagement ?",
                    a: "Non, c'est sans engagement. Vous pouvez arrêter quand vous voulez."
                }
            ]
        },
        footer: {
            product: "Produit",
            support: "Support",
            legal: "Légal",
            desc: "Maplyo aide les hôtes et les conciergeries à offrir une expérience 5 étoiles grâce à des guides digitaux intelligents.",
            links: {
                features: "Fonctionnalités",
                pricing: "Tarifs",
                testimonials: "Témoignages",
                roadmap: "Roadmap",
                help: "Aide",
                contact: "Contact",
                privacy: "Confidentialité",
                terms: "Conditions",
                legal: "Mentions légales"
            },
            securePayment: "Paiement Sécurisé",
            rights: "Tous droits réservés."
        },
        cta: {
            title: "Prêt à impressionner ?",
            subtitle: "Rejoignez la nouvelle génération d'hôtes qui offrent une expérience exceptionnelle.",
            button: "Créer mon premier guide",
            subtext: "Aucune carte de crédit requise • Annulable à tout moment"
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
        lazy: "Détente",
        mood: "Motivé",
        discovery: "Découverte",
        tasty: "Gourmand",
        adventure: "Aventure",
        festive: "Festif",
        outing: "Sortie",
        brunch: "Un brunch à",
        explore: "Explorez le centre de",
        museums: "Visitez les musées de",
        taste: "Goutez aux spécialités de",
        excursion: "Partez en excursion.",
        nightlife: "La vie nocturne de",
        walk: "Baladez-vous à",
        guide: {
            accessCode: "Codes d'accès",
            locked: "Ce bloc est protégé par un code.",
            enterCode: "Code d'accès",
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
            error: "Désolé, je ne parviens pas à répondre pour le moment.",
            thinking: "Rédaction..."
        },
        qrCodeWall: {
            titlePart1: "Partagez votre guide",
            titlePart2: "partout",
            description: "Un simple scan suffit pour vos voyageurs.",
            items: {
                wifi: { title: "Connexion Wi-Fi", desc: "Le code est pré-complété" },
                perpetual: { title: "Accès Permanent", desc: "Le lien reste valide" },
                remote: { title: "Mises à jour en direct", desc: "Toujours à jour" }
            },
            visual: {
                welcome: "Bienvenue",
                scan: "Scannez-moi",
                detected: "Code QR Détecté",
                notification: {
                    app: "Maplyo",
                    title: "Ouvrir le guide"
                }
            }
        },
        upsells: "Extras",
        legalPage: {
            titlePrivacy: "Politique de Confidentialité",
            titleTerms: "Conditions Générales d'Utilisation (CGU)",
            lastUpdated: "Dernière mise à jour :",
            effectiveDate: "En vigueur au :",
            privacy: {
                intro: "La présente politique de confidentialité décrit comment Maplyo ('nous', 'notre') collecte, utilise et protège vos données personnelles, conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.",
                section1: {
                    title: "1. Collecte des Données",
                    items: [
                        "Données d'identification : Nom, prénom, adresse email.",
                        "Données de transaction : Historique de paiements (traités de manière sécurisée par Stripe, nous ne stockons pas vos données bancaires complètes).",
                        "Données d'utilisation : Informations sur la création et la consultation des guides numériques."
                    ]
                },
                section2: {
                    title: "2. Finalités du Traitement",
                    intro: "Vos données sont collectées pour :",
                    items: [
                        "Fournir et gérer le service de guide numérique.",
                        "Gérer votre abonnement et la facturation.",
                        "Vous communiquer les mises à jour importantes du service.",
                        "Améliorer nos fonctionnalités grâce à des statistiques anonymisées."
                    ]
                },
                section3: {
                    title: "3. Partage des Données",
                    content: "Nous ne vendons jamais vos données. Elles peuvent être partagées uniquement avec nos prestataires techniques essentiels (ex: Stripe pour les paiements, Supabase pour l'hébergement, Resend pour les emails) qui sont tenus à une stricte confidentialité."
                },
                section4: {
                    title: "4. Sécurité",
                    content: "Nous mettons en œuvre des mesures de sécurité techniques (chiffrement SSL, protocoles sécurisés) pour protéger vos données contre tout accès non autorisé."
                },
                section5: {
                    title: "5. Vos Droits",
                    content: "Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition concernant vos données.",
                    contact: "Pour exercer ce droit, contactez-nous à : contact@maplyo.com"
                }
            },
            terms: {
                intro: "Bienvenue sur Maplyo. En accédant à notre plateforme ou en utilisant nos services, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation.",
                section1: {
                    title: "1. Description du Service",
                    content: "Maplyo est une plateforme SaaS (Software as a Service) permettant aux hôtes et gestionnaires immobiliers de créer, héberger et partager des livrets d'accueil numériques pour leurs voyageurs."
                },
                section2: {
                    title: "2. Abonnements et Paiements",
                    items: [
                        "Facturation : Les services sont facturés mensuellement ou annuellement, d'avance.",
                        "Annulation : Vous pouvez annuler votre abonnement à tout moment via votre tableau de bord. L'accès aux fonctionnalités Premium reste actif jusqu'à la fin de la période facturée.",
                        "Remboursement : Nous offrons une garantie 'Satisfait ou Remboursé' de 30 jours pour tout nouvel abonnement."
                    ]
                },
                section3: {
                    title: "3. Responsabilités de l'Utilisateur",
                    intro: "Vous vous engagez à :",
                    items: [
                        "Fournir des informations exactes lors de votre inscription.",
                        "Ne pas publier de contenu illicite, diffamatoire ou contraire aux bonnes mœurs dans vos guides.",
                        "Être seul responsable des informations (codes wifi, adresses) partagées avec vos voyageurs."
                    ]
                },
                section4: {
                    title: "4. Propriété Intellectuelle",
                    content: "Maplyo reste propriétaire de la plateforme, du code, et de la marque. Vous restez propriétaire du contenu (textes, photos) que vous ajoutez dans vos guides."
                },
                section5: {
                    title: "5. Limitation de Responsabilité",
                    content: "Maplyo ne saurait être tenu responsable des dommages indirects, pertes de revenus ou problèmes survenus suite à l'utilisation d'informations contenues dans les guides créés par les utilisateurs."
                },
                section6: {
                    title: "6. Droit Applicable",
                    content: "Ces conditions sont régies par le droit marocain. Tout litige relatif à leur interprétation et/ou à leur exécution relève des tribunaux compétents de Casablanca."
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
            trust: "30-Day Money Back Guarantee • Secure SSL Payment"
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
                    result: "5★ Reviews",
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
            subtext: "No credit card required • Cancel anytime"
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
            login: "Iniciar sesión",
            signup: "Regístrate",
            tryFree: "Prueba gratis",
            popular: "Más popular",
            month: "/mes",
            loading: "Cargando...",
            choose: "Elegir",
            viewGuide: "Ver guía completa",
            more: "Ver más",
            checkin: "Llegada",
            qrCodeWall: "Escanea para probar",
            checkout: "Salida",
            location: "Ubicación",
            viewOnMap: "Ver en el mapa",
            wifi: "WiFi",
        },
        socialProof: {
            trustpilot: "4.9/5 por 500+ Anfitriones",
            usedBy: "Usado por los mejores gestores",
            autoTranslate: { title: "Auto-Traducido", desc: "Tus guías hablan su idioma." },
            googleMaps: { title: "Google Maps Integrado", desc: "Maps directamente en la guía." }
        },
        hero: {
            tag: "PARA ANFITRIONES",
            title: "Nunca repitas el código WiFi.",
            subtitle: "Digitaliza tu guía de bienvenida. Mayor valoración, menos mensajes.",
            cta: "Crear mi guía",
            demo: "Ver ejemplo",
            noCreditCard: "Sin tarjeta",
            setupTime: "Configura en 2 min",
        },
        features: {
            title: "Todo lo que necesitas.", subtitle: "Nada más.", description: "Herramientas poderosas.",
            items: {
                mobileFirst: { title: "100% Móvil", desc: "Abre instantáneo." },
                secure: { title: "Códigos Seguros", desc: "Protege acceso WiFi." },
                map: { title: "Mapa Interactivo", desc: "Recomendaciones un clic." },
                live: { title: "Cambios en Vivo", desc: "Se actualiza ahora." },
                translate: { title: "Auto Traducción", desc: "Detecta idioma del huésped." },
                checklist: { title: "Check-lists", desc: "Instrucciones claras." }
            }
        },
        pricing: {
            title: "Precios Transparentes",
            subtitle: "Inicia gratis, escala después.",
            bestOffer: "Mejor oferta:",
            addon: "+ Extra",
            enterprise: { title: "Enterprise?", desc: "Plan a medida.", cta: "Contactar" },
            plans: {
                demo: { name: "Descubrir", price: "Gratis", desc: "Pruébalo", button: "Crear guía", features: ['Acceso total', 'Vista móvil', 'Sin publicar'] },
                basic: { name: "Esencial", desc: "Lanza tu primera", button: "Iniciar", features: ['Guía Digital', 'QR WiFi', 'Mapa', '1 Guía'] },
                pro: { name: "Crecimiento", desc: "Maximiza ingresos", button: "Mejorar", features: ['Guías ilimitadas', 'Traductor automático', 'Soporte prioritario'] },
                business: { name: "Agencia", desc: "Para portfolios", button: "Hablar", price: "Por medida", features: ['Ilimitado', 'Dashboard multi', 'Marca blanca'] }
            },
            trust: "Pago seguro"
        },
        testimonials: {
            title: "Aprobado por Profesionales",
            subtitle: "Únase a más de 500 anfitriones que han automatizado su bienvenida.",
            items: [
                {
                    name: "Jean-Philippe R.",
                    role: "Superhost Airbnb (Marrakech)",
                    text: "Mis huéspedes no paraban de pedir la clave del Wifi o cómo encender el aire acondicionado. Con Maplyo, lo tienen todo en su teléfono. Ahorré fácilmente 2 horas a la semana.",
                    result: "-60% mensajes",
                },
                {
                    name: "Sofia B.",
                    role: "Gerente de Conserjería (Casablanca)",
                    text: "El cambio de juego para nosotros es la venta adicional. Ofrecemos servicios de limpieza o transporte directamente en la guía. Aumentó nuestros ingresos.",
                    result: "+15% ingresos",
                },
                {
                    name: "Karim M.",
                    role: "Propietario de Riad (Fez)",
                    text: "Muy profesional. El aspecto multilingüe es impresionante, mis clientes americanos y españoles están encantados de tener la información en su idioma sin que yo haga nada.",
                    result: "5★ Reseñas",
                }
            ]
        },
        faq: {
            title: "Preguntas Frecuentes",
            subtitle: "Todo lo que necesitas saber para empezar.",
            questions: [
                {
                    q: "¿Necesito habilidades técnicas?",
                    a: "Ninguna en absoluto. Es tan fácil como completar un perfil de red social. Tú añades la info, nosotros nos encargamos del diseño."
                },
                {
                    q: "¿Cómo acceden los huéspedes a la guía?",
                    a: "A través de un simple código QR que colocas en el alojamiento, o un enlace que envías por mensaje antes de su llegada."
                },
                {
                    q: "¿Puedo actualizar la guía después de imprimir el código QR?",
                    a: "¡Sí! Esa es la magia. Actualiza tu información (wifi, restaurantes...) y el código QR sigue siendo el mismo."
                },
                {
                    q: "¿Hay algún compromiso o contrato?",
                    a: "No, cancela cuando quieras."
                }
            ]
        },
        footer: {
            product: "Producto", support: "Soporte", legal: "Legal", desc: "Maplyo para anfitriones.",
            links: { features: "Características", pricing: "Precios", testimonials: "Testimonios", roadmap: "Roadmap", help: "Ayuda", contact: "Contacto", privacy: "Privacidad", terms: "Términos", legal: "Aviso Legal" },
            securePayment: "Pago Seguro", rights: "Derechos reservados."
        },
        cta: { title: "¿Listo para impresionar?", subtitle: "Únete a la nueva generación.", button: "Crear mi guía", subtext: "Cancelación flexible" },
        tipOfTheDay: "Consejo del Día", sunday: "Dom", monday: "Lun", tuesday: "Mar", wednesday: "Mié", thursday: "Jue", friday: "Vie", saturday: "Sáb",
        lazy: "Relajado", mood: "Motivado", discovery: "Descubrimiento", tasty: "Sabroso", adventure: "Aventura", festive: "Fiesta", outing: "Salida",
        brunch: "Brunch", explore: "Explorar", museums: "Museos", taste: "Saborear", excursion: "Excursión", nightlife: "Noche", walk: "Paseo",
        guide: { accessCode: "Códigos", locked: "Protegido por código.", enterCode: "Código de acceso", apartmentDoor: "Puerta", buildingDoor: "Edificio", gate: "Portón", notes: "Notas" },
        ai: { assistant: "Asistente", online: "En línea", placeholder: "Mensaje...", empty: "Haz una pregunta.", error: "Error.", thinking: "Escribiendo..." },
        qrCodeWall: {
            titlePart1: "Comparte", titlePart2: "donde sea", description: "Un scan basta.",
            items: { wifi: { title: "Wi-Fi", desc: "Pre-llenado" }, perpetual: { title: "Permanente", desc: "Válido siempre" }, remote: { title: "En Vivo", desc: "Actualizado" } },
            visual: { welcome: "Bienvenido", scan: "Escanéame", detected: "Detectado", notification: { app: "Maplyo", title: "Abrir guía" } }
        },
        upsells: "Extras",
        legalPage: {
            titlePrivacy: "Privacidad", titleTerms: "Términos", lastUpdated: "Actualizado", effectiveDate: "En vigor",
            privacy: { intro: "Política.", section1: { title: "Datos", items: ["Nombre"] }, section2: { title: "Fines", intro: "Para:", items: ["Proveer el servicio"] }, section3: { title: "Compartir", content: "No vendemos datos." }, section4: { title: "Seguridad", content: "Seguro." }, section5: { title: "Derechos", content: "Puedes pedir acceder.", contact: "contact@maplyo.com" } },
            terms: { intro: "Términos.", section1: { title: "Servicio", content: "SaaS" }, section2: { title: "Pagos", items: ["Facturación"] }, section3: { title: "Responsabilidad", intro: "Deberes:", items: ["Veracidad"] }, section4: { title: "IP", content: "Propiedad" }, section5: { title: "Límites", content: "Sin daños indirectos" }, section6: { title: "Ley", content: "Marruecos" } }
        }
    },
    ar: {
        common: {
            getStarted: "ابدأ", login: "تسجيل الدخول", signup: "اشتراك", tryFree: "جرب مجاناً", popular: "الأكثر شيوعاً", month: "/شهر", loading: "جاري التحميل...", choose: "اختر", viewGuide: "عرض الدليل", more: "عرض المزيد", checkin: "تسجيل الوصول", qrCodeWall: "امسح للتجربة", checkout: "المغادرة", location: "الموقع", viewOnMap: "عرض على الخريطة", wifi: "واي فاي",
        },
        socialProof: {
            trustpilot: "4.9/5 بواسطة +500", usedBy: "يستخدمه أفضل المديرين", autoTranslate: { title: "مترجم آلياً", desc: "دليلك يتحدث لغتهم." }, googleMaps: { title: "خرائط جوجل مدمجة", desc: "الخرائط في الدليل مباشرة." }
        },
        hero: {
            tag: "للمضيفين", title: "لا تكرر الرمز أبداً.", subtitle: "حول دليلك للرقمية. تجربة خمس نجوم.", cta: "إنشاء دليلي مجاناً", demo: "مشاهدة مثال", noCreditCard: "بدون بطاقة", setupTime: "مُعدّ في دقيقتين",
        },
        features: {
            title: "كل ما تحتاجه.", subtitle: "دون تعقيد.", description: "أدوات قوية.",
            items: { mobileFirst: { title: "موبايل أولاً", desc: "يُفتح فوراً." }, secure: { title: "رموز آمنة", desc: "أقفال محمية." }, map: { title: "تفاعلي", desc: "خريطة مدمجة." }, live: { title: "تعديل مباشر", desc: "الكل مُدرج." }, translate: { title: "ترجمة آلية", desc: "لغة الزائر." }, checklist: { title: "قوائم", desc: "إرشادات." } }
        },
        pricing: {
            title: "تسعير واضح", subtitle: "ابدأ مجاناً، وقم بالترقية عند الحاجة.", bestOffer: "أفضل عرض:", addon: "+ إضافي",
            enterprise: { title: "للشركات؟", desc: "حل مخصص.", cta: "اتصل بنا" },
            plans: {
                demo: { name: "اكتشاف", price: "مجاني", desc: "تجربة الخدمة", button: "إنشاء دليل", features: ['وصول كامل', 'معاينة الجوال', 'عدم النشر'] },
                basic: { name: "أساسي", desc: "لإطلاق عقارك الأول.", button: "ابدأ", features: ['دليل رقمي', 'واي فاي فوري', 'خريطة', 'دليل واحد'] },
                pro: { name: "نمو", desc: "تحسين الدخل.", button: "تحديث", features: ['أدلة لا محدودة', 'ترجمة تلقائية', 'دعم واتساب'] },
                business: { name: "وكالة", desc: "للمجموعات", button: "تواصل", price: "مخصص", features: ['لا محدود', 'لوحة تحكم', 'علامة بيضاء'] }
            },
            trust: "دفع آمن SSL"
        },
        testimonials: {
            title: "معتمد من المحترفين",
            subtitle: "انضم إلى أكثر من 500 مضيف قاموا بأتمتة استقبالهم.",
            items: [
                {
                    name: "جون فيليب ر.",
                    role: "مضيف مميز في Airbnb (مراكش)",
                    text: "كان ضيوفي يسألون باستمرار عن رمز الواي فاي أو كيفية تشغيل مكيف الهواء. مع Maplyo، كل شيء موجود على هواتفهم. لقد وفرت ساعتين في الأسبوع بسهولة.",
                    result: "-60% من الرسائل"
                },
                {
                    name: "صوفيا ب.",
                    role: "مديرة شركة كونسيرج (الدار البيضاء)",
                    text: "نقطة التحول بالنسبة لنا هي الخدمات الإضافية. نحن نقدم خدمات تنظيف أو نقل مباشرة في الدليل. لقد عزز ذلك من إيراداتنا.",
                    result: "+15% إيرادات"
                },
                {
                    name: "كريم م.",
                    role: "مالك رياض (فاس)",
                    text: "محترف جداً. الجانب متعدد اللغات مبهر، عملائي الأمريكيون والمقربون سعداء جداً بالحصول على المعلومات بلغتهم دون أن أفعل أي شيء.",
                    result: "5★ تقييمات"
                }
            ]
        },
        faq: {
            title: "الأسئلة الشائعة",
            subtitle: "كل ما تحتاج لمعرفته للبدء.",
            questions: [
                {
                    q: "هل أحتاج إلى مهارات تقنية؟",
                    a: "لا على الإطلاق. الأمر سهل مثل ملء ملف شخصي على وسائل التواصل الاجتماعي. أنت تضيف المعلومات، ونحن نتعامل مع التصميم."
                },
                {
                    q: "كيف يصل الضيوف إلى الدليل؟",
                    a: "عبر رمز QR بسيط تضعه في مكان الإقامة، أو رابط ترسله في رسالة قبل وصولهم."
                },
                {
                    q: "هل يمكنني تحديث الدليل بعد طباعة رمز الـ QR؟",
                    a: "نعم! هذا هو السحر. قم بتحديث معلوماتك (الواي فاي، المطاعم...) وسيبقى رمز الـ QR كما هو تماماً."
                },
                {
                    q: "هل هناك أي التزام أو عقد؟",
                    a: "لا، يمكنك الإلغاء في أي وقت."
                }
            ]
        },
        footer: {
            product: "المنتج", support: "الدعم", legal: "قانوني", desc: "مابليو للمضيفين.",
            links: { features: "الميزات", pricing: "التسعير", testimonials: "شهادات", roadmap: "خارطة طريق", help: "مساعدة", contact: "اتصال", privacy: "الخصوصية", terms: "الشروط", legal: "إشعار" },
            securePayment: "دفع آمن", rights: "جميع الحقوق محفوظة."
        },
        cta: { title: "جاهز للتميز؟", subtitle: "انضم للجيل القادم.", button: "إنشاء دليلي", subtext: "إلغاء في أي وقت" },
        tipOfTheDay: "نصيحة اليوم", sunday: "الأحد", monday: "الإثنين", tuesday: "الثلاثاء", wednesday: "الأربعاء", thursday: "الخميس", friday: "الجمعة", saturday: "السبت",
        lazy: "مسترخي", mood: "متحمس", discovery: "اكتشاف", tasty: "لذيذ", adventure: "مغامرة", festive: "احتفالي", outing: "نزهة",
        brunch: "فطور متأخر", explore: "استكشف", museums: "متاحف", taste: "تذوق", excursion: "رحلة", nightlife: "الحياة الليلية", walk: "تمشية",
        guide: { accessCode: "رموز الدخول", locked: "هذا القسم محمي برمز.", enterCode: "رمز الدخول", apartmentDoor: "باب الشقة", buildingDoor: "باب العمارة", gate: "البوابة", notes: "ملاحظات" },
        ai: { assistant: "المساعد", online: "متاح", placeholder: "رسالة...", empty: "اسأل أي شيء.", error: "خطأ في الشبكة.", thinking: "جاري الكتابة..." },
        qrCodeWall: {
            titlePart1: "شارك", titlePart2: "دليلك", description: "مجرد مسح للزوار.",
            items: { wifi: { title: "Wi-Fi", desc: "معبأ مسبقاً" }, perpetual: { title: "وصول دائم", desc: "الرابط صالح" }, remote: { title: "تحديث مباشر", desc: "دائماً محدث" } },
            visual: { welcome: "مرحباً", scan: "امسحني", detected: "تم الكشف", notification: { app: "Maplyo", title: "افتح الدليل" } }
        },
        upsells: "إضافات",
        legalPage: {
            titlePrivacy: "سياسة الخصوصية", titleTerms: "شروط الاستخدام", lastUpdated: "آخر تحديث", effectiveDate: "ساري المفعول",
            privacy: { intro: "سياسة.", section1: { title: "بيانات", items: ["الاسم"] }, section2: { title: "أغراض", intro: "إلى:", items: ["تقديم الخدمة"] }, section3: { title: "مشاركة", content: "لا نبيع بيانات." }, section4: { title: "أمان", content: "نظام آمن." }, section5: { title: "حقوق", content: "تواصل معنا.", contact: "contact@maplyo.com" } },
            terms: { intro: "شروط.", section1: { title: "خدمة", content: "منصة ويب" }, section2: { title: "دفع", items: ["فواتير"] }, section3: { title: "مسؤولية", intro: "عليك:", items: ["المعلومات"] }, section4: { title: "حقوق ملكية", content: "ملك لمنشئ المحتوى" }, section5: { title: "حدود", content: "غير مسؤول" }, section6: { title: "قانون", content: "المغرب" } }
        }
    }
}



