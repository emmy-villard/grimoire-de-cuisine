import rateLimit, { buckets, MAX_REQUESTS } from '../../../middleware/rateLimit.js';

function createRes() {
  const res = {
    status: vi.fn(() => res),
    json: vi.fn(() => res),
  };
  return res;
}

describe('rateLimit middleware', () => {
  afterEach(() => {
    buckets.clear();
  });

  it('allows requests under the limit', () => {
    const req = { ip: '1.1.1.1' };
    const res = createRes();
    const next = vi.fn();

    rateLimit(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('blocks when exceeding the limit', () => {
    const req = { ip: '2.2.2.2' };
    const res = createRes();
    const next = vi.fn();

    const total = MAX_REQUESTS + 1;
    for (let i = 0; i < total; i++) {
      rateLimit(req, res, next);
    }

    expect(res.status).toHaveBeenCalledWith(429);
    expect(next).toHaveBeenCalledTimes(MAX_REQUESTS); // first MAX_REQUESTS pass, next one is blocked
  });
});
