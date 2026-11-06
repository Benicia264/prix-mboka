import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import NavbarPublique from "@/app/composants/NavbarPublique";
import {
  IconeBouclier,
  IconeCommunaute,
  IconeCrayon,
  IconeFleche,
  IconeGraphique,
  IconeLecture,
  IconeMegaphone,
  IconePosition,
  IconeRecherche,
  IconeSourire,
} from "@/app/composants/Icones";

export const metadata = {
  title: "Prix Mboka - Trouvez le prix le plus bas à Brazzaville",
  description: "Prix Mboka vous permet de signaler et de comparer les prix des produits courants dans les marchés de Brazzaville.",
  openGraph: {
    title: "Prix Mboka - Trouvez le prix le plus bas à Brazzaville",
    description: "Prix Mboka vous permet de signaler et de comparer les prix des produits courants dans les marchés de Brazzaville.",
    url: "https://prix-mboka.vercel.app", // Remplacez par l'URL officielle de votre site en production
    siteName: "Prix Mboka",
    images: [
      {
        url: "https://prix-mboka.vercel.app/open.jpg?v=2", // URL absolue pointant vers votre image dans le dossier public
        width: 1200,
        height: 630,
        alt: "Aperçu de l'application Prix Mboka",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const MASQUE =
  "linear-gradient(to right, transparent 0%, black 16%), linear-gradient(to bottom, black 78%, transparent 100%)";

const FONDU: CSSProperties = {
  WebkitMaskImage: MASQUE,
  maskImage: MASQUE,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

const ATOUTS = [
  {
    icone: IconeGraphique,
    titre: "Comparez facilement",
    texte: "Découvrez en un coup d’œil les prix de chaque marché.",
  },
  {
    icone: IconePosition,
    titre: "Trouvez le marché idéal",
    texte: "Économisez près de chez vous à Brazzaville.",
  },
  {
    icone: IconeCommunaute,
    titre: "Contribuez",
    texte: "Signalez les prix et aidez votre communauté.",
  },
  {
    icone: IconeBouclier,
    titre: "Achetez malin",
    texte: "Faites des économies, simplement !",
  },
];

const ETAPES = [
  {
    n: 1,
    icone: IconeCrayon,
    titre: "Signalez un prix",
    texte: "Partagez le prix d’un produit dans un marché.",
  },
  {
    n: 2,
    icone: IconeGraphique,
    titre: "Consultez les prix",
    texte: "Voyez où c’est le moins cher parmi les marchés.",
  },
  {
    n: 3,
    icone: IconeSourire,
    titre: "Économisez !",
    texte: "Achetez au meilleur prix et faites des économies.",
  },
];

function Soulignement({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8C50 2 120 2 197 7"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Accueil() {
  return (
    <div
      className={`${poppins.className} relative min-h-screen overflow-x-clip bg-linear-to-br from-white via-[#fff6ee] to-white text-slate-900`}
    >
      <NavbarPublique />

      <main>
        <section className="relative lg:min-h-[35vw]">
          <div className="relative mx-auto aspect-[3/2] w-full max-w-xl lg:absolute lg:right-0 lg:top-0 lg:mx-0 lg:w-[54vw] lg:max-w-none">
            <Image
              src="/hero.jpg"
              alt="Aperçu de l'application Prix Mboka devant le pont de Brazzaville et un marché"
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              style={FONDU}
              className="object-contain mix-blend-multiply"
            />
          </div>

          <div className="relative z-10 px-4 pb-6 pt-6 lg:pl-[4.5vw] lg:pr-0 lg:pt-4">
            <div className="lg:w-[40vw]">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#ffe9d6] px-4 py-2 text-sm font-medium text-slate-900">
                <IconeMegaphone className="h-4 w-4 text-[#ff7a00]" />
                Une grande communauté, pour des prix plus justes !
              </p>

              <h1 className="mt-5 text-5xl font-extrabold leading-[1.08] text-slate-900 lg:text-[3.9vw]">
                <span className="block">Trouvez le</span>
                <span className="block">
                  <span className="text-[#ff7a00]">prix</span> le{" "}
                  <span className="text-[#ff7a00]">plus bas</span>
                </span>
                <span className="block">à Brazzaville</span>
              </h1>
              <Soulignement className="ml-2 mt-1 h-3 w-40 text-[#ff7a00]" />

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 lg:max-w-[36vw] lg:text-[1.15vw]">
                Prix Mboka vous permet de signaler les prix des produits courants
                (manioc, tomate, huile, poisson…) dans les marchés de Brazzaville
                (Total, Poto-Poto, Moungali…), et de voir instantanément où c’est
                le moins cher.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/prix"
                  className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#ff8a1f] to-[#ff6a00] px-7 py-3 font-semibold text-white shadow-lg hover:brightness-95"
                >
                  <IconeRecherche className="h-5 w-5" />
                  Explorer les prix
                  <IconeFleche className="h-5 w-5" />
                </Link>
                <Link
                  href="#etapes"
                  className="inline-flex items-center gap-3 font-semibold text-slate-900 hover:text-[#ff6a00]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ffd3a8] bg-white text-[#ff7a00] shadow-sm">
                    <IconeLecture className="h-4 w-4" />
                  </span>
                  Voir comment ça marche
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-6xl px-4">
          <ul className="grid gap-6 rounded-3xl bg-white p-6 shadow-lg sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[#ffe9d6]">
            {ATOUTS.map(({ icone: Icone, titre, texte }) => (
              <li
                key={titre}
                className="flex items-start gap-3 lg:pl-6 lg:first:pl-0"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ffeedd] text-[#ff7a00]">
                  <Icone className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{titre}</p>
                  <p className="text-sm text-slate-700">{texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="etapes"
          className="relative z-10 mx-auto max-w-6xl scroll-mt-4 px-4 py-14"
        >
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Trois étapes pour économiser
          </h2>
          <Soulignement className="mx-auto mt-1 h-3 w-40 text-[#ff7a00]" />

          <ol className="mt-10 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {ETAPES.map(({ n, icone: Icone, titre, texte }, i) => (
              <Fragment key={n}>
                <li className="flex items-center gap-4 rounded-2xl bg-[#fff0e3] p-5 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#ff8a1f] to-[#ff6a00] font-bold text-white">
                    {n}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                      <Icone className="h-5 w-5 text-[#ff7a00]" />
                      {titre}
                    </h3>
                    <p className="text-sm text-slate-700">{texte}</p>
                  </div>
                </li>
                {i < ETAPES.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="hidden items-center justify-center text-[#ffb36b] md:flex"
                  >
                    <IconeFleche className="h-6 w-6" />
                  </li>
                )}
              </Fragment>
            ))}
          </ol>
        </section>
      </main>

      <footer className="relative z-10 py-6 text-center text-sm text-slate-700">
        Prix Mboka · Signaler · Trouver
      </footer>

      <svg
        aria-hidden="true"
        viewBox="0 0 400 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 hidden h-36 w-80 lg:block"
      >
        <path
          d="M0 160V70C70 60 130 90 200 130c60 30 140 30 200 30H0z"
          fill="#ff8a1f"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 400 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 right-0 hidden h-28 w-72 lg:block"
      >
        <path
          d="M400 160V90C340 80 300 110 240 140c-30 12-70 20-140 20H400z"
          fill="#ff8a1f"
        />
      </svg>
    </div>
  );
}