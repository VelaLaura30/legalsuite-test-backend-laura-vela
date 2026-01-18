import { LegalCase, Lawyer } from '../models/index.js';
import { sequelize } from '../config/sequelize.js';
import logger from '../config/logger.js';

export const createCase = async (data) => {
  const exists = await LegalCase.findOne({ where: { case_number: data.case_number } });
  if (exists) throw new Error('El número de caso ya existe');

  const legalCase = await LegalCase.create(data);
  logger.info(`Caso creado: ${data.case_number}`);
  return legalCase;
};

export const listCases = async ({ page = 1, limit = 10, status, lawyer_id }) => {
  const where = {};
  if (status) where.status = status;
  if (lawyer_id) where.lawyer_id = lawyer_id;

  const offset = (page - 1) * limit;
  const { rows, count } = await LegalCase.findAndCountAll({ where, limit: Number(limit), offset });

  return {
    data: rows,
    meta: { total: count, page: Number(page), limit: Number(limit) },
  };
};

export const getCaseById = async (id) => {
  const legalCase = await LegalCase.findByPk(id, {
    include: [{ model: Lawyer, as: 'lawyer' }],
  });
  if (!legalCase) throw new Error('Caso no encontrado');
  return legalCase;
};

export const assignCase = async (caseId, lawyerId) => {
  const lawyer = await Lawyer.findByPk(lawyerId);
  if (!lawyer || lawyer.status !== 'active') throw new Error('Abogado inválido o inactivo');

  const legalCase = await LegalCase.findByPk(caseId);
  if (!legalCase) throw new Error('Caso no encontrado');

  legalCase.lawyer_id = lawyerId;
  legalCase.status = 'assigned';
  await legalCase.save();

  logger.info(`Caso ${caseId} asignado al abogado ${lawyerId}`);
  return legalCase;
};

export const transferCase = async (caseId, newLawyerId) => {
  return await sequelize.transaction(async (t) => {
    const legalCase = await LegalCase.findByPk(caseId, { transaction: t });
    if (!legalCase) throw new Error('Caso no encontrado');
    if (!legalCase.lawyer_id) throw new Error('El caso no está asignado actualmente');

    const newLawyer = await Lawyer.findByPk(newLawyerId, { transaction: t });
    if (!newLawyer || newLawyer.status !== 'active') throw new Error('Nuevo abogado inválido o inactivo');

    legalCase.lawyer_id = newLawyerId;
    await legalCase.save({ transaction: t });

    logger.info(`Caso ${caseId} transferido a ${newLawyerId}`);
    return legalCase;
  });
};
