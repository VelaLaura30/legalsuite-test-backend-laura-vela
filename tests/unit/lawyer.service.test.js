import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../src/models/index.js', () => ({
  Lawyer: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
  },
  LegalCase: {}
}));

const {
  createLawyerService,
  getLawyersService,
  getLawyerByIdService
} = await import('../../src/services/lawyer.service.js');

const { Lawyer } = await import('../../src/models/index.js');

describe('Lawyer Service', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('crea abogado si email no existe', async () => {
    Lawyer.findOne.mockResolvedValue(null);
    Lawyer.create.mockResolvedValue({ id: 1, email: 'test@mail.com' });

    const result = await createLawyerService({ email: 'test@mail.com' });

    expect(Lawyer.create).toHaveBeenCalled();
    expect(result.email).toBe('test@mail.com');
  });

  it('lanza error si email ya existe', async () => {
    Lawyer.findOne.mockResolvedValue({ id: 1 });

    await expect(
      createLawyerService({ email: 'test@mail.com' })
    ).rejects.toThrow('El email ya está registrado');
  });

  it('retorna abogados paginados', async () => {
    Lawyer.findAndCountAll.mockResolvedValue({
      rows: [{ id: 1 }],
      count: 1
    });

    const result = await getLawyersService({ page: 1, limit: 10 });

    expect(result.data.length).toBe(1);
    expect(result.meta.total).toBe(1);
  });

  it('retorna abogado por id', async () => {
    Lawyer.findByPk.mockResolvedValue({ id: 1 });

    const result = await getLawyerByIdService(1);

    expect(result.id).toBe(1);
  });

  it('lanza error si abogado no existe', async () => {
    Lawyer.findByPk.mockResolvedValue(null);

    await expect(getLawyerByIdService(99))
      .rejects.toThrow('Abogado no encontrado');
  });
});
