import { useEffect, useMemo, useState } from "react";

import headlineAmarelo from "@/assets/headline-fundo-amarelo.png";
import headlineRoxo from "@/assets/headline-fundo-roxo.png";
import headlineAzul from "@/assets/headline-fundo-azul.png";

import bgInfantil from "@/assets/bg-infantil.webp";
import bgInfantilVert from "@/assets/bg-infantil-solid.png";
import bgFund1 from "@/assets/bg-fund1.webp";
import bgFund1Vert from "@/assets/bg-fund1-vert.webp";
import bgFund2 from "@/assets/bg-fund2.webp";
import bgFund2Vert from "@/assets/bg-fund2-vert.png";

import alunoInfantil from "@/assets/aluno-infantil.webp";
import alunoFund1 from "@/assets/aluno-fund1.webp";
import alunoFund2 from "@/assets/aluno-fund2.webp";

import tagInfantil from "@/assets/tag-infantil.png";
import tagFund1 from "@/assets/tag-fund1.png";
import tagFund2 from "@/assets/tag-fund2.png";
import tag2027 from "@/assets/tag-2027.png";

import seloInfantil from "@/assets/selo-matriculas-infantil.png";
import seloFund1 from "@/assets/selo-matriculas-fund1.png";
import seloFund2 from "@/assets/selo-matriculas-fund2.png";

import ensinosTurnos from "@/assets/ensinos-turnos.png";

import desenho04 from "@/assets/desenhos/Desenho_04.png";
import desenho06 from "@/assets/desenhos/Desenho_06.png";
import desenho07 from "@/assets/desenhos/Desenho_07.png";
import desenho11 from "@/assets/desenhos/Desenho_11.png";
import desenho14 from "@/assets/desenhos/Desenho_14.png";
import desenho01 from "@/assets/desenhos/Desenho_01.png";

type LevelId = "infantil" | "fund1" | "fund2";

type Level = {
  id: LevelId;
  label: string;
  bg: string;
  bgMobile: string;
  bgPosition: string;
  aluno: string;
  alunoAlt: string;
  /** escala e ancoragem individuais da fotografia (cada KV tem proporção própria) */
  alunoDesktop: string;
  alunoMobile: string;
  alunoMaxH: string;
  alunoMaxHMobile: string;
  alunoOffset: string;
  headline: string;
  tag: string;
  tagAlt: string;
  /** altura própria de cada tag oficial (lettering com proporções distintas) */
  tagHeight: string;
  selo: string;
  seloHeight: string;
  desenhos: { src: string; className: string }[];
  accent: string;
  ctaBg: string;
  ctaFg: string;
};

const LEVELS: Level[] = [
  {
    id: "infantil",
    label: "Educação Infantil",
    bg: bgInfantil,
    bgMobile: bgInfantilVert,
    bgPosition: "center 30%",
    aluno: alunoInfantil,
    alunoAlt:
      "Aluno da Educação Infantil da Escola Montessori empilhando blocos coloridos",
    alunoDesktop: "min(200%, 84rem)",
    alunoMobile: "min(150%, 44rem)",
    alunoMaxH: "min(74svh, 41.5rem)",
    alunoMaxHMobile: "min(58svh, 34rem)",
    alunoOffset: "0%",
    headline: headlineAmarelo,
    tag: tagInfantil,
    tagAlt: "Educação Infantil",
    tagHeight: "clamp(1.7rem,3.4vh,2.5rem)",
    selo: seloInfantil,
    seloHeight: "clamp(6.5rem,17vh,10.5rem)",
    desenhos: [
      { src: desenho01, className: "left-[33%] top-[19%] w-[3.4rem] lg:w-[4.6rem]" },
      { src: desenho04, className: "left-[10%] top-[26%] w-[2.8rem] lg:w-[4.2rem]" },
    ],
    accent: "var(--campaign-blue)",
    ctaBg: "var(--campaign-deep-purple)",
    ctaFg: "#ffffff",
  },
  {
    id: "fund1",
    label: "Fundamental I",
    bg: bgFund1,
    bgMobile: bgFund1Vert,
    bgPosition: "center 35%",
    aluno: alunoFund1,
    alunoAlt:
      "Aluna do Fundamental I da Escola Montessori em atividade de experimentação científica",
    alunoDesktop: "min(118%, 58rem)",
    alunoMobile: "min(108%, 32rem)",
    alunoMaxH: "min(76svh, 46rem)",
    alunoMaxHMobile: "min(54svh, 31rem)",
    alunoOffset: "0%",
    headline: headlineRoxo,
    tag: tagFund1,
    tagAlt: "Fundamental I",
    tagHeight: "clamp(1.7rem,3.4vh,2.5rem)",
    selo: seloFund1,
    seloHeight: "clamp(6.5rem,17vh,10.5rem)",
    desenhos: [
      { src: desenho06, className: "left-[37%] bottom-[3%] w-[3.4rem] lg:w-[5rem]" },
      { src: desenho11, className: "right-[30%] top-[19%] w-[3.4rem] lg:w-[4.6rem]" },
    ],
    accent: "var(--campaign-orange)",
    ctaBg: "var(--campaign-orange)",
    ctaFg: "var(--campaign-deep-purple)",
  },
  {
    id: "fund2",
    label: "Fundamental II",
    bg: bgFund2,
    bgMobile: bgFund2Vert,
    bgPosition: "center 40%",
    aluno: alunoFund2,
    alunoAlt:
      "Aluno do Fundamental II da Escola Montessori em pé sobre um cubo amarelo segurando um projeto de robótica",
    alunoDesktop: "min(126%, 60rem)",
    alunoMobile: "min(112%, 33rem)",
    alunoMaxH: "min(90svh, 54rem)",
    alunoMaxHMobile: "min(62svh, 36rem)",
    alunoOffset: "0%",
    headline: headlineAzul,
    tag: tagFund2,
    tagAlt: "Fundamental II",
    tagHeight: "clamp(1.7rem,3.4vh,2.5rem)",
    selo: seloFund2,
    seloHeight: "clamp(6.5rem,17vh,10.5rem)",
    desenhos: [
      { src: desenho07, className: "left-[33%] top-[19%] w-[3.4rem] lg:w-[4.6rem]" },
      { src: desenho14, className: "right-[30%] bottom-[9%] w-[3.4rem] lg:w-[5rem]" },
    ],
    accent: "var(--campaign-orange)",
    ctaBg: "var(--campaign-orange)",
    ctaFg: "var(--campaign-deep-purple)",
  },
];

