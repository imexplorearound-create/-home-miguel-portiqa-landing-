// Guias práticos de alojamento local — hub /guias.
// Mesmo modelo do AL com AI (fonte de verdade única: páginas, <head>, sitemap, prerender).
// Os corpos vêm dos .md verbatim; helpers partilhados com a coleção AL com AI.
import { renderMarkdown, readingMinutes } from "../al-com-ai/index.js";
import rnalMd from "./rnal-registo-alojamento-local.md?raw";

export const SITE = "https://portiqa.io";
export const GUIAS_BASE = "/guias";

export const GUIAS = {
  path: GUIAS_BASE,
  title: "Guias de alojamento local",
  seoTitle: "Guias práticos de alojamento local em Portugal",
  description:
    "Guias práticos e verificados sobre alojamento local em Portugal: registo RNAL, comunicação de hóspedes (SIBA/AIMA), impostos, taxa turística e obrigações do dia a dia. Escritos por um operador real.",
  intro:
    "Registo, obrigações legais, impostos e operação do alojamento local em Portugal, explicados por quem gere ~20 apartamentos no Porto. Informação verificada em fontes oficiais e atualizada — sem rodeios.",
};

// ---- guias ----------------------------------------------------------------

const RAW = {
  "rnal-registo-alojamento-local": {
    guia: 1,
    md: rnalMd,
    title: "Registo de alojamento local (RNAL) em 2026: o guia completo",
    seoTitle: "RNAL: como registar um alojamento local em 2026",
    description:
      "Como registar um alojamento local em 2026: passo a passo no Balcão Único, documentos, prazos, custos, zonas de contenção no Porto e em Lisboa, e coimas.",
    published: "2026-09-02",
    updated: "2026-09-02",
    keywords: [
      "registo alojamento local",
      "rnal",
      "como abrir um alojamento local",
      "licença alojamento local",
      "placa alojamento local",
      "áreas de contenção alojamento local",
      "alojamento local o que é",
    ],
    tldr:
      "O registo de alojamento local (RNAL) faz-se online no Balcão Único Eletrónico, por comunicação prévia dirigida à câmara municipal, sem taxa nacional. A câmara tem 60 dias para se opor (90 em áreas de contenção); sem oposição, recebes o número de registo, obrigatório em toda a publicidade. Desde novembro de 2024 o registo não caduca nem precisa de renovação, e o condomínio só autoriza previamente no caso dos hostels. Antes de avançar, verifica se a tua freguesia aceita novos registos — no centro do Porto e de Lisboa várias estão fechadas — e prepara autorização de utilização, seguro de 75.000 € e requisitos de segurança.",
    takeaways: [
      "O registo é 100% online no Balcão Único Eletrónico (ePortugal), sem taxa nacional; a câmara tem 60 dias para se opor (90 em áreas de contenção) e pode fazer vistoria nesse prazo.",
      "Desde o DL 76/2024: o registo tem duração indeterminada (não caduca nem se renova), o condomínio deixou de autorizar previamente (exceto hostels) e a transmissão do registo voltou a ser possível.",
      "Limites de capacidade: 9 quartos e 27 utentes (2 por quarto, +2 na sala em moradias e apartamentos); na modalidade quartos, máximo 3 na tua própria residência.",
      "Obrigatórios: placa AL junto à entrada, seguro de responsabilidade civil de 75.000 € (a falta é motivo de cancelamento do registo), extintor + manta + indicação do 112, livros de reclamações físico e eletrónico, e livro de informações em 4 línguas.",
      "Zonas fechadas em 2026: no Porto, Vitória, São Nicolau, Sé, Santo Ildefonso e Miragaia; em Lisboa, contenção absoluta nas freguesias com rácio ≥10%. O DL 151/2026 permite a outros municípios suspender novos registos até 31-12-2026 — confirmar sempre antes de investir.",
      "Depois do registo: SIBA em 3 dias úteis por hóspede estrangeiro, taxa turística (Porto 3 €, Lisboa 4 €, máx. 7 noites), faturação com IVA a 6% ou isenção do art. 53.º até 15.000 €, e Modelo 30 sobre comissões de plataformas estrangeiras.",
    ],
    faq: [
      {
        q: "O registo de alojamento local caduca ou precisa de renovação?",
        a: "Não. Desde o Decreto-Lei 76/2024 (em vigor a 1 de novembro de 2024), o registo tem duração indeterminada — a validade de 5 anos do pacote Mais Habitação foi revogada. Mas o registo pode ser cancelado pelo município: por falta de seguro válido, desconformidades, violação das regras da área de contenção ou oposição procedente do condomínio.",
      },
      {
        q: "O condomínio pode impedir o meu alojamento local?",
        a: "Não pode impedir à partida, exceto no caso dos hostels (que precisam de ata de autorização). Pode opor-se mais tarde, por deliberação de mais de metade da permilagem, com fundamento em perturbação reiterada e comprovada — e a decisão final cabe ao presidente da câmara. Pode ainda proibir o AL no regulamento por 2/3, mas só com efeitos para pedidos futuros.",
      },
      {
        q: "Quantos quartos e hóspedes posso ter num alojamento local?",
        a: "No máximo 9 quartos e 27 utentes (2 por quarto, mais 2 na sala em moradias e apartamentos). Os hostels não têm limite de utentes. Na modalidade quartos — na tua própria residência — o máximo são 3 quartos.",
      },
      {
        q: "A placa de alojamento local é obrigatória? Onde se compra?",
        a: "É obrigatória em todas as modalidades, afixada junto à entrada. O modelo é fixo (Portaria 262/2020): acrílico transparente de 200×200 mm com as letras AL em azul-escuro; existe versão interior de 100×100 mm. Compra-se a qualquer fornecedor que cumpra o modelo, por cerca de 30 €. Não a afixar dá coima de 150 € a 500 € (pessoas singulares).",
      },
      {
        q: "Posso registar quartos na minha própria casa?",
        a: "Sim — é a modalidade «quartos», limitada a 3 quartos na tua residência (o teu domicílio fiscal). O processo de registo é o mesmo das outras modalidades, no Balcão Único Eletrónico.",
      },
      {
        q: "Preciso de abrir empresa para ter alojamento local?",
        a: "Não. Podes operar como empresário em nome individual — basta abrir atividade nas Finanças com o CAE 55201 (alojamento mobilado para turistas) ou 55204 antes de submeter a comunicação prévia. A maioria dos pequenos operadores fica no regime de isenção de IVA do artigo 53.º (até 15.000 € de volume de negócios anual).",
      },
      {
        q: "Onde posso consultar a lei do alojamento local?",
        a: "O regime jurídico é o Decreto-Lei 128/2014, na versão consolidada no Diário da República (dre.pt). O Turismo de Portugal publica um guia técnico oficial em PDF que consolida tudo, incluindo as alterações do DL 76/2024 — é a melhor fonte única para operadores.",
      },
      {
        q: "O que mudou nas regras do alojamento local em 2026?",
        a: "Três coisas: o Regulamento europeu 2024/1028 aplica-se desde 20 de maio de 2026 (as plataformas têm de verificar os números de registo dos anúncios); o DL 151/2026 permite aos municípios com mais de 1.000 registos suspender temporariamente novos registos até 31-12-2026 enquanto aprovam regulamentos; e Lisboa, com o regulamento de dezembro de 2025, cancelou em fevereiro de 2026 cerca de 6.765 registos sem seguro válido ou inativos.",
      },
    ],
  },
};

export const GUIA_ARTICLES = Object.entries(RAW).map(([slug, a]) => ({
  slug,
  path: `${GUIAS_BASE}/${slug}`,
  canonical: `${SITE}${GUIAS_BASE}/${slug}`,
  guia: a.guia,
  title: a.title,
  seoTitle: a.seoTitle,
  description: a.description,
  keywords: a.keywords,
  published: a.published,
  updated: a.updated,
  readingMinutes: readingMinutes(a.md),
  tldr: a.tldr,
  takeaways: a.takeaways,
  faq: a.faq,
  html: renderMarkdown(a.md),
}));

export function getGuia(slug) {
  return GUIA_ARTICLES.find((a) => a.slug === slug) || null;
}

// Rotas dos guias (para prerender + sitemap).
export const GUIAS_ROUTES = [
  { path: GUIAS_BASE, kind: "hub" },
  ...GUIA_ARTICLES.map((a) => ({ path: a.path, kind: "article", slug: a.slug })),
];
