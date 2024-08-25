import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import apiRouter from "./routes/api";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // TODO .env
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/api", apiRouter);

app.use(errorHandler);

export default app;
