import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { label: "Metodologia", href: "#metodologia" },
  { label: "Ensino", href: "#ensino" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Contato", href: "#contato" },
];

/**
 * Tom do fundo sobre o qual o header repousa no estado inicial (topo da página).
 * Preparado para que, futuramente, cada universo da Hero possa informar o contraste
 * adequado sem reescrever o componente.
 */
export type HeaderTone = "light-on-dark" | "dark-on-light";

const ENTER_AT = 80;
const EXIT_AT = 40;

export function Header({ tone = "light-on-dark" }: { tone?: HeaderTone }) {
  const [open, setOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const evaluate = () => {
      const y = window.scrollY;
      setFloating((prev) => (prev ? y > EXIT_AT : y > ENTER_AT));
      ticking.current = false;
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onDark = tone === "light-on-dark" || floating || open;
  const textColor = onDark ? "text-white" : "text-campaign-deep-purple";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={[
          "pointer-events-auto mx-auto flex items-center justify-between gap-4",
          "transition-[max-width,padding,background-color,border-radius,box-shadow,transform,margin]",
          "duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          floating || open
            ? "mt-3 w-fit max-w-[calc(100%-1.5rem)] rounded-full border border-white/10 bg-campaign-deep-purple/80 px-5 py-2.5 shadow-[0_18px_40px_-24px_rgba(20,10,60,0.9)] backdrop-blur-md sm:px-6"
            : "mt-0 w-full max-w-[86rem] rounded-none border border-transparent bg-transparent px-5 py-4 shadow-none sm:px-8",
        ].join(" ")}
      >
        <div
          className={`shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            floating || open ? "scale-[0.88] origin-left" : "scale-100"
          }`}
        >
          <Logo dark={onDark} />
        </div>

        {/* Navegação desktop */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`group relative py-1 font-display text-[0.95rem] font-semibold tracking-tight transition-colors duration-300 hover:text-campaign-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campaign-orange focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${textColor}`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-[3px] w-full origin-left scale-x-0 rounded-full bg-campaign-orange transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
              />
            </a>
          ))}

          <CTA compact={floating} />
        </nav>

        {/* Trigger mobile */}
        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors duration-300 md:hidden ${
            onDark
              ? "border-white/25 text-white hover:bg-white/10"
              : "border-campaign-deep-purple/20 text-campaign-deep-purple hover:bg-campaign-deep-purple/5"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campaign-orange`}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu móvel"
          className="pointer-events-auto mx-auto mt-2 max-w-[calc(100%-1.25rem)] rounded-[1.6rem] border border-white/10 bg-campaign-deep-purple px-5 pb-6 pt-4 shadow-[0_24px_60px_-30px_rgba(42,23,130,1)] md:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-white/10 last:border-b-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-4 font-display text-2xl font-semibold tracking-tight text-white transition-colors hover:text-campaign-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campaign-orange"
                >
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-[3px] bg-campaign-orange"
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-5">
            <CTA onClick={() => setOpen(false)} block />
          </div>
        </nav>
      )}
    </header>
  );
}

function CTA({
  compact = false,
  block = false,
  onClick,
}: {
  compact?: boolean;
  block?: boolean;
  onClick?: (() => void) | undefined;
}) {
  return (
    <a
      href="#agende"
      onClick={onClick}
      className={[
        "group relative inline-flex items-center justify-center rounded-[14px] bg-campaign-orange font-display font-extrabold uppercase tracking-[0.01em] text-campaign-deep-purple",
        "transition-[filter,padding] duration-300 ease-out hover:brightness-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-campaign-deep-purple motion-reduce:transition-none",
        block
          ? "w-full px-6 py-4 text-base"
          : compact
            ? "px-5 py-2.5 text-[0.8rem]"
            : "px-6 py-3 text-[0.85rem]",
      ].join(" ")}
    >
      Agende sua visita
    </a>
  );
}
