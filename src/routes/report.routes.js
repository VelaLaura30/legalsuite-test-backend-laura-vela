import { Router } from 'express';
import { getLawyerCasesReport } from '../controllers/report.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/reports/lawyers/{id}/cases:
 *   get:
 *     summary: Obtiene el reporte de casos asignados a un abogado
 *     description: Devuelve información del abogado, estadísticas de casos y listado de casos asignados.
 *     tags:
 *       - Reportes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del abogado (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reporte de casos por abogado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lawyer:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                     specialization:
 *                       type: string
 *                 statistics:
 *                   type: object
 *                   properties:
 *                     total_cases:
 *                       type: integer
 *                     by_status:
 *                       type: object
 *                       properties:
 *                         assigned:
 *                           type: integer
 *                         in_progress:
 *                           type: integer
 *                         resolved:
 *                           type: integer
 *                 cases:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       case_number:
 *                         type: string
 *                       plaintiff:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [pending, assigned, in_progress, resolved]
 *                       case_type:
 *                         type: string
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Abogado no encontrado
 */

router.get('/lawyers/:id/cases', verifyToken, getLawyerCasesReport);

export default router;
