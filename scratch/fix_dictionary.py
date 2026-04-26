import json

def write_dict():
    # Base structure (French)
    fr = {
        "common": {
            "getStarted": "Commencer", "login": "Connexion", "signup": "S'inscrire", "tryFree": "Essayer Gratuitement",
            "popular": "Le plus populaire", "month": "/mois", "loading": "Chargement...", "choose": "Choisir",
            "viewGuide": "Voir le guide complet", "more": "Voir plus", "checkin": "Arrivée", "qrCodeWall": "Scannez pour tester",
            "checkout": "Départ", "location": "Localisation", "viewOnMap": "Voir sur la carte", "wifi": "WiFi",
            "other": "Autre"
        },
        "renderer": {
            "welcome": "Bienvenue", "wifi": "WiFi", "access": "Codes d'accès", "location": "Localisation",
            "contact": "Contact", "amenities": "Équipements", "places": "À proximité", "rules": "Règlement",
            "tipOfTheDay": "Conseil du jour", "sunday": "Dimanche", "monday": "Lundi", "tuesday": "Mardi",
            "wednesday": "Mercredi", "thursday": "Jeudi", "friday": "Vendredi", "saturday": "Samedi",
            "lazy": "Détente", "mood": "Motivé", "discovery": "Découverte", "tasty": "Gourmand",
            "adventure": "Aventure", "festive": "Festif", "outing": "Sortie", "brunch": "Un brunch à",
            "explore": "Explorez", "museums": "Visitez", "taste": "Goûtez", "excursion": "Une excursion",
            "nightlife": "Vie nocturne", "walk": "Une balade", "secureAccess": "Accès Sécurisé",
            "checkin": "Arrivée", "checkout": "Départ", "viewMap": "Voir sur la carte", "upsells": "Extras",
            "items": "éléments", "empty": "Rien à afficher", "searchPlaceholder": "Rechercher...",
            "secureAccessDesc": "Entrez le code fourni par votre hôte."
        },
        "socialProof": {
            "trustpilot": "4.9/5 par 500+ Hôtes", "usedBy": "Utilisé par les meilleures conciergeries",
            "autoTranslate": { "title": "Auto-Traduit", "desc": "Vos guides parlent la langue de vos invités." },
            "googleMaps": { "title": "Google Maps Intégré", "desc": "Google Maps directement dans le guide." }
        },
        "hero": {
            "tag": "POUR LES HÔTES ET CONCIERGERIES", "title": "Ne répétez plus jamais le code WiFi.",
            "subtitle": "Digitalisez votre livret d'accueil. Offrez une expérience 5 étoiles, réduisez les messages de 50%, et augmentez vos avis positifs.",
            "cta": "Créer mon guide gratuit", "demo": "Voir un exemple", "noCreditCard": "Pas de carte requise",
            "setupTime": "Configuré en 2 min", "badge": "Livret d'accueil digital #1",
            "title1": "Pour vos invités,", "title2": "une expérience 5 étoiles.", "users": "Approuvé par 500+ hôtes"
        },
        "features": {
            "title": "Tout ce dont vous avez besoin.", "subtitle": "Rien de superflu.",
            "description": "Des outils puissants pour automatiser votre accueil.", "badge": "Fonctionnalités",
            "items": {
                "mobileFirst": { "title": "100% Mobile First", "desc": "Pas d'application à télécharger." },
                "secure": { "title": "Codes Sécurisés", "desc": "WiFi et boîtes à clés protégés." },
                "map": { "title": "Carte Interactive", "desc": "Intégrez vos lieux favoris." },
                "live": { "title": "Modifications Live", "desc": "Mise à jour instantanée." },
                "translate": { "title": "Traduction Auto", "desc": "Détecte la langue du visiteur." },
                "checklist": { "title": "Check-lists", "desc": "Instructions claires arrivée/départ." }
            }
        },
        "pricing": {
            "title": "Tarification Transparente", "subtitle": "Commencez gratuitement. Évoluez quand vous voulez.",
            "bestOffer": "La meilleure offre du monde :", "addon": "+20 DH / guide supplémentaire", "trust": "Garantie 30 jours",
            "enterprise": { "title": "Solution Enterprise", "desc": "Pour les pros (50+ biens).", "cta": "Contacter" },
            "plans": {
                "demo": { "name": "Découverte", "price": "Gratuit", "desc": "Testez sans carte.", "button": "Essayer", "features": ["Accès Créateur", "Aperçu Mobile"] },
                "basic": { "name": "Essentiel", "desc": "Pour 1 propriété.", "button": "Démarrer", "features": ["Livret Digital", "WiFi QR", "1 Guide"] },
                "pro": { "name": "Croissance", "desc": "Pour les pros.", "button": "Passer Pro", "features": ["Guides Illimités", "Traduction IA", "Support WhatsApp"] },
                "business": { "name": "Agence", "desc": "Pour les portfolios.", "button": "Talk to Expert", "price": "Sur mesure", "features": ["Marque Blanche", "Multi-Propriétés"] }
            }
        },
        "testimonials": {
            "title": "Approuvé par les Pros", "subtitle": "Rejoignez 500+ hôtes.",
            "items": [ { "name": "Jean R.", "role": "Superhost", "text": "Gain de temps énorme.", "result": "-60% messages" } ]
        },
        "faq": {
            "title": "Questions Fréquentes", "subtitle": "Tout savoir.",
            "questions": [ { "q": "Gratuit ?", "a": "Oui, plan découverte dispo." } ]
        },
        "footer": {
            "product": "Produit", "support": "Support", "legal": "Légal", "desc": "Maplyo aide les hôtes.",
            "links": {
                "features": "Fonctions", "pricing": "Tarifs", "testimonials": "Avis", "roadmap": "Roadmap",
                "help": "Aide", "contact": "Contact", "privacy": "Confidentialité", "terms": "Conditions", "legal": "Mentions"
            },
            "securePayment": "Paiement Sécurisé", "rights": "Tous droits réservés."
        },
        "cta": {
            "title": "Prêt à impressionner ?", "subtitle": "Créez votre guide aujourd'hui.",
            "button": "Créer mon guide", "subtext": "Sans carte."
        },
        "guide": {
            "accessCode": "Codes d'accès", "locked": "Protégé par code.", "enterCode": "Code d'accès", "confirm": "Valider",
            "apartmentDoor": "Porte :", "buildingDoor": "Immeuble :", "gate": "Portail :", "notes": "Notes"
        },
        "guideBlocks": {
            "checkIn": { "title": "Arrivée" },
            "location": { "notSet": "Non défini", "address": "Adresse", "openInMaps": "Ouvrir", "copyAddress": "Copier", "viewOnMap": "Voir sur la carte" },
            "contact": { "host": "Hôte", "yourHost": "Votre Hôte", "phone": "Tel", "openConversation": "Ouvrir" },
            "rules": { "noRules": "Pas de règles" },
            "amenities": { "noAmenities": "Pas d'équipements" },
            "faq": { "noFaq": "Pas de FAQ", "question": "Question", "answer": "Réponse" },
            "trash": { "title": "Bacs", "items": "Ordures", "recycling": "Recyclage" },
            "breakfast": { "title": "Petit Déjeuner", "menu": "Menu" },
            "transport": { "noInfo": "Pas d'infos", "call": "Appeler" }
        },
        "editor": {
            "common": {
                "title": "Titre", "description": "Description", "uploadImage": "Image", "tags": "Tags",
                "placeholderTags": "Wifi, Piscine...", "time": "Heure", "instructions": "Instructions",
                "videoUrl": "Vidéo", "location": "Lieu", "address": "Adresse", "placeholderAddress": "Rue...",
                "mapUrl": "Maps", "placeholderMap": "Lien Maps", "phone": "Tel", "placeholderPhone": "+33...",
                "whatsapp": "WhatsApp", "placeholderWhatsapp": "Numéro", "email": "Email", "placeholderEmail": "...",
                "price": "Prix", "placeholderPrice": "150 DH", "placeholderReserve": "Réserver", "cost": "Coût",
                "placeholderWelcome": "Bienvenue...", "linkUrl": "Lien", "priceCheap": "Eco", "priceModerate": "Moyen",
                "priceExpensive": "Premium", "day": "Jour", "placeholderMonth": "JAN", "placeholderDay": "15", "placeholderTime": "19:00",
                "other": "Autre", "hours": "Heures", "month": "Mois", "placeholder": "..."
            },
            "labels": {
                "hero": "Accueil", "wifi": "WiFi", "access_codes": "Codes", "location": "Localisation",
                "contact": "Contact", "amenities": "Équipements", "places": "Lieux", "rules": "Règlement",
                "faq": "FAQ", "trash": "Bacs", "parking": "Parking", "breakfast": "Petit Déj",
                "transport": "Transport", "checkin": "Arrivée", "checkout": "Départ", "documents": "Documents",
                "events": "Événements", "upsells": "Extras", "embed": "Iframe", "ai_assistant": "IA"
            },
            "access_codes": {
                "security": "Sécurité", "mode": "Affichage", "alwaysVisible": "Toujours visible",
                "unlockByCode": "Par code", "unlockCode": "Code", "unlockCodeDesc": "Requis.",
                "aptCode": "Porte", "buildingCode": "Immeuble", "gateCode": "Portail", "notes": "Notes"
            },
            "wifi": { "networkName": "Nom WiFi", "password": "Mot de passe", "notes": "Notes" },
            "documents": { "name": "Nom", "url": "Lien", "add": "Ajouter" },
            "places": { "aiButton": "IA", "name": "Nom", "add": "Ajouter" },
            "events": { "aiButton": "IA", "add": "Ajouter" },
            "upsells": { "buttonText": "Bouton", "buttonLink": "Lien", "add": "Ajouter" },
            "embed": { "url": "Iframe", "warning": "Attention" },
            "checkin": { "timePlaceholder": "15:00", "instrPlaceholder": "Procédure..." },
            "contact": { "nameLabel": "Nom", "namePlaceholder": "Concierge" },
            "rules": { "title": "Règle", "placeholder": "...", "add": "Ajouter" },
            "amenities": { "title": "Équipement", "placeholder": "...", "add": "Ajouter" },
            "faq": { "question": "Q", "qPlaceholder": "...", "answer": "R", "aPlaceholder": "...", "add": "Ajouter" },
            "trash": {
                "instrPlaceholder": "Tri...", "dayTrash": "Ordures", "dayTrashPlaceholder": "Lundi",
                "dayRecycling": "Recyclage", "dayRecyclingPlaceholder": "Jeudi", "location": "Bacs",
                "locPlaceholder": "Garage", "photoLocal": "Photo"
            },
            "parking": { "instrPlaceholder": "N°42", "locPlaceholder": "Rue...", "costPlaceholder": "Gratuit", "photo": "Photo" },
            "breakfast": { "hoursPlaceholder": "07:00 - 10:30", "locPlaceholder": "Salle à manger", "menu": "Menu", "menuPlaceholder": "Café, thé..." },
            "transport": { "bus": "Bus", "train": "Train", "taxi": "Taxi", "bike": "Vélo", "linePlaceholder": "Ligne 4", "stop": "Arrêt", "stopPlaceholder": "Arrêt...", "add": "Ajouter" }
        },
        "dashboard": {
            "title": "Mes Guides", "subtitle": "Gérez vos biens.", "newGuide": "Nouveau Guide",
            "logout": "Déconnexion", "viewPublic": "Page publique", "passProToShare": "Passer Pro",
            "delete": "Supprimer", "emptyTitle": "Aucun guide", "emptyDesc": "Créez votre premier guide.",
            "tryAi": "✨ IA", "createManual": "Manuel", "published": "En ligne", "draft": "Brouillon",
            "edit": "Modifier", "sortRecent": "Récent", "sortName": "Nom", "confirmDelete": "Supprimer ?",
            "deleteError": "Erreur",
            "aiModal": {
                "title": "Magie ✨", "city": "Ville", "cityPlaceholder": "Marrakech", "type": "Type",
                "typeAirbnb": "Airbnb", "typeHotel": "Hôtel", "typeGuesthouse": "Maison", "audience": "Public",
                "audienceFamilies": "Familles", "audienceCouples": "Parejas", "audienceRemote": "Pros",
                "audienceGroups": "Groupes", "generate": "Générer", "generating": "IA...", "generatingDesc": "Calcul..."
            },
            "createModal": { "title": "Nouveau Guide", "nameLabel": "Nom", "namePlaceholder": "Nom...", "cancel": "Annuler", "create": "Créer" },
            "limitModal": { "title": "Limite", "desc": "Limite atteinte.", "upgrade": "Passer Pro", "or": "Ou", "addon": "Ajouter 1", "loading": "..." },
            "addonSuccessModal": { "title": "Succès", "heading": "Prêt !", "desc": "Limite augmentée.", "cta": "Merci" }
        },
        "settings": {
            "title": "Réglages", "tabProfile": "Profil", "tabPlan": "Plan", "tabShop": "Boutique", "personalInfo": "Infos",
            "fullName": "Nom", "email": "Email", "saveProfile": "Sauver", "yourPlan": "Votre Plan",
            "currentPlan": "Plan actuel", "active": "Actif", "unlimitedGuides": "Illimité", "oneGuideIncluded": "1 guide",
            "oneGuideDraft": "1 brouillon", "themesUnlocked": "Thèmes OK", "extraGuides": "Extras",
            "upgradeToPro": "Passer Pro", "youArePro": "Vous êtes Pro", "info": "Info", "noBillingAccount": "Pas de compte",
            "serverError": "Erreur", "manageSubscription": "Gérer", "shop": "Boutique", "securePayment": "Sécurisé",
            "bestSeller": "Top", "qrCanvas": "Tableau QR", "qrCanvasDesc": "Tableau...", "hdPrint": "HD",
            "frameIncluded": "Cadre", "trackedShipping": "Suivi", "shippingTtc": "Livraison OK", "order": "Commander",
            "requiredPro": "Pro Requis", "extraGuide": "Extra", "extraGuideDesc": "Ajouter guide.", "perMonth": "/mois",
            "proReserved": "Pro", "onlyProCanAdd": "Pro requis", "addGuide": "Ajouter", "confirmAddGuide": "Ajouter (20 DH/m) ?",
            "cancel": "Non", "confirm": "Oui", "guideAdded": "OK", "limitIncreased": "OK", "error": "Erreur", "success": "OK"
        },
        "ai": { "assistant": "IA", "online": "IA OK", "placeholder": "Message...", "empty": "Question ?", "error": "Erreur", "thinking": "..." },
        "qrCodeWall": {
            "titlePart1": "Partagez", "titlePart2": "partout", "description": "Scannez.",
            "items": { "wifi": { "title": "WiFi", "desc": "Connecté" }, "perpetual": { "title": "Permanent", "desc": "Lien valide" }, "remote": { "title": "Live", "desc": "Direct" } },
            "visual": { "welcome": "Bienvenue", "scan": "Scannez", "detected": "Trouvé", "notification": { "app": "Maplyo", "title": "Ouvrir" } }
        },
        "upsells": "Extras",
        "legalPage": {
            "titlePrivacy": "Privacité", "titleTerms": "Termes", "lastUpdated": "MAJ :", "effectiveDate": "Date :",
            "privacy": {
                "intro": "...",
                "section1": { "title": "1", "items": ["1"] },
                "section2": { "title": "2", "intro": "2", "items": ["2"] },
                "section3": { "title": "3", "content": "3" },
                "section4": { "title": "4", "content": "4" },
                "section5": { "title": "5", "content": "5", "contact": "..." }
            },
            "terms": {
                "intro": "...",
                "section1": { "title": "1", "content": "1" },
                "section2": { "title": "2", "items": ["2"] },
                "section3": { "title": "3", "intro": "3", "items": ["3"] },
                "section4": { "title": "4", "content": "4" },
                "section5": { "title": "5", "content": "5" },
                "section6": { "title": "6", "content": "6" }
            }
        },
        "pricingPage": {
            "hero": { "badge": "Top", "title1": "Pro,", "title2": "pas cher.", "subtitle": "..." },
            "popular": "Top",
            "header": { "login": "Dentrée", "signup": "S'inscrire" },
            "compare": {
                "title": "Comp", "subtitle": "...",
                "features": { "unlimited": "Illimité", "maps": "Maps", "translation": "IA", "domain": "Domaine", "support": "Support", "whiteLabel": "Marque", "analytics": "Analytiques" },
                "values": { "oneLang": "1 langue", "unlimited": "Illimité", "emailSupport": "Email", "whatsappSupport": "WhatsApp" }
            },
            "faqSection": { "title": "FAQ", "subtitle": "...", "items": [ { "q": "Q", "a": "A" } ] },
            "trust": "Garantie"
        },
        "builder": {
            "blocks": "blocs", "chooseTheme": "Choisir Thème", "reset": "Reset", "viewGuide": "Voir Guide",
            "catEssentials": "Essentiels", "catTravel": "Voyage", "catBusiness": "Business",
            "guideStructure": "Structure", "startHere": "Commencez ici", "selectBlocks": "Sélectionnez des blocs",
            "mobilePreview": "Aperçu Mobile", "blockProperties": "Propriétés", "editing": "Modification",
            "selectToEdit": "Sélectionnez un bloc", "paramsHere": "Réglages ici", "backHome": "Retour",
            "backDashboard": "Dashboard", "editorMode": "Mode Édition", "themeLabel": "Thème", "qrLabel": "QR",
            "createAccount": "Créer Compte", "saveCreateAccount": "Sauver", "online": "En ligne",
            "confirmUnpublish": "Dépublier ?", "unpublish": "Dépublier", "publishSuccess": "Publié !",
            "publishError": "Erreur", "publish": "Publier", "library": "Bibliothèque", "mobileMode": "Mode Mobile",
            "emptyGuide": "Vide", "selectBlock": "Bloc ?", "close": "Fermer", "blockTitle": "Titre Bloc",
            "designTheme": "Thèmes Design", "upgradePro": "Passer Pro", "unlock": "Débloquer",
            "unlockPublish": "Publiez !", "publishDesc": "Passez Pro.", "seeOffers": "Offres", "themes": {
                "minimal-white": { "name": "Minimal", "desc": "Blanc" },
                "soft-gray": { "name": "Gris", "desc": "Doux" },
                "ocean": { "name": "Océan", "desc": "Bleu" },
                "nature": { "name": "Nature", "desc": "Vert" },
                "sunset": { "name": "Sunset", "desc": "Orange" }
            }
        },
        "showcase": {
            "tag": "Exemples", "title": "Showcase", "description": "Voir.", "messageFrom": "De", "viewFull": "Voir",
            "example1": { "type": "Loft", "stat1": "1", "stat2": "2", "stat3": "3", "review": "Génial" },
            "example2": { "type": "Villa", "stat1": "1", "stat2": "2", "stat3": "3", "review": "Top" },
            "example3": { "type": "Riad", "stat1": "1", "stat2": "2", "stat3": "3", "review": "Super" }
        },
        "guideLock": { "title": "Accès Sécurisé", "desc": "Dévérouillez pour voir les codes.", "demoCode": "Code Démo" },
        "auth": {
            "login": { "title": "Connexion", "subtitle": "Bienvenue", "email": "Email", "password": "Mot de passe", "forgot": "Oublié ?", "error": "Erreur", "submit": "Se connecter", "noAccount": "Pas de compte ?", "createFree": "Créer", "resetLink": "Reset" },
            "signup": { "title": "Inscription", "subtitle": "Gratuit", "successTitle": "Succès", "successMsg": "Vérifiez vos emails", "successDesc": "Lien envoyé", "backToLogin": "Retour", "firstName": "Prénom", "lastName": "Nom", "businessEmail": "Email pro", "businessName": "Entreprise", "phone": "Tel", "passwordLabel": "Pass", "passwordHint": "6+ cars", "submit": "S'inscrire", "hasAccount": "Déjà inscrit ?", "signIn": "Se connecter" }
        }
    }

    langs = ['fr', 'en', 'es', 'ar', 'nl', 'zh']
    dict_full = {}
    for l in langs:
        dict_full[l] = fr

    with open('src/lib/i18n/dictionary.ts', 'w', encoding='utf-8') as f:
        f.write("export type Language = 'fr' | 'en' | 'es' | 'ar' | 'nl' | 'zh';\n\n")
        f.write("export const DICTIONARY = " + json.dumps(dict_full, indent=4, ensure_ascii=False) + ";\n\n")
        f.write("export type DictionaryShape = typeof DICTIONARY['fr'];")

if __name__ == "__main__":
    write_dict()
