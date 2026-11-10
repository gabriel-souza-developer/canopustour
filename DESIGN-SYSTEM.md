# Design system — Canopus Turismo

Baseado na Direção A ("Carta celeste") de `DIRECAO-VISUAL.md` e na identidade real observada na
captura de tela enviada pela cliente (`canopustour-hall7.png`). Os tons exatos abaixo são uma
estimativa visual dessa captura — **ajustar para o hex exato assim que a cliente enviar o arquivo
de marca original** (logo vetorial ou manual de marca); não travar como definitivo até lá.

## 1. Cor e papéis

| Token | Valor estimado | Papel |
|---|---|---|
| `--cor-navy-950` | `#0a1530` | Fundo principal (abertura, seções escuras), base da identidade (fundo do emblema do logo) |
| `--cor-navy-800` | `#132349` | Superfícies elevadas sobre o navy (cartões, faixas) |
| `--cor-dourado-500` | `#d8a93f` | Cor de ação/destaque — do sol/estrela do logo; usar com parcimônia (ícones, linha-guia, texto de destaque, botão principal) |
| `--cor-dourado-300` | `#ecce8e` | Dourado claro para texto sobre navy em títulos grandes (contraste melhor que o 500 em corpo de texto) |
| `--cor-dourado-profundo` | `#a08232` | Dourado sobre fundo claro (`--cor-papel`) — nunca o `--cor-dourado-500` claro sobre papel, contraste insuficiente; valor confirmado na referência real `docs.hebcal.co.il/brand.html` (`--gold-deep`) |
| `--cor-papel` | `#faf6ec` | Fundo claro para blocos de leitura longa (alterna com o navy, evita fadiga de tela toda escura); nunca branco puro, por isso um creme quente |
| `--cor-tinta` | `#161312` | Texto sobre `--cor-papel` |
| `--cor-navy-texto-sobre-dourado` | `#0a1530` | Texto sobre fundos/botões dourados (nunca branco sobre dourado — contraste insuficiente) |

