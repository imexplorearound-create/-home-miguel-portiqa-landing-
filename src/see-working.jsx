// Portiqa — "A trabalhar em direto" — ambient 60s outcome-oriented loop
// Seamless loop: second 60 === second 0. Dashboard stays live; camera pans/zooms.

import React, { useState, useEffect, useRef } from "react";
import { useT } from "./i18n.jsx";

/* ============ TIMELINE ============
   60s loop. Each beat marks: time, "camera" focus, active agent,
   event added to feed, and outcome caption (what the manager GETS).
   We drive everything from a single `t` in [0, 60). */

const BEATS = [
  { t: 0,  focus: "inbox",   agent: "aurora",  variant: "joao",   microKey: "beat.joao.micro"     },
  { t: 8,  focus: "inbox",   agent: "aurora",  variant: "hannah", microKey: "beat.hannah.micro"   },
  { t: 14, focus: "arrivals",agent: "nova",    subscene: "fill",    microKey: "beat.fill.micro"    },
  { t: 22, focus: "arrivals",agent: "nova",    subscene: "reroute", microKey: "beat.reroute.micro" },
  { t: 28, focus: "pricing", agent: "atlas",                        microKey: "beat.pricing.micro" },
  { t: 36, focus: "reviews", agent: "vega",                         microKey: "beat.review.micro"  },
  { t: 43, focus: "abandoned",agent: "vega",                        microKey: "beat.abandoned.micro"},
  { t: 50, focus: "inbox",   agent: "aurora",  variant: "marc",   microKey: "beat.marc.micro"    },
  { t: 56, focus: "inbox",   agent: "aurora",  variant: "sofia",  microKey: "beat.sofia.micro"   },
];

// outcomeKey lookup by focus+variant/subscene
const OUTCOME_KEY = {
  "inbox|joao": "out.joao",
  "inbox|hannah": "out.hannah",
  "inbox|marc": "out.marc",
  "inbox|sofia": "out.sofia",
  "arrivals|fill": "out.fill",
  "arrivals|reroute": "out.reroute",
  "pricing|": "out.pricing",
  "reviews|": "out.review",
  "abandoned|": "out.recovered",
};
function outcomeKeyFor(beat) {
  return OUTCOME_KEY[`${beat.focus}|${beat.variant || beat.subscene || ""}`] || "out.fill";
}

const LOOP = 60;

function getActiveBeat(t) {
  // Find the last beat whose t <= current t
  let beat = BEATS[0];
  for (const b of BEATS) { if (b.t <= t) beat = b; }
  return beat;
}

function getPhaseInBeat(t) {
  // Returns 0..1 position within current beat (how "fresh" the outcome is)
  const beat = getActiveBeat(t);
  const next = BEATS.find(b => b.t > beat.t) || { t: LOOP };
  const span = next.t - beat.t;
  return Math.min(1, (t - beat.t) / span);
}

/* ---------- Event feed: messages that scroll in, age out ---------- */
// Messages derived from the loop position — they live across loop boundaries
function feedFor(t) {
  // Build a stable list of up to 7 recent events. Each event keyed by loop cycle + beat.
  const feed = [];
  const all = [];
  // Consider last 2 loops worth so we have items near t=0
  for (let cycle = -1; cycle <= 0; cycle++) {
    for (const b of BEATS) {
      all.push({ ...b, absT: b.t + cycle * LOOP, key: `${cycle}-${b.t}` });
    }
  }
  for (const e of all) {
    const age = t - e.absT;
    if (age >= 0 && age < 22) feed.push({ ...e, age });
  }
  feed.sort((a, b) => a.age - b.age); // newest first
  return feed.slice(0, 6);
}

/* ---------- Agents meta ---------- */
const AGENTS = {
  aurora:  { name: "Aurora",  roleKey: "agents.aurora.role",  color: "#7C5CBF" },
  nova:    { name: "Nova",    roleKey: "agents.nova.role",    color: "#B08A2C" },
  atlas:   { name: "Atlas",   roleKey: "agents.atlas.role",   color: "#D4A843" },
  vega:    { name: "Vega",    roleKey: "agents.vega.role",    color: "#2D8A5E" },
  polaris: { name: "Polaris", roleKey: "agents.polaris.role", color: "#3B7DD8" },
  orion:   { name: "Orion",   roleKey: "agents.orion.role",   color: "#7C5CBF" },
};

