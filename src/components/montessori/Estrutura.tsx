import desenhoCamera from "@/assets/desenhos/Desenho_18.png.asset.json";
import fachadaMontessori from "@/assets/fachada-montessori.png";
import fotoAreaExterna from "@/assets/fotos-reais/estrutura-area-externa.jpg";
import fotoCiencias from "@/assets/fotos-reais/estrutura-ciencias.jpg";
import fotoFachada from "@/assets/fotos-reais/estrutura-fachada.jpg";
import fotoParquinho from "@/assets/fotos-reais/estrutura-parquinho.jpg";

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

const fotosEstrutura = [
  { src: fotoFachada, alt: "Fachada da Escola Montessori" },
  { src: fotoCiencias, alt: "Microscópios do laboratório da Escola Montessori" },
  { src: fotoAreaExterna, alt: "Área externa da Escola Montessori" },
  { src: fotoParquinho, alt: "Parquinho da Escola Montessori" },
];

export function Estrutura() {
  return (
    <section id="estrutura" aria-label="Estrutura da escola" className="scroll-mt-24 bg-[#2a1782]">
      <figure className="relative mx-4 mt-4 min-h-[34rem] overflow-hidden rounded-[24px] bg-campaign-blue md:mx-0 md:mt-0 md:min-h-[46rem] md:rounded-none">
        <img
          src={fachadaMontessori}
          alt="Vista aérea da fachada da Escola Montessori em Brasília"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120b42]/95 via-[#120b42]/60 to-[#120b42]/10"
        />
        <figcaption className="absolute inset-x-0 bottom-0 mx-auto max-w-[1280px] px-6 pb-12 pt-32 text-white md:pb-20">
          <span className="inline-block rounded-full bg-campaign-orange px-4 py-1.5 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-campaign-deep-purple">
            Ambiente preparado
          </span>
          <div className="mt-6 grid gap-8 xl:grid-cols-12 xl:items-end">
            <div className="xl:col-span-7">
              <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-white/75">
                Escola Montessori · Brasília
              </p>
              <h2 className="font-display text-[clamp(2rem,9vw,2.5rem)] font-extrabold leading-[0.95] tracking-tight md:text-[clamp(2.5rem,6vw,5rem)]">
                Um ambiente
                <br />
                <span className="md:whitespace-nowrap">
                  que também <span className="text-campaign-orange">educa.</span>
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-white/90 xl:col-start-9 xl:col-span-4 xl:justify-self-end xl:pb-2">
              Cada espaço é preparado para favorecer autonomia, concentração, movimento, convivência
              e construção ativa do conhecimento.
            </p>
          </div>
        </figcaption>
      </figure>

      <div className="mx-auto max-w-[1280px] px-6 pb-12 pt-5 md:pb-16 md:pt-8">
        {/* grid 3×2 de cards */}
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {fotosEstrutura.map((foto) => (
            <figure
              key={foto.alt}
              className="aspect-[4/3] overflow-hidden rounded-[20px] bg-campaign-blue"
            >
              <img
                src={foto.src}
                alt={foto.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>

        {/* CTA em painel horizontal */}
        <div className="relative mt-12 flex flex-col items-center gap-6 overflow-hidden rounded-[24px] bg-[#684690] p-8 text-center md:flex-row md:items-center md:justify-between md:p-10 md:text-left">
          <p className="relative font-display text-2xl font-extrabold leading-tight text-white md:text-4xl">
            Conheça a Escola Montessori de perto.
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
            className="relative inline-flex items-center justify-center rounded-[14px] bg-amarelo px-8 py-4 font-display text-base font-extrabold uppercase tracking-wide text-footer shadow-[0_6px_0_0_var(--campaign-burnt-orange)] transition-[transform,box-shadow] hover:translate-y-0.5 hover:shadow-[0_3px_0_0_var(--campaign-burnt-orange)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Agende sua visita
          </a>
        </div>
      </div>
    </section>
  );
}
