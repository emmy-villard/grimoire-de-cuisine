export default function allowFrontend(req, res, next) {
    if(!process.env.FRONTEND_URL) {
      throw new Error('FRONTEND_URL is not set');
    }
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
}
