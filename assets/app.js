/* 开源仓库图谱 · 渲染与交互
   数据来自 data/repos.js（window.REPO_DATA），本文件只负责呈现。 */

(function () {
  "use strict";

  var D = window.REPO_DATA || { categories: [], repos: [] };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var LANG_COLORS = {
    Java: "#b07219", PHP: "#4F5D95", Vue: "#41b883", JavaScript: "#f1e05a",
    TypeScript: "#3178c6", Go: "#00ADD8", Python: "#3572A5", "C#": "#178600",
    "C++": "#f34b7d", Rust: "#dea584", HTML: "#e34c26", CSS: "#563d7c"
  };

  function langColor(lang) {
    return LANG_COLORS[lang] || "#8b949e";
  }

  function fmtStars(n) {
    if (!n) return "";
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k";
    return String(n);
  }

  var KIND_LABEL = { fork: "Fork", mirror: "镜像", link: "外链" };

  var mainEl = $(".main");
  var contentEl = $("#content");
  var emptyEl = $("#empty");
  var navEl = $("#catNav");
  var searchEl = $("#q");
  var state = { q: "" };

  /* ---------- 渲染 ---------- */

  function catMap() {
    var m = {};
    D.categories.forEach(function (c) { m[c.id] = c; });
    return m;
  }
  var CATS = catMap();

  function reposOf(catId) {
    return D.repos.filter(function (r) { return r.category === catId; });
  }

  function match(r, q) {
    if (!q) return true;
    var cat = CATS[r.category];
    var hay = [r.name, r.desc, r.lang, r.license, cat && cat.name, cat && cat.desc]
      .join(" ").toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function renderNav() {
    var html = D.categories.map(function (c) {
      var n = reposOf(c.id).filter(function (r) { return match(r, state.q); }).length;
      return (
        '<a class="cat-link" href="#' + esc(c.id) + '" data-cat="' + esc(c.id) + '">' +
        '<span class="cat-ico">' + esc(c.icon) + "</span>" +
        '<span class="cat-name">' + esc(c.name) + "</span>" +
        '<span class="cat-count">' + n + "</span>" +
        "</a>"
      );
    }).join("");
    navEl.innerHTML = html;
  }

  function cardHtml(r) {
    var href = r.mine || r.upstream;
    var kind = KIND_LABEL[r.kind] || "";
    var meta = [];
    if (r.lang) {
      meta.push(
        '<span class="meta-item"><i class="lang-dot" style="background:' + langColor(r.lang) + '"></i>' + esc(r.lang) + "</span>"
      );
    }
    if (r.stars) {
      meta.push('<span class="meta-item meta-star">★ ' + fmtStars(r.stars) + "</span>");
    }
    if (r.license) {
      meta.push('<span class="meta-item">' + esc(r.license) + "</span>");
    }
    return (
      '<a class="card" href="' + esc(href) + '" target="_blank" rel="noreferrer">' +
      '<span class="card-icon" aria-hidden="true">' + esc(r.icon) + "</span>" +
      '<span class="card-body">' +
      '<span class="card-top">' +
      '<span class="card-title">' + esc(r.name) + "</span>" +
      (kind ? '<span class="kind ' + esc(r.kind) + '">' + kind + "</span>" : "") +
      "</span>" +
      '<span class="card-desc">' + esc(r.desc) + "</span>" +
      (meta.length ? '<span class="card-meta">' + meta.join("") + "</span>" : "") +
      (r.note ? '<span class="card-note">' + esc(r.note) + "</span>" : "") +
      "</span>" +
      '<span class="card-go" aria-hidden="true">打开仓库<i>↗</i></span>' +
      "</a>"
    );
  }

  function renderContent() {
    var total = 0;
    var html = D.categories.map(function (c) {
      var list = reposOf(c.id).filter(function (r) { return match(r, state.q); });
      if (!list.length) return "";
      total += list.length;
      return (
        '<section class="section" id="' + esc(c.id) + '">' +
        '<div class="section-head">' +
        '<span class="sec-ico" aria-hidden="true">' + esc(c.icon) + "</span>" +
        "<h2>" + esc(c.name) + "</h2>" +
        '<span class="sec-count">' + list.length + "</span>" +
        '<span class="sec-desc">' + esc(c.desc) + "</span>" +
        "</div>" +
        '<div class="grid">' + list.map(cardHtml).join("") + "</div>" +
        "</section>"
      );
    }).join("");

    contentEl.innerHTML = html;
    emptyEl.hidden = total !== 0;
    $("#footCount").textContent = total;
    return total;
  }

  function renderStats() {
    $("#statRepos").textContent = D.repos.length;
    $("#statCats").textContent = D.categories.length;
    var t = $("#updated");
    if (t && D.updated) t.textContent = D.updated;
    $("#updated").setAttribute("datetime", D.updated || "");
  }

  /* ---------- 交互 ---------- */

  function applyQuery() {
    renderNav();
    renderContent();
    highlightActive();
  }

  var ticking = false;
  function highlightActive() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var sections = $$(".section", contentEl);
      if (!sections.length) return;
      var top = mainEl.scrollTop + 120;
      var current = sections[0];
      sections.forEach(function (s) {
        if (s.offsetTop <= top) current = s;
      });
      $$(".cat-link", navEl).forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("data-cat") === current.id);
      });
    });
  }

  function scrollToCat(id) {
    var target = document.getElementById(id);
    if (!target) return;
    var offset = target.offsetTop - 16;
    mainEl.scrollTo({ top: offset, behavior: "smooth" });
    if (window.matchMedia("(max-width: 860px)").matches) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("atlas-theme", theme); } catch (e) {}
  }

  function initTheme() {
    var qTheme = null;
    try { qTheme = new URLSearchParams(location.search).get("theme"); } catch (e) {}
    if (qTheme === "dark" || qTheme === "light") { setTheme(qTheme); return; }
    var saved = null;
    try { saved = localStorage.getItem("atlas-theme"); } catch (e) {}
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else {
      var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(dark ? "dark" : "light");
    }
  }

  function bind() {
    $("#themeBtn").addEventListener("click", function () {
      var now = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(now);
    });

    searchEl.addEventListener("input", function () {
      state.q = searchEl.value.trim().toLowerCase();
      applyQuery();
    });

    navEl.addEventListener("click", function (e) {
      var a = e.target.closest(".cat-link");
      if (!a) return;
      e.preventDefault();
      var id = a.getAttribute("data-cat");
      scrollToCat(id);
      history.replaceState(null, "", "#" + id);
    });

    $("#resetBtn").addEventListener("click", function () {
      searchEl.value = "";
      state.q = "";
      applyQuery();
      searchEl.focus();
    });

    mainEl.addEventListener("scroll", highlightActive, { passive: true });

    document.addEventListener("keydown", function (e) {
      var tag = (e.target.tagName || "").toLowerCase();
      var typing = tag === "input" || tag === "textarea" || e.target.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchEl.focus();
        searchEl.select();
      } else if (e.key === "Escape" && (typing || state.q)) {
        searchEl.value = "";
        state.q = "";
        applyQuery();
        searchEl.blur();
      }
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      var saved = null;
      try { saved = localStorage.getItem("atlas-theme"); } catch (err) {}
      if (!saved) setTheme(e.matches ? "dark" : "light");
    });
  }

  /* ---------- 启动 ---------- */

  initTheme();
  renderStats();
  renderNav();
  renderContent();
  highlightActive();
  bind();

  if (location.hash) {
    var id = location.hash.slice(1);
    if (document.getElementById(id)) {
      setTimeout(function () { scrollToCat(id); }, 60);
    }
  }
})();