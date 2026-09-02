import React from "react";
import ReactDOM from "react-dom/client";
import { LangProvider } from "./i18n.jsx";
import { ThemeProvider } from "./theme.jsx";
import App from "./App.jsx";
import { ManualHub, GuiasHub, ArticlePage, GUIAS_COLLECTION } from "./manual.jsx";
import { getArticle, MANUAL_BASE } from "./content/al-com-ai/index.js";
import { getGuia, GUIAS_BASE } from "./content/guias/index.js";
import "./styles/styles.css";
import "./styles/see-working.css";

function Page({ path }) {
  const p = (path || "/").replace(/\/+$/, "") || "/";
  if (p === MANUAL_BASE) return <ManualHub />;
  if (p.startsWith(MANUAL_BASE + "/")) {
    const article = getArticle(p.slice(MANUAL_BASE.length + 1));
    if (article) return <ArticlePage article={article} />;
  }
  if (p === GUIAS_BASE) return <GuiasHub />;
  if (p.startsWith(GUIAS_BASE + "/")) {
    const guia = getGuia(p.slice(GUIAS_BASE.length + 1));
    if (guia) return <ArticlePage article={guia} collection={GUIAS_COLLECTION} />;
  }
  return <App />;
}

export function Root({ path }) {
  const resolved = path != null ? path : (typeof window !== "undefined" ? window.location.pathname : "/");
  return (
    <LangProvider>
      <ThemeProvider>
        <Page path={resolved} />
      </ThemeProvider>
    </LangProvider>
  );
}

if (typeof document !== "undefined") {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <Root path={window.location.pathname} />
  );
}
