import express, { Router } from 'express';
import { commentRouter } from './comment';
import { baseRouter } from './base';
import { schemaRouter } from './schema';

export const router = Router();

router.use(express.static('public'));

router.use('/', baseRouter);
router.use('/comments', commentRouter);
router.use('/schemas', schemaRouter);
