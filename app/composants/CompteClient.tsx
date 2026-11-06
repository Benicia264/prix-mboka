"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deconnexion } from "./actions";

type Etat =
  | { statut: "chargement" }
  | { statut: "visiteur" }
  | { statut: "connecte"; nom: string };

function initiales(nom: string) {
  const mots = nom.trim().split(/\s+/).filter(Boolean);
  if (mots.length === 0) return "?";
  const premiere = mots[0][0];
  const derniere = mots.length > 1 ? mots[mots.length - 1][0] : "";
  return (premiere + derniere).toUpperCase();
}

function useUtilisateur(): Etat {
  const [etat, setEtat] = useState<Etat>({ statut: "chargement" });

  useEffect(() => {
    let actif = true;

    fetch("/api/auth/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((s) => {
        if (!actif) return;
        if (s?.user) {
          setEtat({
            statut: "connecte",
            nom: s.user.name ?? s.user.email ?? "Compte",
          });
        } else {
          setEtat({ statut: "visiteur" });
        }
      })
      .catch(() => {
        if (actif) setEtat({ statut: "visiteur" });
      });

    return () => {
      actif = false;
    };
  }, []);

  return etat;
}

export function CompteApp() {
  const etat = useUtilisateur();

  if (etat.statut === "chargement") {
    return <span className="block h-10 w-24" aria-hidden="true" />;
  }

  if (etat.statut === "visiteur") {
    return (
      <Link
        href="/connexion"
        className="whitespace-nowrap rounded-full border border-[#ffb36b] bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-[#fff6ee]"
      >
        Se connecter
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span
        role="img"
        aria-label={`Connecté : ${etat.nom}`}
        title={etat.nom}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-700 text-sm font-bold text-white"
      >
        {initiales(etat.nom)}
      </span>
      <form action={deconnexion}>
        <button
          type="submit"
          aria-label="Se déconnecter"
          title="Se déconnecter"
          className="flex h-10 items-center gap-2 whitespace-nowrap rounded-full border border-[#ffb36b] bg-white px-3 text-sm font-semibold text-slate-900 hover:bg-[#fff6ee] sm:px-4"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5 sm:hidden"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
          <span className="hidden sm:inline">Se déconnecter</span>
        </button>
      </form>
    </div>
  );
}

export function BoutonsPublics() {
  const etat = useUtilisateur();

  if (etat.statut === "chargement") {
    return <span className="block h-9 w-32 sm:w-44" aria-hidden="true" />;
  }

  if (etat.statut === "connecte") {
    return (
      <Link
        href="/prix"
        className="whitespace-nowrap rounded-full bg-linear-to-r from-[#ff8a1f] to-[#ff6a00] px-4 py-2 text-xs font-semibold text-white shadow hover:brightness-95 sm:px-6 sm:py-2.5 sm:text-sm"
      >
        Accéder aux prix
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/connexion"
        className="whitespace-nowrap rounded-full border border-[#ffb36b] bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-[#fff6ee] sm:px-6 sm:py-2.5 sm:text-sm"
      >
        Se connecter
      </Link>
      <Link
        href="/inscription"
        className="whitespace-nowrap rounded-full bg-linear-to-r from-[#ff8a1f] to-[#ff6a00] px-3 py-2 text-xs font-semibold text-white shadow hover:brightness-95 sm:px-6 sm:py-2.5 sm:text-sm"
      >
        S’inscrire
      </Link>
    </>
  );
}