import type { Prix } from "@/lib/prix";
import { statsParProduit } from "@/lib/stats";

export default function PrixMoyens({ prix }: { prix: Prix[] }) {
  const stats = statsParProduit(prix);
  if (stats.length === 0) return null;

  return (
    <section aria-labelledby="titre-moyens">
      <h2 id="titre-moyens">Prix moyens et moins chers</h2>
      <ul>
        {stats.map((s) => (
          <li key={`${s.produit}-${s.unite}`}>
            <h3>{s.produit}</h3>
            <p>Prix moyen : {s.moyenne} F / {s.unite}</p>
            <p>Moins cher : {s.min} F à {s.marcheMin}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
