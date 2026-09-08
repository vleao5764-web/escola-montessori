import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Depoimento {
  necessidade: string;
  nome: string;
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
    nome: "Mariana Souza",
    dor: "Eu queria que meu filho aprendesse a caminhar com mais autonomia.",
    destaque: "Ele começou a perceber que era capaz de fazer sozinho.",
    fundo: "bg-[#0093cd]",
    texto: "text-white",
    filete: "bg-[#f6a807]",
    secundario: "text-white/75",
  },
  {
    necessidade: "Acompanhamento individual",
    nome: "Ricardo Almeida",
    dor: "Eu procurava uma escola onde meu filho fosse realmente conhecido.",
    destaque: "Aqui ele não é apenas mais um aluno.",
    fundo: "bg-[#f6a807]",
    texto: "text-[#2a1782]",
    filete: "bg-[#2a1782]",
    secundario: "text-[#2a1782]/70",
  },
  {
    necessidade: "Adaptação e acolhimento",
    nome: "Camila Ferreira",
    dor: "A maior preocupação era saber se ele iria se adaptar.",
    destaque: "Ele encontrou um lugar onde se sentiu pertencente.",
    fundo: "bg-[#2a1782]",
    texto: "text-white",
    filete: "bg-[#0093cd]",
    secundario: "text-white/70",
  },
  {
    necessidade: "Ritmo de aprendizagem",
    nome: "Fernanda Costa",
    dor: "Cada criança tem seu próprio jeito de aprender.",
    destaque: "Ele passou a aprender com mais confiança.",
    fundo: "bg-[#64a33d]",
    texto: "text-white",
    filete: "bg-[#f6a807]",
    secundario: "text-white/75",
  },
  {
    necessidade: "Formação humana e valores",
    nome: "João Martins",
    dor: "Queríamos uma escola que formasse além dos conteúdos.",
    destaque: "Uma formação que une conhecimento, valores cristãos e desenvolvimento humano.",
    fundo: "bg-[#684690]",
    texto: "text-white",
    filete: "bg-[#d37e26]",
    secundario: "text-white/70",
  },
];

function Card({ d }: { d: Depoimento }) {
  return (
    <article
      data-depo-card
      className={`depo-card flex min-h-[22rem] w-[78vw] shrink-0 flex-col justify-between rounded-[24px] p-8 sm:w-[22rem] lg:w-[24rem] ${d.fundo} ${d.texto}`}
    >
      <div>
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em]">
            {d.necessidade}
          </p>
        </div>
        <span aria-hidden="true" className={`mt-4 block h-1 w-12 rounded-full ${d.filete}`} />
        <p className="mt-6 font-display text-xl font-bold leading-snug md:text-2xl">
          &ldquo;{d.dor} {d.destaque}&rdquo;
        </p>
      </div>
      <p className={`mt-8 font-display text-sm font-bold ${d.secundario}`}>{d.nome}</p>
    </article>
  );
}

