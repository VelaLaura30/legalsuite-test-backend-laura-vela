
import { jest } from '@jest/globals';


await jest.unstable_mockModule('../../src/models/Lawyer.js', () => ({
  default: {
    findByPk: jest.fn(),
  },
}));

await jest.unstable_mockModule('../../src/models/LegalCase.js', () => ({
  default: {
    findAll: jest.fn(),
  },
}));

const Lawyer = (await import('../../src/models/Lawyer.js')).default;
const LegalCase = (await import('../../src/models/LegalCase.js')).default;
const reportService = await import('../../src/services/report.service.js');

describe('Report Service', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lanza error si abogado no existe', async () => {
    Lawyer.findByPk.mockResolvedValue(null);

    await expect(reportService.getCasesReportByLawyer(1))
      .rejects.toThrow('Abogado no encontrado');
  });

  it('retorna reporte con estadísticas', async () => {
    Lawyer.findByPk.mockResolvedValue({
      id: 1,
      name: 'Juan Pérez',
      specialization: 'Civil'
    });

    LegalCase.findAll.mockResolvedValue([
      { id: 1, case_number: 'CASE-001', plaintiff: 'A', status: 'open', case_type: 'type1' },
      { id: 2, case_number: 'CASE-002', plaintiff: 'B', status: 'closed', case_type: 'type2' },
      { id: 3, case_number: 'CASE-003', plaintiff: 'C', status: 'open', case_type: 'type1' },
    ]);

    const result = await reportService.getCasesReportByLawyer(1);

    expect(Lawyer.findByPk).toHaveBeenCalledWith(1);
    expect(LegalCase.findAll).toHaveBeenCalledWith({
      where: { lawyerId: 1 },
      attributes: ['id', 'case_number', 'plaintiff', 'status', 'case_type'],
    });

    expect(result.statistics.total_cases).toBe(3);
    expect(result.statistics.by_status).toEqual({ open: 2, closed: 1 });
    expect(result.cases.length).toBe(3);
    expect(result.lawyer.name).toBe('Juan Pérez');
  });
});
