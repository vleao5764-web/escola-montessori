import desenhoCamera from "@/assets/desenhos/Desenho_18.png.asset.json";
import fachadaMontessori from "@/assets/fachada-montessori.png";

const itens = [
  {
    nome: "Salas amplas",
    desc: "Espaços claros e organizados para trabalho individual e em grupo.",
  },
  {
    nome: "Laboratórios",
    desc: "Experimentação e investigação científica na prática.",
  },
  {
    nome: "Espaços de recreação",
    desc: "Áreas para brincar, criar e conviver com liberdade.",
  },
  {
    nome: "Áreas verdes",
    desc: "Contato com a natureza no dia a dia escolar.",
  },
  {
    nome: "Ginásio poliesportivo",
    desc: "Movimento, esporte e trabalho em equipe.",
  },
  {
    nome: "Materiais montessorianos",
    desc: "Materiais concretos ao alcance das mãos dos alunos.",
  },
];

const acentos = [
  "var(--campaign-orange)",
  "var(--campaign-blue)",
  "var(--campaign-green)",
  "var(--campaign-orange)",
  "var(--campaign-burnt-orange)",
  "var(--campaign-blue)",
];

export function Estrutura() {
  return (
    <section
      id="estrutura"
      aria-label="Estrutura da escola"
      className="scroll-mt-24 bg-[#2a1782] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {/* abertura */}
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full bg-campaign-orange px-4 py-1.5 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-campaign-deep-purple">
              Ambiente preparado
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.7rem,7.8vw,2.25rem)] font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl">
              Um ambiente
              <br />
              <span className="whitespace-nowrap">
                que também <span className="text-campaign-orange">educa.</span>
              </span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/80 lg:col-span-5 lg:pb-3">
            Cada espaço é preparado para favorecer autonomia, concentração, movimento, convivência e
            construção ativa do conhecimento.
          </p>
        </header>

        <figure className="relative mt-12 overflow-hidden rounded-[28px] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)]">
          <img
            src={fachadaMontessori}
            alt="Vista aérea da fachada da Escola Montessori em Brasília"
            loading="lazy"
            className="aspect-[2/1] w-full object-cover object-center"
          />
          <figcaption className="absolute bottom-5 left-5 rounded-[14px] bg-campaign-deep-purple/90 px-5 py-3 font-display text-sm font-bold text-white backdrop-blur-sm md:bottom-7 md:left-7">
            Escola Montessori · Brasília
          </figcaption>
        </figure>

        {/* grid 3×2 de cards */}
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((item, i) => (
            <li key={item.nome} className="rounded-[20px] border border-white/15 bg-[#3a2599] p-6">
              <span
                className="font-display text-sm font-extrabold tabular-nums tracking-widest"
                style={{ color: acentos[i] }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-white">
                {item.nome}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{item.desc}</p>
            </li>
          ))}
        </ol>

        {/* CTA em painel horizontal */}
        <div className="relative mt-12 flex flex-col items-start gap-6 overflow-hidden rounded-[24px] bg-[#684690] p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <p className="relative font-display text-2xl font-extrabold leading-tight text-white md:text-4xl">
            Faça um tour pela escola.
          </p>
          <img
            src={desenhoCamera.url}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute right-1/2 top-5 hidden w-16 opacity-35 lg:block"
          />
          <a
            href="#agende"
            className="relative inline-flex items-center justify-center rounded-[14px] bg-amarelo px-8 py-4 font-display text-base font-extrabold uppercase tracking-wide text-footer transition hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Agende sua visita
          </a>
        </div>
      </div>
    </section>
  );
}
