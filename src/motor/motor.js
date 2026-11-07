/*!
 * Motor de landing pages: efeitos de rolagem.
 *
 * Três comportamentos, todos declarados por atributos no HTML:
 *
 *   1. Revelação        data-fx="surgir|subir|esquerda|direita|crescer"
 *                       opcionais: data-fx-atraso="ms", data-fx-duracao="ms"
 *                       ao entrar na tela o elemento ganha .fx-em-cena
 *   2. Cena presa       <section data-fx-fixa data-fx-altura="6" data-fx-etapas="6">
 *                         <div class="fx-palco"> ... .fx-etapa ... </div>
 *                       a seção ganha --progresso (0 a 1), data-etapa="1..N",
 *                       a etapa atual ganha .fx-etapa-ativa e a seção dispara
 *                       o evento "fx:etapa" com detail { etapa, total }
 *   3. Linha de leitura <ol data-fx-linha> com filhos .fx-passo
 *                       a lista ganha --linha (0 a 1) e cada passo alcançado
 *                       ganha .fx-passo-ativo
 *
 * Contrato com a página: no <head>, antes do CSS,
 *   <script>document.documentElement.classList.add("fx-js")</script>
 * Sem essa classe nada fica escondido: sem JS a página continua legível.
 * Com prefers-reduced-motion, tudo já aparece no estado final.
 *
 * O motor não conhece o conteúdo. O que é de uma página só fica no JS dela.
 */
(function () {
  "use strict";

  var html = document.documentElement;
  var semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var EFEITOS = ["surgir", "subir", "esquerda", "direita", "crescer"];
  var PONTO_DE_LEITURA = 0.55; // fração da altura da tela onde a "linha" lê

  html.classList.add("fx-js");
  if (semMovimento) html.classList.add("fx-reduzido");

  var entre = function (v, min, max) { return Math.min(max, Math.max(min, v)); };
  var lista = function (raiz, seletor) { return Array.prototype.slice.call(raiz.querySelectorAll(seletor)); };
  var avisar = function (texto, el) { if (window.console) console.warn("[motor] " + texto, el); };

  /* ------------------------------------------------------ 1. revelações */

  function revelacoes() {
    var alvos = lista(document, "[data-fx]").filter(function (el) {
      if (EFEITOS.indexOf(el.getAttribute("data-fx")) >= 0) return true;
      avisar('data-fx="' + el.getAttribute("data-fx") + '" desconhecido. Use: ' + EFEITOS.join(", ") + ".", el);
      return false;
    });

    alvos.forEach(function (el) {
      var atraso = el.getAttribute("data-fx-atraso");
      var duracao = el.getAttribute("data-fx-duracao");
      if (atraso) el.style.transitionDelay = atraso + "ms";
      if (duracao) el.style.transitionDuration = duracao + "ms";
    });

    if (semMovimento || !("IntersectionObserver" in window)) {
      alvos.forEach(function (el) { el.classList.add("fx-em-cena"); });
      return;
    }

    var vigia = new IntersectionObserver(function (itens) {
      itens.forEach(function (item) {
        if (!item.isIntersecting) return;
        item.target.classList.add("fx-em-cena");
        vigia.unobserve(item.target);
      });
    }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });

    alvos.forEach(function (el) { vigia.observe(el); });
  }

  /* ----------------------------------------------------- 2. cena presa */

  var cenas = [];

  function preparar(secao) {
    var etapas = lista(secao, ".fx-etapa");
    var total = parseInt(secao.getAttribute("data-fx-etapas"), 10) || 0;
    if (total && etapas.length !== total) {
      avisar("data-fx-etapas=" + total + " mas a cena tem " + etapas.length + " .fx-etapa.", secao);
    }
    var cena = { secao: secao, etapas: etapas, total: total, atual: 0 };

    if (semMovimento) {
      secao.style.height = "auto";
      secao.setAttribute("data-etapa", String(total));
      etapas.forEach(function (el) { el.classList.add("fx-etapa-ativa"); });
      return cena;
    }
    secao.style.height = (parseFloat(secao.getAttribute("data-fx-altura")) || 3) * 100 + "vh";
    return cena;
  }

  function mostrarEtapa(cena, numero) {
    if (cena.atual === numero) return;
    cena.atual = numero;
    cena.secao.setAttribute("data-etapa", String(numero));
    cena.etapas.forEach(function (el, i) {
      el.classList.toggle("fx-etapa-ativa", i === numero - 1);
    });
    cena.secao.dispatchEvent(new CustomEvent("fx:etapa", { detail: { etapa: numero, total: cena.total } }));
  }

  function medirCena(cena) {
    var curso = cena.secao.offsetHeight - window.innerHeight;
    if (curso <= 0) return;
    var progresso = entre(-cena.secao.getBoundingClientRect().top / curso, 0, 1);
    cena.secao.style.setProperty("--progresso", progresso.toFixed(4));
    if (cena.total) mostrarEtapa(cena, entre(Math.floor(progresso * cena.total) + 1, 1, cena.total));
  }

  /* -------------------------------------------------- 3. linha de leitura */

  var linhas = [];

  function prepararLinha(el) {
    var passos = lista(el, ".fx-passo");
    if (!passos.length) avisar("data-fx-linha sem filhos .fx-passo.", el);
    if (semMovimento) {
      el.style.setProperty("--linha", "1");
      passos.forEach(function (p) { p.classList.add("fx-passo-ativo"); });
    }
    return { el: el, passos: passos };
  }

  function medirLinha(linha) {
    var ponto = window.innerHeight * PONTO_DE_LEITURA;
    var caixa = linha.el.getBoundingClientRect();
    linha.el.style.setProperty("--linha", entre((ponto - caixa.top) / caixa.height, 0, 1).toFixed(4));
    linha.passos.forEach(function (p) {
      p.classList.toggle("fx-passo-ativo", p.getBoundingClientRect().top < ponto);
    });
  }

  /* ------------------------------------------------------------ ciclo */

  var pendente = false;

  function medirTudo() {
    pendente = false;
    cenas.forEach(medirCena);
    linhas.forEach(medirLinha);
  }

  function pedirMedicao() {
    if (pendente) return;
    pendente = true;
    window.requestAnimationFrame(medirTudo);
  }

  function iniciar() {
    revelacoes();
    cenas = lista(document, "[data-fx-fixa]").map(preparar);
    linhas = lista(document, "[data-fx-linha]").map(prepararLinha);

    if (!semMovimento) {
      cenas.forEach(function (c) { if (c.total) mostrarEtapa(c, 1); });
      window.addEventListener("scroll", pedirMedicao, { passive: true });
      window.addEventListener("resize", pedirMedicao);
      pedirMedicao();
    }
    html.classList.add("fx-pronto");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
