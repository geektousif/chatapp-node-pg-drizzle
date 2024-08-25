import {
  createChat,
  getChatsByUser,
  getMessagesByChat,
  searchChats,
} from "../repositories/chat.repository";
import { successResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const initiateChat = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  console.log(req.body);
  const { friendId } = req.body;

  if (!userId) {
    throw new Error("User not found");
  }

  if (!friendId) {
    throw new Error("Please provide other users");
  }

  const chat = await createChat("private", {
    userId,
    friendId,
  });

  return res
    .status(200)
    .json(successResponse(chat, "Chat initiated successfully"));
});

export const getChats = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new Error("User not found");
  }

  const chats = await getChatsByUser(userId);

  return res
    .status(200)
    .json(successResponse(chats, "Chats fetched successfully"));
});

export const getMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

  const messages = await getMessagesByChat(
    parseInt(chatId),
    parseInt(limit as string),
    offset
  );

  return res
    .status(200)
    .json(successResponse(messages, "Messages fetched successfully"));
});

export const searchChatsController = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const userId = req.user?.id;

  if (!userId) {
    throw new Error("User not found");
  }

  const chats = await searchChats(username as string, userId);

  console.log(chats);

  return res
    .status(200)
    .json(successResponse(chats, "Chats searched successfully"));
});
