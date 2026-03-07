import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:['https://m-hossain-cold-storage.vercel.app','http://localhost:3000'.'https://al-ahmed-ali-cold-storage-ltd.vercel.app'],credentials:true}));

app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);
app.use(notFoundRoute);
export default app;
