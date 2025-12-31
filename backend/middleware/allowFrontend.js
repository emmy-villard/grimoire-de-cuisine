const DEFAULT_FRONTEND = 'http://localhost:4173';

export default function allowFrontend(req, res, next) {
  const configuredOrigin = process.env.FRONTEND_URL;
  const origin = configuredOrigin && configuredOrigin.trim() !== ''
    ? configuredOrigin.trim()
    : DEFAULT_FRONTEND;

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
}

export { DEFAULT_FRONTEND };
