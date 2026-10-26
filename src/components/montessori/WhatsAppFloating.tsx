import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./Footer";

const messages = {
  google: "Olá! Vim pelo site de matrículas no google e gostaria de mais informações.",
  bio: "Olá! Vim pelo site de matrículas que está na bio e gostaria de mais informações.",
  meta: "Olá! Vim pelo site que está no instagram e gostaria de mais informações.",
} as const;

type Source = keyof typeof messages;
const defaultMessage =
  "Olá! Gostaria de mais informações sobre as matrículas da Escola Montessori.";

function isSource(value: string | null): value is Source {
  return value !== null && Object.hasOwn(messages, value);
}

export function WhatsAppFloating() {
  const [message, setMessage] = useState(defaultMessage);

  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get("origem")?.toLowerCase() ?? null;
    let selected = isSource(source) ? source : null;
    try {
      // Keep attribution while navigating and reloading in the same browser tab.
      if (selected) sessionStorage.setItem("montessori-whatsapp-origin", selected);
      else {
        const saved = sessionStorage.getItem("montessori-whatsapp-origin");
        if (isSource(saved)) selected = saved;
      }
    } catch {
      // Query-string attribution still works if browser storage is blocked.
    }
    setMessage(selected ? messages[selected] : defaultMessage);
  }, []);

  return (
    <a
      href={`https://wa.me/5561995357538?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale com a Escola Montessori pelo WhatsApp (abre em nova aba)"
      title="Fale com a secretaria pelo WhatsApp"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#167d3e] text-white shadow-lg transition-colors hover:bg-[#116332] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-campaign-deep-purple sm:right-7 [&_svg]:h-7 [&_svg]:w-7"
    >
      <WhatsAppIcon />
    </a>
  );
}
