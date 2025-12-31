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
                    name: "Démo",
                    price: "Gratuit",
                    desc: "Parfait pour tester l'éditeur sans engagement.",
                    button: "Essayer Gratuitement",
                    features: [
                        'Accès au Créateur',
                        'Pas de publication',
                        'Thèmes limités'
                    ]
                },
                basic: {
                    name: "Basique",
                    desc: "L'essentiel pour digitaliser votre logement.",
                    button: "Commencer",
                    features: [
                        '1 Guide Actif',
                        'Thèmes Essentiels',
                        'Support Standard',
                        'Hébergement Inclus',
                        'QR Code'
                    ]
                },
                pro: {
                    name: "Pro",
                    desc: "Pour les pros et conciergeries.",
                    button: "Devenir Pro",
                    features: [
                        '2 Guides Inclus (+20 DH/guide supp.)',
                        'Assistant IA Invités',
                        'Tous les Thèmes Premium',
                        'Support Prioritaire',
                        'Statistiques Avancées'
                    ]
                },
                business: {
                    name: "Business",
                    desc: "Pour gérer 50+ propriétés.",
                    button: "Contacter l'équipe",
                    price: "Sur devis",
                    features: [
                        'Guides Illimités',
                        'Marque Blanche (White Label)',
                        'Accès API & Webhooks',
                        'Intégration PMS',
                        'Manager Dédié'
                    ]
                }
            },
            trust: "Paiement chiffré SSL • Annulation en 1 clic"
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
        upsells: "Extras"
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
        upsells: "Extras"
    }
};
