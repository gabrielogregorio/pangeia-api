import supertest from 'supertest';
import { Database } from './database';
import { app } from './app';

export const requestMock = supertest(app);
export const databaseMock = new Database({ verbose: false });
