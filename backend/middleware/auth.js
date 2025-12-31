const DEFAULT_API_TOKEN = 'demo-token';

export default function requireAuth(req, res, next) {
  const expectedToken = process.env.API_TOKEN || DEFAULT_API_TOKEN;
  const header = req.headers['authorization'] || '';
  const provided = header.startsWith('Bearer ') ? header.slice(7) : header;

  if (!provided || provided !== expectedToken) {
    return res.status(401).json({ error: 'Accès non autorisé' });
  }

  next();
}

export { DEFAULT_API_TOKEN };
