#!/usr/bin/env node
/* Gera src/assets/pontos-terra.json: o centro de cada célula H3 (resolução 3)
 * que cai em terra firme, a partir do atlas world-atlas 110m. O globo da rota
 * de destinos desenha esses pontos como uma camada só de partículas: antes o
 * navegador calculava ~10.700 células H3 e montava uma malha por país na hora,
 * o que atrasava o globo aparecer (ver DESIGN-SYSTEM.md, revisão 2026-11-10).
 *
 * Uso (só quando quiser mudar resolução/países): node scripts/gerar-pontos-terra.mjs
 * Formato: { br: [lat, lng, lat, lng, ...], resto: [...] } com 2 casas decimais.
 * Fora: Antártida (010, não aparece no tour) e Coreia do Norte (408, polígono
 * do atlas que derruba o polygonToCells do H3). */
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { polygonToCells, cellToLatLng } = require("h3-js");
const { feature } = require("topojson-client");
const atlas = require("world-atlas/countries-110m.json");

const RESOLUCAO = 3;
const FORA = new Set(["010", "408"]);
const BRASIL = "076";

const saida = { br: [], resto: [] };
const vistas = new Set();
for (const pais of feature(atlas, atlas.objects.countries).features) {
  if (FORA.has(pais.id)) continue;
  const g = pais.geometry;
  const poligonos = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
  const destino = pais.id === BRASIL ? saida.br : saida.resto;
  for (const anel of poligonos) {
    for (const celula of polygonToCells(anel, RESOLUCAO, true)) {
      if (vistas.has(celula)) continue;
      vistas.add(celula);
      const [lat, lng] = cellToLatLng(celula);
      destino.push(+lat.toFixed(2), +lng.toFixed(2));
    }
  }
}

const arquivo = fileURLToPath(new URL("../src/assets/pontos-terra.json", import.meta.url));
writeFileSync(arquivo, JSON.stringify(saida));
console.log(`pontos: Brasil ${saida.br.length / 2}, resto ${saida.resto.length / 2} -> ${arquivo}`);
