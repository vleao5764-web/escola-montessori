import { useCallback, useEffect, useRef, useState } from "react";
import imgInfantil from "@/assets/ensino-infantil.jpg";
import imgFund1 from "@/assets/ensino-fund1.jpg";
import imgFund2 from "@/assets/ensino-fund2.jpg";
import tagInfantil from "@/assets/tag-infantil.png";
import tagFund1 from "@/assets/tag-fund1.png";
import tagFund2 from "@/assets/tag-fund2.png";
import bgInfantil from "@/assets/bg-infantil.webp";
import bgFund1 from "@/assets/bg-fund1.webp";
import bgFund2 from "@/assets/bg-fund2.webp";
import d01 from "@/assets/desenhos/Desenho_01.png";
import d04 from "@/assets/desenhos/Desenho_04.png";
import d06 from "@/assets/desenhos/Desenho_06.png";
import d11 from "@/assets/desenhos/Desenho_11.png";
import d07 from "@/assets/desenhos/Desenho_07.png";
import d14 from "@/assets/desenhos/Desenho_14.png";

interface Doodle {
  src: string;
  className: string;
}

interface Nivel {
  id: string;
  titulo: string;
  tagline: string;
  corpo: string;
  destaque?: string;
  foto: string;
  fotoAlt: string;
  tag: string;
  bg: string;
  bgPos: string;
  accent: string;
  doodles: Doodle[];
}

const niveis: Nivel[] = [
  {
    id: "infantil",
    titulo: "Educação Infantil",
    tagline: "Onde começam as primeiras descobertas.",
    corpo:
      "Ambiente preparado, materiais sensoriais e vida prática favorecem autonomia, linguagem, coordenação motora, concentração e convivência.",
    destaque:
      "A criança aprende explorando, participando e construindo novas descobertas todos os dias.",
    foto: imgInfantil,
    fotoAlt:
      "Crianças da Educação Infantil explorando materiais sensoriais em uma sala Montessori iluminada",
    tag: tagInfantil,
    bg: bgInfantil,
    bgPos: "center",
    accent: "var(--campaign-orange)",
    doodles: [
      { src: d01, className: "-left-8 -top-8 w-16 xl:w-[72px]" },
      { src: d04, className: "-bottom-8 -right-6 w-14 xl:w-16" },
    ],
  },
  {
    id: "fund1",
    titulo: "Ensino Fundamental I",
    tagline: "Construindo conhecimento com significado.",
    corpo:
      "Materiais concretos, pesquisas, registros e projetos consolidam leitura, escrita, raciocínio matemático e compreensão científica, com autonomia crescente.",
    foto: imgFund1,
    fotoAlt:
      "Alunos do Fundamental I trabalhando com material dourado e cadernos em sala de aula Montessori",
    tag: tagFund1,
    bg: bgFund1,
    bgPos: "70% center",
    accent: "var(--campaign-purple)",
    doodles: [
      { src: d06, className: "-right-8 -top-8 w-16 xl:w-[72px]" },
      { src: d11, className: "-bottom-8 -left-6 w-14 xl:w-16" },
    ],
  },
  {
    id: "fund2",
    titulo: "Ensino Fundamental II",
    tagline: "Mais autonomia, investigação e pensamento crítico.",
    corpo:
      "Os alunos aprofundam conhecimentos, desenvolvem argumentação e conectam diferentes áreas por meio de pesquisas e projetos.",
    foto: imgFund2,
    fotoAlt:
      "Estudantes do Fundamental II colaborando em um projeto de pesquisa com livros e materiais",
    tag: tagFund2,
    bg: bgFund2,
    bgPos: "center",
    accent: "var(--campaign-blue)",
    doodles: [
      { src: d07, className: "-left-8 -top-8 w-16 xl:w-[72px]" },
      { src: d14, className: "-bottom-8 -right-6 w-14 xl:w-16" },
    ],
  },
];

function Intro({ tone }: { tone: "light" | "dark" }) {
  const titleColor = tone === "light" ? "text-white" : "text-marrom";
  const bodyColor = tone === "light" ? "text-white/85" : "text-foreground/80";
  return (
    <>
      <h2
        className={`font-display text-[clamp(1.9rem,3vw,2.75rem)] font-extrabold leading-[1.05] ${titleColor}`}
      >
        Uma jornada completa para cada etapa.
      </h2>
      <p className={`mt-5 max-w-md text-base leading-relaxed ${bodyColor}`}>
        Cada fase do desenvolvimento traz novas descobertas e desafios. Por isso
        a Escola Montessori oferece uma trajetória completa,{" "}
        <strong className="font-semibold">do Maternal ao 9º ano</strong>.
      </p>
    </>
  );
}

