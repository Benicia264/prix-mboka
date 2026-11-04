import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import ChampMotDePasse from "./champ-mot-de-passe";

async function Formulaire({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;

  async function connexion(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/",
      });
    } catch (e) {
      if (e instanceof AuthError) redirect("/connexion?erreur=1");
      throw e;
    }
  }

  return (
    <>
      {erreur && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          Email ou mot de passe incorrect.
        </p>
      )}

      <form action={connexion} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-800">
            Adresse email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Adresse email"
            autoComplete="email"
            required
            className="rounded-xl border border-gray-300 p-3 text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-800">
            Mot de passe
          </label>
          <ChampMotDePasse />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-orange-600 p-3 text-lg font-bold text-white hover:bg-orange-700"
        >
          Se connecter →
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-700">
        Vous n’avez pas de compte ?{" "}
        <Link
          href="/inscription"
          className="font-semibold text-orange-700 hover:text-orange-800"
        >
          S’inscrire
        </Link>
      </p>
    </>
  );
}

export default function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 p-4">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl md:h-[min(640px,90vh)] md:grid-cols-2">
        <div className="relative hidden h-full md:block">
          <Image
            src="/connexion.jpg"
            alt="Une femme consulte les prix sur son téléphone, un panier de légumes à l'épaule"
            fill
            priority
            sizes="(min-width: 768px) 448px, 0px"
            className="object-cover object-top"
          />
        </div>

        <div className="flex flex-col justify-center overflow-y-auto p-8 md:p-12">
          <p className="text-center text-2xl font-bold text-gray-900">
            Prix <span className="text-orange-600">Mboka</span>
          </p>
          <h1 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Bienvenue !
          </h1>
          <p className="mt-1 mb-6 text-center text-sm text-gray-700">
            Connectez-vous pour continuer
          </p>

          <Suspense
            fallback={<p className="text-sm text-gray-600">Chargement…</p>}
          >
            <Formulaire searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}