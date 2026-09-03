import g1 from "@/assets/galeria-1.jpg";
import g2 from "@/assets/galeria-2.jpg";
import g3 from "@/assets/galeria-3.jpg";
import g4 from "@/assets/galeria-4.jpg";
import g5 from "@/assets/galeria-5.jpg";
import d09 from "@/assets/desenhos/Desenho_09.png";

const fotos = [
  { src: g1, alt: "Criança pintando uma borboleta colorida em um cavalete no cantinho de artes" },
  { src: g2, alt: "Crianças brincando de mãos dadas no jardim da escola em dia de sol" },
  { src: g3, alt: "Criança lendo um livro de histórias sentada em um tapete aconchegante da sala" },
  { src: g4, alt: "Crianças preparando salada de frutas juntas em atividade de vida prática" },
  { src: g5, alt: "Educadora guiando crianças em atividade com quebra-cabeça de mapa-múndi" },
];

function Foto({
  i,
  className = "",
  sizes,
}: {
  i: number;
  className?: string;
  sizes?: string;
}) {
  const f = fotos[i]!;
  return (
    <figure className={`group relative overflow-hidden rounded-[24px] ${className}`}>
      <img
        src={f.src}
        alt={f.alt}
        loading="lazy"
        sizes={sizes}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </figure>
  );
}

export function Galeria() {
  return (
    <section
      aria-label="Galeria — um pouco do nosso dia a dia"
      className="relative overflow-hidden bg-campaign-blue py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-[1280px] px-6">
        {/* Abertura editorial */}
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-amarelo">
              Dia a dia
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] text-white md:text-6xl">
              Um pouco do
              <br />
              nosso dia a dia
            </h2>
          </div>
          <p className="md:col-span-5 md:pb-2 text-lg leading-relaxed text-white/85">
            Descobertas, amizades e aprendizados acontecendo todos os dias na
            Escola Montessori.
          </p>
        </div>

        {/* Composição fotográfica — desktop */}
        <div className="relative mt-12 hidden grid-cols-12 gap-6 md:grid">
          <div className="col-span-7">
            <Foto i={0} className="aspect-[4/5]" sizes="55vw" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              {fotos[0]!.alt}
            </p>
          </div>

          <div className="col-span-5 flex flex-col gap-6">
            <Foto i={1} className="aspect-[4/3]" sizes="35vw" />
            <Foto i={2} className="aspect-square" sizes="35vw" />
          </div>

          <div className="col-span-5">
            <Foto i={3} className="aspect-[4/3]" sizes="35vw" />
          </div>
          <div className="col-span-7">
            <Foto i={4} className="aspect-[16/10]" sizes="55vw" />
          </div>

          <img
            src={d09}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute -top-10 right-2 w-16 opacity-70"
          />
        </div>

        {/* Sequência fotográfica — mobile */}
        <div className="mt-10 grid gap-5 md:hidden">
          <div>
            <Foto i={0} className="aspect-[4/5]" sizes="100vw" />
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {fotos[0]!.alt}
            </p>
          </div>
          <Foto i={1} className="aspect-[4/3]" sizes="100vw" />
          <Foto i={2} className="aspect-square" sizes="100vw" />
          <Foto i={3} className="aspect-[4/3]" sizes="100vw" />
          <Foto i={4} className="aspect-[4/3]" sizes="100vw" />
        </div>
      </div>
    </section>
  );
}
