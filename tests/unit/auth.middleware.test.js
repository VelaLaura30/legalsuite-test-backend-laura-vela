import { jest } from '@jest/globals';

await jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    verify: jest.fn()
  }
}));

const jwt = (await import('jsonwebtoken')).default;
const { authMiddleware } = await import('../../src/middlewares/auth.middleware.js');

describe('Auth Middleware', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('retorna 401 si no hay token', () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    authMiddleware(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('permite continuar si token es válido', () => {
    jwt.verify.mockReturnValue({ id: 1 });

    const req = {
      headers: { authorization: 'Bearer token' }
    };
    const next = jest.fn();

    authMiddleware(req, {}, next);

    expect(next).toHaveBeenCalled();
  });
});
