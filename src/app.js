import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Legal Suite API running'
  });
});

app.use('/api/auth', authRoutes);

export default app;
