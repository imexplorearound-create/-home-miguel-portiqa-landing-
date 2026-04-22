import React from "react";
import { useT } from "./i18n.jsx";
import { safeStorage } from "./storage.js";

const DEFAULT_THEME = "light";
const THEMES = ["dark", "light", "gold"];
const ThemeContext = React.createContext({ theme: DEFAULT_THEME, setTheme: () => {} });

function detectTheme() {
  return safeStorage.get("portiqa_theme", THEMES) || DEFAULT_THEME;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(detectTheme);

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    safeStorage.set("portiqa_theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return React.useContext(ThemeContext);
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useT();
  const isLight = theme === "light";
  const next = isLight ? "gold" : "light";
  const label = t(isLight ? "theme.toDark" : "theme.toLight");

  return (
    <button
      className="theme-switch"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      type="button"
    >
      {isLight ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
        </svg>
      )}
      <span className="theme-switch-label">{t(isLight ? "theme.light" : "theme.dark")}</span>
    </button>
  );
}

export { ThemeProvider, useTheme, ThemeToggle };
