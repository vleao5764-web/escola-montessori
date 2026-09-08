import logoColor from "@/assets/logo-horizontal.png.asset.json";
import logoWhite from "@/assets/logo-horizontal-branco.png.asset.json";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#topo" className="inline-flex items-center" aria-label="Escola Montessori: início">
      <img
        src={dark ? logoWhite.url : logoColor.url}
        alt="Escola Montessori"
        className="h-11 w-auto sm:h-12"
      />
    </a>
  );
}