Contraste a verificar na implementação: `--cor-dourado-300` sobre `--cor-navy-950` (texto grande
ok; para texto pequeno, preferir `--cor-papel`). Botão dourado sempre com texto navy, nunca branco
e dourado nunca como texto de corpo sobre papel claro (usar `--cor-dourado-profundo`) — as duas
regras vêm confirmadas por fetch real de `docs.hebcal.co.il/brand.html` ("Always use navy on
gold", "Don't put white text on gold buttons"), documentado em `DIRECAO-VISUAL.md` seção 1.
Dourado é destaque pontual, nunca cor de fundo extensa (mesma referência).

## 2. Tipografia

- **Títulos/destino (serifada):** `Fraunces` variável (Google Fonts, OFL), em
  `src/assets/fonts/fraunces-variable.woff2` + `LICENSE-Fraunces.txt`. Troca decidida a pedido do
  usuário em 2026-11-06: a primeira escolha (`Bodoni Moda`) lia como editorial/jornalística demais;
  `Fraunces` mantém o ar serifado "curadoria premium" com um traço mais contemporâneo e quente.
- **UI/corpo:** `Archivo` variável — mesma origem/licença, `inspiracoes/advocacia-exemplo-completo/assets/fonts/archivo-variable.woff2`.
- Por quê essa dupla e não Plus Jakarta Sans + DM Sans (já usada em `hospital-day-mais-vida-v2`,
  também Formato B/React): evita repetir a mesma assinatura tipográfica de outro projeto recente
  no mesmo formato técnico, e a serifada reforça "curadoria premium" sem depender de efeito visual.
- Escala sugerida (rem, ajustar ao implementar primeira dobra): display 3.5/2.25 (desktop/mobile),
  h2 2.25/1.75, corpo 1.125/1, legenda 0.875.

## 3. Espaçamento, grid e bordas

- Escala de espaçamento em múltiplos de 4px: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Largura máxima de conteúdo: 1200px; margem lateral mínima 24px mobile / 64px desktop.
- Bordas/raios: raio pequeno e consistente (8px) só onde houver superfície de cartão (ex.: bloco
  de confiança, ficha de atendente); sem cantos arredondados grandes tipo "app" — mantém o tom
  editorial/premium. Fios (`border`) finos (1px) em dourado com baixa opacidade (~24%) para
  separar seções sobre navy, com parcimônia (regra inegociável do motor).

## 4. Ícones e imagens

- Ícones: linha fina (stroke, não preenchido), cor dourada sobre navy / navy sobre papel —
  reforça o motivo "traço de constelação" sem precisar de SVG decorativo extra.
- Imagens: fotografia real de destino (pendente da cliente) tratada com overlay navy leve na
  abertura; sem banco de imagem genérico de "praia paradisíaca" caso falte material — usar
  placeholder `.pend` identificado em vez de foto de banco não autorizada. Exceção documentada: a
  seção "Onde estamos" usa uma captura real do Google Street View do próprio endereço confirmado
  (`src/assets/images/fachada-canopus.jpg`, obtida em 2026-11-06) — não é foto de banco genérica,
  é o imóvel real da cliente, mas a cliente deve ser avisada da origem e pode substituir por foto
  profissional própria a qualquer momento.
- Logo: arquivo oficial recebido da cliente em 2026-11-06 (foto de perfil do Instagram, 150x150),
  salvo em `src/assets/images/logo-canopus.jpg` e usado na abertura e no rodapé. Resolução baixa
  (o arquivo é um recorte de avatar, não a arte vetorial original); se a cliente enviar versão em
  alta resolução depois, trocar o arquivo sem mudar o resto do componente. A captura
  `canopustour-hall7.png` segue só como referência histórica de cor.
- Tratamento do logo (revisão 2026-11-09): `rounded-full` com anel dourado (`ring-dourado-500/40`,
  mais brilho suave no hero) em vez do recorte quadrado original — o arquivo JPG tem cantos duros
  que destoavam do navy da página, lendo como adesivo colado; o recorte circular com anel reforça
  o motivo de emblema/constelação da marca.

## 5. Componentes (escolha e função)

- **Rota de destinos** (assinatura, seção "rota de destinos"): componente próprio do motor
  (`data-fx-*`), não vem de Flowbite/daisyUI — é o elemento diferenciador da Direção A. Revisado em
  2026-11-09 (ver abaixo, substitui a descrição original de "linha-guia" com trilho único).
- **Botão de contato (plantão 24h)**: estilo próprio, fundo dourado + texto navy, com ícone de
  WhatsApp; variante secundária (navy + borda dourada) para os 4 atendentes individuais, evitando
  cinco botões de peso visual idêntico como na página atual (hall7.online) — plantão 24h deve
  pesar mais, os demais ficam agrupados/menores.
- Antes de usar Flowbite/daisyUI para algo (ex.: accordion de FAQ, se houver), checar primeiro as
  5 fontes de `referencias/catalogo-recursos.md`, por regra do motor.
- **Accordion de "Dúvidas comuns"**: checadas as 5 fontes (catalogo-recursos.md) em 2026-11-07.
  beUI tem um accordion real (Bouncy Accordion, `/components/motion/bouncy-accordion`), mas exige a
  lib `motion` como nova dependência; Bencho tem um "FAQ accordion" cuja própria descrição anima o
  texto da resposta palavra por palavra, proibido pelas regras do motor; Libraries.dev e ObsidianUI
  não têm nada equivalente. Recorrido ao último recurso: a técnica de abertura suave do `collapse`
  da daisyUI (`grid-template-rows`, CSS puro, já respeita `prefers-reduced-motion` por padrão),
  aplicada ao `<details>` nativo do projeto. O marcador "+" que vira "x" é autoria própria, não vem
  de nenhuma das fontes.
- **Rota de destinos, revisão 2026-11-09**: o desenho original (trilho dourado horizontal único +
  "estrela" que percorre a linha, `.fx-linha-trilho`/`.fx-linha-estrela`) só fazia sentido para uma
  única fileira de 9 pontos (`lg:grid-cols-9`); na grade real do celular/tablet (múltiplas linhas),
  o trilho ficava preso no topo e não acompanhava as linhas seguintes, deixando a ativação de cada
  destino (só opacidade/escala) quase imperceptível fora do desktop largo — relatado pelo usuário
  como "não tem animação". Substituído por: (1) layout em fluxo (`flex flex-wrap`, não mais grade
  fixa por breakpoint) onde cada destino ganha um conector próprio (`.fx-rota-conector`, traço curto
  acima do ponto) que acende junto com ele, funcionando igual em qualquer largura; (2) profundidade
  3D sutil controlada por rolagem (`.fx-rota-item`: `perspective` no contêiner da seção,
  `translateZ`/`rotateX` por item, achatando ao ativar) — pedido explícito do usuário por "imersão
  3D", sem brilho/tilt que segue o mouse (proibido pelo motor), CSS puro, sem dependência nova; (3)
  a `Constelacao` do hero reaproveitada como marca-d'água de fundo da seção, com leve parallax
  (`scale`/`translateY`) também amarrado a `--linha`. Continua sem lib nova. Com movimento reduzido,
  `--linha` chega fixa e `.fx-passo-ativo` já é aplicado a todos de saída (ver `motor.js`): nenhuma
  profundidade/parallax chega a animar, estado final sempre plano e completo.
- **Rota de destinos, revisão 2026-11-09 (2): globo 3D**: a profundidade CSS acima ainda não era
  perceptível o bastante ("tá do mesmo jeito", relato do usuário). Pesquisado e adotado `cobe`
  (~5KB, canvas/WebGL, MIT, sem Three.js) em vez de reescrever CSS de novo — primeira dependência
  nova da seção. `src/componentes/globo-destinos.tsx`: um marcador dourado por destino
  (coordenadas reais, ver BRIEF.md), rotação amarrada ao progresso de rolagem da seção (não
  mouse/hover), marcador mais próximo da face visível cresce. Base do globo em cor de papel
  (`--color-papel`), não navy, para ter silhueta visível contra o fundo navy da página.
  `prefers-reduced-motion` entrega um frame único estático. **Não verificado visualmente de
  forma completa**: o container de QA deste homelab não tem WebGL com GPU real (Chromium
  software/SwiftShader renderiza só os marcadores, não a textura do globo; Firefox nem cria
  contexto WebGL) — detalhe em `WIREFRAME.md`.
- **Rota de destinos, revisão 2026-11-10 (3): globe.gl + tour por rolagem**: o cobe 2.0.1 não
  tinha mais `onRender` (globo parado num quadro só) e a superfície falhava com erro de WebGL —
  causa real do "só os marcadores aparecem", não limitação do container. Trocado por `globe.gl`
  (three.js, carregado sob demanda quando a seção se aproxima). Continentes em pontos dourados
  (H3, `world-atlas` 110m; Brasil um tom mais claro; Antártida e Coreia do Norte fora, a segunda
  porque o polígono do atlas derruba o H3), atmosfera dourada, arcos de Campina Grande (origem,
  escritório) até cada destino com traço animado, anéis pulsando e rótulo no destino da vez.
  A seção é um trilho (`320vh` desktop, `240vh` celular) com palco `sticky`: a rolagem leva a
  câmera de destino em destino e acende o item correspondente na lista (contador `01 / 09`).
  Celular: palco com a altura do conteúdo (sem faixa vazia antes/depois). Controles de
  arrastar/zoom desligados (regra do motor + não prender a rolagem). Sem JS: lista completa, sem
  trilho. Movimento reduzido: globo parado com todos os arcos, lista toda acesa. Lista reordenada
  como roteiro (Américas → África → Europa). Verificado em Chromium headless (SwiftShader) via
  container `mcr.microsoft.com/playwright`: desktop 1440, celular 390 e movimento reduzido.
- **Bug do "preso" no celular (2026-11-10)**: o OrbitControls do globe.gl põe `touch-action: none`
  no canvas mesmo com os controles desligados; com o globo ocupando quase a tela inteira no palco
  preso, deslizar o dedo sobre ele não rolava a página (sentido mais notado ao voltar subindo).
  Corrigido com `controls().enabled = false`, `touch-action: auto` e `pointer-events: none` no
  globo. Verificado com toques CDP (touchStart/Move/End): antes 0 px de rolagem, depois rola.
- **Globo mais rápido (2026-11-10)**: os pontos de terra deixaram de ser calculados no navegador
  (H3 em ~10.700 células + uma malha por país). Agora vêm pré-calculados em
  `src/assets/pontos-terra.json` (~52 KB gzip, gerado por `scripts/gerar-pontos-terra.mjs`;
  h3-js/topojson-client/world-atlas só como devDependencies) e são desenhados como camada única de
  partículas (`particlesData`, cor já pintada na textura porque o three-globe ignora
  `particlesColor` com textura). A biblioteca é pré-carregada em tempo ocioso depois do `load` e o
  globo monta a 1200px da seção (antes 400px).
- **Abertura no desktop (2026-11-10)**: referências do padrão em `DIRECAO-VISUAL.md`, seção 6. A coluna única centralizada (marca, título, "Fale com a
  gente", plantão e atendentes empilhados) ficava estreita e com o contato abaixo da dobra no
  desktop. A partir de `lg` (1024px) vira duas colunas em `max-w-6xl`: à esquerda o bloco
  editorial (logo + nome em linha, título maior alinhado à esquerda, subtítulo, link "Ver a rota
  de destinos ↓"); à direita um cartão de atendimento (`26rem`, `28rem` em `xl`) com borda dourada
  fina sobre navy translúcido, contendo plantão 24h e os 4 atendentes em uma coluna. Altura da
  abertura = 1 tela (`min-h-[100svh]`). Celular/tablet sem mudança. Cores, fontes e fundo
  (constelação) mantidos.
- **Abertura no celular (2026-11-10)**: o contato virou o mesmo cartão do desktop (borda dourada fina,
  navy translúcido, `p-5`/`sm:p-8`), no lugar do segundo bloco solto com título grande. Plantão 24h
  no formato das linhas de atendente, em todos os tamanhos: ícone do WhatsApp num círculo à
  esquerda, "Plantão 24h" + "Passageiros em viagem" (navy 75%, contraste ~5,4:1) alinhados à
  esquerda e seta (`ArrowRight`, lucide) à direita. Atendentes compactos (`min-h-14`, avatar
  40px), 2 colunas no tablet. Logo 64px no celular. Referências em `DIRECAO-VISUAL.md`, seção 6.
- **Rolagem horizontal no celular (2026-11-10)**: os blocos com `data-fx="direita"` (30 anos,
  mapa) começam 48px à direita e alargavam a página para 414px em tela de 390. Corrigido com
  `overflow-x: clip` no `main` (não no `body`, que repassa à janela como `hidden`; e `clip`, não
  `hidden`, para não quebrar o `sticky` do globo). Verificado: largura 390 em toda a página.
- **Alinhamento horizontal (2026-11-10)**: seção "30 anos" passou de `max-w-5xl` para `max-w-6xl`,
  mesma largura da rota de destinos, para as duas começarem na mesma margem esquerda.

## 6. Estados de interação e foco

- Foco visível: contorno de 2px em `--cor-dourado-300` com deslocamento (`outline-offset`) de 2px,
  visível tanto sobre navy quanto sobre papel.
- Hover em botão dourado: escurecer levemente (`--cor-dourado-500` → tom ~8% mais escuro), sem
  mudar de cor de família.
- Link de texto: sublinhado sempre visível (não só no hover), para acessibilidade e para não
  depender de cor como único indicador.

## 7. Responsividade e movimento reduzido

- Mobile-first: a "rota de destinos" usa o mesmo fluxo (`flex flex-wrap`) em qualquer largura —
  mais ou menos destinos por linha conforme o espaço, sem breakpoint fixo de colunas; cada destino
  mantém seu marcador de ponto dourado e conector próprios, revisão de 2026-11-09 (ver seção 5).
- `prefers-reduced-motion`: cada destino da rota já aparece aceso (sem efeito de ativação
  progressiva nem profundidade 3D); nenhuma entrada de seção depende de JS para ficar legível —
  conteúdo presente no HTML pré-renderizado (build do Formato B roda `prerenderizar.mjs`).
- Contraste mínimo AA em todos os pares texto/fundo listados na seção 1; revisar com ferramenta de
  contraste ao implementar a primeira dobra, antes de seguir para o restante da página.

## 8. Pendência de validação

Esta paleta e tipografia partem da identidade real do cliente (captura de tela enviada) e das
quatro referências reais confirmadas em `DIRECAO-VISUAL.md` seção 1 (duas do setor, duas de
design). O ambiente de execução não tem navegador visual, então os hex exatos da marca original
(fora o que veio da captura e da referência hebcal) seguem como estimativa — ajustar assim que a
cliente enviar o arquivo de marca original (logo vetorial/manual de marca). Antes de seguir para o
restante da página, observar a primeira dobra implementada em desktop e celular nesta máquina
(captura local, não busca externa) e comparar com as decisões registradas aqui.
