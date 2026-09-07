# portiqa-landing — site portiqa.io (ex-portiqa.pt, migrado 2026-08-11)

Landing single-page + blog "AL com AI". **Vite + React 18** (sem framework, sem router).
Deps: `react`, `react-dom`, `marked`. Dev: `vite`, `@vitejs/plugin-react`.

## Comandos
- `npm run dev` — dev server (host 127.0.0.1:5173). Para expor: `npx vite --host 0.0.0.0`.
- `npm run build` — **`vite build` + `node scripts/prerender.mjs`** (prerender por rota → HTML estático).
- `npm run preview` — servir o `dist/`.
- **Deploy:** `vercel --prod` (produção, alias `portiqa.io`) · `vercel deploy` (preview). Projeto Vercel `vibranthost-vwfe`. Git: GitHub `imexplorearound-create/-home-miguel-portiqa-landing-`.

## Arquitetura (essencial)
- **Sem router.** `src/main.jsx` → `Root({ path })` → `Page` faz switch no path:
  - `/al-com-ai` → `ManualHub` · `/al-com-ai/<slug>` → `ArticlePage` · resto → `App` (home).
  - Cliente: `path = window.location.pathname`. SSR/prerender: cada rota renderizada com o seu `path`.
  - Navegação por `<a href>` normal (cada rota é HTML estático servido pela Vercel; `cleanUrls` no `vercel.json`).
- **Prerender** (`scripts/prerender.mjs`): itera `MANUAL_ROUTES`, escreve `dist/<rota>/index.html` com **`<head>` próprio por rota** (title, description, canonical, OG/Twitter, hreflang) + **JSON-LD** (BlogPosting + FAQPage + BreadcrumbList + Person/autor). A **home mantém** o `<head>` rico do `index.html`.
- **i18n** (`src/i18n.jsx`): PT (default) + EN, via `DICT` + `useT()`/`t(key)`. Toda a copy visível passa por `t()`.
- **Tema** (`src/theme.jsx`): dark (default, **sem** atributo), light/gold via `data-theme`. Tokens em `src/styles/styles.css` (`:root`).
- **Edit mode:** `App.jsx` tem `Tweaks` via `postMessage` (`__edit_mode_*`) para o editor externo. Não partir os marcadores `TWEAK_DEFAULTS`/`EDITMODE-BEGIN`.

## Blog "AL com AI" — como adicionar um artigo
Conteúdo em `src/content/al-com-ai/`:
1. Colocar o `.md` (do master em `~/Marketing Portiqa/blog-al-com-ai/`) na pasta.
2. **Correr o skill `no-ai-slop` no `.md` (modo edição) antes de o meter no manifest** e registar a data no frontmatter (`no_ai_slop: "YYYY-MM-DD"`). Vale para blog E guias, sem exceção.
3. Em `index.js`, juntar entrada em `RAW` (slug → `{ spoke, md, title, seoTitle, description, keywords[], published, updated, tldr, takeaways[], faq[{q,a}] }`). O corpo é o `.md` **verbatim**: `renderMarkdown()` remove frontmatter + 1º H1, reaponta CTAs `/founding-20`+`/kit-*` → `/#signup`, e injeta `id` nos headings.
4. Acrescentar a URL a **`public/sitemap.xml`** (e, se relevante, `public/llms.txt`).
5. `npm run build` e verificar `dist/al-com-ai/<slug>/index.html` (corpo em HTML + `<head>`/JSON-LD).
Regra: **marca "AL com AI", nunca "manual"/"capítulo"**. Conteúdo SEO/GEO **sem fabricação** — só evidência real (prova first-party Vibrant).

## Mapa de ficheiros
- `src/App.jsx` — home (secções). `src/components.jsx` — Nav, Footer, Hero, Signup, etc. `src/see-working.jsx` — demo "Ver a funcionar".
- `src/manual.jsx` — `ManualHub` + `ArticlePage` (reutilizam a chrome + tokens).
- `src/content/al-com-ai/index.js` — manifest + `renderMarkdown` + `MANUAL_ROUTES`. `*.md` — corpos.
- `src/MetaPixel.jsx` — pixel consent-gated. `src/consent.js`/`storage.js` — consentimento/localStorage.
- `public/` — `robots.txt` (já autoriza crawlers de IA), `sitemap.xml`, `llms.txt`, `privacidade.html`, `og-image-template.html`.
- `index.html` — GTM `GTM-T9HW7B9K` + GA4 (Consent Mode v2) + Meta Pixel `1800304264271258` + OG + JSON-LD Organization/SoftwareApplication.

## Não partir
- **Todo o artigo novo ou alterado (blog `al-com-ai/` e `guias/`) passa pelo skill `no-ai-slop` antes do build/deploy.** Sem passagem registada no frontmatter, não publicar.
- **Home intacta** ao mexer no blog (mudanças aditivas). Diff mínimo.
- Âncoras na chrome partilhada (Nav/Footer/AnnouncementBar) são **`/#seccao`** (funcionam a partir das páginas do blog).
- Assets em caminhos **absolutos** (`/assets/...`) — funcionam em rotas aninhadas.
- Métricas do site são **metas em validação** (ver disclaimer) — sem claims técnicos por verificar.

## Contexto de marketing/estratégia
Vive em **`~/Marketing Portiqa/`** (ver o `CLAUDE.md` de lá): plano, doc-mãe da marca, voz, spokes-mestre. Este repo é só o **lado técnico** do site.
