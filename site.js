const DATA_URL = "./content.json?v=20260622-1";

function iconMarkup(name) {
  const icons = {
    location: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21C12 21 5 14.5 5 9.5A7 7 0 0 1 19 9.5C19 14.5 12 21 12 21Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="9.5" r="2.5" stroke="currentColor" stroke-width="1.8"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 4.5H4.8A1.8 1.8 0 0 0 3 6.3C3 15.5 8.5 21 17.7 21A1.8 1.8 0 0 0 19.5 19.2V16.5L15 15 12.9 17.1A15.4 15.4 0 0 1 6.9 11.1L9 9 7.5 4.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5V12.4L15.4 14.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4 15 6 21 4v16l-6 2-6-2-6 2V6l6-2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 4v16M15 6v16" stroke="currentColor" stroke-width="1.8"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.4A8.6 8.6 0 0 1 7.3 18.8L4 20l1.3-3.2A8.6 8.6 0 1 1 20 11.4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.3 8.9c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.6 1.5c.1.2 0 .4-.1.6l-.4.6c.5 1 1.3 1.7 2.3 2.2l.6-.4c.2-.1.4-.2.6-.1l1.5.6c.4.1.4.3.4.5v.5c0 .2 0 .4-.4.6-.4.2-.9.3-1.4.2-1-.1-2.1-.6-3.3-1.7-1.1-1.1-1.7-2.2-1.8-3.2-.1-.5 0-1 .2-1.5Z" fill="currentColor"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.7 4c.4 1.2 1.3 2.3 2.5 2.9.8.4 1.6.6 2.5.6v2.8c-1.6 0-3.1-.5-4.4-1.4v5.3a5.2 5.2 0 1 1-5.2-5.2c.4 0 .8 0 1.2.1v2.9a2.4 2.4 0 1 0 1.2 2.1V4h2.2Z" fill="currentColor"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.7" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.8" r="1.1" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.8 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.4 1.4-1.4h1.5V4.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.5V13H11v7h2.8Z" fill="currentColor"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="m7.5 10.8 4.5 4.7 4.5-4.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 19.5h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 5h6v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 5 10 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M19 13v4.3A1.7 1.7 0 0 1 17.3 19H6.7A1.7 1.7 0 0 1 5 17.3V6.7A1.7 1.7 0 0 1 6.7 5H11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };

  return icons[name] || "";
}

function query(selector) {
  return document.querySelector(selector);
}

function queryAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function setImage(img, src, alt) {
  if (!img) return;
  img.src = src || "./assets/logo-placeholder.svg";
  img.alt = alt || "";
}

function configureLink(node, url, options = {}) {
  if (!node) return;

  const isMissing = !url || url === "#";
  node.classList.toggle("is-disabled", isMissing);

  if (isMissing) {
    node.removeAttribute("href");
    node.removeAttribute("target");
    node.removeAttribute("download");
    node.setAttribute("aria-disabled", "true");
    return;
  }

  node.setAttribute("href", url);
  node.removeAttribute("aria-disabled");

  if (options.download) {
    node.setAttribute("download", options.downloadName || "");
  } else {
    node.removeAttribute("download");
  }

  if (options.external) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  } else {
    node.removeAttribute("target");
    node.removeAttribute("rel");
  }
}

