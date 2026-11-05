import { Suspense } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import NavbarApp from "@/app/composants/NavbarApp";
import { IconeMegaphone } from "@/app/composants/Icones";

const CHAMP =
  "w-full rounded-xl border border-[#fde0c4] bg-[#fff7ef] p-3 text-slate-900 placeholder:text-slate-500 focus:border-[#ff7a00] focus:outline-none focus:ring-2 focus:ring-orange-200";

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-700"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

async function Formulaire({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erreur?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/connexion");

  const { ok, erreur } = await searchParams;

  const [produits, marches] = await Promise.all([
    prisma.product.findMany({ orderBy: { name: "asc" } }),
    prisma.market.findMany({ orderBy: { name: "asc" } }),
  ]);

  async function signaler(formData: FormData) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) redirect("/connexion");

    const productId = String(formData.get("productId") ?? "");
    const marketId = String(formData.get("marketId") ?? "");
    const price = Number(formData.get("price"));
    const comment =
      String(formData.get("comment") ?? "").trim().slice(0, 280) || null;

    if (
      !productId ||
      !marketId ||
      !Number.isInteger(price) ||
      price <= 0 ||
      price > 10_000_000
    ) {
      redirect("/signaler?erreur=1");
    }

    await prisma.priceReport.create({
      data: { price, comment, productId, marketId, userId: session.user.id },
    });

    redirect("/signaler?ok=1");
  }

  return (
    <>
      {ok && (
        <p
          role="status"
          className="mb-3 rounded-xl bg-green-50 p-3 text-sm text-green-800"
        >
          Merci ! Votre prix a bien été enregistré.
        </p>
      )}
      {erreur && (
        <p
          role="alert"
          className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-700"
        >
          Merci de choisir un produit, un marché et un prix valide (nombre entier
          supérieur à 0).
        </p>
      )}

      <form action={signaler} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="productId" className="text-sm font-bold text-slate-900">
            Produit <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <div className="relative">
            <select
              id="productId"
              name="productId"
              required
              defaultValue=""
              className={`${CHAMP} appearance-none pr-10`}
            >
              <option value="" disabled>
                Sélectionner un produit
              </option>
              {produits.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.unit})
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="marketId" className="text-sm font-bold text-slate-900">
            Marché <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <div className="relative">
            <select
              id="marketId"
              name="marketId"
              required
              defaultValue=""
              className={`${CHAMP} appearance-none pr-10`}
            >
              <option value="" disabled>
                Choisir un marché
              </option>
              {marches.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-bold text-slate-900">
            Prix (FCFA) <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            placeholder="Ex: 1000"
            required
            className={CHAMP}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="comment" className="text-sm font-bold text-slate-900">
            Commentaire (optionnel)
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={2}
            maxLength={280}
            placeholder="Ajouter une remarque..."
            className={`${CHAMP} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#ff8a1f] to-[#ff6a00] p-3 font-bold text-white shadow-md hover:brightness-95"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M22 2 11 13" />
            <path d="m22 2-7 20-4-9-9-4Z" />
          </svg>
          Publier le signalement
        </button>
      </form>
    </>
  );
}

export default function SignalerPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erreur?: string }>;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#fff6ee] to-white">
      <NavbarApp />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <IconeMegaphone className="mt-1 h-8 w-8 shrink-0 text-[#ff7a00]" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Signaler un prix
              </h1>
              <p className="mt-1 text-slate-700">
                Aidez la communauté en partageant un prix récent
              </p>
            </div>
          </div>
          <svg
            viewBox="0 0 64 48"
            fill="none"
            aria-hidden="true"
            className="hidden h-12 w-16 shrink-0 text-[#ff8a1f] md:block"
          >
            <path
              d="M10 8 28 22"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M34 14 56 24"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="mt-6 grid items-center gap-8 rounded-3xl bg-white p-6 shadow-lg lg:grid-cols-[1fr_1.2fr]">
          <Image
            src="/signaler.jpg"
            alt="Ensemble, trouvons le meilleur prix à Brazzaville !"
            width={900}
            height={850}
            unoptimized
            priority
            className="h-auto w-full"
          />

          <div>
            <Suspense
              fallback={<p className="text-sm text-slate-700">Chargement…</p>}
            >
              <Formulaire searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}