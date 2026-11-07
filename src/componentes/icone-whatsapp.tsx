/* Ícone oficial da marca WhatsApp (path do logo), não um ícone de chat
 * genérico. Usado em todo ponto de contato que leva ao WhatsApp (cabeçalho,
 * abertura, ações flutuantes, botões "perguntar" das fichas, localização) -
 * nunca o `MessageCircle` do lucide-react nesses lugares. */
export function IconeWhatsapp({ className }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
      <path
        fill="currentColor"
        d="M16.04 3C8.88 3 3.06 8.79 3.06 15.92c0 2.28.6 4.5 1.74 6.46L3 29l6.8-1.77a13 13 0 0 0 6.23 1.58h.01c7.16 0 12.98-5.79 12.98-12.92C29.02 8.79 23.2 3 16.04 3Zm0 23.62h-.01a10.8 10.8 0 0 1-5.48-1.5l-.39-.23-4.04 1.05 1.08-3.92-.26-.4a10.64 10.64 0 0 1-1.64-5.7c0-5.92 4.84-10.73 10.75-10.73 5.92 0 10.74 4.81 10.74 10.73 0 5.92-4.82 10.7-10.75 10.7Zm5.89-8.03c-.32-.16-1.9-.93-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.83 1.04-1.02 1.25-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.59-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.62-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69s1.16 3.12 1.32 3.33c.16.21 2.28 3.47 5.52 4.87.77.33 1.37.53 1.84.68.77.24 1.48.21 2.03.13.62-.09 1.9-.77 2.17-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z"
      />
    </svg>
  );
}
