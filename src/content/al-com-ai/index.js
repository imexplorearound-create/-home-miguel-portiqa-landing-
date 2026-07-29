// AL com AI — hub-and-spoke content model.
// Fonte de verdade única: alimenta as páginas, o <head>, o sitemap e o prerender.
// Os corpos vêm dos .md verbatim (revistos e referenciados); todo o processamento
// é feito aqui em runtime — zero transcrição manual de prosa.

import { marked } from "marked";
import descobertaMd from "./descoberta.md?raw";
import pricingMd from "./pricing.md?raw";
import comunicacaoMd from "./comunicacao.md?raw";
import gestaoMd from "./gestao-operacional.md?raw";

export const SITE = "https://portiqa.pt";
export const MANUAL_BASE = "/al-com-ai";

export const MANUAL = {
  path: MANUAL_BASE,
  title: "AL com AI",
  seoTitle: "AL com AI — inteligência artificial na gestão de alojamento local",
  description:
    "Artigos práticos, sem hype, sobre inteligência artificial na gestão de alojamento local em Portugal: descoberta, pricing, comunicação e operação. Escritos por um operador real.",
  intro:
    "Inteligência artificial na gestão de alojamento local, explicada por quem opera ~20 apartamentos no Porto. Sem hype: o que a tecnologia já resolve, o que continua a exigir decisão humana e como medir resultados.",
};

// Autor — sinais E-E-A-T reais (sem fabricar perfis externos).
export const AUTHOR = {
  name: "Miguel Martins",
  role: "Fundador da Portiqa · operador de alojamento local (Vibrant Host, ~20 apartamentos no Porto)",
  bio: "Miguel Martins gere cerca de 20 apartamentos de alojamento local no Porto através da Vibrant Host e está a construir a Portiqa, um PMS português com IA nativa. Escreve a partir de operação real: o que a tecnologia resolve, o que continua a exigir decisão humana e como medir o que interessa.",
  url: `${SITE}/`,
};

// ---- processamento de markdown -------------------------------------------

// Slug igual ao usado nos índices internos dos artigos (mantém âncoras e TOC).
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s/g, "-");
}

