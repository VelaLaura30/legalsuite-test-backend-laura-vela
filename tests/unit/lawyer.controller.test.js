import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../src/services/lawyer.service.js', () => ({
  createLawyerService: jest.fn(),
  getLawyersService: jest.fn(),
  getLawyerByIdService: jest.fn(),
}));

await jest.unstable_mockModule('../../src/config/logger.js', () => ({
  default: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }
}));


const lawyerService = await import('../../src/services/lawyer.service.js');
const {
  createLawyer,
  getLawyers,
  getLawyerById
} = await import('../../src/controllers/lawyer.controller.js');

const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
});

describe('Lawyer Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('crea abogado y retorna 201', async () => {
    lawyerService.createLawyerService.mockResolvedValue({ id: 1 });

    const req = { body: {} };
    const res = mockRes();

    await createLawyer(req, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('lista abogados', async () => {
    lawyerService.getLawyersService.mockResolvedValue({ data: [] });

    const req = { query: {} };
    const res = mockRes();

    await getLawyers(req, res, jest.fn());

    expect(res.json).toHaveBeenCalled();
  });

  it('obtiene abogado por id', async () => {
    lawyerService.getLawyerByIdService.mockResolvedValue({ id: 1 });

    const req = { params: { id: 1 } };
    const res = mockRes();

    await getLawyerById(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });
});
