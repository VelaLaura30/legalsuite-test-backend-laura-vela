import { Lawyer, LegalCase } from '../models/index.js';
import { Op } from 'sequelize';

export const createLawyerService = async (data) => {
  // Verificar email único
  const exists = await Lawyer.findOne({ where: { email: data.email } });
  if (exists) throw new Error('El email ya está registrado');

  const lawyer = await Lawyer.create(data);
  return lawyer;
};

export const getLawyersService = async ({ page = 1, limit = 10, status }) => {
  const offset = (page - 1) * limit;

  const where = {};
  if (status) where.status = status;

  const { rows, count } = await Lawyer.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset,
    order: [['created_at', 'DESC']],
  });

  return {
    data: rows,
    meta: {
      total: count,
      page: parseInt(page),
      last_page: Math.ceil(count / limit),
    },
  };
};

export const getLawyerByIdService = async (id) => {
  const lawyer = await Lawyer.findByPk(id, {
    include: [{ model: LegalCase, as: 'cases' }],
  });
  if (!lawyer) throw new Error('Abogado no encontrado');
  return lawyer;
};
