import { useEffect, useRef, useState, type ReactNode } from "react";
import type { GlobeInstance } from "globe.gl";

/* Rota de destinos com globo 3D (globe.gl / three.js), revisão 2026-11-10.
 *
 * Substitui o cobe 2.0.1: na v2 o cobe não tem mais `onRender` (o globo ficava
 * parado num único quadro) e a superfície caía num erro de WebGL ("no buffer
 * is bound to enabled attribute"), sobrando só os marcadores.
 *
 * Como funciona: a seção é um "trilho" alto com o conteúdo `sticky`. O
 * progresso de rolagem dentro do trilho vira um tour: a câmera voa de destino
 * em destino (com uma pausa em cada um), um arco dourado sai de Campina Grande
 * até o destino da vez, que ganha anéis pulsando e rótulo, e a lista lateral
 * acende o item correspondente. Tudo amarrado à rolagem, nunca ao mouse
 * (regra do motor); os controles de arrastar/zoom do globo ficam desligados
 * para não prender a rolagem no celular.
 *
 * Sem JS: o trilho não cresce (só com `.fx-js`), a lista aparece completa.
 * Movimento reduzido: sem trilho, câmera fixa mostrando todos os arcos, sem
 * animação de traço nem anéis, todos os itens da lista acesos.
 * A biblioteca (three.js) só é baixada quando a seção se aproxima da tela. */

export type Destino = { nome: string; location: [number, number] };

const DOURADO = "#d8a93f";
const DOURADO_CLARO = "#ecce8e";
const NAVY_800 = "#132349";
const NAVY_950 = "#0a1530";

