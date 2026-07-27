(function () {
  const NAV = [
    {
      label: "Help",
      items: [
        { id: "home", href: "./index.html", title: "Overview" },
        { id: "getting-started", href: "./getting-started.html", title: "Getting started" },
        { id: "using", href: "./using-rotweak.html", title: "Using RoTweak" },
        { id: "oauth", href: "./oauth.html", title: "Connect Roblox" },
        { id: "features", href: "./features.html", title: "All features" },
      ],
    },
    {
      label: "Legal",
      items: [
        { id: "privacy", href: "./privacy.html", title: "Privacy Policy" },
        { id: "terms", href: "./terms.html", title: "Terms of Use" },
      ],
    },
  ];

  const page = document.body.dataset.page || "home";
  const content = document.querySelector(".docs-article");
  if (!content) return;

  const shell = document.createElement("div");
  shell.className = "docs-shell";

  const navHtml = NAV.map(
    (group) => `
      <div class="docs-nav-group">
        <p class="docs-nav-label">${group.label}</p>
        <nav class="docs-nav" aria-label="${group.label}">
          ${group.items
            .map(
              (item) =>
                `<a href="${item.href}" class="${
                  item.id === page ? "is-active" : ""
                }">${item.title}</a>`
            )
            .join("")}
        </nav>
      </div>`
  ).join("");

  shell.innerHTML = `
    <aside class="docs-sidebar" aria-label="Documentation">
      <a class="docs-brand" href="./index.html">
        <span class="docs-mark" aria-hidden="true">RT</span>
        <span class="docs-brand-text">
          <strong>RoTweak</strong>
          <span>Help &amp; guide</span>
        </span>
      </a>
      ${navHtml}
    </aside>
    <div class="docs-main">
      <div class="docs-topbar">
        <a class="docs-brand" href="./index.html">
          <span class="docs-mark" aria-hidden="true">RT</span>
          <span class="docs-brand-text"><strong>RoTweak</strong></span>
        </a>
        <button type="button" class="docs-menu-btn" aria-expanded="false" aria-controls="docs-sidebar">
          Menu
        </button>
      </div>
      <div class="docs-backdrop" hidden></div>
    </div>
  `;

  const mainCol = shell.querySelector(".docs-main");
  const wrap = document.createElement("div");
  wrap.className = content.classList.contains("docs-content-wide")
    ? "docs-content docs-content-wide"
    : "docs-content";
  wrap.appendChild(content);
  mainCol.appendChild(wrap);

  document.body.insertBefore(shell, document.body.firstChild);

  const menuBtn = document.querySelector(".docs-menu-btn");
  const backdrop = document.querySelector(".docs-backdrop");

  function closeNav() {
    document.body.classList.remove("docs-nav-open");
    menuBtn?.setAttribute("aria-expanded", "false");
    backdrop?.setAttribute("hidden", "");
  }

  function openNav() {
    document.body.classList.add("docs-nav-open");
    menuBtn?.setAttribute("aria-expanded", "true");
    backdrop?.removeAttribute("hidden");
  }

  menuBtn?.addEventListener("click", () => {
    if (document.body.classList.contains("docs-nav-open")) closeNav();
    else openNav();
  });

  backdrop?.addEventListener("click", closeNav);
  shell.querySelectorAll(".docs-nav a").forEach((a) => {
    a.addEventListener("click", closeNav);
  });
})();
