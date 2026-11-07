/* Motor de landing pages — utilidades de navegador compartilhadas
 *
 * Encontra o Playwright onde estiver (pasta do projeto, pasta do script,
 * npm global ou caminhos pré-instalados) e abre um Chromium: CHROME_PATH, o
 * do próprio Playwright ou um Chrome do sistema (Windows, Mac, Linux).
 * Usado por verificar.mjs, auditar.mjs e capturar.mjs.
 */
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export async function carregarPlaywright() {
  const nomes = ["playwright", "playwright-core"];
  const aqui = dirname(fileURLToPath(import.meta.url));
  const bases = [process.cwd(), aqui, join(aqui, ".."), join(aqui, "..", "..")];
  try {
    bases.push(execSync("npm root -g", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim());
  } catch { /* sem npm global */ }
  ["/opt/npm-tools", "/opt/node-tools", "/usr/lib", "/usr/local/lib"].forEach((b) => bases.push(b));

  for (const base of bases) {
    const req = createRequire(join(base, "noop.js"));
    for (const nome of nomes) {
      try {
        const caminho = req.resolve(nome);
        const mod = await import(pathToFileURL(caminho).href);
        const chromium = mod.chromium || (mod.default && mod.default.chromium);
        if (chromium) return chromium;
      } catch { /* tenta o próximo */ }
    }
  }
  console.error("Playwright não encontrado. Rode na raiz do projeto: npm i -D playwright-core");
  process.exit(1);
}

const CHROMES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA && process.env.LOCALAPPDATA + "/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser"
].filter(Boolean);

export async function abrirNavegador(chromium) {
  if (process.env.CHROME_PATH) {
    return chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
  }
  try {
    return await chromium.launch({ headless: true });
  } catch { /* sem Chromium do Playwright: tenta um Chrome do sistema */ }
  const chrome = CHROMES.find((c) => existsSync(c));
  if (!chrome) {
    console.error("Nenhum navegador encontrado. Instale o Chrome ou defina CHROME_PATH.");
    process.exit(1);
  }
  return chromium.launch({ executablePath: chrome, headless: true });
}

/** Lê --nome valor da linha de comando. */
export function opcao(nome, padrao) {
  const args = process.argv.slice(2);
  const i = args.indexOf("--" + nome);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : padrao;
}

/** true se --nome aparece na linha de comando. */
export function bandeira(nome) {
  return process.argv.slice(2).includes("--" + nome);
}
