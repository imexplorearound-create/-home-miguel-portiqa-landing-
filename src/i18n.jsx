// Portiqa — i18n: PT (default) + EN with tone-adapted copy.
// Detects browser language on first load, persists to localStorage.

import React from "react";
import { safeStorage, isClient } from "./storage.js";

const DEFAULT_LANG = "pt";
const LANGS = ["pt", "en"];
const LangContext = React.createContext({ lang: DEFAULT_LANG, setLang: () => {}, t: (k) => k });

const DICT = {
  pt: {
    // ----- Nav -----
    "nav.live": "Ver a funcionar",
    "nav.problem": "O dia",
    "nav.constellation": "A Constelação",
    "nav.pillars": "Porquê Portiqa",
    "nav.compare": "Comparar",
    "nav.about": "Sobre",
    "nav.faq": "Perguntas",
    "nav.cta": "Entrar nos Founding 50 →",
    "theme.toLight": "Mudar para claro",
    "theme.toDark": "Mudar para escuro",
    "theme.light": "Claro",
    "theme.dark": "Escuro",

    // ----- Hero -----
    "hero.eyebrow.a": "Portiqa · Founding 50 · Beta Privada",
    "hero.eyebrow.b": "Founding 50 · Beta Privada",
    "hero.eyebrow.c": "Portiqa · est. 2026 · Lisboa & Porto",
    "hero.headline.a": "As suas casas nunca dormem. <em>A Portiqa também não.</em>",
    "hero.headline.b": "O sistema de gestão que lhe devolve <em>horas ao dia</em>.",
    "hero.headline.c": "Encontre o seu <em>porto</em> na gestão de alojamento.",
    "hero.lede.a": "Seis agentes de IA — uma constelação — a tratar das mensagens aos hóspedes, preços, limpezas, faturação e conformidade com a taxa turística. Fica consigo a hospitalidade. Ficam com eles as horas.",
    "hero.lede.b": "O PMS com IA nativa, feito para gestores portugueses de alojamento local com 1 a 100 propriedades. Sincronização de canais, agentes autónomos, conformidade RNAL e taxa turística. MB Way pronto a usar.",
    "hero.lede.c": "Para o gestor de AL em Portugal, com 1 a 100 propriedades. Seis agentes de IA tratam de mensagens, preços, limpezas, reviews e conformidade. Faça hospitalidade como deve ser — calma, a horas, portuguesa.",
    "hero.cta.primary": "Entrar nos Founding 50 →",
    "hero.cta.ghost.constellation": "Conhecer a Constelação",
    "hero.cta.ghost.agents": "Conhecer os 6 agentes",
    "hero.cta.ghost.c": "A Constelação",
    "hero.microproof.a": "Construído por uma equipa portuguesa · Lisboa & Porto",
    "hero.microproof.b": "Feito por quem conhece o mercado português de AL",

    // ----- Logos strip -----
    "def.body": "A Portiqa é um PMS português com IA nativa para gestores com 1 a 100 propriedades.",
    "def.link": "O que isto inclui →",

    "problem.resolution": "É aqui que a Portiqa entra →",

    "logos.label": "Sincronização nativa · Atualização a 5 min · Anti-overbooking",

    // ----- See it working -----
    "sw.eyebrow": "Veja a funcionar",
    "sw.h2": "Um dia inteiro de operações — <em>sem si no meio.</em>",
    "sw.lede": "Sessenta segundos simulados de um dia real. A Aurora responde a hóspedes em português. A Nova agenda limpezas e rebate turnovers. O Atlas sugere preços. A Vega escreve respostas a reviews. Uma reserva abandonada volta. Tudo em paralelo — e o seu tempo, de volta.",
    "sw.pause": "❚❚ Pausar",
    "sw.resume": "▶ Retomar",
    "sw.cta": "Quero isto no meu dia →",
    "sw.foot.caption": "Cenário demonstrativo · Metas medidas no piloto privado com os Founding 50.",
    "sw.foot.1.val": "47s",
    "sw.foot.1.lbl": "tempo de resposta médio a hóspedes",
    "sw.foot.2.val": "+€140",
    "sw.foot.2.lbl": "receita média recuperada por semana",
    "sw.foot.3.val": "0",
    "sw.foot.3.lbl": "chamadas para a equipa de limpeza",
    "sw.foot.4.val": "15h",
    "sw.foot.4.lbl": "devolvidas à sua semana",
    "sw.live": "AO VIVO",
    "sw.loopbar.live": "Em direto · loop contínuo",
    "sw.activity": "Atividade · em direto",

    // Dashboard chrome
    "sw.workspace": "Espaço de trabalho",
    "sw.agents": "Agentes",
    "sw.side.inbox": "Inbox",
    "sw.side.arrivals": "Chegadas",
    "sw.side.pricing": "Preços",
    "sw.side.reviews": "Reviews",
    "sw.side.recovered": "Recuperadas",
    "sw.badge.new": "novo",
    "sw.stat.revenue": "Receita · Out",
    "sw.stat.revenue.delta": "+22% vs. mês passado",
    "sw.stat.occupancy": "Ocupação",
    "sw.stat.occupancy.delta": "13 de 15 noites",
    "sw.stat.response": "Resposta média",
    "sw.stat.response.delta": "Aurora de serviço",

    // Agents roles
    "agent.aurora.role": "Conversas",
    "agent.nova.role": "Operações",
    "agent.atlas.role": "Preços",
    "agent.vega.role": "Reviews",
    "agent.polaris.role": "Conformidade",
    "agent.orion.role": "Orquestrador",

    // ----- Problem -----
    "problem.eyebrow": "O dia sem Portiqa",
    "problem.h2": "Soa-lhe familiar? <em>Uma terça-feira em Lisboa.</em>",
    "problem.lede": "Este é o trabalho que ninguém lhe conta quando arrenda a primeira unidade. Quarenta e sete separadores abertos, três WhatsApps, uma folha de Excel e uma oração.",

    // ----- Constellation -----
    "con.eyebrow": "A Constelação",
    "con.h2": "Seis especialistas. <em>Um painel.</em> As suas operações, em carris.",
    "con.lede": "A Portiqa não é uma IA com seis chapéus. É uma equipa de agentes especializados — cada um com nome, função e fronteira que o senhor define. Quatro níveis de autonomia, de <em>sugerir</em> a <em>tratar disso</em>.",

    // ----- Pillars -----
    "pil.eyebrow": "Porquê Portiqa",
    "pil.h2": "Três promessas. <em>Mensuráveis.</em>",
    "pil.1.num": "01 · Tempo Recuperado",
    "pil.1.head": "Recupere 15 horas por semana.",
    "pil.1.body": "Aurora responde a hóspedes em menos de 60 segundos. Nova confirma chegadas e saídas com dias de antecedência e agenda a equipa certa por propriedade. Atlas ajusta preços antes de o café arrefecer.",
    "pil.1.metric.val": "80%",
    "pil.1.metric.lbl": "Meta: menos toques operacionais diários",
    "pil.2.num": "02 · Inteligência de Receita",
    "pil.2.head": "Ganhe mais nas noites que já tem.",
    "pil.2.body": "Preços dinâmicos, badge de comparação com OTAs no seu site direto, análise de gaps com estimativas de receita perdida, recuperação de reservas abandonadas.",
    "pil.2.metric.val": "+18–25%",
    "pil.2.metric.lbl": "Meta de RevPAR em 90 dias",
    "pil.3.num": "03 · Conformidade Portuguesa",
    "pil.3.head": "O único PMS que fala a lei portuguesa.",
    "pil.3.body": "Faturação sequencial com IVA, taxa turística por hóspede em 40+ municípios, gestão RNAL, licenças AL. Pagamentos MB Way, nativos.",
    "pil.3.metric.val": "€ 0",
    "pil.3.metric.lbl": "em coimas com conformidade activa. Zero chamadas ao contabilista.",

    // ----- Compare -----
    "cmp.eyebrow": "Comparar",
    "cmp.h2": "Feito para Portugal. <em>Preço de mid-market.</em>",
    "cmp.lede": "PMS globais (Hostaway, Guesty, Lodgify) são capazes — mas nenhum combina IA autónoma profunda, conformidade portuguesa nativa e MB Way a preço mid-market. Essa lacuna é a razão de existir da Portiqa.",
    "cmp.col.portiqa": "Portiqa",
    "cmp.col.global": "PMS Global",
    "cmp.col.excel": "Folha de Excel",
    "cmp.cell.included": "● Incluído",
    "cmp.cell.no": "— Não suportado",
    "cmp.cell.partial": "◐ Limitado",
    "cmp.row.1": "Agentes de IA autónomos (não assistivos)",
    "cmp.row.2": "Conformidade RNAL / AL nativa",
    "cmp.row.3": "Taxa turística por hóspede (por município)",
    "cmp.row.4": "Faturação sequencial com IVA",
    "cmp.row.5": "Pagamentos MB Way nativos",
    "cmp.row.6": "Sync Airbnb + Booking + VRBO + Expedia",
    "cmp.row.7": "Anti-overbooking (sync 5 min + failover)",
    "cmp.row.8": "Site de reserva direta com comparador OTA",
    "cmp.row.9": "Promessa",
    "cmp.price.portiqa": "Compre de volta o seu tempo",
    "cmp.price.global": "Para equipas com ops dedicadas",
    "cmp.price.excel": "Barato em licença, caro em horas",

    // ----- Founder -----
    "fnd.eyebrow": "Porque estamos a construir a Portiqa",
    "fnd.quote": "Vivemos a mensagem das 6 da manhã, o caos do WhatsApp com a limpeza, o pesadelo em Excel da taxa turística. Cada PMS global fez-nos sentir estrangeiros na nossa própria conformidade. Por isso construímos aquele que precisávamos — calmo, português no seu núcleo, com uma equipa de IA a trabalhar enquanto dormimos.",
    "fnd.sig": "— Miguel & Bruno",
    "fnd.sig.sub": "Fundadores da Portiqa · Lisboa & Porto",
    "fnd.sig.linkedin": "LinkedIn em breve",
    "fnd.photo": "[ MIGUEL & BRUNO · LISBOA & PORTO · 2026 ]",

    // ----- Integrations -----
    "int.eyebrow": "Integrações",
    "int.h2": "Liga-se ao stack que <em>já paga.</em>",
    "int.lede": "Canais, pagamentos, documentos e contabilidade — tudo pronto. MB Way e SEPA são de primeira classe, não extras.",
    "int.airbnb": "API nativa · Sync a 5 min",
    "int.booking": "API nativa · reviews + promos",
    "int.vrbo": "API nativa · reservas + calendário",
    "int.expedia": "API nativa · tarifas + inventário",
    "int.mbway": "Pagamentos portugueses nativos",
    "int.sepa": "Débito direto bancário",
    "int.stripe": "Cartões + payouts",
    "int.docusign": "Contratos e assinaturas",

    // ----- Signup -----
    "sig.badge": "Founding 50 · Vagas limitadas",
    "sig.eyebrow": "Acesso antecipado",
    "sig.h2": "Encontre o seu <em>porto</em> na gestão de alojamento.",
    "sig.lede": "A Portiqa está em beta privada com um punhado de gestores portugueses. Os Founding 50 ficam com 30% vitalício, canal direto no Slack com a equipa e primeira palavra no roadmap.",
    "sig.name": "Nome completo",
    "sig.email": "Email",
    "sig.company": "Empresa / marca",
    "sig.units": "Nº de unidades",
    "sig.units.placeholder": "Selecionar…",
    "sig.meta.gdpr": "● Em conformidade com RGPD",
    "sig.meta.card": "● Sem cartão",
    "sig.meta.pilot": "● Piloto de 14 dias",
    "sig.submit": "Reservar a minha vaga →",
    "sig.success.kicker": "✓ Está na lista dos Founding 50",
    "sig.success.thanks": "Obrigado, {name}.",
    "sig.success.body": "Enviaremos um email para <b>{email}</b> quando a sua vaga abrir. Entretanto, responda com qualquer coisa sobre o seu portfólio — lemos cada nota pessoalmente.",

    // ----- FAQ -----
    "faq.eyebrow": "Perguntas frequentes",
    "faq.h2": "Tudo o que os gestores de AL nos perguntam — <em>respondido.</em>",
    "faq.lede": "Se vem aqui vindo do ChatGPT, Perplexity ou Google a tentar perceber se a Portiqa serve para si, estas são as respostas directas.",
    "faq.q1": "O que é a Portiqa?",
    "faq.a1": "A Portiqa é um sistema de gestão de alojamento local (PMS) com IA nativa, construído especificamente para gestores portugueses de arrendamento de curto prazo com 1 a 100 propriedades. Combina sincronização nativa de canais, agentes autónomos de IA (conversas, operações, preços, reviews, conformidade) e a camada portuguesa completa — RNAL, IVA sequencial, taxa turística e pagamentos MB Way.",
    "faq.q2": "Com que canais de reserva é que a Portiqa sincroniza?",
    "faq.a2": "A Portiqa sincroniza de forma nativa — via API — com Airbnb, Booking.com, VRBO e Expedia, com refresh a cada 5 minutos e failover anti-overbooking. Suporta também importação e exportação iCal para canais secundários.",
    "faq.q3": "A Portiqa suporta pagamentos MB Way?",
    "faq.a3": "Sim. Os pagamentos MB Way estão integrados de raiz no checkout directo e nas ligações de pagamento enviadas aos hóspedes. Não é add-on, não tem taxa extra.",
    "faq.q4": "Como é que a Portiqa ajuda na conformidade com RNAL, IVA e taxa turística?",
    "faq.a4": "A Portiqa gera faturação sequencial com IVA de acordo com as regras da Autoridade Tributária, calcula a taxa turística por hóspede em 40+ municípios portugueses (incluindo Lisboa, Porto, Algarve e Madeira com as suas regras específicas) e mantém o registo de licenças AL e alterações RNAL por propriedade. Sai um só relatório pronto para enviar ao contabilista.",
    "faq.q5": "Para quantas unidades é que a Portiqa é indicada?",
    "faq.a5": "A Portiqa está pensada para gestores com 1 a 100 propriedades em Portugal — o perfil que ganha mais ao automatizar operações mas não tem dimensão para um PMS enterprise. Acima de 100 propriedades devemos falar sobre o escalão adequado.",
    "faq.q6": "Quanto custa a Portiqa?",
    "faq.a6": "O preço público ainda não foi anunciado. Os Founding 50 — os primeiros 50 gestores em beta privada — garantem uma vantagem vitalícia sobre o preço final, canal directo de Slack com a equipa fundadora e primeira palavra no roadmap. Reserve vaga para ser dos primeiros a saber.",
    "faq.q7": "Como é que a Portiqa calcula a taxa turística?",
    "faq.a7": "A Portiqa mantém uma tabela actualizada da taxa turística para 40+ municípios portugueses e aplica automaticamente a regra correcta por propriedade, por hóspede, por noite — incluindo limites por estadia, isenções por idade e variações sazonais. Os valores cobrados são reconciliados mensalmente com IVA, prontos para a declaração municipal.",
    "faq.q8": "Qual é a diferença entre a Portiqa e Hostaway, Guesty ou Lodgify?",
    "faq.a8": "Os PMS globais (Hostaway, Guesty, Lodgify) são capazes mas não foram construídos para Portugal. Não fazem conformidade RNAL, faturação sequencial com IVA nem pagamentos MB Way de forma nativa. A Portiqa trata da camada portuguesa de origem e corre agentes de IA autónomos em vez de apenas assistivos — trabalham enquanto o gestor dorme.",
    "faq.q9": "Quem está a construir a Portiqa?",
    "faq.a9": "A Portiqa é fundada por Miguel e Bruno, dois portugueses entre Lisboa e Porto. Os Founding 50 têm canal directo de Slack com ambos os fundadores e influenciam directamente o roadmap do produto.",

    // ----- Footer -----
    "ft.tagline": "O PMS com IA nativa, feito para gestores portugueses de alojamento local. Encontre o seu porto.",
    "ft.copyright": "© 2026 Portiqa · Lisboa & Porto",
    "ft.product": "Produto",
    "ft.company": "Empresa",
    "ft.legal": "Legal",
    "ft.product.constellation": "A Constelação",
    "ft.product.why": "Porquê Portiqa",
    "ft.product.compare": "Comparar",
    "ft.product.integrations": "Integrações",
    "ft.company.team": "Equipa fundadora",
    "ft.company.careers": "Carreiras",
    "ft.company.press": "Imprensa",
    "ft.company.contact": "Contacto",
    "ft.legal.privacy": "Privacidade",
    "ft.legal.terms": "Termos",
    "ft.legal.gdpr": "RGPD",
    "ft.legal.rnal": "RNAL",

    // Outcome captions
    "out.joao": "O convidado recebe resposta antes de si ter acordado.",
    "out.hannah": "Uma dúvida em alemão, resolvida sem tradutor.",
    "out.fill": "A semana toda a organizar-se sozinha.",
    "out.reroute": "Alguém cancelou? Nova re-atribui em segundos.",
    "out.pricing": "Mais € 42 por noite, sem erguer um dedo.",
    "out.review": "Uma review difícil, respondida com calma e em minutos.",
    "out.recovered": "Uma reserva recuperada enquanto trabalhava noutra coisa.",
    "out.marc": "As suas noites voltam a ser suas.",
    "out.sofia": "Uma recomendação pronta, como se fosse da própria casa.",
  },

  en: {
    // ----- Nav -----
    "nav.live": "See it working",
    "nav.problem": "The day",
    "nav.constellation": "The Constellation",
    "nav.pillars": "Why Portiqa",
    "nav.compare": "Compare",
    "nav.about": "About",
    "nav.faq": "FAQ",
    "nav.cta": "Join Founding 50 →",
    "theme.toLight": "Switch to light",
    "theme.toDark": "Switch to dark",
    "theme.light": "Light",
    "theme.dark": "Dark",

    // ----- Hero -----
    "hero.eyebrow.a": "Portiqa · Founding 50 · Private Beta",
    "hero.eyebrow.b": "Founding 50 · Private Beta",
    "hero.eyebrow.c": "Portiqa · est. 2026 · Lisbon & Porto",
    "hero.headline.a": "Your properties never sleep. <em>Neither does Portiqa.</em>",
    "hero.headline.b": "The PMS that gives you back <em>hours of your day</em>.",
    "hero.headline.c": "Find your <em>port</em> in property management.",
    "hero.lede.a": "Six AI agents — a constellation — run your guest messages, pricing, cleaning, invoices and tourist-tax compliance. You keep the hospitality. They take back the hours.",
    "hero.lede.b": "The AI-native PMS for Portuguese short-term rental managers with 1 to 100 properties. Channel sync, autonomous agents, native RNAL & tourist-tax compliance. MB Way ready.",
    "hero.lede.c": "Built for the 1–100 property STR manager in Portugal. Six AI agents handle messages, pricing, cleaning, reviews and compliance. You run hospitality the way it should be — calm, on time, Portuguese.",
    "hero.cta.primary": "Join Founding 50 →",
    "hero.cta.ghost.constellation": "Meet the Constellation",
    "hero.cta.ghost.agents": "Meet the 6 agents",
    "hero.cta.ghost.c": "The Constellation",
    "hero.microproof.a": "Built by a Portuguese team · Lisbon & Porto",
    "hero.microproof.b": "Made by people who know the Portuguese STR market",

    // Logos
    "def.body": "Portiqa is a Portuguese AI-native PMS for managers with 1 to 100 properties.",
    "def.link": "What this includes →",

    "problem.resolution": "This is where Portiqa comes in →",

    "logos.label": "Native sync · 5-minute refresh · Anti-overbooking",

    // See it working
    "sw.eyebrow": "See it working",
    "sw.h2": "A full day of operations — <em>without you in the middle.</em>",
    "sw.lede": "Sixty seconds of a simulated real day. Aurora replies to guests in their language. Nova schedules cleanings and reroutes turnovers. Atlas proposes prices. Vega drafts review replies. An abandoned booking comes back. All in parallel — and your time, back.",
    "sw.pause": "❚❚ Pause",
    "sw.resume": "▶ Resume",
    "sw.cta": "Get this in my day →",
    "sw.foot.caption": "Demo scenario · Targets measured in the Founding 50 private pilot.",
    "sw.foot.1.val": "47s",
    "sw.foot.1.lbl": "average guest response time",
    "sw.foot.2.val": "+€140",
    "sw.foot.2.lbl": "average revenue recovered per week",
    "sw.foot.3.val": "0",
    "sw.foot.3.lbl": "calls to the cleaning team",
    "sw.foot.4.val": "15h",
    "sw.foot.4.lbl": "returned to your week",
    "sw.live": "LIVE",
    "sw.loopbar.live": "Live · continuous loop",
    "sw.activity": "Activity · live",

    "sw.workspace": "Workspace",
    "sw.agents": "Agents",
    "sw.side.inbox": "Inbox",
    "sw.side.arrivals": "Arrivals",
    "sw.side.pricing": "Pricing",
    "sw.side.reviews": "Reviews",
    "sw.side.recovered": "Recovered",
    "sw.badge.new": "new",
    "sw.stat.revenue": "Revenue · Oct",
    "sw.stat.revenue.delta": "+22% vs. last month",
    "sw.stat.occupancy": "Occupancy",
    "sw.stat.occupancy.delta": "13 of 15 nights",
    "sw.stat.response": "Avg. response",
    "sw.stat.response.delta": "Aurora on duty",

    "agent.aurora.role": "Conversations",
    "agent.nova.role": "Operations",
    "agent.atlas.role": "Pricing",
    "agent.vega.role": "Reviews",
    "agent.polaris.role": "Compliance",
    "agent.orion.role": "Orchestrator",

    // Problem
    "problem.eyebrow": "The day without Portiqa",
    "problem.h2": "Sound familiar? <em>A Tuesday in Lisbon.</em>",
    "problem.lede": "This is the job nobody tells you about when you rent out your first unit. Forty-seven browser tabs, three WhatsApps, a spreadsheet and a prayer.",

    // Constellation
    "con.eyebrow": "The Constellation",
    "con.h2": "Six specialists. <em>One dashboard.</em> Your operations, on rails.",
    "con.lede": "Portiqa isn't one AI wearing six hats. It's a team of specialised agents — each with a name, a job, and a clear boundary you set. Four autonomy levels, from <em>suggest</em> to <em>handle it</em>.",

    // Pillars
    "pil.eyebrow": "Why Portiqa",
    "pil.h2": "Three promises. <em>Measurable ones.</em>",
    "pil.1.num": "01 · Time Liberation",
    "pil.1.head": "Buy back 15 hours every week.",
    "pil.1.body": "Aurora replies to guests in under 60 seconds. Nova confirms arrivals and departures days in advance and books the right cleaner per property. Atlas reprices every unit before your coffee cools.",
    "pil.1.metric.val": "80%",
    "pil.1.metric.lbl": "Target: fewer daily ops touches",
    "pil.2.num": "02 · Revenue Intelligence",
    "pil.2.head": "Earn more from nights you already own.",
    "pil.2.body": "Dynamic pricing, OTA-comparison badge on your direct booking site, gap analysis with revenue-loss estimates, abandoned-booking recovery.",
    "pil.2.metric.val": "+18–25%",
    "pil.2.metric.lbl": "RevPAR target in 90 days",
    "pil.3.num": "03 · Portuguese Compliance",
    "pil.3.head": "The only PMS that speaks Portuguese law.",
    "pil.3.body": "Sequential IVA invoicing, per-guest tourist tax in 40+ municipalities, RNAL tracking, AL license management. MB Way payments, native.",
    "pil.3.metric.val": "€ 0",
    "pil.3.metric.lbl": "fines with compliance active. Zero accountant phone calls.",

    // Compare
    "cmp.eyebrow": "Compare",
    "cmp.h2": "Built for Portugal. <em>Priced for mid-market.</em>",
    "cmp.lede": "Global PMS tools (Hostaway, Guesty, Lodgify) are capable — but none combine deep autonomous AI, native Portuguese compliance, and MB Way at mid-market pricing. That gap is the whole reason Portiqa exists.",
    "cmp.col.portiqa": "Portiqa",
    "cmp.col.global": "Global PMS",
    "cmp.col.excel": "Spreadsheet",
    "cmp.cell.included": "● Included",
    "cmp.cell.no": "— Not supported",
    "cmp.cell.partial": "◐ Limited",
    "cmp.row.1": "Autonomous AI agents (not assistive)",
    "cmp.row.2": "Native RNAL / AL compliance",
    "cmp.row.3": "Per-guest tourist tax (per municipality)",
    "cmp.row.4": "Sequential Portuguese IVA invoicing",
    "cmp.row.5": "MB Way payments (native)",
    "cmp.row.6": "Airbnb + Booking + VRBO + Expedia sync",
    "cmp.row.7": "Anti-overbooking (5-min sync + failover)",
    "cmp.row.8": "Direct booking site with OTA price compare",
    "cmp.row.9": "Promise",
    "cmp.price.portiqa": "Buy back your time",
    "cmp.price.global": "For teams with dedicated ops",
    "cmp.price.excel": "Cheap to license, expensive in hours",

    // Founder
    "fnd.eyebrow": "Why we're building Portiqa",
    "fnd.quote": "We've lived the 6am guest message, the WhatsApp cleaning chaos, the spreadsheet nightmare of tourist tax. Every global PMS made us feel like foreigners in our own compliance. So we built the one we needed — calm, Portuguese at its core, with an AI team that works while we sleep.",
    "fnd.sig": "— Miguel & Bruno",
    "fnd.sig.sub": "Portiqa founders · Lisbon & Porto",
    "fnd.sig.linkedin": "LinkedIn coming soon",
    "fnd.photo": "[ MIGUEL & BRUNO · LISBON & PORTO · 2026 ]",

    // Integrations
    "int.eyebrow": "Integrations",
    "int.h2": "Plugs into the stack you <em>already pay for.</em>",
    "int.lede": "Channels, payments, documents and accounting — out of the box. MB Way and SEPA are first-class, not bolt-ons.",
    "int.airbnb": "Native API · 5-min sync",
    "int.booking": "Native API · reviews + promos",
    "int.vrbo": "Native API · bookings + calendar",
    "int.expedia": "Native API · rates + inventory",
    "int.mbway": "Native Portuguese payments",
    "int.sepa": "Bank-native collection",
    "int.stripe": "Card payments + payouts",
    "int.docusign": "Lease & contract e-sign",

    // Signup
    "sig.badge": "Founding 50 · Limited spots",
    "sig.eyebrow": "Early access",
    "sig.h2": "Find your <em>port</em> in property management.",
    "sig.lede": "Portiqa is in private beta with a handful of Portuguese managers. Founding 50 get lifetime 30% off, direct Slack to the team, and first influence on the roadmap.",
    "sig.name": "Full name",
    "sig.email": "Email",
    "sig.company": "Company / brand",
    "sig.units": "Number of units",
    "sig.units.placeholder": "Select…",
    "sig.meta.gdpr": "● GDPR-ready",
    "sig.meta.card": "● No card needed",
    "sig.meta.pilot": "● 14-day pilot",
    "sig.submit": "Reserve my spot →",
    "sig.success.kicker": "✓ You're on the Founding 50 list",
    "sig.success.thanks": "Thank you, {name}.",
    "sig.success.body": "We'll email <b>{email}</b> when your spot opens. In the meantime, reply with anything about your portfolio — we read every note personally.",

    // ----- FAQ -----
    "faq.eyebrow": "Frequently asked questions",
    "faq.h2": "Everything Portuguese STR managers ask us — <em>answered.</em>",
    "faq.lede": "If you're landing here from ChatGPT, Perplexity, or Google trying to figure out whether Portiqa fits you, here are the direct answers.",
    "faq.q1": "What is Portiqa?",
    "faq.a1": "Portiqa is an AI-native property management system (PMS) built specifically for Portuguese short-term rental managers with 1 to 100 properties. It combines native channel sync, autonomous AI agents (conversations, operations, pricing, reviews, compliance), and the full Portuguese stack — RNAL, sequential IVA invoicing, tourist tax, and MB Way payments.",
    "faq.q2": "Which booking channels does Portiqa sync with?",
    "faq.a2": "Portiqa syncs natively — via API — with Airbnb, Booking.com, VRBO, and Expedia, with 5-minute refresh and anti-overbooking failover. iCal import/export is also supported for secondary channels.",
    "faq.q3": "Does Portiqa support MB Way payments?",
    "faq.a3": "Yes. MB Way payments are built into the direct-booking checkout and guest payment links. Not an add-on, no extra fees.",
    "faq.q4": "How does Portiqa handle RNAL, IVA, and tourist-tax compliance?",
    "faq.a4": "Portiqa generates sequential IVA invoices to Portuguese Tax Authority rules, calculates per-guest tourist tax in 40+ Portuguese municipalities (Lisbon, Porto, Algarve, and Madeira with their specific rules), and tracks AL licenses and RNAL changes per property. One report, ready to hand to your accountant.",
    "faq.q5": "How many units is Portiqa built for?",
    "faq.a5": "Portiqa targets managers with 1 to 100 properties in Portugal — the tier that gains the most from automation but isn't big enough for enterprise PMS. Above 100 properties, let's talk about the right pricing tier.",
    "faq.q6": "How much does Portiqa cost?",
    "faq.a6": "Public pricing hasn't been announced yet. Founding 50 — the first 50 managers in private beta — lock in a lifetime advantage on the final price, a direct Slack channel with the founding team, and first say on the roadmap. Reserve a spot to be among the first to know.",
    "faq.q7": "How does Portiqa calculate tourist tax?",
    "faq.a7": "Portiqa keeps an up-to-date tourist-tax table for 40+ Portuguese municipalities and applies the right rule per property, per guest, per night — including stay caps, age exemptions, and seasonal variations. Amounts collected are reconciled monthly with IVA and ready for municipal filings.",
    "faq.q8": "How is Portiqa different from Hostaway, Guesty, or Lodgify?",
    "faq.a8": "Global PMS tools (Hostaway, Guesty, Lodgify) are capable but weren't built for Portugal. They don't natively handle RNAL, sequential IVA invoicing, or MB Way. Portiqa treats the Portuguese layer as first-class and runs autonomous AI agents — working while you sleep — rather than merely assistive ones.",
    "faq.q9": "Who is building Portiqa?",
    "faq.a9": "Portiqa is founded by Miguel and Bruno, two Portuguese founders between Lisbon and Porto. Founding 50 members get a direct Slack channel with both founders and shape the product roadmap.",

    // Footer
    "ft.tagline": "The AI-native PMS for Portuguese short-term rental managers. Find your port.",
    "ft.copyright": "© 2026 Portiqa · Lisbon & Porto",
    "ft.product": "Product",
    "ft.company": "Company",
    "ft.legal": "Legal",
    "ft.product.constellation": "The Constellation",
    "ft.product.why": "Why Portiqa",
    "ft.product.compare": "Compare",
    "ft.product.integrations": "Integrations",
    "ft.company.team": "Founding team",
    "ft.company.careers": "Careers",
    "ft.company.press": "Press",
    "ft.company.contact": "Contact",
    "ft.legal.privacy": "Privacy",
    "ft.legal.terms": "Terms",
    "ft.legal.gdpr": "GDPR",
    "ft.legal.rnal": "RNAL",

    // Outcome captions — EN tone: active, direct
    "out.joao": "Your guest gets an answer before you wake up.",
    "out.hannah": "A German question, handled without a translator.",
    "out.fill": "The whole week schedules itself.",
    "out.reroute": "Someone cancelled? Nova reassigns in seconds.",
    "out.pricing": "+€42 per night — without lifting a finger.",
    "out.review": "A tough review, answered with calm in minutes.",
    "out.recovered": "A booking recovered while you worked on something else.",
    "out.marc": "Your evenings belong to you again.",
    "out.sofia": "A recommendation ready, as if from the host herself.",
  },
};

