import { Suspense } from "react";
import Link from "next/link";
import { auth, signOut } from "@/auth";

async function Etat() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link
        href="/connexion"
        className="rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
      >
        Se connecter
      </Link>
    );
  }

  async function deconnexion() {
    "use server";
    await signOut({ redirectTo: "/connexion" });
  }

  return (
    <>
      <p className="text-gray-800">
        Session ouverte : <strong>{session.user.name}</strong> ({session.user.email})
      </p>
      <form action={deconnexion}>
        <button
          type="submit"
          className="rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
        >
          Se déconnecter
        </button>
      </form>
    </>
  );
}

export default function Accueil() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-orange-50 px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-900">
        Prix <span className="text-orange-600">Mboka</span>
      </h1>
      <p className="max-w-md text-gray-700">
        Ensemble, trouvons le meilleur prix à Brazzaville.
      </p>
      <Suspense fallback={<p className="text-sm text-gray-600">Chargement…</p>}>
        <Etat />
      </Suspense>
    </main>
  );
}