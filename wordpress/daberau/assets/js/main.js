/* Daberau theme interactions. No dependencies. */
(function () {
  "use strict";

  var data = window.daberauData || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------------------------------------------------------------- Mega menu */
  function initMegaMenu() {
    var li = $("[data-mega]");
    if (!li) return;
    var trigger = $("[data-mega-trigger]", li);
    var panel = $("[data-mega-panel]", li);
    var timer = null;
    var items = function () { return $$("[data-menu-item]", panel); };

    function setOpen(open) {
      panel.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
      li.classList.toggle("is-open", open);
    }
    function preview(link) {
      $$(".mega-item", panel).forEach(function (a) { a.classList.toggle("is-active", a === link); });
      var name = $('[data-preview="name"]', panel);
      var short = $('[data-preview="short"]', panel);
      var url = $('[data-preview="url"]', panel);
      if (name) name.textContent = link.getAttribute("data-preview-name");
      if (short) short.textContent = link.getAttribute("data-preview-short");
      if (url) url.href = link.getAttribute("data-preview-url");
    }

    li.addEventListener("mouseenter", function () { clearTimeout(timer); setOpen(true); });
    li.addEventListener("mouseleave", function () { clearTimeout(timer); timer = setTimeout(function () { setOpen(false); }, 150); });
    trigger.addEventListener("click", function () { setOpen(panel.hidden); });
    trigger.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        var first = items()[0];
        if (first) first.focus();
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    });
    panel.addEventListener("keydown", function (e) {
      var list = items();
      var idx = list.indexOf(document.activeElement);
      var go = function (i) { e.preventDefault(); list[(i + list.length) % list.length].focus(); };
      if (e.key === "ArrowDown") go(idx + 1);
      else if (e.key === "ArrowUp") go(idx - 1);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(list.length - 1);
      else if (e.key === "Escape") { e.preventDefault(); setOpen(false); trigger.focus(); }
    });
    $$(".mega-item", panel).forEach(function (a) {
      a.addEventListener("mouseenter", function () { preview(a); });
      a.addEventListener("focus", function () { preview(a); });
    });
    // Close when focus or a click leaves the menu.
    li.addEventListener("focusout", function (e) { if (!li.contains(e.relatedTarget)) setOpen(false); });
    document.addEventListener("mousedown", function (e) { if (!li.contains(e.target)) setOpen(false); });
  }

  /* ---------------------------------------------------------------- Mobile menu */
  function initMobileMenu() {
    var menu = $("[data-mobile-menu]");
    var openBtn = $("[data-mobile-open]");
    if (!menu || !openBtn) return;
    var prevOverflow = "";

    function focusables() { return $$("a[href], button:not([disabled])", menu).filter(function (el) { return el.offsetParent !== null; }); }
    function onKey(e) {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;
      var f = focusables();
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    function open() {
      menu.hidden = false;
      openBtn.setAttribute("aria-expanded", "true");
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      $("[data-mobile-close]", menu).focus();
      document.addEventListener("keydown", onKey);
    }
    function close() {
      menu.hidden = true;
      openBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      openBtn.focus();
    }
    openBtn.addEventListener("click", open);
    $("[data-mobile-close]", menu).addEventListener("click", close);
    $$("a[href^='#'], [data-mobile-close-link]", menu).forEach(function (a) {
      a.addEventListener("click", function () { if (!menu.hidden) close(); });
    });
    window.addEventListener("resize", function () { if (!menu.hidden && window.innerWidth >= 1024) close(); });
  }

  /* ---------------------------------------------------------------- Disclosures (mobile services, legal TOC) */
  function initDisclosures() {
    $$("[data-disclosure]").forEach(function (btn) {
      var target = document.getElementById(btn.getAttribute("aria-controls"));
      if (!target) return;
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        target.hidden = !open;
      });
      $$("a[href^='#']", target).forEach(function (a) {
        a.addEventListener("click", function () { btn.setAttribute("aria-expanded", "false"); target.hidden = true; });
      });
    });
  }

  /* ---------------------------------------------------------------- Sticky mobile CTA (after 30% scroll) */
  function initStickyCta() {
    var bar = $("[data-sticky-cta]");
    if (!bar) return;
    var shown = null;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var show = max > 0 && window.scrollY / max >= 0.3;
      if (show === shown) return;
      shown = show;
      bar.classList.toggle("is-visible", show);
      bar.setAttribute("aria-hidden", String(!show));
      if (show) bar.removeAttribute("inert"); else bar.setAttribute("inert", "");
      document.documentElement.classList.toggle("sticky-cta-on", show);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------------------------------------------------------------- FAQ accordion (one open at a time) */
  function initAccordions() {
    $$("[data-accordion]").forEach(function (acc) {
      var items = $$(".faq-item", acc);
      function set(item, open) {
        item.classList.toggle("is-closed", !open);
        $(".faq-btn", item).setAttribute("aria-expanded", String(open));
      }
      items.forEach(function (item) {
        set(item, false);
        $(".faq-btn", item).addEventListener("click", function () {
          var open = item.classList.contains("is-closed");
          items.forEach(function (other) { set(other, false); });
          set(item, open);
        });
      });
    });
  }

  /* ---------------------------------------------------------------- Services filter */
  function initServicesFilter() {
    var root = $("[data-services-filter]");
    if (!root) return;
    var chips = $$("[data-filter]", root);
    var cards = $$("article[data-needs]", root);
    var status = $("[data-filter-status]", root);
    var notSure = $("[data-not-sure]", root);
    var active = null;
    function apply() {
      var shown = 0;
      cards.forEach(function (card) {
        var needs = (card.getAttribute("data-needs") || "").split(" ");
        var show = !active || active === "not-sure" || needs.indexOf(active) !== -1;
        card.hidden = !show;
        if (show) { shown++; card.classList.add("is-visible"); }
      });
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-filter") === active)); });
      if (notSure) notSure.hidden = active !== "not-sure";
      if (status) status.textContent = (data.shown || "%d services shown").replace("%d", shown);
    }
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var id = chip.getAttribute("data-filter");
        active = active === id ? null : id;
        apply();
      });
    });
  }

  /* ---------------------------------------------------------------- Scroll reveal */
  function initReveal() {
    var els = $$("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------- Legal table of contents scroll-spy */
  function initToc() {
    var links = $$("[data-toc-link]");
    if (!links.length || !("IntersectionObserver" in window)) return;
    function setActive(id) {
      links.forEach(function (a) {
        if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    }
    var sections = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); }).filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-100px 0px -65% 0px" });
    sections.forEach(function (s) { io.observe(s); });
    if (sections[0]) setActive(sections[0].id);
  }

  /* ---------------------------------------------------------------- Cookie consent */
  function initCookies() {
    var KEY = "daberau-cookie-consent";
    var banner = $("[data-cookie-banner]");
    var modal = $("[data-cookie-modal]");
    if (!banner || !modal) return;
    var dialog = $("[role='dialog']", modal);
    var prefs = { essential: true, analytics: false, marketing: false };
    var returnFocus = null;

    function read() { try { var raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; } catch { return null; } }
    function write(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* storage unavailable */ } }
    function sync() {
      $$("[data-cookie-switch]", modal).forEach(function (s) {
        var id = s.getAttribute("data-cookie-switch");
        if (!s.disabled) s.setAttribute("aria-checked", String(!!prefs[id]));
      });
    }
    function onKey(e) {
      if (e.key === "Escape") closeModal();
      if (e.key !== "Tab") return;
      var f = $$("button:not([disabled]), a[href], input", dialog);
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    function openModal() {
      var saved = read();
      if (saved) prefs = saved;
      sync();
      returnFocus = document.activeElement;
      banner.hidden = true;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      var firstSwitch = $("[data-cookie-switch]:not([disabled])", modal);
      if (firstSwitch) firstSwitch.focus();
      document.addEventListener("keydown", onKey);
    }
    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      if (!read()) banner.hidden = false;
      if (returnFocus && returnFocus.focus) returnFocus.focus();
    }
    function done(p) {
      prefs = p;
      write(p);
      banner.hidden = true;
      if (!modal.hidden) closeModal();
      document.dispatchEvent(new CustomEvent("daberau:consent", { detail: p }));
    }

    var saved = read();
    if (saved) prefs = saved; else banner.hidden = false;

    $("[data-cookie-accept]", banner).addEventListener("click", function () { done({ essential: true, analytics: true, marketing: true }); });
    $("[data-cookie-manage]", banner).addEventListener("click", openModal);
    $("[data-cookie-close]", modal).addEventListener("click", closeModal);
    $("[data-cookie-save]", modal).addEventListener("click", function () { done(prefs); });
    modal.addEventListener("mousedown", function (e) { if (e.target === modal) closeModal(); });
    $$("[data-cookie-switch]", modal).forEach(function (s) {
      s.addEventListener("click", function () {
        if (s.disabled) return;
        var id = s.getAttribute("data-cookie-switch");
        prefs[id] = !prefs[id];
        sync();
      });
    });
    document.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-cookie-open]")) { e.preventDefault(); openModal(); }
    });
  }

  /* ---------------------------------------------------------------- Contact form */
  function initLeadForm() {
    var form = $("[data-lead-form]");
    if (!form) return;
    var wrap = form.closest("[data-form-wrap]");
    var success = $("[data-form-success]", wrap);
    var failure = $("[data-form-failure]", form);
    var summary = $("[data-error-summary]", form);
    var submit = $("[data-submit]", form);
    var label = $("[data-submit-label]", form);
    var spinner = $("svg", submit);
    var live = $("[data-form-live]", form);
    var fileInput = $("#cf-attachment", form);
    var dropzone = $("[data-dropzone]", form);
    var errors = data.errors || {};
    var maxBytes = data.maxBytes || 10485760;
    var ORDER = ["name", "email", "phone", "service", "message", "attachment", "consent"];
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var attempted = false;
    var forceError = new URLSearchParams(window.location.search).get("formError") === "1";

    var nojs = $("[data-nojs]", form);
    if (nojs) nojs.parentNode.removeChild(nojs);

    function val(name) { var el = form.elements[name]; return el ? (el.type === "checkbox" ? el.checked : el.value) : ""; }
    function file() { return fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null; }

    function validate() {
      var e = {};
      if (!String(val("name")).trim()) e.name = errors.name;
      if (!EMAIL_RE.test(String(val("email")).trim())) e.email = errors.email;
      if (String(val("phone")).replace(/\D/g, "").length < 10) e.phone = errors.phone;
      if (!val("service")) e.service = errors.service;
      if (!String(val("message")).trim()) e.message = errors.message;
      if (file() && file().size > maxBytes) e.attachment = errors.attachment;
      if (!val("consent")) e.consent = errors.consent;
      return e;
    }

    function show(e) {
      ORDER.forEach(function (k) {
        var input = document.getElementById("cf-" + k);
        var msg = document.getElementById("cf-" + k + "-error");
        var has = !!e[k];
        if (input) {
          input.setAttribute("aria-invalid", String(has));
          input.classList.toggle("is-invalid", has);
          var hint = k === "attachment" ? "cf-attachment-hint" : "";
          var describedby = [hint, has ? "cf-" + k + "-error" : ""].filter(Boolean).join(" ");
          if (describedby) input.setAttribute("aria-describedby", describedby); else input.removeAttribute("aria-describedby");
        }
        if (k === "attachment" && dropzone) dropzone.classList.toggle("is-invalid", has);
        if (msg) {
          $("span", msg).textContent = has ? e[k] : "";
          msg.classList.toggle("is-shown", has);
        }
      });
      summary.hidden = !Object.keys(e).length;
    }

    function setLoading(on) {
      submit.disabled = on;
      form.setAttribute("aria-busy", String(on));
      spinner.classList.toggle("hidden", !on);
      label.textContent = on ? (data.loading || "Sending…") : label.getAttribute("data-idle");
      live.textContent = on ? (data.loading || "") : "";
    }

    function showSuccess(name) {
      var title = $("[data-success-title]", success);
      title.textContent = title.getAttribute("data-template").replace("[Name]", name);
      form.hidden = true;
      success.hidden = false;
      success.focus();
    }

    // Live re-validation after the first submit attempt.
    form.addEventListener("input", function () { if (attempted) show(validate()); });
    form.addEventListener("change", function (ev) {
      if (ev.target.tagName === "SELECT") ev.target.classList.toggle("is-empty", !ev.target.value);
      if (attempted) show(validate());
    });
    $$("select", form).forEach(function (s) { s.classList.toggle("is-empty", !s.value); });

    // Attachment picker.
    if (fileInput) {
      var info = $("[data-file-info]", form);
      var hint = $("[data-file-hint]", form);
      fileInput.addEventListener("change", function () {
        var f = file();
        info.classList.toggle("hidden", !f);
        info.classList.toggle("flex", !!f);
        hint.hidden = !!f;
        if (f) {
          $("[data-file-name]", info).textContent = f.name;
          $("[data-file-size]", info).textContent = "(" + (f.size / 1048576).toFixed(1) + " MB)";
        }
        if (attempted || (f && f.size > maxBytes)) show(attempted ? validate() : { attachment: errors.attachment });
      });
      $("[data-file-remove]", form).addEventListener("click", function () {
        fileInput.value = "";
        fileInput.dispatchEvent(new Event("change"));
        fileInput.focus();
      });
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      attempted = true;
      failure.hidden = true;
      var e = validate();
      show(e);
      var first = ORDER.filter(function (k) { return e[k]; })[0];
      if (first) {
        var el = document.getElementById("cf-" + first);
        if (el) el.focus();
        return;
      }
      setLoading(true);
      var fail = function () {
        setLoading(false);
        failure.hidden = false;
        failure.focus();
      };
      if (forceError) { setTimeout(fail, 1200); return; }
      fetch(data.endpoint || form.action, { method: "POST", body: new FormData(form), credentials: "same-origin" })
        .then(function (res) { return res.json().then(function (json) { return { status: res.status, json: json }; }); })
        .then(function (r) {
          if (r.json && r.json.ok) { showSuccess(String(val("name")).trim()); return; }
          if (r.status === 422 && r.json && r.json.errors) {
            setLoading(false);
            show(r.json.errors);
            var k = ORDER.filter(function (key) { return r.json.errors[key]; })[0];
            if (k && document.getElementById("cf-" + k)) document.getElementById("cf-" + k).focus();
            return;
          }
          fail();
        })
        .catch(fail);
    });
  }

  function init() {
    initMegaMenu();
    initMobileMenu();
    initDisclosures();
    initStickyCta();
    initAccordions();
    initServicesFilter();
    initReveal();
    initToc();
    initCookies();
    initLeadForm();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
