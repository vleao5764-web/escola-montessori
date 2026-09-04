import { Facebook, Instagram, MessageCircle } from "lucide-react";
import logoHorizontal from "@/assets/logo-horizontal-branco.png.asset.json";
import desenho01 from "@/assets/desenhos/Desenho_01.png.asset.json";
import desenho04 from "@/assets/desenhos/Desenho_04.png.asset.json";
import desenho07 from "@/assets/desenhos/Desenho_07.png.asset.json";
import desenho14 from "@/assets/desenhos/Desenho_14.png.asset.json";

export function Footer() {
  return (
    <footer id="contato" className="relative overflow-hidden bg-campaign-deep-purple text-white">
      <div aria-hidden="true" className="absolute right-10 top-10 h-44 w-44 rounded-full border-[28px] border-white/5" />
      <img src={desenho01.url} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-10 left-4 w-16 opacity-15 md:left-10 md:w-20" />
      <img src={desenho04.url} alt="" aria-hidden="true" className="pointer-events-none absolute right-8 top-20 w-14 opacity-15 md:right-16 md:w-18" />
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
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Escola Montessori"
                className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-white/10 transition-colors hover:bg-campaign-orange hover:text-campaign-deep-purple"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
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
                <MessageCircle className="h-5 w-5" />
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
                  href="#privacidade"
                  className="underline underline-offset-4 hover:text-campaign-orange"
                >
                  Política de Privacidade
                </a>
                <a
                  href="#termos"
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
