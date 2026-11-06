import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { imageProduit } from "@/lib/images-produits";
import NavbarApp from "@/app/composants/NavbarApp";
import BoutonSupprimer from "./BoutonSupprimer";

const FORMAT_DATE = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Africa/Brazzaville",
});

const FORMAT_HEURE = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Brazzaville",
});

function formaterDate(date: Date) {
  return `${FORMAT_DATE.format(date)} • ${FORMAT_HEURE.format(date)}`;
}

async function Liste() {
  const session = await auth();
  if (!session?.user?.id) redirect("/connexion");

  const signalements = await prisma.priceReport.findMany({
    where: { userId: session.user.id },
    include: { product: true, market: true },
    orderBy: { createdAt: "desc" },
  });

  async function supprimer(formData: FormData) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) redirect("/connexion");

    const id = String(formData.get("id") ?? "");
    await prisma.priceReport.deleteMany({
      where: { id, userId: session.user.id },
    });

    revalidatePath("/mes-signalements");
    revalidatePath("/prix");
  }

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-linear-to-r from-[#ff8a1f] to-[#ff6a00] px-5 py-2 text-sm font-semibold text-white shadow">
          Tous ({signalements.length})
        </span>
      </div>

      {signalements.length === 0 ? (
        <div className="mt-6 rounded-3xl bg-white p-8 text-center shadow-lg">
          <p className="text-slate-700">
            Vous n’avez encore signalé aucun prix.
          </p>
          <Link
            href="/signaler"
            className="mt-4 inline-block rounded-full bg-linear-to-r from-[#ff8a1f] to-[#ff6a00] px-6 py-2.5 text-sm font-semibold text-white shadow hover:brightness-95"
          >
            Signaler un prix
          </Link>
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {signalements.map((s) => (
            <li
              key={s.id}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm sm:gap-4 sm:p-4"
            >
              <Image
                src={imageProduit(s.product.name)}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-900">{s.product.name}</p>
                <p className="text-sm text-slate-700">
                  {s.market.name} • {s.price.toLocaleString("fr-FR")} F
                </p>
                {s.comment && (
                  <p className="mt-0.5 truncate text-xs italic text-slate-600">
                    « {s.comment} »
                  </p>
                )}
                <p className="mt-0.5 text-xs text-slate-600 sm:hidden">
                  {formaterDate(s.createdAt)}
                </p>
              </div>

              <p className="hidden shrink-0 text-sm text-slate-700 sm:block">
                {formaterDate(s.createdAt)}
              </p>

              <BoutonSupprimer
                action={supprimer}
                id={s.id}
                nom={`${s.product.name} à ${s.market.name}`}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function MesSignalementsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#fff6ee] to-white pb-16">
      <NavbarApp />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-start gap-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="mt-1 h-8 w-8 shrink-0 text-[#ff7a00]"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Mes signalements
            </h1>
            <p className="mt-1 text-slate-700">
              Retrouvez tous vos signalements
            </p>
          </div>
        </div>

        <Suspense
          fallback={<p className="mt-6 text-sm text-slate-700">Chargement…</p>}
        >
          <Liste />
        </Suspense>
      </main>
    </div>
  );
}