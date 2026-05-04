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
  const { t } = useT();
  return (
    <section className="hero-a" id="top">
      <div className="container">
        <div className="inner">
          <span className="eyebrow anim">{t("hero.eyebrow.a")}</span>
          <h1 className="display anim anim-d1" dangerouslySetInnerHTML={{__html: headline || t("hero.headline.a")}} />
          <p className="lede anim anim-d2" style={{textAlign:"center"}}>
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
    ["cmp.row.5", "yes", "no", "no"],
    ["cmp.row.6", "yes", "yes", "partial"],
    ["cmp.row.7", "yes", "yes", "no"],
    ["cmp.row.8", "yes", "partial", "no"],
    ["cmp.row.9", "cmp.price.portiqa", "cmp.price.global", "cmp.price.excel"],
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
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ({
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
    ["MB Way",     t("int.mbway")],
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

/* ---------- Signup / Founding 50 ---------- */
export function Signup() {
  const { t, lang } = useT();
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", company: "", units: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
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
      setSubmitted(true);
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
                  <label>{t("sig.name")}</label>
                  <input required value={form.name} onChange={set("name")} placeholder={lang === "pt" ? "Maria Silva" : "Maria Silva"} />
                </div>
                <div className="field">
                  <label>{t("sig.email")}</label>
                  <input required type="email" value={form.email} onChange={set("email")} placeholder="maria@exemplo.pt" />
                </div>
                <div className="field">
                  <label>{t("sig.whatsapp")}</label>
                  <input type="tel" inputMode="tel" autoComplete="tel" value={form.whatsapp} onChange={set("whatsapp")} placeholder={t("sig.whatsapp.placeholder")} />
                </div>
                <div className="field">
                  <label>{t("sig.company")}</label>
                  <input value={form.company} onChange={set("company")} placeholder="Silva Stays" />
                </div>
                <div className="field">
                  <label>{t("sig.units")}</label>
                  <select value={form.units} onChange={set("units")}>
                    <option value="">{t("sig.units.placeholder")}</option>
                    <option>1–4</option>
                    <option>5–10</option>
                    <option>11–30</option>
                    <option>31–50</option>
                    <option>50+</option>
                  </select>
                </div>
                <div className="full" style={{display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14, marginTop:6}}>
                  <div className="signup-meta">
                    <span>{t("sig.meta.gdpr")}</span>
                    <span>{t("sig.meta.card")}</span>
                    <span>{t("sig.meta.pilot")}</span>
                  </div>
                  <button className="signup-submit" type="submit" disabled={loading}>
                    {loading ? (lang === "pt" ? "A enviar…" : "Sending…") : t("sig.submit")}
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
                <div style={{fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--accent)", marginBottom:10}}>{t("sig.success.kicker")}</div>
                <div style={{fontSize:18, marginBottom:6, fontFamily:"var(--font-serif)"}}>{t("sig.success.thanks", { name: firstName })}</div>
                <div style={{fontSize:14, color:"rgba(244,239,230,0.72)"}} dangerouslySetInnerHTML={{__html: t("sig.success.body", { email: form.email })}} />
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
        </div>
      </div>
    </footer>
  );
}

