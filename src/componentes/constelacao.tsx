/* Traçado decorativo de constelação: pontos fixos ligados por linhas finas
 * douradas, estático (sem animação contínua, sem brilho que segue o mouse).
 * Reforça a identidade literal da marca (Canopus = estrela-guia de
 * navegação). Puramente decorativo: aria-hidden, não transmite informação. */
const PONTOS: [number, number][] = [
  [80, 420], [230, 160], [420, 60], [640, 140], [760, 340],
  [560, 460], [340, 520], [160, 300], [420, 300],
];

const LINHAS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [1, 8], [8, 5], [8, 3],
];

export function Constelacao({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {LINHAS.map(([a, b], i) => (
        <line
          key={i}
          x1={PONTOS[a][0]}
          y1={PONTOS[a][1]}
          x2={PONTOS[b][0]}
          y2={PONTOS[b][1]}
          stroke="var(--color-dourado-500)"
          strokeOpacity="0.28"
          strokeWidth="1"
        />
      ))}
      {PONTOS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 2 ? 4 : 2.5} fill="var(--color-dourado-300)" fillOpacity="0.8" />
      ))}
    </svg>
  );
}
