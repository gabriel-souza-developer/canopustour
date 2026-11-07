import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Build gera arquivos 100% estáticos em dist/
// (dist/index.html + dist/assets/*.js + dist/assets/*.css), publicáveis
// em qualquer hospedagem estática (cPanel/HostGator) sem Node em produção.
// Tailwind 4 roda só no build: o CSS final contém apenas as classes usadas.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
