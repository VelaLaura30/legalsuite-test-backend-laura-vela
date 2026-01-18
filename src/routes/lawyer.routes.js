import { Router } from 'express';
import {createLawyer, getLawyers, getLawyerById} from '../controllers/lawyer.controller.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { lawyerSchema } from '../validations/lawyer.schema.js';

const router = Router();

// Crear abogado (requiere autenticación)
router.post('/', verifyToken, validateBody(lawyerSchema), createLawyer);

// Listar abogados con paginación y filtro de status
router.get('/', verifyToken, getLawyers);

// Obtener abogado por ID con sus casos asignados
router.get('/:id', verifyToken, getLawyerById);

export default router;
