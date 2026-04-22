import React, { useState, useEffect } from "react";
import {
  Nav,
  HeroA,
  HeroB,
  HeroC,
  Logos,
  Definition,
  Problem,
  Constellation,
  Pillars,
  Compare,
  Faq,
  Founder,
  Integrations,
  Signup,
  Footer,
} from "./components.jsx";
import { SeeItWorking } from "./see-working.jsx";
import { useTheme } from "./theme.jsx";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "A",
  "headline": "Your properties never sleep. <em>Neither does Portiqa.</em>",
  "headlineB": "The property management system that gives you back <em>hours of your day</em>.",
  "headlineC": "Find your <em>port</em> in property management."
}/*EDITMODE-END*/;

function Tweaks({ state, setState, visible }) {
  const { theme, setTheme } = useTheme();
  if (!visible) return null;
  const themes = [
    { id: "dark",  color: "#0F1B2D", ink: "#B08A2C" },
    { id: "light", color: "#FAF7F2", ink: "#B08A2C" },
    { id: "gold",  color: "#11182A", ink: "#D4A843" },
  ];
  const persist = (patch) => {
    const next = { ...state, ...patch };
    setState(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
  };
  const headlineKey = state.hero === "A" ? "headline" : state.hero === "B" ? "headlineB" : "headlineC";
  return (
    <div className="tweaks">
      <h4>Tweaks</h4>
      <div className="tweak-group">
        <span className="tweak-label">Theme</span>
        <div className="tweak-swatches">
          {themes.map(t => (
            <button
              key={t.id}
              className={"tweak-swatch" + (theme === t.id ? " active" : "")}
              style={{background: t.color, boxShadow: `inset 0 0 0 1px ${t.ink}55`}}
              title={t.id}
              onClick={() => { setTheme(t.id); persist({ theme: t.id }); }}
            />
          ))}
        </div>
      </div>
      <div className="tweak-group">
        <span className="tweak-label">Hero layout</span>
        <div className="tweak-row">
          {["A","B","C"].map(h => (
            <button key={h}
              className={"tweak-chip" + (state.hero === h ? " active" : "")}
              onClick={() => persist({ hero: h })}>
              {h === "A" ? "Centered" : h === "B" ? "Split" : "Editorial"}
            </button>
          ))}
        </div>
      </div>
      <div className="tweak-group">
        <span className="tweak-label">Headline (use &lt;em&gt; for italic gold)</span>
        <textarea
          className="tweak-input"
          rows={3}
          value={state[headlineKey]}
          onChange={(e) => persist({ [headlineKey]: e.target.value })}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [state, setState] = useState(TWEAK_DEFAULTS);
  const [tweaksVisible, setTweaksVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const d = e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "__activate_edit_mode") setTweaksVisible(true);
      if (d.type === "__deactivate_edit_mode") setTweaksVisible(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  const headline = state.hero === "A" ? state.headline : state.hero === "B" ? state.headlineB : state.headlineC;
  const HeroComp = state.hero === "A" ? HeroA : state.hero === "B" ? HeroB : HeroC;

  return (
    <>
      <Nav />
      <HeroComp headline={headline} />
      <Definition />
      <Logos />
      <SeeItWorking />
      <Problem />
      <Constellation />
      <Pillars />
      <Compare />
      <Founder />
      <Integrations />
      <Signup />
      <Faq />
      <Footer />
      <Tweaks state={state} setState={setState} visible={tweaksVisible} />
    </>
  );
}