function stripFrontmatter(md) {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function stripFirstH1(md) {
  return md.replace(/^\s*#\s+.*\r?\n+/, "");
}

// CTAs internos dos .md apontam para páginas ainda inexistentes → funil real.
function rewriteCtaLinks(md) {
  return md
    .replaceAll("/kit-pratico-al-com-ai", "/#signup")
    .replaceAll("/founding-20", "/#signup");
}

// Adiciona id="slug" a h2..h4 (marked não o faz) → deep-links, TOC e GEO.
function addHeadingIds(html) {
  return html.replace(/<(h[2-4])>([\s\S]*?)<\/\1>/g, (m, tag, inner) => {
    const id = slugify(inner);
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
}

export function renderMarkdown(md) {
  const body = rewriteCtaLinks(stripFirstH1(stripFrontmatter(md)));
  const html = marked.parse(body, { async: false });
  return addHeadingIds(html);
}

function wordCount(md) {
  return (stripFrontmatter(md).match(/\S+/g) || []).length;
}

function readingMinutes(md) {
  return Math.max(1, Math.round(wordCount(md) / 200));
}

// ---- artigos --------------------------------------------------------------

const RAW = {
  "descoberta-de-propriedades": {
    spoke: 1,
    md: descobertaMd,
    title: "Os teus hóspedes deixaram de pesquisar no Google. E agora?",
    seoTitle: "AI na descoberta de alojamentos: como preparar o teu AL",
    description:
      "A AI está a entrar na descoberta de viagens. Aprende como tornar o teu alojamento mais fácil de encontrar, compreender e recomendar.",
    published: "2026-07-22",
    updated: "2026-07-22",
    keywords: [
      "AI na descoberta de alojamentos",
      "GEO para alojamento local",
      "ChatGPT alojamento local",
      "SEO para alojamento local",
      "reservas diretas",
      "visibilidade AI",
    ],
    tldr:
      "Nos últimos 90 dias, o ChatGPT foi a 3ª maior fonte de tráfego do site de reservas diretas da Vibrant Host (~20 apartamentos no Porto): 56 sessões e uma taxa de ação de reserva de 10,7%, contra 7,1% do tráfego direto e 18,3% do Google. A descoberta de alojamento já começa dentro dos assistentes de IA — e a preparação certa (informação própria, clara e consistente) serve o Google e a IA ao mesmo tempo.",
    takeaways: [
      "Os assistentes de IA (ChatGPT, Gemini, Perplexity) já trazem tráfego real e intenção comercial para sites de AL — mas a confiança ainda fecha a reserva na OTA ou no Google.",
      "39% dos viajantes nos EUA usaram IA para planear viagens em 2025 (Phocuswright), acima dos 28% do ano anterior; a IA entra sobretudo na inspiração e na criação de shortlists.",
      "GEO não substitui SEO: obriga a informação própria, específica e consistente entre canais. Sem uma página indexável e clara, não há 'truque' que resolva.",
      "Mede em três camadas: tráfego (canal AI Assistant no GA4, utm_source=chatgpt.com), visibilidade observada (perguntas fixas repetidas mensalmente) e sinais indiretos (a pergunta 'Como nos encontrou?').",
      "É um investimento sem arrependimento: informação organizada melhora conversão, SEO e a capacidade de qualquer sistema compreender a propriedade — mesmo que a adoção de IA cresça devagar.",
    ],
    faq: [
      {
        q: "A IA já substituiu o Google na procura de alojamento?",
        a: "Não. A pesquisa tradicional, as OTAs, os mapas e as reviews continuam a pesar muito. Os assistentes de IA entram sobretudo no início da viagem — inspiração, comparação e criação de shortlists. Nos dados da Vibrant Host, o Google manteve-se como uma das principais fontes e com a taxa de ação de reserva mais alta.",
      },
      {
        q: "O que é GEO (Generative Engine Optimization)?",
        a: "É a camada de trabalho que torna uma propriedade fácil de encontrar, compreender e extrair por sistemas de IA que respondem a perguntas de viajantes. Não substitui o SEO — exige informação própria e específica, consistência entre canais, dados estruturados corretos e presença externa legítima.",
      },
      {
        q: "Como sei se o ChatGPT está a trazer-me visitas?",
        a: "Em maio de 2026 o Google Analytics passou a agregar estas origens no canal 'AI Assistant'; o ChatGPT acrescenta utm_source=chatgpt.com aos links. Convém separar ChatGPT, Perplexity, Gemini, Claude e Copilot e seguir o funil até à ação de reserva, não apenas contar sessões.",
      },
      {
        q: "Preciso de escrever dezenas de artigos para aparecer na IA?",
        a: "Não. A maioria dos operadores deve primeiro organizar o que já sabe — perguntas repetidas, diferenças entre bairros, limitações, transportes, estacionamento — e transformá-lo em informação pública, clara e atualizada.",
      },
      {
        q: "Existe algum truque para o ChatGPT recomendar o meu alojamento?",
        a: "Não de forma fiável. Prompts 'secretos' e menções artificiais produzem sinais instáveis e arriscados. O investimento seguro é informação correta, conteúdo próprio, identidade consistente, boas reviews e referências externas legítimas.",
      },
    ],
  },

  "pricing-dinamico": {
    spoke: 2,
    md: pricingMd,
    title: "Pricing dinâmico não é uma estratégia. É software.",
    seoTitle: "Pricing dinâmico no alojamento local: ferramenta ou estratégia?",
    description:
      "O pricing dinâmico automatiza preços, mas não substitui o revenue management. Aprende onde acaba o software e começa a decisão do operador.",
    published: "2026-07-22",
    updated: "2026-07-22",
    keywords: [
      "pricing dinâmico alojamento local",
      "revenue management alojamento local",
      "PriceLabs alojamento local",
      "preços dinâmicos Airbnb",
      "AI para pricing",
      "ADR RevPAR alojamento local",
    ],
    tldr:
      "Pricing dinâmico é software, não estratégia. Um bom motor (como o PriceLabs) resolve escala, velocidade e consistência ao ajustar preços dentro dos limites que defines — mas não decide posicionamento, margem, custos ou que reserva queres atrair. Isso é revenue management, e continua a pertencer ao operador. A IA acrescenta valor não em recalcular preços, mas em vigiar exceções, explicar o que mudou e ligar o preço aos custos reais.",
    takeaways: [
      "Pricing dinâmico ≠ revenue management: o motor executa; o operador governa (posicionamento, preço-base, piso/teto, margem, comp set).",
      "Os quatro erros que mais custam dinheiro: ligar e esquecer, preço-base fraco, comp set errado e confundir ocupação com rentabilidade.",
      "Automatizar uma estratégia fraca não a melhora — apenas a aplica mais depressa e com mais consistência.",
      "Rotina de governação: rever os próximos 30 dias todas as semanas (exceções), 60–120 dias todos os meses (estação, eventos, limites) e sempre que o produto muda.",
      "Ser AI-first não é reconstruir o motor de cálculo (categoria madura), é preencher a lacuna entre a recomendação e a decisão operacional.",
    ],
    faq: [
      {
        q: "Pricing dinâmico e revenue management são a mesma coisa?",
        a: "Não. Pricing dinâmico é o mecanismo que ajusta tarifas com base em sinais e regras. Revenue management é o conjunto mais amplo de decisões sobre preço, ocupação, margem, disponibilidade, duração mínima, custos e posicionamento. O motor é uma parte do revenue management, não o todo.",
      },
      {
        q: "Vale a pena usar pricing dinâmico se só tenho poucas propriedades?",
        a: "Sim. Se ainda trabalhas com preços fixos ou os mudas raramente, provavelmente estás a deixar dinheiro na mesa. O motor traz escala, velocidade e consistência impraticáveis à mão — desde que configures bem preço-base, limites e comp set e revejas com regularidade.",
      },
      {
        q: "O algoritmo pode escolher o meu preço-base e limites?",
        a: "Não deve. Preço-base, piso e teto são decisões de posicionamento que condicionam tudo o que vem depois. Se o preço-base estiver desajustado, o algoritmo calcula bem em redor de um ponto de partida errado.",
      },
      {
        q: "Ocupação alta significa boa estratégia?",
        a: "Nem sempre. Um calendário cheio com tarifas baixas, estadias curtas e muitos turnos pode esconder margem fraca. Avalia receita por noite disponível (RevPAR), margem, duração média e custo por estadia — não apenas ocupação.",
      },
      {
        q: "A Portiqa vai substituir o PriceLabs?",
        a: "Não. A estratégia é integrar dados de motores especializados e construir a camada que falta: contextualizar cada propriedade (Property DNA), vigiar exceções no calendário (Vigil) e preparar a decisão com aprovação humana (Atlas), ligando o preço aos custos reais.",
      },
    ],
  },

  "comunicacao-com-hospedes": {
    spoke: 3,
    md: comunicacaoMd,
    title: "Automatizar a comunicação com hóspedes sem perder o controlo",
    seoTitle: "Automatizar a comunicação com hóspedes no alojamento local",
    description:
      "O que automatizar, o que manter sob supervisão e como usar AI na comunicação com hóspedes sem perder controlo, contexto ou humanidade.",
    published: "2026-07-24",
    updated: "2026-07-24",
    keywords: [
      "automatizar comunicação com hóspedes",
      "AI na comunicação com hóspedes",
      "automação de mensagens no alojamento local",
      "assistente de comunicação para alojamento local",
      "human-in-the-loop alojamento local",
      "respostas automáticas a hóspedes",
    ],
    tldr:
      "Automatizar bem a comunicação com hóspedes não é responder a tudo automaticamente — é saber até onde ir sem perder o controlo. A regra prática: a IA não decide sozinha quando a conversa envolve dinheiro, conflito, emergência ou reputação. Mensagens previsíveis (check-in, wi-fi, check-out) podem ser automáticas; o resto sobe por níveis de autonomia até à escalação humana. E mede-se conversas resolvidas corretamente, não a percentagem de automação.",
    takeaways: [
      "A comunicação não é uma tarefa única: antes, durante e depois da estadia têm objetivos e riscos diferentes. A pergunta certa é 'que grau de autonomia é seguro para esta mensagem, agora?'.",
      "A linha vermelha: dinheiro, conflito, emergência e reputação → a decisão final é sempre de uma pessoa.",
      "Human-in-the-loop são quatro níveis de autonomia (envio automático · automático com regras · rascunho · escalação), não aprovar tudo à mão.",
      "A qualidade da resposta começa na qualidade dos dados: uma resposta bem escrita sobre um código de acesso desatualizado continua errada.",
      "Mede o que interessa: conversas resolvidas sem trabalho humano, tempo poupado, intervenção por categoria e gravidade dos erros — não a percentagem de automação.",
      "Numa emergência, a métrica não é o tempo de resposta, é o tempo até alguém começar a resolver.",
    ],
    faq: [
      {
        q: "Devo automatizar todas as mensagens dos hóspedes?",
        a: "Não. Mensagens previsíveis e factuais (confirmação, wi-fi, check-out) podem ser automáticas; pedidos que dependem de contexto devem ficar em rascunho; e dinheiro, conflito, emergência ou reputação devem chegar a uma pessoa antes de qualquer decisão.",
      },
      {
        q: "O que é human-in-the-loop na prática?",
        a: "É trabalhar com níveis de autonomia em vez de aprovar tudo: envio automático para o previsível, automático com regras quando é preciso consultar contexto, modo rascunho quando a resposta merece validação, e escalação imediata nos casos sensíveis.",
      },
      {
        q: "Uma automação que responde a 90% das mensagens é boa?",
        a: "Não necessariamente. 'Automatizar' pode significar classificar, rascunhar ou enviar. A métrica útil é quantas conversas foram resolvidas corretamente sem exigir trabalho humano — e a gravidade dos erros, não apenas a sua frequência.",
      },
      {
        q: "A IA pode responder a perguntas sobre restaurantes, transportes ou horários locais?",
        a: "Com cuidado. Essa informação externa muda sem aviso. As formas responsáveis são: usar uma fonte atual e verificável, limitar-se ao que o operador aprovou, ou admitir que não há informação suficiente — melhor do que enviar o hóspede a uma porta fechada.",
      },
      {
        q: "Como evito que a IA dê informação errada?",
        a: "Garantindo que responde a partir da informação aprovada e atualizada de cada propriedade (não da memória geral do modelo), corrigindo a fonte central e não apenas a mensagem, e reduzindo a autonomia sempre que o custo de um erro é alto.",
      },
    ],
  },

  "gestao-operacional-alojamento-local": {
    spoke: 4,
    md: gestaoMd,
    title: "Gestão operacional no alojamento local: das tarefas aos imprevistos",
    seoTitle: "Automatizar a gestão operacional no alojamento local com AI",
    description:
      "Como automatizar limpezas, tarefas e coordenação no alojamento local, onde as regras chegam e onde a AI ajuda a lidar com imprevistos.",
    published: "2026-07-29",
    updated: "2026-07-29",
    keywords: [
      "gestão operacional no alojamento local",
      "automatizar limpezas no alojamento local",
      "AI na gestão operacional",
      "coordenação de equipas de alojamento local",
      "tarefas operacionais no alojamento local",
    ],
    tldr:
      "A gestão operacional no alojamento local não falha por falta de calendários, tarefas ou checklists — falha no espaço entre o que estava planeado e o que realmente aconteceu. As regras automáticas resolvem o percurso previsível (que tarefas existem entre uma saída e uma entrada, a janela disponível, quem está de serviço); o valor da AI está em ler o que saiu do plano — interpretar mensagens da equipa e fotografias, perceber o impacto e preparar uma proposta — deixando a decisão a uma pessoa. E mede-se coordenação real (tempo até alguém assumir o problema, tarefas reabertas, propriedades 'prontas' com pendências), não menos mensagens.",
    takeaways: [
      "O plano é a parte fácil: o que consome a coordenação são as exceções (uma tarefa que atrasa, uma falta, uma avaria). As regras automáticas cobrem o percurso normal; um calendário automático não conhece a capacidade real da equipa.",
      "O WhatsApp continua a ganhar porque remove fricção — mas cria um problema de memória: a operação fica presa dentro de conversas e o gestor torna-se a integração manual entre pessoas e ferramentas.",
      "Onde a AI acrescenta valor não é executar tarefas, é ler o que saiu do plano: interpretar mensagens e fotografias, separar vários acontecimentos, perceber o impacto e preparar uma proposta de reajuste.",
      "Quatro níveis de autonomia (registo · atualização factual · proposta · execução aprovada): a AI começa em modo de proposta e a autonomia cresce por confiança, nunca para lá da autoridade que a empresa delegou.",
      "A AI não deve decidir sozinha em decisões laborais, bloqueios de propriedades, compensações ou compromissos financeiros — pode identificar o problema, explicar o impacto e preparar alternativas.",
      "Mede coordenação, não silêncio: tempo até alguém assumir o problema, tarefas reabertas, propriedades marcadas prontas com pendências e alterações manuais ao plano. Menos mensagens não significa melhor operação.",
    ],
    faq: [
      {
        q: "Automatizar tarefas resolve a gestão operacional no alojamento local?",
        a: "Só em parte. As regras automáticas resolvem o percurso previsível — que tarefas existem entre uma saída e uma entrada, a janela disponível, quem está de serviço. O que consome a coordenação são as exceções (uma tarefa que atrasa, uma falta, uma avaria), e é aí que um calendário automático deixa de chegar.",
      },
      {
        q: "Porque é que as equipas continuam a usar o WhatsApp em vez de uma app de tarefas?",
        a: "Porque remove fricção — toda a gente já o sabe usar e escreve naturalmente. O problema não é a app; é que a informação fica presa na conversa, sem registo estruturado, e o gestor passa a ser a memória e a integração entre pessoas e sistemas.",
      },
      {
        q: "Onde é que a AI acrescenta valor real na operação?",
        a: "Menos em executar e mais em ler o que saiu do plano: interpretar uma mensagem ('limpeza concluída, falta uma toalha, a luz não acende'), separar os vários acontecimentos, perceber o impacto (há check-in às 15h?) e preparar uma proposta organizada para a coordenação decidir.",
      },
      {
        q: "A AI pode reatribuir tarefas ou decidir sozinha?",
        a: "Não deve. O modelo recomendado são quatro níveis de autonomia — registar, atualizar factos, propor e executar decisões já aprovadas — começando em modo de proposta. Decisões laborais, bloqueios, compensações e compromissos financeiros ficam sempre com quem tem autoridade.",
      },
      {
        q: "Como sei se a minha operação está realmente coordenada?",
        a: "Não é por haver menos mensagens. Mede o tempo até alguém assumir um problema, as tarefas reabertas, as propriedades marcadas como prontas mas com pendências e as alterações manuais ao plano — sinais de coordenação real, não de silêncio.",
      },
    ],
  },
};

export const ARTICLES = Object.entries(RAW).map(([slug, a]) => ({
  slug,
  path: `${MANUAL_BASE}/${slug}`,
  canonical: `${SITE}${MANUAL_BASE}/${slug}`,
  spoke: a.spoke,
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

export function getArticle(slug) {
  return ARTICLES.find((a) => a.slug === slug) || null;
}

// Rotas de AL com AI (para prerender + sitemap).
export const MANUAL_ROUTES = [
  { path: MANUAL_BASE, kind: "hub" },
  ...ARTICLES.map((a) => ({ path: a.path, kind: "article", slug: a.slug })),
];
