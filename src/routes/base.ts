import express from 'express';

export const baseRouter = express.Router();

baseRouter.get('/', (req, res) => {
  return res.sendStatus(200);
});
