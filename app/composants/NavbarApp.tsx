import Link from "next/link";
import Logo from "./Logo";
import { CompteApp } from "./CompteClient";

const PASTILLE =
  "shrink-0 whitespace-nowrap rounded-full border border-[#ffd9b8] bg-white px-4 py-1.5 text-sm font-medium text-slate-900 hover:bg-[#fff6ee]";

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
            <CompteApp />
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