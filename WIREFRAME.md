# Wireframe · Canopus Turismo (Direção A · "Carta celeste")

Base: dados confirmados em `BRIEF.md` e decisões em `DIRECAO-VISUAL.md`/`DESIGN-SYSTEM.md`.
Nenhum dado novo inventado; destinos, fotos e horário seguem `.pend` onde a cliente não confirmou.

## Desktop

1. **Abertura**: fundo navy quase preto, traçado fino e estático de constelação atrás do título
   (sem brilho que segue o mouse, sem animação contínua). Headline curta em duas linhas usando a
   tagline real da marca ("A Estrela Guia do seu Destino"), subtítulo com o posicionamento real
   ("Curadoria premium em viagens e excursões. Há 30 anos conectando sonhos ao mundo."). CTA
   primário WhatsApp (plantão 24h, número confirmado) + CTA secundário "Ver destinos" (âncora para
   a seção 2). Logo da marca (ou placeholder `.pend` até receber arquivo vetorial).
2. **Rota de destinos** (pico, cena fixa): faixa horizontal com os destinos reais do Instagram
   (Grand Amazon, Mediterrâneo, Espanha 2026, Atacama, Costa Rica, África do Sul, Colômbia,
   Uruguai 2026, Inglaterra) como pontos ligados por uma linha fina dourada. Cada ponto abre um
   cartão com nome do destino; foto real `.pend` até a cliente enviar material, sem banco de
   imagem genérico. Função: mostrar o portfólio real sem inventar pacote, preço ou data.
3. **Bloco de confiança**: "30 anos" como número de destaque + frase de curadoria + (se a cliente
   confirmar) avaliações públicas reais. Sem contador animado — número fixo, tipografia grande.
   Espaço reservado para depoimento real (`.pend`, padrão confirmado em concorrentes reais
   pesquisados: Scott Dunn, Made for Spain & Portugal), sem inventar fala de cliente.
4. **Contato**: plantão 24h em destaque (botão dourado maior, ícone WhatsApp) — é o contato que a
   cliente definiu como principal. Os 4 atendentes (Kennedy, Carol, Myrlla, Rita) agrupados em
   lista secundária, navy com borda dourada, peso visual menor que o plantão (corrige o problema
   da página atual, em que os 5 botões têm peso idêntico).
5. **Localização**: endereço completo (R. Cristina P. da Silva, 1326A, Catolé, Campina Grande, PB).
   Horário não confirmado pela cliente: omitido da página (sem "a confirmar" nem similar),
   registrado como pendência no `BRIEF.md`. Mapa incorporado (iframe do Google Maps, sem chave de
   API, `output=embed`) adicionado a pedido explícito (2026-11-06), com o link de saída
   (`<a>` comum) mantido logo abaixo; aviso de privacidade no rodapé atualizado para citar o
   carregamento automático do mapa.
6. **Rodapé**: wordmark em texto, Instagram e Facebook (links reais confirmados), endereço curto,
   link para aviso de privacidade, menção de pendência de Cadastur se a cliente confirmar registro
   depois da entrega.

Objetivo de cada seção: 1) apresentar a marca pela própria identidade (estrela-guia), não por
clichê de turismo; 2) provar o portfólio real de destinos; 3) sustentar "premium" com tradição e
prova social real; 4) converter pelo canal que a cliente escolheu como principal; 5) permitir
chegar ao endereço físico; 6) fechamento e conformidade.

## Celular (até 672px)

- Abertura: mesma hierarquia, traçado de constelação reduzido/mais sutil atrás do título, sem
  perder legibilidade do texto.
- Rota de destinos: na implementação real, vira grade 3x3 (em vez da lista vertical prevista
  originalmente) — mais compacta para 9 destinos que uma lista de 9 linhas, mantém o marcador de
  ponto dourado por item e a linha dourada horizontal sobre a primeira fileira.
- Globo 3D acima da lista (`src/componentes/globo-destinos.tsx`, lib `cobe`, ~5KB): resposta ao
  pedido do cliente de "imersão 3D" depois que a primeira tentativa (CSS puro, perspective +
  translateZ) ficou imperceptível. Um marcador dourado por destino (coordenadas reais do
  BRIEF.md), rotação (`phi`) amarrada ao progresso de rolagem da seção via
  `getBoundingClientRect` (nunca a mouse/hover, conforme regra do motor), marcador mais perto da
  face visível do globo cresce (eco do `.fx-passo-ativo` da lista). `prefers-reduced-motion`
  renderiza um único frame estático com os marcadores já no tamanho "ativo". Base do globo em
  cor de papel (`--color-papel`), não navy, porque navy-sobre-navy deixava a esfera invisível
  (achado em QA, ver nota de limitação abaixo).
  **Limitação de verificação:** o container de QA deste homelab só tem Chromium/Firefox sem GPU
  real (SwiftShader/sem WebGL). Nesse ambiente, os marcadores desenham normalmente mas a
  superfície do globo (textura de pontos do mapa) não renderiza — erro de WebGL
  (`drawArrays: no buffer is bound to enabled attribute`) e, no Firefox, criação de contexto
  WebGL falha por completo (restrição do próprio container, não do cobe). `cobe` é biblioteca
  madura usada em produção (Vercel, Linear etc.), então é provável que renderize normalmente em
  navegador real com GPU — mas isso não foi confirmado visualmente aqui. Recomendo checar a
  página publicada num navegador comum antes de considerar fechado.
  **Substituído em 2026-11-10:** a causa real não era o container. O cobe 2.0.1 não tem mais
  `onRender` (globo parado num quadro) e a superfície falhava por erro próprio de WebGL. O globo
  agora usa `globe.gl` com tour guiado pela rolagem e foi verificado visualmente (detalhes em
  `DESIGN-SYSTEM.md`, revisões de 2026-11-10).
