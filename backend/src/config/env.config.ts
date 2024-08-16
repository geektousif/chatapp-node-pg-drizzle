import "dotenv/config";

export const PORT = process.env.PORT || 5000;

export const DB = {
  HOST: process.env.DB_HOST || "localhost",
  PORT: process.env.DB_PORT || 5432,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME,
};
