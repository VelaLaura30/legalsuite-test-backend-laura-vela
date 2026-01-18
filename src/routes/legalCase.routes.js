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

/**
 * @swagger
 * tags:
 *   name: LegalCases
 *   description: Gestión de casos legales
 */

/**
 * @swagger
 * /api/legal-cases:
 *   post:
 *     summary: Crear un caso legal
 *     tags: [LegalCases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LegalCaseInput'
 *     responses:
 *       201:
 *         description: Caso creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LegalCase'
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *
 *   get:
 *     summary: Listar casos legales con paginación y filtros
 *     tags: [LegalCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, assigned, in_progress, resolved]
 *       - in: query
 *         name: lawyer_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de casos legales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LegalCase'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 */
router.post('/', verifyToken, validateBody(legalCaseSchema), createLegalCase);

router.get('/', verifyToken, getLegalCases);

/**
 * @swagger
 * /api/legal-cases/{id}:
 *   get:
 *     summary: Obtener caso legal por ID
 *     tags: [LegalCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Caso legal encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LegalCase'
 *       404:
 *         description: Caso no encontrado
 */
router.get('/:id', verifyToken, getLegalCaseById);

/**
 * @swagger
 * /api/legal-cases/{id}/assign:
 *   put:
 *     summary: Asignar abogado a un caso
 *     tags: [LegalCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignCaseInput'
 *     responses:
 *       200:
 *         description: Caso asignado correctamente
 *       400:
 *         description: Validación de datos
 *       404:
 *         description: Caso o abogado no encontrado
 */
router.put('/:id/assign', verifyToken, validateBody(assignCaseSchema), assignLegalCase);

/**
 * @swagger
 * /api/legal-cases/{id}/transfer:
 *   put:
 *     summary: Transferir caso de un abogado a otro
 *     tags: [LegalCases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferCaseInput'
 *     responses:
 *       200:
 *         description: Caso transferido correctamente
 *       400:
 *         description: Validación de datos o estado incorrecto
 *       404:
 *         description: Caso o abogado no encontrado
 */
router.put('/:id/transfer', verifyToken, validateBody(transferCaseSchema), transferLegalCase);

/**
 * @swagger
 * components:
 *   schemas:
 *     LegalCaseInput:
 *       type: object
 *       required:
 *         - case_number
 *         - plaintiff
 *         - case_type
 *       properties:
 *         case_number:
 *           type: string
 *           description: Número único del caso
 *         plaintiff:
 *           type: string
 *           description: Demandante
 *         case_type:
 *           type: string
 *           description: Tipo de caso (laboral, civil, etc.)
 *
 *     LegalCase:
 *       allOf:
 *         - $ref: '#/components/schemas/LegalCaseInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             status:
 *               type: string
 *               enum: [pending, assigned, in_progress, resolved]
 *             lawyerId:
 *               type: string
 *               format: uuid
 *
 *     AssignCaseInput:
 *       type: object
 *       required:
 *         - lawyer_id
 *       properties:
 *         lawyer_id:
 *           type: string
 *           format: uuid
 *
 *     TransferCaseInput:
 *       type: object
 *       required:
 *         - new_lawyer_id
 *       properties:
 *         new_lawyer_id:
 *           type: string
 *           format: uuid
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export default router;
