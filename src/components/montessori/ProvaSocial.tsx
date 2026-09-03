import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Depoimento {
  necessidade: string;
  dor: string;
  destaque: string;
  fundo: string;
  texto: string;
  filete: string;
  secundario: string;
}

const depoimentos: Depoimento[] = [
  {
    necessidade: "Autonomia",
    dor: "Eu queria que meu filho aprendesse a caminhar com mais autonomia.",
    destaque: "Ele começou a perceber que era capaz de fazer sozinho.",
    fundo: "bg-[#0093cd]",
    texto: "text-white",
    filete: "bg-[#f6a807]",
    secundario: "text-white/75",
  },
  {
    necessidade: "Acompanhamento individual",
    dor: "Eu procurava uma escola onde meu filho fosse realmente conhecido.",
    destaque: "Aqui ele não é apenas mais um aluno.",
    fundo: "bg-[#f6a807]",
    texto: "text-[#2a1782]",
    filete: "bg-[#2a1782]",
    secundario: "text-[#2a1782]/70",
  },
  {
    necessidade: "Adaptação e acolhimento",
    dor: "A maior preocupação era saber se ele iria se adaptar.",
    destaque: "Ele encontrou um lugar onde se sentiu pertencente.",
    fundo: "bg-[#2a1782]",
    texto: "text-white",
    filete: "bg-[#0093cd]",
    secundario: "text-white/70",
  },
  {
    necessidade: "Ritmo de aprendizagem",
    dor: "Cada criança tem seu próprio jeito de aprender.",
    destaque: "Ele passou a aprender com mais confiança.",
    fundo: "bg-[#64a33d]",
    texto: "text-white",
    filete: "bg-[#f6a807]",
    secundario: "text-white/75",
  },
  {
    necessidade: "Formação humana e valores",
    dor: "Queríamos uma escola que formasse além dos conteúdos.",
    destaque:
      "Uma formação que une conhecimento, valores cristãos e desenvolvimento humano.",
    fundo: "bg-[#684690]",
    texto: "text-white",
    filete: "bg-[#d37e26]",
    secundario: "text-white/70",
  },
];

const num = (i: number) => String(i + 1).padStart(2, "0");

function Card({ d, i }: { d: Depoimento; i: number }) {
  return (
    <article
      data-depo-card
      className={`depo-card flex min-h-[22rem] w-[85vw] shrink-0 flex-col justify-between rounded-[24px] p-8 sm:w-[22rem] lg:w-[24rem] ${d.fundo} ${d.texto}`}
    >
      <div>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-extrabold leading-none">
            {num(i)}
          </span>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em]">
            {d.necessidade}
          </p>
        </div>
        <span aria-hidden="true" className={`mt-4 block h-1 w-12 rounded-full ${d.filete}`} />
        <p className="mt-6 font-display text-xl font-bold leading-snug md:text-2xl">
          &ldquo;{d.dor}&rdquo;
        </p>
        <p className={`mt-4 text-sm font-semibold italic ${d.secundario}`}>
          [depoimento real]
        </p>
      </div>
      <p className="mt-8 text-base font-medium leading-relaxed">{d.destaque}</p>
    </article>
  );
}

export function ProvaSocial() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [indice, setIndice] = useState(0);

  const irPara = useCallback((i: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const alvo = Math.min(Math.max(i, 0), depoimentos.length - 1);
    const card = vp.querySelectorAll<HTMLElement>("[data-depo-card]")[alvo];
    if (!card) return;
    vp.scrollTo({ left: card.offsetLeft - vp.offsetLeft, behavior: "smooth" });
    setIndice(alvo);
  }, []);

  return (
    <section
      aria-label="Depoimentos de famílias"
      className="bg-campaign-mist py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-campaign-deep-purple/60">
              Famílias
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.02] text-marrom md:text-5xl">
              Quem escolheu a Escola Montessori conta essa história melhor.
            </h2>
          </div>
          <p className="md:col-span-5 text-base leading-relaxed text-foreground/75">
            Escolher uma escola envolve expectativas, dúvidas e sonhos. Cada
            família chega com uma necessidade diferente — mais autonomia,
            acompanhamento próximo, adaptação acolhedora ou formação alinhada
            aos seus valores. Conheça histórias reais de famílias que
            encontraram aqui um ambiente preparado para acompanhar o
            desenvolvimento dos filhos.
          </p>
        </div>

        <div ref={viewportRef} className="depo-viewport mt-12 pb-2">
          {depoimentos.map((d, i) => (
            <Card key={d.necessidade} d={d} i={i} />
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            aria-label="Depoimento anterior"
            onClick={() => irPara(indice - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-campaign-deep-purple text-white transition hover:bg-campaign-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campaign-deep-purple"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Próximo depoimento"
            onClick={() => irPara(indice + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-campaign-deep-purple text-white transition hover:bg-campaign-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campaign-deep-purple"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="ml-2 flex gap-2">
            {depoimentos.map((d, i) => (
              <button
                key={d.necessidade}
                type="button"
                aria-label={`Ir para o depoimento ${num(i)}`}
                aria-current={i === indice}
                onClick={() => irPara(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === indice
                    ? "w-7 bg-campaign-deep-purple"
                    : "w-2.5 bg-campaign-deep-purple/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
