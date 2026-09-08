import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logoHorizontal from "@/assets/logo-horizontal-branco.png.asset.json";

type LegalSection = {
  title: string;
  body: ReactNode;
};

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <main className="min-h-screen bg-[#f7f3eb] font-body text-campaign-deep-purple">
      <header className="bg-campaign-deep-purple">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <Link to="/" aria-label="Voltar ao início da Escola Montessori">
            <img src={logoHorizontal.url} alt="Escola Montessori" className="h-11 w-auto" />
          </Link>
          <Link to="/" className="rounded-xl border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:bg-white hover:text-campaign-deep-purple">
            Voltar ao site
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-campaign-blue">Escola Montessori · Brasília</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-campaign-deep-purple/80">{intro}</p>
        <p className="mt-5 text-sm text-campaign-deep-purple/60">Última atualização: 4 de setembro de 2026.</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-campaign-deep-purple/15 pt-8">
              <h2 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">{section.title}</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-campaign-deep-purple/80">{section.body}</div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
