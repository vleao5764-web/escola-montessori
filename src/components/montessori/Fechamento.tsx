import bgFund1 from "@/assets/bg-fund1.webp";
import selo from "@/assets/selo-matriculas-fund1.png";
import tag2027 from "@/assets/tag-2027.png";

export function Fechamento() {
  return (
    <section
      aria-label="Matrículas 2027 abertas"
      className="relative overflow-hidden bg-campaign-deep-purple pt-24 pb-20 md:pt-32 md:pb-28"
    >
      <img
        src={bgFund1}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-campaign-deep-purple"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center gap-4">
          <img src={tag2027} alt="2027" className="h-10 w-auto sm:h-12" />
          <img
            src={selo}
            alt="Matrículas Abertas"
            className="h-12 w-auto sm:h-16"
          />
        </div>

        <h2 className="mt-8 max-w-4xl font-display text-[2.4rem] font-extrabold leading-[0.98] tracking-tight text-white md:text-[4.5rem]">
          A base de hoje constrói o futuro de amanhã.
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
          <p className="max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            Uma escola que respeita cada etapa do desenvolvimento, valoriza a
            autonomia e prepara alunos para compreender o mundo, fazer escolhas
            conscientes e contribuir com responsabilidade.{" "}
            <strong className="font-semibold text-campaign-orange">
              Escola Montessori.
            </strong>
          </p>

          <div className="lg:justify-self-end">
            <a
              href="#agende"
              className="inline-flex items-center justify-center bg-campaign-orange px-10 py-5 font-display text-lg font-bold text-campaign-deep-purple shadow-[0_6px_0_0_var(--campaign-burnt-orange)] transition hover:translate-y-0.5 hover:shadow-[0_3px_0_0_var(--campaign-burnt-orange)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Agende sua visita
            </a>
          </div>
        </div>

        <div className="mt-14 flex gap-2">
          <span className="h-2 flex-1 bg-campaign-blue" />
          <span className="h-2 w-24 bg-campaign-orange" />
          <span className="h-2 w-10 bg-campaign-purple" />
        </div>
      </div>
    </section>
  );
}
