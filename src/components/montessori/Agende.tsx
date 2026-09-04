import { useState } from "react";
import desenho from "@/assets/desenhos/Desenho_15.png.asset.json";

type FormData = {
  nome: string;
  whatsapp: string;
  segmento: string;
  turno: string;
};

const initial: FormData = { nome: "", whatsapp: "", segmento: "", turno: "" };

export function Agende() {
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [sent, setSent] = useState(false);

  const set =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setData((d) => ({ ...d, [field]: e.target.value }));
      setErrors((er) => ({ ...er, [field]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<FormData> = {};
    if (!data.nome.trim()) er.nome = "Informe seu nome.";
    if (!data.whatsapp.trim()) er.whatsapp = "Informe seu WhatsApp.";
    if (!data.segmento) er.segmento = "Escolha um segmento.";
    if (!data.turno) er.turno = "Escolha um turno.";
    setErrors(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  const inputClass =
    "w-full rounded-none border-b border-campaign-deep-purple/20 bg-transparent px-1 py-3 text-base text-campaign-deep-purple placeholder:text-campaign-deep-purple/35 focus:border-campaign-blue focus:outline-none";

  const labelClass =
    "mb-1 block font-display text-[0.7rem] font-bold uppercase tracking-[0.16em] text-campaign-deep-purple/70";

  const errorClass = "mt-1.5 text-sm font-semibold text-campaign-burnt-orange";

  return (
    <section
      id="agende"
      aria-label="Agende sua visita"
      className="relative overflow-hidden bg-campaign-blue py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] bg-campaign-deep-purple lg:block"
      />
      <img
        src={desenho.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-5 bottom-3 w-28 opacity-[0.16] sm:w-36 md:w-44"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
        {/* Lado editorial */}
        <div>
          <span className="inline-block bg-campaign-orange px-4 py-1.5 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-campaign-deep-purple">
            Agende sua visita
          </span>
          <h2 className="mt-6 font-display text-[2.2rem] font-extrabold leading-[1] tracking-tight text-white md:text-[3.5rem]">
            Venha conhecer a Escola Montessori.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">
            Algumas experiências são difíceis de explicar em palavras. Conheça as salas, converse
            com os educadores e veja a metodologia na prática. Agende uma visita e descubra como
            construímos, todos os dias, a base para o futuro do seu filho.
          </p>

          <p className="mt-8 max-w-xs border-l-4 border-campaign-orange pl-4 font-display text-sm font-semibold leading-relaxed text-white">
            SGAS I, St. de Grandes Áreas Sul 913, Asa Sul, Brasília – DF
          </p>
        </div>

        {/* Formulário */}
        <div className="rounded-[28px] bg-white p-7 shadow-[0_24px_60px_-24px_rgba(10,5,60,0.45)] md:p-10">
          {sent ? (
            <div className="flex min-h-80 flex-col justify-center gap-4">
              <span className="h-2 w-20 bg-campaign-green" />
              <h3 className="font-display text-2xl font-bold text-campaign-deep-purple">
                Visita agendada com sucesso!
              </h3>
              <p className="leading-relaxed text-campaign-deep-purple/80">
                Obrigado, {data.nome.split(" ")[0]}! Nossa equipe entrará em contato pelo WhatsApp
                para confirmar o melhor dia e horário para a sua visita.
              </p>
              <button
                type="button"
                onClick={() => {
                  setData(initial);
                  setSent(false);
                }}
                className="mt-2 inline-flex min-h-13 self-start items-center justify-center rounded-[14px] bg-campaign-deep-purple px-6 py-3 font-display font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-campaign-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campaign-blue"
              >
                Fazer novo agendamento
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <h3 className="font-display text-2xl font-bold leading-tight text-campaign-deep-purple">
                Agende sua visita
              </h3>

              <div>
                <label htmlFor="nome" className={labelClass}>
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={data.nome}
                  onChange={set("nome")}
                  aria-invalid={!!errors.nome}
                  aria-describedby={errors.nome ? "erro-nome" : undefined}
                  className={inputClass}
                />
                {errors.nome ? (
                  <p id="erro-nome" role="alert" className={errorClass}>
                    {errors.nome}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="whatsapp" className={labelClass}>
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(61) 9 9999-9999"
                  value={data.whatsapp}
                  onChange={set("whatsapp")}
                  aria-invalid={!!errors.whatsapp}
                  aria-describedby={errors.whatsapp ? "erro-whatsapp" : undefined}
                  className={inputClass}
                />
                {errors.whatsapp ? (
                  <p id="erro-whatsapp" role="alert" className={errorClass}>
                    {errors.whatsapp}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="segmento" className={labelClass}>
                  Segmento de interesse
                </label>
                <select
                  id="segmento"
                  value={data.segmento}
                  onChange={set("segmento")}
                  aria-invalid={!!errors.segmento}
                  aria-describedby={errors.segmento ? "erro-segmento" : undefined}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  <option value="infantil">Educação Infantil</option>
                  <option value="fund1">Fundamental I</option>
                  <option value="fund2">Fundamental II</option>
                </select>
                {errors.segmento ? (
                  <p id="erro-segmento" role="alert" className={errorClass}>
                    {errors.segmento}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="turno" className={labelClass}>
                  Turno
                </label>
                <select
                  id="turno"
                  value={data.turno}
                  onChange={set("turno")}
                  aria-invalid={!!errors.turno}
                  aria-describedby={errors.turno ? "erro-turno" : undefined}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  <option value="matutino">Matutino</option>
                  <option value="vespertino">Vespertino</option>
                  <option value="integral">Integral</option>
                </select>
                {errors.turno ? (
                  <p id="erro-turno" role="alert" className={errorClass}>
                    {errors.turno}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex min-h-14 w-full items-center justify-center rounded-[14px] bg-campaign-orange px-8 py-4 font-display text-lg font-bold text-campaign-deep-purple shadow-[0_6px_0_0_var(--campaign-burnt-orange)] transition hover:translate-y-0.5 hover:shadow-[0_3px_0_0_var(--campaign-burnt-orange)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-campaign-deep-purple"
              >
                Agendar minha visita
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
