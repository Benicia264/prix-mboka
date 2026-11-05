
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import NavbarApp from "@/app/composants/NavbarApp";

// Définition du délai ISR (régénération en arrière-plan toutes les 60s)
export const revalidate = 60;

// Fonction exacte pour associer chaque produit à son image respective
function getImageProduit(nomProduit: string): string {
  const nom = nomProduit
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (nom.includes("tomate")) return "/tomate.jpg";
  if (nom.includes("manioc")) return "/manioc.jpg";
  if (nom.includes("poisson")) return "/poisson.jpg";
  if (nom.includes("huile")) return "/huile.jpg";
  if (nom.includes("riz")) return "/riz.jpg";
  
  return "/tomate.jpg"; // Image par défaut de secours
}

export default async function PagePrix({
  searchParams,
}: {
  searchParams: Promise<{ market?: string }>;
}) {
  const { market } = await searchParams;

  const [marches, prixReports] = await Promise.all([
    prisma.market.findMany({ orderBy: { name: "asc" } }),
    prisma.priceReport.findMany({
      where: market ? { marketId: market } : undefined,
      include: {
        product: true,
        market: true,
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#fff6ee] to-white pb-16">
      <NavbarApp />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Prix moyens et moins chers
        </h1>
        <p className="mt-1 text-slate-700">
          Découvrez les meilleurs prix par produit dans les marchés de Brazzaville.
        </p>

        {/* Filtres par marché */}
        <div className="my-6 flex flex-wrap items-center gap-2">
          <a
            href="/prix"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              !market
                ? "bg-[#ff7a00] text-white shadow-md"
                : "bg-white text-slate-700 border border-orange-200 hover:bg-orange-50"
            }`}
          >
            Tous les marchés
          </a>
          {marches.map((m) => (
            <a
              key={m.id}
              href={`/prix?market=${m.id}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                market === m.id
                  ? "bg-[#ff7a00] text-white shadow-md"
                  : "bg-white text-slate-700 border border-orange-200 hover:bg-orange-50"
              }`}
            >
              {m.name}
            </a>
          ))}
        </div>

        {/* Grille des cartes de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {prixReports.length === 0 ? (
            <p className="text-slate-500 col-span-full py-10 text-center">
              Aucun prix signalé pour le moment.
            </p>
          ) : (
            prixReports.map((report) => {
              const imageSrc = getImageProduit(report.product.name);
              return (
                <div
                  key={report.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md border border-orange-100 flex flex-col justify-between transition-transform hover:-translate-y-1"
                >
                  {/* Image du produit */}
                  <div className="relative h-44 w-full bg-orange-50">
                    <Image
                      src={imageSrc}
                      alt={report.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Corps de la carte */}
                  <div className="p-4 flex flex-col gap-2">
                    <h2 className="font-bold text-slate-900 text-base">
                      {report.product.name}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Unité : {report.product.unit}
                    </p>

                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-xl font-extrabold text-[#ff7a00]">
                        {report.price} F
                      </span>
                      <span className="text-xs font-medium text-slate-600 bg-orange-50 px-2 py-1 rounded-lg">
                        {report.market.name}
                      </span>
                    </div>

                    {report.comment && (
                      <p className="text-xs italic text-slate-500 mt-1 line-clamp-2">
                        &quot;{report.comment}&quot;
                      </p>
                    )}

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Par {report.user?.name || "Anonyme"}</span>
                      <span>{new Date(report.createdAt).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}