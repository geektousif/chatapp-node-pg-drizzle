import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import {
  getChats,
  getMessages,
  initiateChat,
  searchChatsController,
} from "../../controllers/chat.controller";

const router = Router();

router.get("/", authMiddleware, getChats);
router.get("/search", authMiddleware, searchChatsController);
router.post("/initiate", authMiddleware, initiateChat);
router.get("/:chatId", authMiddleware, getMessages);

export default router;
