import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../src/services/legalCase.service.js', () => ({
  createCase: jest.fn(),
  listCases: jest.fn(),
  getCaseById: jest.fn(),
  assignCase: jest.fn(),
  transferCase: jest.fn(),
}));

const legalCaseService = await import('../../src/services/legalCase.service.js');
const {
  createLegalCase,
  getLegalCases,
  getLegalCaseById,
  assignLegalCase,
  transferLegalCase,
} = await import('../../src/controllers/legalCase.controller.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe('LegalCase Controller', () => {

  it('crea caso y retorna 201', async () => {
    const req = { body: { case_number: 'CASE-001' } };
    const res = mockRes();

    legalCaseService.createCase.mockResolvedValue({ id: 1, case_number: 'CASE-001' });

    await createLegalCase(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, case_number: 'CASE-001' });
  });

  it('lista casos', async () => {
    const req = { query: {} };
    const res = mockRes();

    legalCaseService.listCases.mockResolvedValue({ data: [{ id: 1 }, { id: 2 }] });

    await getLegalCases(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith({ data: [{ id: 1 }, { id: 2 }] });
  });

  it('obtiene caso por id', async () => {
    const req = { params: { id: 1 } };
    const res = mockRes();

    legalCaseService.getCaseById.mockResolvedValue({ id: 1 });

    await getLegalCaseById(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });

  it('asigna caso a abogado', async () => {
  const req = { params: { id: 1 }, body: { lawyer_id: 'abc-123' } };
  const res = mockRes();

  legalCaseService.assignCase.mockResolvedValue({ id: 1, lawyer_id: 'abc-123', status: 'assigned' });

  await assignLegalCase(req, res, mockNext);

  
  expect(res.json).toHaveBeenCalledWith({ id: 1, lawyer_id: 'abc-123', status: 'assigned' });
});

it('transfiere caso a otro abogado', async () => {
  const req = { params: { id: 1 }, body: { new_lawyer_id: 'def-456' } };
  const res = mockRes();

  legalCaseService.transferCase.mockResolvedValue({ id: 1, lawyer_id: 'def-456', status: 'assigned' });

  await transferLegalCase(req, res, mockNext);

  
  expect(res.json).toHaveBeenCalledWith({ id: 1, lawyer_id: 'def-456', status: 'assigned' });
});

});
