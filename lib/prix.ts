import { cacheLife } from "next/cache";
import { prisma } from "@/lib/prisma";

export type Prix = {
  id: string;
  produit: string;
  unite: string;
  marche: string;
  prix: number; // FCFA
};

export async function getPrix(): Promise<Prix[]> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 3600 }); // ISR : 60 s

  const reports = await prisma.priceReport.findMany({
    include: { product: true, market: true },
    orderBy: { createdAt: "desc" },
  });

  return reports.map((r) => ({
    id: r.id,
    produit: r.product.name,
    unite: r.product.unit,
    marche: r.market.name,
    prix: r.price,
  }));
}
