import type { Prix } from "@/lib/prix";

export type Stat = {
  produit: string;
  unite: string;
  moyenne: number;
  min: number;
  marcheMin: string;
  nb: number;
};

export function statsParProduit(prix: Prix[]): Stat[] {
  const groupes = new Map<string, Prix[]>();
  for (const p of prix) {
    const cle = `${p.produit}|${p.unite}`;
    groupes.set(cle, [...(groupes.get(cle) ?? []), p]);
  }

  return Array.from(groupes.values())
    .map((liste) => {
      const moins = liste.reduce((a, b) => (b.prix < a.prix ? b : a));
      const somme = liste.reduce((s, p) => s + p.prix, 0);
      return {
        produit: liste[0].produit,
        unite: liste[0].unite,
        moyenne: Math.round(somme / liste.length),
        min: moins.prix,
        marcheMin: moins.marche,
        nb: liste.length,
      };
    })
    .sort((a, b) => a.produit.localeCompare(b.produit, "fr"));
}
