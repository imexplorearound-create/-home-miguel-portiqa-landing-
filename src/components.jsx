import React, { useState, useEffect } from "react";
import { useT, LangToggle } from "./i18n.jsx";
import { ThemeToggle } from "./theme.jsx";

/* ---------- Logo: "Golden Threshold" minimal arch ---------- */
export function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 22 V12 a8 8 0 0 1 16 0 V22" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="6.2" r="1.6" fill="var(--accent)" />
      <path d="M12 7.8 L9 10 M12 7.8 L15 10 M12 7.8 L12 11" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function Logo() {
  return (
    <a className="brand" href="#top">
      <LogoMark size={22} />
      <span>Portiqa</span>
    </a>
  );
}

export function AnnouncementBar() {
  const { t } = useT();
  return (
    <a className="announce-bar" href="#signup">
      <span className="announce-dot" aria-hidden="true" />
      <span className="announce-text">{t("announce.text")}</span>
      <span className="announce-arrow" aria-hidden="true">→</span>
    </a>
  );
}

export function Nav() {
  const { t } = useT();
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Logo />
        <div className="nav-links">
          <a href="#live">{t("nav.live")}</a>
          <a href="#problem">{t("nav.problem")}</a>
          <a href="#constellation">{t("nav.constellation")}</a>
          <a href="#pillars">{t("nav.pillars")}</a>
          <a href="#compare">{t("nav.compare")}</a>
          <a href="#founder">{t("nav.about")}</a>
        </div>
        <div className="nav-right">
          <ThemeToggle />
          <LangToggle />
          <a className="nav-cta" href="#signup">{t("nav.cta")}</a>
        </div>
      </div>
    </nav>
  );
}

