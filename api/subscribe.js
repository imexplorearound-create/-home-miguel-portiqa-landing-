// Vercel Serverless Function — POST /api/subscribe
// Handles the Portiqa Founding 50 waitlist signup. Three things in one call:
//   1. Add the contact to a Resend Audience
//   2. Send a welcome email to the subscriber
//   3. Notify the founders inbox with the full submission data
//
// Required env vars (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY       e.g. "re_xxx..."
//   RESEND_AUDIENCE_ID   the Audience UUID from resend.com/audiences
//   NOTIFICATION_EMAIL   where the founders receive submission notifications
//
// Optional env vars:
//   FROM_EMAIL           default: "Portiqa <hello@portiqa.pt>"
//                        Falls back to "onboarding@resend.dev" until the
//                        portiqa.pt domain is verified in Resend.
//   FROM_EMAIL_FALLBACK  default: "onboarding@resend.dev"

const RESEND_API = "https://api.resend.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, whatsapp, company, units } = req.body || {};

  if (!email || !name) {
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Email inválido." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || "Portiqa <hello@portiqa.pt>";

  if (!apiKey || !audienceId) {
    console.error("Missing RESEND_API_KEY or RESEND_AUDIENCE_ID");
    return res.status(500).json({ error: "Configuração do servidor em falta." });
  }

  const [firstName, ...rest] = String(name).trim().split(/\s+/);
  const lastName = rest.join(" ");
  const phone = (whatsapp || "").trim();
  const companyClean = (company || "").trim();
  const unitsClean = (units || "").trim();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  // 1. Add contact to Resend Audience.
  // Errors here are logged but do not abort the response — the welcome email
  // is more important from the user's perspective than the list bookkeeping.
  try {
    const audienceRes = await fetch(`${RESEND_API}/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        first_name: firstName || "",
        last_name: lastName || "",
        unsubscribed: false,
      }),
    });
    if (!audienceRes.ok) {
      const data = await audienceRes.json().catch(() => ({}));
      // Existing contact is fine — Resend returns a specific error.
      if (!/already exists/i.test(data?.message || "")) {
        console.error("Resend audience add failed:", audienceRes.status, data);
      }
    }
  } catch (err) {
    console.error("Resend audience add exception:", err);
  }

  // 2. Send welcome email to the subscriber.
  const welcomeSubject = `Bem-vindo à Portiqa, ${firstName || "amigo"}`;
  const welcomeText = welcomeEmailText({ firstName });
  const welcomeHtml = welcomeEmailHtml({ firstName });

  try {
    const emailRes = await fetch(`${RESEND_API}/emails`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: welcomeSubject,
        text: welcomeText,
        html: welcomeHtml,
        reply_to: notificationEmail || undefined,
        tags: [
          { name: "type", value: "welcome" },
          { name: "campaign", value: "founding-50" },
        ],
      }),
    });
    if (!emailRes.ok) {
      const data = await emailRes.json().catch(() => ({}));
      console.error("Resend welcome email failed:", emailRes.status, data);
      // Don't bail out — the contact is still saved. We just lose the welcome.
    }
  } catch (err) {
    console.error("Resend welcome email exception:", err);
  }

  // 3. Notify founders inbox with the full submission. Best-effort — no abort.
  if (notificationEmail) {
    try {
      await fetch(`${RESEND_API}/emails`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          from: fromEmail,
          to: [notificationEmail],
          reply_to: email,
          subject: `[Portiqa] Nova inscrição Founding 50 — ${name}`,
          text: notificationText({ name, email, phone, companyClean, unitsClean }),
        }),
      });
    } catch (err) {
      console.error("Notification email exception:", err);
    }
  }

  return res.status(200).json({ ok: true });
}

function welcomeEmailText({ firstName }) {
  const greet = firstName || "amigo";
  return [
    `Olá ${greet},`,
    "",
    "Obrigado por se inscrever na lista da Portiqa. Esta nota é só para",
    "confirmar que está dentro — e para lhe pedir uma coisa enquanto",
    "ainda não tem nada de nosso na inbox.",
    "",
    "Estamos a construir um PMS português com IA nativa para gestores",
    "de alojamento local. Não queremos construir mais do mesmo, queremos",
    "construir o que falta. E para isso, precisamos das suas dores reais,",
    "não das que assumimos.",
    "",
    "Se tiver 2 minutos, responda a este email com:",
    "",
    "  1. Qual é a maior dor diária com o seu PMS actual (ou com Excel,",
    "     se for o caso)? A coisa que o tira do sério todas as semanas.",
    "",
    "  2. Se a IA pudesse resolver UMA tarefa do seu dia, qual escolhia?",
    "     Conversas com hóspedes? Preços? Limpezas? Conformidade?",
    "",
    "Cada resposta é lida pelos dois fundadores — Miguel e Bruno —",
    "pessoalmente. Não há funil, não há SDR, não há automação a ler",
    "o que escreve. Promessa.",
    "",
    "De vez em quando vamos enviar uma nota curta — o que mudámos no",
    "produto, o que aprendemos a falar com gestores, e uma leitura útil",
    "sobre alojamento local em Portugal. Se for ruído, sai com um clique",
    "no fim de cada email.",
    "",
    "Até breve,",
    "Miguel & Bruno",
    "Fundadores · Portiqa",
    "Lisboa & Porto",
    "",
    "---",
    "Portiqa",
    "Pombal Martins & Tadeu Fontes, Lda · NIPC 519 380 347",
    "Rua do Duque de Saldanha 651, 4300-466 Porto",
    "https://portiqa.pt · privacidade@portiqa.pt",
    "",
    "Recebeu este email porque se inscreveu em portiqa.pt.",
    "Para sair: {{{RESEND_UNSUBSCRIBE_URL}}}",
  ].join("\n");
}

function welcomeEmailHtml({ firstName }) {
  const greet = escape(firstName || "amigo");
  return `<!doctype html>
<html lang="pt-PT">
<body style="margin:0;padding:0;background:#faf8f4;font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;color:#1a1a1a;line-height:1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf8f4;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#fff;border-radius:10px;border:1px solid rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:32px 36px 8px 36px;">
              <div style="font-family:'Source Serif 4',Georgia,serif;font-size:22px;font-weight:600;color:#1a1a1a;letter-spacing:-0.01em;">Portiqa</div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 32px 36px;color:#1a1a1a;font-size:15px;">
              <p style="margin:0 0 16px;">Olá ${greet},</p>
              <p style="margin:0 0 16px;">Obrigado por se inscrever na lista da Portiqa. Esta nota é só para confirmar que está dentro — e para lhe pedir uma coisa enquanto ainda não tem nada de nosso na inbox.</p>
              <p style="margin:0 0 16px;">Estamos a construir um PMS português com IA nativa para gestores de alojamento local. Não queremos construir mais do mesmo, queremos construir o que falta. E para isso, precisamos das suas dores reais, não das que assumimos.</p>
              <p style="margin:0 0 12px;"><strong>Se tiver 2 minutos, responda a este email com:</strong></p>
              <p style="margin:0 0 12px;padding-left:20px;border-left:3px solid #b08a2c;"><strong>1.</strong> Qual é a maior dor diária com o seu PMS actual (ou com Excel, se for o caso)? A coisa que o tira do sério todas as semanas.</p>
              <p style="margin:0 0 16px;padding-left:20px;border-left:3px solid #b08a2c;"><strong>2.</strong> Se a IA pudesse resolver UMA tarefa do seu dia, qual escolhia? Conversas com hóspedes? Preços? Limpezas? Conformidade?</p>
              <p style="margin:0 0 16px;">Cada resposta é lida pelos dois fundadores — Miguel e Bruno — pessoalmente. Não há funil, não há SDR, não há automação a ler o que escreve. Promessa.</p>
              <p style="margin:0 0 24px;">De vez em quando vamos enviar uma nota curta — o que mudámos no produto, o que aprendemos a falar com gestores, e uma leitura útil sobre alojamento local em Portugal. Se for ruído, sai com um clique no fim de cada email.</p>
              <p style="margin:0 0 4px;">Até breve,</p>
              <p style="margin:0;font-family:'Source Serif 4',Georgia,serif;font-style:italic;color:#1a1a1a;">Miguel &amp; Bruno</p>
              <p style="margin:0;color:#666;font-size:13px;">Fundadores · Portiqa · Lisboa &amp; Porto</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px 32px 36px;border-top:1px solid rgba(0,0,0,0.08);color:#8a8a8a;font-size:12px;line-height:1.55;">
              <p style="margin:0 0 8px;"><strong style="color:#4a4a4a;">Portiqa</strong> — Pombal Martins &amp; Tadeu Fontes, Lda · NIPC 519 380 347</p>
              <p style="margin:0 0 8px;">Rua do Duque de Saldanha 651, 4300-466 Porto, Portugal</p>
              <p style="margin:0 0 12px;"><a href="https://portiqa.pt" style="color:#b08a2c;text-decoration:none;">portiqa.pt</a> · <a href="mailto:privacidade@portiqa.pt" style="color:#b08a2c;text-decoration:none;">privacidade@portiqa.pt</a> · <a href="https://portiqa.pt/privacidade" style="color:#b08a2c;text-decoration:none;">Política de Privacidade</a></p>
              <p style="margin:0;">Recebeu este email porque se inscreveu em portiqa.pt. <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#8a8a8a;text-decoration:underline;">Sair da lista</a>.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function notificationText({ name, email, phone, companyClean, unitsClean }) {
  return [
    "Nova inscrição na lista de espera Portiqa Founding 50.",
    "",
    `Nome:     ${name}`,
    `Email:    ${email}`,
    `WhatsApp: ${phone || "(não preencheu)"}`,
    `Empresa:  ${companyClean || "(não preencheu)"}`,
    `Unidades: ${unitsClean || "(não preencheu)"}`,
    "",
    `Submetido: ${new Date().toISOString()}`,
    "",
    "Resposta directa por reply — vai para o subscritor.",
  ].join("\n");
}

function escape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