function detectLang() {
  if (!isClient) return DEFAULT_LANG;
  const saved = safeStorage.get("portiqa_lang", LANGS);
  if (saved) return saved;
  const browser = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  return browser.startsWith("pt") ? "pt" : "en";
}

function LangProvider({ children }) {
  const [lang, setLangState] = React.useState(detectLang);
  const setLang = (l) => {
    setLangState(l);
    safeStorage.set("portiqa_lang", l);
    document.documentElement.lang = l === "pt" ? "pt-PT" : "en";
  };
  React.useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
  }, [lang]);
  const t = React.useMemo(() => (key, vars) => {
    let s = (DICT[lang] && DICT[lang][key]) || (DICT.en && DICT.en[key]) || key;
    if (vars) for (const k in vars) s = s.replace(new RegExp(`\\{${k}\\}`, "g"), vars[k]);
    return s;
  }, [lang]);
  return React.createElement(LangContext.Provider, { value: { lang, setLang, t } }, children);
}

function useT() {
  const ctx = React.useContext(LangContext);
  return ctx;
}

function LangToggle() {
  const { lang, setLang } = useT();
  const other = lang === "pt" ? "en" : "pt";
  return (
    <button
      className="lang-switch"
      onClick={() => setLang(other)}
      aria-label={`Switch to ${other === "pt" ? "Português" : "English"}`}
      title={other === "pt" ? "Mudar para Português" : "Switch to English"}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
      </svg>
      <span className="lang-switch-label">
        <span className={"lang-switch-code" + (lang === "pt" ? " active" : "")}>PT</span>
        <span className="lang-switch-slash">/</span>
        <span className={"lang-switch-code" + (lang === "en" ? " active" : "")}>EN</span>
      </span>
    </button>
  );
}

