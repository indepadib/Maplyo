export type Language = 'fr' | 'en';

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
            checkout: "Départ",
            location: "Localisation",
            viewOnMap: "Voir sur la carte",
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
                    contact: "Pour exercer ce droit, contactez-nous à : support@maplyo.com"
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
            signup: "Sign Up",
            tryFree: "Try for Free",
            popular: "Most Popular",
            month: "/month",
            loading: "Loading...",
            choose: "Select",
            viewGuide: "View Full Guide",
            more: "See More",
            checkin: "Check-in",
            checkout: "Check-out",
            location: "Location",
            viewOnMap: "View on Map",
        },
        socialProof: {
            trustpilot: "4.9/5 by 500+ Hosts",
            usedBy: "Used by top concierges",
            autoTranslate: {
                title: "Auto-Translated",
                desc: "Your guides speak your guests' language."
            },
            googleMaps: {
                title: "Google Maps Built-in",
                desc: "Google Maps directly inside the guide."
            }
        },
        hero: {
            tag: "FOR HOSTS AND CONCIERGES",
            title: "Never repeat the WiFi code again.",
            subtitle: "Digitize your welcome book. Offer a 5-star experience, reduce messages by 50%, and boost your positive reviews.",
            cta: "Create my free guide",
            demo: "View example",
            noCreditCard: "No credit card required",
            setupTime: "Setup in 2 min",
        },
        features: {
            title: "Everything you need.",
            subtitle: "Nothing you don't.",
            description: "Powerful tools to automate your welcome and reassure travelers, without technical complexity.",
            items: {
                mobileFirst: {
                    title: "100% Mobile First",
                    desc: "No app to download. Your guides open instantly in any mobile browser."
                },
                secure: {
                    title: "Secure Codes",
                    desc: "Protect WiFi and keybox access. Unlock via email or unique code."
                },
                map: {
                    title: "Interactive Map",
                    desc: "Integrate your favorite restaurants, bars, and activities with Google Maps directions in one click."
                },
                live: {
                    title: "Live Updates",
                    desc: "Change WiFi code or a recommendation, it updates instantly on all phones."
                },
                translate: {
                    title: "Auto Translation",
                    desc: "Automatically detects visitor's phone language and translates your guide."
                },
                checklist: {
                    title: "Check-lists",
                    desc: "Clear instructions for check-in and check-out. Reduce repetitive questions by 80%."
                }
            }
        },
        pricing: {
            title: "Transparent Pricing",
            subtitle: "Start for free. Scale when you want.",
            bestOffer: "Best offer in the world:",
            addon: "+20 DH / additional guide",
            enterprise: {
                title: "Need an Enterprise solution?",
                desc: "For managers with 50+ properties, we offer volume pricing and PMS integration.",
                cta: "Contact Sales Team"
            },
            plans: {
                demo: {
                    name: "Demo",
                    price: "Free",
                    desc: "Perfect for testing the editor without commitment.",
                    button: "Try for Free",
                    features: [
                        'Creator Access',
                        'No Publication',
                        'Limited Themes'
                    ]
                },
                basic: {
                    name: "Basic",
                    desc: "Essential for digitalizing your property.",
                    button: "Start",
                    features: [
                        '1 Active Guide',
                        'Essential Themes',
                        'Standard Support',
                        'Hosting Included',
                        'QR Code'
                    ]
                },
                pro: {
                    name: "Pro",
                    desc: "For pros and concierges.",
                    button: "Go Pro",
                    features: [
                        '2 Guides Included (+20 DH/add. guide)',
                        'Guest AI Assistant',
                        'All Premium Themes',
                        'Priority Support',
                        'Advanced Stats'
                    ]
                },
                business: {
                    name: "Business",
                    desc: "To manage 50+ properties.",
                    button: "Contact Sales",
                    price: "Custom",
                    features: [
                        'Unlimited Guides',
                        'White Label',
                        'API Access & Webhooks',
                        'PMS Integration',
                        'Dedicated Manager'
                    ]
                }
            },
            trust: "SSL Encrypted Payment • 1-Click Cancel"
        },
        footer: {
            product: "Product",
            support: "Support",
            legal: "Legal",
            desc: "Maplyo helps hosts and concierges deliver a 5-star experience with smart digital guides.",
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
            subtitle: "Join the new generation of hosts offering exceptional experiences.",
            button: "Create my first guide",
            subtext: "No credit card required • Cancel anytime"
        },
        // Daily Tips
        tipOfTheDay: "Tip of the Day",
        sunday: "Sunday",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        lazy: "Chill",
        mood: "Mood",
        discovery: "Discovery",
        tasty: "Tasty",
        adventure: "Adventure",
        festive: "Festive",
        outing: "Outing",
        brunch: "Brunch in",
        explore: "Explore the center of",
        museums: "Visit museums in",
        taste: "Taste specialties of",
        excursion: "Go on a trip.",
        nightlife: "Nightlife in",
        walk: "Walk around",
        guide: {
            accessCode: "Access Codes",
            locked: "This block is protected by a code.",
            enterCode: "Access Code",
            apartmentDoor: "Apartment Door:",
            buildingDoor: "Building Door:",
            gate: "Gate:",
            notes: "Notes"
        },
        ai: {
            assistant: "Guide Assistant",
            online: "AI Online",
            placeholder: "Message...",
            empty: "Ask a question about this guide.",
            error: "Sorry, I cannot answer right now.",
            thinking: "Thinking..."
        },
        upsells: "Extras"
    }
};
