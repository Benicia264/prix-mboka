"use client";

import { useState } from "react";
import Image from "next/image";

type Marche = { id: string; name: string };

type Signalement = {
  id: string;
  price: number;
  comment: string | null;
  marketId: string;
  date: string;
  image: string;
  produit: string;
  unite: string;
  marche: string;
  auteur: string;
};

export default function ListePrix({
  marches,
  signalements,
}: {
  marches: Marche[];
  signalements: Signalement[];
}) {
  const [marcheChoisi, setMarcheChoisi] = useState<string | null>(null);

  const affiches = marcheChoisi
    ? signalements.filter((s) => s.marketId === marcheChoisi)
    : signalements;

  const classeBouton = (actif: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      actif
        ? "bg-[#ff7a00] text-white shadow-md"
        : "bg-white text-slate-700 border border-orange-200 hover:bg-orange-50"
    }`;

  return (
    <>
      {/* Filtres par marché */}
      <div className="my-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-pressed={marcheChoisi === null}
          onClick={() => setMarcheChoisi(null)}
          className={classeBouton(marcheChoisi === null)}
        >
          Tous les marchés
        </button>
        {marches.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={marcheChoisi === m.id}
            onClick={() => setMarcheChoisi(m.id)}
            className={classeBouton(marcheChoisi === m.id)}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Grille des cartes de produits */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {affiches.length === 0 ? (
          <p className="col-span-full py-10 text-center text-slate-500">
            Aucun prix signalé pour le moment.
          </p>
        ) : (
          affiches.map((s) => (
            <div
              key={s.id}
              className="flex flex-col justify-between overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-md transition-transform hover:-translate-y-1"
            >
              {/* Image du produit */}
              <div className="relative h-44 w-full bg-orange-50">
                <Image
                  src={s.image}
                  alt={s.produit}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Corps de la carte */}
              <div className="flex flex-col gap-2 p-4">
                <h2 className="text-base font-bold text-slate-900">
                  {s.produit}
                </h2>
                <p className="text-xs text-slate-500">Unité : {s.unite}</p>

                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl font-extrabold text-[#ff7a00]">
                    {s.price} F
                  </span>
                  <span className="rounded-lg bg-orange-50 px-2 py-1 text-xs font-medium text-slate-600">
                    {s.marche}
                  </span>
                </div>

                {s.comment && (
                  <p className="mt-1 line-clamp-2 text-xs italic text-slate-500">
                    &quot;{s.comment}&quot;
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400">
                  <span>Par {s.auteur}</span>
                  <span>{s.date}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}