"use client";

import { useRef } from "react";

export default function BoutonSupprimer({
  action,
  id,
  nom,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  nom: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-label={`Supprimer le signalement : ${nom}`}
        title="Supprimer"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 hover:bg-red-50 hover:text-red-700"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>

      <dialog
        ref={ref}
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl p-0 shadow-2xl backdrop:bg-black/40"
      >
        <form action={action} className="p-6 text-center">
          <input type="hidden" name="id" value={id} />
          <h2 className="text-lg font-bold text-slate-900">
            Supprimer ce signalement ?
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            Cette action est irréversible.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-900 hover:bg-slate-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-linear-to-r from-[#ff8a1f] to-[#ff6a00] px-4 py-2.5 font-semibold text-white hover:brightness-95"
            >
              Supprimer
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}