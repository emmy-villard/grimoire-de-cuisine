const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 500;

const buckets = new Map();

/**
 * Removes stale rate-limit entries whose window has elapsed.
 * @param {number} now Current timestamp in ms.
 * @returns {void}
 */
function cleanupExpired(now) {
  for (const [key, entry] of buckets) {
    if (now - entry.start >= WINDOW_MS) {
      buckets.delete(key);
    }
  }
}

/**
 * Naive in-memory rate limiter keyed by IP.
 * @param {import('express').Request} req Express request used for IP detection.
 * @param {import('express').Response} res Express response used for 429s.
 * @param {import('express').NextFunction} next Next middleware when under the threshold.
 * @returns {void}
 */
export default function rateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';

  cleanupExpired(now);

  const entry = buckets.get(key) || { start: now, count: 0 };
  if (now - entry.start >= WINDOW_MS) {
    entry.start = now;
    entry.count = 0;
  }

  entry.count += 1;
  buckets.set(key, entry);

  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({ error: 'Trop de requêtes, réessayez plus tard' });
  }

  next();
}

export { WINDOW_MS, MAX_REQUESTS, buckets };
