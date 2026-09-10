import bgFund1 from "@/assets/bg-fund1.webp.asset.json";

export function VideoSection() {
  return (
    <section
      aria-labelledby="video-titulo"
      className="relative overflow-hidden bg-magenta-camp py-10 text-white sm:py-24"
    >
      <img
        src={bgFund1.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
        {/* Vídeo institucional */}
        <div className="relative">
          <div
            className="absolute -left-4 -top-4 h-full w-full -rotate-2 rounded-[2rem] bg-amarelo"
            aria-hidden="true"
          />
          <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] border-8 border-white bg-[#2a1782] shadow-2xl">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/zUtXl_BJDkU?cc_load_policy=0"
              title="Vídeo institucional da Escola Montessori"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Texto */}
        <div>
          <h2
            id="video-titulo"
            className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]"
          >
            Cada descoberta,{" "}
            <span className="text-amarelo">um novo passo para crescer.</span>
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-white/90 sm:text-lg">
            <p>
              Antes de aprender conteúdos, existe uma base construída pela curiosidade, pela
              autonomia, pela convivência e pela capacidade de descobrir novas possibilidades.
            </p>
            <p>
              Na Escola Montessori, o aluno participa ativamente da construção do conhecimento:
              observa, experimenta, testa, refaz e aprende com cada experiência.
            </p>
            <p>
              Com uma metodologia que respeita diferentes ritmos, cada etapa prepara o aluno para
              novos desafios.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
