export function imageProduit(nomProduit: string): string {
  const nom = nomProduit
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (nom.includes("tomate")) return "/tomate.jpg";
  if (nom.includes("manioc")) return "/manioc.jpg";
  if (nom.includes("poisson")) return "/poisson.jpg";
  if (nom.includes("huile")) return "/huile.jpg";
  if (nom.includes("riz")) return "/riz.jpg";

  return "/tomate.jpg";
}