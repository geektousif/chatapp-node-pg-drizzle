import express from "express";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/errorHandler.middleware";
import apiRouter from "./routes/api";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRouter);

app.use(errorHandler);

export default app;
