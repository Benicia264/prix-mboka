import { Suspense } from "react";
import NavbarApp from "@/app/composants/NavbarApp";
import PrixList from "@/app/composants/PrixList";
import PrixMoyens from "@/app/composants/PrixMoyens";
import { getPrix } from "@/lib/prix";

async function PrixData() {
  const prix = await getPrix();
  return (
    <>
      <PrixList prix={prix} />
      <PrixMoyens prix={prix} />
    </>
  );
}

export default function PrixPage() {
  return (
    <>
      <Suspense fallback={null}>
        <NavbarApp />
      </Suspense>
      <main>
        <h1>Derniers prix signalés</h1>
        <Suspense fallback={<p>Chargement des prix...</p>}>
          <PrixData />
        </Suspense>
      </main>
    </>
  );
}
