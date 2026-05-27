import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const getSupabaseAdmin = () => createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const maxDuration = 60;

const STATIC_ARTICLES = [
    {
        slug: "livret-accueil-numerique-airbnb-guide-complet",
        title: "Livret d'Accueil Numérique Airbnb : Le Guide Complet pour Hôtes en 2025",
        excerpt: "Découvrez comment créer un livret d'accueil numérique Airbnb professionnel qui réduit vos messages répétitifs de 80% et obtient automatiquement de meilleures notes. Conseils, exemples et outils inclus.",
        seo_keywords: ["livret accueil numérique airbnb", "guide numérique airbnb", "welcome book airbnb", "livret hote airbnb"],
        published_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
        content: `<h2>Pourquoi un livret d'accueil numérique change tout</h2>
<p>En 2025, les voyageurs s'attendent à une expérience fluide et digitale. Les <strong>superhosts Airbnb</strong> qui ont adopté les livrets d'accueil numériques interactifs rapportent une réduction de 70 à 80% des questions répétitives de leurs voyageurs.</p>
<h2>Qu'est-ce qu'un livret d'accueil numérique Airbnb ?</h2>
<p>Un livret d'accueil numérique est une page web interactive, accessible via un lien ou un <strong>QR Code</strong>, qui regroupe toutes les informations dont vos voyageurs ont besoin :</p>
<ul>
<li>✅ <strong>Codes Wi-Fi</strong> et mots de passe</li>
<li>✅ <strong>Instructions d'arrivée</strong> (codes de la boîte à clés, digicode)</li>
<li>✅ <strong>Règles de la maison</strong> adaptées à votre logement</li>
<li>✅ <strong>Recommandations locales</strong> : restaurants, activités, transports</li>
<li>✅ <strong>Numéros d'urgence</strong> et contacts utiles</li>
</ul>
<h2>Les 5 bénéfices d'un livret numérique vs papier</h2>
<h3>1. Toujours à jour</h3>
<p>Vous modifiez le mot de passe Wi-Fi ? Changez le code de la boîte à clés ? Mettez à jour votre livret en 30 secondes. Vos voyageurs verront toujours la dernière version.</p>
<h3>2. Moins de messages, plus de sérénité</h3>
<p>Les études montrent que <strong>85% des questions des voyageurs</strong> concernent des informations déjà disponibles dans le livret d'accueil. Un bon livret numérique réduit drastiquement les interruptions.</p>
<h3>3. Meilleures notes et commentaires</h3>
<p>Les voyageurs bien informés ont une expérience plus fluide. Résultat : plus de 5 étoiles et des commentaires positifs.</p>
<h3>4. QR Code imprimable</h3>
<p>Placez le QR Code à l'entrée, dans la chambre, dans la cuisine. Vos voyageurs scannent et accèdent à tout instantanément.</p>
<h3>5. Économie de temps = revenus supplémentaires</h3>
<p>Chaque heure économisée en réponses aux messages peut être investie dans l'acquisition de nouveaux voyageurs.</p>
<h2>Comment créer votre livret d'accueil en moins de 60 secondes avec Maplyo</h2>
<ol>
<li><strong>Collez votre lien Airbnb</strong> dans Maplyo</li>
<li><strong>L'IA analyse votre annonce</strong> et pré-remplit automatiquement le livret</li>
<li><strong>Personnalisez</strong> les sections, ajoutez vos recommandations locales</li>
<li><strong>Partagez</strong> via QR Code ou lien</li>
</ol>
<p>Commencez gratuitement sur <strong>Maplyo</strong> avec votre premier guide inclus, sans carte bancaire.</p>`,
        translations: {
            en: {
                title: "Digital Airbnb Welcome Book: The Complete 2025 Guide for Hosts",
                excerpt: "Learn how to create a professional digital Airbnb welcome book that reduces repetitive messages by 80% and automatically earns better ratings.",
                content: "<h2>Why a digital welcome book changes everything</h2><p>In 2025, travelers expect a seamless digital experience. Airbnb superhosts who have adopted interactive digital welcome books report a 70-80% reduction in repetitive traveler questions. A digital welcome book is an interactive web page accessible via a link or QR Code that contains all the information your guests need. Create yours free on <strong>Maplyo</strong>.</p>"
            },
            es: { title: "Libro de Bienvenida Digital para Airbnb: La Guía Completa 2025", excerpt: "Descubra cómo crear un libro de bienvenida digital profesional para Airbnb que reduce los mensajes repetitivos en un 80%.", content: "<p>Ver versión en inglés o francés.</p>" },
            ar: { title: "دليل الترحيب الرقمي لـ Airbnb: الدليل الكامل لعام 2025", excerpt: "اكتشف كيفية إنشاء دليل ترحيب رقمي احترافي لـ Airbnb يقلل الرسائل المتكررة بنسبة 80%.", content: "<p>راجع النسخة الفرنسية أو الإنجليزية.</p>" },
            nl: { title: "Digitaal Welkomstboek voor Airbnb: De Complete Gids 2025", excerpt: "Ontdek hoe u een professioneel digitaal Airbnb-welkomstboek maakt dat herhalende berichten met 80% vermindert.", content: "<p>Zie Engelse of Franse versie.</p>" },
            zh: { title: "Airbnb 数字欢迎手册：2025年完整指南", excerpt: "了解如何创建专业的Airbnb数字欢迎手册，将重复消息减少80%。", content: "<p>请参阅英文或法文版本。</p>" }
        }
    },
    {
        slug: "guide-numerique-gite-augmenter-avis-5-etoiles",
        title: "Guide Numérique pour Gîte : Comment Obtenir Plus d'Avis 5 Étoiles",
        excerpt: "Transformez l'expérience de vos voyageurs dans votre gîte avec un guide numérique interactif. Découvrez les stratégies des meilleurs hôtes pour maximiser leurs avis positifs et fidéliser leurs clients.",
        seo_keywords: ["guide numérique gîte", "livret accueil gîte", "avis 5 étoiles gîte", "améliorer accueil gîte"],
        published_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
        content: `<h2>Le gîte moderne : l'expérience digitale au service de l'authenticité</h2>
<p>Les gîtes ruraux et de charme connaissent un essor extraordinaire. Les voyageurs cherchent l'authenticité, le dépaysement — mais ils restent des consommateurs modernes qui attendent une expérience fluide et sans friction.</p>
<h2>Pourquoi les gîtes ont plus besoin d'un guide numérique que les appartements urbains</h2>
<h3>L'isolement géographique</h3>
<p>Contrairement à un appartement en ville, votre gîte est peut-être à 20 minutes du bourg le plus proche. Vos voyageurs n'ont pas de voisins à qui demander de l'aide. Un <strong>guide numérique complet</strong> devient leur seule ressource.</p>
<h3>La complexité des équipements ruraux</h3>
<p>Chaudière à bois, poêle à granulés, fosse septique... Les équipements ruraux nécessitent souvent des explications détaillées que l'hôte ne peut pas donner en personne à chaque séjour.</p>
<h2>Les sections indispensables d'un guide numérique pour gîte</h2>
<ul>
<li>🔑 <strong>Arrivée & départ</strong> : procédure détaillée, codes d'accès, horaires</li>
<li>🛜 <strong>Wi-Fi</strong> : réseau et mot de passe</li>
<li>🏠 <strong>Équipements</strong> : mode d'emploi de chaque appareil important</li>
<li>🌿 <strong>Règles de la maison</strong> : jardinage, animaux, feux, tri des déchets</li>
<li>🛒 <strong>Courses</strong> : supermarchés, épiceries, marché, horaires</li>
<li>🍽️ <strong>Restaurants</strong> : vos adresses préférées avec contexte local</li>
<li>🥾 <strong>Activités</strong> : randonnées, visites, baignades, sorties</li>
<li>🚑 <strong>Urgences</strong> : médecin, pompiers, pharmacie, numéros locaux</li>
</ul>
<h2>La méthode des superhôtes pour les avis 5 étoiles</h2>
<p>Les hôtes de gîtes qui obtiennent systématiquement 5 étoiles ont compris qu'ils doivent <strong>anticiper toutes les questions</strong> avant que leurs voyageurs les posent. Le guide numérique est leur outil principal.</p>
<p><strong>Astuce professionnelle</strong> : ajoutez une section "Petites erreurs à éviter" — expliquez pourquoi il ne faut pas jeter certains produits dans la fosse septique, ou comment relancer le cumulus. Vos voyageurs vous en seront reconnaissants.</p>
<p>Avec <strong>Maplyo</strong>, créez votre guide numérique de gîte instantanément. Votre premier guide est <strong>entièrement gratuit</strong>.</p>`,
        translations: {
            en: { title: "Digital Guide for Holiday Cottages: How to Get More 5-Star Reviews", excerpt: "Transform your guests' experience at your cottage with an interactive digital guide.", content: "<h2>The modern cottage: digital experience in service of authenticity</h2><p>Rural cottages are booming. Travelers seek authenticity but remain modern consumers who expect smooth experiences. A digital guide becomes their essential resource — especially for rural equipment and local recommendations. Create yours free on <strong>Maplyo</strong>.</p>" },
            es: { title: "Guía Digital para Casa Rural: Cómo Obtener Más Reseñas de 5 Estrellas", excerpt: "Transforme la experiencia de sus viajeros en su casa rural con una guía digital interactiva.", content: "<p>Ver versión en inglés o francés.</p>" },
            ar: { title: "الدليل الرقمي للريف: كيف تحصل على المزيد من التقييمات 5 نجوم", excerpt: "حوّل تجربة ضيوفك في منزلك الريفي بدليل رقمي تفاعلي.", content: "<p>راجع النسخة الفرنسية أو الإنجليزية.</p>" },
            nl: { title: "Digitale Gids voor Vakantiehuizen: Meer 5-Sterren Beoordelingen", excerpt: "Transformeer de ervaring van uw gasten met een interactieve digitale gids.", content: "<p>Zie Engelse of Franse versie.</p>" },
            zh: { title: "乡村民宿数字指南：如何获得更多5星好评", excerpt: "用互动式数字指南提升您民宿客人的体验。", content: "<p>请参阅英文或法文版本。</p>" }
        }
    },
    {
        slug: "qr-code-logement-airbnb-partager-informations",
        title: "QR Code pour Logement Airbnb : Partager Vos Informations Sans Effort",
        excerpt: "Le QR Code révolutionne l'accueil des voyageurs Airbnb. Apprenez à créer et utiliser des QR Codes intelligents pour partager codes Wi-Fi, instructions d'arrivée et recommandations locales en quelques secondes.",
        seo_keywords: ["qr code airbnb", "qr code logement", "qr code wifi airbnb", "partager infos airbnb qr code"],
        published_at: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
        content: `<h2>Pourquoi le QR Code est devenu incontournable pour les hôtes Airbnb</h2>
<p>Depuis 2020, le <strong>QR Code</strong> est entré dans les habitudes de tous les consommateurs. Pour les hôtes Airbnb, c'est une révolution : plus besoin d'envoyer de longs messages d'accueil. <strong>Un QR Code affiché à l'entrée du logement</strong>, et vos voyageurs ont accès à tout en moins de 5 secondes.</p>
<h2>Les 5 usages du QR Code pour les hôtes Airbnb</h2>
<h3>1. Partager le Wi-Fi instantanément</h3>
<p>Un QR Code Wi-Fi permet à vos voyageurs de se connecter automatiquement en le scannant — <strong>sans taper une seule lettre</strong>.</p>
<h3>2. Accéder au guide d'accueil complet</h3>
<p>Placez un QR Code relié à votre <strong>livret d'accueil numérique</strong> dans l'entrée, la chambre et la cuisine. Vos voyageurs consultent les instructions et recommandations à tout moment.</p>
<h3>3. Instructions d'équipements spécifiques</h3>
<p>Placez un petit QR Code sur votre machine à café ou votre TV. En le scannant, vos voyageurs accèdent directement aux instructions de cet appareil.</p>
<h3>4. Recommandations et restaurants locaux</h3>
<p>Créez un QR Code qui ouvre directement la section "Mes Adresses Préférées" de votre guide.</p>
<h3>5. Formulaire d'avis post-séjour</h3>
<p>Un QR Code dans la chambre peut rediriger vos voyageurs vers votre page d'avis Airbnb, <strong>augmentant significativement le taux de notation</strong>.</p>
<h2>Créez votre QR Code avec Maplyo</h2>
<p>Avec <strong>Maplyo</strong>, chaque guide numérique génère automatiquement un QR Code prêt à imprimer en haute résolution. Commencez gratuitement dès aujourd'hui.</p>`,
        translations: {
            en: { title: "QR Code for Airbnb: Share Your Info Effortlessly", excerpt: "QR Codes are revolutionizing how Airbnb hosts share information with guests.", content: "<h2>Why QR codes are essential for Airbnb hosts</h2><p>One QR Code at the entrance gives guests everything they need in under 5 seconds: Wi-Fi, check-in instructions, house rules, local recommendations. With <strong>Maplyo</strong>, every digital guide automatically generates a print-ready QR Code.</p>" },
            es: { title: "Código QR para Airbnb: Comparte tu Información sin Esfuerzo", excerpt: "Los códigos QR revolucionan la forma en que los anfitriones comparten información.", content: "<p>Ver versión en inglés o francés.</p>" },
            ar: { title: "رمز QR لـ Airbnb: شارك معلوماتك بسهولة", excerpt: "ثورة رموز QR في مشاركة المعلومات مع ضيوف Airbnb.", content: "<p>راجع النسخة الفرنسية أو الإنجليزية.</p>" },
            nl: { title: "QR Code voor Airbnb: Deel uw Informatie Moeiteloos", excerpt: "QR-codes revolutioneren hoe Airbnb-hosts informatie delen.", content: "<p>Zie Engelse of Franse versie.</p>" },
            zh: { title: "Airbnb二维码：轻松分享您的信息", excerpt: "二维码正在改变Airbnb房东与客人分享信息的方式。", content: "<p>请参阅英文或法文版本。</p>" }
        }
    },
    {
        slug: "automatiser-accueil-voyageurs-airbnb-conciergerie",
        title: "Automatiser l'Accueil Voyageurs Airbnb : Le Guide des Conciergeries",
        excerpt: "Gérez plusieurs logements Airbnb sans perdre la tête. Découvrez les outils et stratégies des meilleures conciergeries pour automatiser l'accueil et scaler leur business.",
        seo_keywords: ["automatiser accueil airbnb", "conciergerie airbnb", "gestion logement airbnb automatique", "outil hote airbnb"],
        published_at: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
        content: `<h2>Le défi des conciergeries : scaler sans sacrifier la qualité</h2>
<p>Gérer 1 ou 2 logements Airbnb, ça s'improvise. Gérer 10, 20 ou 50 logements, ça se systématise. Les conciergeries qui réussissent ont toutes un point commun : <strong>elles ont automatisé tout ce qui peut l'être</strong>.</p>
<h2>Les 4 piliers de l'automatisation de l'accueil</h2>
<h3>1. Le guide numérique par logement</h3>
<p>Chaque logement doit avoir son propre <strong>guide numérique personnalisé</strong> avec ses informations spécifiques : code de la boîte à clés, Wi-Fi dédié, règles propres au logement.</p>
<h3>2. Les messages automatiques Airbnb</h3>
<p>Configurez des messages automatiques à des moments clés : confirmation, J-3, jour d'arrivée, jour de départ. Chaque message contient le lien vers le guide numérique.</p>
<h3>3. La boîte à clés connectée</h3>
<p>Les boîtes à clés à code éliminent les remises de clés en main propre. Couplées à votre guide numérique, elles permettent une arrivée 100% autonome.</p>
<h3>4. L'assistant IA pour les questions courantes</h3>
<p>Un bon guide numérique répond à 85% des questions <strong>avant même qu'elles soient posées</strong>.</p>
<h2>Combien de temps peut-on gagner ?</h2>
<p>Sur 200 séjours par mois (environ 10 logements), les conciergeries économisent en moyenne <strong>plus de 80 heures par mois</strong> — soit 2 semaines de travail à temps plein.</p>
<p><strong>Maplyo</strong> permet aux conciergeries de créer des guides numériques en moins de 60 secondes grâce à l'IA. Il suffit de coller le lien Airbnb du logement.</p>`,
        translations: {
            en: { title: "Automating Airbnb Guest Welcome: The Property Manager's Guide", excerpt: "Manage multiple Airbnb properties without losing your mind. Automate check-in and scale your business.", content: "<h2>The property management challenge</h2><p>Successful property managers automate everything possible. A digital guide per property is the foundation — saving 80+ hours per month across 10 properties. Create yours in 60 seconds on <strong>Maplyo</strong>.</p>" },
            es: { title: "Automatizar la Bienvenida en Airbnb: La Guía para Gestores", excerpt: "Gestione múltiples propiedades de Airbnb sin perder la cabeza.", content: "<p>Ver versión en inglés o francés.</p>" },
            ar: { title: "أتمتة استقبال ضيوف Airbnb: دليل شركات الإدارة", excerpt: "إدارة عقارات Airbnb متعددة بدون إجهاد.", content: "<p>راجع النسخة الفرنسية أو الإنجليزية.</p>" },
            nl: { title: "Airbnb Gast Ontvangst Automatiseren: De Gids voor Beheerders", excerpt: "Beheer meerdere Airbnb-woningen zonder het hoofd te verliezen.", content: "<p>Zie Engelse of Franse versie.</p>" },
            zh: { title: "自动化Airbnb迎客流程：房产管理者指南", excerpt: "管理多个Airbnb房源而不手忙脚乱。", content: "<p>请参阅英文或法文版本。</p>" }
        }
    },
    {
        slug: "revenus-extras-upsells-hotes-airbnb-2025",
        title: "Générer des Revenus Extras en tant qu'Hôte Airbnb : Les Upsells qui Marchent en 2025",
        excerpt: "Découvrez comment les meilleurs hôtes Airbnb augmentent leurs revenus de 15 à 30% en proposant des services additionnels à leurs voyageurs. Petit-déjeuner, transfert aéroport, expériences locales : le guide complet.",
        seo_keywords: ["revenus extras airbnb", "upsell airbnb hote", "augmenter revenus location courte duree", "services additionnels airbnb"],
        published_at: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
        content: `<h2>L'upsell Airbnb : la stratégie des revenus que peu d'hôtes exploitent</h2>
<p>La grande majorité des hôtes Airbnb se concentrent uniquement sur le prix de la nuitée. Pourtant, les hôtes les plus rentables ont compris qu'il existe une mine d'or inexploitée : <strong>les services additionnels</strong>.</p>
<h2>Les upsells qui fonctionnent le mieux</h2>
<h3>🥐 Le kit petit-déjeuner ou panier de bienvenue</h3>
<p>Un panier de bienvenue à 15-25€ avec des produits locaux. Le coût réel est de 8-12€. La perception de valeur pour le voyageur est bien supérieure — c'est une <strong>attention personnalisée</strong> qui génère immédiatement une note 5 étoiles.</p>
<h3>🚗 Le service de transfert aéroport/gare</h3>
<p>Dans une ville touristique, proposer un transfert à 25-50€ est une valeur ajoutée immédiate.</p>
<h3>⏰ Early check-in et late check-out</h3>
<p>Facturez-les 10-20€ selon la contrainte pour votre planning de ménage. Ces options sont très demandées.</p>
<h3>🎟️ Les expériences locales</h3>
<p>Cours de cuisine, dégustation de vins, location de vélos — avec une commission de 10-20% sans effort supplémentaire.</p>
<h2>Comment intégrer les upsells dans votre guide numérique Maplyo</h2>
<p>Créez une section "Services Supplémentaires" dans votre guide Maplyo avec description, prix et lien de contact. Vos voyageurs pourront commander directement lors de leur séjour.</p>
<p>Avec 3-4 upsells simples, un hôte à 2000€/mois peut facilement atteindre <strong>2300 à 2600€</strong> — soit plusieurs milliers d'euros supplémentaires par an.</p>`,
        translations: {
            en: { title: "Generate Extra Revenue as an Airbnb Host: Upsells That Work in 2025", excerpt: "Discover how top Airbnb hosts increase revenue by 15-30% with add-on services.", content: "<h2>Airbnb upsells: the revenue strategy few hosts exploit</h2><p>Welcome baskets, airport transfers, early check-in, local experiences — these can add 15-30% to your revenue. Display them in your digital guide on <strong>Maplyo</strong> so guests can book directly during their stay.</p>" },
            es: { title: "Generar Ingresos Extra como Anfitrión de Airbnb: Los Upsells que Funcionan", excerpt: "Cómo los mejores anfitriones aumentan sus ingresos en un 15-30% con servicios adicionales.", content: "<p>Ver versión en inglés o francés.</p>" },
            ar: { title: "توليد دخل إضافي كمضيف على Airbnb: الخدمات التي تنجح", excerpt: "كيف يزيد أفضل مضيفي Airbnb دخلهم بنسبة 15-30%.", content: "<p>راجع النسخة الفرنسية أو الإنجليزية.</p>" },
            nl: { title: "Extra Inkomsten als Airbnb-Host: Upsells die Werken in 2025", excerpt: "Hoe Airbnb-hosts hun inkomsten met 15-30% verhogen met aanvullende diensten.", content: "<p>Zie Engelse of Franse versie.</p>" },
            zh: { title: "作为Airbnb房东创造额外收入：2025年有效的附加服务", excerpt: "顶级Airbnb房东如何通过附加服务将收入提高15-30%。", content: "<p>请参阅英文或法文版本。</p>" }
        }
    },
    {
        slug: "checklist-preparation-logement-airbnb-professionnelle",
        title: "Checklist de Préparation Logement Airbnb : Le Standard des Superhosts",
        excerpt: "La checklist complète que les superhosts Airbnb utilisent avant chaque séjour pour garantir une expérience 5 étoiles. Ménage, équipements, livret d'accueil, détails qui font la différence.",
        seo_keywords: ["checklist airbnb", "preparation logement airbnb", "superhost airbnb checklist", "entre deux sejours airbnb"],
        published_at: new Date(Date.now() - 18 * 24 * 3600 * 1000).toISOString(),
        content: `<h2>Pourquoi une checklist est l'outil secret des superhosts</h2>
<p>La différence entre un hôte ordinaire et un superhost tient à la <strong>constance de l'expérience</strong>. Chaque voyageur doit trouver le logement dans le même état parfait. La checklist est votre standard de qualité opérationnel.</p>
<h2>La checklist complète : avant chaque séjour</h2>
<h3>🧹 Ménage</h3>
<ul>
<li>☐ Sol aspiré et lavé dans toutes les pièces</li>
<li>☐ Salle de bain désinfectée (toilettes, lavabo, douche)</li>
<li>☐ Cuisine nettoyée (plaques, micro-ondes, évier)</li>
<li>☐ Réfrigérateur vidé et essuyé</li>
<li>☐ Poubelles vidées, sacs remplacés</li>
</ul>
<h3>🛏️ Literie et linge</h3>
<ul>
<li>☐ Draps changés et repassés</li>
<li>☐ Serviettes de bain propres, pliées et présentées</li>
</ul>
<h3>🏠 Équipements et consommables</h3>
<ul>
<li>☐ Vérifier que tous les équipements fonctionnent (TV, WiFi, climatisation)</li>
<li>☐ Reconstituer les consommables (savon, shampoing, papier toilette)</li>
<li>☐ Café, thé, sachets de sucre en place</li>
</ul>
<h3>📱 Guide numérique et QR Code</h3>
<ul>
<li>☐ Vérifier que le QR Code du guide numérique est affiché et lisible</li>
<li>☐ Mettre à jour le code de la boîte à clés dans le guide si changé</li>
<li>☐ Vérifier que le Wi-Fi fonctionne et que le mot de passe est à jour</li>
</ul>
<h3>🌟 Les détails qui font la différence</h3>
<ul>
<li>☐ Petit mot de bienvenue personnalisé</li>
<li>☐ Quelques bonbons ou chocolats en cadeau</li>
<li>☐ Thermostat réglé sur la bonne température</li>
</ul>
<p>Créez et partagez votre guide numérique avec votre équipe sur <strong>Maplyo</strong>. Assurez-vous qu'il est toujours à jour avant chaque séjour. Premier guide gratuit, sans carte bancaire.</p>`,
        translations: {
            en: { title: "Airbnb Property Preparation Checklist: The Superhost Standard", excerpt: "The complete checklist superhosts use before every stay to guarantee a 5-star experience.", content: "<h2>Why a checklist is the secret tool of superhosts</h2><p>Consistency is what separates superhosts from average hosts. A preparation checklist is your operational quality standard. Don't forget to verify your digital guide QR Code is displayed and up-to-date — create yours free on <strong>Maplyo</strong>.</p>" },
            es: { title: "Lista de Verificación para Preparar tu Alojamiento Airbnb", excerpt: "La lista completa que usan los superhosts antes de cada estancia.", content: "<p>Ver versión en inglés o francés.</p>" },
            ar: { title: "قائمة تحضير شقة Airbnb: معيار Superhost", excerpt: "القائمة الكاملة للتحضير قبل كل إقامة لضمان تجربة 5 نجوم.", content: "<p>راجع النسخة الفرنسية أو الإنجليزية.</p>" },
            nl: { title: "Checklist Airbnb Voorbereiding: De Superhost-Standaard", excerpt: "De complete checklist voor elke verblijf om een 5-sterren ervaring te garanderen.", content: "<p>Zie Engelse of Franse versie.</p>" },
            zh: { title: "Airbnb房源准备清单：超级房东的标准", excerpt: "超级房东在每次入住前使用的完整清单，确保5星级体验。", content: "<p>请参阅英文或法文版本。</p>" }
        }
    }
];

