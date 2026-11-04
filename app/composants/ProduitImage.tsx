"use client";
import Image from "next/image";
import { useState } from "react";

function slug(nom: string) {
  return nom
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export default function ProduitImage({ nom }: { nom: string }) {
  const [erreur, setErreur] = useState(false);

  if (erreur) {
    return <div role="img" aria-label={nom}>{nom.charAt(0)}</div>;
  }

  return (
    <Image
      src={`/produits/${slug(nom)}.jpg`}
      alt={nom}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onError={() => setErreur(true)}
      style={{ objectFit: "cover" }}
    />
  );
}
