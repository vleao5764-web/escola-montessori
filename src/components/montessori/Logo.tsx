import logoColor from "@/assets/logo-horizontal.png";
import logoWhite from "@/assets/logo-horizontal-branco.png";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#topo" className="inline-flex items-center" aria-label="Escola Montessori — início">
      <img
        src={dark ? logoWhite : logoColor}
        alt="Escola Montessori"
        className="h-11 w-auto sm:h-12"
      />
    </a>
  );
}
