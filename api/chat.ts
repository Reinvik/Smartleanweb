import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.SUPABASE_MAIN_URL || 'https://iuzpgljjfeobxlptmsma.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_MAIN_SERVICE_ROLE_KEY!;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

async function callGemini(messages: { role: string; content: string }[], system: string): Promise<string> {
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents,
        generationConfig: { temperature: 0.75, maxOutputTokens: 512 }
      })
    }
  );
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Lo siento, intenta de nuevo.';
}

async function notifyTelegram(sessionId: string, userMsg: string, aiReply: string): Promise<number | null> {
  const text =
    `🟢 *Mensaje de SmartLean*\n\n` +
    `👤 *El usuario escribió:*\n"${userMsg}"\n\n` +
    `🤖 *Nexus IA respondió:*\n"${aiReply.substring(0, 350)}${aiReply.length > 350 ? '...' : ''}"\n\n` +
    `─────────────────────────\n` +
    `↩️ *Responde este mensaje* para hablar directamente con el usuario en el chat web.\n` +
    `_ID de sesión: ${sessionId.substring(0, 8)}..._`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' })
    });
    const data = await res.json();
    return data?.result?.message_id || null;
  } catch {
    return null;
  }
}

async function storeSession(sessionId: string, telegramMsgId: number | null) {
  await fetch(`${SUPABASE_URL}/rest/v1/sl_sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'resolution=ignore-duplicates'
    },
    body: JSON.stringify({ id: sessionId, telegram_msg_id: telegramMsgId })
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages, system, sessionId } = req.body;
  if (!messages || !sessionId) return res.status(400).json({ error: 'messages and sessionId required' });

  try {
    const userMsg = messages[messages.length - 1]?.content || '';

    // 1. IA responde inmediatamente
    const aiReply = await callGemini(messages, system);

    // 2. Notificar a Ariel en Telegram (en paralelo, no bloqueante)
    const telegramMsgId = await notifyTelegram(sessionId, userMsg, aiReply);

    // 3. Guardar sesión en Supabase
    await storeSession(sessionId, telegramMsgId);

    return res.status(200).json({ message: { role: 'assistant', content: aiReply } });
  } catch (err: any) {
    console.error('Error en /api/chat:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
