import type { Metadata } from "next";
import Link from "next/link";
import NavbarPublique from "@/app/composants/NavbarPublique";
import { IconeFleche, IconePosition } from "@/app/composants/Icones";

export const metadata: Metadata = {
  title: "Marchés de Brazzaville | Prix Mboka",
  description:
    "Les marchés de Brazzaville suivis par Prix Mboka : Total, Poto-Poto, Moungali, Ouenzé et Talangaï.",
};

const MARCHES = ["Total", "Poto-Poto", "Moungali", "Ouenzé", "Talangaï"];

export default function PageMarches() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#fff6ee] to-white pb-16">
      <NavbarPublique />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Les marchés de Brazzaville
        </h1>
        <p className="mt-2 max-w-2xl text-slate-700">
          Prix Mboka suit les prix relevés par la communauté dans ces marchés.
          Choisissez celui qui est près de chez vous et comparez.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MARCHES.map((nom) => (
            <li
              key={nom}
              className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffeedd] text-[#ff7a00]">
                <IconePosition className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{nom}</h2>
                <p className="mt-1 text-sm text-slate-700">
                  Marché de Brazzaville
                </p>
              </div>
              <Link
                href="/prix"
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800"
              >
                Voir les prix
                <IconeFleche className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}