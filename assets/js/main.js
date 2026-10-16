/* Renders the portfolio from window.PORTFOLIO (assets/js/data.js).
   You normally do not need to edit this file. */
(function () {
  var D = window.PORTFOLIO;
  if (!D) return;
  var P = D.profile;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function tags(list) {
    return '<ul class="tags">' + list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  }

  // Theme toggle (remembers choice when the browser allows it)
  var root = document.documentElement;
  try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  $("themeBtn").addEventListener("click", function () {
    var cur = root.getAttribute("data-theme");
    if (!cur) cur = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Hero
  $("brand").textContent = P.initials;
  if (P.photo) {
    var img = document.createElement("img");
    img.src = P.photo; img.alt = P.name; img.className = "avatar";
    $("heroRole").parentNode.insertBefore(img, $("heroRole"));
  }
  $("heroRole").textContent = P.role + " · " + P.location;
  $("heroName").textContent = P.name;
  $("heroTagline").textContent = P.tagline;
  $("heroIntro").textContent = P.intro;
  $("heroAvail").textContent = P.availability;
  var ctas = '<a class="btn primary" href="' + esc(P.resumePdf) + '" target="_blank" rel="noopener">Download resume (PDF)</a>' +
    '<a class="btn" href="#contact">Contact me</a>';
  P.links.forEach(function (l) {
    ctas += '<a class="btn" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
  });
  $("heroCtas").innerHTML = ctas;

  // Test run console
  var T = D.testRun;
  var html = '<span class="line"><span class="dim">$ </span><span class="cmd">' + esc(T.command) + "</span></span>\n";
  T.tests.forEach(function (t, i) {
    html += '<span class="line" style="animation-delay:' + (0.15 + i * 0.12) + 's">test_rakesh.py::' + esc(t) + ' <span class="ok">PASSED</span></span>\n';
  });
  html += '<span class="line sum" style="animation-delay:' + (0.2 + T.tests.length * 0.12) + 's">===== ' + esc(T.summary) + " =====</span>";
  $("testRun").innerHTML = html;

  // Stats
  $("stats").innerHTML = D.stats.map(function (s) {
    return '<div class="stat"><b>' + esc(s.value) + "</b><span>" + esc(s.label) + "</span></div>";
  }).join("");

  // About
  $("aboutBody").innerHTML = D.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

  // Projects
  $("projects").innerHTML = D.projects.map(function (p) {
    return '<article class="card"><h3>' + esc(p.title) + '</h3><p class="ctx">' + esc(p.context) + "</p>" +
      "<dl><dt>Problem</dt><dd>" + esc(p.problem) + "</dd><dt>Approach</dt><dd>" + esc(p.solution) +
      "</dd><dt>Result</dt><dd>" + esc(p.outcome) + "</dd></dl>" + tags(p.tags) +
      (p.repo ? '<a class="repo" href="' + esc(p.repo) + '" target="_blank" rel="noopener">View code</a>' : "") +
      "</article>";
  }).join("");

  // Experience
  $("timeline").innerHTML = D.experience.map(function (j, i) {
    var pts = j.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    var list = i === 0 ? "<ul>" + pts + "</ul>" :
      "<details><summary>Show responsibilities</summary><ul>" + pts + "</ul></details>";
    return '<li class="job"><div class="job-date">' + esc(j.dates) + '</div><div class="job-main"><h3>' + esc(j.role) +
      '</h3><p class="org">' + esc(j.company) + " <span>· " + esc(j.project) + " · " + esc(j.location) + "</span></p>" +
      list + tags(j.stack) + "</div></li>";
  }).join("");

  // Skills
  $("skillGrid").innerHTML = D.skills.map(function (g) {
    return "<div><h3>" + esc(g.group) + "</h3>" + tags(g.items) + "</div>";
  }).join("");

  // Education and awards
  $("eduList").innerHTML = D.education.map(function (e) {
    return "<li><b>" + esc(e.degree) + "</b>" + esc(e.school) + "<br><small>" + esc(e.dates) + "</small></li>";
  }).join("");
  $("awardList").innerHTML = D.awards.map(function (a) { return "<li><b>" + esc(a) + "</b></li>"; }).join("") +
    "<li><b>Languages</b>" + esc(D.languages.join(", ")) + "</li>";

  // Contact
  var items = [
    { k: "Email", v: P.email, href: "mailto:" + P.email, copy: true },
    { k: "Phone", v: P.phone, href: "tel:" + P.phone.replace(/\s/g, ""), copy: true },
    { k: "Location", v: P.location }
  ].concat(P.links.map(function (l) { return { k: l.label, v: l.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), href: l.url, ext: true }; }));
  $("contactGrid").innerHTML = items.map(function (it, i) {
    var val = it.href
      ? '<a href="' + esc(it.href) + '"' + (it.ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(it.v) + "</a>"
      : "<span>" + esc(it.v) + "</span>";
    return '<div class="contact-item"><small>' + esc(it.k) + "</small>" + val +
      (it.copy ? '<button class="copy" type="button" data-copy="' + esc(it.v) + '">Copy</button>' : "") + "</div>";
  }).join("");
  document.querySelectorAll(".copy").forEach(function (b) {
    b.addEventListener("click", function () {
      var txt = b.getAttribute("data-copy");
      function done() { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy"; }, 1600); }
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () { b.textContent = txt; });
      else b.textContent = txt;
    });
  });

  $("footer").innerHTML = "<span>© " + new Date().getFullYear() + " " + esc(P.name) + "</span><span>Dubai, UAE · " + esc(P.email) + "</span>";
})();
