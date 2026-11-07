# Adaptador React + Vite (Formato B)

Scaffold mínimo de React + TypeScript + Vite, com **build 100% estático**.
Use este adaptador quando um projeto real precisar de componentização,
estado em tela ou interatividade mais rica do que o Formato A (HTML/CSS/JS
puro, em `motor/`) oferece, mas ainda sem backend.

## Como rodar

```bash
cd adaptadores/react-vite
npm install
npm run build
```

O resultado fica em `adaptadores/react-vite/dist/`: um `index.html` e uma
pasta `assets/` com `.js` e `.css` já compilados e minificados. Não há
servidor Node em produção: é só copiar o conteúdo de `dist/` para a raiz
pública de qualquer hospedagem estática comum (cPanel, HostGator, etc). Para
ver localmente antes de publicar, `npm run preview` depois do build, ou
`npm run dev` durante o desenvolvimento (hot reload).

## Pré-renderização (página legível sem JS)

Um SPA React puro renderiza tudo em `<div id="root">` via JavaScript: sem JS,
a página fica em branco, o que viola a regra do motor de página legível sem
JS. Por isso `npm run build` roda `prerenderizar.mjs` depois do `vite build`:
ele abre o próprio `dist/` num navegador headless, espera o React montar, e
grava o HTML já renderizado de volta em `dist/index.html`. O `<script
type="module">` continua no arquivo final — o JS ainda carrega e assume a
página normalmente; sem JS, o conteúdo já chega pronto no HTML.

Isso cobre conteúdo estático na carga inicial. Se um projeto real usar este
adaptador para algo com estado que muda só no cliente (filtros, abas
controladas por `useState` sem link/âncora equivalente, etc.), teste
separadamente se esse estado também precisa funcionar sem JS, ou documente a
exceção no `DESIGN-SYSTEM.md` do projeto.

## Isolamento

Este adaptador é independente do motor HTML (`motor/`): tem seu próprio
`package.json`, `vite.config.ts` e `tsconfig*.json`, e não compartilha
configuração, dependências nem scripts com ele. `node_modules/` e `dist/`
desta pasta são ignorados pelo git (veja `.gitignore` local).

## Estrutura

- `src/App.tsx` — componente de exemplo mínimo (scaffold, não é uma landing
  page de cliente pronta).
- `src/main.tsx` — ponto de entrada React.
- `vite.config.ts` — configuração mínima do Vite (plugin React).

## Versões testadas

Testado em ambiente isolado e dentro do repositório com:

- Vite `8.3.5`
- React `19.3.1` / react-dom `19.3.1`
- TypeScript `7.0.2`
- `@vitejs/plugin-react` `6.1.2`
- `@types/node` `24.19.2` (necessário para o `tsconfig.node.json`, que tipa `vite.config.ts`)

Essas são as versões resolvidas no momento do teste (ranges `^` no
`package.json` podem puxar versões mais novas no futuro).
