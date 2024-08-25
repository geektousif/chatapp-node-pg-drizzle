import { Router } from "express";
import userRouter from "./user.route";
import chatRouter from "./chat.route";

const router = Router();

router.use("/user", userRouter);
router.use("/chat", chatRouter);

export default router;
