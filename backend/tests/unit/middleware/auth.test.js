import requireAuth from '../../../middleware/auth.js';

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
    process.env.API_TOKEN = 'secret';
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

  it('throws when API_TOKEN is not configured', () => {
    process.env.API_TOKEN = '';
    const req = { headers: {} };
    const res = createRes();
    const next = vi.fn();

    expect(() => requireAuth(req, res, next)).toThrow('API_TOKEN non configuré');
    expect(next).not.toHaveBeenCalled();
  });
});
