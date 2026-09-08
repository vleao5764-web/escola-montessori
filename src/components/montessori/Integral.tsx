import { useEffect, useRef } from "react";
import fotoRotina from "@/assets/dia-a-dia-08.png";
import fotoArtesanato from "@/assets/fotos-reais/integral-artesanato.jpg";
import fotoCozinha from "@/assets/fotos-reais/integral-cozinha.png";
import fotoHorta from "@/assets/fotos-reais/integral-horta.png";
import fotoPiscina from "@/assets/fotos-reais/integral-piscina.png";

const experiencias = [
  {
    titulo: "Acompanhamento",
    atividades: ["Apoio pedagógico", "Inglês"],
  },
  {
    titulo: "Corpo em movimento",
    atividades: ["Recreação aquática", "Poliesportivo", "Psicomotricidade", "Cheerleading"],
  },
  {
    titulo: "Expressão e estratégia",
    atividades: ["Teatro", "Musicalização", "Oficinas criativas", "Xadrez"],
  },
  {
    titulo: "Mão na massa",
    atividades: ["Cozinha experimental", "Artesanato", "Costura", "Horta"],
  },
];

const fotos = [
  {
    src: fotoRotina,
    alt: "Aluno em atividade de desenho na Escola Montessori",
  },
  { src: fotoPiscina, alt: "Crianças em recreação aquática" },
  { src: fotoArtesanato, alt: "Aluno em atividade de artesanato" },
  { src: fotoCozinha, alt: "Alunas em atividade de cozinha experimental" },
  { src: fotoHorta, alt: "Aluna cuidando da horta da escola" },
];

export function Integral() {
  const carrosselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carrossel = carrosselRef.current;
    if (!carrossel) return;

    let indice = 0;
    let retorno: number | undefined;

    const avancar = () => {
      const proximoIndice = indice + 1;
      const proximoSlide = carrossel.children[proximoIndice] as HTMLElement | undefined;
      if (!proximoSlide) return;

      carrossel.scrollTo({ left: proximoSlide.offsetLeft, behavior: "smooth" });
      indice = proximoIndice;

      if (indice === fotos.length) {
        retorno = window.setTimeout(() => {
          carrossel.scrollTo({ left: 0, behavior: "auto" });
          indice = 0;
        }, 750);
      }
    };

    const intervalo = window.setInterval(avancar, 4200);
    return () => {
      window.clearInterval(intervalo);
      if (retorno) window.clearTimeout(retorno);
    };
  }, []);

  return (
    <section
      aria-label="Montessori Integral e aulas especializadas"
      className="bg-amarelo pb-16 pt-6 md:pb-20 md:pt-16"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <header className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full bg-footer px-4 py-2 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-white">
              Montessori Integral
            </span>
            <h2 className="mt-5 font-display text-[clamp(1.5rem,6.9vw,2.25rem)] font-extrabold leading-[0.95] tracking-tight text-marrom sm:text-5xl xl:text-6xl">
              <span className="whitespace-nowrap">Uma rotina completa</span>
              <br />
              <span className="whitespace-nowrap">de experiências.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-footer">
              O Montessori Integral amplia as experiências ao longo da rotina escolar, unindo
              acompanhamento pedagógico a atividades culturais, esportivas, recreativas e práticas.
            </p>
            <div className="mt-5 max-w-xl text-footer">
              <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.24em]">
                Um dia completo
              </p>
              <p className="mt-2 font-display text-xl font-extrabold leading-tight sm:text-2xl">
                Experiências que ampliam o aprender.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-footer">
              Atividades que fazem parte da rotina
            </p>
            <div className="mt-5 border-t-2 border-footer/20">
              {experiencias.map((experiencia) => (
                <article
                  key={experiencia.titulo}
                  className="border-b-2 border-footer/20 pb-8 pt-4 sm:pb-10 sm:pt-5"
                >
                  <span className="inline-flex rounded-full bg-footer px-3 py-1 font-display text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-white">
                    {experiencia.titulo}
                  </span>
                  <ul className="mt-2 grid gap-x-6 gap-y-2 text-base font-semibold leading-snug text-marrom sm:grid-cols-2">
                    {experiencia.atividades.map((atividade) => (
                      <li key={atividade} className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full bg-campaign-blue"
                          aria-hidden="true"
                        />
                        {atividade}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </header>

        <div
          ref={carrosselRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-14 md:gap-5"
          aria-label="Fotos das atividades do Montessori Integral"
        >
          {[...fotos, fotos[0]!].map((foto, indice) => (
            <figure
              key={`${foto.alt}-${indice}`}
              className="relative h-72 w-[80%] shrink-0 snap-start overflow-hidden rounded-[24px] sm:w-[46%] md:h-96 lg:w-[31%]"
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
      </div>
    </section>
  );
}
