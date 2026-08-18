(function () {
  var STORAGE_KEY = "site-lang";
  var DEFAULT_LANG = "pt";

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function applyLang(lang) {
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.style.display = el.getAttribute("data-lang") === lang ? "" : "none";
    });
    document.querySelectorAll("[data-i18n-placeholder-en]").forEach(function (el) {
      var attr = lang === "pt" ? "data-i18n-placeholder-pt" : "data-i18n-placeholder-en";
      var value = el.getAttribute(attr);
      if (value !== null) el.setAttribute("placeholder", value);
    });
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-set-lang") === lang);
    });
    document.documentElement.setAttribute("data-lang-active", lang);

    var titleAttr = document.documentElement.getAttribute("data-title-" + lang);
    if (titleAttr) document.title = titleAttr;
  }

  applyLang(getLang());

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-set-lang");
      localStorage.setItem(STORAGE_KEY, lang);
      applyLang(lang);
    });
  });
})();
