import dotenv from 'dotenv';
dotenv.config();

export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT : process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    TMBDB_API_READ_ACCESS_TOKEN: process.env.TMBDB_API_READ_ACCESS_TOKEN
}