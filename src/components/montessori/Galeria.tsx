import g2 from "@/assets/dia-a-dia-02.png";
import g4 from "@/assets/dia-a-dia-11.jpg";
import g5 from "@/assets/dia-a-dia-07.png";
import galeriaDiaADia from "@/assets/fotos-reais/galeria-dia-a-dia.jpg";
import galeriaSalaCosmica from "@/assets/fotos-reais/galeria-sala-cosmica.jpg";
import galeriaSalaTecnologia from "@/assets/fotos-reais/galeria-sala-tecnologia.jpg";
import galeriaConvivencia from "@/assets/fotos-reais/galeria-convivencia.jpg";
import galeriaQuadra from "@/assets/fotos-reais/galeria-quadra.jpg";
import d09 from "@/assets/desenhos/Desenho_09.png.asset.json";

const fotos = [
  { src: galeriaDiaADia, alt: "Alunos no pátio da Escola Montessori" },
  { src: g2, alt: "Momento do dia a dia na Escola Montessori" },
  { src: galeriaSalaCosmica, alt: "Sala de aula com ambiente de educação cósmica" },
  { src: galeriaSalaTecnologia, alt: "Alunos em atividade de tecnologia na Escola Montessori" },
  { src: g5, alt: "Atividade coletiva na Escola Montessori" },
  { src: galeriaConvivencia, alt: "Alunos em momento de convivência na Escola Montessori" },
  { src: galeriaQuadra, alt: "Quadra coberta da Escola Montessori" },
];

function Foto({ i, className = "", sizes }: { i: number; className?: string; sizes?: string }) {
  const f = fotos[i]!;
  return (
    <figure className={`group mb-6 break-inside-avoid overflow-hidden rounded-[24px] ${className}`}>
      <img
        src={f.src}
        alt={f.alt}
        loading="lazy"
        sizes={sizes}
        className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
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

        {/* Composição fotográfica */}
        <div className="relative mt-12 hidden columns-2 gap-6 md:block">
          <Foto i={0} sizes="50vw" />
          <Foto i={1} sizes="40vw" />
          <Foto i={2} sizes="40vw" />
          <Foto i={3} sizes="50vw" />
          <Foto i={4} sizes="40vw" />
          <Foto i={5} sizes="40vw" />
          <Foto i={6} sizes="40vw" />

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
            <Foto i={0} sizes="100vw" />
            <p className="mt-3 text-sm leading-relaxed text-white/70">{fotos[0]!.alt}</p>
          </div>
          <Foto i={1} sizes="100vw" />
          <Foto i={2} sizes="100vw" />
          <Foto i={3} sizes="100vw" />
          <Foto i={4} sizes="100vw" />
          <Foto i={5} sizes="100vw" />
          <Foto i={6} sizes="100vw" />
        </div>
      </div>
    </section>
  );
}
