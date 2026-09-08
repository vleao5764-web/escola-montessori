import { Facebook, Instagram } from "lucide-react";
import logoHorizontal from "@/assets/logo-horizontal-branco.png.asset.json";
import desenho01 from "@/assets/desenhos/Desenho_01.png.asset.json";
import desenho04 from "@/assets/desenhos/Desenho_04.png.asset.json";
import desenho07 from "@/assets/desenhos/Desenho_07.png.asset.json";
import desenho14 from "@/assets/desenhos/Desenho_14.png.asset.json";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.9]">
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.6-4.1A8 8 0 1 1 20 11.5Z" strokeLinejoin="round" />
      <path d="M9.2 8.2c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.5.6c.4.8 1 1.4 1.8 1.8l.6-.5c.2-.2.4-.2.7-.1l1.7.7c.3.1.4.3.4.5v.4c0 .3 0 .5-.4.7-.4.2-1 .3-1.6.1-2.3-.7-4.2-2.6-4.9-4.9-.2-.6-.1-1.2.1-1.6Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contato" className="relative overflow-hidden bg-campaign-deep-purple text-white">
      <img src={desenho01.url} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-10 left-10 hidden w-20 opacity-15 md:block" />
      <img src={desenho04.url} alt="" aria-hidden="true" className="pointer-events-none absolute right-16 top-20 hidden w-18 opacity-15 md:block" />
      <img src={desenho07.url} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-16 right-[38%] hidden w-12 opacity-15 lg:block" />
      <img src={desenho14.url} alt="" aria-hidden="true" className="pointer-events-none absolute left-[44%] top-16 hidden w-10 opacity-15 lg:block" />

      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-20 md:pb-12 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1.1fr]">
          <div>
            <span className="inline-flex rounded-full bg-campaign-orange px-3 py-1 font-display text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-campaign-deep-purple">
              Matrículas 2027
            </span>
            <a href="#topo" aria-label="Escola Montessori — início">
              <img src={logoHorizontal.url} alt="Escola Montessori" className="mt-5 h-14 w-auto" />
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
              Método Montessori desde 1970 em Brasília. Do Maternal ao 9º ano, respeitando o
              potencial de cada aluno.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/escolamontessori?__rdc=2&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Escola Montessori"
                className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-white/10 transition-colors hover:bg-campaign-orange hover:text-campaign-deep-purple"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/escolamontessorioficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Escola Montessori"
                className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-white/10 transition-colors hover:bg-campaign-orange hover:text-campaign-deep-purple"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5561995357538"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Escola Montessori"
                className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-white/10 transition-colors hover:bg-campaign-orange hover:text-campaign-deep-purple"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <div className="border-l border-white/10 pl-5 md:pl-7">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-campaign-orange">
              Onde estamos
            </h2>
            <address className="mt-5 text-sm not-italic leading-relaxed text-white/80">
              SGAS I, St. de Grandes Áreas Sul 913,
              <br />
              Asa Sul, Brasília – DF
            </address>
            <iframe
              title="Localização da Escola Montessori"
              src="https://www.google.com/maps?q=Escola+Montessori,+SGAS+913,+Conjunto+A,+Asa+Sul,+Bras%C3%ADlia+-+DF&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-6 h-40 w-full rounded-2xl border-0"
            />
          </div>

          <div className="border-l border-white/10 pl-5 md:pl-7">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-campaign-orange">
              Fale conosco
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li>
                <a href="tel:+556133462733" className="hover:text-campaign-orange">
                  (61) 3346-2733
                </a>
                {" / "}
                <a href="tel:+5561995357538" className="hover:text-campaign-orange">
                  (61) 9 9535-7538
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@escolamontessori.com.br"
                  className="break-all hover:text-campaign-orange"
                >
                  contato@escolamontessori.com.br
                </a>
              </li>
              <li className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                <a
                  href="/politica-de-privacidade"
                  className="underline underline-offset-4 hover:text-campaign-orange"
                >
                  Política de Privacidade
                </a>
                <a
                  href="/termos-de-uso"
                  className="underline underline-offset-4 hover:text-campaign-orange"
                >
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">© 2027 Escola Montessori — Todos os direitos reservados</p>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white/50">Brasília · DF</p>
        </div>
      </div>
    </footer>
  );
}
