import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Constelacao } from "./componentes/constelacao";
import { RotaDestinos } from "./componentes/globo-destinos";
import { IconeWhatsapp } from "./componentes/icone-whatsapp";
import { IconeInstagram } from "./componentes/icone-instagram";
import { IconeFacebook } from "./componentes/icone-facebook";
import { AvatarIniciais } from "./componentes/avatar-iniciais";
import { AcoesFlutuantes } from "./componentes/acoes-flutuantes";
import logoCanopus from "./assets/images/logo-canopus.jpg";
import fachadaCanopus from "./assets/images/fachada-canopus.jpg";

/* ------------------------------------------------------------------ dados
   Todos confirmados em BRIEF.md. Não alterar sem nova confirmação da
   cliente. Contato principal: plantão 24h, decisão da cliente. */

const WHATSAPP_PLANTAO = "https://wa.me/558330634884";
const WHATSAPP_PLANTAO_NUMERO = "(83) 3063-4884";

/* Coordenadas: local representativo escolhido pra cada nome de destino já
   confirmado em BRIEF.md (os nomes são dado real da cliente; a cidade/ponto
   exato dentro de cada região é interpretação nossa pro globo, documentada
   em DESIGN-SYSTEM.md — não é dado novo sobre o negócio da cliente). */
const DESTINOS: { nome: string; location: [number, number] }[] = [
  // Ordem de roteiro contínuo pro tour do globo (Américas -> África ->
  // Europa); não é ordem de prioridade da cliente.
  { nome: "Grand Amazon", location: [-3.119, -60.0217] }, // Manaus, AM
  { nome: "Colômbia", location: [10.391, -75.4794] }, // Cartagena
  { nome: "Costa Rica", location: [9.9281, -84.0907] }, // San José
  { nome: "Atacama", location: [-22.9087, -68.1997] }, // San Pedro de Atacama, Chile
  { nome: "Uruguai 2026", location: [-34.96, -54.95] }, // Punta del Este
  { nome: "África do Sul", location: [-33.9249, 18.4241] }, // Cidade do Cabo
  { nome: "Mediterrâneo", location: [36.3932, 25.4615] }, // Santorini, Grécia
  { nome: "Espanha 2026", location: [40.4168, -3.7038] }, // Madrid
  { nome: "Inglaterra", location: [51.5074, -0.1278] }, // Londres
];

// Ponto de partida dos arcos do globo: o escritório no Catolé, Campina Grande - PB.
const ORIGEM = { nome: "Campina Grande", location: [-7.2307, -35.8811] as [number, number] };

const ATENDENTES = [
  { nome: "Kennedy Vasconcelos", link: "https://wa.me/5583988925922" },
  { nome: "Carol Muniz", link: "https://wa.me/5583987908448" },
  { nome: "Myrlla Santos", link: "https://wa.me/5583986747728" },
  { nome: "Rita Araujo", link: "https://wa.me/5583998631784" },
];

/* Perguntas reais a partir do que já está confirmado em BRIEF.md (nenhuma
   resposta inventa política de pagamento, cancelamento ou horário, dados
   ainda pendentes com a cliente). */
const DUVIDAS = [
  {
    pergunta: "Qual a diferença entre o plantão 24h e os atendentes comerciais?",
    resposta:
      "O plantão 24h é só para quem já está em viagem e precisa de suporte durante o roteiro. Para montar uma viagem nova ou pedir um orçamento, fale com um dos nossos atendentes comerciais.",
  },
  {
    pergunta: "Vocês organizam viagens nacionais e internacionais?",
    resposta:
      "Sim. Já levamos grupos para destinos como Mediterrâneo, Atacama, Costa Rica e Grand Amazon, entre outros. Veja a rota de destinos acima.",
  },
  {
    pergunta: "Como peço um orçamento?",
    resposta:
      "Fale com um dos atendentes pelo WhatsApp e conte o destino, a data e quantas pessoas vão viajar. A gente monta o roteiro com você a partir daí.",
  },
  {
    pergunta: "Preciso de passaporte ou visto para viajar?",
    resposta:
      "Depende do destino. Isso é conversado na montagem do seu roteiro, para você saber exatamente o que precisa levar.",
  },
  {
    pergunta: "Posso ir até o escritório em vez de falar pelo WhatsApp?",
    resposta:
      "Sim, nosso escritório fica na R. Cristina P. da Silva, 1326A, no Catolé, em Campina Grande. Você também pode começar a conversa pelo WhatsApp, como preferir.",
  },
];

