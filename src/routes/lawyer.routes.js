import { Router } from 'express';
import {createLawyer, getLawyers, getLawyerById} from '../controllers/lawyer.controller.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { lawyerSchema } from '../validations/lawyer.schema.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Lawyers
 *   description: Endpoints para gestión de abogados
 */

/**
 * @swagger
 * /lawyers:
 *   post:
 *     summary: Crear un abogado
 *     tags: [Lawyers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               phone:
 *                 type: string
 *                 example: "123456789"
 *               specialization:
 *                 type: string
 *                 example: Civil
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       201:
 *         description: Abogado creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token no proporcionado o inválido
 */

router.post('/', verifyToken, validateBody(lawyerSchema), createLawyer);

/**
 * @swagger
 * /lawyers:
 *   get:
 *     summary: Listar abogados
 *     tags: [Lawyers]
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
 *           enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Lista de abogados con metadata de paginación
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.get('/', verifyToken, getLawyers);

/**
 * @swagger
 * /lawyers/{id}:
 *   get:
 *     summary: Obtener abogado por ID
 *     tags: [Lawyers]
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
 *         description: Detalles del abogado con sus casos asignados
 *       404:
 *         description: Abogado no encontrado
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.get('/:id', verifyToken, getLawyerById);

export default router;
