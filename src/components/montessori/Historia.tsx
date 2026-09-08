import desenhoPassaro from "@/assets/desenhos/Desenho_04.png.asset.json";

export function Historia() {
  return (
    <section
      aria-label="Nossa história"
      className="relative overflow-hidden bg-campaign-paper py-16 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_24px_70px_-48px_rgba(42,23,130,0.55)] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative flex min-h-[20rem] flex-col justify-between overflow-hidden bg-campaign-deep-purple p-8 md:p-12 lg:min-h-[25rem]">
            <img
              src={desenhoPassaro.url}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-7 top-7 w-20 opacity-25 md:right-10 md:top-10 md:w-24"
            />
            <div className="relative flex h-full flex-col justify-center">
              <p className="font-display text-[clamp(3rem,8vw,5.7rem)] font-extrabold leading-[0.8] tracking-[-0.07em] text-white/85">
                1970
              </p>
              <span aria-hidden="true" className="my-5 h-px w-16 bg-white/35 md:my-8" />
              <p className="font-display text-[clamp(5.5rem,17vw,11rem)] font-extrabold leading-[0.72] tracking-[-0.08em] text-campaign-blue">
                2027
              </p>
              <p className="mt-5 max-w-xs font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/60 md:mt-7">
                Escola Montessori · Brasília
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <span className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-campaign-blue">
              Nossa história
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.02] tracking-tight text-campaign-deep-purple md:text-5xl">
              Uma história construída com propósito.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-campaign-deep-purple/80 md:text-lg">
              Em julho de 1970 nasceu a Escola Montessori, a partir da convicção de que cada aluno
              tem um potencial único a ser reconhecido, respeitado e desenvolvido. Mantida pela
              Província Carmelitana Fluminense, une tradição, fé, formação humana e os princípios da
              metodologia Montessori, contemplando as dimensões cognitiva, emocional, social e
              física.
            </p>
            <p className="mt-8 font-display text-3xl font-extrabold text-campaign-blue md:text-4xl">
              57 anos de história
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
