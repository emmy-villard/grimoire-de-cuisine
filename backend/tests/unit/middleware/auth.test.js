import requireAuth, { DEFAULT_API_TOKEN } from '../../../middleware/auth.js';

function createRes() {
  const res = {
    status: vi.fn(() => res),
    json: vi.fn(() => res),
  };
  return res;
}

describe('requireAuth middleware', () => {
  const originalToken = process.env.API_TOKEN;

  afterEach(() => {
    process.env.API_TOKEN = originalToken;
  });

  it('rejects when token is missing', () => {
    const req = { headers: {} };
    const res = createRes();
    const next = vi.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('accepts the configured token', () => {
    process.env.API_TOKEN = 'secret';
    const req = { headers: { authorization: 'Bearer secret' } };
    const res = createRes();
    const next = vi.fn();

    requireAuth(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('falls back to the default token when env is absent', () => {
    process.env.API_TOKEN = '';
    const req = { headers: { authorization: `Bearer ${DEFAULT_API_TOKEN}` } };
    const res = createRes();
    const next = vi.fn();

    requireAuth(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});
