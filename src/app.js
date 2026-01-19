import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import lawyerRoutes from './routes/lawyer.routes.js';
import legalCaseRoutes from './routes/legalCase.routes.js';
import reportRoutes from './routes/report.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { setupSwagger } from './config/swagger.js';
import {requestLogger} from './middlewares/requestLogger.middleware.js';
import logger from './config/logger.js';


const app = express();


app.use(cors());
app.use(express.json());


app.use(requestLogger);

setupSwagger(app);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Legal Suite API running'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/lawyers', lawyerRoutes);
app.use('/api/legal-cases', legalCaseRoutes);
app.use('/api/reports', reportRoutes);

app.use ((req, res,) => {
  logger.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, {
      method: req.method,
      url: req.originalUrl
  });
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use(errorHandler);

export default app;
