import { Suspense } from "react";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import Logo from "./Logo";

function initiales(nom: string) {
  const mots = nom.trim().split(/\s+/).filter(Boolean);
  if (mots.length === 0) return "?";
  const premiere = mots[0][0];
  const derniere = mots.length > 1 ? mots[mots.length - 1][0] : "";
  return (premiere + derniere).toUpperCase();
}

async function Compte() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link
        href="/connexion"
        className="rounded-full border border-[#ffb36b] bg-white px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-[#fff6ee]"
      >
        Se connecter
      </Link>
    );
  }

  async function deconnexion() {
    "use server";
    await signOut({ redirectTo: "/connexion" });
  }

  const nom = session.user.name ?? session.user.email ?? "Compte";

  return (
    <div className="flex items-center gap-3">
      <span
        role="img"
        aria-label={`Connecté : ${nom}`}
        title={nom}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-700 text-sm font-bold text-white"
      >
        {initiales(nom)}
      </span>
      <form action={deconnexion}>
        <button
          type="submit"
          className="rounded-full border border-[#ffb36b] bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-[#fff6ee]"
        >
          Se déconnecter
        </button>
      </form>
    </div>
  );
}

export default function NavbarApp() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#ffe9d6] bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Prix Mboka, accueil">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 text-sm font-medium text-slate-900 md:flex">
          <Link href="/prix" className="px-4 py-2 hover:text-[#ff6a00]">
            Prix
          </Link>
          <Link href="/marches" className="px-4 py-2 hover:text-[#ff6a00]">
            Marchés
          </Link>
          <Link
            href="/mes-signalements"
            className="px-4 py-2 hover:text-[#ff6a00]"
          >
            Mes signalements
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/signaler"
            className="rounded-full bg-linear-to-r from-[#ff8a1f] to-[#ff6a00] px-5 py-2 text-sm font-semibold text-white shadow hover:brightness-95"
          >
            Signaler un prix
          </Link>
          <Suspense fallback={<span className="block h-10 w-40" />}>
            <Compte />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}