/* ---------- Dashboard preview (STR, multi-channel) ---------- */
export function Dashboard() {
  const { t } = useT();
  const bookings = [
    { unit: "Baixa Studio · Lisboa", guest: "L. Keller", channel: "airbnb", nights: "4n", status: t("db.status.checkin") },
    { unit: "Algarve Villa · Lagos", guest: "M. Rossi", channel: "booking", nights: "7n", status: t("db.status.confirmed") },
    { unit: "Porto Loft · Ribeira", guest: "N. Okafor", channel: "direct", nights: "3n", status: t("db.status.aurora") },
    { unit: "Sintra Cottage", guest: "S. Ahmed", channel: "vrbo", nights: "5n", status: t("db.status.confirmed") },
    { unit: "Alfama Flat · Lisboa", guest: "C. Ferrer", channel: "expedia", nights: "2n", status: t("db.status.nova") },
  ];
  return (
    <div className="dashboard">
      <aside className="dash-side">
        <div className="side-label">{t("db.workspace")}</div>
        <div className="side-item active"><span className="side-dot" />{t("db.overview")}</div>
        <div className="side-item"><span className="side-dot" />{t("db.calendar")}</div>
        <div className="side-item"><span className="side-dot" />{t("db.bookings")}</div>
        <div className="side-item"><span className="side-dot" />{t("db.channels")}</div>
        <div className="side-label">{t("db.agents")}</div>
        <div className="side-item"><span className="side-dot" style={{background:"var(--ai)"}} />{t("db.aurora")}</div>
        <div className="side-item"><span className="side-dot" style={{background:"var(--ai)"}} />{t("db.atlas")}</div>
        <div className="side-item"><span className="side-dot" style={{background:"var(--ai)"}} />{t("db.nova")}</div>
        <div className="side-label">{t("db.compliance")}</div>
        <div className="side-item"><span className="side-dot" style={{background:"var(--success)"}} />{t("db.rnal")}</div>
      </aside>
      <div className="dash-main">
        <div className="stat-row">
          <div className="stat">
            <div className="stat-label">{t("db.revenue")}</div>
            <div className="stat-val">€ 14,720</div>
            <div className="stat-delta">{t("db.revenue.delta")}</div>
          </div>
          <div className="stat">
            <div className="stat-label">{t("db.occupancy")}</div>
            <div className="stat-val">91%</div>
            <div className="stat-delta">{t("db.occupancy.delta")}</div>
          </div>
          <div className="stat">
            <div className="stat-label">{t("db.response")}</div>
            <div className="stat-val">47<span style={{fontSize:14, color:"var(--muted)"}}>s</span></div>
            <div className="stat-delta">{t("db.response.delta")}</div>
          </div>
        </div>
        <div className="ai-card">
          <div className="ai-avatar">A</div>
          <div style={{flex:1}}>
            <div dangerouslySetInnerHTML={{__html: t("db.atlas.suggest")}} />
            <div className="ai-meta">{t("db.suggest.meta")}</div>
          </div>
        </div>
        <div className="table">
          <div className="table-head">
            <div>{t("db.col.unit")}</div>
            <div>{t("db.col.guest")}</div>
            <div>{t("db.col.channel")}</div>
            <div>{t("db.col.status")}</div>
          </div>
          {bookings.map((b, i) => (
            <div className="table-row" key={i}>
              <div>{b.unit}</div>
              <div style={{color:"var(--muted)"}}>{b.guest} · {b.nights}</div>
              <div><span className={`pill ${b.channel}`}>{b.channel === "direct" ? `● ${t("db.direct")}` : `● ${b.channel}`}</span></div>
              <div style={{color:"var(--ink-2)"}}>{b.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero variants ---------- */
export function HeroA({ headline }) {
  const { t, lang } = useT();
  return (
    <section className="hero-a" id="top">
      <div className="container">
        <div className="inner">
          <span className="eyebrow anim">{t("hero.eyebrow.a")}</span>
          <h1 className="display anim anim-d1" dangerouslySetInnerHTML={{__html: headline || t("hero.headline.a")}} />
          <p
            className="hero-alt-headline anim anim-d1"
            lang={lang === "pt" ? "en" : "pt"}
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1rem, 1.6vw, 1.35rem)",
              lineHeight: 1.35,
              textAlign: "center",
              color: "var(--muted)",
              margin: "8px 0 0",
              letterSpacing: "0.005em",
            }}
          >
            {t("hero.headline.a.alt")}
          </p>
          <p className="lede anim anim-d2" style={{textAlign:"center", marginTop:24}}>
            {t("hero.lede.a")}
          </p>
          <div className="cta-row anim anim-d3">
            <a href="#signup" className="btn btn-primary">{t("hero.cta.primary")}</a>
            <a href="#constellation" className="btn btn-ghost">{t("hero.cta.ghost.constellation")}</a>
          </div>
          <div className="micro-proof anim anim-d3">
            <span className="stars">★★★★★</span>
            <span>{t("hero.microproof.a")}</span>
          </div>
        </div>
        <div className="preview-shell anim anim-d3">
          <div className="preview-top">
            <span className="dot" /><span className="dot" /><span className="dot" />
            <span className="url">app.portiqa.eu / overview</span>
          </div>
          <Dashboard />
        </div>
      </div>
    </section>
  );
}

export function HeroB({ headline }) {
  const { t } = useT();
  return (
    <section className="hero-b" id="top">
      <div className="container">
        <div className="grid">
          <div>
            <span className="eyebrow anim">{t("hero.eyebrow.b")}</span>
            <h1 className="display anim anim-d1" dangerouslySetInnerHTML={{__html: headline || t("hero.headline.b")}} />
            <p className="lede anim anim-d2">
              {t("hero.lede.b")}
            </p>
            <div className="cta-row anim anim-d3" style={{display:"flex", gap:12, marginTop:28, flexWrap:"wrap"}}>
              <a href="#signup" className="btn btn-primary">{t("hero.cta.primary")}</a>
              <a href="#constellation" className="btn btn-ghost">{t("hero.cta.ghost.agents")}</a>
            </div>
            <div className="micro-proof anim anim-d3" style={{marginTop:22}}>
              <span className="stars">★★★★★</span>
              <span>{t("hero.microproof.b")}</span>
            </div>
          </div>
          <div className="preview-shell anim anim-d3" style={{marginTop:0}}>
            <div className="preview-top">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="url">app.portiqa.eu</span>
            </div>
            <Dashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroC({ headline }) {
  const { t } = useT();
  return (
    <section className="hero-c" id="top">
      <div className="container">
        <span className="eyebrow anim">{t("hero.eyebrow.c")}</span>
        <h1 className="display anim anim-d1" dangerouslySetInnerHTML={{__html: headline || t("hero.headline.c")}} />
        <div className="meta-row anim anim-d2">
          <div className="meta-item">
            {t("hero.lede.c")}
          </div>
          <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
            <a href="#signup" className="btn btn-primary">{t("hero.cta.primary")}</a>
            <a href="#constellation" className="btn btn-ghost">{t("hero.cta.ghost.c")}</a>
          </div>
        </div>
        <div className="preview-shell anim anim-d3">
          <div className="preview-top">
            <span className="dot" /><span className="dot" /><span className="dot" />
            <span className="url">app.portiqa.eu / overview</span>
          </div>
          <Dashboard />
        </div>
      </div>
    </section>
  );
}

/* ---------- OTA / channel logo strip ---------- */
export function Logos() {
  const { t } = useT();
  const channels = ["Airbnb", "Booking.com", "VRBO", "Expedia", "Google", "iCal"];
  return (
    <section className="logos">
      <div className="container">
        <div className="logos-label">{t("logos.label")}</div>
        <div className="logos-grid">
          {channels.map(c => <div className="logo-chip" key={c}>{c}</div>)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Problem timeline ---------- */
export function Problem() {
  const { t, lang } = useT();
  const itemsPT = [
    { time: "06:12", text: <><b>Mensagens de hóspedes.</b> Um pedido de check-in tardio de Madrid cai na sua inbox do Airbnb. O senhor está a dormir.</> },
    { time: "08:40", text: <>A equipa de limpeza não encontra a chave de Sintra. <b>Três WhatsApps</b> abertos ao mesmo tempo. Um deles no grupo errado.</> },
    { time: "11:20", text: <>Dois concorrentes na sua rua baixaram as tarifas. <b>Está  14% acima do mercado</b> para o próximo fim de semana — e só reparou porque um hóspede perguntou.</> },
    { time: "14:05", text: <>O contabilista manda um email sobre o IVA. <b>A taxa turística de Lagos não está conciliada.</b> Tem uma taxa diferente de Lisboa. Esqueceu-se.</> },
    { time: "17:30", text: <>Jantar em família. <b>Uma review de 3 estrelas acabou de ser publicada.</b> Precisa de responder antes que o hóspede a partilhe. Não responde.</> },
  ];
  const itemsEN = [
    { time: "06:12", text: <><b>Guest messages.</b> A late check-in request from Madrid hits your Airbnb inbox. You're asleep.</> },
    { time: "08:40", text: <>Cleaner can't find the Sintra key. <b>Three WhatsApp chats</b> open at once. One is the wrong group.</> },
    { time: "11:20", text: <>Two competitors on your street just dropped their rates. <b>You're priced 14% above the market</b> for next weekend — and you only notice because a guest asks.</> },
    { time: "14:05", text: <>Accountant emails about IVA. <b>Tourist tax isn't reconciled</b> for Lagos. Different rate than Lisbon. You forgot.</> },
    { time: "17:30", text: <>Dinner with family. <b>A 3-star review just posted.</b> You need to reply before the guest shares it. You don't.</> },
  ];
  const items = lang === "pt" ? itemsPT : itemsEN;
  return (
    <section id="problem">
      <div className="container">
        <div style={{maxWidth:680, marginBottom:44}}>
          <span className="eyebrow">{t("problem.eyebrow")}</span>
          <h2 className="h2" style={{marginTop:18}} dangerouslySetInnerHTML={{__html: t("problem.h2")}} />
          <p className="lede">{t("problem.lede")}</p>
        </div>
        <div className="timeline">
          {items.map((it, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-time">{it.time}</div>
              <div className="timeline-text">{it.text}</div>
            </div>
          ))}
        </div>
        <a className="problem-resolution" href="#constellation">{t("problem.resolution")}</a>
      </div>
    </section>
  );
}

/* ---------- Definition (answer-first, minimal) ---------- */
export function Definition() {
  const { t } = useT();
  return (
    <section id="definition" className="definition-section">
      <div className="container definition-row">
        <p className="definition-body">{t("def.body")}</p>
        <a className="definition-link" href="#faq">{t("def.link")}</a>
      </div>
    </section>
  );
}

/* ---------- Constellation (6 agents) ---------- */
export function Constellation() {
  const { t, lang } = useT();
  const agentsPT = [
    { name: "Orion",   role: "Orquestrador",  desc: "Encaminha trabalho entre os outros agentes. Garante que nada escapa.", stat: "100% do encaminhamento de tarefas" },
    { name: "Aurora",  role: "Conversas com Hóspedes", desc: "Responde a hóspedes em menos de 60 segundos, na língua deles. Só escala o que precisa de si.", stat: "Resposta média: 47 segundos" },
    { name: "Atlas",   role: "Estrategista de Preços", desc: "Ajusta preços todos os dias contra o mercado. Sugere; o senhor decide. Autonomia total opcional.", stat: "Meta: +18–25% de RevPAR" },
    { name: "Nova",    role: "Operações", desc: "Confirma chegadas e saídas com antecedência — persegue hóspedes nos vários canais se preciso — e agenda a equipa certa para cada propriedade antes de o senhor se lembrar.", stat: "Cada turnover agendado com antecedência" },
    { name: "Vega",    role: "Reviews & Retenção", desc: "Detecta o sentimento, rascunha respostas contextuais, sinaliza riscos. Recupera reservas abandonadas.", stat: "12–18% de recuperação de abandonos" },
    { name: "Polaris", role: "Conformidade", desc: "RNAL, licenças AL, taxa turística por município, faturas com IVA. Fala a lei portuguesa nativamente.", stat: "Zero coimas — até agora" },
  ];
  const agentsEN = [
    { name: "Orion",   role: "Orchestrator", desc: "Routes work between the other agents. Makes sure nothing falls through the cracks.", stat: "Handles 100% of task routing" },
    { name: "Aurora",  role: "Guest Communications", desc: "Replies to guests in under 60 seconds, in their language. Escalates only what needs you.", stat: "Avg. reply: 47 seconds" },
    { name: "Atlas",   role: "Pricing Strategist", desc: "Reprices every unit daily against the market. Suggests; you decide. Full autonomy optional.", stat: "Targets +18–25% RevPAR" },
    { name: "Nova",    role: "Operations", desc: "Confirms arrivals and departures ahead of stay — chasing guests across channels — and schedules the right cleaner per property before you'd think to ask.", stat: "Every turnover scheduled in advance" },
    { name: "Vega",    role: "Reviews & Retention", desc: "Surfaces sentiment, drafts contextual replies, flags risk. Recovers abandoned bookings.", stat: "12–18% abandonment recovery" },
    { name: "Polaris", role: "Compliance", desc: "RNAL, AL licenses, tourist tax per municipality, IVA invoicing. Speaks Portuguese law natively.", stat: "Zero fines — so far" },
  ];
  const agents = lang === "pt" ? agentsPT : agentsEN;
  const orchRole = lang === "pt" ? "Orquestrador" : "Orchestrator";
  return (
    <section id="constellation">
      <div className="container">
        <div style={{maxWidth:720, marginBottom:12}}>
          <span className="eyebrow">{t("con.eyebrow")}</span>
          <h2 className="h2" style={{marginTop:18}} dangerouslySetInnerHTML={{__html: t("con.h2")}} />
          <p className="lede" dangerouslySetInnerHTML={{__html: t("con.lede")}} />
        </div>
        <div className="constellation">
          {agents.map(a => (
            <div className={`agent ${a.role === orchRole ? "ai-card-agent" : ""}`} key={a.name}>
              <div className="agent-header">
                <div className="agent-mark">{a.name[0]}</div>
                <div>
                  <div className="agent-name">{a.name}</div>
                  <div className="agent-role">{a.role}</div>
                </div>
              </div>
              <div className="agent-desc">{a.desc}</div>
              <div className="agent-stat">★ {a.stat}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Three pillars ---------- */
export function Pillars() {
  const { t } = useT();
  return (
    <section id="pillars" style={{background:"var(--bg-2)"}}>
      <div className="container">
        <div style={{maxWidth:720, marginBottom:48}}>
          <span className="eyebrow">{t("pil.eyebrow")}</span>
          <h2 className="h2" style={{marginTop:18}} dangerouslySetInnerHTML={{__html: t("pil.h2")}} />
        </div>
        <div className="pillars">
          {[1,2,3].map(n => (
            <div className="pillar" key={n}>
              <div className="pillar-num">{t(`pil.${n}.num`)}</div>
              <h3 className="pillar-head">{t(`pil.${n}.head`)}</h3>
              <p style={{color:"var(--ink-2)", margin:0}}>{t(`pil.${n}.body`)}</p>
              <div className="pillar-metric"><b>{t(`pil.${n}.metric.val`)}</b> {t(`pil.${n}.metric.lbl`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Comparison ---------- */
export function Compare() {
  const { t } = useT();
  const rows = [
    ["cmp.row.1", "yes", "partial", "no"],
    ["cmp.row.2", "yes", "no", "no"],
    ["cmp.row.3", "yes", "no", "no"],
    ["cmp.row.4", "yes", "no", "no"],
    ["cmp.row.5", "yes", "yes", "partial"],
    ["cmp.row.6", "yes", "yes", "no"],
    ["cmp.row.7", "yes", "partial", "no"],
    ["cmp.row.8", "cmp.price.portiqa", "cmp.price.global", "cmp.price.excel"],
  ];
  const cell = (v) => {
    if (v === "yes") return <span className="check">{t("cmp.cell.included")}</span>;
    if (v === "no") return <span className="cross">{t("cmp.cell.no")}</span>;
    if (v === "partial") return <span className="partial">{t("cmp.cell.partial")}</span>;
    if (v && v.startsWith("cmp.")) return t(v);
    return v;
  };
  return (
    <section id="compare">
      <div className="container">
        <div style={{maxWidth:720, marginBottom:48}}>
          <span className="eyebrow">{t("cmp.eyebrow")}</span>
          <h2 className="h2" style={{marginTop:18}} dangerouslySetInnerHTML={{__html: t("cmp.h2")}} />
          <p className="lede">{t("cmp.lede")}</p>
        </div>
        <div className="compare">
          <div className="compare-row compare-head">
            <div className="compare-cell"></div>
            <div className="compare-cell brand-col">{t("cmp.col.portiqa")}</div>
            <div className="compare-cell">{t("cmp.col.global")}</div>
            <div className="compare-cell hide-sm">{t("cmp.col.excel")}</div>
          </div>
          {rows.map((r, i) => (
            <div className="compare-row" key={i}>
              <div className="compare-cell">{t(r[0])}</div>
              <div className="compare-cell">{cell(r[1])}</div>
              <div className="compare-cell">{cell(r[2])}</div>
              <div className="compare-cell hide-sm">{cell(r[3])}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ (extractable Q&A + FAQPage schema) ---------- */
export function Faq() {
  const { t } = useT();
  const items = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
    q: t(`faq.q${i}`),
    a: t(`faq.a${i}`),
  }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <section id="faq">
      <div className="container">
        <div style={{ maxWidth: 720, marginBottom: 36 }}>
          <span className="eyebrow">{t("faq.eyebrow")}</span>
          <h2 className="h2" style={{ marginTop: 18 }} dangerouslySetInnerHTML={{ __html: t("faq.h2") }} />
          <p className="lede">{t("faq.lede")}</p>
        </div>
        <div className="faq-list">
          {items.map(({ q, a }, i) => (
            <details className="faq-item" key={i} open={i < 3}>
              <summary className="faq-q">{q}</summary>
              <p className="faq-a">{a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}

/* ---------- Founder ---------- */
export function Founder() {
  const { t } = useT();
  return (
    <section id="founder" style={{background:"var(--bg-2)"}}>
      <div className="container">
        <div className="founder">
          <div className="founder-photo">{t("fnd.photo")}</div>
          <div>
            <span className="eyebrow">{t("fnd.eyebrow")}</span>
            <p className="pull-quote" style={{marginTop:22}}>
              {t("fnd.quote")}
            </p>
            <div className="sig">
              <b>{t("fnd.sig")}</b><br/>
              {t("fnd.sig.sub")}<br/>
              <span className="sig-linkedin">{t("fnd.sig.linkedin")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Integrations ---------- */
export function Integrations() {
  const { t } = useT();
  const items = [
    ["Airbnb",     t("int.airbnb")],
    ["Booking.com",t("int.booking")],
    ["VRBO",       t("int.vrbo")],
    ["Expedia",    t("int.expedia")],
    ["Stripe",     t("int.stripe")],
  ];
  return (
    <section id="integrations">
      <div className="container">
        <div className="integrations-wrap">
          <div style={{maxWidth:640}}>
            <span className="eyebrow">{t("int.eyebrow")}</span>
            <h2 className="h2" style={{marginTop:18}} dangerouslySetInnerHTML={{__html: t("int.h2")}} />
            <p className="lede">{t("int.lede")}</p>
          </div>
          <div className="integrations-grid">
            {items.map(([name, desc], i) => (
              <div className="integ-card" key={i}>
                <span className="integ-icon">{name.slice(0,2).toUpperCase()}</span>
                <div>
                  {name}
                  <small>{desc}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Signup / Founding 20 ---------- */
export function Signup() {
  const { t, lang } = useT();
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", company: "", units: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submittedAsWaitlist, setSubmittedAsWaitlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const isWaitlist = form.units === "1–4";
  const handle = async (e) => {
    e.preventDefault();
    if (!form.email || !form.name || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || (lang === "pt" ? "Falha na inscrição. Tente outra vez." : "Sign-up failed. Please try again."));
      }
      setSubmittedAsWaitlist(isWaitlist);
      setSubmitted(true);
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead_signup",
          method: "founding_20",
          tier: isWaitlist ? "waitlist" : "founding_20",
          units: form.units || "(unset)",
        });
      }
    } catch (err) {
      setError(err.message || (lang === "pt" ? "Erro inesperado." : "Unexpected error."));
    } finally {
      setLoading(false);
    }
  };
  const firstName = form.name.split(" ")[0] || (lang === "pt" ? "amigo" : "friend");
  return (
    <section id="signup">
      <div className="container">
        <div className="signup-wrap">
          <div className="signup">
            <div className="founding-badge">
              <span className="founding-dot" />{t("sig.badge")}
            </div>
            <span className="eyebrow">{t("sig.eyebrow")}</span>
            <h2 className="h2" style={{marginTop:12}} dangerouslySetInnerHTML={{__html: t("sig.h2")}} />
            <p className="lede">{t("sig.lede")}</p>
            {!submitted ? (
              <form className="signup-form" onSubmit={handle}>
                <div className="field">
                  <label htmlFor="signup-name">{t("sig.name")}</label>
                  <input id="signup-name" name="name" required autoComplete="name" value={form.name} onChange={set("name")} placeholder="Maria Silva" />
                </div>
                <div className="field">
                  <label htmlFor="signup-email">{t("sig.email")}</label>
                  <input id="signup-email" name="email" required type="email" autoComplete="email" value={form.email} onChange={set("email")} placeholder="maria@exemplo.pt" />
                </div>
                <div className="field">
                  <label htmlFor="signup-whatsapp">{t("sig.whatsapp")}</label>
                  <input id="signup-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" value={form.whatsapp} onChange={set("whatsapp")} placeholder={t("sig.whatsapp.placeholder")} />
                </div>
                <div className="field">
                  <label htmlFor="signup-company">{t("sig.company")}</label>
                  <input id="signup-company" name="company" autoComplete="organization" value={form.company} onChange={set("company")} placeholder="Silva Stays" />
                </div>
                <div className="field">
                  <label htmlFor="signup-units">{t("sig.units")}</label>
                  <select id="signup-units" name="units" value={form.units} onChange={set("units")}>
                    <option value="">{t("sig.units.placeholder")}</option>
                    <option>1–4</option>
                    <option>5–10</option>
                    <option>11–30</option>
                    <option>31–50</option>
                    <option>50+</option>
                  </select>
                </div>
                {isWaitlist && (
                  <div className="full" role="note" style={{padding:"12px 14px", background:"rgba(176,138,44,0.14)", border:"1px solid rgba(176,138,44,0.45)", borderRadius:6, fontSize:13, lineHeight:1.55, color:"rgba(244,239,230,0.92)"}}>
                    {t("sig.waitlist.note")}
                  </div>
                )}
                <div className="full" style={{display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14, marginTop:6}}>
                  <div className="signup-meta">
                    <span>{t("sig.meta.gdpr")}</span>
                    <span>{t("sig.meta.card")}</span>
                    <span>{t("sig.meta.pilot")}</span>
                  </div>
                  <button className="signup-submit" type="submit" disabled={loading}>
                    {loading ? (lang === "pt" ? "A enviar…" : "Sending…") : t(isWaitlist ? "sig.waitlist.submit" : "sig.submit")}
                  </button>
                </div>
                {error && (
                  <div role="alert" style={{marginTop:14, padding:"10px 14px", background:"rgba(220,80,80,0.08)", border:"1px solid rgba(220,80,80,0.3)", borderRadius:6, color:"#c53030", fontSize:13}}>
                    {error}
                  </div>
                )}
              </form>
            ) : (
              <div className="signup-success">
                <div style={{fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--accent)", marginBottom:10}}>{t(submittedAsWaitlist ? "sig.success.waitlist.kicker" : "sig.success.kicker")}</div>
                <div style={{fontSize:18, marginBottom:6, fontFamily:"var(--font-serif)"}}>{t("sig.success.thanks", { name: firstName })}</div>
                <div style={{fontSize:14, color:"rgba(244,239,230,0.72)"}} dangerouslySetInnerHTML={{__html: t(submittedAsWaitlist ? "sig.success.waitlist.body" : "sig.success.body", { email: form.email })}} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  const { t } = useT();
  return (
    <footer>
      <div className="container footer-inner">
        <div>
          <Logo />
          <p style={{marginTop:14, maxWidth:320}}>{t("ft.tagline")}</p>
          <div style={{marginTop:14, fontSize:12, fontFamily:"var(--font-mono)", letterSpacing:"0.04em"}}>{t("ft.copyright")}</div>
        </div>
        <div className="footer-col">
          <h4>{t("ft.product")}</h4>
          <a href="#constellation">{t("ft.product.constellation")}</a>
          <a href="#pillars">{t("ft.product.why")}</a>
          <a href="#compare">{t("ft.product.compare")}</a>
          <a href="#integrations">{t("ft.product.integrations")}</a>
        </div>
        <div className="footer-col">
          <h4>{t("ft.company")}</h4>
          <a href="#founder">{t("ft.company.team")}</a>
          <a href="#">{t("ft.company.careers")}</a>
          <a href="#">{t("ft.company.press")}</a>
          <a href="#">{t("ft.company.contact")}</a>
        </div>
        <div className="footer-col">
          <h4>{t("ft.legal")}</h4>
          <a href="/privacidade">{t("ft.legal.privacy")}</a>
          <a href="/privacidade#dados">{t("ft.legal.gdpr")}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("portiqa:open-cookies")); }}>{t("ft.legal.cookies")}</a>
        </div>
      </div>
      <div className="container footer-disclaimer">
        <p>{t("ft.disclaimer")}</p>
      </div>
    </footer>
  );
}

/* ---------- Cookie Banner (Consent Mode v2) ---------- */
const CONSENT_KEY = "portiqa_consent_v1";

function applyConsent({ analytics, marketing }) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "consent_update",
  });
  // gtag('consent','update',...) — emit raw command so GTM picks it up
  window.dataLayer.push([
    "consent",
    "update",
    {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: marketing ? "granted" : "denied",
      ad_user_data: marketing ? "granted" : "denied",
      ad_personalization: marketing ? "granted" : "denied",
    },
  ]);
}

export function CookieBanner() {
  const { t } = useT();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    let stored = null;
    try { stored = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null"); } catch (e) {}
    if (!stored) {
      setVisible(true);
    } else {
      setAnalytics(!!stored.analytics);
      setMarketing(!!stored.marketing);
    }
    const open = () => { setVisible(true); setExpanded(true); };
    window.addEventListener("portiqa:open-cookies", open);
    return () => window.removeEventListener("portiqa:open-cookies", open);
  }, []);

  const save = (a, m) => {
    const payload = { analytics: !!a, marketing: !!m, ts: new Date().toISOString() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(payload)); } catch (e) {}
    applyConsent(payload);
    setVisible(false);
    setExpanded(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferências de cookies"
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        right: 20,
        maxWidth: 440,
        zIndex: 9999,
        background: "var(--surface, #fff)",
        color: "var(--ink, #1a1a1a)",
        border: "1px solid rgba(176,138,44,0.35)",
        borderRadius: 8,
        boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        padding: "18px 18px 16px",
        fontSize: 13,
        lineHeight: 1.55,
      }}
    >
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent, #b08a2c)", marginBottom: 8 }}>
        {t("cookie.kicker")}
      </div>
      <div style={{ fontSize: 13, marginBottom: 14, color: "var(--ink-soft, rgba(0,0,0,0.72))" }}>
        {t("cookie.body")} <a href="/privacidade#cookies" style={{ color: "var(--accent, #b08a2c)", textDecoration: "underline" }}>{t("cookie.learnMore")}</a>
      </div>

      {expanded && (
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 12, marginBottom: 14 }}>
          <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", cursor: "default" }}>
            <span>
              <strong style={{ display: "block" }}>{t("cookie.essential.title")}</strong>
              <span style={{ color: "var(--ink-soft, rgba(0,0,0,0.6))", fontSize: 12 }}>{t("cookie.essential.desc")}</span>
            </span>
            <input type="checkbox" checked disabled style={{ marginLeft: 14 }} />
          </label>
          <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", cursor: "pointer" }}>
            <span>
              <strong style={{ display: "block" }}>{t("cookie.analytics.title")}</strong>
              <span style={{ color: "var(--ink-soft, rgba(0,0,0,0.6))", fontSize: 12 }}>{t("cookie.analytics.desc")}</span>
            </span>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} style={{ marginLeft: 14 }} />
          </label>
          <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", cursor: "pointer" }}>
            <span>
              <strong style={{ display: "block" }}>{t("cookie.marketing.title")}</strong>
              <span style={{ color: "var(--ink-soft, rgba(0,0,0,0.6))", fontSize: 12 }}>{t("cookie.marketing.desc")}</span>
            </span>
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} style={{ marginLeft: 14 }} />
          </label>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button
          type="button"
          onClick={() => save(true, true)}
          style={{
            flex: "1 1 140px",
            padding: "10px 14px",
            background: "var(--accent, #b08a2c)",
            color: "#fff",
            border: 0,
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {t("cookie.acceptAll")}
        </button>
        <button
          type="button"
          onClick={() => save(false, false)}
          style={{
            flex: "1 1 140px",
            padding: "10px 14px",
            background: "transparent",
            color: "var(--ink, #1a1a1a)",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: 6,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          {t("cookie.essentialOnly")}
        </button>
        {!expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            style={{
              flex: "1 1 100%",
              padding: "8px 0 0",
              background: "transparent",
              color: "var(--ink-soft, rgba(0,0,0,0.55))",
              border: 0,
              fontSize: 12,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {t("cookie.customize")}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => save(analytics, marketing)}
            style={{
              flex: "1 1 100%",
              marginTop: 4,
              padding: "10px 14px",
              background: "transparent",
              color: "var(--accent, #b08a2c)",
              border: "1px solid var(--accent, #b08a2c)",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t("cookie.savePrefs")}
          </button>
        )}
      </div>
    </div>
  );
}

