export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-6 prose prose-slate">
            <h1 className="text-3xl font-bold mb-6">Conditions Générales d'Utilisation (CGU)</h1>
            <p className="text-sm text-gray-500 mb-8">En vigueur au : {new Date().toLocaleDateString()}</p>

            <section className="space-y-4">
                <p>
                    Bienvenue sur Maplyo. En accédant à notre plateforme ou en utilisant nos services, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation.
                </p>

                <h3 className="text-xl font-bold mt-8">1. Description du Service</h3>
                <p>Maplyo est une plateforme SaaS (Software as a Service) permettant aux hôtes et gestionnaires immobiliers de créer, héberger et partager des livrets d'accueil numériques pour leurs voyageurs.</p>

                <h3 className="text-xl font-bold mt-8">2. Abonnements et Paiements</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Facturation :</strong> Les services sont facturés mensuellement ou annuellement, d'avance.</li>
                    <li><strong>Annulation :</strong> Vous pouvez annuler votre abonnement à tout moment via votre tableau de bord. L'accès aux fonctionnalités Premium reste actif jusqu'à la fin de la période facturée.</li>
                    <li><strong>Remboursement :</strong> Nous offrons une garantie "Satisfait ou Remboursé" de 30 jours pour tout nouvel abonnement.</li>
                </ul>

                <h3 className="text-xl font-bold mt-8">3. Responsabilités de l'Utilisateur</h3>
                <p>Vous vous engagez à :</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Fournir des informations exactes lors de votre inscription.</li>
                    <li>Ne pas publier de contenu illicite, diffamatoire ou contraire aux bonnes mœurs dans vos guides.</li>
                    <li>Être seul responsable des informations (codes wifi, adresses) partagées avec vos voyageurs.</li>
                </ul>

                <h3 className="text-xl font-bold mt-8">4. Propriété Intellectuelle</h3>
                <p>Maplyo reste propriétaire de la plateforme, du code, et de la marque. Vous restez propriétaire du contenu (textes, photos) que vous ajoutez dans vos guides.</p>

                <h3 className="text-xl font-bold mt-8">5. Limitation de Responsabilité</h3>
                <p>Maplyo ne saurait être tenu responsable des dommages indirects, pertes de revenus ou problèmes survenus suite à l'utilisation d'informations contenues dans les guides créés par les utilisateurs.</p>

                <h3 className="text-xl font-bold mt-8">6. Droit Applicable</h3>
                <p>Ces conditions sont régies par le droit marocain. Tout litige relatif à leur interprétation et/ou à leur exécution relève des tribunaux compétents de Casablanca.</p>
            </section>
        </div>
    );
}
