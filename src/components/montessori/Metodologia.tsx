import mariaMontessori from "@/assets/maria-montessori.png";

type Pilar = {
  num: string;
  title: string;
  text: string;
  accent: string;
};

const PILARES: Pilar[] = [
  {
    num: "01",
    title: "Ambiente preparado",
    text: "Cada espaço favorece autonomia, concentração, movimento e acesso independente aos materiais, com intencionalidade pedagógica que estimula descobertas.",
    accent: "#0093cd",
  },
  {
    num: "02",
    title: "Autonomia com responsabilidade",
    text: "O aluno aprende a fazer escolhas, organizar atividades e assumir responsabilidades compatíveis com sua etapa, com liberdade dentro de um ambiente estruturado.",
    accent: "#684690",
  },
  {
    num: "03",
    title: "Aprendizagem prática",
    text: "Materiais concretos e experiências sensoriais permitem observar, manipular e construir relações antes de avançar para conceitos abstratos.",
    accent: "#64a33d",
  },
  {
    num: "04",
    title: "Respeito à individualidade",
    text: "A observação cuidadosa permite oferecer desafios adequados ao ritmo e aos interesses de cada aluno.",
    accent: "#f6a807",
  },
];

const AREAS = [
  {
    nome: "Vida Prática",
    desc: "Autonomia, organização e coordenação",
    bg: "bg-campaign-blue",
    fg: "text-white",
    sub: "text-white/85",
  },
  {
    nome: "Sensorial",
    desc: "Percepção, comparação e pensamento",
    bg: "bg-campaign-purple",
    fg: "text-white",
    sub: "text-white/85",
  },
  {
    nome: "Linguagem",
    desc: "Comunicação, leitura e escrita",
    bg: "bg-campaign-orange",
    fg: "text-campaign-deep-purple",
    sub: "text-campaign-deep-purple/80",
  },
  {
    nome: "Matemática",
    desc: "Conceitos pela experiência concreta",
    bg: "bg-campaign-green",
    fg: "text-white",
    sub: "text-white/85",
  },
  {
    nome: "Educação Cósmica",
    desc: "Relações entre universo, vida, humanidade e responsabilidade com o mundo",
    bg: "bg-campaign-deep-purple",
    fg: "text-white",
    sub: "text-white/85",
  },
];

export function Metodologia() {
  return (
    <section
      id="metodologia"
      aria-labelledby="metodologia-titulo"
      className="scroll-mt-24 bg-campaign-paper py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* ── ABERTURA ── */}
        <div className="grid gap-10 lg:grid-cols-[65fr_35fr] lg:items-stretch">
          <div>
            <span className="inline-block rounded-full bg-campaign-orange px-4 py-1.5 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.28em] text-campaign-deep-purple">
              Metodologia
            </span>
            <h2
              id="metodologia-titulo"
              className="mt-7 max-w-[16ch] font-display text-[clamp(2.1rem,4.6vw,3.75rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-campaign-deep-purple"
            >
              Uma metodologia que acredita no{" "}
              <span className="text-campaign-blue">potencial de cada aluno.</span>
            </h2>
            <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-campaign-deep-purple/80 sm:text-[1.05rem]">
              Desenvolvida por Maria Montessori, a metodologia nasceu da observação do
              desenvolvimento humano e da compreensão de que a aprendizagem é mais significativa
              quando o aluno participa ativamente do processo. Aqui, o ambiente é preparado para
              favorecer exploração, concentração e construção progressiva do conhecimento, e o
              educador atua como guia e observador.
            </p>
          </div>

          <figure className="relative min-h-[320px] overflow-hidden rounded-[28px] bg-campaign-deep-purple">
            <img
              src={mariaMontessori}
              alt="Retrato de Maria Montessori"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[center_top]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-campaign-deep-purple/95 via-campaign-deep-purple/55 to-transparent p-7 pt-20 sm:p-9 sm:pt-24">
              <figcaption className="font-display text-2xl font-extrabold leading-tight text-white">
                Maria Montessori
              </figcaption>
              <p className="mt-2 text-sm leading-relaxed text-white/85">Uma educação centrada na autonomia, na observação e no potencial de cada criança.</p>
            </div>
          </figure>
        </div>

        {/* ── PILARES ── */}
        <h3 className="mt-20 max-w-[18ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.015em] text-campaign-deep-purple">
          Os pilares da nossa metodologia
        </h3>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {PILARES.map((p) => (
            <li
              key={p.title}
              className="rounded-[20px] border border-campaign-deep-purple/10 bg-white p-7 shadow-[0_10px_30px_-24px_rgba(42,23,130,0.45)]"
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl font-extrabold leading-none tracking-[-0.03em]"
                style={{ color: p.accent }}
              >
                {p.num}
              </span>
              <h4 className="mt-4 font-display text-xl font-bold leading-tight text-campaign-deep-purple sm:text-2xl">
                {p.title}
              </h4>
              <p className="mt-3 max-w-[52ch] text-[0.95rem] leading-relaxed text-campaign-deep-purple/75">
                {p.text}
              </p>
            </li>
          ))}
        </ul>

        {/* ── ÁREAS DO CONHECIMENTO ── */}
        <h3 className="mt-20 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.015em] text-campaign-deep-purple">
          Áreas do conhecimento
        </h3>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a) => (
            <article key={a.nome} className={`rounded-[20px] p-7 ${a.bg} ${a.fg}`}>
              <h4 className="font-display text-2xl font-extrabold uppercase leading-tight">
                {a.nome}
              </h4>
              <p className={`mt-3 text-[0.95rem] leading-relaxed ${a.sub}`}>{a.desc}</p>
            </article>
          ))}
        </div>

        {/* ── CTA DO CAPÍTULO ── */}
        <div className="mt-16 flex flex-col items-start gap-6 rounded-[28px] bg-campaign-deep-purple p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <p className="max-w-[20ch] font-display text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white">
            Conheça o Método Montessori na prática.
          </p>
          <a
            href="#agende"
            className="inline-block rounded-[14px] bg-campaign-orange px-9 py-4 font-display text-lg font-extrabold uppercase tracking-wide text-campaign-deep-purple transition hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-campaign-orange"
          >
            Agende sua visita
          </a>
        </div>
      </div>
    </section>
  );
}
