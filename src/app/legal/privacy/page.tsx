export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-6 prose prose-slate">
            <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
            <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

            <section className="space-y-4">
                <p>
                    La présente politique de confidentialité décrit comment <strong>Maplyo</strong> ("nous", "notre") collecte, utilise et protège vos données personnelles, conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.
                </p>

                <h3 className="text-xl font-bold mt-8">1. Collecte des Données</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Données d'identification :</strong> Nom, prénom, adresse email.</li>
                    <li><strong>Données de transaction :</strong> Historique de paiements (traités de manière sécurisée par Stripe, nous ne stockons pas vos données bancaires complètes).</li>
                    <li><strong>Données d'utilisation :</strong> Informations sur la création et la consultation des guides numériques.</li>
                </ul>

                <h3 className="text-xl font-bold mt-8">2. Finalités du Traitement</h3>
                <p>Vos données sont collectées pour :</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Fournir et gérer le service de guide numérique.</li>
                    <li>Gérer votre abonnement et la facturation.</li>
                    <li>Vous communiquer les mises à jour importantes du service.</li>
                    <li>Améliorer nos fonctionnalités grâce à des statistiques anonymisées.</li>
                </ul>

                <h3 className="text-xl font-bold mt-8">3. Partage des Données</h3>
                <p>Nous ne vendons <strong>jamais</strong> vos données.</p>
                <p>Elles peuvent être partagées uniquement avec nos prestataires techniques essentiels (ex: Stripe pour les paiements, Supabase pour l'hébergement, Resend pour les emails) qui sont tenus à une stricte confidentialité.</p>

                <h3 className="text-xl font-bold mt-8">4. Sécurité</h3>
                <p>Nous mettons en œuvre des mesures de sécurité techniques (chiffrement SSL, protocoles sécurisés) pour protéger vos données contre tout accès non autorisé.</p>

                <h3 className="text-xl font-bold mt-8">5. Vos Droits</h3>
                <p>Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition concernant vos données.</p>
                <p>Pour exercer ce droit, contactez-nous à : <strong>support@maplyo.com</strong></p>
            </section>
        </div>
    );
}
