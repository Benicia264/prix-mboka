
import { prisma } from "@/lib/prisma";
import NavbarApp from "@/app/composants/NavbarApp";
import ListePrix from "./ListePrix";

// ISR : la page est générée à l'avance, puis régénérée en arrière-plan
// au plus une fois toutes les 60 secondes.
export const revalidate = 60;

const FORMAT_DATE = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Africa/Brazzaville",
});

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

export default async function PagePrix() {
  const [marches, reports] = await Promise.all([
    prisma.market.findMany({ orderBy: { name: "asc" } }),
    prisma.priceReport.findMany({
      include: {
        product: true,
        market: true,
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  const signalements = reports.map((r) => ({
    id: r.id,
    price: r.price,
    comment: r.comment,
    marketId: r.marketId,
    date: FORMAT_DATE.format(r.createdAt),
    image: getImageProduit(r.product.name),
    produit: r.product.name,
    unite: r.product.unit,
    marche: r.market.name,
    auteur: r.user?.name || "Anonyme",
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#fff6ee] to-white pb-16">
      <NavbarApp />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Prix moyens et moins chers
        </h1>
        <p className="mt-1 text-slate-700">
          Découvrez les meilleurs prix par produit dans les marchés de
          Brazzaville.
        </p>

        <ListePrix
          marches={marches.map((m) => ({ id: m.id, name: m.name }))}
          signalements={signalements}
        />
      </main>
    </div>
  );
}