import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";
import { company } from "@/config/company";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Conditions d'utilisation",
  description: "Conditions d'utilisation du site DigiStock et principes d'utilisation de l'application DigiStock.",
  path: "/conditions-utilisation",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Conditions d'utilisation"
      path="/conditions-utilisation"
      updatedAt="2026-10-05"
      intro="Ces conditions encadrent l'utilisation de ce site et de l'application DigiStock, éditée par DigiStudio."
    >
      <h2>Objet</h2>
      <p>
        Ce site présente DigiStock, logiciel de gestion de stock et de caisse pour Windows édité par {company.companyName}, et permet de le
        télécharger. En utilisant ce site ou l&apos;application, vous acceptez les présentes conditions.
      </p>

      <h2>Utilisation du site</h2>
      <p>
        Les contenus du site (textes, captures d&apos;écran, logo, documentation) sont protégés. Vous pouvez les consulter et les partager par lien,
        mais pas les reproduire à des fins commerciales sans autorisation.
      </p>

      <h2>Licence d&apos;utilisation de DigiStock</h2>
      <ul>
        <li>
          <strong>DigiStock Free</strong> peut être utilisé gratuitement, sans limite de produits ni de ventes, pour les besoins de votre activité.
        </li>
        <li>
          <strong>DigiStock Premium</strong> est soumis aux conditions communiquées lors de sa souscription. Voir la page{" "}
          <Link href="/tarifs">Tarifs</Link>.
        </li>
        <li>Il est interdit de décompiler, modifier, revendre ou redistribuer l&apos;application sans accord écrit de {company.companyName}.</li>
      </ul>

      <h2>Vos données et vos sauvegardes</h2>
      <p>
        Les données saisies dans DigiStock sont enregistrées sur votre ordinateur. Vous êtes responsable de leur sauvegarde régulière et de la
        sécurité de l&apos;ordinateur sur lequel l&apos;application est installée. La documentation explique comment{" "}
        <Link href="/docs/creer-une-sauvegarde">créer une sauvegarde</Link>.
      </p>

      <h2>Responsabilité</h2>
      <p>
        DigiStock est un outil d&apos;aide à la gestion. Les chiffres qu&apos;il affiche dépendent des informations que vous saisissez. Il ne remplace
        pas les conseils d&apos;un comptable, notamment pour vos obligations fiscales et vos mentions de facturation. {company.companyName} s&apos;efforce
        d&apos;assurer le bon fonctionnement de l&apos;application mais ne peut garantir l&apos;absence totale d&apos;erreurs.
      </p>

      <h2>Mises à jour</h2>
      <p>
        {company.companyName} peut publier des mises à jour de l&apos;application et modifier ces conditions. La date de dernière mise à jour figure
        en haut de cette page.
      </p>

      <h2>Droit applicable</h2>
      <p>Ces conditions sont soumises au droit marocain.</p>

      <h2>Contact</h2>
      <p>
        Pour toute question, rendez-vous sur la page <Link href="/contact">Contact</Link>.
      </p>
    </LegalPage>
  );
}
