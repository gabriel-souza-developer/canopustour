/* Avatar por iniciais: usado onde ainda não há foto real autorizada da
 * pessoa (ex.: atendentes). Evita atribuir foto de banco genérica a um nome
 * real (DESIGN-SYSTEM.md, seção 4) até a cliente enviar o material. */
export function AvatarIniciais({ nome, className }: { nome: string; className?: string }) {
  const iniciais = nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full border border-dourado-500/40 bg-navy-800 font-titulo font-semibold text-dourado-300 ${className ?? ""}`}
    >
      {iniciais}
    </span>
  );
}
