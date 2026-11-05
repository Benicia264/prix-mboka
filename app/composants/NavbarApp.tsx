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

const PASTILLE =
  "shrink-0 whitespace-nowrap rounded-full border border-[#ffd9b8] bg-white px-4 py-1.5 text-sm font-medium text-slate-900 hover:bg-[#fff6ee]";

async function Compte() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link
        href="/connexion"
        className="whitespace-nowrap rounded-full border border-[#ffb36b] bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-[#fff6ee]"
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
    <div className="flex items-center gap-2 sm:gap-3">
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

export default function NavbarApp() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#ffe9d6] bg-white">
      <nav className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" aria-label="Prix Mboka, accueil" className="shrink-0">
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

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/signaler"
              className="hidden whitespace-nowrap rounded-full bg-linear-to-r from-[#ff8a1f] to-[#ff6a00] px-5 py-2 text-sm font-semibold text-white shadow hover:brightness-95 sm:inline-flex"
            >
              Signaler un prix
            </Link>
            <Suspense fallback={<span className="block h-10 w-24" />}>
              <Compte />
            </Suspense>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 md:hidden">
          <Link href="/prix" className={PASTILLE}>
            Prix
          </Link>
          <Link href="/marches" className={PASTILLE}>
            Marchés
          </Link>
          <Link href="/mes-signalements" className={PASTILLE}>
            Mes signalements
          </Link>
          <Link
            href="/signaler"
            className="shrink-0 whitespace-nowrap rounded-full bg-linear-to-r from-[#ff8a1f] to-[#ff6a00] px-4 py-1.5 text-sm font-semibold text-white shadow sm:hidden"
          >
            Signaler un prix
          </Link>
        </div>
      </nav>
    </header>
  );
}