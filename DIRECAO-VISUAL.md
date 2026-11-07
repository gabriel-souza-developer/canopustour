# Direção visual — Canopus Turismo

## 0. Nota sobre o método de pesquisa

A primeira rodada desta pesquisa usou só busca textual (sem abrir páginas) e foi descartada por
violar a regra de `referencias/direcao-visual.md` ("não conte resultados apenas textuais como
observação visual"). Uma segunda e terceira rodada abriram as páginas originais de verdade via
fetch (HTTP real, conteúdo e estrutura HTML observados). O ambiente de execução não tem navegador
visual (sem captura de tela/CSS computado), só leitura de HTML/texto — por isso as referências
abaixo registram estrutura, copy e hierarquia de seções com confiança, mas não hex exatos nem
proporções visuais pixel a pixel, exceto onde o CSS/token apareceu explícito no conteúdo (caso do
item hebcal). Nenhuma referência abaixo foi inventada; qualquer item que não carregou está
marcado como falha, não como observação.

## 1. Pesquisa com propósito (quatro referências reais, abertas de verdade)

| Fonte | URL | O que foi efetivamente visto | Limitação |
|---|---|---|---|
| Setor (turismo de luxo) | madeforspainandportugal.com | Agência boutique real (Madri/Sotogrande). Headline "the ultimate travel experience" / "Turn every journey into an everlasting memory". Faixa de logos de credenciais (Virtuoso, Condé Nast, Signature Travel Network). Cards de destino com coordenadas geográficas (ex. "cordoba, 37.8788°N, -4.7793°W"). Carrossel de depoimentos com nome da família. CTA repetido "Begin your journey now". | Conteúdo real (HTML carregou, 26k caracteres), mas sem CSS/cor extraído pela ferramenta de fetch. |
| Setor (turismo de luxo) | scottdunn.com | Site real e extenso (44k caracteres). Hero "The Art of Travel" / "Where Your Journey Meets Our Legacy". Ordem de seções: quatro pilares de marca → prêmios → tendências do ano → "Four Steps to Your Luxury Holiday" → imprensa → destinos por região → especialistas (cards com foto/bio) → depoimentos em carrossel com iniciais+mês+destino → rodapé com newsletter. CTAs curtos e diretos ("Design My Holiday", "Enquire Now"). | Mesma limitação: estrutura e copy confirmados, cor/tipografia não. |
| Design (outro setor) | docs.hebcal.co.il/brand.html | Documentação de marca de um app de calendário hebraico, tokens reais: `--navy #1a2744`, `--navy-dark #111b35`, `--gold #c9a84c`, `--gold-deep #a08232` (dourado sobre fundo claro, para contraste AA), `--cream #f7f6f0` (fundo claro, nunca branco puro). Regra explícita: "Always use navy on gold" / "Don't put white text on gold buttons." Dourado como destaque pontual, nunca como cor de fundo extensa. | Setor sem relação com turismo; usado só como evidência de como compor navy+dourado com contraste correto, não como fonte de composição de página. |
| Design (institucional/exploração) | rgs.org (Royal Geographical Society) | Site real (16k caracteres). Tema de exploração/expedição no conteúdo ("Explore Weekend 2026", grants de pesquisa de campo), tom institucional, copy curta em frases descritivas, destaques em negrito no corpo do texto. Estrutura densa de cards e menu (eventos, notícias, doação, recursos). | Carregou de verdade, mas não é referência de composição vencedora para a Canopus — é denso/institucional, sem paleta confirmada. Serve só para confirmar que o tema "exploração" pode soar institucional se não houver curadoria visual cuidadosa (risco a evitar). |

Referências descartadas por não terem carregado conteúdo real: Niarra Travel (awwwards.com só
trouxe metadado — nota 7.54/10 e paleta extraída automaticamente pelo Awwwards é só preto/branco,
o que contradiz a hipótese inicial de navy+dourado; niarratravel.com recusou conexão), Trawelt
(carregou, mas é uma consultoria B2B de tecnologia para hotelaria, não uma agência de viagens —
setor incompatível, descartada), Black Tomato (403 bloqueado), superdesign.dev, Cosmos e Mobbin
(carregaram só a landing de marketing das próprias ferramentas, sem acesso à biblioteca de
referências sem login/plano pago).

Conclusão da pesquisa de setor: as duas referências de turismo de luxo confirmadas (Made for
Spain & Portugal, Scott Dunn) convergem em um padrão comum — credenciais/prêmios em destaque,
curadoria/"bespoke" como palavra-chave central, depoimentos reais em carrossel, destinos
organizados por card/região, CTA de contato humano repetido (não "comprar" direto). Isso é piso de
qualidade útil (confirma que "curadoria premium" e prova social são centrais ao setor, não um
capricho), mas também é exatamente o padrão que a Direção B abaixo arriscaria repetir; por isso a
Direção A (motivo de constelação) continua a recomendada, por partir da identidade literal do
cliente (nome "Canopus" = estrela-guia; tagline real "A Estrela Guia do seu Destino") em vez do
clichê geral de "agência de viagem bonita" — mas incorpora dos concorrentes reais confirmados: uma
faixa de credenciais/tempo de atuação (30 anos) e depoimentos reais, se a cliente fornecer.

## 2. Travas do `BRIEF.md`

Marca real: azul-marinho escuro + dourado, símbolo de sol/estrela em círculo, tagline "A Estrela
Guia do seu Destino", posicionamento "curadoria premium... há 30 anos". Contato principal:
plantão 24h. Destinos confirmados (nomes, sem foto própria ainda): Grand Amazon, Mediterrâneo,
Espanha 2026, Atacama, Costa Rica, África do Sul, Colômbia, Uruguai 2026, Inglaterra.

## 3. Direções propostas

### Direção A — "Carta celeste" (recomendada)
- **Conceito:** a página como um mapa de estrelas guiando o viajante — ancorado literalmente no
  nome Canopus (estrela-guia de navegação marítima histórica) e na tagline do próprio logo.
- **Abertura:** título curto em duas linhas sobre fundo azul-marinho quase preto; atrás do texto,
  um traçado fino e estático de linhas conectando pontos (constelação), sem brilho que segue o
  mouse e sem animação contínua — um `data-fx-*` de entrada sóbrio (ex.: aparecer uma vez ao
  rolar). Uma imagem de destino real (a confirmar com a cliente) entra recortada à direita/abaixo
  no mobile.
- **Pico (cena fixa):** "rota de destinos" — faixa horizontal com os destinos reais do Instagram
  como pontos ligados por uma linha fina dourada (motivo de constelação aplicado a dados reais,
  não decorativo). No celular vira lista vertical com marcador de ponto dourado.
- **Assinatura:** a linha fina dourada que liga pontos reaparece na seção de contato ligando os
  ícones de atendimento ao plantão 24h em destaque.
- **Cor:** navy quase preto (base), dourado (ação/destaque, do próprio logo), papel claro/creme
  para blocos de leitura longa (contraste AA sobre navy verificado no design system).
- **Tipo:** sans-serif geométrica para UI/corpo + serifada de alto contraste só em títulos de
  destino (reforça "curadoria", sem copiar nenhuma referência específica).
- **Imagens:** fotografia de destino real tratada com leve overlay navy, sem filtro genérico de
  "turismo".
- **Ritmo:** 6 cenas — abertura, rota de destinos, bloco de confiança (30 anos + curadoria),
  contato (plantão 24h + atendentes), localização (mapa), rodapé.
- **Mobile:** linha de constelação vira traço vertical entre os destinos empilhados.
- **Movimento:** só entrada de seção e preenchimento da linha dourada ao rolar; respeita
  `prefers-reduced-motion` (linha aparece estática, sem desenhar).

### Direção B — "Diário de bordo" (rejeitada como principal)
- **Conceito:** tom editorial de revista de viagem, com fichas de destino numeradas.
- **Abertura:** fotografia full-bleed de destino com overlay em gradiente navy e título sobreposto.
- **Pico:** grade assimétrica de destinos com legenda estilo "ficha" (ex.: "ATACAMA — 2026") em
  dourado monoespaçado.
- **Por que foi rejeitada como principal:** é o padrão mais comum encontrado nas três referências
  de turismo de luxo pesquisadas (fotografia full-bleed + grade editorial) — arrisca parecer "mais
  uma agência bonita" em vez de usar o que é literalmente exclusivo da marca (o nome da estrela).
  Mantida como direção B porque é mais simples de produzir se faltarem fotos próprias de boa
  qualidade dos destinos (ver pendência no BRIEF.md).

### Direção C — rejeitada na origem
- Grade de cards padronizados estilo vitrine de e-commerce de pacotes (preço, botão "comprar" por
  card). Rejeitada por violar a regra de "sem grades de cartões repetidos sem necessidade" e por
  não haver preços/pacotes confirmados pela cliente para popular os cards (ver pendências do
  BRIEF.md) — construiria em cima de dado não confirmado.

## 4. Comparação com `construcoes.md`

Nenhum projeto registrado usa o nicho de turismo, paleta navy+dourado ou motivo de
constelação/linha-guia. Eixos que diferem (mínimo exigido: 3 de 5 — aqui diferem todos os 5):
- **Abertura:** nenhum projeto existente usa traçado de constelação atrás do título.
- **Pico:** nenhum usa "rota de destinos" com pontos ligados por linha.
- **Assinatura:** linha dourada conectando pontos é inédita no registro.
- **Paleta:** navy quase preto + dourado não aparece em nenhum projeto (mais próximo é
  advocacia-kamila-eric, que é marrom-preto/ouro/creme — tom terroso, não frio/estelar).
- **Estrutura:** diretório de destinos com linha-guia não repete abas, acordeão nem grade fixa dos
  projetos anteriores.

## 5. Pendências que afetam a direção final
- Fotos próprias dos destinos em alta resolução (BRIEF.md) — sem elas, a abertura e a rota de
  destinos da Direção A usam placeholder `.pend` marcado, não foto de banco genérica.
- Depoimentos reais (BRIEF.md pendente) — se a cliente fornecer avaliações verdadeiras, incluir
  como prova social (padrão confirmado em Scott Dunn e Made for Spain & Portugal); sem eles, não
  inventar depoimento.
- A primeira dobra implementada deve ser observada em navegador real (desktop e celular) nesta
  máquina antes de seguir para o restante da página, conforme `npm run checar` e a etapa 4 de
  `referencias/direcao-visual.md`.
