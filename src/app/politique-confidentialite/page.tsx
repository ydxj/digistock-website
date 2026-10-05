import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";
import { company } from "@/config/company";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: "Comment le site DigiStock et l'application DigiStock traitent vos données personnelles.",
  path: "/politique-confidentialite",
});

export default function PrivacyPage() {
  const analytics = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1" || Boolean(process.env.NEXT_PUBLIC_GA_ID);
  return (
    <LegalPage
      title="Politique de confidentialité"
      path="/politique-confidentialite"
      updatedAt="2026-10-05"
      intro="Cette page explique quelles données sont traitées lorsque vous utilisez ce site et l'application DigiStock, et comment vous pouvez exercer vos droits."
    >
      <h2>Qui sommes-nous ?</h2>
      <p>
        Le site DigiStock et l&apos;application DigiStock sont édités par {company.companyName} (<a href={company.website}>{company.websiteLabel}</a>).
        {company.email && (
          <>
            {" "}
            Pour toute question relative à vos données, écrivez-nous à <a href={`mailto:${company.email}`}>{company.email}</a>.
          </>
        )}
      </p>

      <h2>Les données de l&apos;application DigiStock</h2>
      <p>
        DigiStock est une application Windows qui enregistre vos données (produits, ventes, clients, fournisseurs, crédits) <strong>localement, sur
        votre ordinateur</strong>. Ces données ne sont pas envoyées sur nos serveurs pour le fonctionnement courant de l&apos;application.
      </p>
      <p>
        Vous restez responsable des données de vos clients que vous saisissez dans DigiStock, ainsi que de leurs sauvegardes. Nous vous recommandons de
        protéger l&apos;accès à votre ordinateur et de conserver vos sauvegardes en lieu sûr.
      </p>
      <p>
        Lorsque vous utilisez la fonction WhatsApp (Premium), les messages que vous validez sont transmis par WhatsApp, selon les conditions de ce
        service.
      </p>

      <h2>Les données collectées par ce site</h2>
      <ul>
        <li>
          <strong>Navigation :</strong>{" "}
          {analytics
            ? "nous utilisons une mesure d'audience pour comprendre l'utilisation du site (pages vues, clics sur le bouton de téléchargement). Ces statistiques sont agrégées."
            : "ce site n'utilise pas d'outil de mesure d'audience ni de cookie publicitaire."}
        </li>
        <li>
          <strong>Contact :</strong> le formulaire de contact prépare un e-mail dans votre propre messagerie. Aucune donnée n&apos;est enregistrée par
          le site lui-même ; nous recevons uniquement l&apos;e-mail que vous choisissez d&apos;envoyer.
        </li>
        <li>
          <strong>Hébergement :</strong> comme tout site web, notre hébergeur peut traiter des données techniques (adresse IP, type de navigateur) pour
          assurer la sécurité et le bon fonctionnement du service.
        </li>
      </ul>

      <h2>Durée de conservation</h2>
      <p>
        Les e-mails que vous nous envoyez sont conservés le temps nécessaire au traitement de votre demande et au suivi de la relation commerciale.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l&apos;égard du traitement des données à
        caractère personnel, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;opposition. Pour l&apos;exercer, contactez-nous
        depuis la page <Link href="/contact">Contact</Link>.
      </p>

      <h2>Modifications</h2>
      <p>Cette politique peut évoluer. La date de dernière mise à jour figure en haut de cette page.</p>
    </LegalPage>
  );
}
