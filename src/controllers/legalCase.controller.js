import * as legalCaseService from '../services/legalCase.service.js';

export const createLegalCase = async (req, res, next) => {
  try {
    const legalCase = await legalCaseService.createCase(req.body);
    res.status(201).json(legalCase);
  } catch (error) {
    next(error);
  }
};

export const getLegalCases = async (req, res, next) => {
  try {
    const result = await legalCaseService.listCases(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getLegalCaseById = async (req, res, next) => {
  try {
    const legalCase = await legalCaseService.getCaseById(req.params.id);
    res.json(legalCase);
  } catch (error) {
    next(error);
  }
};

export const assignLegalCase = async (req, res, next) => {
  try {
    const legalCase = await legalCaseService.assignCase(req.params.id, req.body.lawyer_id);
    res.json(legalCase);
  } catch (error) {
    next(error);
  }
};

export const transferLegalCase = async (req, res, next) => {
  try {
    const legalCase = await legalCaseService.transferCase(req.params.id, req.body.new_lawyer_id);
    res.json(legalCase);
  } catch (error) {
    next(error);
  }
};