// Add i18n keys for Dashboard
Object.assign(DICT.pt, {
  "db.workspace": "Espaço de trabalho",
  "db.overview": "Visão geral",
  "db.calendar": "Calendário",
  "db.bookings": "Reservas",
  "db.channels": "Canais",
  "db.agents": "Agentes",
  "db.aurora": "Aurora · Hóspedes",
  "db.atlas": "Atlas · Preços",
  "db.nova": "Nova · Operações",
  "db.compliance": "Conformidade",
  "db.rnal": "RNAL · IVA",
  "db.revenue": "Receita · Out",
  "db.revenue.delta": "+22% vs. mês passado",
  "db.occupancy": "Ocupação",
  "db.occupancy.delta": "12 de 13 noites",
  "db.response": "Resposta média",
  "db.response.delta": "Aurora de serviço",
  "db.atlas.suggest": "<b>Atlas</b> — Sugiro subir a Algarve Villa 8% para o fim de semana de 24. Três concorrentes OTA estão 14% acima e a ocupação está apertada.",
  "db.suggest.meta": "Sugestão · o senhor decide",
  "db.col.unit": "Unidade",
  "db.col.guest": "Hóspede",
  "db.col.channel": "Canal",
  "db.col.status": "Estado",
  "db.status.checkin": "Check-in hoje",
  "db.status.confirmed": "Confirmado",
  "db.status.aurora": "Aurora a responder",
  "db.status.nova": "Nova · limpeza agendada",
  "db.direct": "Direto",
});
Object.assign(DICT.en, {
  "db.workspace": "Workspace",
  "db.overview": "Overview",
  "db.calendar": "Calendar",
  "db.bookings": "Bookings",
  "db.channels": "Channels",
  "db.agents": "Agents",
  "db.aurora": "Aurora · Guest",
  "db.atlas": "Atlas · Pricing",
  "db.nova": "Nova · Operations",
  "db.compliance": "Compliance",
  "db.rnal": "RNAL · IVA",
  "db.revenue": "Revenue · Oct",
  "db.revenue.delta": "+22% vs. last month",
  "db.occupancy": "Occupancy",
  "db.occupancy.delta": "12 of 13 nights",
  "db.response": "Avg. response",
  "db.response.delta": "Aurora on duty",
  "db.atlas.suggest": "<b>Atlas</b> — I'd raise the Algarve Villa by 8% for the weekend of the 24th. Three OTA competitors are priced 14% above you and occupancy is tight.",
  "db.suggest.meta": "Suggestion · you decide",
  "db.col.unit": "Unit",
  "db.col.guest": "Guest",
  "db.col.channel": "Channel",
  "db.col.status": "Status",
  "db.status.checkin": "Check-in today",
  "db.status.confirmed": "Confirmed",
  "db.status.aurora": "Aurora replying",
  "db.status.nova": "Nova · cleaner booked",
  "db.direct": "Direct",
});

