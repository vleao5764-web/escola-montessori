import desenhoChef from "@/assets/desenhos/Desenho_02.png";
import desenhoPulso from "@/assets/desenhos/Desenho_10.png";

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
            <h2 className="mt-5 font-display text-[2.25rem] font-extrabold leading-[0.95] tracking-tight text-marrom sm:text-6xl">
              Uma rotina
              <br />
              completa de
              <br />
              experiências.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-footer lg:col-span-5 lg:pb-3">
            O Montessori Integral amplia as experiências ao longo da rotina
            escolar, unindo acompanhamento pedagógico a atividades culturais,
            esportivas, recreativas e práticas.
          </p>
        </header>

        {/* família única de cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* 01 */}
          <div className="rounded-[24px] bg-footer p-8">
            <span className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-campaign-orange">
              01 — Acompanhamento
            </span>
            <p className="mt-4 font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Apoio pedagógico
            </p>
            <p className="mt-4 font-display text-xl font-bold text-white/85 md:text-2xl">
              Inglês
            </p>
          </div>

          {/* 02 */}
          <div className="relative overflow-hidden rounded-[24px] bg-[#0093cd] p-8">
            <img
              src={desenhoPulso}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute right-5 top-5 w-[72px] opacity-50"
            />
            <span className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-white/80">
              02 — Corpo
            </span>
            <ul className="relative mt-4 space-y-1.5 font-display text-xl font-extrabold leading-tight text-white md:text-2xl">
              <li>Recreação aquática</li>
              <li>Atividades poliesportivas</li>
              <li>Psicomotricidade</li>
              <li>Cheerleading</li>
            </ul>
          </div>

          {/* 03 */}
          <div className="rounded-[24px] bg-[#64a33d] p-8">
            <span className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-white/80">
              03 — Expressão
            </span>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-display font-extrabold leading-tight text-white">
              <span className="text-3xl md:text-4xl">Teatro</span>
              <span className="text-xl md:text-2xl">Musicalização</span>
              <span className="text-2xl md:text-3xl">Oficinas criativas</span>
            </div>
          </div>

          {/* 04 */}
          <div className="relative overflow-hidden rounded-[24px] bg-[#d37e26] p-8">
            <img
              src={desenhoChef}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute bottom-5 right-5 w-[80px] opacity-45"
            />
            <span className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-white/85">
              04 — Mão na massa
            </span>
            <div className="relative mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-display font-extrabold leading-tight text-white">
              <span className="text-3xl md:text-4xl">Cozinha experimental</span>
              <span className="text-xl md:text-2xl">Artesanato</span>
              <span className="text-xl md:text-2xl">Costura</span>
              <span className="text-2xl md:text-3xl">Horta</span>
            </div>
          </div>

          {/* 05 */}
          <div className="rounded-[24px] bg-campaign-deep-purple p-8 md:col-span-2">
            <span className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.24em] text-amarelo">
              05 — Estratégia
            </span>
            <p className="mt-4 font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Xadrez
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
