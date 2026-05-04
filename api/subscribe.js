// Vercel Serverless Function — POST /api/subscribe
// Adds a contact to a Mailchimp Audience for the Portiqa "Founding 50" waitlist.
//
// Required env vars (set in Vercel → Project → Settings → Environment Variables):
//   MAILCHIMP_API_KEY      e.g. "abc123def456-us21" (the suffix after "-" is the server prefix)
//   MAILCHIMP_AUDIENCE_ID  the Audience/List ID from Mailchimp
//
// The Mailchimp audience must have the following merge fields set up:
//   FNAME (text)    — first name
//   LNAME (text)    — last name (optional)
//   WHATSAPP (text) — WhatsApp / phone number, opcional
//   COMPANY (text)  — empresa / marca
//   UNITS (text)    — nº unidades

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, whatsapp, company, units } = req.body || {};

  if (!email || !name) {
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return res.status(400).json({ error: "Email inválido." });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error("Missing MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID env vars");
    return res.status(500).json({ error: "Configuração do servidor em falta." });
  }

  const serverPrefix = apiKey.split("-").pop();
  if (!serverPrefix) {
    return res.status(500).json({ error: "API key Mailchimp inválida." });
  }

  const [firstName, ...rest] = String(name).trim().split(/\s+/);
  const lastName = rest.join(" ");

  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  const auth = Buffer.from(`anystring:${apiKey}`).toString("base64");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName || "",
          LNAME: lastName || "",
          WHATSAPP: (whatsapp || "").trim(),
          COMPANY: company || "",
          UNITS: units || "",
        },
        tags: ["founding-50", "landing-portiqa"],
      }),
    });

    if (response.ok) {
      return res.status(200).json({ ok: true });
    }

    const data = await response.json().catch(() => ({}));

    if (data.title === "Member Exists") {
      return res.status(200).json({ ok: true, alreadySubscribed: true });
    }

    if (data.title === "Invalid Resource" && /merge fields/i.test(data.detail || "")) {
      console.error("Mailchimp merge field error:", data.detail);
      return res.status(500).json({
        error:
          "Configuração do Mailchimp incompleta. Os merge fields FNAME/LNAME/WHATSAPP/COMPANY/UNITS têm de existir na audience.",
      });
    }

    console.error("Mailchimp error:", response.status, data);
    return res.status(502).json({
      error: "Não foi possível registar a inscrição. Tente de novo daqui a pouco.",
    });
  } catch (err) {
    console.error("Subscribe handler exception:", err);
    return res.status(502).json({
      error: "Erro de rede ao contactar o serviço de email.",
    });
  }
}