/* Endereço usado nas consultas de mapa (nome completo da rua, confirmado pela
   cliente em 2026-11-06); o texto exibido na página usa a forma abreviada
   "R. Cristina P. da Silva, 1326A" (BRIEF.md), mantida como está. */
const MAPA_ROTA =
  "https://www.google.com/maps/search/?api=1&query=R.+Cristina+Proc%C3%B3pio+da+Silva%2C+1326+-+Catol%C3%A9%2C+Campina+Grande%2C+PB";

const MAPA_EMBED =
  "https://www.google.com/maps?q=R.+Cristina+Proc%C3%B3pio+da+Silva%2C+1326+-+Catol%C3%A9%2C+Campina+Grande%2C+PB&output=embed";

function App() {
  useEffect(() => {
    import("./motor/motor.js");
  }, []);

  return (
    <>
      <a href="#conteudo" className="pular">
        Pular para o conteúdo
      </a>

      <main id="conteudo">
        {/* Abertura (revisão 2026-11-10). Celular/tablet: bloco editorial
            centralizado e, logo abaixo, o cartão de atendimento. Desktop
            (lg+): duas colunas em max-w-6xl, editorial à esquerda e o mesmo
            cartão à direita, tudo acima da dobra. Referências do padrão em
            DIRECAO-VISUAL.md, seção "Revisão da abertura". */}
        <section
          id="contato"
          className="relative overflow-hidden bg-navy-950 px-6 pt-16 pb-20 md:px-12 md:pt-28 md:pb-24 lg:flex lg:min-h-[100svh] lg:items-center lg:py-20"
        >
          <Constelacao className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/80 lg:bg-gradient-to-r lg:from-navy-950/90 lg:via-navy-950/30 lg:to-navy-950/70"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto grid w-full max-w-3xl justify-items-center text-center lg:max-w-6xl lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:justify-items-stretch lg:gap-12 xl:grid-cols-[minmax(0,1fr)_28rem] xl:gap-16 lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <div data-fx="crescer" className="flex flex-col items-center gap-3 lg:flex-row lg:gap-4">
                <img
                  src={logoCanopus}
                  alt="Canopus Turismo"
                  width={80}
                  height={80}
                  className="h-16 w-16 rounded-full ring-2 ring-dourado-500/40 shadow-[0_0_24px_-4px_rgba(216,169,63,0.35)] md:h-20 md:w-20 lg:h-14 lg:w-14"
                />
                <p className="text-sm font-semibold tracking-[0.3em] text-dourado-300 uppercase">
                  Canopus Turismo
                </p>
              </div>

              <h1
                data-fx="subir"
                className="mt-7 text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.01em] text-papel lg:mt-10 lg:text-[clamp(3.75rem,5.6vw,5.25rem)] lg:leading-[1.02]"
              >
                A estrela guia
                <br />
                do seu destino
              </h1>

              <p
                data-fx="surgir"
                data-fx-atraso="120"
                className="mt-6 max-w-[42ch] text-lg leading-relaxed text-papel/80 md:text-xl lg:mt-7 lg:max-w-[38ch]"
              >
                Curadoria premium em viagens e excursões. Há 30 anos conectando sonhos ao mundo, em
                Campina Grande.
              </p>

              <a
                data-fx="surgir"
                data-fx-atraso="200"
                href="#destinos"
                className="mt-10 hidden items-center gap-2 font-semibold text-dourado-300 underline decoration-dourado-500/50 underline-offset-[6px] transition hover:decoration-dourado-300 lg:inline-flex"
              >
                Ver a rota de destinos
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="mt-12 flex w-full flex-col items-stretch rounded-2xl border border-dourado-500/25 bg-navy-800/45 p-5 text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-8 md:mt-16 lg:mt-0 lg:rounded-3xl xl:p-9">
              <h2
                data-fx="subir"
                data-fx-atraso="80"
                className="text-[1.75rem] font-semibold text-papel sm:text-[2.25rem] lg:whitespace-nowrap"
              >
                Fale com a gente
              </h2>
              <p data-fx="surgir" data-fx-atraso="160" className="mt-2 text-pretty text-papel/75">
                Atendimento direto, de gente para gente.
              </p>

              {/* Plantão 24h: mesma lógica das linhas de atendente (ícone à
                  esquerda, texto alinhado à esquerda), em destaque dourado. */}
              <a
                data-fx="crescer"
                data-fx-atraso="180"
                href={WHATSAPP_PLANTAO}
                className="group mt-6 flex min-h-16 items-center gap-3.5 rounded-2xl bg-dourado-500 px-4 py-3 text-navy-950 transition hover:bg-dourado-300 sm:px-5 lg:mt-7"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-950/10">
                  <IconeWhatsapp className="h-5 w-5" />
                </span>
                <span className="flex flex-1 flex-col text-left leading-tight">
                  <span className="text-[1.0625rem] font-semibold">Plantão 24h</span>
                  <span className="mt-0.5 text-sm font-medium text-navy-950/75">
                    Passageiros em viagem
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5"
                />
              </a>

              <p
                data-fx="surgir"
                data-fx-atraso="130"
                className="mt-8 flex items-center gap-4 text-xs font-semibold tracking-[0.3em] text-dourado-300 uppercase after:h-px after:flex-1 after:bg-dourado-500/25 after:content-['']"
              >
                Atendimento comercial
              </p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {ATENDENTES.map((atendente, i) => (
                  <li key={atendente.nome} data-fx="surgir" data-fx-atraso={String(160 + i * 70)}>
                    <a
                      href={atendente.link}
                      className="flex min-h-14 items-center gap-3 rounded-xl border border-dourado-500/30 px-3.5 py-3 text-left text-papel transition sm:gap-4 sm:px-4 hover:border-dourado-300 hover:text-dourado-300"
                    >
                      <AvatarIniciais nome={atendente.nome} className="h-10 w-10 text-sm" />
                      <span className="flex-1 font-medium">{atendente.nome}</span>
                      <IconeWhatsapp className="h-5 w-5 shrink-0 text-dourado-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-papel px-6 py-24 text-tinta md:px-12">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
            <div data-fx="direita" className="text-center md:text-left">
              <span className="block text-[clamp(4rem,10vw,7rem)] leading-none font-semibold text-navy-950">
                30
              </span>
              <span className="block text-2xl font-bold tracking-[0.2em] text-dourado-profundo uppercase">
                anos
              </span>
            </div>
            <div data-fx="surgir" data-fx-atraso="100" className="text-center md:text-left">
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-navy-950">
                Curadoria premium em viagens e excursões
              </h2>
              <p className="mx-auto mt-4 max-w-[60ch] text-lg text-tinta/80 md:mx-0">
                Há três décadas conectando sonhos ao mundo, com atendimento humano em cada etapa da
                viagem.
              </p>
            </div>
          </div>
        </section>

        <RotaDestinos
          destinos={DESTINOS}
          origem={ORIGEM}
          fundo={
            <Constelacao className="rota-fundo pointer-events-none absolute inset-0 h-full w-full opacity-20" />
          }
          cabecalho={
            <>
              <h2
                id="destinos-titulo"
                data-fx="subir"
                className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold text-papel"
              >
                Nossa rota de destinos
              </h2>
              <p
                data-fx="surgir"
                data-fx-atraso="100"
                className="mx-auto mt-3 max-w-[42ch] text-papel/75 md:mx-0 md:mt-4"
              >
                Os roteiros que estamos levando pelo mundo, curados com a mesma atenção de sempre.
              </p>
            </>
          }
        />

        <section id="duvidas" className="bg-navy-950 px-6 py-24 md:px-12">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2
                data-fx="subir"
                className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold text-papel"
              >
                Dúvidas comuns
              </h2>
              <p
                data-fx="surgir"
                data-fx-atraso="100"
                className="mx-auto mt-4 max-w-[50ch] text-papel/75"
              >
                As perguntas que mais chegam antes de marcar uma viagem com a gente.
              </p>
            </div>

            <div data-fx="surgir" data-fx-atraso="160" className="mt-12">
              {DUVIDAS.map((duvida) => (
                <details key={duvida.pergunta} className="duvida-item">
                  <summary className="duvida-pergunta">{duvida.pergunta}</summary>
                  <div className="duvida-corpo">
                    <p className="text-papel/75">{duvida.resposta}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="localizacao" className="bg-papel px-6 py-24 text-tinta md:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 data-fx="subir" className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold text-navy-950">
              Onde estamos
            </h2>
            <p data-fx="surgir" data-fx-atraso="100" className="mt-4 text-lg text-tinta/80">
              R. Cristina P. da Silva, 1326A, Catolé, Campina Grande, PB
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div>
                <div
                  data-fx="esquerda"
                  className="overflow-hidden rounded-lg border border-navy-950/15"
                >
                  <img
                    src={fachadaCanopus}
                    alt="Fachada da Canopus Turismo na R. Cristina P. da Silva, Catolé"
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="h-72 w-full object-cover md:h-96"
                  />
                </div>
                <p className="mt-2 text-xs text-tinta/50">
                  Imagem: Google Street View, 2026. Substituir por foto profissional quando
                  disponível.
                </p>
              </div>

              <div
                data-fx="direita"
                data-fx-atraso="100"
                className="h-[288px] overflow-hidden rounded-lg border border-navy-950/15 md:h-[384px]"
              >
                {/* iframe mais alto que a área visível, deslocado pra cima: dá espaço pro
                    balão de informação do Google (que abre acima do marcador) renderizar
                    sem ser cortado pela borda do próprio iframe; o recorte (overflow-hidden
                    no container acima) mantém a área visível do mesmo tamanho de antes. */}
                <iframe
                  src={MAPA_EMBED}
                  title="Mapa com a localização da Canopus Turismo"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[448px] w-full -mt-[80px] md:h-[544px]"
                />
              </div>
            </div>

            <a
              data-fx="surgir"
              data-fx-atraso="220"
              href={MAPA_ROTA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy-950/25 px-6 py-3 font-semibold text-navy-950 transition hover:border-navy-950/60"
            >
              Abrir rota no mapa
            </a>
          </div>
        </section>

        <footer className="bg-navy-950 px-6 py-12 text-center md:px-12">
          <img
            data-fx="crescer"
            src={logoCanopus}
            alt="Canopus Turismo"
            width={48}
            height={48}
            loading="lazy"
            className="mx-auto h-12 w-12 rounded-full ring-2 ring-dourado-500/40"
          />
          <p data-fx="surgir" data-fx-atraso="80" className="mt-4 text-sm font-semibold tracking-[0.3em] text-dourado-300 uppercase">Canopus Turismo</p>
          <p data-fx="surgir" data-fx-atraso="140" className="mt-3 text-papel/70">R. Cristina P. da Silva, 1326A, Catolé, Campina Grande, PB</p>
          <div data-fx="surgir" data-fx-atraso="200" className="mt-5 flex justify-center gap-3">
            <a
              href="https://www.instagram.com/canopustour/"
              aria-label="Instagram da Canopus Turismo"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-dourado-500/30 text-papel/80 transition hover:border-dourado-300 hover:text-dourado-300"
            >
              <IconeInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/canopustour/"
              aria-label="Facebook da Canopus Turismo"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-dourado-500/30 text-papel/80 transition hover:border-dourado-300 hover:text-dourado-300"
            >
              <IconeFacebook className="h-5 w-5" />
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-[60ch] text-xs text-papel/50">
            Esta página não usa formulário nem ferramenta de análise. A seção “Onde estamos” carrega
            um mapa incorporado do Google Maps; os demais links levam direto ao WhatsApp, Instagram
            e Facebook.
          </p>
        </footer>
      </main>

      <AcoesFlutuantes whatsapp={WHATSAPP_PLANTAO} numero={WHATSAPP_PLANTAO_NUMERO} />
    </>
  );
}

export default App;
