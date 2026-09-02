import { createServer } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(root, "dist");
const indexPath = resolve(distDir, "index.html");
const SITE = "https://portiqa.io";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// JSON-LD seguro para embutir em <script> (evita fechar o script cedo).
const jsonld = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
}
function setMeta(html, attr, key, content) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[\\s\\S]*?("\\s*/?>)`);
  return html.replace(re, `$1${esc(content)}$2`);
}
function setCanonical(html, href) {
  return html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${esc(href)}$2`);
}
function injectHead(html, extra) {
  return html.replace("</head>", `${extra}\n</head>`);
}

// Transforma o <head> da home no <head> de uma página do manual.
function buildHead(template, meta) {
  let html = template;
  html = setTitle(html, meta.title);
  html = setMeta(html, "name", "description", meta.description);
  html = setCanonical(html, meta.canonical);
  html = setMeta(html, "property", "og:title", meta.title);
  html = setMeta(html, "property", "og:description", meta.description);
  html = setMeta(html, "property", "og:url", meta.canonical);
  html = setMeta(html, "property", "og:type", meta.ogType || "article");
  html = setMeta(html, "name", "twitter:title", meta.title);
  html = setMeta(html, "name", "twitter:description", meta.description);
  const hreflang =
    `<link rel="alternate" hreflang="pt-PT" href="${esc(meta.canonical)}" />\n` +
    `<link rel="alternate" hreflang="x-default" href="${esc(meta.canonical)}" />`;
  const schema = (meta.schema || []).map(jsonld).join("\n");
  return injectHead(html, `${hreflang}\n${schema}`);
}

// ---- JSON-LD builders -----------------------------------------------------

const publisher = {
  "@type": "Organization",
  "@id": `${SITE}/#org`,
  name: "Portiqa",
  url: `${SITE}/`,
  logo: { "@type": "ImageObject", url: `${SITE}/og-image.png` },
};

function authorNode(AUTHOR) {
  return {
    "@type": "Person",
    name: AUTHOR.name,
    url: AUTHOR.url,
    jobTitle: "Fundador da Portiqa",
    worksFor: { "@type": "Organization", name: "Portiqa" },
    description: AUTHOR.bio,
  };
}

function articleSchema(a, AUTHOR, hub) {
  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: hub.name, item: `${SITE}${hub.base}` },
      { "@type": "ListItem", position: 3, name: a.title, item: a.canonical },
    ],
  };
  const blog = {
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    inLanguage: "pt-PT",
    datePublished: a.published,
    dateModified: a.updated,
    author: authorNode(AUTHOR),
    publisher,
    mainEntityOfPage: { "@type": "WebPage", "@id": a.canonical },
    keywords: a.keywords.join(", "),
    articleSection: hub.name,
    isPartOf: { "@type": "Blog", "@id": `${SITE}${hub.base}#blog`, name: hub.name },
  };
  const faq = {
    "@type": "FAQPage",
    mainEntity: a.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return [
    { "@context": "https://schema.org", "@graph": [blog, breadcrumb, faq] },
  ];
}

function hubSchema(MANUAL, ARTICLES, hub) {
  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: hub.name, item: `${SITE}${hub.base}` },
    ],
  };
  const blog = {
    "@type": "Blog",
    "@id": `${SITE}${hub.base}#blog`,
    name: MANUAL.title,
    description: MANUAL.description,
    url: `${SITE}${hub.base}`,
    inLanguage: "pt-PT",
    publisher,
    blogPost: ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: a.canonical,
      datePublished: a.published,
      dateModified: a.updated,
    })),
  };
  return [{ "@context": "https://schema.org", "@graph": [blog, breadcrumb] }];
}

// ---- render ---------------------------------------------------------------

function writeRoute(routePath, html) {
  const clean = routePath.replace(/^\/+/, "");
  const outDir = clean ? resolve(distDir, clean) : distDir;
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), html);
}

const server = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "warn",
});

try {
  const { Root } = await server.ssrLoadModule("/src/main.jsx");
  const { ARTICLES, MANUAL, AUTHOR, MANUAL_ROUTES } = await server.ssrLoadModule(
    "/src/content/al-com-ai/index.js"
  );
  const { GUIA_ARTICLES, GUIAS, GUIAS_ROUTES } = await server.ssrLoadModule(
    "/src/content/guias/index.js"
  );

  const template = readFileSync(indexPath, "utf-8");
  const renderBody = (path) => renderToString(React.createElement(Root, { path }));
  const withBody = (tpl, body) => tpl.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  // Home — mantém o <head> rico existente.
  writeFileSync(indexPath, withBody(template, renderBody("/")));
  let count = 1;

  // Cada coleção (hub + artigos) — <head> e JSON-LD próprios por rota.
  const collections = [
    { META: MANUAL, ARTS: ARTICLES, ROUTES: MANUAL_ROUTES, hub: { name: "AL com AI", base: MANUAL.path } },
    { META: GUIAS, ARTS: GUIA_ARTICLES, ROUTES: GUIAS_ROUTES, hub: { name: "Guias de alojamento local", base: GUIAS.path } },
  ];
  const rendered = [];
  for (const { META, ARTS, ROUTES, hub } of collections) {
    for (const route of ROUTES) {
      const body = renderBody(route.path);
      let head;
      if (route.kind === "hub") {
        head = buildHead(template, {
          title: META.seoTitle,
          description: META.description,
          canonical: `${SITE}${META.path}`,
          ogType: "website",
          schema: hubSchema(META, ARTS, hub),
        });
      } else {
        const a = ARTS.find((x) => x.slug === route.slug);
        head = buildHead(template, {
          title: a.seoTitle,
          description: a.description,
          canonical: a.canonical,
          ogType: "article",
          schema: articleSchema(a, AUTHOR, hub),
        });
      }
      writeRoute(route.path, withBody(head, body));
      rendered.push(route.path);
      count++;
    }
  }

  console.log(`✓ Prerendered ${count} rotas (home + ${rendered.join(", ")})`);
} finally {
  await server.close();
}
