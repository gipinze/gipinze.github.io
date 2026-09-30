(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored) root.setAttribute("data-theme", stored);

  function syncChrome() {
    var isDark = root.getAttribute("data-theme") === "dark";
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = isDark ? "Light" : "Dark";
      btn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    }
    var meta = document.getElementById("theme-color");
    if (meta) {
      var paper = getComputedStyle(root).getPropertyValue("--paper").trim();
      if (paper) meta.setAttribute("content", paper);
    }
  }
  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncChrome();
    });
  }
  syncChrome();

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var links = Array.prototype.slice.call(document.querySelectorAll(".topnav a"));
  var targets = links
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && targets.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    targets.forEach(function (target) { observer.observe(target); });
  }
})();
