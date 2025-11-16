// rode npx ts-node sendEmails.ts para executar o codigo
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import nodemailer from "nodemailer";
import { parse as parseDate, differenceInYears, addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Recipient = {
  Nome: string;
  Email: string;
  Nasc: string;
};

const CSV_PATH = path.resolve("emails.csv");
const TEMPLATE_PATH = path.resolve("mensagem.html");
const IMAGES_DIR = path.resolve("imagens");

function normalizeHeaderForKey(h: string | undefined): string {
  if (!h) return "";
  const cleaned = h.replace(/^\uFEFF/, "").trim().normalize("NFC").toLowerCase();
  return cleaned.replace(/[^a-z0-9]/g, "");
}

function mapHeaderToColumnName(originalHeader: string): string {
  const n = normalizeHeaderForKey(originalHeader);
  if (n.includes("nome") || n === "name") return "Nome";
  if (n.includes("email") || n.includes("e-mail") || n.includes("mail")) return "Email";
  if (n.includes("nasc") || n.includes("nascimento") || n.includes("birth") || n.includes("data")) return "Nasc";
  const fallback = originalHeader.replace(/^\uFEFF/, "").trim();
  return fallback || "UNKNOWN";
}

function readCsv(filePath: string): Recipient[] {
  const raw = fs.readFileSync(filePath, { encoding: "utf8" });
  const firstLine = raw.split(/\r?\n/)[0] ?? "";

  console.log(">>> Primeira linha do CSV (raw):", firstLine);
  const rawHeaders = firstLine.split(";");

  console.log(">>> Headers brutos detectados:", rawHeaders);
  const records = parse(raw, {
    delimiter: ";",
    columns: (headers: string[]) => {
      const mapped = headers.map((h) => mapHeaderToColumnName(h));
      console.log(">>> Headers mapeados/normalizados para colunas:", mapped);
      return mapped;
    },
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  }) as Record<string, string>[];

  const recipients: Recipient[] = records.map((r) => {
    const nome =
      (r["Nome"] ?? r["nome"] ?? r["Name"] ?? r["name"] ?? r["nome "] ?? r[" Nome"] ?? "").toString().trim();
    const email =
      (r["Email"] ??
        r["email"] ??
        r["E-mail"] ??
        r["e-mail"] ??
        r["mail"] ??
        r["Mail"] ??
        r["Email "] ??
        "").toString().trim();
    const nasc =
      (r["Nasc"] ?? r["nasc"] ?? r["Nascimento"] ?? r["nascimento"] ?? r["data"] ?? r["Data"] ?? "").toString().trim();

    return {
      Nome: nome,
      Email: email,
      Nasc: nasc,
    };
  });

  return recipients;
}

function parseBRDate(dateStr: string): Date | null {
  try {
    const d = parseDate(dateStr, "dd/MM/yyyy", new Date(), { locale: ptBR });
    if (isNaN(d.getTime())) return null;
    return d;
  } catch {
    return null;
  }
}

function calcAge(birth: Date, onDate = new Date()): number {
  return differenceInYears(onDate, birth);
}

function monthNamePortuguese(date: Date): string {
  return format(date, "LLLL", { locale: ptBR });
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildMessageHtml(templateHtml: string, recipientName: string, percdesc: number, mesQueVem: string): string {
  let html = templateHtml;

  html = html.replace(/{{\s*nome\s*}}/gi, escapeHtml(recipientName));
  html = html.replace(/{{\s*percdesc\s*}}/gi, String(Math.floor(percdesc)));
  html = html.replace(/{{\s*mesquevem\s*}}/gi, escapeHtml(mesQueVem));

  html = html.replace(/src\s*=\s*"(?:imagens\/)?logo(?:\.[a-zA-Z]{2,4})?"/gi, 'src="cid:logo"');
  html = html.replace(/src\s*=\s*'(?:imagens\/)?logo(?:\.[a-zA-Z]{2,4})?'/gi, "src='cid:logo'");

  html = html.replace(/src\s*=\s*"(?:imagens\/)?assinatura(?:\.[a-zA-Z]{2,4})?"/gi, 'src="cid:assinatura"');
  html = html.replace(/src\s*=\s*'(?:imagens\/)?assinatura(?:\.[a-zA-Z]{2,4})?'/gi, "src='cid:assinatura'");

  return html;
}

function capitalizeFirstLetter(s: string) {
  if (!s) return s;
  return s[0].toUpperCase() + s.slice(1);
}

async function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`Arquivo CSV não encontrado em: ${CSV_PATH}`);
    process.exit(1);
  }
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Template HTML não encontrado em: ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(TEMPLATE_PATH, { encoding: "utf8" });
  const recipients = readCsv(CSV_PATH);

  if (recipients.length === 0) {
    console.log("Nenhum destinatário encontrado no CSV.");
    return;
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL, FROM_NAME, DRY_RUN } = process.env;
  const dryRun = DRY_RUN === "1" || DRY_RUN?.toLowerCase() === "true";

  if (!dryRun) {
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL) {
      console.error(
        "Variáveis SMTP não configuradas. Configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL. Ou defina DRY_RUN=1 para rodar sem enviar."
      );
      process.exit(1);
    }
  }

  const transporter = dryRun
    ? null
    : nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

  const logoPath = path.join(IMAGES_DIR, "logo.png");
  const assinaturaPath = path.join(IMAGES_DIR, "assinatura.png");
  const attachmentsBase: { filename: string; path: string; cid: string }[] = [];
  if (fs.existsSync(logoPath)) {
    attachmentsBase.push({ filename: "logo.png", path: logoPath, cid: "logo" });
  } else {
    console.warn(`Aviso: logo.png não encontrado em ${logoPath}. O e-mail pode conter um src quebrado.`);
  }
  if (fs.existsSync(assinaturaPath)) {
    attachmentsBase.push({ filename: "assinatura.png", path: assinaturaPath, cid: "assinatura" });
  } else {
    console.warn(`Aviso: assinatura.png não encontrado em ${assinaturaPath}.`);
  }

  for (const r of recipients) {
    try {
      const nome = (r.Nome ?? "").trim();
      const email = (r.Email ?? "").trim();
      const nascStr = (r.Nasc ?? "").trim();

      if (!nome || !email || !nascStr) {
        console.warn(`Pulando registro inválido (campos vazios): ${JSON.stringify(r)}`);
        continue;
      }

      const birth = parseBRDate(nascStr);
      if (!birth) {
        console.warn(`Data de nascimento inválida para ${nome}: "${nascStr}". Pulando.`);
        continue;
      }

      const today = new Date();
      const age = calcAge(birth, today);
      const percdesc = age >= 0 ? age : 0;
      const nextMonthDate = addMonths(birth, 1);
      const mesQueVem = capitalizeFirstLetter(monthNamePortuguese(nextMonthDate));

      const finalHtml = buildMessageHtml(templateHtml, nome, percdesc, mesQueVem);

      const mailOptions = {
        from: FROM_NAME ? `"${FROM_NAME}" <${FROM_EMAIL}>` : FROM_EMAIL,
        to: email,
        subject: `Feliz Aniversário, ${nome}! (presente especial)`,
        html: finalHtml,
        attachments: attachmentsBase,
      };

      if (dryRun) {
        console.log("=== DRY RUN ===");
        console.log("Para:", email);
        console.log("Assunto:", mailOptions.subject);
        console.log("HTML gerado (primeiros 400 chars):\n", finalHtml.slice(0, 400));
        console.log("Anexos:", attachmentsBase.map((a) => a.filename));
        console.log("===============");
      } else {
        const info = await transporter!.sendMail(mailOptions);
        console.log(`Enviado para ${email} — MessageId: ${info.messageId}`);
      }
    } catch (err) {
      console.error("Erro ao processar registro:", r, err);
    }
  }

  if (!dryRun) {
    console.log("Todos os e-mails processados.");
  } else {
    console.log("Dry run concluído — nenhum e-mail enviado.");
  }
}

main().catch((e) => {
  console.error("Erro fatal:", e);
  process.exit(1);
});
