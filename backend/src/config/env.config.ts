import "dotenv/config";

export const PORT = process.env.PORT || 5000;

export const DB = {
  HOST: process.env.DB_HOST || "localhost",
  PORT: process.env.DB_PORT || 5432,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME,
};

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;
