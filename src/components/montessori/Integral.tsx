import desenhoChef from "@/assets/desenhos/Desenho_02.png.asset.json";
import desenhoPulso from "@/assets/desenhos/Desenho_10.png.asset.json";
import fotoRotina from "@/assets/dia-a-dia-08.png";
import fotoAprender from "@/assets/galeria-5.jpg";

export function Integral() {
  return (
    <section
      aria-label="Montessori Integral e aulas especializadas"
      className="bg-amarelo py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full bg-footer px-4 py-2 font-display text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-white">
              Montessori Integral
            </span>
            <h2 className="mt-5 font-display text-[clamp(1.5rem,6.9vw,2.25rem)] font-extrabold leading-[0.95] tracking-tight text-marrom sm:text-5xl xl:text-6xl">
              <span className="whitespace-nowrap">Uma rotina completa</span>
              <br />
              <span className="whitespace-nowrap">de experiências.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-footer lg:col-span-5 lg:pb-3">
            O Montessori Integral amplia as experiências ao longo da rotina escolar, unindo
            acompanhamento pedagógico a atividades culturais, esportivas, recreativas e práticas.
          </p>
        </header>

        {/* composição editorial — distinta da grade de ambientes */}
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <article className="relative min-h-[27rem] overflow-hidden rounded-[28px] lg:col-span-7 lg:row-span-2">
            <img src={fotoRotina} alt="Aluno em atividade de desenho na Escola Montessori" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[center_38%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-campaign-deep-purple/90 via-campaign-deep-purple/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
              <span className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-campaign-orange">Um dia completo</span>
              <h3 className="mt-3 max-w-md font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">Experiências que ampliam o aprender.</h3>
            </div>
          </article>

          <article className="rounded-[28px] bg-footer p-7 lg:col-span-5">
            <span className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-campaign-orange">Acompanhamento</span>
            <h3 className="mt-3 font-display text-3xl font-extrabold text-white">Apoio pedagógico e Inglês</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">Tempo, atenção e repertório para cada etapa da jornada.</p>
          </article>

          <article className="relative overflow-hidden rounded-[28px] bg-campaign-blue p-7 lg:col-span-5">
            <img src={desenhoPulso.url} alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute right-5 top-5 w-14 opacity-40" />
            <span className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-white/80">Corpo em movimento</span>
            <p className="mt-3 max-w-sm font-display text-2xl font-extrabold leading-tight text-white">Recreação aquática · Poliesportivo · Psicomotricidade · Cheerleading</p>
          </article>

          <article className="relative overflow-hidden rounded-[28px] bg-[#64a33d] p-7 lg:col-span-5">
            <span className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-white/80">Expressão e estratégia</span>
            <p className="mt-3 font-display text-2xl font-extrabold leading-tight text-white">Teatro · Musicalização · Oficinas criativas · Xadrez</p>
          </article>

          <article className="relative min-h-56 overflow-hidden rounded-[28px] bg-[#d37e26] p-7 lg:col-span-7">
            <img src={fotoAprender} alt="Educadora acompanhando uma atividade escolar" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-multiply" />
            <img src={desenhoChef.url} alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute bottom-5 right-6 w-16 opacity-45" />
            <div className="relative max-w-xl">
              <span className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-white/85">Mão na massa</span>
              <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">Cozinha experimental, artesanato, costura e horta.</h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
