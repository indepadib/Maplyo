export type Language = 'fr' | 'en' | 'es' | 'ar' | 'nl' | 'zh';

export const DICTIONARY = {
    "fr": {
        "common": {
            "getStarted": "Commencer",
            "login": "Connexion",
            "signup": "S'inscrire",
            "tryFree": "Essayer Gratuitement",
            "popular": "Le plus populaire",
            "month": "/mois",
            "loading": "Chargement...",
            "choose": "Choisir",
            "viewGuide": "Voir le guide complet",
            "more": "Voir plus",
            "checkin": "Arrivée",
            "qrCodeWall": "Scannez pour tester",
            "checkout": "Départ",
            "location": "Localisation",
            "viewOnMap": "Voir sur la carte",
            "wifi": "WiFi",
            "other": "Autre"
        },
        "renderer": {
            "welcome": "Bienvenue",
            "wifi": "WiFi",
            "access": "Codes d'accès",
            "location": "Localisation",
            "contact": "Contact",
            "amenities": "Équipements",
            "places": "À proximité",
            "rules": "Règlement",
            "tipOfTheDay": "Conseil du jour",
            "sunday": "Dimanche",
            "monday": "Lundi",
            "tuesday": "Mardi",
            "wednesday": "Mercredi",
            "thursday": "Jeudi",
            "friday": "Vendredi",
            "saturday": "Samedi",
            "lazy": "Détente",
            "mood": "Motivé",
            "discovery": "Découverte",
            "tasty": "Gourmand",
            "adventure": "Aventure",
            "festive": "Festif",
            "outing": "Sortie",
            "brunch": "Un brunch à",
            "explore": "Explorez",
            "museums": "Visitez",
            "taste": "Goûtez",
            "excursion": "Une excursion",
            "nightlife": "Vie nocturne",
            "walk": "Une balade",
            "secureAccess": "Accès Sécurisé",
            "checkin": "Arrivée",
            "checkout": "Départ",
            "viewMap": "Voir sur la carte",
            "upsells": "Extras",
            "items": "éléments",
            "empty": "Rien à afficher",
            "searchPlaceholder": "Rechercher...",
            "secureAccessDesc": "Entrez le code fourni par votre hôte."
        },
        "socialProof": {
            "trustpilot": "4.9/5 par 500+ Hôtes",
            "usedBy": "Utilisé par les meilleures conciergeries",
            "autoTranslate": {
                "title": "Auto-Traduit",
                "desc": "Vos guides parlent la langue de vos invités."
            },
            "googleMaps": {
                "title": "Google Maps Intégré",
                "desc": "Google Maps directement dans le guide."
            }
        },
        "hero": {
            "tag": "POUR LES H├öTES ET CONCIERGERIES",
            "title": "Ne r├®p├®tez plus jamais le code WiFi.",
            "subtitle": "Digitalisez votre livret d'accueil. Offrez une exp├®rience 5 ├®toiles, r├®duisez les messages de 50%, et augmentez vos avis positifs.",
            "cta": "Cr├®er mon guide gratuit",
            "demo": "Voir un exemple",
            "noCreditCard": "Pas de carte requise",
            "setupTime": "Configur├® en 2 min"
        },
        "features": {
            "title": "Tout ce dont vous avez besoin.",
            "subtitle": "Rien de superflu.",
            "description": "Des outils puissants pour automatiser votre accueil.",
            "badge": "Fonctionnalités",
            "items": {
                "mobileFirst": {
                    "title": "100% Mobile First",
                    "desc": "Pas d'application à télécharger."
                },
                "secure": {
                    "title": "Codes Sécurisés",
                    "desc": "WiFi et boîtes à clés protégés."
                },
                "map": {
                    "title": "Carte Interactive",
                    "desc": "Intégrez vos lieux favoris."
                },
                "live": {
                    "title": "Modifications Live",
                    "desc": "Mise à jour instantanée."
                },
                "translate": {
                    "title": "Traduction Auto",
                    "desc": "Détecte la langue du visiteur."
                },
                "checklist": {
                    "title": "Check-lists",
                    "desc": "Instructions claires arrivée/départ."
                }
            }
        },
        "pricing": {
            "title": "Tarification Transparente",
            "subtitle": "Commencez gratuitement. ├ëvoluez quand vous voulez.",
            "bestOffer": "La meilleure offre du monde :",
            "addon": "+20 DH / guide suppl├®mentaire",
            "enterprise": {
                "title": "Besoin d'une solution Enterprise ?",
                "desc": "Pour les gestionnaires de plus de 50 propri├®t├®s, nous proposons des tarifs d├®gressifs et une int├®gration PMS.",
                "cta": "Contacter l'├®quipe commerciale"
            },
            "plans": {
                "demo": {
                    "name": "D├®couverte",
                    "price": "Gratuit",
                    "desc": "Testez la puissance de Maplyo sans carte bancaire.",
                    "button": "Cr├®er un guide (Gratuit)",
                    "features": [
                        "Acc├¿s complet au Cr├®ateur",
                        "Pr├®visualisation Mobile",
                        "Sans publication"
                    ]
                },
                "basic": {
                    "name": "Essentiel",
                    "desc": "Pour lancer votre premi├¿re propri├®t├®.",
                    "button": "D├®marrer",
                    "features": [
                        "Livret Digital Complet",
                        "QR Code WiFi Instantan├®",
                        "Carte Interactive (Google Maps)",
                        "Th├¿mes Gratuits (Pack Premium +15 DH)",
                        "1 Guide Unique"
                    ]
                },
                "pro": {
                    "name": "Croissance",
                    "desc": "Pour maximiser vos revenus & avis.",
                    "button": "Passer en Croissance",
                    "features": [
                        "Guides Illimit├®s (+20 DH/supp.)",
                        "Th├¿mes Premium INCLUS",
                        "Traduction Automatique (IA)",
                        "Assistant Voyageur 24/7 (IA)",
                        "Support Prioritaire WhatsApp"
                    ]
                },
                "business": {
                    "name": "Agence",
                    "desc": "Pour les portfolios de 10+ biens.",
                    "button": "Parler ├á un Expert",
                    "price": "Sur mesure",
                    "features": [
                        "Guides Illimit├®s",
                        "Tableau de Bord Multi-Propri├®t├®s",
                        "Marque Blanche (Sans logo Maplyo)",
                        "Int├®gration PMS & Channel Mgr",
                        "Facturation Centralis├®e"
                    ]
                }
            },
            "trust": "Garantie Satisfait ou Rembours├® (30 jours) ÔÇó Paiement S├®curis├® SSL"
        },
        "testimonials": {
            "title": "Approuv├® par les Pros",
            "subtitle": "Rejoignez plus de 500 h├┤tes qui ont automatis├® leur accueil.",
            "items": [
                {
                    "name": "Jean-Philippe R.",
                    "role": "Superhost Airbnb (Marrakech)",
                    "text": "Mes voyageurs arr├¬taient pas de demander le code Wifi ou comment allumer la clim. Avec Maplyo, ils ont tout sur leur t├®l├®phone. J'ai gagn├® facile 2h par semaine.",
                    "result": "-60% de messages"
                },
                {
                    "name": "Sofia B.",
                    "role": "G├®rante Conciergerie (Casablanca)",
                    "text": "Le game changer pour nous, c'est l'upsell. On propose des services de m├®nage ou de transport directement dans le guide. ├ça a boost├® notre chiffre d'affaires.",
                    "result": "+15% revenus"
                },
                {
                    "name": "Karim M.",
                    "role": "Propri├®taire Riad (F├¿s)",
                    "text": "Tr├¿s pro. L'aspect multilingue est bluffant, mes clients am├®ricains et espagnols sont ravis d'avoir les infos dans leur langue sans que je fasse rien.",
                    "result": "5Ôÿà Avis"
                }
            ]
        },
        "faq": {
            "title": "Questions Fr├®quentes",
            "subtitle": "Tout ce que vous devez savoir pour d├®marrer.",
            "questions": [
                {
                    "q": "Faut-il des comp├®tences techniques ?",
                    "a": "Aucune. C'est aussi simple que de remplir un profil Facebook. Vous ajoutez vos infos, on g├®n├¿re le design."
                },
                {
                    "q": "Comment mes voyageurs acc├¿dent au guide ?",
                    "a": "Via un simple QR Code que vous placez dans le logement, ou un lien que vous envoyez par message avant leur arriv├®e."
                },
                {
                    "q": "Puis-je modifier le guide apr├¿s impression du QR Code ?",
                    "a": "Oui ! C'est la magie du num├®rique. Mettez ├á jour vos infos (code wifi, restos...) et le QR Code reste le m├¬me."
                },
                {
                    "q": "Y a-t-il un engagement ?",
                    "a": "Non, c'est sans engagement. Vous pouvez arr├¬ter quand vous voulez."
                }
            ]
        },
        "footer": {
            "product": "Produit",
            "support": "Support",
            "legal": "L├®gal",
            "desc": "Maplyo aide les h├┤tes et les conciergeries ├á offrir une exp├®rience 5 ├®toiles gr├óce ├á des guides digitaux intelligents.",
            "links": {
                "features": "Fonctionnalit├®s",
                "pricing": "Tarifs",
                "testimonials": "T├®moignages",
                "roadmap": "Roadmap",
                "help": "Aide",
                "contact": "Contact",
                "privacy": "Confidentialit├®",
                "terms": "Conditions",
                "legal": "Mentions l├®gales"
            },
            "securePayment": "Paiement S├®curis├®",
            "rights": "Tous droits r├®serv├®s."
        },
        "cta": {
            "title": "Pr├¬t ├á impressionner ?",
            "subtitle": "Rejoignez la nouvelle g├®n├®ration d'h├┤tes qui offrent une exp├®rience exceptionnelle.",
            "button": "Cr├®er mon premier guide",
            "subtext": "Aucune carte de cr├®dit requise ÔÇó Annulable ├á tout moment"
        },
        "guide": {
            "accessCode": "Codes d'accès",
            "locked": "Protégé par code.",
            "enterCode": "Code d'accès",
            "confirm": "Valider",
            "apartmentDoor": "Porte :",
            "buildingDoor": "Immeuble :",
            "gate": "Portail :",
            "notes": "Notes"
        },
        "guideBlocks": {
            "checkIn": {
                "title": "Arrivée"
            },
            "location": {
                "notSet": "Non défini",
                "address": "Adresse",
                "openInMaps": "Ouvrir",
                "copyAddress": "Copier",
                "viewOnMap": "Voir sur la carte"
            },
            "contact": {
                "host": "Hôte",
                "yourHost": "Votre Hôte",
                "phone": "Tel",
                "openConversation": "Ouvrir"
            },
            "rules": {
                "noRules": "Pas de règles"
            },
            "amenities": {
                "noAmenities": "Pas d'équipements"
            },
            "faq": {
                "noFaq": "Pas de FAQ",
                "question": "Question",
                "answer": "Réponse"
            },
            "trash": {
                "title": "Bacs",
                "items": "Ordures",
                "recycling": "Recyclage"
            },
            "breakfast": {
                "title": "Petit Déjeuner",
                "menu": "Menu"
            },
            "transport": {
                "noInfo": "Pas d'infos",
                "call": "Appeler"
            }
        },
        "editor": {
            "common": {
                "title": "Titre",
                "description": "Description",
                "uploadImage": "Image",
                "tags": "Tags",
                "placeholderTags": "Wifi, Piscine...",
                "time": "Heure",
                "instructions": "Instructions",
                "videoUrl": "Vidéo",
                "location": "Lieu",
                "address": "Adresse",
                "placeholderAddress": "Rue...",
                "mapUrl": "Maps",
                "placeholderMap": "Lien Maps",
                "phone": "Tel",
                "placeholderPhone": "+33...",
                "whatsapp": "WhatsApp",
                "placeholderWhatsapp": "Numéro",
                "email": "Email",
                "placeholderEmail": "...",
                "price": "Prix",
                "placeholderPrice": "150 DH",
                "placeholderReserve": "Réserver",
                "cost": "Coût",
                "placeholderWelcome": "Bienvenue...",
                "linkUrl": "Lien",
                "priceCheap": "Eco",
                "priceModerate": "Moyen",
                "priceExpensive": "Premium",
                "day": "Jour",
                "placeholderMonth": "JAN",
                "placeholderDay": "15",
                "placeholderTime": "19:00",
                "other": "Autre",
                "hours": "Heures",
                "month": "Mois",
                "placeholder": "..."
            },
            "labels": {
                "hero": "Accueil",
                "wifi": "WiFi",
                "access_codes": "Codes",
                "location": "Localisation",
                "contact": "Contact",
                "amenities": "Équipements",
                "places": "Lieux",
                "rules": "Règlement",
                "faq": "FAQ",
                "trash": "Bacs",
                "parking": "Parking",
                "breakfast": "Petit Déj",
                "transport": "Transport",
                "checkin": "Arrivée",
                "checkout": "Départ",
                "documents": "Documents",
                "events": "Événements",
                "upsells": "Extras",
                "embed": "Iframe",
                "ai_assistant": "IA"
            },
            "access_codes": {
                "security": "Sécurité",
                "mode": "Affichage",
                "alwaysVisible": "Toujours visible",
                "unlockByCode": "Par code",
                "unlockCode": "Code",
                "unlockCodeDesc": "Requis.",
                "aptCode": "Porte",
                "buildingCode": "Immeuble",
                "gateCode": "Portail",
                "notes": "Notes"
            },
            "wifi": {
                "networkName": "Nom WiFi",
                "password": "Mot de passe",
                "notes": "Notes"
            },
            "documents": {
                "name": "Nom",
                "url": "Lien",
                "add": "Ajouter"
            },
            "places": {
                "aiButton": "IA",
                "name": "Nom",
                "add": "Ajouter"
            },
            "events": {
                "aiButton": "IA",
                "add": "Ajouter"
            },
            "upsells": {
                "buttonText": "Bouton",
                "buttonLink": "Lien",
                "add": "Ajouter"
            },
            "embed": {
                "url": "Iframe",
                "warning": "Attention"
            },
            "checkin": {
                "timePlaceholder": "15:00",
                "instrPlaceholder": "Procédure..."
            },
            "contact": {
                "nameLabel": "Nom",
                "namePlaceholder": "Concierge"
            },
            "rules": {
                "title": "Règle",
                "placeholder": "...",
                "add": "Ajouter"
            },
            "amenities": {
                "title": "Équipement",
                "placeholder": "...",
                "add": "Ajouter"
            },
            "faq": {
                "question": "Q",
                "qPlaceholder": "...",
                "answer": "R",
                "aPlaceholder": "...",
                "add": "Ajouter"
            },
            "trash": {
                "instrPlaceholder": "Tri...",
                "dayTrash": "Ordures",
                "dayTrashPlaceholder": "Lundi",
                "dayRecycling": "Recyclage",
                "dayRecyclingPlaceholder": "Jeudi",
                "location": "Bacs",
                "locPlaceholder": "Garage",
                "photoLocal": "Photo"
            },
            "parking": {
                "instrPlaceholder": "N°42",
                "locPlaceholder": "Rue...",
                "costPlaceholder": "Gratuit",
                "photo": "Photo"
            },
            "breakfast": {
                "hoursPlaceholder": "07:00 - 10:30",
                "locPlaceholder": "Salle à manger",
                "menu": "Menu",
                "menuPlaceholder": "Café, thé..."
            },
            "transport": {
                "bus": "Bus",
                "train": "Train",
                "taxi": "Taxi",
                "bike": "Vélo",
                "linePlaceholder": "Ligne 4",
                "stop": "Arrêt",
                "stopPlaceholder": "Arrêt...",
                "add": "Ajouter"
            }
        },
        "dashboard": {
            "title": "Mes Guides",
            "subtitle": "Gérez vos biens.",
            "newGuide": "Nouveau Guide",
            "logout": "Déconnexion",
            "viewPublic": "Page publique",
            "passProToShare": "Passer Pro",
            "delete": "Supprimer",
            "emptyTitle": "Aucun guide",
            "emptyDesc": "Créez votre premier guide.",
            "tryAi": "✨ IA",
            "createManual": "Manuel",
            "published": "En ligne",
            "draft": "Brouillon",
            "edit": "Modifier",
            "sortRecent": "Récent",
            "sortName": "Nom",
            "confirmDelete": "Supprimer ?",
            "deleteError": "Erreur",
            "aiModal": {
                "title": "Magie ✨",
                "city": "Ville",
                "cityPlaceholder": "Marrakech",
                "type": "Type",
                "typeAirbnb": "Airbnb",
                "typeHotel": "Hôtel",
                "typeGuesthouse": "Maison",
                "audience": "Public",
                "audienceFamilies": "Familles",
                "audienceCouples": "Parejas",
                "audienceRemote": "Pros",
                "audienceGroups": "Groupes",
                "generate": "Générer",
                "generating": "IA...",
                "generatingDesc": "Calcul..."
            },
            "createModal": {
                "title": "Nouveau Guide",
                "nameLabel": "Nom",
                "namePlaceholder": "Nom...",
                "cancel": "Annuler",
                "create": "Créer"
            },
            "limitModal": {
                "title": "Limite",
                "desc": "Limite atteinte.",
                "upgrade": "Passer Pro",
                "or": "Ou",
                "addon": "Ajouter 1",
                "loading": "..."
            },
            "addonSuccessModal": {
                "title": "Succès",
                "heading": "Prêt !",
                "desc": "Limite augmentée.",
                "cta": "Merci"
            }
        },
        "settings": {
            "title": "Réglages",
            "tabProfile": "Profil",
            "tabPlan": "Plan",
            "tabShop": "Boutique",
            "personalInfo": "Infos",
            "fullName": "Nom",
            "email": "Email",
            "saveProfile": "Sauver",
            "yourPlan": "Votre Plan",
            "currentPlan": "Plan actuel",
            "active": "Actif",
            "unlimitedGuides": "Illimité",
            "oneGuideIncluded": "1 guide",
            "oneGuideDraft": "1 brouillon",
            "themesUnlocked": "Thèmes OK",
            "extraGuides": "Extras",
            "upgradeToPro": "Passer Pro",
            "youArePro": "Vous êtes Pro",
            "info": "Info",
            "noBillingAccount": "Pas de compte",
            "serverError": "Erreur",
            "manageSubscription": "Gérer",
            "shop": "Boutique",
            "securePayment": "Sécurisé",
            "bestSeller": "Top",
            "qrCanvas": "Tableau QR",
            "qrCanvasDesc": "Tableau...",
            "hdPrint": "HD",
            "frameIncluded": "Cadre",
            "trackedShipping": "Suivi",
            "shippingTtc": "Livraison OK",
            "order": "Commander",
            "requiredPro": "Pro Requis",
            "extraGuide": "Extra",
            "extraGuideDesc": "Ajouter guide.",
            "perMonth": "/mois",
            "proReserved": "Pro",
            "onlyProCanAdd": "Pro requis",
            "addGuide": "Ajouter",
            "confirmAddGuide": "Ajouter (20 DH/m) ?",
            "cancel": "Non",
            "confirm": "Oui",
            "guideAdded": "OK",
            "limitIncreased": "OK",
            "error": "Erreur",
            "success": "OK",
            "profileUpdated": "Votre profil a été mis à jour avec succès ! 🎉",
            "updateError": "Une erreur est survenue lors de la mise à jour.",
            "avatarLabel": "Avatar",
            "namePlaceholder": "Votre nom",
            "owned": "POSSÉDÉ",
            "themePack": "Pack Ultimate Themes",
            "themePackDesc": "Débloquez instantanément 20 thèmes premium créés par des designers pour sublimer vos guides.",
            "alreadyIncluded": "Déjà Inclus",
            "confirmPurchase": "Confirmer l'achat",
            "themeConfirmDesc": "Voulez-vous débloquer tous les thèmes pour 15 DH/mois ?",
            "themesUnlockedTitle": "Félicitations ! 🎨",
            "themesUnlockedMsg": "Les thèmes sont débloqués. Profitez-en !",
            "buy": "Acheter"
        },
        "ai": {
            "assistant": "IA",
            "online": "IA OK",
            "placeholder": "Message...",
            "empty": "Question ?",
            "error": "Erreur",
            "thinking": "..."
        },
        "qrCodeWall": {
            "titlePart1": "Partagez",
            "titlePart2": "partout",
            "description": "Scannez.",
            "items": {
                "wifi": {
                    "title": "WiFi",
                    "desc": "Connecté"
                },
                "perpetual": {
                    "title": "Permanent",
                    "desc": "Lien valide"
                },
                "remote": {
                    "title": "Live",
                    "desc": "Direct"
                }
            },
            "visual": {
                "welcome": "Bienvenue",
                "scan": "Scannez",
                "detected": "Trouvé",
                "notification": {
                    "app": "Maplyo",
                    "title": "Ouvrir"
                }
            }
        },
        "upsells": "Extras",
        "legalPage": {
            "titlePrivacy": "Privacité",
            "titleTerms": "Termes",
            "lastUpdated": "MAJ :",
            "effectiveDate": "Date :",
            "privacy": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "items": [
                        "1"
                    ]
                },
                "section2": {
                    "title": "2",
                    "intro": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "content": "3"
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5",
                    "contact": "..."
                }
            },
            "terms": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "content": "1"
                },
                "section2": {
                    "title": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "intro": "3",
                    "items": [
                        "3"
                    ]
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5"
                },
                "section6": {
                    "title": "6",
                    "content": "6"
                }
            }
        },
        "pricingPage": {
            "hero": {
                "badge": "Top",
                "title1": "Pro,",
                "title2": "pas cher.",
                "subtitle": "..."
            },
            "popular": "Top",
            "header": {
                "login": "Dentrée",
                "signup": "S'inscrire"
            },
            "compare": {
                "title": "Comp",
                "subtitle": "...",
                "features": {
                    "unlimited": "Illimité",
                    "maps": "Maps",
                    "translation": "IA",
                    "domain": "Domaine",
                    "support": "Support",
                    "whiteLabel": "Marque",
                    "analytics": "Analytiques"
                },
                "values": {
                    "oneLang": "1 langue",
                    "unlimited": "Illimité",
                    "emailSupport": "Email",
                    "whatsappSupport": "WhatsApp"
                }
            },
            "faqSection": {
                "title": "FAQ",
                "subtitle": "...",
                "items": [
                    {
                        "q": "Q",
                        "a": "A"
                    }
                ]
            },
            "trust": "Garantie"
        },
        "builder": {
            "blocks": "blocs",
            "chooseTheme": "Choisir Thème",
            "reset": "Reset",
            "viewGuide": "Voir Guide",
            "catEssentials": "Essentiels",
            "catTravel": "Voyage",
            "catBusiness": "Business",
            "guideStructure": "Structure",
            "startHere": "Commencez ici",
            "selectBlocks": "Sélectionnez des blocs",
            "mobilePreview": "Aperçu Mobile",
            "blockProperties": "Propriétés",
            "editing": "Modification",
            "selectToEdit": "Sélectionnez un bloc",
            "paramsHere": "Réglages ici",
            "backHome": "Retour",
            "backDashboard": "Dashboard",
            "editorMode": "Mode Édition",
            "themeLabel": "Thème",
            "qrLabel": "QR",
            "createAccount": "Créer Compte",
            "saveCreateAccount": "Sauver",
            "online": "En ligne",
            "confirmUnpublish": "Dépublier ?",
            "unpublish": "Dépublier",
            "publishSuccess": "Publié !",
            "publishError": "Erreur",
            "publish": "Publier",
            "library": "Bibliothèque",
            "mobileMode": "Mode Mobile",
            "emptyGuide": "Vide",
            "selectBlock": "Bloc ?",
            "close": "Fermer",
            "blockTitle": "Titre Bloc",
            "designTheme": "Thèmes Design",
            "upgradePro": "Passer Pro",
            "unlock": "Débloquer",
            "unlockPublish": "Publiez !",
            "publishDesc": "Passez Pro.",
            "seeOffers": "Offres",
            "themes": {
                "minimal-white": {
                    "name": "Minimal",
                    "desc": "Blanc"
                },
                "soft-gray": {
                    "name": "Gris",
                    "desc": "Doux"
                },
                "ocean": {
                    "name": "Océan",
                    "desc": "Bleu"
                },
                "nature": {
                    "name": "Nature",
                    "desc": "Vert"
                },
                "sunset": {
                    "name": "Sunset",
                    "desc": "Orange"
                }
            }
        },
        "showcase": {
            "tag": "Exemples",
            "title": "Showcase",
            "description": "Voir.",
            "messageFrom": "De",
            "viewFull": "Voir",
            "example1": {
                "type": "Loft",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Génial"
            },
            "example2": {
                "type": "Villa",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Top"
            },
            "example3": {
                "type": "Riad",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Super"
            }
        },
        "guideLock": {
            "title": "Accès Sécurisé",
            "desc": "Dévérouillez pour voir les codes.",
            "demoCode": "Code Démo"
        },
        "auth": {
            "login": {
                "title": "Connexion",
                "subtitle": "Bienvenue",
                "email": "Email",
                "password": "Mot de passe",
                "forgot": "Oublié ?",
                "error": "Erreur",
                "submit": "Se connecter",
                "noAccount": "Pas de compte ?",
                "createFree": "Créer",
                "resetLink": "Reset"
            },
            "signup": {
                "title": "Inscription",
                "subtitle": "Gratuit",
                "successTitle": "Succès",
                "successMsg": "Vérifiez vos emails",
                "successDesc": "Lien envoyé",
                "backToLogin": "Retour",
                "firstName": "Prénom",
                "lastName": "Nom",
                "businessEmail": "Email pro",
                "businessName": "Entreprise",
                "phone": "Tel",
                "passwordLabel": "Pass",
                "passwordHint": "6+ cars",
                "submit": "S'inscrire",
                "hasAccount": "Déjà inscrit ?",
                "signIn": "Se connecter"
            }
        }
    },
    "en": {
        "common": {
            "getStarted": "Get Started",
            "login": "Login",
            "signup": "Sign Up",
            "tryFree": "Try for free",
            "popular": "Most Popular",
            "month": "/month",
            "loading": "Loading...",
            "choose": "Choose",
            "viewGuide": "View full guide",
            "more": "See more",
            "checkin": "Check-in",
            "qrCodeWall": "Scan to test",
            "checkout": "Check-out",
            "location": "Location",
            "viewOnMap": "View on map",
            "wifi": "WiFi",
            "other": "Other"
        },
        "renderer": {
            "welcome": "Welcome",
            "wifi": "WiFi",
            "access": "Access Codes",
            "location": "Location",
            "contact": "Contact",
            "amenities": "Amenities",
            "places": "Nearby",
            "rules": "House Rules",
            "tipOfTheDay": "Tip of the day",
            "sunday": "Sunday",
            "monday": "Monday",
            "tuesday": "Tuesday",
            "wednesday": "Wednesday",
            "thursday": "Thursday",
            "friday": "Friday",
            "saturday": "Saturday",
            "lazy": "Lazy",
            "mood": "Motivated",
            "discovery": "Discovery",
            "tasty": "Tasty",
            "adventure": "Adventure",
            "festive": "Festive",
            "outing": "Outing",
            "brunch": "Brunch at",
            "explore": "Explore",
            "museums": "Visit",
            "taste": "Taste",
            "excursion": "An excursion",
            "nightlife": "Nightlife",
            "walk": "A walk",
            "secureAccess": "Secure Access",
            "checkin": "Check-in",
            "checkout": "Check-out",
            "viewMap": "View on map",
            "upsells": "Extras",
            "items": "items",
            "empty": "Nothing to show",
            "searchPlaceholder": "Search...",
            "secureAccessDesc": "Enter the code provided by your host."
        },
        "socialProof": {
            "trustpilot": "4.9/5 by 500+ Hosts",
            "usedBy": "Used by top concierge services",
            "autoTranslate": {
                "title": "Auto-Translated",
                "desc": "Your guides speak your guests' language."
            },
            "googleMaps": {
                "title": "Integrated Google Maps",
                "desc": "Google Maps directly in the guide."
            }
        },
        "hero": {
            "tag": "FOR HOSTS & PROPERTY MANAGERS",
            "title": "Never repeat the WiFi code again.",
            "subtitle": "Digitalize your welcome book. Offer a 5-star experience, reduce messages by 50%, and boost your positive reviews.",
            "cta": "Create my free guide",
            "demo": "See an example",
            "noCreditCard": "No credit card required",
            "setupTime": "Set up in 2 min"
        },
        "features": {
            "title": "Everything you need.",
            "subtitle": "Nothing superfluous.",
            "description": "Powerful tools to automate your welcoming.",
            "badge": "Features",
            "items": {
                "mobileFirst": {
                    "title": "100% Mobile First",
                    "desc": "No app to download."
                },
                "secure": {
                    "title": "Secure Codes",
                    "desc": "WiFi and lockboxes protected."
                },
                "map": {
                    "title": "Interactive Map",
                    "desc": "Integrate your favorite places."
                },
                "live": {
                    "title": "Live Edits",
                    "desc": "Instant updates."
                },
                "translate": {
                    "title": "Auto Translation",
                    "desc": "Detects visitor's language."
                },
                "checklist": {
                    "title": "Checklists",
                    "desc": "Clear check-in/out instructions."
                }
            }
        },
        "pricing": {
            "title": "Transparent Pricing",
            "subtitle": "Start for free. Scale when you want.",
            "bestOffer": "The best offer in the world:",
            "addon": "+20 DH / additional guide",
            "enterprise": {
                "title": "Need an Enterprise solution?",
                "desc": "For managers with 50+ properties, we offer volume discounts and PMS integration.",
                "cta": "Contact Sales Team"
            },
            "plans": {
                "demo": {
                    "name": "Discovery",
                    "price": "Free",
                    "desc": "Test the power of Maplyo without a credit card.",
                    "button": "Create a guide (Free)",
                    "features": [
                        "Full access to Creator",
                        "Mobile Preview",
                        "No publishing"
                    ]
                },
                "basic": {
                    "name": "Essential",
                    "desc": "To launch your first property.",
                    "button": "Start Now",
                    "features": [
                        "Complete Digital Guidebook",
                        "Instant WiFi QR Code",
                        "Interactive Map (Google Maps)",
                        "Free Themes (Premium Pack +15 DH)",
                        "1 Unique Guide"
                    ]
                },
                "pro": {
                    "name": "Growth",
                    "desc": "To maximize your revenue & reviews.",
                    "button": "Upgrade to Growth",
                    "features": [
                        "Unlimited Guides (+20 DH/ea.)",
                        "INCLUDED Premium Themes",
                        "Automatic Translation (AI)",
                        "24/7 Guest Assistant (AI)",
                        "Priority WhatsApp Support"
                    ]
                },
                "business": {
                    "name": "Agency",
                    "desc": "For portfolios of 10+ properties.",
                    "button": "Talk to an Expert",
                    "price": "Custom",
                    "features": [
                        "Unlimited Guides",
                        "Multi-Property Dashboard",
                        "White Label (No Maplyo logo)",
                        "PMS & Channel Mgr Integration",
                        "Centralized Billing"
                    ]
                }
            },
            "trust": "30-Day Money Back Guarantee ÔÇó Secure SSL Payment"
        },
        "testimonials": {
            "title": "Approved by Pros",
            "subtitle": "Join over 500 hosts who automated their welcome.",
            "items": [
                {
                    "name": "Jean-Philippe R.",
                    "role": "Superhost Airbnb (Marrakech)",
                    "text": "My guests kept asking for the Wifi code or how to turn on the AC. With Maplyo, they have everything on their phone. I easily saved 2 hours a week.",
                    "result": "-60% messages"
                },
                {
                    "name": "Sofia B.",
                    "role": "Concierge Manager (Casablanca)",
                    "text": "The game changer for us is the upsell. We offer cleaning or transport services directly in the guide. It boosted our revenue.",
                    "result": "+15% revenue"
                },
                {
                    "name": "Karim M.",
                    "role": "Riad Owner (Fes)",
                    "text": "Very professional. The multilingual aspect is stunning, my American and Spanish clients are delighted to have info in their language without me doing anything.",
                    "result": "5Ôÿà Reviews"
                }
            ]
        },
        "faq": {
            "title": "Frequently Asked Questions",
            "subtitle": "Everything you need to know to get started.",
            "questions": [
                {
                    "q": "Do I need technical skills?",
                    "a": "None at all. It's as easy as filling out a social media profile. You add info, we handle the design."
                },
                {
                    "q": "How do guests access the guide?",
                    "a": "Via a simple QR Code you place in the rental, or a link you send via message before arrival."
                },
                {
                    "q": "Can I update the guide after printing the QR Code?",
                    "a": "Yes! That's the magic. Update your info (wifi, restaurants...) and the QR Code stays exactly the same."
                },
                {
                    "q": "Is there a contract?",
                    "a": "No, cancel anytime."
                }
            ]
        },
        "footer": {
            "product": "Product",
            "support": "Support",
            "legal": "Legal",
            "desc": "Maplyo helps hosts and property managers offer a 5-star experience with smart digital guides.",
            "links": {
                "features": "Features",
                "pricing": "Pricing",
                "testimonials": "Testimonials",
                "roadmap": "Roadmap",
                "help": "Help",
                "contact": "Contact",
                "privacy": "Privacy",
                "terms": "Terms",
                "legal": "Legal Notice"
            },
            "securePayment": "Secure Payment",
            "rights": "All rights reserved."
        },
        "cta": {
            "title": "Ready to impress?",
            "subtitle": "Join the new generation of hosts offering an exceptional experience.",
            "button": "Create my first guide",
            "subtext": "No credit card required ÔÇó Cancel anytime"
        },
        "guide": {
            "accessCode": "Access Codes",
            "locked": "Protected by code.",
            "enterCode": "Access Code",
            "confirm": "Confirm",
            "apartmentDoor": "Apt Door:",
            "buildingDoor": "Building:",
            "gate": "Gate:",
            "notes": "Notes"
        },
        "guideBlocks": {
            "checkIn": {
                "title": "Check-in"
            },
            "location": {
                "notSet": "Not set",
                "address": "Address",
                "openInMaps": "Open",
                "copyAddress": "Copy",
                "viewOnMap": "View on map"
            },
            "contact": {
                "host": "Host",
                "yourHost": "Your Host",
                "phone": "Phone",
                "openConversation": "Open"
            },
            "rules": {
                "noRules": "No rules"
            },
            "amenities": {
                "noAmenities": "No amenities"
            },
            "faq": {
                "noFaq": "No FAQ",
                "question": "Question",
                "answer": "Answer"
            },
            "trash": {
                "title": "Bins",
                "items": "Trash",
                "recycling": "Recycling"
            },
            "breakfast": {
                "title": "Breakfast",
                "menu": "Menu"
            },
            "transport": {
                "noInfo": "No info",
                "call": "Call"
            }
        },
        "editor": {
            "common": {
                "title": "Title",
                "description": "Description",
                "uploadImage": "Image",
                "tags": "Tags",
                "placeholderTags": "Wifi, Pool...",
                "time": "Time",
                "instructions": "Instructions",
                "videoUrl": "Video",
                "location": "Location",
                "address": "Address",
                "placeholderAddress": "Street...",
                "mapUrl": "Maps",
                "placeholderMap": "Maps Link",
                "phone": "Phone",
                "placeholderPhone": "+1...",
                "whatsapp": "WhatsApp",
                "placeholderWhatsapp": "Number",
                "email": "Email",
                "placeholderEmail": "...",
                "price": "Price",
                "placeholderPrice": "150 DH",
                "placeholderReserve": "Book",
                "cost": "Cost",
                "placeholderWelcome": "Welcome...",
                "linkUrl": "Link",
                "priceCheap": "Cheap",
                "priceModerate": "Moderate",
                "priceExpensive": "Premium",
                "day": "Day",
                "placeholderMonth": "JAN",
                "placeholderDay": "15",
                "placeholderTime": "19:00",
                "other": "Other",
                "hours": "Hours",
                "month": "Month",
                "placeholder": "..."
            },
            "labels": {
                "hero": "Home",
                "wifi": "WiFi",
                "access_codes": "Codes",
                "location": "Location",
                "contact": "Contact",
                "amenities": "Amenities",
                "places": "Places",
                "rules": "Rules",
                "faq": "FAQ",
                "trash": "Bins",
                "parking": "Parking",
                "breakfast": "Breakfast",
                "transport": "Transport",
                "checkin": "Check-in",
                "checkout": "Check-out",
                "documents": "Documents",
                "events": "Events",
                "upsells": "Extras",
                "embed": "Iframe",
                "ai_assistant": "AI"
            },
            "access_codes": {
                "security": "Security",
                "mode": "Display",
                "alwaysVisible": "Always visible",
                "unlockByCode": "By code",
                "unlockCode": "Code",
                "unlockCodeDesc": "Required.",
                "aptCode": "Door",
                "buildingCode": "Building",
                "gateCode": "Gate",
                "notes": "Notes"
            },
            "wifi": {
                "networkName": "WiFi Name",
                "password": "Password",
                "notes": "Notes"
            },
            "documents": {
                "name": "Name",
                "url": "Link",
                "add": "Add"
            },
            "places": {
                "aiButton": "AI",
                "name": "Name",
                "add": "Add"
            },
            "events": {
                "aiButton": "AI",
                "add": "Add"
            },
            "upsells": {
                "buttonText": "Button",
                "buttonLink": "Link",
                "add": "Add"
            },
            "embed": {
                "url": "Iframe",
                "warning": "Warning"
            },
            "checkin": {
                "timePlaceholder": "15:00",
                "instrPlaceholder": "Procedure..."
            },
            "contact": {
                "nameLabel": "Name",
                "namePlaceholder": "Concierge"
            },
            "rules": {
                "title": "Rule",
                "placeholder": "...",
                "add": "Add"
            },
            "amenities": {
                "title": "Amenity",
                "placeholder": "...",
                "add": "Add"
            },
            "faq": {
                "question": "Q",
                "qPlaceholder": "...",
                "answer": "A",
                "aPlaceholder": "...",
                "add": "Add"
            },
            "trash": {
                "instrPlaceholder": "Sorting...",
                "dayTrash": "Trash",
                "dayTrashPlaceholder": "Monday",
                "dayRecycling": "Recycling",
                "dayRecyclingPlaceholder": "Thursday",
                "location": "Bins",
                "locPlaceholder": "Garage",
                "photoLocal": "Photo"
            },
            "parking": {
                "instrPlaceholder": "N°42",
                "locPlaceholder": "Street...",
                "costPlaceholder": "Free",
                "photo": "Photo"
            },
            "breakfast": {
                "hoursPlaceholder": "07:00 - 10:30",
                "locPlaceholder": "Dining room",
                "menu": "Menu",
                "menuPlaceholder": "Coffee, tea..."
            },
            "transport": {
                "bus": "Bus",
                "train": "Train",
                "taxi": "Taxi",
                "bike": "Bike",
                "linePlaceholder": "Line 4",
                "stop": "Stop",
                "stopPlaceholder": "Stop...",
                "add": "Add"
            }
        },
        "dashboard": {
            "title": "My Guides",
            "subtitle": "Manage your properties.",
            "newGuide": "New Guide",
            "logout": "Logout",
            "viewPublic": "Public page",
            "passProToShare": "Upgrade Pro",
            "delete": "Delete",
            "emptyTitle": "No guide",
            "emptyDesc": "Create your first guide.",
            "tryAi": "✨ AI",
            "createManual": "Manual",
            "published": "Online",
            "draft": "Draft",
            "edit": "Edit",
            "sortRecent": "Recent",
            "sortName": "Name",
            "confirmDelete": "Delete?",
            "deleteError": "Error",
            "aiModal": {
                "title": "Magic ✨",
                "city": "City",
                "cityPlaceholder": "Marrakech",
                "type": "Type",
                "typeAirbnb": "Airbnb",
                "typeHotel": "Hotel",
                "typeGuesthouse": "House",
                "audience": "Audience",
                "audienceFamilies": "Families",
                "audienceCouples": "Couples",
                "audienceRemote": "Remote Workers",
                "audienceGroups": "Groups",
                "generate": "Generate",
                "generating": "AI...",
                "generatingDesc": "Computing..."
            },
            "createModal": {
                "title": "New Guide",
                "nameLabel": "Name",
                "namePlaceholder": "Name...",
                "cancel": "Cancel",
                "create": "Create"
            },
            "limitModal": {
                "title": "Limit",
                "desc": "Limit reached.",
                "upgrade": "Upgrade Pro",
                "or": "Or",
                "addon": "Add 1",
                "loading": "..."
            },
            "addonSuccessModal": {
                "title": "Success",
                "heading": "Ready!",
                "desc": "Limit increased.",
                "cta": "Thanks"
            }
        },
        "settings": {
            "title": "Settings",
            "tabProfile": "Profile",
            "tabPlan": "Plan",
            "tabShop": "Shop",
            "personalInfo": "Info",
            "fullName": "Name",
            "email": "Email",
            "saveProfile": "Save",
            "yourPlan": "Your Plan",
            "currentPlan": "Current plan",
            "active": "Active",
            "unlimitedGuides": "Unlimited",
            "oneGuideIncluded": "1 guide",
            "oneGuideDraft": "1 draft",
            "themesUnlocked": "Themes OK",
            "extraGuides": "Extras",
            "upgradeToPro": "Upgrade Pro",
            "youArePro": "You are Pro",
            "info": "Info",
            "noBillingAccount": "No account",
            "serverError": "Error",
            "manageSubscription": "Manage",
            "shop": "Shop",
            "securePayment": "Secure",
            "bestSeller": "Top",
            "qrCanvas": "QR Canvas",
            "qrCanvasDesc": "Canvas...",
            "hdPrint": "HD",
            "frameIncluded": "Frame",
            "trackedShipping": "Tracked",
            "shippingTtc": "Shipping OK",
            "order": "Order",
            "requiredPro": "Pro Required",
            "extraGuide": "Extra",
            "extraGuideDesc": "Add guide.",
            "perMonth": "/month",
            "proReserved": "Pro",
            "onlyProCanAdd": "Pro required",
            "addGuide": "Add",
            "confirmAddGuide": "Add (20 DH/m)?",
            "cancel": "No",
            "confirm": "Yes",
            "guideAdded": "OK",
            "limitIncreased": "OK",
            "error": "Error",
            "success": "OK",
            "profileUpdated": "Your profile has been updated successfully! 🎉",
            "updateError": "An error occurred while updating.",
            "avatarLabel": "Avatar",
            "namePlaceholder": "Your name",
            "owned": "OWNED",
            "themePack": "Ultimate Themes Pack",
            "themePackDesc": "Instantly unlock 20 premium themes designed by professionals to elevate your guides.",
            "alreadyIncluded": "Already Included",
            "confirmPurchase": "Confirm Purchase",
            "themeConfirmDesc": "Do you want to unlock all themes for 15 DH/month?",
            "themesUnlockedTitle": "Congratulations! 🎨",
            "themesUnlockedMsg": "Themes are now unlocked. Enjoy!",
            "buy": "Buy"
        },
        "ai": {
            "assistant": "AI",
            "online": "AI OK",
            "placeholder": "Message...",
            "empty": "Question?",
            "error": "Error",
            "thinking": "..."
        },
        "qrCodeWall": {
            "titlePart1": "Share",
            "titlePart2": "everywhere",
            "description": "Scan.",
            "items": {
                "wifi": {
                    "title": "WiFi",
                    "desc": "Connected"
                },
                "perpetual": {
                    "title": "Permanent",
                    "desc": "Valid link"
                },
                "remote": {
                    "title": "Live",
                    "desc": "Direct"
                }
            },
            "visual": {
                "welcome": "Welcome",
                "scan": "Scan",
                "detected": "Found",
                "notification": {
                    "app": "Maplyo",
                    "title": "Open"
                }
            }
        },
        "upsells": "Extras",
        "legalPage": {
            "titlePrivacy": "Privacy",
            "titleTerms": "Terms",
            "lastUpdated": "Updated:",
            "effectiveDate": "Date:",
            "privacy": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "items": [
                        "1"
                    ]
                },
                "section2": {
                    "title": "2",
                    "intro": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "content": "3"
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5",
                    "contact": "..."
                }
            },
            "terms": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "content": "1"
                },
                "section2": {
                    "title": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "intro": "3",
                    "items": [
                        "3"
                    ]
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5"
                },
                "section6": {
                    "title": "6",
                    "content": "6"
                }
            }
        },
        "pricingPage": {
            "hero": {
                "badge": "Top",
                "title1": "Pro,",
                "title2": "affordable.",
                "subtitle": "..."
            },
            "popular": "Top",
            "header": {
                "login": "Login",
                "signup": "Sign Up"
            },
            "compare": {
                "title": "Compare",
                "subtitle": "...",
                "features": {
                    "unlimited": "Unlimited",
                    "maps": "Maps",
                    "translation": "AI",
                    "domain": "Domain",
                    "support": "Support",
                    "whiteLabel": "White Label",
                    "analytics": "Analytics"
                },
                "values": {
                    "oneLang": "1 lang",
                    "unlimited": "Unlimited",
                    "emailSupport": "Email",
                    "whatsappSupport": "WhatsApp"
                }
            },
            "faqSection": {
                "title": "FAQ",
                "subtitle": "...",
                "items": [
                    {
                        "q": "Q",
                        "a": "A"
                    }
                ]
            },
            "trust": "Guarantee"
        },
        "builder": {
            "blocks": "blocks",
            "chooseTheme": "Choose Theme",
            "reset": "Reset",
            "viewGuide": "View Guide",
            "catEssentials": "Essentials",
            "catTravel": "Travel",
            "catBusiness": "Business",
            "guideStructure": "Structure",
            "startHere": "Start here",
            "selectBlocks": "Select blocks",
            "mobilePreview": "Mobile Preview",
            "blockProperties": "Properties",
            "editing": "Editing",
            "selectToEdit": "Select a block",
            "paramsHere": "Settings here",
            "backHome": "Back",
            "backDashboard": "Dashboard",
            "editorMode": "Editor Mode",
            "themeLabel": "Theme",
            "qrLabel": "QR",
            "createAccount": "Create Account",
            "saveCreateAccount": "Save",
            "online": "Online",
            "confirmUnpublish": "Unpublish?",
            "unpublish": "Unpublish",
            "publishSuccess": "Published!",
            "publishError": "Error",
            "publish": "Publish",
            "library": "Library",
            "mobileMode": "Mobile Mode",
            "emptyGuide": "Empty",
            "selectBlock": "Block?",
            "close": "Close",
            "blockTitle": "Block Title",
            "designTheme": "Design Themes",
            "upgradePro": "Upgrade Pro",
            "unlock": "Unlock",
            "unlockPublish": "Publish!",
            "publishDesc": "Upgrade Pro.",
            "seeOffers": "Offers",
            "themes": {
                "minimal-white": {
                    "name": "Minimal",
                    "desc": "White"
                },
                "soft-gray": {
                    "name": "Gray",
                    "desc": "Soft"
                },
                "ocean": {
                    "name": "Ocean",
                    "desc": "Blue"
                },
                "nature": {
                    "name": "Nature",
                    "desc": "Green"
                },
                "sunset": {
                    "name": "Sunset",
                    "desc": "Orange"
                }
            }
        },
        "showcase": {
            "tag": "Examples",
            "title": "Showcase",
            "description": "See.",
            "messageFrom": "From",
            "viewFull": "View",
            "example1": {
                "type": "Loft",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Great"
            },
            "example2": {
                "type": "Villa",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Top"
            },
            "example3": {
                "type": "Riad",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Super"
            }
        },
        "guideLock": {
            "title": "Secure Access",
            "desc": "Unlock to see codes.",
            "demoCode": "Demo Code"
        },
        "auth": {
            "login": {
                "title": "Login",
                "subtitle": "Welcome",
                "email": "Email",
                "password": "Password",
                "forgot": "Forgot?",
                "error": "Error",
                "submit": "Login",
                "noAccount": "No account?",
                "createFree": "Create",
                "resetLink": "Reset"
            },
            "signup": {
                "title": "Sign Up",
                "subtitle": "Free",
                "successTitle": "Success",
                "successMsg": "Check your emails",
                "successDesc": "Link sent",
                "backToLogin": "Back",
                "firstName": "First Name",
                "lastName": "Last Name",
                "businessEmail": "Work Email",
                "businessName": "Company",
                "phone": "Phone",
                "passwordLabel": "Password",
                "passwordHint": "6+ chars",
                "submit": "Sign Up",
                "hasAccount": "Already registered?",
                "signIn": "Login"
            }
        }
    },
    "es": {
        "common": {
            "getStarted": "Empezar",
            "login": "Iniciar sesión",
            "signup": "Sign Up",
            "tryFree": "Try for free",
            "popular": "Most Popular",
            "month": "/month",
            "loading": "Loading...",
            "choose": "Choose",
            "viewGuide": "View full guide",
            "more": "See more",
            "checkin": "Check-in",
            "qrCodeWall": "Scan to test",
            "checkout": "Check-out",
            "location": "Location",
            "viewOnMap": "View on map",
            "wifi": "WiFi",
            "other": "Other"
        },
        "renderer": {
            "welcome": "Welcome",
            "wifi": "WiFi",
            "access": "Access Codes",
            "location": "Location",
            "contact": "Contact",
            "amenities": "Amenities",
            "places": "Nearby",
            "rules": "House Rules",
            "tipOfTheDay": "Tip of the day",
            "sunday": "Sunday",
            "monday": "Monday",
            "tuesday": "Tuesday",
            "wednesday": "Wednesday",
            "thursday": "Thursday",
            "friday": "Friday",
            "saturday": "Saturday",
            "lazy": "Lazy",
            "mood": "Motivated",
            "discovery": "Discovery",
            "tasty": "Tasty",
            "adventure": "Adventure",
            "festive": "Festive",
            "outing": "Outing",
            "brunch": "Brunch at",
            "explore": "Explore",
            "museums": "Visit",
            "taste": "Taste",
            "excursion": "An excursion",
            "nightlife": "Nightlife",
            "walk": "A walk",
            "secureAccess": "Secure Access",
            "checkin": "Check-in",
            "checkout": "Check-out",
            "viewMap": "View on map",
            "upsells": "Extras",
            "items": "items",
            "empty": "Nothing to show",
            "searchPlaceholder": "Search...",
            "secureAccessDesc": "Enter the code provided by your host."
        },
        "socialProof": {
            "trustpilot": "4.9/5 by 500+ Hosts",
            "usedBy": "Used by top concierge services",
            "autoTranslate": {
                "title": "Auto-Translated",
                "desc": "Your guides speak your guests' language."
            },
            "googleMaps": {
                "title": "Integrated Google Maps",
                "desc": "Google Maps directly in the guide."
            }
        },
        "hero": {
            "tag": "PARA ANFITRIONES",
            "title": "Nunca repitas el c├│digo WiFi.",
            "subtitle": "Digitaliza tu gu├¡a de bienvenida. Mayor valoraci├│n, menos mensajes.",
            "cta": "Crear mi gu├¡a",
            "demo": "Ver ejemplo",
            "noCreditCard": "Sin tarjeta",
            "setupTime": "Configura en 2 min"
        },
        "features": {
            "title": "Everything you need.",
            "subtitle": "Nothing superfluous.",
            "description": "Powerful tools to automate your welcoming.",
            "badge": "Features",
            "items": {
                "mobileFirst": {
                    "title": "100% Mobile First",
                    "desc": "No app to download."
                },
                "secure": {
                    "title": "Secure Codes",
                    "desc": "WiFi and lockboxes protected."
                },
                "map": {
                    "title": "Interactive Map",
                    "desc": "Integrate your favorite places."
                },
                "live": {
                    "title": "Live Edits",
                    "desc": "Instant updates."
                },
                "translate": {
                    "title": "Auto Translation",
                    "desc": "Detects visitor's language."
                },
                "checklist": {
                    "title": "Checklists",
                    "desc": "Clear check-in/out instructions."
                }
            }
        },
        "pricing": {
            "title": "Precios Transparentes",
            "subtitle": "Inicia gratis, escala despu├®s.",
            "bestOffer": "Mejor oferta:",
            "addon": "+ Extra",
            "enterprise": {
                "title": "Enterprise?",
                "desc": "Plan a medida.",
                "cta": "Contactar"
            },
            "plans": {
                "demo": {
                    "name": "Descubrir",
                    "price": "Gratis",
                    "desc": "Pru├®balo",
                    "button": "Crear gu├¡a",
                    "features": [
                        "Acceso total",
                        "Vista m├│vil",
                        "Sin publicar"
                    ]
                },
                "basic": {
                    "name": "Esencial",
                    "desc": "Lanza tu primera",
                    "button": "Iniciar",
                    "features": [
                        "Gu├¡a Digital",
                        "QR WiFi",
                        "Mapa",
                        "1 Gu├¡a"
                    ]
                },
                "pro": {
                    "name": "Crecimiento",
                    "desc": "Maximiza ingresos",
                    "button": "Mejorar",
                    "features": [
                        "Gu├¡as ilimitadas",
                        "Traductor autom├ítico",
                        "Soporte prioritario"
                    ]
                },
                "business": {
                    "name": "Agencia",
                    "desc": "Para portfolios",
                    "button": "Hablar",
                    "price": "Por medida",
                    "features": [
                        "Ilimitado",
                        "Dashboard multi",
                        "Marca blanca"
                    ]
                }
            },
            "trust": "Pago seguro"
        },
        "testimonials": {
            "title": "Aprobado por Profesionales",
            "subtitle": "├Ünase a m├ís de 500 anfitriones que han automatizado su bienvenida.",
            "items": [
                {
                    "name": "Jean-Philippe R.",
                    "role": "Superhost Airbnb (Marrakech)",
                    "text": "Mis hu├®spedes no paraban de pedir la clave del Wifi o c├│mo encender el aire acondicionado. Con Maplyo, lo tienen todo en su tel├®fono. Ahorr├® f├ícilmente 2 horas a la semana.",
                    "result": "-60% mensajes"
                },
                {
                    "name": "Sofia B.",
                    "role": "Gerente de Conserjer├¡a (Casablanca)",
                    "text": "El cambio de juego para nosotros es la venta adicional. Ofrecemos servicios de limpieza o transporte directamente en la gu├¡a. Aument├│ nuestros ingresos.",
                    "result": "+15% ingresos"
                },
                {
                    "name": "Karim M.",
                    "role": "Propietario de Riad (Fez)",
                    "text": "Muy profesional. El aspecto multiling├╝e es impresionante, mis clientes americanos y espa├▒oles est├ín encantados de tener la informaci├│n en su idioma sin que yo haga nada.",
                    "result": "5Ôÿà Rese├▒as"
                }
            ]
        },
        "faq": {
            "title": "Preguntas Frecuentes",
            "subtitle": "Todo lo que necesitas saber para empezar.",
            "questions": [
                {
                    "q": "┬┐Necesito habilidades t├®cnicas?",
                    "a": "Ninguna en absoluto. Es tan f├ícil como completar un perfil de red social. T├║ a├▒ades la info, nosotros nos encargamos del dise├▒o."
                },
                {
                    "q": "┬┐C├│mo acceden los hu├®spedes a la gu├¡a?",
                    "a": "A trav├®s de un simple c├│digo QR que colocas en el alojamiento, o un enlace que env├¡as por mensaje antes de su llegada."
                },
                {
                    "q": "┬┐Puedo actualizar la gu├¡a despu├®s de imprimir el c├│digo QR?",
                    "a": "┬íS├¡! Esa es la magia. Actualiza tu informaci├│n (wifi, restaurantes...) y el c├│digo QR sigue siendo el mismo."
                },
                {
                    "q": "┬┐Hay alg├║n compromiso o contrato?",
                    "a": "No, cancela cuando quieras."
                }
            ]
        },
        "footer": {
            "product": "Producto",
            "support": "Soporte",
            "legal": "Legal",
            "desc": "Maplyo para anfitriones.",
            "links": {
                "features": "Caracter├¡sticas",
                "pricing": "Precios",
                "testimonials": "Testimonios",
                "roadmap": "Roadmap",
                "help": "Ayuda",
                "contact": "Contacto",
                "privacy": "Privacidad",
                "terms": "T├®rminos",
                "legal": "Aviso Legal"
            },
            "securePayment": "Pago Seguro",
            "rights": "Derechos reservados."
        },
        "cta": {
            "title": "┬┐Listo para impresionar?",
            "subtitle": "├Ünete a la nueva generaci├│n.",
            "button": "Crear mi gu├¡a",
            "subtext": "Cancelaci├│n flexible"
        },
        "guide": {
            "accessCode": "Access Codes",
            "locked": "Protected by code.",
            "enterCode": "Access Code",
            "confirm": "Confirm",
            "apartmentDoor": "Apt Door:",
            "buildingDoor": "Building:",
            "gate": "Gate:",
            "notes": "Notes"
        },
        "guideBlocks": {
            "checkIn": {
                "title": "Check-in"
            },
            "location": {
                "notSet": "Not set",
                "address": "Address",
                "openInMaps": "Open",
                "copyAddress": "Copy",
                "viewOnMap": "View on map"
            },
            "contact": {
                "host": "Host",
                "yourHost": "Your Host",
                "phone": "Phone",
                "openConversation": "Open"
            },
            "rules": {
                "noRules": "No rules"
            },
            "amenities": {
                "noAmenities": "No amenities"
            },
            "faq": {
                "noFaq": "No FAQ",
                "question": "Question",
                "answer": "Answer"
            },
            "trash": {
                "title": "Bins",
                "items": "Trash",
                "recycling": "Recycling"
            },
            "breakfast": {
                "title": "Breakfast",
                "menu": "Menu"
            },
            "transport": {
                "noInfo": "No info",
                "call": "Call"
            }
        },
        "editor": {
            "common": {
                "title": "Title",
                "description": "Description",
                "uploadImage": "Image",
                "tags": "Tags",
                "placeholderTags": "Wifi, Pool...",
                "time": "Time",
                "instructions": "Instructions",
                "videoUrl": "Video",
                "location": "Location",
                "address": "Address",
                "placeholderAddress": "Street...",
                "mapUrl": "Maps",
                "placeholderMap": "Maps Link",
                "phone": "Phone",
                "placeholderPhone": "+1...",
                "whatsapp": "WhatsApp",
                "placeholderWhatsapp": "Number",
                "email": "Email",
                "placeholderEmail": "...",
                "price": "Price",
                "placeholderPrice": "150 DH",
                "placeholderReserve": "Book",
                "cost": "Cost",
                "placeholderWelcome": "Welcome...",
                "linkUrl": "Link",
                "priceCheap": "Cheap",
                "priceModerate": "Moderate",
                "priceExpensive": "Premium",
                "day": "Day",
                "placeholderMonth": "JAN",
                "placeholderDay": "15",
                "placeholderTime": "19:00",
                "other": "Other",
                "hours": "Hours",
                "month": "Month",
                "placeholder": "..."
            },
            "labels": {
                "hero": "Home",
                "wifi": "WiFi",
                "access_codes": "Codes",
                "location": "Location",
                "contact": "Contact",
                "amenities": "Amenities",
                "places": "Places",
                "rules": "Rules",
                "faq": "FAQ",
                "trash": "Bins",
                "parking": "Parking",
                "breakfast": "Breakfast",
                "transport": "Transport",
                "checkin": "Check-in",
                "checkout": "Check-out",
                "documents": "Documents",
                "events": "Events",
                "upsells": "Extras",
                "embed": "Iframe",
                "ai_assistant": "AI"
            },
            "access_codes": {
                "security": "Security",
                "mode": "Display",
                "alwaysVisible": "Always visible",
                "unlockByCode": "By code",
                "unlockCode": "Code",
                "unlockCodeDesc": "Required.",
                "aptCode": "Door",
                "buildingCode": "Building",
                "gateCode": "Gate",
                "notes": "Notes"
            },
            "wifi": {
                "networkName": "WiFi Name",
                "password": "Password",
                "notes": "Notes"
            },
            "documents": {
                "name": "Name",
                "url": "Link",
                "add": "Add"
            },
            "places": {
                "aiButton": "AI",
                "name": "Name",
                "add": "Add"
            },
            "events": {
                "aiButton": "AI",
                "add": "Add"
            },
            "upsells": {
                "buttonText": "Button",
                "buttonLink": "Link",
                "add": "Add"
            },
            "embed": {
                "url": "Iframe",
                "warning": "Warning"
            },
            "checkin": {
                "timePlaceholder": "15:00",
                "instrPlaceholder": "Procedure..."
            },
            "contact": {
                "nameLabel": "Name",
                "namePlaceholder": "Concierge"
            },
            "rules": {
                "title": "Rule",
                "placeholder": "...",
                "add": "Add"
            },
            "amenities": {
                "title": "Amenity",
                "placeholder": "...",
                "add": "Add"
            },
            "faq": {
                "question": "Q",
                "qPlaceholder": "...",
                "answer": "A",
                "aPlaceholder": "...",
                "add": "Add"
            },
            "trash": {
                "instrPlaceholder": "Sorting...",
                "dayTrash": "Trash",
                "dayTrashPlaceholder": "Monday",
                "dayRecycling": "Recycling",
                "dayRecyclingPlaceholder": "Thursday",
                "location": "Bins",
                "locPlaceholder": "Garage",
                "photoLocal": "Photo"
            },
            "parking": {
                "instrPlaceholder": "N°42",
                "locPlaceholder": "Street...",
                "costPlaceholder": "Free",
                "photo": "Photo"
            },
            "breakfast": {
                "hoursPlaceholder": "07:00 - 10:30",
                "locPlaceholder": "Dining room",
                "menu": "Menu",
                "menuPlaceholder": "Coffee, tea..."
            },
            "transport": {
                "bus": "Bus",
                "train": "Train",
                "taxi": "Taxi",
                "bike": "Bike",
                "linePlaceholder": "Line 4",
                "stop": "Stop",
                "stopPlaceholder": "Stop...",
                "add": "Add"
            }
        },
        "dashboard": {
            "title": "Mis Guías",
            "subtitle": "Manage your properties.",
            "newGuide": "Nueva Guía",
            "logout": "Logout",
            "viewPublic": "Public page",
            "passProToShare": "Upgrade Pro",
            "delete": "Delete",
            "emptyTitle": "No guide",
            "emptyDesc": "Create your first guide.",
            "tryAi": "✨ AI",
            "createManual": "Manual",
            "published": "Online",
            "draft": "Draft",
            "edit": "Edit",
            "sortRecent": "Recent",
            "sortName": "Name",
            "confirmDelete": "Delete?",
            "deleteError": "Error",
            "aiModal": {
                "title": "Magic ✨",
                "city": "City",
                "cityPlaceholder": "Marrakech",
                "type": "Type",
                "typeAirbnb": "Airbnb",
                "typeHotel": "Hotel",
                "typeGuesthouse": "House",
                "audience": "Audience",
                "audienceFamilies": "Families",
                "audienceCouples": "Couples",
                "audienceRemote": "Remote Workers",
                "audienceGroups": "Groups",
                "generate": "Generate",
                "generating": "AI...",
                "generatingDesc": "Computing..."
            },
            "createModal": {
                "title": "New Guide",
                "nameLabel": "Name",
                "namePlaceholder": "Name...",
                "cancel": "Cancel",
                "create": "Create"
            },
            "limitModal": {
                "title": "Limit",
                "desc": "Limit reached.",
                "upgrade": "Upgrade Pro",
                "or": "Or",
                "addon": "Add 1",
                "loading": "..."
            },
            "addonSuccessModal": {
                "title": "Success",
                "heading": "Ready!",
                "desc": "Limit increased.",
                "cta": "Thanks"
            }
        },
        "settings": {
            "title": "Settings",
            "tabProfile": "Profile",
            "tabPlan": "Plan",
            "tabShop": "Shop",
            "personalInfo": "Info",
            "fullName": "Name",
            "email": "Email",
            "saveProfile": "Save",
            "yourPlan": "Your Plan",
            "currentPlan": "Current plan",
            "active": "Active",
            "unlimitedGuides": "Unlimited",
            "oneGuideIncluded": "1 guide",
            "oneGuideDraft": "1 draft",
            "themesUnlocked": "Themes OK",
            "extraGuides": "Extras",
            "upgradeToPro": "Upgrade Pro",
            "youArePro": "You are Pro",
            "info": "Info",
            "noBillingAccount": "No account",
            "serverError": "Error",
            "manageSubscription": "Manage",
            "shop": "Shop",
            "securePayment": "Secure",
            "bestSeller": "Top",
            "qrCanvas": "QR Canvas",
            "qrCanvasDesc": "Canvas...",
            "hdPrint": "HD",
            "frameIncluded": "Frame",
            "trackedShipping": "Tracked",
            "shippingTtc": "Shipping OK",
            "order": "Order",
            "requiredPro": "Pro Required",
            "extraGuide": "Extra",
            "extraGuideDesc": "Add guide.",
            "perMonth": "/month",
            "proReserved": "Pro",
            "onlyProCanAdd": "Pro required",
            "addGuide": "Add",
            "confirmAddGuide": "Add (20 DH/m)?",
            "cancel": "No",
            "confirm": "Yes",
            "guideAdded": "OK",
            "limitIncreased": "OK",
            "error": "Error",
            "success": "OK",
            "profileUpdated": "¡Tu perfil ha sido actualizado con éxito! 🎉",
            "updateError": "Se produjo un error al actualizar.",
            "avatarLabel": "Avatar",
            "namePlaceholder": "Tu nombre",
            "owned": "ADQUIRIDO",
            "themePack": "Pack Ultimate Themes",
            "themePackDesc": "Desbloquea al instante 20 temas premium diseñados por profesionales para mejorar tus guías.",
            "alreadyIncluded": "Ya Incluido",
            "confirmPurchase": "Confirmar compra",
            "themeConfirmDesc": "¿Quieres desbloquear todos los temas por 15 DH/mes?",
            "themesUnlockedTitle": "¡Felicidades! 🎨",
            "themesUnlockedMsg": "Los temas están desbloqueados. ¡Disfrútalos!",
            "buy": "Comprar"
        },
        "ai": {
            "assistant": "AI",
            "online": "AI OK",
            "placeholder": "Message...",
            "empty": "Question?",
            "error": "Error",
            "thinking": "..."
        },
        "qrCodeWall": {
            "titlePart1": "Share",
            "titlePart2": "everywhere",
            "description": "Scan.",
            "items": {
                "wifi": {
                    "title": "WiFi",
                    "desc": "Connected"
                },
                "perpetual": {
                    "title": "Permanent",
                    "desc": "Valid link"
                },
                "remote": {
                    "title": "Live",
                    "desc": "Direct"
                }
            },
            "visual": {
                "welcome": "Welcome",
                "scan": "Scan",
                "detected": "Found",
                "notification": {
                    "app": "Maplyo",
                    "title": "Open"
                }
            }
        },
        "upsells": "Extras",
        "legalPage": {
            "titlePrivacy": "Privacy",
            "titleTerms": "Terms",
            "lastUpdated": "Updated:",
            "effectiveDate": "Date:",
            "privacy": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "items": [
                        "1"
                    ]
                },
                "section2": {
                    "title": "2",
                    "intro": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "content": "3"
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5",
                    "contact": "..."
                }
            },
            "terms": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "content": "1"
                },
                "section2": {
                    "title": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "intro": "3",
                    "items": [
                        "3"
                    ]
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5"
                },
                "section6": {
                    "title": "6",
                    "content": "6"
                }
            }
        },
        "pricingPage": {
            "hero": {
                "badge": "Top",
                "title1": "Pro,",
                "title2": "affordable.",
                "subtitle": "..."
            },
            "popular": "Top",
            "header": {
                "login": "Login",
                "signup": "Sign Up"
            },
            "compare": {
                "title": "Compare",
                "subtitle": "...",
                "features": {
                    "unlimited": "Unlimited",
                    "maps": "Maps",
                    "translation": "AI",
                    "domain": "Domain",
                    "support": "Support",
                    "whiteLabel": "White Label",
                    "analytics": "Analytics"
                },
                "values": {
                    "oneLang": "1 lang",
                    "unlimited": "Unlimited",
                    "emailSupport": "Email",
                    "whatsappSupport": "WhatsApp"
                }
            },
            "faqSection": {
                "title": "FAQ",
                "subtitle": "...",
                "items": [
                    {
                        "q": "Q",
                        "a": "A"
                    }
                ]
            },
            "trust": "Guarantee"
        },
        "builder": {
            "blocks": "blocks",
            "chooseTheme": "Elegir Tema",
            "reset": "Reset",
            "viewGuide": "View Guide",
            "catEssentials": "Essentials",
            "catTravel": "Travel",
            "catBusiness": "Business",
            "guideStructure": "Estructura de la guía",
            "startHere": "Start here",
            "selectBlocks": "Select blocks",
            "mobilePreview": "Mobile Preview",
            "blockProperties": "Properties",
            "editing": "Editing",
            "selectToEdit": "Select a block",
            "paramsHere": "Settings here",
            "backHome": "Back",
            "backDashboard": "Dashboard",
            "editorMode": "Editor Mode",
            "themeLabel": "Theme",
            "qrLabel": "QR",
            "createAccount": "Create Account",
            "saveCreateAccount": "Save",
            "online": "Online",
            "confirmUnpublish": "Unpublish?",
            "unpublish": "Unpublish",
            "publishSuccess": "Published!",
            "publishError": "Error",
            "publish": "Publish",
            "library": "Library",
            "mobileMode": "Mobile Mode",
            "emptyGuide": "Empty",
            "selectBlock": "Block?",
            "close": "Close",
            "blockTitle": "Block Title",
            "designTheme": "Design Themes",
            "upgradePro": "Upgrade Pro",
            "unlock": "Unlock",
            "unlockPublish": "Publish!",
            "publishDesc": "Upgrade Pro.",
            "seeOffers": "Offers",
            "themes": {
                "minimal-white": {
                    "name": "Minimal",
                    "desc": "White"
                },
                "soft-gray": {
                    "name": "Gray",
                    "desc": "Soft"
                },
                "ocean": {
                    "name": "Ocean",
                    "desc": "Blue"
                },
                "nature": {
                    "name": "Nature",
                    "desc": "Green"
                },
                "sunset": {
                    "name": "Sunset",
                    "desc": "Orange"
                }
            }
        },
        "showcase": {
            "tag": "Examples",
            "title": "Showcase",
            "description": "See.",
            "messageFrom": "From",
            "viewFull": "View",
            "example1": {
                "type": "Loft",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Great"
            },
            "example2": {
                "type": "Villa",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Top"
            },
            "example3": {
                "type": "Riad",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Super"
            }
        },
        "guideLock": {
            "title": "Secure Access",
            "desc": "Unlock to see codes.",
            "demoCode": "Demo Code"
        },
        "auth": {
            "login": {
                "title": "Login",
                "subtitle": "Welcome",
                "email": "Email",
                "password": "Password",
                "forgot": "Forgot?",
                "error": "Error",
                "submit": "Login",
                "noAccount": "No account?",
                "createFree": "Create",
                "resetLink": "Reset"
            },
            "signup": {
                "title": "Sign Up",
                "subtitle": "Free",
                "successTitle": "Success",
                "successMsg": "Check your emails",
                "successDesc": "Link sent",
                "backToLogin": "Back",
                "firstName": "First Name",
                "lastName": "Last Name",
                "businessEmail": "Work Email",
                "businessName": "Company",
                "phone": "Phone",
                "passwordLabel": "Password",
                "passwordHint": "6+ chars",
                "submit": "Sign Up",
                "hasAccount": "Already registered?",
                "signIn": "Login"
            }
        }
    },
    "ar": {
        "common": {
            "getStarted": "البدء",
            "login": "تسجيل الدخول",
            "signup": "Sign Up",
            "tryFree": "Try for free",
            "popular": "Most Popular",
            "month": "/month",
            "loading": "Loading...",
            "choose": "Choose",
            "viewGuide": "View full guide",
            "more": "See more",
            "checkin": "Check-in",
            "qrCodeWall": "Scan to test",
            "checkout": "Check-out",
            "location": "Location",
            "viewOnMap": "View on map",
            "wifi": "WiFi",
            "other": "Other"
        },
        "renderer": {
            "welcome": "Welcome",
            "wifi": "WiFi",
            "access": "Access Codes",
            "location": "Location",
            "contact": "Contact",
            "amenities": "Amenities",
            "places": "Nearby",
            "rules": "House Rules",
            "tipOfTheDay": "Tip of the day",
            "sunday": "Sunday",
            "monday": "Monday",
            "tuesday": "Tuesday",
            "wednesday": "Wednesday",
            "thursday": "Thursday",
            "friday": "Friday",
            "saturday": "Saturday",
            "lazy": "Lazy",
            "mood": "Motivated",
            "discovery": "Discovery",
            "tasty": "Tasty",
            "adventure": "Adventure",
            "festive": "Festive",
            "outing": "Outing",
            "brunch": "Brunch at",
            "explore": "Explore",
            "museums": "Visit",
            "taste": "Taste",
            "excursion": "An excursion",
            "nightlife": "Nightlife",
            "walk": "A walk",
            "secureAccess": "Secure Access",
            "checkin": "Check-in",
            "checkout": "Check-out",
            "viewMap": "View on map",
            "upsells": "Extras",
            "items": "items",
            "empty": "Nothing to show",
            "searchPlaceholder": "Search...",
            "secureAccessDesc": "Enter the code provided by your host."
        },
        "socialProof": {
            "trustpilot": "4.9/5 by 500+ Hosts",
            "usedBy": "Used by top concierge services",
            "autoTranslate": {
                "title": "Auto-Translated",
                "desc": "Your guides speak your guests' language."
            },
            "googleMaps": {
                "title": "Integrated Google Maps",
                "desc": "Google Maps directly in the guide."
            }
        },
        "hero": {
            "tag": "┘ä┘ä┘àÏÂ┘è┘ü┘è┘å",
            "title": "┘äÏº Ï¬┘âÏ▒Ï▒ Ïº┘äÏ▒┘àÏ▓ ÏúÏ¿Ï»Ïº┘ï.",
            "subtitle": "Ï¡┘ê┘ä Ï»┘ä┘è┘ä┘â ┘ä┘äÏ▒┘é┘à┘èÏ®. Ï¬Ï¼Ï▒Ï¿Ï® Ï«┘àÏ│ ┘åÏ¼┘ê┘à.",
            "cta": "ÏÑ┘åÏ┤ÏºÏí Ï»┘ä┘è┘ä┘è ┘àÏ¼Ïº┘åÏº┘ï",
            "demo": "┘àÏ┤Ïº┘çÏ»Ï® ┘àÏ½Ïº┘ä",
            "noCreditCard": "Ï¿Ï»┘ê┘å Ï¿ÏÀÏº┘éÏ®",
            "setupTime": "┘à┘ÅÏ╣Ï»┘æ ┘ü┘è Ï»┘é┘è┘éÏ¬┘è┘å"
        },
        "features": {
            "title": "Everything you need.",
            "subtitle": "Nothing superfluous.",
            "description": "Powerful tools to automate your welcoming.",
            "badge": "Features",
            "items": {
                "mobileFirst": {
                    "title": "100% Mobile First",
                    "desc": "No app to download."
                },
                "secure": {
                    "title": "Secure Codes",
                    "desc": "WiFi and lockboxes protected."
                },
                "map": {
                    "title": "Interactive Map",
                    "desc": "Integrate your favorite places."
                },
                "live": {
                    "title": "Live Edits",
                    "desc": "Instant updates."
                },
                "translate": {
                    "title": "Auto Translation",
                    "desc": "Detects visitor's language."
                },
                "checklist": {
                    "title": "Checklists",
                    "desc": "Clear check-in/out instructions."
                }
            }
        },
        "pricing": {
            "title": "Ï¬Ï│Ï╣┘èÏ▒ ┘êÏºÏÂÏ¡",
            "subtitle": "ÏºÏ¿Ï»Ïú ┘àÏ¼Ïº┘åÏº┘ïÏî ┘ê┘é┘à Ï¿Ïº┘äÏ¬Ï▒┘é┘èÏ® Ï╣┘åÏ» Ïº┘äÏ¡ÏºÏ¼Ï®.",
            "bestOffer": "Ïú┘üÏÂ┘ä Ï╣Ï▒ÏÂ:",
            "addon": "+ ÏÑÏÂÏº┘ü┘è",
            "enterprise": {
                "title": "┘ä┘äÏ┤Ï▒┘âÏºÏ¬Ïƒ",
                "desc": "Ï¡┘ä ┘àÏ«ÏÁÏÁ.",
                "cta": "ÏºÏ¬ÏÁ┘ä Ï¿┘åÏº"
            },
            "plans": {
                "demo": {
                    "name": "Ïº┘âÏ¬Ï┤Ïº┘ü",
                    "price": "┘àÏ¼Ïº┘å┘è",
                    "desc": "Ï¬Ï¼Ï▒Ï¿Ï® Ïº┘äÏ«Ï»┘àÏ®",
                    "button": "ÏÑ┘åÏ┤ÏºÏí Ï»┘ä┘è┘ä",
                    "features": [
                        "┘êÏÁ┘ê┘ä ┘âÏº┘à┘ä",
                        "┘àÏ╣Ïº┘è┘åÏ® Ïº┘äÏ¼┘êÏº┘ä",
                        "Ï╣Ï»┘à Ïº┘ä┘åÏ┤Ï▒"
                    ]
                },
                "basic": {
                    "name": "ÏúÏ│ÏºÏ│┘è",
                    "desc": "┘äÏÑÏÀ┘äÏº┘é Ï╣┘éÏºÏ▒┘â Ïº┘äÏú┘ê┘ä.",
                    "button": "ÏºÏ¿Ï»Ïú",
                    "features": [
                        "Ï»┘ä┘è┘ä Ï▒┘é┘à┘è",
                        "┘êÏº┘è ┘üÏº┘è ┘ü┘êÏ▒┘è",
                        "Ï«Ï▒┘èÏÀÏ®",
                        "Ï»┘ä┘è┘ä ┘êÏºÏ¡Ï»"
                    ]
                },
                "pro": {
                    "name": "┘å┘à┘ê",
                    "desc": "Ï¬Ï¡Ï│┘è┘å Ïº┘äÏ»Ï«┘ä.",
                    "button": "Ï¬Ï¡Ï»┘èÏ½",
                    "features": [
                        "ÏúÏ»┘äÏ® ┘äÏº ┘àÏ¡Ï»┘êÏ»Ï®",
                        "Ï¬Ï▒Ï¼┘àÏ® Ï¬┘ä┘éÏºÏª┘èÏ®",
                        "Ï»Ï╣┘à ┘êÏºÏ¬Ï│ÏºÏ¿"
                    ]
                },
                "business": {
                    "name": "┘ê┘âÏº┘äÏ®",
                    "desc": "┘ä┘ä┘àÏ¼┘à┘êÏ╣ÏºÏ¬",
                    "button": "Ï¬┘êÏºÏÁ┘ä",
                    "price": "┘àÏ«ÏÁÏÁ",
                    "features": [
                        "┘äÏº ┘àÏ¡Ï»┘êÏ»",
                        "┘ä┘êÏ¡Ï® Ï¬Ï¡┘â┘à",
                        "Ï╣┘äÏº┘àÏ® Ï¿┘èÏÂÏºÏí"
                    ]
                }
            },
            "trust": "Ï»┘üÏ╣ Ïó┘à┘å SSL"
        },
        "testimonials": {
            "title": "┘àÏ╣Ï¬┘àÏ» ┘à┘å Ïº┘ä┘àÏ¡Ï¬Ï▒┘ü┘è┘å",
            "subtitle": "Ïº┘åÏÂ┘à ÏÑ┘ä┘ë Ïú┘âÏ½Ï▒ ┘à┘å 500 ┘àÏÂ┘è┘ü ┘éÏº┘à┘êÏº Ï¿ÏúÏ¬┘àÏ¬Ï® ÏºÏ│Ï¬┘éÏ¿Ïº┘ä┘ç┘à.",
            "items": [
                {
                    "name": "Ï¼┘ê┘å ┘ü┘è┘ä┘èÏ¿ Ï▒.",
                    "role": "┘àÏÂ┘è┘ü ┘à┘à┘èÏ▓ ┘ü┘è Airbnb (┘àÏ▒Ïº┘âÏ┤)",
                    "text": "┘âÏº┘å ÏÂ┘è┘ê┘ü┘è ┘èÏ│Ïú┘ä┘ê┘å Ï¿ÏºÏ│Ï¬┘àÏ▒ÏºÏ▒ Ï╣┘å Ï▒┘àÏ▓ Ïº┘ä┘êÏº┘è ┘üÏº┘è Ïú┘ê ┘â┘è┘ü┘èÏ® Ï¬Ï┤Ï║┘è┘ä ┘à┘â┘è┘ü Ïº┘ä┘ç┘êÏºÏí. ┘àÏ╣ MaplyoÏî ┘â┘ä Ï┤┘èÏí ┘à┘êÏ¼┘êÏ» Ï╣┘ä┘ë ┘ç┘êÏºÏ¬┘ü┘ç┘à. ┘ä┘éÏ» ┘ê┘üÏ▒Ï¬ Ï│ÏºÏ╣Ï¬┘è┘å ┘ü┘è Ïº┘äÏúÏ│Ï¿┘êÏ╣ Ï¿Ï│┘ç┘ê┘äÏ®.",
                    "result": "-60% ┘à┘å Ïº┘äÏ▒Ï│ÏºÏª┘ä"
                },
                {
                    "name": "ÏÁ┘ê┘ü┘èÏº Ï¿.",
                    "role": "┘àÏ»┘èÏ▒Ï® Ï┤Ï▒┘âÏ® ┘â┘ê┘åÏ│┘èÏ▒Ï¼ (Ïº┘äÏ»ÏºÏ▒ Ïº┘äÏ¿┘èÏÂÏºÏí)",
                    "text": "┘å┘éÏÀÏ® Ïº┘äÏ¬Ï¡┘ê┘ä Ï¿Ïº┘ä┘åÏ│Ï¿Ï® ┘ä┘åÏº ┘ç┘è Ïº┘äÏ«Ï»┘àÏºÏ¬ Ïº┘äÏÑÏÂÏº┘ü┘èÏ®. ┘åÏ¡┘å ┘å┘éÏ»┘à Ï«Ï»┘àÏºÏ¬ Ï¬┘åÏ©┘è┘ü Ïú┘ê ┘å┘é┘ä ┘àÏ¿ÏºÏ┤Ï▒Ï® ┘ü┘è Ïº┘äÏ»┘ä┘è┘ä. ┘ä┘éÏ» Ï╣Ï▓Ï▓ Ï░┘ä┘â ┘à┘å ÏÑ┘èÏ▒ÏºÏ»ÏºÏ¬┘åÏº.",
                    "result": "+15% ÏÑ┘èÏ▒ÏºÏ»ÏºÏ¬"
                },
                {
                    "name": "┘âÏ▒┘è┘à ┘à.",
                    "role": "┘àÏº┘ä┘â Ï▒┘èÏºÏÂ (┘üÏºÏ│)",
                    "text": "┘àÏ¡Ï¬Ï▒┘ü Ï¼Ï»Ïº┘ï. Ïº┘äÏ¼Ïº┘åÏ¿ ┘àÏ¬Ï╣Ï»Ï» Ïº┘ä┘äÏ║ÏºÏ¬ ┘àÏ¿┘çÏ▒Ïî Ï╣┘à┘äÏºÏª┘è Ïº┘äÏú┘àÏ▒┘è┘â┘è┘ê┘å ┘êÏº┘ä┘à┘éÏ▒Ï¿┘ê┘å Ï│Ï╣Ï»ÏºÏí Ï¼Ï»Ïº┘ï Ï¿Ïº┘äÏ¡ÏÁ┘ê┘ä Ï╣┘ä┘ë Ïº┘ä┘àÏ╣┘ä┘ê┘àÏºÏ¬ Ï¿┘äÏ║Ï¬┘ç┘à Ï»┘ê┘å Ïú┘å Ïú┘üÏ╣┘ä Ïú┘è Ï┤┘èÏí.",
                    "result": "5Ôÿà Ï¬┘é┘è┘è┘àÏºÏ¬"
                }
            ]
        },
        "faq": {
            "title": "Ïº┘äÏúÏ│Ïª┘äÏ® Ïº┘äÏ┤ÏºÏªÏ╣Ï®",
            "subtitle": "┘â┘ä ┘àÏº Ï¬Ï¡Ï¬ÏºÏ¼ ┘ä┘àÏ╣Ï▒┘üÏ¬┘ç ┘ä┘äÏ¿Ï»Ïí.",
            "questions": [
                {
                    "q": "┘ç┘ä ÏúÏ¡Ï¬ÏºÏ¼ ÏÑ┘ä┘ë ┘à┘çÏºÏ▒ÏºÏ¬ Ï¬┘é┘å┘èÏ®Ïƒ",
                    "a": "┘äÏº Ï╣┘ä┘ë Ïº┘äÏÑÏÀ┘äÏº┘é. Ïº┘äÏú┘àÏ▒ Ï│┘ç┘ä ┘àÏ½┘ä ┘à┘äÏí ┘à┘ä┘ü Ï┤Ï«ÏÁ┘è Ï╣┘ä┘ë ┘êÏ│ÏºÏª┘ä Ïº┘äÏ¬┘êÏºÏÁ┘ä Ïº┘äÏºÏ¼Ï¬┘àÏºÏ╣┘è. Ïú┘åÏ¬ Ï¬ÏÂ┘è┘ü Ïº┘ä┘àÏ╣┘ä┘ê┘àÏºÏ¬Ïî ┘ê┘åÏ¡┘å ┘åÏ¬Ï╣Ïº┘à┘ä ┘àÏ╣ Ïº┘äÏ¬ÏÁ┘à┘è┘à."
                },
                {
                    "q": "┘â┘è┘ü ┘èÏÁ┘ä Ïº┘äÏÂ┘è┘ê┘ü ÏÑ┘ä┘ë Ïº┘äÏ»┘ä┘è┘äÏƒ",
                    "a": "Ï╣Ï¿Ï▒ Ï▒┘àÏ▓ QR Ï¿Ï│┘èÏÀ Ï¬ÏÂÏ╣┘ç ┘ü┘è ┘à┘âÏº┘å Ïº┘äÏÑ┘éÏº┘àÏ®Ïî Ïú┘ê Ï▒ÏºÏ¿ÏÀ Ï¬Ï▒Ï│┘ä┘ç ┘ü┘è Ï▒Ï│Ïº┘äÏ® ┘éÏ¿┘ä ┘êÏÁ┘ê┘ä┘ç┘à."
                },
                {
                    "q": "┘ç┘ä ┘è┘à┘â┘å┘å┘è Ï¬Ï¡Ï»┘èÏ½ Ïº┘äÏ»┘ä┘è┘ä Ï¿Ï╣Ï» ÏÀÏ¿ÏºÏ╣Ï® Ï▒┘àÏ▓ Ïº┘ä┘Ç QRÏƒ",
                    "a": "┘åÏ╣┘à! ┘çÏ░Ïº ┘ç┘ê Ïº┘äÏ│Ï¡Ï▒. ┘é┘à Ï¿Ï¬Ï¡Ï»┘èÏ½ ┘àÏ╣┘ä┘ê┘àÏºÏ¬┘â (Ïº┘ä┘êÏº┘è ┘üÏº┘èÏî Ïº┘ä┘àÏÀÏºÏ╣┘à...) ┘êÏ│┘èÏ¿┘é┘ë Ï▒┘àÏ▓ Ïº┘ä┘Ç QR ┘â┘àÏº ┘ç┘ê Ï¬┘àÏº┘àÏº┘ï."
                },
                {
                    "q": "┘ç┘ä ┘ç┘åÏº┘â Ïú┘è Ïº┘äÏ¬Ï▓Ïº┘à Ïú┘ê Ï╣┘éÏ»Ïƒ",
                    "a": "┘äÏºÏî ┘è┘à┘â┘å┘â Ïº┘äÏÑ┘äÏ║ÏºÏí ┘ü┘è Ïú┘è ┘ê┘éÏ¬."
                }
            ]
        },
        "footer": {
            "product": "Ïº┘ä┘à┘åÏ¬Ï¼",
            "support": "Ïº┘äÏ»Ï╣┘à",
            "legal": "┘éÏº┘å┘ê┘å┘è",
            "desc": "┘àÏºÏ¿┘ä┘è┘ê ┘ä┘ä┘àÏÂ┘è┘ü┘è┘å.",
            "links": {
                "features": "Ïº┘ä┘à┘èÏ▓ÏºÏ¬",
                "pricing": "Ïº┘äÏ¬Ï│Ï╣┘èÏ▒",
                "testimonials": "Ï┤┘çÏºÏ»ÏºÏ¬",
                "roadmap": "Ï«ÏºÏ▒ÏÀÏ® ÏÀÏ▒┘è┘é",
                "help": "┘àÏ│ÏºÏ╣Ï»Ï®",
                "contact": "ÏºÏ¬ÏÁÏº┘ä",
                "privacy": "Ïº┘äÏ«ÏÁ┘êÏÁ┘èÏ®",
                "terms": "Ïº┘äÏ┤Ï▒┘êÏÀ",
                "legal": "ÏÑÏ┤Ï╣ÏºÏ▒"
            },
            "securePayment": "Ï»┘üÏ╣ Ïó┘à┘å",
            "rights": "Ï¼┘à┘èÏ╣ Ïº┘äÏ¡┘é┘ê┘é ┘àÏ¡┘ü┘êÏ©Ï®."
        },
        "cta": {
            "title": "Ï¼Ïº┘çÏ▓ ┘ä┘äÏ¬┘à┘èÏ▓Ïƒ",
            "subtitle": "Ïº┘åÏÂ┘à ┘ä┘äÏ¼┘è┘ä Ïº┘ä┘éÏºÏ»┘à.",
            "button": "ÏÑ┘åÏ┤ÏºÏí Ï»┘ä┘è┘ä┘è",
            "subtext": "ÏÑ┘äÏ║ÏºÏí ┘ü┘è Ïú┘è ┘ê┘éÏ¬"
        },
        "guide": {
            "accessCode": "Access Codes",
            "locked": "Protected by code.",
            "enterCode": "Access Code",
            "confirm": "Confirm",
            "apartmentDoor": "Apt Door:",
            "buildingDoor": "Building:",
            "gate": "Gate:",
            "notes": "Notes"
        },
        "guideBlocks": {
            "checkIn": {
                "title": "Check-in"
            },
            "location": {
                "notSet": "Not set",
                "address": "Address",
                "openInMaps": "Open",
                "copyAddress": "Copy",
                "viewOnMap": "View on map"
            },
            "contact": {
                "host": "Host",
                "yourHost": "Your Host",
                "phone": "Phone",
                "openConversation": "Open"
            },
            "rules": {
                "noRules": "No rules"
            },
            "amenities": {
                "noAmenities": "No amenities"
            },
            "faq": {
                "noFaq": "No FAQ",
                "question": "Question",
                "answer": "Answer"
            },
            "trash": {
                "title": "Bins",
                "items": "Trash",
                "recycling": "Recycling"
            },
            "breakfast": {
                "title": "Breakfast",
                "menu": "Menu"
            },
            "transport": {
                "noInfo": "No info",
                "call": "Call"
            }
        },
        "editor": {
            "common": {
                "title": "Title",
                "description": "Description",
                "uploadImage": "Image",
                "tags": "Tags",
                "placeholderTags": "Wifi, Pool...",
                "time": "Time",
                "instructions": "Instructions",
                "videoUrl": "Video",
                "location": "Location",
                "address": "Address",
                "placeholderAddress": "Street...",
                "mapUrl": "Maps",
                "placeholderMap": "Maps Link",
                "phone": "Phone",
                "placeholderPhone": "+1...",
                "whatsapp": "WhatsApp",
                "placeholderWhatsapp": "Number",
                "email": "Email",
                "placeholderEmail": "...",
                "price": "Price",
                "placeholderPrice": "150 DH",
                "placeholderReserve": "Book",
                "cost": "Cost",
                "placeholderWelcome": "Welcome...",
                "linkUrl": "Link",
                "priceCheap": "Cheap",
                "priceModerate": "Moderate",
                "priceExpensive": "Premium",
                "day": "Day",
                "placeholderMonth": "JAN",
                "placeholderDay": "15",
                "placeholderTime": "19:00",
                "other": "Other",
                "hours": "Hours",
                "month": "Month",
                "placeholder": "..."
            },
            "labels": {
                "hero": "Home",
                "wifi": "WiFi",
                "access_codes": "Codes",
                "location": "Location",
                "contact": "Contact",
                "amenities": "Amenities",
                "places": "Places",
                "rules": "Rules",
                "faq": "FAQ",
                "trash": "Bins",
                "parking": "Parking",
                "breakfast": "Breakfast",
                "transport": "Transport",
                "checkin": "Check-in",
                "checkout": "Check-out",
                "documents": "Documents",
                "events": "Events",
                "upsells": "Extras",
                "embed": "Iframe",
                "ai_assistant": "AI"
            },
            "access_codes": {
                "security": "Security",
                "mode": "Display",
                "alwaysVisible": "Always visible",
                "unlockByCode": "By code",
                "unlockCode": "Code",
                "unlockCodeDesc": "Required.",
                "aptCode": "Door",
                "buildingCode": "Building",
                "gateCode": "Gate",
                "notes": "Notes"
            },
            "wifi": {
                "networkName": "WiFi Name",
                "password": "Password",
                "notes": "Notes"
            },
            "documents": {
                "name": "Name",
                "url": "Link",
                "add": "Add"
            },
            "places": {
                "aiButton": "AI",
                "name": "Name",
                "add": "Add"
            },
            "events": {
                "aiButton": "AI",
                "add": "Add"
            },
            "upsells": {
                "buttonText": "Button",
                "buttonLink": "Link",
                "add": "Add"
            },
            "embed": {
                "url": "Iframe",
                "warning": "Warning"
            },
            "checkin": {
                "timePlaceholder": "15:00",
                "instrPlaceholder": "Procedure..."
            },
            "contact": {
                "nameLabel": "Name",
                "namePlaceholder": "Concierge"
            },
            "rules": {
                "title": "Rule",
                "placeholder": "...",
                "add": "Add"
            },
            "amenities": {
                "title": "Amenity",
                "placeholder": "...",
                "add": "Add"
            },
            "faq": {
                "question": "Q",
                "qPlaceholder": "...",
                "answer": "A",
                "aPlaceholder": "...",
                "add": "Add"
            },
            "trash": {
                "instrPlaceholder": "Sorting...",
                "dayTrash": "Trash",
                "dayTrashPlaceholder": "Monday",
                "dayRecycling": "Recycling",
                "dayRecyclingPlaceholder": "Thursday",
                "location": "Bins",
                "locPlaceholder": "Garage",
                "photoLocal": "Photo"
            },
            "parking": {
                "instrPlaceholder": "N°42",
                "locPlaceholder": "Street...",
                "costPlaceholder": "Free",
                "photo": "Photo"
            },
            "breakfast": {
                "hoursPlaceholder": "07:00 - 10:30",
                "locPlaceholder": "Dining room",
                "menu": "Menu",
                "menuPlaceholder": "Coffee, tea..."
            },
            "transport": {
                "bus": "Bus",
                "train": "Train",
                "taxi": "Taxi",
                "bike": "Bike",
                "linePlaceholder": "Line 4",
                "stop": "Stop",
                "stopPlaceholder": "Stop...",
                "add": "Add"
            }
        },
        "dashboard": {
            "title": "أدلتي",
            "subtitle": "Manage your properties.",
            "newGuide": "دليل جديد",
            "logout": "Logout",
            "viewPublic": "Public page",
            "passProToShare": "Upgrade Pro",
            "delete": "Delete",
            "emptyTitle": "No guide",
            "emptyDesc": "Create your first guide.",
            "tryAi": "✨ AI",
            "createManual": "Manual",
            "published": "Online",
            "draft": "Draft",
            "edit": "Edit",
            "sortRecent": "Recent",
            "sortName": "Name",
            "confirmDelete": "Delete?",
            "deleteError": "Error",
            "aiModal": {
                "title": "Magic ✨",
                "city": "City",
                "cityPlaceholder": "Marrakech",
                "type": "Type",
                "typeAirbnb": "Airbnb",
                "typeHotel": "Hotel",
                "typeGuesthouse": "House",
                "audience": "Audience",
                "audienceFamilies": "Families",
                "audienceCouples": "Couples",
                "audienceRemote": "Remote Workers",
                "audienceGroups": "Groups",
                "generate": "Generate",
                "generating": "AI...",
                "generatingDesc": "Computing..."
            },
            "createModal": {
                "title": "New Guide",
                "nameLabel": "Name",
                "namePlaceholder": "Name...",
                "cancel": "Cancel",
                "create": "Create"
            },
            "limitModal": {
                "title": "Limit",
                "desc": "Limit reached.",
                "upgrade": "Upgrade Pro",
                "or": "Or",
                "addon": "Add 1",
                "loading": "..."
            },
            "addonSuccessModal": {
                "title": "Success",
                "heading": "Ready!",
                "desc": "Limit increased.",
                "cta": "Thanks"
            }
        },
        "settings": {
            "title": "Settings",
            "tabProfile": "Profile",
            "tabPlan": "Plan",
            "tabShop": "Shop",
            "personalInfo": "Info",
            "fullName": "Name",
            "email": "Email",
            "saveProfile": "Save",
            "yourPlan": "Your Plan",
            "currentPlan": "Current plan",
            "active": "Active",
            "unlimitedGuides": "Unlimited",
            "oneGuideIncluded": "1 guide",
            "oneGuideDraft": "1 draft",
            "themesUnlocked": "Themes OK",
            "extraGuides": "Extras",
            "upgradeToPro": "Upgrade Pro",
            "youArePro": "You are Pro",
            "info": "Info",
            "noBillingAccount": "No account",
            "serverError": "Error",
            "manageSubscription": "Manage",
            "shop": "Shop",
            "securePayment": "Secure",
            "bestSeller": "Top",
            "qrCanvas": "QR Canvas",
            "qrCanvasDesc": "Canvas...",
            "hdPrint": "HD",
            "frameIncluded": "Frame",
            "trackedShipping": "Tracked",
            "shippingTtc": "Shipping OK",
            "order": "Order",
            "requiredPro": "Pro Required",
            "extraGuide": "Extra",
            "extraGuideDesc": "Add guide.",
            "perMonth": "/month",
            "proReserved": "Pro",
            "onlyProCanAdd": "Pro required",
            "addGuide": "Add",
            "confirmAddGuide": "Add (20 DH/m)?",
            "cancel": "No",
            "confirm": "Yes",
            "guideAdded": "OK",
            "limitIncreased": "OK",
            "error": "Error",
            "success": "OK",
            "profileUpdated": "تم تحديث ملفك الشخصي بنجاح! 🎉",
            "updateError": "حدث خطأ أثناء التحديث.",
            "avatarLabel": "الصورة الرمزية",
            "namePlaceholder": "اسمك",
            "owned": "مملوك",
            "themePack": "حزمة الثيمات المتميزة",
            "themePackDesc": "افتح فوراً 20 ثيماً مميزاً صممها محترفون لتحسين أدلتك.",
            "alreadyIncluded": "مشمول بالفعل",
            "confirmPurchase": "تأكيد الشراء",
            "themeConfirmDesc": "هل تريد فتح جميع الثيمات مقابل 15 درهم/شهر؟",
            "themesUnlockedTitle": "تهانينا! 🎨",
            "themesUnlockedMsg": "تم فتح الثيمات. استمتع!",
            "buy": "شراء"
        },
        "ai": {
            "assistant": "AI",
            "online": "AI OK",
            "placeholder": "Message...",
            "empty": "Question?",
            "error": "Error",
            "thinking": "..."
        },
        "qrCodeWall": {
            "titlePart1": "Share",
            "titlePart2": "everywhere",
            "description": "Scan.",
            "items": {
                "wifi": {
                    "title": "WiFi",
                    "desc": "Connected"
                },
                "perpetual": {
                    "title": "Permanent",
                    "desc": "Valid link"
                },
                "remote": {
                    "title": "Live",
                    "desc": "Direct"
                }
            },
            "visual": {
                "welcome": "Welcome",
                "scan": "Scan",
                "detected": "Found",
                "notification": {
                    "app": "Maplyo",
                    "title": "Open"
                }
            }
        },
        "upsells": "Extras",
        "legalPage": {
            "titlePrivacy": "Privacy",
            "titleTerms": "Terms",
            "lastUpdated": "Updated:",
            "effectiveDate": "Date:",
            "privacy": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "items": [
                        "1"
                    ]
                },
                "section2": {
                    "title": "2",
                    "intro": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "content": "3"
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5",
                    "contact": "..."
                }
            },
            "terms": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "content": "1"
                },
                "section2": {
                    "title": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "intro": "3",
                    "items": [
                        "3"
                    ]
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5"
                },
                "section6": {
                    "title": "6",
                    "content": "6"
                }
            }
        },
        "pricingPage": {
            "hero": {
                "badge": "Top",
                "title1": "Pro,",
                "title2": "affordable.",
                "subtitle": "..."
            },
            "popular": "Top",
            "header": {
                "login": "Login",
                "signup": "Sign Up"
            },
            "compare": {
                "title": "Compare",
                "subtitle": "...",
                "features": {
                    "unlimited": "Unlimited",
                    "maps": "Maps",
                    "translation": "AI",
                    "domain": "Domain",
                    "support": "Support",
                    "whiteLabel": "White Label",
                    "analytics": "Analytics"
                },
                "values": {
                    "oneLang": "1 lang",
                    "unlimited": "Unlimited",
                    "emailSupport": "Email",
                    "whatsappSupport": "WhatsApp"
                }
            },
            "faqSection": {
                "title": "FAQ",
                "subtitle": "...",
                "items": [
                    {
                        "q": "Q",
                        "a": "A"
                    }
                ]
            },
            "trust": "Guarantee"
        },
        "builder": {
            "blocks": "blocks",
            "chooseTheme": "اختر السمة",
            "reset": "Reset",
            "viewGuide": "View Guide",
            "catEssentials": "Essentials",
            "catTravel": "Travel",
            "catBusiness": "Business",
            "guideStructure": "هيكل الدليل",
            "startHere": "Start here",
            "selectBlocks": "Select blocks",
            "mobilePreview": "Mobile Preview",
            "blockProperties": "Properties",
            "editing": "Editing",
            "selectToEdit": "Select a block",
            "paramsHere": "Settings here",
            "backHome": "Back",
            "backDashboard": "Dashboard",
            "editorMode": "Editor Mode",
            "themeLabel": "Theme",
            "qrLabel": "QR",
            "createAccount": "Create Account",
            "saveCreateAccount": "Save",
            "online": "Online",
            "confirmUnpublish": "Unpublish?",
            "unpublish": "Unpublish",
            "publishSuccess": "Published!",
            "publishError": "Error",
            "publish": "Publish",
            "library": "Library",
            "mobileMode": "Mobile Mode",
            "emptyGuide": "Empty",
            "selectBlock": "Block?",
            "close": "Close",
            "blockTitle": "Block Title",
            "designTheme": "Design Themes",
            "upgradePro": "Upgrade Pro",
            "unlock": "Unlock",
            "unlockPublish": "Publish!",
            "publishDesc": "Upgrade Pro.",
            "seeOffers": "Offers",
            "themes": {
                "minimal-white": {
                    "name": "Minimal",
                    "desc": "White"
                },
                "soft-gray": {
                    "name": "Gray",
                    "desc": "Soft"
                },
                "ocean": {
                    "name": "Ocean",
                    "desc": "Blue"
                },
                "nature": {
                    "name": "Nature",
                    "desc": "Green"
                },
                "sunset": {
                    "name": "Sunset",
                    "desc": "Orange"
                }
            }
        },
        "showcase": {
            "tag": "Examples",
            "title": "Showcase",
            "description": "See.",
            "messageFrom": "From",
            "viewFull": "View",
            "example1": {
                "type": "Loft",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Great"
            },
            "example2": {
                "type": "Villa",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Top"
            },
            "example3": {
                "type": "Riad",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Super"
            }
        },
        "guideLock": {
            "title": "Secure Access",
            "desc": "Unlock to see codes.",
            "demoCode": "Demo Code"
        },
        "auth": {
            "login": {
                "title": "Login",
                "subtitle": "Welcome",
                "email": "Email",
                "password": "Password",
                "forgot": "Forgot?",
                "error": "Error",
                "submit": "Login",
                "noAccount": "No account?",
                "createFree": "Create",
                "resetLink": "Reset"
            },
            "signup": {
                "title": "Sign Up",
                "subtitle": "Free",
                "successTitle": "Success",
                "successMsg": "Check your emails",
                "successDesc": "Link sent",
                "backToLogin": "Back",
                "firstName": "First Name",
                "lastName": "Last Name",
                "businessEmail": "Work Email",
                "businessName": "Company",
                "phone": "Phone",
                "passwordLabel": "Password",
                "passwordHint": "6+ chars",
                "submit": "Sign Up",
                "hasAccount": "Already registered?",
                "signIn": "Login"
            }
        }
    },
    "nl": {
        "common": {
            "getStarted": "Beginnen",
            "login": "Inloggen",
            "signup": "Sign Up",
            "tryFree": "Try for free",
            "popular": "Most Popular",
            "month": "/month",
            "loading": "Loading...",
            "choose": "Choose",
            "viewGuide": "View full guide",
            "more": "See more",
            "checkin": "Check-in",
            "qrCodeWall": "Scan to test",
            "checkout": "Check-out",
            "location": "Location",
            "viewOnMap": "View on map",
            "wifi": "WiFi",
            "other": "Other"
        },
        "renderer": {
            "welcome": "Welcome",
            "wifi": "WiFi",
            "access": "Access Codes",
            "location": "Location",
            "contact": "Contact",
            "amenities": "Amenities",
            "places": "Nearby",
            "rules": "House Rules",
            "tipOfTheDay": "Tip of the day",
            "sunday": "Sunday",
            "monday": "Monday",
            "tuesday": "Tuesday",
            "wednesday": "Wednesday",
            "thursday": "Thursday",
            "friday": "Friday",
            "saturday": "Saturday",
            "lazy": "Lazy",
            "mood": "Motivated",
            "discovery": "Discovery",
            "tasty": "Tasty",
            "adventure": "Adventure",
            "festive": "Festive",
            "outing": "Outing",
            "brunch": "Brunch at",
            "explore": "Explore",
            "museums": "Visit",
            "taste": "Taste",
            "excursion": "An excursion",
            "nightlife": "Nightlife",
            "walk": "A walk",
            "secureAccess": "Secure Access",
            "checkin": "Check-in",
            "checkout": "Check-out",
            "viewMap": "View on map",
            "upsells": "Extras",
            "items": "items",
            "empty": "Nothing to show",
            "searchPlaceholder": "Search...",
            "secureAccessDesc": "Enter the code provided by your host."
        },
        "socialProof": {
            "trustpilot": "4.9/5 by 500+ Hosts",
            "usedBy": "Used by top concierge services",
            "autoTranslate": {
                "title": "Auto-Translated",
                "desc": "Your guides speak your guests' language."
            },
            "googleMaps": {
                "title": "Integrated Google Maps",
                "desc": "Google Maps directly in the guide."
            }
        },
        "hero": {
            "tag": "FOR HOSTS AND CONCIERGES",
            "title": "Never repeat the WiFi code again.",
            "subtitle": "Digitize your welcome book. Offer a 5-star experience, reduce messages by 50%, and increase positive reviews.",
            "cta": "Create my free guide",
            "demo": "View an example",
            "noCreditCard": "No credit card required",
            "setupTime": "Set up in 2 mins",
            "badge": "Digital Welcome Book #1",
            "title1": "For your guests,",
            "title2": "a 5-star experience.",
            "users": "Trusted by 500+ hosts"
        },
        "features": {
            "title": "Everything you need.",
            "subtitle": "Nothing superfluous.",
            "description": "Powerful tools to automate your welcoming.",
            "badge": "Features",
            "items": {
                "mobileFirst": {
                    "title": "100% Mobile First",
                    "desc": "No app to download."
                },
                "secure": {
                    "title": "Secure Codes",
                    "desc": "WiFi and lockboxes protected."
                },
                "map": {
                    "title": "Interactive Map",
                    "desc": "Integrate your favorite places."
                },
                "live": {
                    "title": "Live Edits",
                    "desc": "Instant updates."
                },
                "translate": {
                    "title": "Auto Translation",
                    "desc": "Detects visitor's language."
                },
                "checklist": {
                    "title": "Checklists",
                    "desc": "Clear check-in/out instructions."
                }
            }
        },
        "pricing": {
            "title": "Transparent Pricing",
            "subtitle": "Start for free. Scale when you want.",
            "bestOffer": "The world's best offer:",
            "addon": "+20 DH / extra guide",
            "trust": "30-day guarantee",
            "enterprise": {
                "title": "Enterprise Solution",
                "desc": "For pros (50+ properties).",
                "cta": "Contact"
            },
            "plans": {
                "demo": {
                    "name": "Discovery",
                    "price": "Free",
                    "desc": "Test without card.",
                    "button": "Try",
                    "features": [
                        "Creator Access",
                        "Mobile Preview"
                    ]
                },
                "basic": {
                    "name": "Essential",
                    "desc": "For 1 property.",
                    "button": "Start",
                    "features": [
                        "Digital Book",
                        "WiFi QR",
                        "1 Guide"
                    ]
                },
                "pro": {
                    "name": "Growth",
                    "desc": "For pros.",
                    "button": "Upgrade Pro",
                    "features": [
                        "Unlimited Guides",
                        "AI Translation",
                        "WhatsApp Support"
                    ]
                },
                "business": {
                    "name": "Agency",
                    "desc": "For portfolios.",
                    "button": "Talk to Expert",
                    "price": "Custom",
                    "features": [
                        "White Label",
                        "Multi-Property"
                    ]
                }
            }
        },
        "testimonials": {
            "title": "Trusted by Pros",
            "subtitle": "Join 500+ hosts.",
            "items": [
                {
                    "name": "Jean R.",
                    "role": "Superhost",
                    "text": "Huge time saver.",
                    "result": "-60% messages"
                }
            ]
        },
        "faq": {
            "title": "Frequently Asked Questions",
            "subtitle": "Know everything.",
            "questions": [
                {
                    "q": "Free?",
                    "a": "Yes, discovery plan available."
                }
            ]
        },
        "footer": {
            "product": "Product",
            "support": "Support",
            "legal": "Legal",
            "desc": "Maplyo helps hosts.",
            "links": {
                "features": "Features",
                "pricing": "Pricing",
                "testimonials": "Reviews",
                "roadmap": "Roadmap",
                "help": "Help",
                "contact": "Contact",
                "privacy": "Privacy",
                "terms": "Terms",
                "legal": "Legal Notice"
            },
            "securePayment": "Secure Payment",
            "rights": "All rights reserved."
        },
        "cta": {
            "title": "Ready to impress?",
            "subtitle": "Create your guide today.",
            "button": "Create my guide",
            "subtext": "No card."
        },
        "guide": {
            "accessCode": "Access Codes",
            "locked": "Protected by code.",
            "enterCode": "Access Code",
            "confirm": "Confirm",
            "apartmentDoor": "Apt Door:",
            "buildingDoor": "Building:",
            "gate": "Gate:",
            "notes": "Notes"
        },
        "guideBlocks": {
            "checkIn": {
                "title": "Check-in"
            },
            "location": {
                "notSet": "Not set",
                "address": "Address",
                "openInMaps": "Open",
                "copyAddress": "Copy",
                "viewOnMap": "View on map"
            },
            "contact": {
                "host": "Host",
                "yourHost": "Your Host",
                "phone": "Phone",
                "openConversation": "Open"
            },
            "rules": {
                "noRules": "No rules"
            },
            "amenities": {
                "noAmenities": "No amenities"
            },
            "faq": {
                "noFaq": "No FAQ",
                "question": "Question",
                "answer": "Answer"
            },
            "trash": {
                "title": "Bins",
                "items": "Trash",
                "recycling": "Recycling"
            },
            "breakfast": {
                "title": "Breakfast",
                "menu": "Menu"
            },
            "transport": {
                "noInfo": "No info",
                "call": "Call"
            }
        },
        "editor": {
            "common": {
                "title": "Title",
                "description": "Description",
                "uploadImage": "Image",
                "tags": "Tags",
                "placeholderTags": "Wifi, Pool...",
                "time": "Time",
                "instructions": "Instructions",
                "videoUrl": "Video",
                "location": "Location",
                "address": "Address",
                "placeholderAddress": "Street...",
                "mapUrl": "Maps",
                "placeholderMap": "Maps Link",
                "phone": "Phone",
                "placeholderPhone": "+1...",
                "whatsapp": "WhatsApp",
                "placeholderWhatsapp": "Number",
                "email": "Email",
                "placeholderEmail": "...",
                "price": "Price",
                "placeholderPrice": "150 DH",
                "placeholderReserve": "Book",
                "cost": "Cost",
                "placeholderWelcome": "Welcome...",
                "linkUrl": "Link",
                "priceCheap": "Cheap",
                "priceModerate": "Moderate",
                "priceExpensive": "Premium",
                "day": "Day",
                "placeholderMonth": "JAN",
                "placeholderDay": "15",
                "placeholderTime": "19:00",
                "other": "Other",
                "hours": "Hours",
                "month": "Month",
                "placeholder": "..."
            },
            "labels": {
                "hero": "Home",
                "wifi": "WiFi",
                "access_codes": "Codes",
                "location": "Location",
                "contact": "Contact",
                "amenities": "Amenities",
                "places": "Places",
                "rules": "Rules",
                "faq": "FAQ",
                "trash": "Bins",
                "parking": "Parking",
                "breakfast": "Breakfast",
                "transport": "Transport",
                "checkin": "Check-in",
                "checkout": "Check-out",
                "documents": "Documents",
                "events": "Events",
                "upsells": "Extras",
                "embed": "Iframe",
                "ai_assistant": "AI"
            },
            "access_codes": {
                "security": "Security",
                "mode": "Display",
                "alwaysVisible": "Always visible",
                "unlockByCode": "By code",
                "unlockCode": "Code",
                "unlockCodeDesc": "Required.",
                "aptCode": "Door",
                "buildingCode": "Building",
                "gateCode": "Gate",
                "notes": "Notes"
            },
            "wifi": {
                "networkName": "WiFi Name",
                "password": "Password",
                "notes": "Notes"
            },
            "documents": {
                "name": "Name",
                "url": "Link",
                "add": "Add"
            },
            "places": {
                "aiButton": "AI",
                "name": "Name",
                "add": "Add"
            },
            "events": {
                "aiButton": "AI",
                "add": "Add"
            },
            "upsells": {
                "buttonText": "Button",
                "buttonLink": "Link",
                "add": "Add"
            },
            "embed": {
                "url": "Iframe",
                "warning": "Warning"
            },
            "checkin": {
                "timePlaceholder": "15:00",
                "instrPlaceholder": "Procedure..."
            },
            "contact": {
                "nameLabel": "Name",
                "namePlaceholder": "Concierge"
            },
            "rules": {
                "title": "Rule",
                "placeholder": "...",
                "add": "Add"
            },
            "amenities": {
                "title": "Amenity",
                "placeholder": "...",
                "add": "Add"
            },
            "faq": {
                "question": "Q",
                "qPlaceholder": "...",
                "answer": "A",
                "aPlaceholder": "...",
                "add": "Add"
            },
            "trash": {
                "instrPlaceholder": "Sorting...",
                "dayTrash": "Trash",
                "dayTrashPlaceholder": "Monday",
                "dayRecycling": "Recycling",
                "dayRecyclingPlaceholder": "Thursday",
                "location": "Bins",
                "locPlaceholder": "Garage",
                "photoLocal": "Photo"
            },
            "parking": {
                "instrPlaceholder": "N°42",
                "locPlaceholder": "Street...",
                "costPlaceholder": "Free",
                "photo": "Photo"
            },
            "breakfast": {
                "hoursPlaceholder": "07:00 - 10:30",
                "locPlaceholder": "Dining room",
                "menu": "Menu",
                "menuPlaceholder": "Coffee, tea..."
            },
            "transport": {
                "bus": "Bus",
                "train": "Train",
                "taxi": "Taxi",
                "bike": "Bike",
                "linePlaceholder": "Line 4",
                "stop": "Stop",
                "stopPlaceholder": "Stop...",
                "add": "Add"
            }
        },
        "dashboard": {
            "title": "Mijn Gidsen",
            "subtitle": "Manage your properties.",
            "newGuide": "New Guide",
            "logout": "Logout",
            "viewPublic": "Public page",
            "passProToShare": "Upgrade Pro",
            "delete": "Delete",
            "emptyTitle": "No guide",
            "emptyDesc": "Create your first guide.",
            "tryAi": "✨ AI",
            "createManual": "Manual",
            "published": "Online",
            "draft": "Draft",
            "edit": "Edit",
            "sortRecent": "Recent",
            "sortName": "Name",
            "confirmDelete": "Delete?",
            "deleteError": "Error",
            "aiModal": {
                "title": "Magic ✨",
                "city": "City",
                "cityPlaceholder": "Marrakech",
                "type": "Type",
                "typeAirbnb": "Airbnb",
                "typeHotel": "Hotel",
                "typeGuesthouse": "House",
                "audience": "Audience",
                "audienceFamilies": "Families",
                "audienceCouples": "Couples",
                "audienceRemote": "Remote Workers",
                "audienceGroups": "Groups",
                "generate": "Generate",
                "generating": "AI...",
                "generatingDesc": "Computing..."
            },
            "createModal": {
                "title": "New Guide",
                "nameLabel": "Name",
                "namePlaceholder": "Name...",
                "cancel": "Cancel",
                "create": "Create"
            },
            "limitModal": {
                "title": "Limit",
                "desc": "Limit reached.",
                "upgrade": "Upgrade Pro",
                "or": "Or",
                "addon": "Add 1",
                "loading": "..."
            },
            "addonSuccessModal": {
                "title": "Success",
                "heading": "Ready!",
                "desc": "Limit increased.",
                "cta": "Thanks"
            }
        },
        "settings": {
            "title": "Settings",
            "tabProfile": "Profile",
            "tabPlan": "Plan",
            "tabShop": "Shop",
            "personalInfo": "Info",
            "fullName": "Name",
            "email": "Email",
            "saveProfile": "Save",
            "yourPlan": "Your Plan",
            "currentPlan": "Current plan",
            "active": "Active",
            "unlimitedGuides": "Unlimited",
            "oneGuideIncluded": "1 guide",
            "oneGuideDraft": "1 draft",
            "themesUnlocked": "Themes OK",
            "extraGuides": "Extras",
            "upgradeToPro": "Upgrade Pro",
            "youArePro": "You are Pro",
            "info": "Info",
            "noBillingAccount": "No account",
            "serverError": "Error",
            "manageSubscription": "Manage",
            "shop": "Shop",
            "securePayment": "Secure",
            "bestSeller": "Top",
            "qrCanvas": "QR Canvas",
            "qrCanvasDesc": "Canvas...",
            "hdPrint": "HD",
            "frameIncluded": "Frame",
            "trackedShipping": "Tracked",
            "shippingTtc": "Shipping OK",
            "order": "Order",
            "requiredPro": "Pro Required",
            "extraGuide": "Extra",
            "extraGuideDesc": "Add guide.",
            "perMonth": "/month",
            "proReserved": "Pro",
            "onlyProCanAdd": "Pro required",
            "addGuide": "Add",
            "confirmAddGuide": "Add (20 DH/m)?",
            "cancel": "No",
            "confirm": "Yes",
            "guideAdded": "OK",
            "limitIncreased": "OK",
            "error": "Error",
            "success": "OK",
            "profileUpdated": "Uw profiel is succesvol bijgewerkt! 🎉",
            "updateError": "Er is een fout opgetreden bij het bijwerken.",
            "avatarLabel": "Avatar",
            "namePlaceholder": "Uw naam",
            "owned": "IN BEZIT",
            "themePack": "Ultimate Thema's Pakket",
            "themePackDesc": "Ontgrendel direct 20 premium thema's ontworpen door professionals om uw gidsen te verbeteren.",
            "alreadyIncluded": "Al Inbegrepen",
            "confirmPurchase": "Aankoop bevestigen",
            "themeConfirmDesc": "Wilt u alle thema's ontgrendelen voor 15 DH/maand?",
            "themesUnlockedTitle": "Gefeliciteerd! 🎨",
            "themesUnlockedMsg": "Thema's zijn ontgrendeld. Geniet ervan!",
            "buy": "Kopen"
        },
        "ai": {
            "assistant": "AI",
            "online": "AI OK",
            "placeholder": "Message...",
            "empty": "Question?",
            "error": "Error",
            "thinking": "..."
        },
        "qrCodeWall": {
            "titlePart1": "Share",
            "titlePart2": "everywhere",
            "description": "Scan.",
            "items": {
                "wifi": {
                    "title": "WiFi",
                    "desc": "Connected"
                },
                "perpetual": {
                    "title": "Permanent",
                    "desc": "Valid link"
                },
                "remote": {
                    "title": "Live",
                    "desc": "Direct"
                }
            },
            "visual": {
                "welcome": "Welcome",
                "scan": "Scan",
                "detected": "Found",
                "notification": {
                    "app": "Maplyo",
                    "title": "Open"
                }
            }
        },
        "upsells": "Extras",
        "legalPage": {
            "titlePrivacy": "Privacy",
            "titleTerms": "Terms",
            "lastUpdated": "Updated:",
            "effectiveDate": "Date:",
            "privacy": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "items": [
                        "1"
                    ]
                },
                "section2": {
                    "title": "2",
                    "intro": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "content": "3"
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5",
                    "contact": "..."
                }
            },
            "terms": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "content": "1"
                },
                "section2": {
                    "title": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "intro": "3",
                    "items": [
                        "3"
                    ]
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5"
                },
                "section6": {
                    "title": "6",
                    "content": "6"
                }
            }
        },
        "pricingPage": {
            "hero": {
                "badge": "Top",
                "title1": "Pro,",
                "title2": "affordable.",
                "subtitle": "..."
            },
            "popular": "Top",
            "header": {
                "login": "Login",
                "signup": "Sign Up"
            },
            "compare": {
                "title": "Compare",
                "subtitle": "...",
                "features": {
                    "unlimited": "Unlimited",
                    "maps": "Maps",
                    "translation": "AI",
                    "domain": "Domain",
                    "support": "Support",
                    "whiteLabel": "White Label",
                    "analytics": "Analytics"
                },
                "values": {
                    "oneLang": "1 lang",
                    "unlimited": "Unlimited",
                    "emailSupport": "Email",
                    "whatsappSupport": "WhatsApp"
                }
            },
            "faqSection": {
                "title": "FAQ",
                "subtitle": "...",
                "items": [
                    {
                        "q": "Q",
                        "a": "A"
                    }
                ]
            },
            "trust": "Guarantee"
        },
        "builder": {
            "blocks": "blocks",
            "chooseTheme": "Choose Theme",
            "reset": "Reset",
            "viewGuide": "View Guide",
            "catEssentials": "Essentials",
            "catTravel": "Travel",
            "catBusiness": "Business",
            "guideStructure": "Structure",
            "startHere": "Start here",
            "selectBlocks": "Select blocks",
            "mobilePreview": "Mobile Preview",
            "blockProperties": "Properties",
            "editing": "Editing",
            "selectToEdit": "Select a block",
            "paramsHere": "Settings here",
            "backHome": "Back",
            "backDashboard": "Dashboard",
            "editorMode": "Editor Mode",
            "themeLabel": "Theme",
            "qrLabel": "QR",
            "createAccount": "Create Account",
            "saveCreateAccount": "Save",
            "online": "Online",
            "confirmUnpublish": "Unpublish?",
            "unpublish": "Unpublish",
            "publishSuccess": "Published!",
            "publishError": "Error",
            "publish": "Publish",
            "library": "Library",
            "mobileMode": "Mobile Mode",
            "emptyGuide": "Empty",
            "selectBlock": "Block?",
            "close": "Close",
            "blockTitle": "Block Title",
            "designTheme": "Design Themes",
            "upgradePro": "Upgrade Pro",
            "unlock": "Unlock",
            "unlockPublish": "Publish!",
            "publishDesc": "Upgrade Pro.",
            "seeOffers": "Offers",
            "themes": {
                "minimal-white": {
                    "name": "Minimal",
                    "desc": "White"
                },
                "soft-gray": {
                    "name": "Gray",
                    "desc": "Soft"
                },
                "ocean": {
                    "name": "Ocean",
                    "desc": "Blue"
                },
                "nature": {
                    "name": "Nature",
                    "desc": "Green"
                },
                "sunset": {
                    "name": "Sunset",
                    "desc": "Orange"
                }
            }
        },
        "showcase": {
            "tag": "Examples",
            "title": "Showcase",
            "description": "See.",
            "messageFrom": "From",
            "viewFull": "View",
            "example1": {
                "type": "Loft",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Great"
            },
            "example2": {
                "type": "Villa",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Top"
            },
            "example3": {
                "type": "Riad",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Super"
            }
        },
        "guideLock": {
            "title": "Secure Access",
            "desc": "Unlock to see codes.",
            "demoCode": "Demo Code"
        },
        "auth": {
            "login": {
                "title": "Login",
                "subtitle": "Welcome",
                "email": "Email",
                "password": "Password",
                "forgot": "Forgot?",
                "error": "Error",
                "submit": "Login",
                "noAccount": "No account?",
                "createFree": "Create",
                "resetLink": "Reset"
            },
            "signup": {
                "title": "Sign Up",
                "subtitle": "Free",
                "successTitle": "Success",
                "successMsg": "Check your emails",
                "successDesc": "Link sent",
                "backToLogin": "Back",
                "firstName": "First Name",
                "lastName": "Last Name",
                "businessEmail": "Work Email",
                "businessName": "Company",
                "phone": "Phone",
                "passwordLabel": "Password",
                "passwordHint": "6+ chars",
                "submit": "Sign Up",
                "hasAccount": "Already registered?",
                "signIn": "Login"
            }
        }
    },
    "zh": {
        "common": {
            "getStarted": "开始",
            "login": "登录",
            "signup": "Sign Up",
            "tryFree": "Try for free",
            "popular": "Most Popular",
            "month": "/month",
            "loading": "Loading...",
            "choose": "Choose",
            "viewGuide": "View full guide",
            "more": "See more",
            "checkin": "Check-in",
            "qrCodeWall": "Scan to test",
            "checkout": "Check-out",
            "location": "Location",
            "viewOnMap": "View on map",
            "wifi": "WiFi",
            "other": "Other"
        },
        "renderer": {
            "welcome": "Welcome",
            "wifi": "WiFi",
            "access": "Access Codes",
            "location": "Location",
            "contact": "Contact",
            "amenities": "Amenities",
            "places": "Nearby",
            "rules": "House Rules",
            "tipOfTheDay": "Tip of the day",
            "sunday": "Sunday",
            "monday": "Monday",
            "tuesday": "Tuesday",
            "wednesday": "Wednesday",
            "thursday": "Thursday",
            "friday": "Friday",
            "saturday": "Saturday",
            "lazy": "Lazy",
            "mood": "Motivated",
            "discovery": "Discovery",
            "tasty": "Tasty",
            "adventure": "Adventure",
            "festive": "Festive",
            "outing": "Outing",
            "brunch": "Brunch at",
            "explore": "Explore",
            "museums": "Visit",
            "taste": "Taste",
            "excursion": "An excursion",
            "nightlife": "Nightlife",
            "walk": "A walk",
            "secureAccess": "Secure Access",
            "checkin": "Check-in",
            "checkout": "Check-out",
            "viewMap": "View on map",
            "upsells": "Extras",
            "items": "items",
            "empty": "Nothing to show",
            "searchPlaceholder": "Search...",
            "secureAccessDesc": "Enter the code provided by your host."
        },
        "socialProof": {
            "trustpilot": "4.9/5 by 500+ Hosts",
            "usedBy": "Used by top concierge services",
            "autoTranslate": {
                "title": "Auto-Translated",
                "desc": "Your guides speak your guests' language."
            },
            "googleMaps": {
                "title": "Integrated Google Maps",
                "desc": "Google Maps directly in the guide."
            }
        },
        "hero": {
            "tag": "FOR HOSTS AND CONCIERGES",
            "title": "Never repeat the WiFi code again.",
            "subtitle": "Digitize your welcome book. Offer a 5-star experience, reduce messages by 50%, and increase positive reviews.",
            "cta": "Create my free guide",
            "demo": "View an example",
            "noCreditCard": "No credit card required",
            "setupTime": "Set up in 2 mins",
            "badge": "Digital Welcome Book #1",
            "title1": "For your guests,",
            "title2": "a 5-star experience.",
            "users": "Trusted by 500+ hosts"
        },
        "features": {
            "title": "Everything you need.",
            "subtitle": "Nothing superfluous.",
            "description": "Powerful tools to automate your welcoming.",
            "badge": "Features",
            "items": {
                "mobileFirst": {
                    "title": "100% Mobile First",
                    "desc": "No app to download."
                },
                "secure": {
                    "title": "Secure Codes",
                    "desc": "WiFi and lockboxes protected."
                },
                "map": {
                    "title": "Interactive Map",
                    "desc": "Integrate your favorite places."
                },
                "live": {
                    "title": "Live Edits",
                    "desc": "Instant updates."
                },
                "translate": {
                    "title": "Auto Translation",
                    "desc": "Detects visitor's language."
                },
                "checklist": {
                    "title": "Checklists",
                    "desc": "Clear check-in/out instructions."
                }
            }
        },
        "pricing": {
            "title": "Transparent Pricing",
            "subtitle": "Start for free. Scale when you want.",
            "bestOffer": "The world's best offer:",
            "addon": "+20 DH / extra guide",
            "trust": "30-day guarantee",
            "enterprise": {
                "title": "Enterprise Solution",
                "desc": "For pros (50+ properties).",
                "cta": "Contact"
            },
            "plans": {
                "demo": {
                    "name": "Discovery",
                    "price": "Free",
                    "desc": "Test without card.",
                    "button": "Try",
                    "features": [
                        "Creator Access",
                        "Mobile Preview"
                    ]
                },
                "basic": {
                    "name": "Essential",
                    "desc": "For 1 property.",
                    "button": "Start",
                    "features": [
                        "Digital Book",
                        "WiFi QR",
                        "1 Guide"
                    ]
                },
                "pro": {
                    "name": "Growth",
                    "desc": "For pros.",
                    "button": "Upgrade Pro",
                    "features": [
                        "Unlimited Guides",
                        "AI Translation",
                        "WhatsApp Support"
                    ]
                },
                "business": {
                    "name": "Agency",
                    "desc": "For portfolios.",
                    "button": "Talk to Expert",
                    "price": "Custom",
                    "features": [
                        "White Label",
                        "Multi-Property"
                    ]
                }
            }
        },
        "testimonials": {
            "title": "Trusted by Pros",
            "subtitle": "Join 500+ hosts.",
            "items": [
                {
                    "name": "Jean R.",
                    "role": "Superhost",
                    "text": "Huge time saver.",
                    "result": "-60% messages"
                }
            ]
        },
        "faq": {
            "title": "Frequently Asked Questions",
            "subtitle": "Know everything.",
            "questions": [
                {
                    "q": "Free?",
                    "a": "Yes, discovery plan available."
                }
            ]
        },
        "footer": {
            "product": "Product",
            "support": "Support",
            "legal": "Legal",
            "desc": "Maplyo helps hosts.",
            "links": {
                "features": "Features",
                "pricing": "Pricing",
                "testimonials": "Reviews",
                "roadmap": "Roadmap",
                "help": "Help",
                "contact": "Contact",
                "privacy": "Privacy",
                "terms": "Terms",
                "legal": "Legal Notice"
            },
            "securePayment": "Secure Payment",
            "rights": "All rights reserved."
        },
        "cta": {
            "title": "Ready to impress?",
            "subtitle": "Create your guide today.",
            "button": "Create my guide",
            "subtext": "No card."
        },
        "guide": {
            "accessCode": "Access Codes",
            "locked": "Protected by code.",
            "enterCode": "Access Code",
            "confirm": "Confirm",
            "apartmentDoor": "Apt Door:",
            "buildingDoor": "Building:",
            "gate": "Gate:",
            "notes": "Notes"
        },
        "guideBlocks": {
            "checkIn": {
                "title": "Check-in"
            },
            "location": {
                "notSet": "Not set",
                "address": "Address",
                "openInMaps": "Open",
                "copyAddress": "Copy",
                "viewOnMap": "View on map"
            },
            "contact": {
                "host": "Host",
                "yourHost": "Your Host",
                "phone": "Phone",
                "openConversation": "Open"
            },
            "rules": {
                "noRules": "No rules"
            },
            "amenities": {
                "noAmenities": "No amenities"
            },
            "faq": {
                "noFaq": "No FAQ",
                "question": "Question",
                "answer": "Answer"
            },
            "trash": {
                "title": "Bins",
                "items": "Trash",
                "recycling": "Recycling"
            },
            "breakfast": {
                "title": "Breakfast",
                "menu": "Menu"
            },
            "transport": {
                "noInfo": "No info",
                "call": "Call"
            }
        },
        "editor": {
            "common": {
                "title": "Title",
                "description": "Description",
                "uploadImage": "Image",
                "tags": "Tags",
                "placeholderTags": "Wifi, Pool...",
                "time": "Time",
                "instructions": "Instructions",
                "videoUrl": "Video",
                "location": "Location",
                "address": "Address",
                "placeholderAddress": "Street...",
                "mapUrl": "Maps",
                "placeholderMap": "Maps Link",
                "phone": "Phone",
                "placeholderPhone": "+1...",
                "whatsapp": "WhatsApp",
                "placeholderWhatsapp": "Number",
                "email": "Email",
                "placeholderEmail": "...",
                "price": "Price",
                "placeholderPrice": "150 DH",
                "placeholderReserve": "Book",
                "cost": "Cost",
                "placeholderWelcome": "Welcome...",
                "linkUrl": "Link",
                "priceCheap": "Cheap",
                "priceModerate": "Moderate",
                "priceExpensive": "Premium",
                "day": "Day",
                "placeholderMonth": "JAN",
                "placeholderDay": "15",
                "placeholderTime": "19:00",
                "other": "Other",
                "hours": "Hours",
                "month": "Month",
                "placeholder": "..."
            },
            "labels": {
                "hero": "Home",
                "wifi": "WiFi",
                "access_codes": "Codes",
                "location": "Location",
                "contact": "Contact",
                "amenities": "Amenities",
                "places": "Places",
                "rules": "Rules",
                "faq": "FAQ",
                "trash": "Bins",
                "parking": "Parking",
                "breakfast": "Breakfast",
                "transport": "Transport",
                "checkin": "Check-in",
                "checkout": "Check-out",
                "documents": "Documents",
                "events": "Events",
                "upsells": "Extras",
                "embed": "Iframe",
                "ai_assistant": "AI"
            },
            "access_codes": {
                "security": "Security",
                "mode": "Display",
                "alwaysVisible": "Always visible",
                "unlockByCode": "By code",
                "unlockCode": "Code",
                "unlockCodeDesc": "Required.",
                "aptCode": "Door",
                "buildingCode": "Building",
                "gateCode": "Gate",
                "notes": "Notes"
            },
            "wifi": {
                "networkName": "WiFi Name",
                "password": "Password",
                "notes": "Notes"
            },
            "documents": {
                "name": "Name",
                "url": "Link",
                "add": "Add"
            },
            "places": {
                "aiButton": "AI",
                "name": "Name",
                "add": "Add"
            },
            "events": {
                "aiButton": "AI",
                "add": "Add"
            },
            "upsells": {
                "buttonText": "Button",
                "buttonLink": "Link",
                "add": "Add"
            },
            "embed": {
                "url": "Iframe",
                "warning": "Warning"
            },
            "checkin": {
                "timePlaceholder": "15:00",
                "instrPlaceholder": "Procedure..."
            },
            "contact": {
                "nameLabel": "Name",
                "namePlaceholder": "Concierge"
            },
            "rules": {
                "title": "Rule",
                "placeholder": "...",
                "add": "Add"
            },
            "amenities": {
                "title": "Amenity",
                "placeholder": "...",
                "add": "Add"
            },
            "faq": {
                "question": "Q",
                "qPlaceholder": "...",
                "answer": "A",
                "aPlaceholder": "...",
                "add": "Add"
            },
            "trash": {
                "instrPlaceholder": "Sorting...",
                "dayTrash": "Trash",
                "dayTrashPlaceholder": "Monday",
                "dayRecycling": "Recycling",
                "dayRecyclingPlaceholder": "Thursday",
                "location": "Bins",
                "locPlaceholder": "Garage",
                "photoLocal": "Photo"
            },
            "parking": {
                "instrPlaceholder": "N°42",
                "locPlaceholder": "Street...",
                "costPlaceholder": "Free",
                "photo": "Photo"
            },
            "breakfast": {
                "hoursPlaceholder": "07:00 - 10:30",
                "locPlaceholder": "Dining room",
                "menu": "Menu",
                "menuPlaceholder": "Coffee, tea..."
            },
            "transport": {
                "bus": "Bus",
                "train": "Train",
                "taxi": "Taxi",
                "bike": "Bike",
                "linePlaceholder": "Line 4",
                "stop": "Stop",
                "stopPlaceholder": "Stop...",
                "add": "Add"
            }
        },
        "dashboard": {
            "title": "我的指南",
            "subtitle": "Manage your properties.",
            "newGuide": "New Guide",
            "logout": "Logout",
            "viewPublic": "Public page",
            "passProToShare": "Upgrade Pro",
            "delete": "Delete",
            "emptyTitle": "No guide",
            "emptyDesc": "Create your first guide.",
            "tryAi": "✨ AI",
            "createManual": "Manual",
            "published": "Online",
            "draft": "Draft",
            "edit": "Edit",
            "sortRecent": "Recent",
            "sortName": "Name",
            "confirmDelete": "Delete?",
            "deleteError": "Error",
            "aiModal": {
                "title": "Magic ✨",
                "city": "City",
                "cityPlaceholder": "Marrakech",
                "type": "Type",
                "typeAirbnb": "Airbnb",
                "typeHotel": "Hotel",
                "typeGuesthouse": "House",
                "audience": "Audience",
                "audienceFamilies": "Families",
                "audienceCouples": "Couples",
                "audienceRemote": "Remote Workers",
                "audienceGroups": "Groups",
                "generate": "Generate",
                "generating": "AI...",
                "generatingDesc": "Computing..."
            },
            "createModal": {
                "title": "New Guide",
                "nameLabel": "Name",
                "namePlaceholder": "Name...",
                "cancel": "Cancel",
                "create": "Create"
            },
            "limitModal": {
                "title": "Limit",
                "desc": "Limit reached.",
                "upgrade": "Upgrade Pro",
                "or": "Or",
                "addon": "Add 1",
                "loading": "..."
            },
            "addonSuccessModal": {
                "title": "Success",
                "heading": "Ready!",
                "desc": "Limit increased.",
                "cta": "Thanks"
            }
        },
        "settings": {
            "title": "Settings",
            "tabProfile": "Profile",
            "tabPlan": "Plan",
            "tabShop": "Shop",
            "personalInfo": "Info",
            "fullName": "Name",
            "email": "Email",
            "saveProfile": "Save",
            "yourPlan": "Your Plan",
            "currentPlan": "Current plan",
            "active": "Active",
            "unlimitedGuides": "Unlimited",
            "oneGuideIncluded": "1 guide",
            "oneGuideDraft": "1 draft",
            "themesUnlocked": "Themes OK",
            "extraGuides": "Extras",
            "upgradeToPro": "Upgrade Pro",
            "youArePro": "You are Pro",
            "info": "Info",
            "noBillingAccount": "No account",
            "serverError": "Error",
            "manageSubscription": "Manage",
            "shop": "Shop",
            "securePayment": "Secure",
            "bestSeller": "Top",
            "qrCanvas": "QR Canvas",
            "qrCanvasDesc": "Canvas...",
            "hdPrint": "HD",
            "frameIncluded": "Frame",
            "trackedShipping": "Tracked",
            "shippingTtc": "Shipping OK",
            "order": "Order",
            "requiredPro": "Pro Required",
            "extraGuide": "Extra",
            "extraGuideDesc": "Add guide.",
            "perMonth": "/month",
            "proReserved": "Pro",
            "onlyProCanAdd": "Pro required",
            "addGuide": "Add",
            "confirmAddGuide": "Add (20 DH/m)?",
            "cancel": "No",
            "confirm": "Yes",
            "guideAdded": "OK",
            "limitIncreased": "OK",
            "error": "Error",
            "success": "OK",
            "profileUpdated": "您的个人资料已成功更新！🎉",
            "updateError": "更新时发生错误。",
            "avatarLabel": "头像",
            "namePlaceholder": "您的姓名",
            "owned": "已拥有",
            "themePack": "终极主题包",
            "themePackDesc": "立即解锁由专业设计师打造的20个高级主题，提升您的指南品质。",
            "alreadyIncluded": "已包含",
            "confirmPurchase": "确认购买",
            "themeConfirmDesc": "您要以15 DH/月解锁所有主题吗？",
            "themesUnlockedTitle": "恭喜！🎨",
            "themesUnlockedMsg": "主题已解锁，尽情享用！",
            "buy": "购买"
        },
        "ai": {
            "assistant": "AI",
            "online": "AI OK",
            "placeholder": "Message...",
            "empty": "Question?",
            "error": "Error",
            "thinking": "..."
        },
        "qrCodeWall": {
            "titlePart1": "Share",
            "titlePart2": "everywhere",
            "description": "Scan.",
            "items": {
                "wifi": {
                    "title": "WiFi",
                    "desc": "Connected"
                },
                "perpetual": {
                    "title": "Permanent",
                    "desc": "Valid link"
                },
                "remote": {
                    "title": "Live",
                    "desc": "Direct"
                }
            },
            "visual": {
                "welcome": "Welcome",
                "scan": "Scan",
                "detected": "Found",
                "notification": {
                    "app": "Maplyo",
                    "title": "Open"
                }
            }
        },
        "upsells": "Extras",
        "legalPage": {
            "titlePrivacy": "Privacy",
            "titleTerms": "Terms",
            "lastUpdated": "Updated:",
            "effectiveDate": "Date:",
            "privacy": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "items": [
                        "1"
                    ]
                },
                "section2": {
                    "title": "2",
                    "intro": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "content": "3"
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5",
                    "contact": "..."
                }
            },
            "terms": {
                "intro": "...",
                "section1": {
                    "title": "1",
                    "content": "1"
                },
                "section2": {
                    "title": "2",
                    "items": [
                        "2"
                    ]
                },
                "section3": {
                    "title": "3",
                    "intro": "3",
                    "items": [
                        "3"
                    ]
                },
                "section4": {
                    "title": "4",
                    "content": "4"
                },
                "section5": {
                    "title": "5",
                    "content": "5"
                },
                "section6": {
                    "title": "6",
                    "content": "6"
                }
            }
        },
        "pricingPage": {
            "hero": {
                "badge": "Top",
                "title1": "Pro,",
                "title2": "affordable.",
                "subtitle": "..."
            },
            "popular": "Top",
            "header": {
                "login": "Login",
                "signup": "Sign Up"
            },
            "compare": {
                "title": "Compare",
                "subtitle": "...",
                "features": {
                    "unlimited": "Unlimited",
                    "maps": "Maps",
                    "translation": "AI",
                    "domain": "Domain",
                    "support": "Support",
                    "whiteLabel": "White Label",
                    "analytics": "Analytics"
                },
                "values": {
                    "oneLang": "1 lang",
                    "unlimited": "Unlimited",
                    "emailSupport": "Email",
                    "whatsappSupport": "WhatsApp"
                }
            },
            "faqSection": {
                "title": "FAQ",
                "subtitle": "...",
                "items": [
                    {
                        "q": "Q",
                        "a": "A"
                    }
                ]
            },
            "trust": "Guarantee"
        },
        "builder": {
            "blocks": "blocks",
            "chooseTheme": "Choose Theme",
            "reset": "Reset",
            "viewGuide": "View Guide",
            "catEssentials": "Essentials",
            "catTravel": "Travel",
            "catBusiness": "Business",
            "guideStructure": "Structure",
            "startHere": "Start here",
            "selectBlocks": "Select blocks",
            "mobilePreview": "Mobile Preview",
            "blockProperties": "Properties",
            "editing": "Editing",
            "selectToEdit": "Select a block",
            "paramsHere": "Settings here",
            "backHome": "Back",
            "backDashboard": "Dashboard",
            "editorMode": "Editor Mode",
            "themeLabel": "Theme",
            "qrLabel": "QR",
            "createAccount": "Create Account",
            "saveCreateAccount": "Save",
            "online": "Online",
            "confirmUnpublish": "Unpublish?",
            "unpublish": "Unpublish",
            "publishSuccess": "Published!",
            "publishError": "Error",
            "publish": "Publish",
            "library": "Library",
            "mobileMode": "Mobile Mode",
            "emptyGuide": "Empty",
            "selectBlock": "Block?",
            "close": "Close",
            "blockTitle": "Block Title",
            "designTheme": "Design Themes",
            "upgradePro": "Upgrade Pro",
            "unlock": "Unlock",
            "unlockPublish": "Publish!",
            "publishDesc": "Upgrade Pro.",
            "seeOffers": "Offers",
            "themes": {
                "minimal-white": {
                    "name": "Minimal",
                    "desc": "White"
                },
                "soft-gray": {
                    "name": "Gray",
                    "desc": "Soft"
                },
                "ocean": {
                    "name": "Ocean",
                    "desc": "Blue"
                },
                "nature": {
                    "name": "Nature",
                    "desc": "Green"
                },
                "sunset": {
                    "name": "Sunset",
                    "desc": "Orange"
                }
            }
        },
        "showcase": {
            "tag": "Examples",
            "title": "Showcase",
            "description": "See.",
            "messageFrom": "From",
            "viewFull": "View",
            "example1": {
                "type": "Loft",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Great"
            },
            "example2": {
                "type": "Villa",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Top"
            },
            "example3": {
                "type": "Riad",
                "stat1": "1",
                "stat2": "2",
                "stat3": "3",
                "review": "Super"
            }
        },
        "guideLock": {
            "title": "Secure Access",
            "desc": "Unlock to see codes.",
            "demoCode": "Demo Code"
        },
        "auth": {
            "login": {
                "title": "Login",
                "subtitle": "Welcome",
                "email": "Email",
                "password": "Password",
                "forgot": "Forgot?",
                "error": "Error",
                "submit": "Login",
                "noAccount": "No account?",
                "createFree": "Create",
                "resetLink": "Reset"
            },
            "signup": {
                "title": "Sign Up",
                "subtitle": "Free",
                "successTitle": "Success",
                "successMsg": "Check your emails",
                "successDesc": "Link sent",
                "backToLogin": "Back",
                "firstName": "First Name",
                "lastName": "Last Name",
                "businessEmail": "Work Email",
                "businessName": "Company",
                "phone": "Phone",
                "passwordLabel": "Password",
                "passwordHint": "6+ chars",
                "submit": "Sign Up",
                "hasAccount": "Already registered?",
                "signIn": "Login"
            }
        }
    }
};

export type DictionaryShape = typeof DICTIONARY['fr'];