const entre = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const suave = (a: number, b: number, x: number) => {
  const t = entre((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

type Vista = { lat: number; lng: number; altitude: number };

// Módulos do globo, baixados uma vez só (pré-carga ociosa + montagem).
let modulos: Promise<
  [typeof import("globe.gl"), typeof import("three"), typeof import("../assets/pontos-terra.json")]
> | null = null;
const carregarModulos = () =>
  (modulos ??= Promise.all([import("globe.gl"), import("three"), import("../assets/pontos-terra.json")]));

export function RotaDestinos({
  destinos,
  origem,
  cabecalho,
  fundo,
}: {
  destinos: Destino[];
  origem: Destino;
  cabecalho: ReactNode;
  fundo?: ReactNode;
}) {
  const trilhoRef = useRef<HTMLElement>(null);
  const globoRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);
  const [semMovimento, setSemMovimento] = useState(false);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    const trilho = trilhoRef.current;
    const alvo = globoRef.current;
    if (!trilho || !alvo) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSemMovimento(reduzido);

    let globo: GlobeInstance | null = null;
    let quadro = 0;
    let vivo = true;
    let iniciando = false; // evita montar dois globos se a seção sair/voltar durante o download
    let ativoAtual = -1;
    const n = destinos.length;
    const vista: Vista = { lat: destinos[0].location[0], lng: destinos[0].location[1], altitude: 2.2 };

    const altitudeBase = () => (alvo.offsetWidth < 480 ? 1.85 : 1.95);

    // Progresso 0..1 dentro do trilho -> índice contínuo com pausa em cada
    // destino (o trecho do meio de cada segmento faz a viagem).
    const lerRolagem = () => {
      const caixa = trilho.getBoundingClientRect();
      // Curso = quanto o trilho rola enquanto o palco fica preso (no celular o
      // palco tem a altura do conteúdo, não da tela inteira).
      const palco = trilho.firstElementChild as HTMLElement | null;
      const alturaPalco = Math.min(window.innerHeight, palco?.offsetHeight ?? window.innerHeight);
      const curso = Math.max(1, caixa.height - alturaPalco);
      const p = entre(-caixa.top / curso, 0, 1);
      trilho.style.setProperty("--linha", p.toFixed(4));
      const t = p * (n - 1);
      const seg = Math.min(n - 2, Math.floor(t));
      const f = suave(0.2, 0.8, t - seg);
      return { seg, f, indice: Math.round(seg + f) };
    };

    const vistaAlvo = (seg: number, f: number): Vista => {
      const [la1, lo1] = destinos[seg].location;
      const [la2, lo2] = destinos[seg + 1].location;
      let dLng = lo2 - lo1;
      if (dLng > 180) dLng -= 360;
      if (dLng < -180) dLng += 360;
      return {
        lat: la1 + (la2 - la1) * f,
        lng: lo1 + dLng * f,
        altitude: altitudeBase() + Math.sin(Math.PI * f) * 0.55, // "decola" entre destinos
      };
    };

    const marcarAtivo = (i: number) => {
      if (i === ativoAtual || !globo) return;
      ativoAtual = i;
      setAtivo(i);
      const d = destinos[i];
      globo
        .arcColor((a: object) =>
          (a as { i: number }).i === i
            ? ["rgba(236,206,142,0.35)", "#fff4d6"]
            : ["rgba(216,169,63,0.04)", "rgba(216,169,63,0.22)"],
        )
        .arcStroke((a: object) => ((a as { i: number }).i === i ? 1.1 : 0.22))
        .ringsData([{ lat: d.location[0], lng: d.location[1] }]);
      globo.htmlElementsData([
        { ...rotulo(origem.nome, "origem"), lat: origem.location[0], lng: origem.location[1] },
        { ...rotulo(d.nome, "ativo"), lat: d.location[0], lng: d.location[1] },
      ]);
    };

    const rotulo = (texto: string, tipo: "origem" | "ativo") => {
      // O globe.gl controla o transform do elemento que recebe; o rótulo
      // visível vai num filho, livre para ser deslocado acima do ponto.
      const el = document.createElement("div");
      el.className = "globo-ancora";
      const caixa = document.createElement("span");
      caixa.className = `globo-rotulo globo-rotulo-${tipo}`;
      caixa.textContent = texto;
      el.append(caixa);
      return { el };
    };

    let ultimo = performance.now();
    const passo = (agora: number = performance.now()) => {
      const dt = Math.min(0.1, (agora - ultimo) / 1000);
      ultimo = agora;
      if (!vivo || !globo) return;
      const { seg, f, indice } = lerRolagem();
      marcarAtivo(indice);
      const a = vistaAlvo(seg, f);
      let dLng = a.lng - vista.lng;
      if (dLng > 180) dLng -= 360;
      if (dLng < -180) dLng += 360;
      const k = 1 - Math.exp(-dt * 6); // suavização por tempo, igual em 30 ou 120 Hz
      if (Math.abs(dLng) + Math.abs(a.lat - vista.lat) + Math.abs(a.altitude - vista.altitude) > 0.002) {
        vista.lat += (a.lat - vista.lat) * k;
        vista.lng += dLng * k;
        vista.altitude += (a.altitude - vista.altitude) * k;
        globo.pointOfView(vista, 0);
      }
      quadro = requestAnimationFrame(passo);
    };

    const ajustarTamanho = () => {
      if (!globo) return;
      const lado = alvo.offsetWidth;
      globo.width(lado).height(lado);
    };

    const iniciar = async () => {
      try {
        const [{ default: Globe }, { MeshPhongMaterial, Color, CanvasTexture }, pontos] = await carregarModulos();
        if (!vivo) return;

        // Pontos de terra pré-calculados (scripts/gerar-pontos-terra.mjs),
        // desenhados como uma camada única de partículas redondas.
        const emPares = (lista: number[]) => {
          const saida: { lat: number; lng: number }[] = [];
          for (let k = 0; k < lista.length; k += 2) saida.push({ lat: lista[k], lng: lista[k + 1] });
          return saida;
        };
        // Com textura, o three-globe ignora particlesColor (pinta de branco) e
        // não usa transparência: a bolinha já vem na cor final, com o dourado
        // pré-misturado sobre o navy do globo.
        const bolinha = (cor: string) => {
          const tela = document.createElement("canvas");
          tela.width = tela.height = 64;
          const ctx = tela.getContext("2d")!;
          ctx.fillStyle = cor;
          ctx.beginPath();
          ctx.arc(32, 32, 28, 0, Math.PI * 2);
          ctx.fill();
          return new CanvasTexture(tela);
        };
        const camadas = [
          { pts: emPares(pontos.resto), textura: bolinha("#8f7744") }, // dourado ~60% sobre navy
          { pts: emPares(pontos.br), textura: bolinha("#e6c98a") }, // Brasil em destaque
        ];

        const material = new MeshPhongMaterial({
          color: new Color(NAVY_800),
          emissive: new Color(NAVY_950),
          emissiveIntensity: 0.55,
          shininess: 6,
        });

        const arcos = destinos.map((d, i) => ({
          i,
          startLat: origem.location[0],
          startLng: origem.location[1],
          endLat: d.location[0],
          endLng: d.location[1],
        }));

        globo = new Globe(alvo, { rendererConfig: { antialias: true, alpha: true } })
          .backgroundColor("rgba(0,0,0,0)")
          .globeMaterial(material)
          .showAtmosphere(true)
          .atmosphereColor(DOURADO)
          .atmosphereAltitude(0.16)
          .particlesData(camadas)
          .particlesList("pts")
          .particleLat("lat")
          .particleLng("lng")
          .particleAltitude(0.004)
          .particlesSize(1.6)
          .particlesSizeAttenuation(true)
          .particlesTexture("textura")
          .pointsData([...destinos, origem].map((d) => ({ lat: d.location[0], lng: d.location[1], o: d === origem })))
          .pointColor((p: object) => ((p as { o: boolean }).o ? "#faf6ec" : DOURADO_CLARO))
          .pointAltitude(0.012)
          .pointRadius((p: object) => ((p as { o: boolean }).o ? 0.55 : 0.42))
          .pointsTransitionDuration(0)
          .arcsData(arcos)
          .arcAltitudeAutoScale(0.45)
          .arcsTransitionDuration(0)
          .ringColor(() => (t: number) => `rgba(236,206,142,${1 - t})`)
          .ringMaxRadius(4.5)
          .ringPropagationSpeed(2.2)
          .ringRepeatPeriod(1100)
          .htmlElement((d: object) => (d as { el: HTMLElement }).el)
          .htmlAltitude(0.02)
          .htmlTransitionDuration(0)
          .htmlElementVisibilityModifier((el, visivel) => {
            el.dataset.visivel = visivel ? "1" : "0";
          });

        const controles = globo.controls();
        controles.enableRotate = false;
        controles.enableZoom = false;
        controles.enablePan = false;
        controles.enabled = false;
        // O OrbitControls põe touch-action: none no canvas mesmo desligado: no
        // celular, deslizar o dedo sobre o globo não rolava a página ("preso").
        globo.renderer().domElement.style.touchAction = "auto";
        globo.renderer().domElement.style.pointerEvents = "none";
        globo.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 2));
        ajustarTamanho();

        if (reduzido) {
          globo
            .arcColor(() => ["rgba(236,206,142,0.2)", DOURADO_CLARO])
            .arcStroke(0.45)
            .htmlElementsData([
              { ...rotulo(origem.nome, "origem"), lat: origem.location[0], lng: origem.location[1] },
            ])
            .pointOfView({ lat: 8, lng: -38, altitude: 2.7 }, 0);
        } else {
          globo.arcDashLength(0.7).arcDashGap(0.5).arcDashAnimateTime(2600);
          globo.pointOfView(vista, 0);
          quadro = requestAnimationFrame(passo);
        }
        alvo.dataset.pronto = "1";
      } catch (erro) {
        console.warn("[globo] não foi possível iniciar o WebGL:", erro);
        setFalhou(true);
      }
    };

    // Baixa a lib num momento ocioso logo depois da carga da página (não
    // espera o usuário chegar na seção); monta o globo ao se aproximar dela e
    // pausa o render quando está longe.
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.some((e) => e.isIntersecting);
        if (visivel && !globo && !iniciando && vivo) {
          iniciando = true;
          void iniciar();
        } else if (globo && !reduzido) {
          if (visivel) {
            globo.resumeAnimation();
            cancelAnimationFrame(quadro);
            quadro = requestAnimationFrame(passo);
          } else {
            globo.pauseAnimation();
            cancelAnimationFrame(quadro);
          }
        }
      },
      { rootMargin: "1200px 0px" },
    );
    observador.observe(trilho);
    const ocioso = window.requestIdleCallback ?? ((fn: () => void) => window.setTimeout(fn, 1200));
    const preCarga = () => ocioso(() => void carregarModulos().catch(() => {}));
    if (document.readyState === "complete") preCarga();
    else window.addEventListener("load", preCarga, { once: true });
    window.addEventListener("resize", ajustarTamanho);

    return () => {
      vivo = false;
      cancelAnimationFrame(quadro);
      observador.disconnect();
      window.removeEventListener("resize", ajustarTamanho);
      window.removeEventListener("load", preCarga);
      if (globo) {
        globo.pauseAnimation();
        globo.renderer().dispose();
        globo._destructor();
      }
      alvo.replaceChildren();
    };
  }, [destinos, origem]);

  const doisDig = (v: number) => String(v).padStart(2, "0");

  return (
    <section
      ref={trilhoRef}
      id="destinos"
      className="rota-trilho relative bg-navy-950"
      aria-labelledby="destinos-titulo"
    >
      <div className="rota-palco overflow-hidden px-6 md:px-12">
        {fundo}
        <div className="rota-grade relative mx-auto max-w-6xl">
          <div className="rota-cabeca text-center md:text-left">
            {cabecalho}
            <p
              className="mt-8 hidden text-sm font-medium tracking-[0.2em] text-dourado-300 uppercase md:block"
              aria-hidden="true"
            >
              {semMovimento
                ? `${destinos.length} destinos`
                : `${doisDig(ativo + 1)} / ${doisDig(destinos.length)}`}
            </p>
          </div>

          <div className={`rota-globo-caixa relative ${falhou ? "hidden" : ""}`} aria-hidden="true">
            <div ref={globoRef} data-prerender-limpar className="rota-globo absolute inset-0" />
          </div>

          <ol className="rota-lista">
            {destinos.map((d, i) => (
              <li
                key={d.nome}
                className="rota-item"
                data-ativo={semMovimento || i === ativo ? "1" : "0"}
                aria-current={!semMovimento && i === ativo ? "step" : undefined}
              >
                <span className="rota-item-num" aria-hidden="true">
                  {doisDig(i + 1)}
                </span>
                <span className="rota-item-nome">{d.nome}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
