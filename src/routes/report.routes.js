import { Router } from 'express';
import { getLawyerCasesReport } from '../controllers/report.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();


router.get('/lawyers/:id/cases', verifyToken, getLawyerCasesReport);

export default router;