export function ProvaSocial() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const cardsEmLoop = [...depoimentos, ...depoimentos, ...depoimentos];

  const indiceMaisProximo = useCallback(
    (vp: HTMLDivElement, cards: HTMLElement[]) =>
      cards.reduce((melhor, card, i) => {
        const distanciaAtual = Math.abs(card.offsetLeft - vp.offsetLeft - vp.scrollLeft);
        const distanciaMelhor = Math.abs(cards[melhor]!.offsetLeft - vp.offsetLeft - vp.scrollLeft);
        return distanciaAtual < distanciaMelhor ? i : melhor;
      }, 0),
    [],
  );

  const mover = useCallback(
    (direcao: 1 | -1) => {
      const vp = viewportRef.current;
      if (!vp) return;

      const cards = Array.from(vp.querySelectorAll<HTMLElement>("[data-depo-card]"));
      if (!cards.length) return;

      const tamanhoDoCiclo = depoimentos.length;
      let atual = indiceMaisProximo(vp, cards);
      let alvo = atual + direcao;
      const limiteDireito = vp.scrollWidth - vp.clientWidth;
      const distanciaDoCiclo = cards[tamanhoDoCiclo]!.offsetLeft - cards[0]!.offsetLeft;
      const margemDeVisibilidade = Math.min(56, vp.clientWidth * 0.12);
      const posicaoDoCartao = (card: HTMLElement) =>
        card.offsetLeft - vp.offsetLeft - margemDeVisibilidade;
      let reposicionado = false;

      // Quando o próximo cartão ultrapassaria a área rolável, reposiciona no mesmo cartão
      // da cópia anterior. Como o conteúdo é idêntico, o usuário vê só o movimento contínuo.
      if (
        direcao === 1 &&
        (alvo >= cards.length || posicaoDoCartao(cards[alvo]!) > limiteDireito)
      ) {
        vp.scrollTo({ left: Math.max(0, vp.scrollLeft - distanciaDoCiclo) });
        atual -= tamanhoDoCiclo;
        alvo = atual + 1;
        reposicionado = true;
      }
      if (direcao === -1 && (alvo < 0 || posicaoDoCartao(cards[alvo]!) < 0)) {
        vp.scrollTo({ left: Math.min(limiteDireito, vp.scrollLeft + distanciaDoCiclo) });
        atual += tamanhoDoCiclo;
        alvo = atual - 1;
        reposicionado = true;
      }

      const proximoCartao = cards[alvo];
      if (proximoCartao) {
        const irPara = () =>
          vp.scrollTo({
            left: posicaoDoCartao(proximoCartao),
            behavior: "smooth",
          });
        if (reposicionado) {
          requestAnimationFrame(irPara);
        } else {
          irPara();
        }
      }
    },
    [indiceMaisProximo],
  );

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const primeiroCartaoDoMeio =
      vp.querySelectorAll<HTMLElement>("[data-depo-card]")[depoimentos.length];
    if (primeiroCartaoDoMeio) {
      const margemDeVisibilidade = Math.min(56, vp.clientWidth * 0.12);
      vp.scrollTo({ left: primeiroCartaoDoMeio.offsetLeft - vp.offsetLeft - margemDeVisibilidade });
    }
  }, []);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    let quadro: number | null = null;
    const atualizarIndicador = () => {
      quadro = null;
      const cards = Array.from(vp.querySelectorAll<HTMLElement>("[data-depo-card]"));
      if (!cards.length) return;
      setIndiceAtivo(indiceMaisProximo(vp, cards) % depoimentos.length);
    };
    const aoRolar = () => {
      if (quadro === null) quadro = requestAnimationFrame(atualizarIndicador);
    };
    atualizarIndicador();
    vp.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      vp.removeEventListener("scroll", aoRolar);
      if (quadro !== null) cancelAnimationFrame(quadro);
    };
  }, [indiceMaisProximo]);

  return (
    <section
      aria-label="Depoimentos de famílias"
      className="bg-campaign-mist pb-10 pt-16 md:pb-12 md:pt-16"
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
            Escolher uma escola envolve expectativas, dúvidas e sonhos. Cada família chega com uma
            necessidade diferente: mais autonomia, acompanhamento próximo, adaptação acolhedora ou
            formação alinhada aos seus valores. Conheça histórias reais de famílias que encontraram
            aqui um ambiente preparado para acompanhar o desenvolvimento dos filhos.
          </p>
        </div>

        <div ref={viewportRef} className="depo-viewport mt-12 pb-2 pr-[10vw] md:pr-0">
          {cardsEmLoop.map((d, i) => (
            <Card key={`${d.necessidade}-${i}`} d={d} />
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            aria-label="Depoimento anterior"
            onClick={() => mover(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-campaign-deep-purple text-white transition hover:bg-campaign-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campaign-deep-purple"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Próximo depoimento"
            onClick={() => mover(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-campaign-deep-purple text-white transition hover:bg-campaign-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campaign-deep-purple"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div
            className="flex items-center gap-2 md:hidden"
            aria-label={`Depoimento ${indiceAtivo + 1} de ${depoimentos.length}`}
          >
            {depoimentos.map((d, i) => (
              <span
                key={d.necessidade}
                aria-hidden="true"
                className={`h-2 rounded-full transition-all ${i === indiceAtivo ? "w-5 bg-campaign-deep-purple" : "w-2 bg-campaign-deep-purple/25"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
