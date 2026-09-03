import { Facebook, Instagram, MessageCircle } from "lucide-react";
import logoHorizontal from "@/assets/logo-horizontal-branco.png";

export function Footer() {
  return (
    <footer
      id="contato"
      className="bg-campaign-deep-purple text-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1.1fr]">
          <div>
            <a href="#topo" aria-label="Escola Montessori — início">
              <img
                src={logoHorizontal}
                alt="Escola Montessori"
                className="h-14 w-auto"
              />
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
              Método Montessori desde 1970 em Brasília. Do Maternal ao 9º ano,
              respeitando o potencial de cada aluno.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Escola Montessori"
                className="flex h-11 w-11 items-center justify-center bg-white/10 transition-colors hover:bg-campaign-orange hover:text-campaign-deep-purple"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Escola Montessori"
                className="flex h-11 w-11 items-center justify-center bg-white/10 transition-colors hover:bg-campaign-orange hover:text-campaign-deep-purple"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5561995357538"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da Escola Montessori"
                className="flex h-11 w-11 items-center justify-center bg-white/10 transition-colors hover:bg-campaign-orange hover:text-campaign-deep-purple"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-campaign-orange">
              Onde estamos
            </h2>
            <address className="mt-5 text-sm not-italic leading-relaxed text-white/80">
              SGAS I, St. de Grandes Áreas Sul 913,
              <br />
              Asa Sul, Brasília – DF
            </address>
          </div>

          <div>
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
                <a href="#privacidade" className="underline underline-offset-4 hover:text-campaign-orange">
                  Política de Privacidade
                </a>
                <a href="#termos" className="underline underline-offset-4 hover:text-campaign-orange">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 text-xs text-white/50">
          © 2027 Escola Montessori — Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
