import dotenv from 'dotenv';

dotenv.config();

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;

export const CONNECTION_STRING = process.env.CONNECTION_STRING;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
