export function Historia() {
  return (
    <section
      aria-label="Nossa história"
      className="relative overflow-hidden bg-campaign-paper py-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Ano protagonista */}
          <div className="relative">
            <span className="inline-block bg-campaign-burnt-orange px-4 py-1.5 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white">
              Desde 1970
            </span>

            <div className="mt-6 flex items-end gap-4 lg:mt-10 lg:block">
              <p className="font-display text-[22vw] font-extrabold leading-[0.8] tracking-tight text-campaign-deep-purple sm:text-[9rem] lg:text-[11rem]">
                1970
              </p>
              <div className="hidden h-24 w-px bg-campaign-deep-purple/25 lg:my-6 lg:ml-4 lg:block" />
              <p className="pb-3 font-display text-[13vw] font-extrabold leading-[0.8] tracking-tight text-campaign-blue sm:text-[5rem] lg:pb-0 lg:text-[7rem]">
                2027
              </p>
            </div>

            <p className="mt-5 max-w-xs font-display text-sm font-semibold uppercase tracking-[0.18em] text-campaign-deep-purple/60">
              Escola Montessori
            </p>

            <div className="mt-8 flex gap-2">
              <span className="h-2 w-24 bg-campaign-orange" />
              <span className="h-2 w-10 bg-campaign-purple" />
              <span className="h-2 w-5 bg-campaign-blue" />
            </div>
          </div>

          {/* Texto editorial */}
          <div className="relative lg:pt-10">
            <h2 className="font-display text-3xl font-bold leading-[1.05] text-campaign-deep-purple md:text-5xl">
              Uma história construída com propósito.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-campaign-deep-purple/85 md:text-xl">
              Em julho de 1970 nasceu a Escola Montessori, a partir da convicção de
              que cada aluno tem um potencial único a ser reconhecido, respeitado e
              desenvolvido. Mantida pela Província Carmelitana Fluminense, une
              tradição, fé, formação humana e os princípios da metodologia
              Montessori — contemplando as dimensões cognitiva, emocional, social e
              física.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
