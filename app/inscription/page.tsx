import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import ChampMotDePasse from "../connexion/champ-mot-de-passe";

const MESSAGES: Record<string, string> = {
  champs: "Merci de remplir tous les champs (mot de passe : 8 caractères minimum).",
  email: "Un compte existe déjà avec cet email.",
};

async function Formulaire({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;

  async function inscription(formData: FormData) {
    "use server";
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!name || !email || password.length < 8) {
      redirect("/inscription?erreur=champs");
    }

    const existe = await prisma.user.findUnique({ where: { email } });
    if (existe) redirect("/inscription?erreur=email");

    await prisma.user.create({
      data: { name, email, password: await bcrypt.hash(password, 10) },
    });

    try {
      await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (e) {
      if (e instanceof AuthError) redirect("/connexion");
      throw e;
    }
  }

  return (
    <>
      {erreur && MESSAGES[erreur] && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {MESSAGES[erreur]}
        </p>
      )}

      <form action={inscription} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-800">
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Votre nom"
            autoComplete="name"
            required
            className="rounded-xl border border-gray-300 p-3 text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>
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
            Mot de passe (8 caractères minimum)
          </label>
          <ChampMotDePasse autoComplete="new-password" minLength={8} />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-orange-600 p-3 text-lg font-bold text-white hover:bg-orange-700"
        >
          Créer mon compte →
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-700">
        Vous avez déjà un compte ?{" "}
        <Link
          href="/connexion"
          className="font-semibold text-orange-700 hover:text-orange-800"
        >
          Se connecter
        </Link>
      </p>
    </>
  );
}

export default function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 p-4">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl md:h-[min(700px,92vh)] md:grid-cols-2">
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
            Créer un compte
          </h1>
          <p className="mt-1 mb-6 text-center text-sm text-gray-700">
            Rejoignez la communauté pour signaler les prix
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