export function Ensino() {
  const [ativo, setAtivo] = useState(0);
  const [ativoMobile, setAtivoMobile] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  /* Fonte única de estado: progresso do scroll dentro da seção */
  useEffect(() => {
    const compute = () => {
      rafRef.current = null;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progresso = Math.min(Math.max(-rect.top / total, 0), 0.9999);
      const i = Math.min(2, Math.floor(progresso * 3));
      setAtivo((prev) => (prev === i ? prev : i));
    };
    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const irPara = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const topo = rect.top + window.scrollY;
    const total = rect.height - window.innerHeight;
    const alvo = topo + total * ((i + 0.5) / 3);
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAtivo(i);
    window.scrollTo({ top: alvo, behavior: reduz ? "auto" : "smooth" });
  }, []);

  const nivel = niveis[ativo]!;

  return (
    <section
      id="ensino"
      aria-label="Ensino — nossas séries"
      className="relative scroll-mt-24 bg-campaign-paper"
    >
      {/* ---------- DESKTOP: jornada sticky ---------- */}
      <div ref={trackRef} className="relative hidden h-[300vh] lg:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          {niveis.map((n, i) => (
            <div
              key={n.id}
              aria-hidden="true"
              className={`jornada-bg ${i === ativo ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${n.bg})`, backgroundPosition: n.bgPos }}
            />
          ))}

          <div className="relative mx-auto grid h-full max-w-[1280px] grid-cols-12 items-center gap-8 px-10">
            {/* esquerda: headline, intro e tags */}
            <div className="col-span-4 flex h-[70vh] flex-col justify-between py-6">
              <div>
                <Intro tone="light" />
              </div>

              <div
                className="flex flex-col items-start gap-5"
                role="tablist"
                aria-label="Níveis de ensino"
              >
                {niveis.map((n, i) => (
                  <button
                    key={n.id}
                    type="button"
                    role="tab"
                    aria-selected={i === ativo}
                    aria-controls={`jornada-painel-${n.id}`}
                    onClick={() => irPara(i)}
                    className={`jornada-tag ${i === ativo ? "is-active" : ""}`}
                  >
                    <img
                      src={n.tag}
                      alt={n.titulo}
                      className="h-9 w-auto xl:h-11"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* centro: fotografia */}
            <div className="col-span-4">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)]">
                  {niveis.map((n, i) => (
                    <img
                      key={n.id}
                      src={n.foto}
                      alt={i === ativo ? n.fotoAlt : ""}
                      aria-hidden={i === ativo ? undefined : true}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className={`jornada-photo h-full w-full object-cover ${
                        i === ativo ? "is-active" : ""
                      }`}
                    />
                  ))}
                </div>
                {nivel.doodles.map((d) => (
                  <img
                    key={d.src}
                    src={d.src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className={`pointer-events-none absolute opacity-90 ${d.className}`}
                  />
                ))}
              </div>
            </div>

            {/* direita: textos da etapa */}
            <div
              key={nivel.id}
              id={`jornada-painel-${nivel.id}`}
              role="tabpanel"
              className="jornada-swap col-span-4"
            >
              <h3 className="font-display text-[clamp(1.4rem,2vw,2.1rem)] font-extrabold leading-tight text-white">
                {nivel.tagline}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/90">
                {nivel.corpo}
              </p>
              {nivel.destaque ? (
                <p
                  className="mt-5 rounded-2xl bg-black/20 p-5 font-medium leading-relaxed text-white"
                  style={{ borderLeft: `4px solid ${nivel.accent}` }}
                >
                  {nivel.destaque}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- MOBILE / TABLET: seleção por tags ---------- */}
      <div className="lg:hidden">
        <div className="mx-auto max-w-2xl px-6 pb-8 pt-14">
          <Intro tone="dark" />
        </div>

        <div
          className="mx-auto flex max-w-2xl flex-wrap gap-4 px-6"
          role="tablist"
          aria-label="Níveis de ensino"
        >
          {niveis.map((n, i) => (
            <button
              key={n.id}
              type="button"
              role="tab"
              aria-selected={i === ativoMobile}
              onClick={() => setAtivoMobile(i)}
              className={`jornada-tag ${i === ativoMobile ? "is-active" : ""}`}
            >
              <img src={n.tag} alt={n.titulo} className="h-8 w-auto" />
            </button>
          ))}
        </div>

        {niveis.map((n, i) =>
          i === ativoMobile ? (
            <article
              key={n.id}
              className="relative mt-8 overflow-hidden bg-cover px-6 py-12"
              style={{
                backgroundImage: `url(${n.bg})`,
                backgroundPosition: n.bgPos,
              }}
            >
              <div className="relative mx-auto max-w-2xl">
                <h3 className="font-display text-2xl font-extrabold leading-tight text-white">
                  {n.tagline}
                </h3>

                <div className="relative mt-6">
                  <img
                    src={n.foto}
                    alt={n.fotoAlt}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_24px_50px_-26px_rgba(0,0,0,0.6)]"
                  />
                  <img
                    src={n.doodles[0]!.src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute right-2 -top-6 w-16 opacity-90"
                  />
                </div>

                <p className="mt-6 leading-relaxed text-white/90">{n.corpo}</p>
                {n.destaque ? (
                  <p
                    className="mt-5 rounded-2xl bg-black/20 p-5 font-medium leading-relaxed text-white"
                    style={{ borderLeft: `4px solid ${n.accent}` }}
                  >
                    {n.destaque}
                  </p>
                ) : null}
              </div>
            </article>
          ) : null,
        )}
      </div>
    </section>
  );
}
