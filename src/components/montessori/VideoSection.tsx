import { Play } from "lucide-react";
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
        {/* Player placeholder */}
        <div className="relative">
          <div
            className="absolute -left-4 -top-4 h-full w-full -rotate-2 rounded-[2rem] bg-amarelo"
            aria-hidden="true"
          />
          <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] border-8 border-white bg-[#2a1782] shadow-2xl">
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#0093cd] to-[#2a1782]">
              <button
                type="button"
                aria-label="Reproduzir vídeo institucional da Escola Montessori"
                className="flex h-20 w-20 items-center justify-center rounded-full bg-coral shadow-[0_6px_0_0_#b57804] transition-transform hover:scale-105"
              >
                <Play className="ml-1 h-9 w-9 fill-white text-white" />
              </button>
              <p className="px-6 text-center font-display text-sm font-semibold text-white/80">
                Vídeo institucional · em breve
              </p>
            </div>
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