Object.assign(DICT.pt, {
  // see-working additional keys
  "sw.side.inbox2": "Inbox",
  "sw.side.arrivals2": "Chegadas",
  "sw.side.pricing2": "Preços",
  "sw.side.reviews2": "Reviews",
  "sw.side.recovered2": "Recuperadas",
  "sw.live.workspace": "Espaço de trabalho",
  "sw.live.agents": "Agentes",
  "sw.live.new": "novo",
  "sw.live.revenue": "Receita · Out",
  "sw.live.revdelta": "+22% vs. mês passado",
  "sw.live.occ": "Ocupação",
  "sw.live.occdelta": "13 de 15 noites",
  "sw.live.resp": "Resposta média",
  "sw.live.respdelta": "Aurora de serviço",
  "sw.live.activity": "Atividade · em direto",
  "sw.live.live": "AO VIVO",
  "sw.now": "agora",

  // inbox
  "ib.respin": "Resposta em {sec}s",
  "ib.meta.joao": "PT · autónomo · aprovado por si",
  "ib.meta.hannah": "PT · DE detectado · autónomo",
  "ib.meta.marc": "PT · FR detectado · autónomo",
  "ib.meta.sofia": "PT · local · autónomo",
  "ib.reply.joao": "Olá João, sem problema — tem check-in flexível até às 23h. Deixo-lhe as instruções no portal. Boa viagem!",
  "ib.reply.hannah": "Olá Hannah, sim — há um parque coberto a 120 metros (€12/noite). Envio-lhe a morada e um mapa no check-in. Boa viagem!",
  "ib.reply.marc": "Bonsoir Marc, a piscina está aquecida até 28°C todo o ano. Wi-Fi fibra 500 Mbps, perfeito para teletrabalho. Até breve!",
  "ib.reply.sofia": "Olá Sofia! A 3 min a pé tem o Zé da Mouraria — bacalhau à brás excelente, cheio de locais. Reserve já, enche cedo. Bom apetite!",

  // arrivals
  "ar.fill.kicker": "Sábado · dia de turnarounds",
  "ar.fill.title": "A agenda do dia a encaixar-se",
  "ar.fill.meta": "Nova · {n} de 5 agendadas",
  "ar.legend.internal": "Equipa interna",
  "ar.legend.external": "Fornecedor externo",
  "ar.legend.checkout": "Check-out",
  "ar.legend.checkin": "Check-in",
  "ar.reroute.kicker": "Imprevisto às 09h14",
  "ar.reroute.title": "Miguel cancelou · Nova já tratou disto",
  "ar.reroute.s0": "Agenda estável",
  "ar.reroute.s1": "Conflito detectado",
  "ar.reroute.s2": "A procurar substituto…",
  "ar.reroute.s3": "✓ Re-atribuído",
  "ar.search": "a procurar…",

  // pricing
  "pr.kicker": "Algarve Villa · próximo fim de semana",
  "pr.title": "Atlas sugere ajuste de preços",
  "pr.meta.accepted": "Aprovado · aplicado",
  "pr.meta.pending": "A aguardar a sua aprovação",
  "pr.atlas.rec": "<b>Atlas</b> · 3 concorrentes na sua rua estão 14% acima. Proponho +€28 à noite para o fim de semana.",
  "pr.atlas.est.lbl": "Receita estimada:",
  "pr.atlas.est.val": "+€ 140 nas próximas 5 noites",
  "pr.d.fri": "Sex",
  "pr.d.sat": "Sáb",
  "pr.d.sun": "Dom",
  "pr.d.mon": "Seg",
  "pr.d.tue": "Ter",

  // reviews
  "rv.kicker": "Nova review · Booking.com",
  "rv.title": "Laura M. · 3 estrelas · Baixa Studio",
  "rv.meta": "Vega · resposta a rever",
  "rv.in": "“Ótima localização, mas o barulho da rua à noite foi difícil. O apartamento em si é lindo e muito limpo.”",
  "rv.tag.loc": "+ localização",
  "rv.tag.clean": "+ limpeza",
  "rv.tag.noise": "− ruído noturno",
  "rv.draft": "Obrigado pelo seu feedback, Laura. Lamentamos o som na rua — é algo que já sinalizámos com a câmara municipal e que trabalhamos para resolver. Adorámos receber-vos e esperamos voltar a ter-vos em Lisboa.",
  "rv.draft.lbl": "Vega · rascunho",
  "rv.draft.meta": "Pronto a enviar · editável",

  // abandoned
  "ab.kicker": "Reserva em aberto · há 2h",
  "ab.title": "Sintra Cottage · 4 noites · € 520",
  "ab.meta.done": "Confirmada",
  "ab.meta.pending": "Vega · a recuperar",
  "ab.s0.t": "Carrinho abandonado",
  "ab.s0.s": "O hóspede saiu no checkout — 3 noites, Sintra",
  "ab.s1.t.done": "Email enviado · -8%",
  "ab.s1.t.wait": "Vega a preparar email",
  "ab.s1.s": "Desconto personalizado baseado no histórico",
  "ab.s2.t.done": "Hóspede abriu · clicou",
  "ab.s2.t.wait": "A aguardar resposta",
  "ab.s2.s": "Regressou à página de reserva",
  "ab.s3.t.done": "✓ Reserva confirmada · € 478",
  "ab.s3.t.wait": "A confirmar…",
  "ab.s3.s.done": "Receita recuperada sem levantar um dedo.",
  "ab.s3.s.wait": "Vega processa o pagamento",

  // agents roles (already defined partially above but need consistency)
  "agents.aurora.role": "Conversas",
  "agents.nova.role": "Operações",
  "agents.atlas.role": "Preços",
  "agents.vega.role": "Reviews",
  "agents.polaris.role": "Conformidade",
  "agents.orion.role": "Orquestrador",

  // micro-beats (feed)
  "beat.joao.micro": "Aurora · a responder João em 47s",
  "beat.hannah.micro": "Mensagem resolvida · DE → PT",
  "beat.fill.micro": "Nova · 5 turnarounds agendados para sábado",
  "beat.reroute.micro": "Miguel indisponível · Cleanify substitui às 11h",
  "beat.pricing.micro": "Atlas · sugestão aprovada",
  "beat.review.micro": "Vega · resposta pronta para rever",
  "beat.abandoned.micro": "Desconto -8% · reserva confirmada",
  "beat.marc.micro": "Aurora · a responder Marc",
  "beat.sofia.micro": "Aurora · a sugerir restaurantes a Sofia",

  // inbox meta header
  "ib.head.kicker": "Inbox · {channel}",
});

