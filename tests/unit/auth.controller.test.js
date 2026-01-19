import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../src/services/auth.service.js', () => ({
    validateUser: jest.fn(),
    generateToken: jest.fn()
}));

await jest.unstable_mockModule('../../src/config/logger.js', () => ({
    default: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn()
    }
}));


const authService = await import('../../src/services/auth.service.js');
const { loginUser } = await import('../../src/controllers/auth.controller.js');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
};

describe('Auth Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('retorna 400 si validación falla', async () => {
        const req = { body: {} };
        const res = mockRes();

        await loginUser(req, res, jest.fn());

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('retorna 401 si usuario no es válido', async () => {
        authService.validateUser.mockResolvedValue(null);

        const req = {
            body: { username: 'admin', password: 'wrong123' }
        };
        const res = mockRes();

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });


    it('retorna token si login es correcto', async () => {
        authService.validateUser.mockResolvedValue({
            id: 1,
            username: 'admin',
            role: 'admin'
        });
        authService.generateToken.mockReturnValue('fake-token');

        const req = {
            body: { username: 'admin', password: '123456' }
        };
        const res = mockRes();

        await loginUser(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ token: 'fake-token' })
        );
    });

});
