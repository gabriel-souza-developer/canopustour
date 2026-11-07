#!/usr/bin/env node
/* Pré-renderização estática: roda depois de `vite build`.
 *
 * Um SPA React puro só existe depois que o JS executa no navegador — sem
 * JS, dist/index.html fica vazio, o que viola a regra do motor de página
 * legível sem JS. Este script abre o próprio dist/ já compilado, espera o
 * React montar, e grava o HTML já renderizado de volta em dist/index.html.
 * O <script type="module"> original continua no HTML final: o JS ainda
 * carrega e assume a página (efeitos do motor, futura interatividade);
 * sem JS, o conteúdo já chega pronto.
 *
 * Reaproveita o detector de navegador do motor-landing-pages
 * (originalmente scripts/lib/navegador.mjs daquele monorepo), vendorizado
 * aqui em scripts/navegador.mjs porque este projeto saiu do monorepo para
 * virar repositório próprio.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { carregarPlaywright, abrirNavegador } from "./scripts/navegador.mjs";

const aqui = dirname(fileURLToPath(import.meta.url));
const dist = join(aqui, "dist");

const TIPOS = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".json": "application/json",
};

function servir(pasta, porta) {
  return new Promise((resolve) => {
    const servidor = createServer((req, res) => {
      let caminho = decodeURIComponent(req.url.split("?")[0]);
      if (caminho === "/") caminho = "/index.html";
      try {
        const arquivo = readFileSync(join(pasta, caminho));
        res.writeHead(200, { "Content-Type": TIPOS[extname(caminho)] || "application/octet-stream" });
        res.end(arquivo);
      } catch {
        res.writeHead(404);
        res.end();
      }
    });
    servidor.listen(porta, () => resolve(servidor));
  });
}

const porta = 4800 + Math.floor(Math.random() * 500);
const servidor = await servir(dist, porta);
const chromium = await carregarPlaywright();
const navegador = await abrirNavegador(chromium);
try {
  const pagina = await navegador.newPage();
  const erros = [];
  pagina.on("pageerror", (e) => erros.push(e.message));
  await pagina.goto(`http://127.0.0.1:${porta}`, { waitUntil: "networkidle", timeout: 30000 });
  await pagina.waitForFunction(
    () => {
      const raiz = document.getElementById("root");
      return !!raiz && raiz.children.length > 0;
    },
    { timeout: 15000 }
  );
  if (erros.length) {
    console.error("Erros de JS durante a pré-renderização, build interrompido:");
    erros.forEach((e) => console.error(" -", e));
    process.exitCode = 1;
  } else {
    // As classes fx-js/fx-pronto/fx-em-cena são adicionadas pelo motor em
    // tempo real (script inline + motor.js) conforme a rolagem. Se ficarem
    // gravadas no HTML estático, um visitante sem JS herda "fx-js" sem
    // nunca ganhar "fx-em-cena" de volta: o conteúdo existe no HTML mas
    // fica com opacity:0 para sempre. Por isso o snapshot volta ao estado
    // "antes do JS rodar": sem essas classes, o motor as adiciona de novo
    // do zero a cada carregamento real, com ou sem JS.
    const html = await pagina.evaluate(() => {
      document.documentElement.classList.remove("js", "fx-js", "fx-pronto", "fx-reduzido");
      document.querySelectorAll(".fx-em-cena").forEach((el) => el.classList.remove("fx-em-cena"));
      document.querySelectorAll("[data-fx], [data-etapa]").forEach((el) => {
        el.style.transitionDelay = "";
        el.style.transitionDuration = "";
        el.removeAttribute("data-etapa");
      });
      return "<!doctype html>\n" + document.documentElement.outerHTML;
    });
    writeFileSync(join(dist, "index.html"), html);
    console.log("Pré-renderizado: dist/index.html agora tem HTML real, legível sem JS.");
  }
} finally {
  await navegador.close();
  servidor.close();
}
