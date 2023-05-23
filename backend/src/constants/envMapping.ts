import dotenv from 'dotenv';

dotenv.config();

export const CONNECTION_STRING = process.env.CONNECTION_STRING;
export const APP_PORT = process.env.APP_PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