/* ---------- Live dashboard ---------- */
function LiveDashboard({ t }) {
  const { t: tr, lang } = useT();
  const beat = getActiveBeat(t);
  const phase = getPhaseInBeat(t);
  const feed = feedFor(t);

  const cyc = t / LOOP;
  const occupancy = 88 + Math.round(Math.sin(cyc * Math.PI * 2) * 3 + 3);
  const revenueBase = 14200;
  const revenue = revenueBase + Math.round(cyc * 820);

  const isAurora = beat.agent === "aurora";
  const respondSec = isAurora ? Math.max(12, 47 - Math.round(phase * 35)) : 47;

  return (
    <div className={`live-dash focus-${beat.focus}`}>
      <div className="live-top">
        <div className="live-brand"><span className="live-dot" /> portiqa.pt</div>
        <div className="live-clock">{fmtClock(t)}</div>
      </div>

      <div className="live-body">
        <aside className="live-side">
          <div className="side-cap">{tr("sw.live.workspace")}</div>
          <div className={`live-sitem ${beat.focus === 'inbox' ? 'glow' : ''}`}>
            <span className="live-sdot" />{tr("sw.side.inbox2")}
            {beat.focus === 'inbox' && <span className="live-badge">{tr("sw.live.new")}</span>}
          </div>
          <div className={`live-sitem ${beat.focus === 'arrivals' ? 'glow' : ''}`}>
            <span className="live-sdot" />{tr("sw.side.arrivals2")}
          </div>
          <div className={`live-sitem ${beat.focus === 'pricing' ? 'glow' : ''}`}>
            <span className="live-sdot" />{tr("sw.side.pricing2")}
          </div>
          <div className={`live-sitem ${beat.focus === 'reviews' ? 'glow' : ''}`}>
            <span className="live-sdot" />{tr("sw.side.reviews2")}
          </div>
          <div className={`live-sitem ${beat.focus === 'abandoned' ? 'glow' : ''}`}>
            <span className="live-sdot" />{tr("sw.side.recovered2")}
          </div>

          <div className="side-cap" style={{marginTop:14}}>{tr("sw.live.agents")}</div>
          {Object.entries(AGENTS).filter(([k]) => k !== 'orion' && k !== 'polaris').map(([k, a]) => {
            const active = beat.agent === k;
            return (
              <div key={k} className={`live-sitem agent-row ${active ? 'active' : ''}`}>
                <span className="live-avatar" style={{background: a.color}}>{a.name[0]}</span>
                <span>{a.name}</span>
                {active && <span className="live-pulse" />}
              </div>
            );
          })}
        </aside>

        <main className="live-main">
          <div className="live-stats">
            <div className="live-stat">
              <div className="live-stat-label">{tr("sw.live.revenue")}</div>
              <div className="live-stat-val">€ {revenue.toLocaleString(lang === 'pt' ? 'pt-PT' : 'en-GB')}</div>
              <div className="live-stat-delta">{tr("sw.live.revdelta")}</div>
            </div>
            <div className="live-stat">
              <div className="live-stat-label">{tr("sw.live.occ")}</div>
              <div className="live-stat-val">{occupancy}%</div>
              <div className="live-stat-delta">{tr("sw.live.occdelta")}</div>
            </div>
            <div className="live-stat">
              <div className="live-stat-label">{tr("sw.live.resp")}</div>
              <div className="live-stat-val">
                {respondSec}<span style={{fontSize:14, color:"var(--muted)"}}>s</span>
              </div>
              <div className="live-stat-delta">{tr("sw.live.respdelta")}</div>
            </div>
          </div>

          <div className="focus-panel">
            {beat.focus === 'inbox'    && <FocusInbox phase={phase} respondSec={respondSec} variant={beat.variant} />}
            {beat.focus === 'arrivals' && <FocusArrivals phase={phase} subscene={beat.subscene} />}
            {beat.focus === 'pricing'  && <FocusPricing phase={phase} />}
            {beat.focus === 'reviews'  && <FocusReviews phase={phase} />}
            {beat.focus === 'abandoned'&& <FocusAbandoned phase={phase} />}
          </div>

          <div className="live-feed">
            <div className="live-feed-head">
              <span>{tr("sw.live.activity")}</span>
              <span className="live-live"><span className="live-live-dot" />{tr("sw.live.live")}</span>
            </div>
            {feed.map((f, i) => (
              <div className={`feed-row ${i === 0 ? 'fresh' : ''}`} key={f.key}
                   style={{ opacity: Math.max(0.25, 1 - f.age / 22) }}>
                <span className="feed-avatar" style={{background: AGENTS[f.agent].color}}>{AGENTS[f.agent].name[0]}</span>
                <div className="feed-text">
                  <div><b>{AGENTS[f.agent].name}</b> · {tr(f.microKey)}</div>
                </div>
                <span className="feed-age">{fmtAge(f.age, tr)}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function fmtClock(t) {
  // Map 0..60 seconds to a day from 06:00 to 22:00 that loops
  const mins = 6 * 60 + Math.floor((t / LOOP) * (16 * 60));
  const hh = Math.floor(mins / 60) % 24;
  const mm = mins % 60;
  return `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
}
function fmtAge(age, tr) {
  if (age < 2) return tr ? tr("sw.now") : "now";
  return `${Math.floor(age)}s`;
}

/* ---------- Focus panels (the 'camera' of each beat) ---------- */

const INBOX_VARIANTS = {
  joao: {
    channel: "Airbnb",
    guest: "João M. · Baixa Studio, Lisboa",
    inboundLang: "EN",
    inboundTime: "06:12",
    inbound: "\"Hi! Can we arrive at 22:30 instead? Flight delayed. Thanks!\"",
    replyKey: "ib.reply.joao",
    metaKey: "ib.meta.joao",
  },
  hannah: {
    channel: "Booking.com",
    guest: "Hannah K. · Porto Loft, Ribeira",
    inboundLang: "DE",
    inboundTime: "09:34",
    inbound: "\"Guten Tag! Gibt es in der Nähe einen sicheren Parkplatz? Wir kommen mit dem Auto aus München.\"",
    replyKey: "ib.reply.hannah",
    metaKey: "ib.meta.hannah",
  },
  marc: {
    channel: "WhatsApp",
    guest: "Marc D. · Algarve Villa, Lagos",
    inboundLang: "FR",
    inboundTime: "22:08",
    inbound: "\"Bonsoir, est-ce que la piscine est chauffée en octobre ? Et le WiFi est-il rapide pour le télétravail ?\"",
    replyKey: "ib.reply.marc",
    metaKey: "ib.meta.marc",
  },
  sofia: {
    channel: "Airbnb",
    guest: "Sofia R. · Baixa Studio, Lisboa",
    inboundLang: "PT",
    inboundTime: "19:47",
    inbound: "\"Olá! Alguma recomendação para jantar hoje perto do apartamento? Somos 2, comida tradicional, sem ser muito turístico.\"",
    replyKey: "ib.reply.sofia",
    metaKey: "ib.meta.sofia",
  },
};

function FocusInbox({ phase, respondSec, variant = "joao" }) {
  const { t: tr } = useT();
  const v = INBOX_VARIANTS[variant] || INBOX_VARIANTS.joao;
  const reply = tr(v.replyKey);
  const typedLen = Math.min(reply.length, Math.floor(phase * reply.length * 1.4));
  return (
    <div className="focus-inbox">
      <div className="focus-head">
        <div>
          <div className="focus-kicker">{tr("ib.head.kicker").replace("{channel}", v.channel)}</div>
          <div className="focus-title">{v.guest}</div>
        </div>
        <div className="focus-meta">{tr("ib.respin").replace("{sec}", respondSec)}</div>
      </div>

      <div className="bubble bubble-in">
        {v.inbound}
        <div className="bubble-meta">{v.inboundTime} · {v.inboundLang}</div>
      </div>

      <div className="bubble bubble-out ai">
        <div className="bubble-agent"><span className="feed-avatar" style={{background:AGENTS.aurora.color, width:18, height:18, fontSize:10}}>A</span> Aurora</div>
        <div className="bubble-text">
          {reply.slice(0, typedLen)}<span className="caret" />
        </div>
        <div className="bubble-meta">{tr(v.metaKey)}</div>
      </div>
    </div>
  );
}

/* ---------- Arrivals / Cleaning timeline ---------- */

// Saturday turnaround day. Properties across zones with different teams.
const PROPS = [
  { id: "alfama",  name: "Alfama Flat",    zone: "Lisboa",  checkout: 10, checkin: 15, team: "Sofia",    teamKind: "interna"  },
  { id: "baixa",   name: "Baixa Studio",   zone: "Lisboa",  checkout: 11, checkin: 16, team: "Sofia",    teamKind: "interna"  },
  { id: "ribeira", name: "Porto Loft",     zone: "Porto",   checkout: 10, checkin: 17, team: "Miguel",   teamKind: "interna"  },
  { id: "lagos",   name: "Algarve Villa",  zone: "Algarve", checkout: 11, checkin: 16, team: "CleanCoast", teamKind: "externa" },
  { id: "sintra",  name: "Sintra Cottage", zone: "Lisboa",  checkout: 10, checkin: 15, team: "Sofia",    teamKind: "interna"  },
];

const HOURS = [8, 10, 12, 14, 16, 18, 20];

function FocusArrivals({ phase, subscene = "fill" }) {
  return subscene === "reroute"
    ? <ArrivalsReroute phase={phase} />
    : <ArrivalsFill phase={phase} />;
}

function ArrivalsFill({ phase }) {
  const { t: tr } = useT();
  const slotsVisible = Math.min(PROPS.length, Math.floor(phase * PROPS.length * 1.25) + 1);
  const scheduledCount = slotsVisible;

  return (
    <div className="focus-arrivals-tl">
      <div className="focus-head">
        <div>
          <div className="focus-kicker">{tr("ar.fill.kicker")}</div>
          <div className="focus-title">{tr("ar.fill.title")}</div>
        </div>
        <div className="focus-meta">{tr("ar.fill.meta").replace("{n}", scheduledCount)}</div>
      </div>

      <div className="tl-legend">
        <span className="tl-dot tl-internal" /> {tr("ar.legend.internal")}
        <span className="tl-dot tl-external" /> {tr("ar.legend.external")}
        <span className="tl-spacer" />
        <span className="tl-checkout-mark" /> {tr("ar.legend.checkout")}
        <span className="tl-checkin-mark" /> {tr("ar.legend.checkin")}
      </div>

      <div className="tl-wrap">
        <div className="tl-hours">
          {HOURS.map(h => <div key={h} className="tl-hour">{String(h).padStart(2,'0')}h</div>)}
        </div>

        {PROPS.map((p, i) => {
          const visible = i < slotsVisible;
          // Cleaning slot: 2h window starting after checkout, ending before checkin
          const slotStart = p.checkout + 1;
          const slotEnd = slotStart + 2;
          const left = ((p.checkout - 8) / 12) * 100;
          const right = ((p.checkin - 8) / 12) * 100;
          const slotLeft = ((slotStart - 8) / 12) * 100;
          const slotWidth = ((slotEnd - slotStart) / 12) * 100;
          return (
            <div className="tl-row" key={p.id}>
              <div className="tl-row-label">
                <div className="tl-prop">{p.name}</div>
                <div className="tl-zone">{p.zone}</div>
              </div>
              <div className="tl-track">
                {/* occupancy bars: before checkout + after checkin */}
                <div className="tl-occ tl-occ-out" style={{width: `${left}%`}} />
                <div className="tl-occ tl-occ-in" style={{left: `${right}%`, right: 0}} />
                {/* checkout + checkin marks */}
                <div className="tl-mark tl-mark-out" style={{left: `${left}%`}}><span>↓</span></div>
                <div className="tl-mark tl-mark-in"  style={{left: `${right}%`}}><span>↑</span></div>
                {/* cleaning slot */}
                {visible && (
                  <div
                    className={`tl-slot ${p.teamKind} snap`}
                    style={{ left: `${slotLeft}%`, width: `${slotWidth}%`, animationDelay: `${i * 80}ms` }}
                  >
                    <span className="tl-slot-team">{p.team}</span>
                    <span className="tl-slot-time">{slotStart}h–{slotEnd}h</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ArrivalsReroute({ phase }) {
  const { t: tr } = useT();
  const stage = phase < 0.2 ? 0 : phase < 0.5 ? 1 : phase < 0.8 ? 2 : 3;

  return (
    <div className="focus-arrivals-tl">
      <div className="focus-head">
        <div>
          <div className="focus-kicker">{tr("ar.reroute.kicker")}</div>
          <div className="focus-title">{tr("ar.reroute.title")}</div>
        </div>
        <div className="focus-meta">
          {stage === 0 && tr("ar.reroute.s0")}
          {stage === 1 && tr("ar.reroute.s1")}
          {stage === 2 && tr("ar.reroute.s2")}
          {stage === 3 && tr("ar.reroute.s3")}
        </div>
      </div>

      <div className="tl-wrap">
        <div className="tl-hours">
          {HOURS.map(h => <div key={h} className="tl-hour">{String(h).padStart(2,'0')}h</div>)}
        </div>

        {PROPS.map((p, i) => {
          const isConflict = p.id === "ribeira";
          const slotStart = p.checkout + 1;
          const slotEnd = slotStart + 2;
          const left = ((p.checkout - 8) / 12) * 100;
          const right = ((p.checkin - 8) / 12) * 100;
          const slotLeft = ((slotStart - 8) / 12) * 100;
          const slotWidth = ((slotEnd - slotStart) / 12) * 100;

          // For the conflict row, we swap the team based on stage
          let team = p.team;
          let teamKind = p.teamKind;
          let slotState = "ok";
          if (isConflict) {
            if (stage === 0) { team = "Miguel"; teamKind = "interna"; slotState = "ok"; }
            else if (stage === 1) { team = "Miguel ✗"; teamKind = "interna"; slotState = "alert"; }
            else if (stage === 2) { team = tr("ar.search"); teamKind = "search"; slotState = "search"; }
            else { team = "Cleanify"; teamKind = "externa"; slotState = "new"; }
          }

          return (
            <div className="tl-row" key={p.id}>
              <div className="tl-row-label">
                <div className="tl-prop">{p.name}</div>
                <div className="tl-zone">{p.zone}</div>
              </div>
              <div className="tl-track">
                <div className="tl-occ tl-occ-out" style={{width: `${left}%`}} />
                <div className="tl-occ tl-occ-in" style={{left: `${right}%`, right: 0}} />
                <div className="tl-mark tl-mark-out" style={{left: `${left}%`}}><span>↓</span></div>
                <div className="tl-mark tl-mark-in"  style={{left: `${right}%`}}><span>↑</span></div>
                <div
                  className={`tl-slot ${teamKind} state-${slotState}`}
                  style={{ left: `${slotLeft}%`, width: `${slotWidth}%` }}
                  key={`${p.id}-${stage}-${isConflict}`}
                >
                  <span className="tl-slot-team">{team}</span>
                  <span className="tl-slot-time">{slotStart}h–{slotEnd}h</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FocusPricing({ phase }) {
  const { t: tr } = useT();
  const nights = [
    { d: tr("pr.d.fri"), base: 120, new: 148 },
    { d: tr("pr.d.sat"), base: 135, new: 172 },
    { d: tr("pr.d.sun"), base: 110, new: 132 },
    { d: tr("pr.d.mon"), base: 95,  new: 108 },
    { d: tr("pr.d.tue"), base: 95,  new: 102 },
  ];
  const accepted = phase > 0.6;
  return (
    <div className="focus-pricing">
      <div className="focus-head">
        <div>
          <div className="focus-kicker">{tr("pr.kicker")}</div>
          <div className="focus-title">{tr("pr.title")}</div>
        </div>
        <div className="focus-meta">{accepted ? tr("pr.meta.accepted") : tr("pr.meta.pending")}</div>
      </div>

      <div className="price-grid">
        {nights.map((n, i) => {
          const target = accepted ? n.new : n.base;
          const shown = Math.round(n.base + (target - n.base) * Math.min(1, phase * 1.6));
          return (
            <div className="price-col" key={i}>
              <div className="price-day">{n.d}</div>
              <div className="price-bar">
                <div className="price-fill" style={{height: `${(shown/200)*100}%`, background: accepted ? 'var(--gold)' : 'var(--ink-2)'}} />
              </div>
              <div className="price-amt">€ {shown}</div>
            </div>
          );
        })}
      </div>

      <div className="atlas-rec">
        <span className="feed-avatar" style={{background:AGENTS.atlas.color}}>A</span>
        <div>
          <div dangerouslySetInnerHTML={{__html: tr("pr.atlas.rec")}} />
          <div className="atlas-sub">{tr("pr.atlas.est.lbl")} <b style={{color:"var(--gold)"}}>{tr("pr.atlas.est.val")}</b></div>
        </div>
      </div>
    </div>
  );
}

function FocusReviews({ phase }) {
  const { t: tr } = useT();
  const draft = tr("rv.draft");
  const len = Math.min(draft.length, Math.floor(phase * draft.length * 1.5));
  return (
    <div className="focus-reviews">
      <div className="focus-head">
        <div>
          <div className="focus-kicker">{tr("rv.kicker")}</div>
          <div className="focus-title">{tr("rv.title")}</div>
        </div>
        <div className="focus-meta">{tr("rv.meta")}</div>
      </div>

      <div className="review-in">
        <div className="review-stars">★★★☆☆</div>
        <div className="review-text">{tr("rv.in")}</div>
        <div className="review-tags">
          <span className="review-tag positive">{tr("rv.tag.loc")}</span>
          <span className="review-tag positive">{tr("rv.tag.clean")}</span>
          <span className="review-tag negative">{tr("rv.tag.noise")}</span>
        </div>
      </div>

      <div className="bubble bubble-out ai" style={{marginTop:14}}>
        <div className="bubble-agent"><span className="feed-avatar" style={{background:AGENTS.vega.color, width:18, height:18, fontSize:10}}>V</span> {tr("rv.draft.lbl")}</div>
        <div className="bubble-text">{draft.slice(0, len)}<span className="caret" /></div>
        <div className="bubble-meta">{tr("rv.draft.meta")}</div>
      </div>
    </div>
  );
}

function FocusAbandoned({ phase }) {
  const { t: tr } = useT();
  const step = phase < 0.3 ? 0 : phase < 0.6 ? 1 : phase < 0.85 ? 2 : 3;
  return (
    <div className="focus-abandoned">
      <div className="focus-head">
        <div>
          <div className="focus-kicker">{tr("ab.kicker")}</div>
          <div className="focus-title">{tr("ab.title")}</div>
        </div>
        <div className="focus-meta">{step === 3 ? tr("ab.meta.done") : tr("ab.meta.pending")}</div>
      </div>

      <div className="abandoned-flow">
        <div className={`aflow-step ${step >= 0 ? 'done' : ''}`}>
          <div className="aflow-dot" />
          <div>
            <div className="aflow-t">{tr("ab.s0.t")}</div>
            <div className="aflow-s">{tr("ab.s0.s")}</div>
          </div>
        </div>
        <div className={`aflow-step ${step >= 1 ? 'done' : ''}`}>
          <div className="aflow-dot" />
          <div>
            <div className="aflow-t">{step >= 1 ? tr("ab.s1.t.done") : tr("ab.s1.t.wait")}</div>
            <div className="aflow-s">{tr("ab.s1.s")}</div>
          </div>
        </div>
        <div className={`aflow-step ${step >= 2 ? 'done' : ''}`}>
          <div className="aflow-dot" />
          <div>
            <div className="aflow-t">{step >= 2 ? tr("ab.s2.t.done") : tr("ab.s2.t.wait")}</div>
            <div className="aflow-s">{tr("ab.s2.s")}</div>
          </div>
        </div>
        <div className={`aflow-step ${step >= 3 ? 'done reveal' : ''}`}>
          <div className="aflow-dot gold" />
          <div>
            <div className="aflow-t">{step >= 3 ? tr("ab.s3.t.done") : tr("ab.s3.t.wait")}</div>
            <div className="aflow-s">{step >= 3 ? tr("ab.s3.s.done") : tr("ab.s3.s.wait")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Overlay: outcome caption + progress ---------- */

function OutcomeCaption({ t }) {
  const { t: tr } = useT();
  const beat = getActiveBeat(t);
  const phase = getPhaseInBeat(t);
  let opacity = 1;
  if (phase < 0.1) opacity = phase / 0.1;
  else if (phase > 0.88) opacity = Math.max(0, (1 - phase) / 0.12);
  const agent = AGENTS[beat.agent];
  return (
    <div className="outcome" style={{opacity}}>
      <div className="outcome-kicker">
        <span className="outcome-dot" style={{background: agent.color}} />
        {agent.name} · {tr(agent.roleKey)}
      </div>
      <div className="outcome-text">{tr(outcomeKeyFor(beat))}</div>
    </div>
  );
}

function LoopBar({ t }) {
  const { t: tr } = useT();
  return (
    <div className="loopbar">
      <div className="loopbar-track">
        <div className="loopbar-fill" style={{width: `${(t / LOOP) * 100}%`}} />
      </div>
      <div className="loopbar-meta">
        <span className="loopbar-live"><span className="live-live-dot" /> {tr("sw.loopbar.live")}</span>
        <span className="loopbar-time">{Math.floor(t).toString().padStart(2, '0')}s / 60s</span>
      </div>
    </div>
  );
}

export function SeeItWorking() {
  const { t: tr } = useT();
  const [t, setT] = useState(0);
  const rafRef = useRef();
  const startRef = useRef();
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const tick = (now) => {
      if (!startRef.current) startRef.current = now;
      if (!pausedRef.current) {
        const elapsed = ((now - startRef.current) / 1000) % LOOP;
        setT(elapsed);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const togglePause = () => {
    const next = !paused;
    setPaused(next);
    pausedRef.current = next;
    if (!next) {
      startRef.current = performance.now() - t * 1000;
    }
  };

  return (
    <section id="live" className="see-working">
      <div className="container">
        <div className="sw-head">
          <div>
            <span className="eyebrow">{tr("sw.eyebrow")}</span>
            <h2 className="h2" style={{marginTop:18}} dangerouslySetInnerHTML={{__html: tr("sw.h2")}} />
            <p className="lede">{tr("sw.lede")}</p>
          </div>
          <div className="sw-actions">
            <button className="sw-btn" onClick={togglePause}>{paused ? tr("sw.resume") : tr("sw.pause")}</button>
            <a className="btn btn-primary" href="#signup">{tr("sw.cta")} →</a>
          </div>
        </div>

        <div className="sw-stage">
          <LiveDashboard t={t} />
          <OutcomeCaption t={t} />
          <LoopBar t={t} />
        </div>

        <p className="sw-foot-caption">{tr("sw.foot.caption")}</p>
        <div className="sw-foot">
          <div className="sw-foot-item"><b>{tr("sw.foot.1.val")}</b><span>{tr("sw.foot.1.lbl")}</span></div>
          <div className="sw-foot-item"><b>{tr("sw.foot.2.val")}</b><span>{tr("sw.foot.2.lbl")}</span></div>
          <div className="sw-foot-item"><b>{tr("sw.foot.3.val")}</b><span>{tr("sw.foot.3.lbl")}</span></div>
          <div className="sw-foot-item"><b>{tr("sw.foot.4.val")}</b><span>{tr("sw.foot.4.lbl")}</span></div>
        </div>
      </div>
    </section>
  );
}

