import bgFund1 from "@/assets/bg-fund1.webp.asset.json";
import selo from "@/assets/selo-matriculas-fund1.png.asset.json";
import tag2027 from "@/assets/tag-2027.png.asset.json";

export function Fechamento() {
  return (
    <section
      aria-label="Matrículas 2027 abertas"
      className="relative overflow-hidden bg-campaign-deep-purple pb-20 pt-10 md:pt-32 md:pb-28"
    >
      <img
        src={bgFund1.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-campaign-deep-purple"
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center md:text-left">
        <div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <img src={tag2027.url} alt="2027" className="h-10 w-auto sm:h-12" />
            <img src={selo.url} alt="Matrículas Abertas" className="h-12 w-auto sm:h-16" />
          </div>

          <h2 className="mx-auto mt-8 max-w-4xl font-display text-[2.4rem] font-extrabold leading-[0.98] tracking-tight text-white md:mx-0 md:text-[4.5rem]">
            A base de hoje constrói
            <br />o futuro de amanhã.
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/85 md:mx-0 md:text-xl">
              Uma escola que respeita cada etapa do desenvolvimento, valoriza a autonomia e prepara
              alunos para compreender o mundo, fazer escolhas conscientes e contribuir com
              responsabilidade.
            </p>

            <div className="lg:justify-self-end">
              <a
                href="#agende"
                className="inline-flex min-h-14 items-center justify-center rounded-[14px] bg-campaign-orange px-9 py-4 font-display text-lg font-bold text-campaign-deep-purple shadow-[0_6px_0_0_var(--campaign-burnt-orange)] transition hover:translate-y-0.5 hover:shadow-[0_3px_0_0_var(--campaign-burnt-orange)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Agende sua visita
              </a>
            </div>
          </div>
          <div aria-hidden="true" className="mt-14 flex h-2 gap-2">
            <span className="flex-1 bg-campaign-blue" />
            <span className="w-24 bg-campaign-orange" />
            <span className="w-10 bg-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
