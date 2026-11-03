"use client";

import { useState } from "react";

export default function ChampMotDePasse() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id="password"
        name="password"
        type={visible ? "text" : "password"}
        placeholder="Mot de passe"
        autoComplete="current-password"
        required
        className="w-full rounded-xl border border-gray-300 p-3 pr-24 text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        className="absolute inset-y-0 right-3 text-sm font-medium text-orange-700 hover:text-orange-800"
      >
        {visible ? "Masquer" : "Afficher"}
      </button>
    </div>
  );
}