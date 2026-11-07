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

## 5. Componentes (escolha e função)

- **Linha-guia de destinos** (assinatura, seção "rota de destinos"): componente próprio do motor
  (`data-fx-*`), não vem de Flowbite/daisyUI — é o elemento diferenciador da Direção A.
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
- **Estrela guia na rota de destinos**: ponto dourado com brilho que percorre a linha-guia conforme
  a leitura avança, usando a mesma variável `--linha` que já desenha a linha (`data-fx-linha` do
  motor, sem lib nova). Reforça a tagline da marca ("A Estrela Guia do seu Destino") literalmente
  guiando pela rota; para quem não quer o movimento, `--linha` já chega fixa em 1 e a estrela fica
  parada no fim da rota.

## 6. Estados de interação e foco

- Foco visível: contorno de 2px em `--cor-dourado-300` com deslocamento (`outline-offset`) de 2px,
  visível tanto sobre navy quanto sobre papel.
- Hover em botão dourado: escurecer levemente (`--cor-dourado-500` → tom ~8% mais escuro), sem
  mudar de cor de família.
- Link de texto: sublinhado sempre visível (não só no hover), para acessibilidade e para não
  depender de cor como único indicador.

## 7. Responsividade e movimento reduzido

- Mobile-first: a "rota de destinos" (linha horizontal no desktop) empilha em lista vertical com
  marcador de ponto dourado por destino.
- `prefers-reduced-motion`: a linha dourada da seção de destinos aparece já completa (sem efeito
  de "desenhar ao rolar"); nenhuma entrada de seção depende de JS para ficar legível — conteúdo
  presente no HTML pré-renderizado (build do Formato B roda `prerenderizar.mjs`).
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