const INITIAL: LevelId = "fund2";

export function Hero() {
  const [active, setActive] = useState<LevelId>(INITIAL);

  const level = useMemo(
    () => LEVELS.find((l) => l.id === active) ?? LEVELS[2]!,
    [active],
  );

  useEffect(() => {
    let cancelled = false;
    const warm = () => {
      if (cancelled) return;
      for (const l of LEVELS) {
        if (l.id === INITIAL) continue;
        for (const src of [l.bg, l.bgMobile, l.aluno, l.headline, l.tag, l.selo]) {
          const img = new Image();
          img.src = src;
        }
      }
    };
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(warm, { timeout: 3000 })
      : window.setTimeout(warm, 1800);
    return () => {
      cancelled = true;
      if (!w.requestIdleCallback) window.clearTimeout(id as number);
    };
  }, []);

  const onKeyNav = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = LEVELS.findIndex((l) => l.id === active);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive(LEVELS[(i + 1) % LEVELS.length]!.id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive(LEVELS[(i - 1 + LEVELS.length) % LEVELS.length]!.id);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(LEVELS[0]!.id);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(LEVELS[LEVELS.length - 1]!.id);
    }
  };

  return (
    <section
      id="topo"
      className="hero-shell relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-campaign-deep-purple text-white"
      style={
        {
          "--hero-accent": level.accent,
          "--hero-cta-bg": level.ctaBg,
          "--hero-cta-fg": level.ctaFg,
        } as React.CSSProperties
      }
    >
      {/* Backgrounds oficiais */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {LEVELS.map((l) => (
          <div
            key={l.id}
            className={`hero-bg absolute inset-0 ${l.id === active ? "is-active" : ""}`}
          >
            <img
              src={l.bg}
              alt=""
              loading={l.id === INITIAL ? "eager" : "lazy"}
              // eslint-disable-next-line react/no-unknown-property
              fetchPriority={l.id === INITIAL ? "high" : "low"}
              className="hidden h-full w-full object-cover sm:block"
              style={{ objectPosition: l.bgPosition }}
            />
            <img
              src={l.bgMobile}
              alt=""
              loading={l.id === INITIAL ? "eager" : "lazy"}
              className="h-full w-full object-cover sm:hidden"
              style={{ objectPosition: l.bgPosition }}
            />
          </div>
        ))}
      </div>

      {/* Desenhos oficiais em traço branco */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {level.desenhos.map((d) => (
          <img
            key={d.src}
            src={d.src}
            alt=""
            className={`hero-doodle absolute hidden opacity-70 sm:block ${d.className}`}
          />
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-[86rem] flex-1 flex-col px-5 pb-10 pt-[6.5rem] sm:px-8 lg:pb-8 lg:pt-[clamp(6rem,10vh,7.5rem)]">
        {/* Seletor de segmento — tags oficiais como botões */}
        <div
          role="tablist"
          aria-label="Escolha o nível de ensino"
          onKeyDown={onKeyNav}
          className="hero-tagsel hero-in hero-in-1 relative z-20 flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:justify-start"
        >
          {LEVELS.map((l) => {
            const isActive = l.id === active;
            return (
              <button
                key={l.id}
                type="button"
                role="tab"
                id={`hero-tab-${l.id}`}
                aria-selected={isActive}
                aria-label={l.label}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(l.id)}
                className={`hero-tagbtn ${isActive ? "is-active" : ""}`}
              >
                <img
                  src={l.tag}
                  alt=""
                  className="block w-auto"
                  style={{ height: l.tagHeight, objectFit: "contain" }}
                />
              </button>
            );
          })}
        </div>

        {/* Composição editorial em 3 zonas */}
        <div className="grid flex-1 items-center gap-6 pt-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1.06fr)_minmax(0,0.82fr)] lg:gap-3 lg:pt-2">
          {/* ZONA 1 — slogan */}
          <div className="relative z-20 order-1 text-center lg:text-left">
            <h1 className="hero-in hero-in-2">
              <span className="hero-mask block">
                <img
                  key={`headline-${level.id}`}
                  src={level.headline}
                  alt="A base de tudo começa aqui."
                  width={1920}
                  height={1189}
                  className="hero-mask-item mx-auto h-auto w-full max-w-[min(32rem,80vw)] lg:mx-0 lg:max-w-[clamp(20rem,32vw,30rem)]"
                  style={{ objectFit: "contain" }}
                />
              </span>
            </h1>

            <div className="hero-in hero-in-3 mt-4 flex justify-center lg:justify-start">
              <img
                src={tag2027}
                alt="2027"
                className="h-auto w-auto"
                style={{ height: "clamp(1.9rem,4vh,2.9rem)", objectFit: "contain" }}
              />
            </div>

            <p className="hero-in hero-in-3 mx-auto mt-5 max-w-md text-[clamp(0.95rem,1.15vw,1.1rem)] font-medium leading-snug text-white/90 lg:mx-0">
              Uma educação que respeita o potencial de cada aluno, desenvolve
              autonomia e prepara para os desafios de toda uma jornada.
            </p>

            <p className="hero-in hero-in-3 mx-auto mt-4 max-w-md text-[clamp(0.9rem,1.05vw,1rem)] font-semibold leading-snug text-white/85 lg:mx-0">
              <span className="highlighter-roxo">
                Na Escola Montessori, cada aluno encontra um ambiente preparado
                para aprender, descobrir e construir seu próprio caminho.
              </span>
            </p>
          </div>

          {/* ZONA 2 — aluno e seus objetos */}
          <div className="relative order-2 flex items-end justify-center self-end px-6 sm:px-7 lg:order-2 lg:h-full">
            {LEVELS.map((l) => (
              <img
                key={l.id}
                src={l.aluno}
                alt={l.id === active ? l.alunoAlt : ""}
                aria-hidden={l.id === active ? undefined : "true"}
                loading={l.id === INITIAL ? "eager" : "lazy"}
                className={`hero-aluno ${l.id === active ? "is-active relative" : "absolute inset-x-0 bottom-0"} mx-auto block h-auto object-contain`}
                style={{
                  width: `var(--aluno-w)`,
                  maxHeight: l.alunoMaxHMobile,
                  transform: `translateY(${l.alunoOffset})`,
                  ["--aluno-w" as string]: l.alunoMobile,
                  ["--aluno-w-lg" as string]: l.alunoDesktop,
                  ["--aluno-h-lg" as string]: l.alunoMaxH,
                }}
                data-aluno
                data-aluno-fit={l.id === "infantil" ? "height" : undefined}
              />
            ))}
          </div>

          {/* ZONA 3 — informações e CTA */}
          <div className="relative z-20 order-3 flex flex-col items-center gap-5 lg:items-start">
            <img
              src={ensinosTurnos}
              alt="Do Maternal ao 9º ano · Turnos matutino, vespertino e integral"
              className="hero-in hero-in-4 order-2 h-auto w-full max-w-[min(16rem,62vw)] lg:order-1 lg:max-w-[280px]"
              style={{ objectFit: "contain" }}
            />

            <a
              href="#agende"
              aria-label="Matrículas abertas — agende sua visita"
              onClick={(e) => {
                const el = document.getElementById("agende");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="hero-selo-cta hero-in hero-in-5 order-1 lg:order-2"
            >
              <img
                key={`selo-${level.id}`}
                src={level.selo}
                alt="Matrículas Abertas"
                className="hero-swap h-auto w-auto max-w-full"
                style={{ height: level.seloHeight, objectFit: "contain" }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