function renderHome(data) {
  document.title = `${data.brand.name} | Authentic Chinese Cuisine`;
  setImage(query("[data-logo]"), data.brand.logoPath, `${data.brand.name} logo`);

  const posterTitle = query("[data-poster-title]");
  posterTitle.innerHTML = "";
  data.brand.posterTitleLines.forEach((line) => {
    const span = document.createElement("span");
    span.textContent = line;
    posterTitle.appendChild(span);
  });

  const posterSubtitle = query("[data-poster-subtitle]");
  posterSubtitle.innerHTML = "";
  data.brand.posterSubtitleLines.forEach((line) => {
    const span = document.createElement("span");
    span.textContent = line;
    posterSubtitle.appendChild(span);
  });

  const addressText = data.contact.addressLines.join("\n");
  query("[data-address-value]").textContent = addressText;
  query("[data-phone-value]").textContent = `${data.contact.phoneLabel}:\n${data.contact.phoneNumber}`;
  query("[data-hours-value]").textContent = data.contact.hours;

  configureLink(query("[data-address-link]"), data.links.maps, { external: true });
  configureLink(query("[data-phone-link]"), data.contact.phoneHref);
  configureLink(query("[data-navigate-link]"), data.links.maps, { external: true });
  configureLink(query("[data-whatsapp-link]"), data.links.whatsapp, { external: true });

  const dineInCard = query("[data-dine-in-link]");
  dineInCard.querySelector("h3").textContent = data.home.ctaLabels.dineInTitle;
  query("[data-dine-description]").textContent = data.home.ctaLabels.dineInDescription;

  const takeOutCard = query("[data-take-out-link]");
  takeOutCard.querySelector("h3").textContent = data.home.ctaLabels.takeOutTitle;
  query("[data-takeout-description]").textContent = data.home.ctaLabels.takeOutDescription;
  configureLink(takeOutCard, data.home.takeOutDownloadPath, {
    download: true,
    downloadName: "Universal-Restaurant-Take-Out-Menu.png"
  });

  query("[data-social-heading]").textContent = data.home.socialHeading;
  query("[data-whatsapp-banner-label]").textContent = data.home.whatsappBannerLabel;
  query("[data-navigation-title]").textContent = data.home.navigationBannerTitle;
  query("[data-navigation-subtitle]").textContent = data.home.navigationBannerSubtitle;

  const socialCards = [
    ["tiktok", data.social.tiktok],
    ["instagram", data.social.instagram],
    ["facebook", data.social.facebook]
  ];

  socialCards.forEach(([key, item]) => {
    const card = query(`[data-social="${key}"]`);
    card.querySelector("h3").textContent = item.label;
    card.querySelector("p").textContent = item.handle;
    configureLink(card, item.url, { external: true });
  });

  query("[data-year]").textContent = new Date().getFullYear();
}