export async function GET(req: Request) {
    // Allow GET with secret param for easy browser trigger
    const url = new URL(req.url);
    const secret = url.searchParams.get("secret");
    const adminSecret = process.env.ADMIN_SECRET_KEY;
    if (adminSecret && secret !== adminSecret) {
        return NextResponse.json({ error: "Unauthorized. Pass ?secret=YOUR_ADMIN_SECRET_KEY" }, { status: 401 });
    }
    return runSeed();
}

export async function POST(req: Request) {
    const authHeader = req.headers.get("Authorization");
    const adminSecret = process.env.ADMIN_SECRET_KEY;
    if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return runSeed();
}

async function runSeed() {
    const supabase = getSupabaseAdmin();
    const results: { slug: string; status: string; error?: string }[] = [];

    for (const article of STATIC_ARTICLES) {
        // Check if slug already exists
        const { data: existing } = await supabase
            .from("blog_posts")
            .select("id")
            .eq("slug", article.slug)
            .single();

        if (existing) {
            results.push({ slug: article.slug, status: "skipped (already exists)" });
            continue;
        }

        const { error } = await supabase.from("blog_posts").insert({
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            seo_keywords: article.seo_keywords,
            translations: article.translations,
            generated_by_ai: false,
            published_at: article.published_at
        });

        if (error) {
            results.push({ slug: article.slug, status: "error", error: error.message });
        } else {
            results.push({ slug: article.slug, status: "inserted" });
        }
    }

    const inserted = results.filter(r => r.status === "inserted").length;
    const skipped = results.filter(r => r.status.startsWith("skipped")).length;
    const errors = results.filter(r => r.status === "error").length;

    return NextResponse.json({
        success: true,
        summary: { inserted, skipped, errors, total: STATIC_ARTICLES.length },
        results
    });
}
