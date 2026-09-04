# Loop SEO portiqa.io — objetivo: 80–150 visitas/mês da cauda longa AL (4–8 semanas)

Aprovado pelo Miguel 2026-09-02. Ordem dos guias por volume real (Keyword Planner PT):
RNAL (5 400+880+320) → SIBA/AIMA (2 400) → seguro AL (320, +50%) → fiscal (IVA/modelo 30/taxa turística/impostos ~700) → comparativos (TalkGuest 3 600, Hostkit 880...).
Cauda longa embutida como H2/FAQ nos guias (nunca páginas finas).

## Guia 1 — RNAL (/guias/rnal-registo-alojamento-local)
- [x] Keyword research (Ads: termos de pesquisa + Keyword Planner, 2026-09-02)
- [x] Dossier legal verificado (subagente, ~35 fontes, guia TdP jan-2025 íntegra)
- [x] Infra /guias: content/guias/index.js + manual.jsx parametrizado + main.jsx + prerender + sitemap + llms.txt
- [x] Guia escrito (master em ~/Marketing Portiqa/guias/; TLDR + 6 takeaways + 8 FAQ; fontes oficiais)
- [x] Build verificado (8 rotas; FAQPage 8 Q; /al-com-ai byte-identical)
- [x] Commit bca763a + PR #1 + preview Vercel — deploy prod só com OK do Miguel
- [x] Pós-deploy: sitemap resubmetido via API 2026-09-04 (antes: 7 URLs submetidos, 0 indexados). Opcional: Miguel pedir indexação por URL na UI do GSC (/guias e /guias/rnal-...) — acelera dias

## Bloqueadores
- [resolvido 2026-09-02] GSC portiqa.io: service account adicionado, acesso Completo confirmado; baseline: 1 clique / 8 impressões (jun-ago). Ver HANDOFF-SEO.md

## Guia 2 — SIBA/AIMA (/guias/siba-comunicacao-hospedes) — em curso 2026-09-04
- [x] Keyword research (reaproveitado de 2026-09-02: siba sef 2 400/mês +24%; aima 40; \"comunicar hóspedes sef\" = 0 → título lidera com SIBA)
- [x] Dossier legal verificado (subagente, ~25 fontes; CORREÇÃO: SIBA é da UCFE/SSI, não da AIMA — blogs todos errados)
- [x] Guia escrito (master em ~/Marketing Portiqa/guias/; TLDR + 6 takeaways + 8 FAQ; ~1.900 palavras)
- [x] Entrada em src/content/guias/index.js + bullet no llms.txt + sitemap + interlink no guia 1
- [x] Build verificado (sitemap 10 URLs; FAQPage 8 Q; páginas não tocadas idênticas exceto hash do bundle)
- [ ] Branch + PR + preview — deploy prod só com OK do Miguel

## Depois
- [ ] Guia 3 seguro · cluster fiscal · comparativos
- [ ] Queries GEO derivadas dos guias publicados (regra: medição só depois do conteúdo)
- [ ] Rotina/loop mensal portiqa (formato "Mensagem final")