function buildMenuButton(label, isActive, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `menu-button${isActive ? " is-active" : ""}`;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function buildSectionButton(label, isActive, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `section-button${isActive ? " is-active" : ""}`;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function buildItemCard(item) {
  const card = document.createElement("article");
  card.className = "item-card";

  const row = document.createElement("div");
  row.className = "item-row";

  const heading = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = item.name;
  heading.appendChild(title);

  const price = document.createElement("div");
  price.className = "item-price";
  price.textContent = item.price;

  row.append(heading, price);
  card.appendChild(row);

  if (item.description) {
    const description = document.createElement("p");
    description.textContent = item.description;
    card.appendChild(description);
  }

  if (item.tags?.length) {
    const tags = document.createElement("div");
    tags.className = "tag-list";
    item.tags.forEach((tag) => {
      const tagNode = document.createElement("span");
      tagNode.className = "tag";
      tagNode.textContent = tag;
      tags.appendChild(tagNode);
    });
    card.appendChild(tags);
  }

  return card;
}

function renderPackage(menu) {
  const pane = query("[data-menu-content]");
  pane.innerHTML = "";

  if (!menu?.sections?.length) {
    const error = document.createElement("p");
    error.className = "status-note";
    error.textContent = "This set menu is temporarily unavailable. Please refresh the page or view the PDF.";
    pane.appendChild(error);
    return;
  }

  const card = document.createElement("article");
  card.className = "package-card";

  const visual = document.createElement("div");
  visual.className = "package-card__visual";

  const image = document.createElement("img");
  setImage(image, menu.previewImagePath, menu.title);

  const priceBadge = document.createElement("div");
  priceBadge.className = "package-price-badge";
  priceBadge.innerHTML = `<span>Per person</span><strong>${menu.pricePerPerson}</strong>`;
  visual.append(image, priceBadge);

  const body = document.createElement("div");
  body.className = "package-card__body";

  const eyebrow = document.createElement("div");
  eyebrow.className = "package-card__eyebrow";
  eyebrow.textContent = menu.subtitle;

  const title = document.createElement("h2");
  title.textContent = menu.title;

  const summary = document.createElement("p");
  summary.className = "package-summary";
  summary.textContent = menu.summary;

  const facts = document.createElement("div");
  facts.className = "package-facts";
  facts.innerHTML = `
    <div><span>Minimum party</span><strong>${menu.minimumGuests} guests</strong></div>
    <div><span>Service charge</span><strong>Not included</strong></div>
  `;

  const sections = document.createElement("div");
  sections.className = "package-menu-sections";
  menu.sections.forEach((section) => {
    const sectionNode = document.createElement("section");
    sectionNode.className = "package-menu-section";

    const sectionTitle = document.createElement("h3");
    sectionTitle.textContent = section.title;

    const list = document.createElement("div");
    list.className = "package-dish-list";
    section.items.forEach((item, index) => {
      const dish = document.createElement("article");
      dish.className = "package-dish";

      const marker = document.createElement("span");
      marker.className = "package-dish__marker";
      marker.textContent = String(index + 1).padStart(2, "0");

      const copy = document.createElement("div");
      const name = document.createElement("h4");
      name.textContent = item.name;
      copy.appendChild(name);

      if (item.description) {
        const description = document.createElement("p");
        description.textContent = item.description;
        copy.appendChild(description);
      }

      dish.append(marker, copy);
      list.appendChild(dish);
    });

    sectionNode.append(sectionTitle, list);
    sections.appendChild(sectionNode);
  });

  const serviceNote = document.createElement("p");
  serviceNote.className = "package-service-note";
  serviceNote.textContent = menu.serviceChargeNote;

  const actions = document.createElement("div");
  actions.className = "package-actions";

  const view = document.createElement("a");
  view.className = "package-action package-action--primary";
  view.innerHTML = `${iconMarkup("external")} View PDF`;
  configureLink(view, menu.filePath, { external: true });

  const download = document.createElement("a");
  download.className = "package-action package-action--secondary";
  download.innerHTML = `${iconMarkup("download")} Download`;
  configureLink(download, menu.filePath, {
    download: true,
    downloadName: `${menu.title}.pdf`
  });

  actions.append(view, download);
  body.append(eyebrow, title, summary, facts, sections, serviceNote, actions);
  card.append(visual, body);
  pane.appendChild(card);
}

function renderSection(data, sectionTitle) {
  const pane = query("[data-menu-content]");
  const section = data.menus.aLaCarte.find((item) => item.title === sectionTitle);
  pane.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "menu-pane";

  const header = document.createElement("div");
  header.className = "menu-pane__header";
  header.innerHTML = `
    <h2>${section.title}</h2>
    <p>Classic dine-in favorites, directly structured from the official 2026 menu documents.</p>
  `;

  const list = document.createElement("div");
  list.className = "item-list";
  section.items.forEach((item) => list.appendChild(buildItemCard(item)));

  wrapper.append(header, list);
  pane.appendChild(wrapper);
}

function renderSidebar(data, state) {
  const mainNav = query("[data-main-categories]");
  const subNav = query("[data-sub-categories]");
  mainNav.innerHTML = "";
  subNav.innerHTML = "";

  data.dineIn.categories.forEach((label) => {
    mainNav.appendChild(
      buildMenuButton(label, state.activePrimary === label, () => {
        state.activePrimary = label;
        if (label === "A La Carte") {
          state.activeSection = data.menus.aLaCarte[0].title;
          renderSection(data, state.activeSection);
        } else if (label === "Rijst Tafel 55") {
          renderPackage(data.menus.rijstTafel55);
        } else {
          renderPackage(data.menus.rijstTafel65);
        }
        renderSidebar(data, state);
      })
    );
  });

  if (state.activePrimary === "A La Carte") {
    data.menus.aLaCarte.forEach((section) => {
      subNav.appendChild(
        buildSectionButton(section.title, state.activeSection === section.title, () => {
          state.activeSection = section.title;
          renderSection(data, section.title);
          renderSidebar(data, state);
        })
      );
    });
    query("[data-subnav-group]").hidden = false;
  } else {
    query("[data-subnav-group]").hidden = true;
  }
}

function renderDineIn(data) {
  document.title = `${data.brand.name} | Dine In Menu`;
  setImage(query("[data-dine-logo]"), data.brand.logoPath, `${data.brand.name} logo`);
  query("[data-notice-title]").textContent = data.dineIn.noticeTitle;
  query("[data-notice-body]").textContent = data.dineIn.noticeBody;
  query("[data-dine-brand]").textContent = data.brand.name;

  const state = {
    activePrimary: data.dineIn.categories[0],
    activeSection: data.menus.aLaCarte[0].title
  };

  renderSidebar(data, state);
  renderSection(data, state.activeSection);
}

async function boot() {
  const page = document.body.dataset.page;
  const root = query("[data-page-root]");

  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${DATA_URL}`);
    }

    const data = await response.json();
    root.hidden = false;

    if (page === "home") {
      renderHome(data);
    } else if (page === "dine-in") {
      renderDineIn(data);
    }
  } catch (error) {
    const errorState = query("[data-error]");
    errorState.hidden = false;
    errorState.textContent = "Unable to load the restaurant content. Please verify content.json and try again.";
    console.error(error);
  } finally {
    query("[data-loading]").hidden = true;
  }
}

function decorateIcons() {
  queryAll("[data-icon]").forEach((node) => {
    node.innerHTML = iconMarkup(node.dataset.icon);
  });
}

decorateIcons();
boot();
