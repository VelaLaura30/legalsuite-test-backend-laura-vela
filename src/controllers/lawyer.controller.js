import * as lawyerService from '../services/lawyer.service.js';
import logger from '../config/logger.js';

export const createLawyer = async (req, res, next) => {
  try {
    const lawyer = await lawyerService.createLawyerService(req.body);
    logger.info(`Abogado creado: ${lawyer.email}`);
    res.status(201).json(lawyer);
  } catch (error) {
    next(error);
  }
};

export const getLawyers = async (req, res, next) => {
  try {
    const result = await lawyerService.getLawyersService(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getLawyerById = async (req, res, next) => {
  try {
    const lawyer = await lawyerService.getLawyerByIdService(req.params.id);
    res.json(lawyer);
  } catch (error) {
    next(error);
  }
};
