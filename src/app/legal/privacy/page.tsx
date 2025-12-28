export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-6 prose prose-slate">
            <h1>Politique de Confidentialité</h1>
            <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>

            <h3>1. Collecte des données</h3>
            <p>Nous collectons les informations nécessaires au bon fonctionnement du service (email, informations de paiement via Stripe).</p>

            <h3>2. Utilisation</h3>
            <p>Vos données servent uniquement à la gestion de vos guides et abonnements.</p>

            <h3>3. Partage</h3>
            <p>Aucune donnée n'est revendue à des tiers.</p>

            <h3>4. Contact</h3>
            <p>Pour toute question : support@maplyo.com</p>
        </div>
    );
}
