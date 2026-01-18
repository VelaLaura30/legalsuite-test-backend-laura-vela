import * as reportService from '../services/report.service.js';

export const getLawyerCasesReport = async (req, res, next) => {
  try {
    const lawyerId = req.params.id;
    const report = await reportService.getCasesReportByLawyer(lawyerId);
    res.json(report);
  } catch (error) {
    next(error);
  }
};
