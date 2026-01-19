import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../src/models/index.js', () => ({
  User: {
    findOne: jest.fn()
  }
}));

await jest.unstable_mockModule('bcrypt', () => ({
  default: {
    compare: jest.fn()
  }
}));

await jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: jest.fn()
  }
}));

const { User } = await import('../../src/models/index.js');
const bcrypt = (await import('bcrypt')).default;
const jwt = (await import('jsonwebtoken')).default;
const { validateUser, generateToken } = await import('../../src/services/auth.service.js');

describe('Auth Service', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('retorna usuario válido', async () => {
    User.findOne.mockResolvedValue({ password: 'hash' });
    bcrypt.compare.mockResolvedValue(true);

    const user = await validateUser('admin', '1234');

    expect(user).toBeTruthy();
  });

  it('retorna null si password es incorrecta', async () => {
    User.findOne.mockResolvedValue({ password: 'hash' });
    bcrypt.compare.mockResolvedValue(false);

    const user = await validateUser('admin', 'bad');

    expect(user).toBeNull();
  });

  it('genera token correctamente', () => {
    jwt.sign.mockReturnValue('fake-token');

    const token = generateToken({ id: 1, role: 'admin' });

    expect(token).toBe('fake-token');
  });
});