- Bloco de confiança: número "30 anos" e frase empilham, depoimento (se houver) em largura total.
- Contato: botão de plantão 24h ocupa a largura toda, acima dos 4 atendentes empilhados.
- Localização: mapa com altura ajustada, endereço e horário acima dele.
- Rodapé: mesmo conteúdo, empilhado.

## Pontos de ação

CTA primário (WhatsApp, plantão 24h) presente na abertura e na seção de contato — sempre o mesmo
número confirmado no `BRIEF.md`, sem variação nem invenção de outro canal. Os 4 atendentes ficam
como CTAs secundários só na seção de contato, não repetidos na abertura (evita os "5 botões soltos
iguais" da página atual).

## Comportamento sem JS

Nenhuma aba, nenhuma busca, nenhum conteúdo que só aparece após clique — todos os destinos, o
bloco de confiança e os contatos já estão no HTML, pré-renderizado pelo `prerenderizar.mjs` do
Formato B. JS é só para: (1) a entrada de seção ao rolar (`data-fx-*`, puramente visual); (2) o
preenchimento da linha dourada ao rolar até a rota de destinos — com `prefers-reduced-motion`, a
linha aparece já completa, sem efeito de desenho. Os links de WhatsApp e do mapa são `<a>` comuns,
funcionam sem JS.

## Revisão visual (2026-11-09)

Revisão pedida pelo usuário ("melhorar a visualização da página", mantendo fundo e cores do hero
intocados). Verificado com Playwright (container descartável) em desktop 1440×900, celular 390×844
e `prefers-reduced-motion`, com captura por posição de rolagem real (não `fullPage` — artefato já
documentado no projeto Jady Emanuela).

**Corrigido:**
- Logo no hero e no rodapé (`src/assets/images/logo-canopus.jpg`) tinha corte quadrado com cantos
  duros contra o navy da página, lendo como "adesivo colado" em vez de emblema. Trocado para
  `rounded-full` com anel dourado (`ring-dourado-500/40`) e brilho suave no hero — os cantos da
  imagem já são navy escuro, então o recorte circular soma ao motivo de constelação/emblema em vez
  de destoar.
- Popup de informação do Google Maps (seção "Onde estamos") era cortado no topo pela própria borda
  do iframe — o pino fica perto demais do topo no embed sem chave de API. Corrigido deixando o
  iframe mais alto que a área visível (recorte via `overflow-hidden` no container), dando espaço
  pro balão abrir sem ser cortado, sem mudar a área visível do mapa.

**Era bug de verdade, corrigido (2026-11-09):** uma revisão anterior descartou o relato do usuário
("não tem animação nos campos onde tem os destinos") como falso alarme de captura, baseada numa
observação incompleta: cada ponto (`.fx-passo`) de fato ativa corretamente por conta própria
conforme a posição real de rolagem passa pela "linha de leitura" do motor — isso nunca esteve
quebrado. O problema real era o indicador visual de progresso (antigo "trilho" dourado +
"estrela", `.fx-linha-trilho`/`.fx-linha-estrela`): ele desenhava uma barra horizontal única,
pensada só para quando os 9 destinos cabem numa linha (`lg:grid-cols-9`). No celular
(`grid-cols-3`, 3 linhas) e tablet (`sm:grid-cols-5`, 2 linhas), essa barra ficava presa no topo e
nunca acompanhava as linhas seguintes — sem ela, a ativação de cada ponto (só opacidade/escala
subindo discretamente) ficava quase imperceptível como "animação" pra quem usa o site de verdade.

Corrigido substituindo a grade fixa + trilho único por um fluxo (`flex flex-wrap`) onde cada
destino ganha seu próprio conector visual (`.fx-rota-conector`, um traço curto acima do ponto) e um
leve efeito de profundidade 3D controlado por rolagem (`.fx-rota-item`, `perspective` +
`translateZ`/`rotateX`, sem depender de posição em linha/coluna) — funciona igual em qualquer
largura de tela. Fundo da seção ganhou a `Constelacao` (mesma do hero) como marca-d'água com leve
parallax (`--linha` do motor). Confirmado com rolagem progressiva real via Playwright em desktop,
celular e `reducedMotion: reduce`: a ativação linha a linha agora é claramente visível em todos os
breakpoints, não só no desktop largo. Qualquer QA futura desta seção deve rolar progressivamente
(múltiplas capturas em posições incrementais), não saltar direto com `scrollTo`/`scrollIntoView` —
um salto único mostra um estado intermediário normal, não um defeito.
