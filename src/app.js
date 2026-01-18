import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { setupSwagger } from './config/swagger.js';
import {requestLogger} from './middlewares/requestLogger.middleware.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

setupSwagger(app);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Legal Suite API running'
  });
});

app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;
