# Loop SEO portiqa.io — objetivo: 80–150 visitas/mês da cauda longa AL (4–8 semanas)

Aprovado pelo Miguel 2026-09-02. Ordem dos guias por volume real (Keyword Planner PT):
RNAL (5 400+880+320) → SIBA/AIMA (2 400) → seguro AL (320, +50%) → fiscal (IVA/modelo 30/taxa turística/impostos ~700) → comparativos (TalkGuest 3 600, Hostkit 880...).
Cauda longa embutida como H2/FAQ nos guias (nunca páginas finas).

## Guia 1 — RNAL (/guias/rnal-registo-alojamento-local)
- [x] Keyword research (Ads: termos de pesquisa + Keyword Planner, 2026-09-02)
- [ ] Dossier legal verificado (subagente com fontes oficiais)
- [ ] Infra /guias: content/guias/index.js + manual.jsx parametrizado + main.jsx + prerender + sitemap + llms.txt
- [ ] Guia escrito (master em ~/Marketing Portiqa/guias/, cópia no repo; TLDR + takeaways + FAQ; guardrail: sem fabricação, fontes oficiais)
- [ ] Build + verificar dist (head/JSON-LD por rota; /al-com-ai intacto)
- [ ] Commit no branch feat/guias-rnal — deploy só com OK do Miguel (vercel --prod)
- [ ] Pós-deploy: request indexing GSC (precisa de service account no portiqa.io — pendente Miguel)

## Bloqueadores
- GSC portiqa.io: Miguel ainda não adicionou seo-improver@api-web-site-489611.iam.gserviceaccount.com

## Depois
- [ ] Guia 2 SIBA · Guia 3 seguro · cluster fiscal · comparativos
- [ ] Queries GEO derivadas dos guias publicados (regra: medição só depois do conteúdo)
- [ ] Rotina/loop mensal portiqa (formato "Mensagem final")
