require('dotenv').config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI || '';
export const BASE_UR_LISTENERS = process.env.BASE_UR_LISTENERS?.toString();
export const RUN_COLLECTOR = process.env.RUN_COLLECTOR?.toString() === 'true';
