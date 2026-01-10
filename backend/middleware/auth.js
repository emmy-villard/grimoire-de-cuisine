// WARNING: API_TOKEN is also injected on the frontend for API calls; this is not a strong security barrier.
export default function requireAuth(req, res, next) {
  const expectedToken = process.env.API_TOKEN;

  if (!expectedToken) {
    throw new Error('API_TOKEN non configuré');
  }

  const header = req.headers['authorization'] || '';
  const provided = header.startsWith('Bearer ') ? header.slice(7) : header;

  if (!provided || provided !== expectedToken) {
    return res.status(401).json({ error: 'Accès non autorisé' });
  }

  next();
}
