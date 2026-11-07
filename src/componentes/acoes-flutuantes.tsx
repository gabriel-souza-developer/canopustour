/* WhatsApp flutuante (padrão documentado em referencias/componentes.md) +
 * voltar ao topo. O WhatsApp fica sempre presente, inclusive sem JS; a
 * entrada é só CSS (animation-delay em index.css), nunca estado React,
 * porque o prerenderizar.mjs captura o HTML antes de qualquer timeout. O
 * "voltar ao topo" é conveniência de navegação, por isso pode ficar ausente
 * sem JS. */
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { IconeWhatsapp } from "./icone-whatsapp";

export function AcoesFlutuantes({ whatsapp, numero }: { whatsapp: string; numero: string }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    let ticking = false;
    function atualizar() {
      setVisivel(window.scrollY > 500);
      ticking = false;
    }
    function aoRolar() {
      if (!ticking) {
        window.requestAnimationFrame(atualizar);
        ticking = true;
      }
    }
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <div className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3">
      <a
        href="#conteudo"
        aria-label="Voltar ao início"
        className={"topo-flutuante" + (visivel ? " topo-flutuante--visivel" : "")}
      >
        <ChevronUp aria-hidden="true" className="size-5" strokeWidth={2} />
      </a>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener"
        aria-label={`Falar pelo WhatsApp, número ${numero}`}
        className="zap-flutuante"
      >
        <IconeWhatsapp className="size-[26px]" />
        <span className="zap-flutuante__texto">Falar pelo WhatsApp</span>
      </a>
    </div>
  );
}
