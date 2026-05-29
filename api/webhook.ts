import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.SUPABASE_MAIN_URL || 'https://iuzpgljjfeobxlptmsma.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_MAIN_SERVICE_ROLE_KEY!;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Telegram envía actualizaciones via POST
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const update = req.body;

    // Solo procesar mensajes de texto que son respuestas (reply) de Ariel
    const message = update?.message;
    if (!message?.text || !message?.reply_to_message) {
      return res.status(200).json({ ok: true }); // Ignorar silenciosamente
    }

    const replyToMsgId: number = message.reply_to_message.message_id;
    const arielText: string = message.text;

    // Buscar qué sesión corresponde a ese mensaje de Telegram
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/sl_sessions?telegram_msg_id=eq.${replyToMsgId}&select=id`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    const sessions = await r.json();
    if (!Array.isArray(sessions) || sessions.length === 0) {
      return res.status(200).json({ ok: true }); // No encontrada, ignorar
    }

    const sessionId = sessions[0].id;

    // Guardar la respuesta de Ariel en sl_replies
    await fetch(`${SUPABASE_URL}/rest/v1/sl_replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({ session_id: sessionId, content: arielText })
    });

    // Confirmar a Ariel en Telegram que el mensaje fue enviado al usuario
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text: '✅ Tu respuesta fue enviada al usuario en la web.',
        reply_to_message_id: message.message_id
      })
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error en /api/webhook:', err);
    return res.status(200).json({ ok: true }); // Siempre 200 a Telegram
  }
}
