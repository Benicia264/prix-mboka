import type { Metadata } from "next";
import Link from "next/link";
import NavbarPublique from "@/app/composants/NavbarPublique";
import {
  IconeCrayon,
  IconeFleche,
  IconeGraphique,
  IconeSourire,
} from "@/app/composants/Icones";

export const metadata: Metadata = {
  title: "Comment ça marche | Prix Mboka",
  description:
    "Signalez un prix, consultez les prix par marché et économisez à Brazzaville avec Prix Mboka.",
};

const ETAPES = [
  {
    n: 1,
    icone: IconeCrayon,
    titre: "Signalez un prix",
    texte:
      "Connectez-vous, choisissez un produit et un marché, indiquez le prix relevé et ajoutez une remarque si besoin.",
  },
  {
    n: 2,
    icone: IconeGraphique,
    titre: "Consultez les prix",
    texte:
      "Parcourez les derniers prix signalés et filtrez par marché pour voir où c’est le moins cher.",
  },
  {
    n: 3,
    icone: IconeSourire,
    titre: "Économisez !",
    texte:
      "Faites vos achats au meilleur prix et retrouvez vos propres signalements dans « Mes signalements ».",
  },
];

export default function PageCommentCaMarche() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#fff6ee] to-white pb-16">
      <NavbarPublique />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Comment ça marche ?
        </h1>
        <p className="mt-2 max-w-2xl text-slate-700">
          Trois étapes suffisent pour aider la communauté et acheter au meilleur
          prix à Brazzaville.
        </p>

        <ol className="mt-8 flex flex-col gap-4">
          {ETAPES.map(({ n, icone: Icone, titre, texte }) => (
            <li
              key={n}
              className="flex items-start gap-4 rounded-3xl bg-white p-6 shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#ff8a1f] to-[#ff6a00] font-bold text-white">
                {n}
              </span>
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Icone className="h-5 w-5 text-[#ff7a00]" />
                  {titre}
                </h2>
                <p className="mt-1 text-slate-700">{texte}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/signaler"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#ff8a1f] to-[#ff6a00] px-6 py-3 font-semibold text-white shadow hover:brightness-95"
          >
            Signaler un prix
            <IconeFleche className="h-5 w-5" />
          </Link>
          <Link
            href="/prix"
            className="inline-flex items-center gap-2 rounded-full border border-[#ffb36b] bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-[#fff6ee]"
          >
            Explorer les prix
          </Link>
        </div>
      </main>
    </div>
  );
}