import Lawyer from '../models/Lawyer.js';
import LegalCase from '../models/LegalCase.js';


export const getCasesReportByLawyer = async (lawyerId) => {
  const lawyer = await Lawyer.findByPk(lawyerId);
  if (!lawyer) {
    throw new Error('Abogado no encontrado');
  }

  const cases = await LegalCase.findAll({
    where: { lawyerId },
    attributes: ['id', 'case_number', 'plaintiff', 'status', 'case_type'],
  });

  const statistics = {
    total_cases: cases.length,
    by_status: cases.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {}),
  };

  return {
    lawyer: {
      id: lawyer.id,
      name: lawyer.name,
      specialization: lawyer.specialization,
    },
    statistics,
    cases,
  };
};
