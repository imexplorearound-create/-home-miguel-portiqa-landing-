// Coleções de conteúdo (AL com AI + Guias) — hub + páginas de artigo.
// Reutiliza a chrome do site (Nav, Footer, CookieBanner) e os tokens de estilo.
import React from "react";
import { AnnouncementBar, Nav, Footer, CookieBanner } from "./components.jsx";
import { MetaPixel } from "./MetaPixel.jsx";
import { ARTICLES, MANUAL, MANUAL_BASE, AUTHOR } from "./content/al-com-ai/index.js";
import { GUIA_ARTICLES, GUIAS, GUIAS_BASE } from "./content/guias/index.js";

// Uma coleção = um hub + os seus artigos. A chrome, o autor e o CTA são partilhados.
export const AL_COLLECTION = {
  base: MANUAL_BASE,
  label: "AL com AI",
  eyebrow: "AL com AI",
  h1: "Inteligência artificial na gestão de alojamento local",
  intro: MANUAL.intro,
  articles: ARTICLES,
  allText: "Ver todos os artigos de AL com AI →",
  soon: {
    title: "Mais artigos a caminho",
    desc:
      "Compliance, marketing direto, análise de portfolio, reviews, operação e os erros mais comuns ao usar IA na gestão de AL. Novos artigos vão sendo publicados.",
  },
};

export const GUIAS_COLLECTION = {
  base: GUIAS_BASE,
  label: "Guias",
  eyebrow: "Guias de alojamento local",
  h1: "Guias práticos de alojamento local em Portugal",
  intro: GUIAS.intro,
  articles: GUIA_ARTICLES,
  allText: "Ver todos os guias de alojamento local →",
  soon: {
    title: "Mais guias a caminho",
    desc:
      "Comunicação de hóspedes ao SIBA/AIMA, seguro obrigatório, impostos e IVA no AL, taxa turística e comparativos de software. Novos guias vão sendo publicados.",
  },
};

function PageChrome({ children }) {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      {children}
      <Footer />
      <CookieBanner />
      <MetaPixel />
    </>
  );
}

function Breadcrumb({ trail }) {
  return (
    <nav className="mn-breadcrumb" aria-label="Trilho de navegação">
      {trail.map((item, i) => (
        <span key={item.href || item.label}>
          {i > 0 && <span className="mn-bc-sep" aria-hidden="true">/</span>}
          {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

function ptDate(iso) {
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${meses[m - 1]} de ${y}`;
}

function CtaFounding() {
  return (
    <aside className="mn-cta">
      <h3>Fazes a gestão de 10 a 50 propriedades?</h3>
      <p>
        Estamos a selecionar os <strong>Founding 20</strong>: operadores que querem usar a Portiqa em
        operação real, validar as novas capacidades e influenciar diretamente o roadmap.
      </p>
      <a className="btn btn-primary" href="/#signup">Entrar nos Founding 20 →</a>
    </aside>
  );
}

function Hub({ c }) {
  return (
    <PageChrome>
      <main className="mn-wrap" id="top">
        <header className="mn-hub-head">
          <Breadcrumb trail={[{ label: "Início", href: "/" }, { label: c.label }]} />
          <p className="mn-eyebrow">{c.eyebrow}</p>
          <h1>{c.h1}</h1>
          <p className="mn-hub-intro">{c.intro}</p>
        </header>

        <ol className="mn-grid">
          {c.articles.map((a) => (
            <li key={a.slug} className="mn-card">
              <a href={a.path} className="mn-card-link">
                <h2 className="mn-card-title">{a.title}</h2>
                <p className="mn-card-desc">{a.description}</p>
                <span className="mn-card-meta">{a.readingMinutes} min de leitura · Ler →</span>
              </a>
            </li>
          ))}
          <li className="mn-card mn-card-soon" aria-hidden="true">
            <span className="mn-card-num">Em breve</span>
            <h2 className="mn-card-title">{c.soon.title}</h2>
            <p className="mn-card-desc">{c.soon.desc}</p>
          </li>
        </ol>

        <CtaFounding />
      </main>
    </PageChrome>
  );
}

export function ManualHub() {
  return <Hub c={AL_COLLECTION} />;
}

export function GuiasHub() {
  return <Hub c={GUIAS_COLLECTION} />;
}

export function ArticlePage({ article, collection }) {
  const c = collection || AL_COLLECTION;
  const siblings = c.articles.filter((a) => a.slug !== article.slug);
  return (
    <PageChrome>
      <main className="mn-wrap mn-article" id="top">
        <article>
          <header className="mn-art-head">
            <Breadcrumb
              trail={[
                { label: "Início", href: "/" },
                { label: c.label, href: c.base },
                { label: article.title },
              ]}
            />
            <p className="mn-eyebrow">{c.eyebrow}</p>
            <h1>{article.title}</h1>
            <div className="mn-byline">
              <span className="mn-byline-name">{AUTHOR.name}</span>
              <span className="mn-byline-role">{AUTHOR.role}</span>
              <span className="mn-byline-meta">
                Atualizado em <time dateTime={article.updated}>{ptDate(article.updated)}</time> · {article.readingMinutes} min de leitura
              </span>
            </div>
          </header>

          <div className="mn-answer">
            <p className="mn-answer-label">Resposta rápida</p>
            <p className="mn-answer-body">{article.tldr}</p>
          </div>

          <div className="mn-takeaways">
            <p className="mn-takeaways-label">Principais conclusões</p>
            <ul>
              {article.takeaways.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          <div className="mn-prose" dangerouslySetInnerHTML={{ __html: article.html }} />

          <section className="mn-faq" aria-labelledby="faq-title">
            <h2 id="perguntas-frequentes">Perguntas frequentes</h2>
            <div className="mn-faq-list">
              {article.faq.map((f, i) => (
                <details key={i} className="mn-faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="mn-author-box">
            <p className="mn-author-name">{AUTHOR.name}</p>
            <p className="mn-author-bio">{AUTHOR.bio}</p>
          </div>

          <CtaFounding />

          <nav className="mn-more" aria-label="Continuar a ler">
            <p className="mn-more-label">Continuar a ler</p>
            <ul>
              {siblings.map((a) => (
                <li key={a.slug}><a href={a.path}>{a.title} →</a></li>
              ))}
              <li><a href={c.base}>{c.allText}</a></li>
            </ul>
          </nav>
        </article>
      </main>
    </PageChrome>
  );
}
