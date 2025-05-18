import express from 'express';
import cors from 'cors';
import { CLIENT_URL } from './config/consts.js';
import { router as mainRouter } from './routes/mainRouter.js';

export const initApp = () => {
  const app = express();

  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use('/', mainRouter);
  return app;
};

export default initApp;
