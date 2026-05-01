import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import errorHandler from './middlewares/errorHandler';
import notFound from './middlewares/notFound';
import successHandler from './middlewares/successHandler';
import { router } from './routes';
import type { Express } from 'express';

const corsConfig = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
};

const createApp = (): Express => {
  const app = express();

  app.use(helmet());
  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(successHandler);

  app.use('/api', router);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export { createApp };
