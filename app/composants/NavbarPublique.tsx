import Link from "next/link";
import Logo from "./Logo";
import { BoutonsPublics } from "./CompteClient";

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
          <BoutonsPublics />
        </div>
      </nav>
    </header>
  );
}