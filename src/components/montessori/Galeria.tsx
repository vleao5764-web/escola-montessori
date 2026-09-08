import g1 from "@/assets/dia-a-dia-01.png";
import g2 from "@/assets/dia-a-dia-02.png";
import g3 from "@/assets/dia-a-dia-03.png";
import g4 from "@/assets/dia-a-dia-11.jpg";
import g5 from "@/assets/dia-a-dia-07.png";
import d09 from "@/assets/desenhos/Desenho_09.png.asset.json";

const fotos = [
  { src: g1, alt: "Alunos em atividade na Escola Montessori" },
  { src: g2, alt: "Momento do dia a dia na Escola Montessori" },
  { src: g3, alt: "Aprendizagem em atividade escolar" },
  { src: g4, alt: "Aluno em atividade manual na Escola Montessori" },
  { src: g5, alt: "Atividade coletiva na Escola Montessori" },
];

function Foto({
  i,
  className = "",
  sizes,
  fit = "cover",
}: {
  i: number;
  className?: string;
  sizes?: string;
  fit?: "cover" | "contain";
}) {
  const f = fotos[i]!;
  return (
    <figure className={`group relative overflow-hidden rounded-[24px] bg-campaign-blue ${className}`}>
      <img
        src={f.src}
        alt={f.alt}
        loading="lazy"
        sizes={sizes}
        className={`h-full w-full transition-transform duration-700 ease-out ${fit === "cover" ? "object-cover group-hover:scale-[1.04]" : "object-contain"}`}
      />
    </figure>
  );
}

export function Galeria() {
  return (
    <section
      aria-label="Galeria: um pouco do nosso dia a dia"
      className="relative overflow-hidden bg-campaign-blue py-16 md:pb-14 md:pt-24"
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
            Descobertas, amizades e aprendizados acontecendo todos os dias na Escola Montessori.
          </p>
        </div>

        {/* Composição fotográfica — desktop */}
        <div className="relative mt-12 hidden grid-cols-12 gap-6 md:grid">
          <div className="col-span-7">
            <Foto i={0} className="aspect-[4/5]" sizes="55vw" />
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
            src={d09.url}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute -top-7 right-3 w-14 opacity-65"
          />
        </div>

        {/* Sequência fotográfica — mobile */}
        <div className="mt-10 grid gap-5 md:hidden">
          <div>
            <Foto i={0} className="aspect-[4/5]" sizes="100vw" />
            <p className="mt-3 text-sm leading-relaxed text-white/70">{fotos[0]!.alt}</p>
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
