import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.SUPABASE_MAIN_URL || 'https://iuzpgljjfeobxlptmsma.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_MAIN_SERVICE_ROLE_KEY!;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

async function callOllama(messages: { role: string; content: string }[], system: string): Promise<string> {
  const OLLAMA_URL = process.env.OLLAMA_URL;
  if (!OLLAMA_URL) {
    throw new Error('OLLAMA_URL environment variable is not configured');
  }
  const MODEL = process.env.VITE_OLLAMA_MODEL || 'hermes3:8b';

  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'bypass-tunnel-reminder': 'true'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ],
      stream: false,
      options: { temperature: 0.75 }
    }),
    signal: AbortSignal.timeout(12000) // 12 seconds timeout
  });

  if (!res.ok) {
    throw new Error(`Ollama returned status ${res.status}`);
  }
  const data = await res.json();
  return data?.message?.content || '';
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
    let aiReply = '';

    try {
      // 1. Intentar llamar al Ollama local de Ariel a través del túnel publico
      aiReply = await callOllama(messages, system);
    } catch (ollamaErr: any) {
      console.warn('Ollama tunnel failed, falling back to live Telegram chat:', ollamaErr);
      // Mensaje de contingencia si la PC está apagada o el túnel está inactivo
      aiReply = '¡Hola! Nuestro asistente inteligente se tomó un breve descanso, pero ya le avisé a Ariel para que te responda en vivo por este chat. Quédate en línea, te contestará aquí mismo en unos momentos... ⚡';
    }

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
