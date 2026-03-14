import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import candidateRoutes from './routes/candidateRoutes';

dotenv.config();

const prisma = new PrismaClient();
export default prisma;

export const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send('Hola LTI!');
});

app.use('/candidates', candidateRoutes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message || 'Something broke!',
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
