import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const MONGODB_DB = process.env.MONGODB_DB;
export const SECRET = process.env.SECRET;
export const SESS_EXPIRY = process.env.SESS_EXPIRY;
