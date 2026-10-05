"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";

const subjects = ["Question sur DigiStock", "DigiStock Premium", "Aide à l'installation", "Partenariat", "Autre"];

const field =
  "mt-1.5 block w-full rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-[0.9375rem] text-ink-950 shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-ink-400 focus:border-brand-500 focus:ring-3 focus:ring-brand-100";

/**
 * Formulaire de contact sans serveur : il prépare un e-mail dans la messagerie
 * de l'utilisateur. Aucune donnée n'est transmise au site.
 */
export function ContactForm({ email }: { email: string }) {
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim().slice(0, 120);
    const business = String(data.get("business") ?? "").trim().slice(0, 120);
    const subject = String(data.get("subject") ?? subjects[0]).slice(0, 80);
    const message = String(data.get("message") ?? "").trim().slice(0, 4000);
    if (name.length < 2 || message.length < 10) {
      setError("Indiquez votre nom et un message d'au moins 10 caractères.");
      return;
    }
    setError(null);
    const body = `${message}\n\n— ${name}${business ? `\n${business}` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`[DigiStock] ${subject}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[0.875rem] font-medium text-ink-800">
          Nom
          <input name="name" type="text" autoComplete="name" required maxLength={120} className={field} />
        </label>
        <label className="block text-[0.875rem] font-medium text-ink-800">
          Entreprise <span className="font-normal text-ink-500">(optionnel)</span>
          <input name="business" type="text" autoComplete="organization" maxLength={120} className={field} />
        </label>
      </div>
      <label className="block text-[0.875rem] font-medium text-ink-800">
        Sujet
        <select name="subject" className={field} defaultValue={subjects[0]}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="block text-[0.875rem] font-medium text-ink-800">
        Message
        <textarea name="message" rows={6} required maxLength={4000} className={field} placeholder="Votre activité, votre question…" />
      </label>
      {error && (
        <p role="alert" className="text-[0.875rem] text-negative">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className={buttonClasses("primary", "md")}>
          <Send className="size-4" aria-hidden />
          Préparer l&apos;e-mail
        </button>
        <p className="text-[0.8125rem] text-ink-500">Votre messagerie s&apos;ouvre avec le message prérempli.</p>
      </div>
    </form>
  );
}
