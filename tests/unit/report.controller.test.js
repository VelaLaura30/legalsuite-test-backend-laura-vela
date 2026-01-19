import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../src/services/report.service.js', () => ({
  getCasesReportByLawyer: jest.fn(),
}));

const reportService = await import('../../src/services/report.service.js');
const { getLawyerCasesReport } = await import('../../src/controllers/report.controller.js');

const mockRes = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('Report Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna reporte exitoso', async () => {
    const req = { params: { id: 1 } };
    const res = mockRes();

    reportService.getCasesReportByLawyer.mockResolvedValue({ dummy: 'report' });

    await getLawyerCasesReport(req, res, mockNext);

    expect(reportService.getCasesReportByLawyer).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ dummy: 'report' });
  });

  it('llama next si hay error', async () => {
    const req = { params: { id: 1 } };
    const res = mockRes();

    reportService.getCasesReportByLawyer.mockRejectedValue(new Error('fail'));

    await getLawyerCasesReport(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});
