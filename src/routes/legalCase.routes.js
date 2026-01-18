import { Router } from 'express';
import {
  createLegalCase,
  getLegalCases,
  getLegalCaseById,
  assignLegalCase,
  transferLegalCase
} from '../controllers/legalCase.controller.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { legalCaseSchema, assignCaseSchema, transferCaseSchema } from '../validations/legalCase.schema.js';

const router = Router();


router.post('/', verifyToken, validateBody(legalCaseSchema), createLegalCase);


router.get('/', verifyToken, getLegalCases);


router.get('/:id', verifyToken, getLegalCaseById);


router.put('/:id/assign', verifyToken, validateBody(assignCaseSchema), assignLegalCase);


router.put('/:id/transfer', verifyToken, validateBody(transferCaseSchema), transferLegalCase);

export default router;
