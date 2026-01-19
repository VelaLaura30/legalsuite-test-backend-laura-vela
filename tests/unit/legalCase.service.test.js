import { jest } from '@jest/globals';


await jest.unstable_mockModule('../../src/config/sequelize.js', () => ({
    sequelize: {
        define: jest.fn(() => ({
            findByPk: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            findAndCountAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            hasMany: jest.fn(),
            belongsTo: jest.fn(),
        })),
        transaction: jest.fn(),
        authenticate: jest.fn(),
        sync: jest.fn(),
    },
}));

await jest.unstable_mockModule('../../src/models/User.js', () => ({
    default: {
        findOne: jest.fn(),
        hasMany: jest.fn(),
        belongsTo: jest.fn(),
    },
}));


await jest.unstable_mockModule('../../src/models/Lawyer.js', () => ({
    default: {
        findByPk: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        hasMany: jest.fn(),
        belongsTo: jest.fn(),
    },
}));


await jest.unstable_mockModule('../../src/models/LegalCase.js', () => ({
    default: {
        findByPk: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        findAndCountAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        hasMany: jest.fn(),
        belongsTo: jest.fn(),
    },
}));


const LegalCase = (await import('../../src/models/LegalCase.js')).default;
const Lawyer = (await import('../../src/models/Lawyer.js')).default;
const { sequelize } = await import('../../src/config/sequelize.js');

const legalCaseService = await import('../../src/services/legalCase.service.js');

describe('LegalCase Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('crea un caso si el número no existe', async () => {
        LegalCase.findOne.mockResolvedValue(null);
        LegalCase.create.mockResolvedValue({ id: 1, case_number: 'CASE-001' });

        const result = await legalCaseService.createCase({ case_number: 'CASE-001' });

        expect(LegalCase.findOne).toHaveBeenCalledWith({ where: { case_number: 'CASE-001' } });
        expect(LegalCase.create).toHaveBeenCalledWith({ case_number: 'CASE-001' });
        expect(result).toEqual({ id: 1, case_number: 'CASE-001' });
    });

    it('lanza error si el número de caso ya existe', async () => {
        LegalCase.findOne.mockResolvedValue({ id: 1 });

        await expect(
            legalCaseService.createCase({ case_number: 'CASE-001' })
        ).rejects.toThrow('El número de caso ya existe');
    });

    it('lista casos paginados', async () => {
        const mockData = {
            rows: [{ id: 1 }, { id: 2 }],
            count: 2
        };
        LegalCase.findAndCountAll.mockResolvedValue(mockData);

        const result = await legalCaseService.listCases({ page: 1, limit: 10 });

        expect(LegalCase.findAndCountAll).toHaveBeenCalled();
        expect(result).toMatchObject({
            data: mockData.rows,
            meta: {
                total: 2,
                page: 1,
                limit: 10
            }
        });
    });

    it('obtiene caso por id', async () => {
        const mockCase = { id: 1, case_number: 'CASE-001' };
        LegalCase.findByPk.mockResolvedValue(mockCase);

        const result = await legalCaseService.getCaseById(1);

        expect(LegalCase.findByPk).toHaveBeenCalledWith(1, {
            include: [{ model: Lawyer, as: 'lawyer' }],
        });
        expect(result).toEqual(mockCase);
    });

    it('lanza error si caso no existe', async () => {
        LegalCase.findByPk.mockResolvedValue(null);

        await expect(legalCaseService.getCaseById(999)).rejects.toThrow('Caso no encontrado');
    });

    it('asigna caso a abogado activo', async () => {
        Lawyer.findByPk.mockResolvedValue({ id: 'abc-123', status: 'active' });

        const saveMock = jest.fn().mockResolvedValue(true); 
        const mockCase = {
            id: 1,
            status: 'pending',
            lawyer_id: null,
            save: saveMock, 
            toJSON: () => ({ id: 1, lawyer_id: 'abc-123', status: 'assigned' })
        };

        LegalCase.findByPk.mockResolvedValue(mockCase);

        const result = await legalCaseService.assignCase(1, 'abc-123');

        expect(Lawyer.findByPk).toHaveBeenCalledWith('abc-123');
        expect(LegalCase.findByPk).toHaveBeenCalledWith(1);
        expect(saveMock).toHaveBeenCalled(); 
        expect(result.lawyer_id).toBe('abc-123');
    });

    it('transfiere caso dentro de transacción', async () => {
        const saveMock = jest.fn().mockResolvedValue(true); 
        const mockCase = {
            id: 1,
            lawyer_id: 'abc-123',
            status: 'assigned',
            save: saveMock, 
            toJSON: () => ({ id: 1, lawyer_id: 'def-456', status: 'assigned' })
        };

        
        sequelize.transaction.mockImplementation(async (callback) => {
            const transaction = { commit: jest.fn(), rollback: jest.fn() };
            return callback(transaction);
        });

        
        LegalCase.findByPk.mockResolvedValue(mockCase);

       
        Lawyer.findByPk.mockResolvedValue({ id: 'def-456', status: 'active' });

        const result = await legalCaseService.transferCase(1, 'def-456');

        expect(sequelize.transaction).toHaveBeenCalled();
        expect(LegalCase.findByPk).toHaveBeenCalled();
        expect(Lawyer.findByPk).toHaveBeenCalled();
        expect(saveMock).toHaveBeenCalledWith({ transaction: expect.anything() });
        expect(result.lawyer_id).toBe('def-456');
    });
});