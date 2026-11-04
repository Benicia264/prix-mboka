import { Suspense } from "react";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import Logo from "./Logo";

async function Compte() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link
        href="/connexion"
        className="rounded-full border border-orange-300 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-orange-50"
      >
        Se connecter
      </Link>
    );
  }

  async function deconnexion() {
    "use server";
    await signOut({ redirectTo: "/connexion" });
  }

  return (
    <form action={deconnexion} className="flex items-center gap-3">
      <span className="hidden max-w-32 truncate text-sm text-gray-800 sm:inline">
        {session.user.name}
      </span>
      <button
        type="submit"
        className="rounded-full border border-orange-300 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-orange-50"
      >
        Se déconnecter
      </button>
    </form>
  );
}

export default function NavbarApp() {
  return (
    <header className="sticky top-0 z-20 border-b border-orange-100 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Prix Mboka, accueil">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 text-sm font-medium text-gray-900 md:flex">
          <Link href="/prix" className="px-4 py-2 hover:text-orange-700">
            Prix
          </Link>
          <Link href="/marches" className="px-4 py-2 hover:text-orange-700">
            Marchés
          </Link>
          <Link href="/mes-signalements" className="px-4 py-2 hover:text-orange-700">
            Mes signalements
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/signaler"
            className="rounded-full bg-orange-700 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-800"
          >
            Signaler un prix
          </Link>
          <Suspense fallback={<span className="block h-9 w-28" />}>
            <Compte />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}