import request from 'supertest';
import app from '../src/app.js';

describe('Auth Endpoints', () => {
  it('Debe autenticar usuario con credenciales correctas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'Admin123!'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Debe fallar con credenciales incorrectas', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'wrongpass'
      });

    expect(res.statusCode).toBe(401);
  });
});
