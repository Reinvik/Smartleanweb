import type { VercelRequest, VercelResponse } from '@vercel/node';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone, name, conversation } = req.body;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({ error: 'Telegram credentials not configured' });
  }

  // Build conversation summary (last 10 messages max to keep message short)
  const recentMsgs = (conversation || []).slice(-10);
  const conversationText = recentMsgs
    .map((msg: { role: string; text: string }) =>
      `${msg.role === 'user' ? '👤' : '🤖'} ${msg.text.substring(0, 200)}${msg.text.length > 200 ? '...' : ''}`
    )
    .join('\n\n');

  const dateStr = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });

  const message = `🔔 *NUEVO LEAD — SmartLean*

📋 *Datos del contacto:*
• *Nombre:* ${name || 'No proporcionado'}
• *Teléfono:* ${phone}
• *Fecha:* ${dateStr}

📱 [Abrir WhatsApp con este lead](https://wa.me/56${phone?.replace(/\D/g, '')})

💬 *Resumen de la conversación:*
${conversationText}

---
_Enviado por Nexus Concierge · SmartLean_`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
          disable_web_page_preview: false,
        })
      }
    );

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram error:', data);
      return res.status(500).json({ error: 'Failed to send Telegram message', details: data });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
}