Object.assign(DICT.en, {
  "sw.side.inbox2": "Inbox",
  "sw.side.arrivals2": "Arrivals",
  "sw.side.pricing2": "Pricing",
  "sw.side.reviews2": "Reviews",
  "sw.side.recovered2": "Recovered",
  "sw.live.workspace": "Workspace",
  "sw.live.agents": "Agents",
  "sw.live.new": "new",
  "sw.live.revenue": "Revenue · Oct",
  "sw.live.revdelta": "+22% vs. last month",
  "sw.live.occ": "Occupancy",
  "sw.live.occdelta": "13 of 15 nights",
  "sw.live.resp": "Avg. response",
  "sw.live.respdelta": "Aurora on duty",
  "sw.live.activity": "Activity · live",
  "sw.live.live": "LIVE",
  "sw.now": "now",

  "ib.respin": "Responded in {sec}s",
  "ib.meta.joao": "PT · autonomous · approved by you",
  "ib.meta.hannah": "PT · DE detected · autonomous",
  "ib.meta.marc": "PT · FR detected · autonomous",
  "ib.meta.sofia": "PT · local · autonomous",
  "ib.reply.joao": "Hi João, no problem — your check-in is flexible until 11pm. I'll drop the instructions in the portal. Safe travels!",
  "ib.reply.hannah": "Hi Hannah, yes — there's a covered garage 120 m away (€12/night). I'll send the address and a map at check-in. Safe drive!",
  "ib.reply.marc": "Bonsoir Marc, the pool is heated to 28°C year-round. 500 Mbps fibre Wi-Fi, perfect for remote work. See you soon!",
  "ib.reply.sofia": "Hi Sofia! 3 minutes on foot is Zé da Mouraria — excellent bacalhau à brás, full of locals. Book early, it fills up. Enjoy!",

  "ar.fill.kicker": "Saturday · turnover day",
  "ar.fill.title": "The day's schedule clicks into place",
  "ar.fill.meta": "Nova · {n} of 5 scheduled",
  "ar.legend.internal": "Internal team",
  "ar.legend.external": "External vendor",
  "ar.legend.checkout": "Check-out",
  "ar.legend.checkin": "Check-in",
  "ar.reroute.kicker": "Unexpected at 09:14",
  "ar.reroute.title": "Miguel cancelled · Nova already handled it",
  "ar.reroute.s0": "Schedule stable",
  "ar.reroute.s1": "Conflict detected",
  "ar.reroute.s2": "Finding a replacement…",
  "ar.reroute.s3": "✓ Reassigned",
  "ar.search": "searching…",

  "pr.kicker": "Algarve Villa · next weekend",
  "pr.title": "Atlas suggests a price adjustment",
  "pr.meta.accepted": "Approved · applied",
  "pr.meta.pending": "Waiting for your approval",
  "pr.atlas.rec": "<b>Atlas</b> · 3 competitors on your street are priced 14% above. I suggest +€28/night for the weekend.",
  "pr.atlas.est.lbl": "Estimated revenue:",
  "pr.atlas.est.val": "+€ 140 over the next 5 nights",
  "pr.d.fri": "Fri",
  "pr.d.sat": "Sat",
  "pr.d.sun": "Sun",
  "pr.d.mon": "Mon",
  "pr.d.tue": "Tue",

  "rv.kicker": "New review · Booking.com",
  "rv.title": "Laura M. · 3 stars · Baixa Studio",
  "rv.meta": "Vega · reply to review",
  "rv.in": "“Great location, but the street noise at night was tough. The apartment itself is lovely and very clean.”",
  "rv.tag.loc": "+ location",
  "rv.tag.clean": "+ cleanliness",
  "rv.tag.noise": "− night noise",
  "rv.draft": "Thank you for your feedback, Laura. We're sorry about the street noise — we've flagged it with the city council and continue working on it. We loved hosting you and hope to welcome you back to Lisbon.",
  "rv.draft.lbl": "Vega · draft",
  "rv.draft.meta": "Ready to send · editable",

  "ab.kicker": "Open booking · 2h ago",
  "ab.title": "Sintra Cottage · 4 nights · € 520",
  "ab.meta.done": "Confirmed",
  "ab.meta.pending": "Vega · recovering",
  "ab.s0.t": "Cart abandoned",
  "ab.s0.s": "Guest dropped at checkout — 3 nights, Sintra",
  "ab.s1.t.done": "Email sent · -8%",
  "ab.s1.t.wait": "Vega drafting email",
  "ab.s1.s": "Personalised discount based on history",
  "ab.s2.t.done": "Guest opened · clicked",
  "ab.s2.t.wait": "Waiting for response",
  "ab.s2.s": "Returned to the booking page",
  "ab.s3.t.done": "✓ Booking confirmed · € 478",
  "ab.s3.t.wait": "Confirming…",
  "ab.s3.s.done": "Revenue recovered without lifting a finger.",
  "ab.s3.s.wait": "Vega processing the payment",

  "agents.aurora.role": "Conversations",
  "agents.nova.role": "Operations",
  "agents.atlas.role": "Pricing",
  "agents.vega.role": "Reviews",
  "agents.polaris.role": "Compliance",
  "agents.orion.role": "Orchestrator",

  "beat.joao.micro": "Aurora · replying to João in 47s",
  "beat.hannah.micro": "Message resolved · DE → PT",
  "beat.fill.micro": "Nova · 5 turnarounds scheduled for Saturday",
  "beat.reroute.micro": "Miguel unavailable · Cleanify covers at 11:00",
  "beat.pricing.micro": "Atlas · suggestion approved",
  "beat.review.micro": "Vega · reply ready to review",
  "beat.abandoned.micro": "Discount -8% · booking confirmed",
  "beat.marc.micro": "Aurora · replying to Marc",
  "beat.sofia.micro": "Aurora · suggesting restaurants to Sofia",

  "ib.head.kicker": "Inbox · {channel}",
});

export { LangContext, LangProvider, useT, LangToggle, DICT };
