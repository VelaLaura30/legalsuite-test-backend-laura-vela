import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

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

export default app;
