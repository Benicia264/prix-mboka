import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@/auth";
import Logo from "./Logo";

async function BoutonsCompte() {
  const session = await auth();

  if (session?.user) {
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

export default function NavbarPublique() {
  return (
    <header className="relative z-20 bg-transparent">
      <nav className="flex items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:py-4 lg:px-[4.5vw]">
        <Link href="/" aria-label="Prix Mboka, accueil" className="shrink-0">
          <Logo tagline />
        </Link>

        <div className="hidden items-center gap-1 text-sm font-medium text-slate-900 lg:flex">
          <Link
            href="/"
            className="rounded-full bg-[#ffe9d6] px-5 py-2 font-semibold text-[#ff6a00]"
          >
            Accueil
          </Link>
          <Link href="/marches" className="px-5 py-2 hover:text-[#ff6a00]">
            Marchés
          </Link>
          <Link href="/prix" className="px-5 py-2 hover:text-[#ff6a00]">
            Prix
          </Link>
          <Link
            href="/comment-ca-marche"
            className="px-5 py-2 hover:text-[#ff6a00]"
          >
            Comment ça marche
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Suspense fallback={<span className="block h-9 w-32 sm:w-44" />}>
            <BoutonsCompte />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}