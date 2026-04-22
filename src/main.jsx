import React from "react";
import ReactDOM from "react-dom/client";
import { LangProvider } from "./i18n.jsx";
import { ThemeProvider } from "./theme.jsx";
import App from "./App.jsx";
import "./styles/styles.css";
import "./styles/see-working.css";

export function Root() {
  return (
    <LangProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LangProvider>
  );
}

if (typeof document !== "undefined") {
  ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
}
