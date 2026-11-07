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
