import express from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/api"));

app.use(errorHandler);

export default app;
