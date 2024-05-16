import './config/envs';
import express from 'express';
import { useCors } from './middlewares/useCors';
import { useHandleErrors } from './middlewares/useHandleErrors';
import { router } from './routes';

export const app = express();

app.disable('x-powered-by');

app.use(useCors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(useHandleErrors);
