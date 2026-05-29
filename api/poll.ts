import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.SUPABASE_MAIN_URL || 'https://iuzpgljjfeobxlptmsma.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_MAIN_SERVICE_ROLE_KEY!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const { sessionId } = req.query;
  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'sessionId required' });
  }

  try {
    // Buscar respuestas no entregadas de Ariel para esta sesión
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/sl_replies?session_id=eq.${sessionId}&delivered=eq.false&order=created_at.asc`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    const replies = await r.json();

    if (!Array.isArray(replies) || replies.length === 0) {
      return res.status(200).json({ reply: null });
    }

    // Marcar como entregadas
    const ids = replies.map((r: any) => r.id);
    await fetch(`${SUPABASE_URL}/rest/v1/sl_replies?id=in.(${ids.join(',')})`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({ delivered: true })
    });

    // Retornar la última respuesta de Ariel
    const latest = replies[replies.length - 1];
    return res.status(200).json({ reply: latest.content });
  } catch (err) {
    console.error('Error en /api/poll:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
}
