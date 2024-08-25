import { Server } from "socket.io";
import { socketAuth } from "./middlewares/auth.middleware";
import { sendMessage } from "./repositories/chat.repository";
import { updateProfile } from "./repositories/profile.repository";
import { SocketWithUser } from "./types/socketWithUser";

export function initializeSocket(io: Server) {
  const onlineUsers = new Map();

  io.on("connection", async (socket: SocketWithUser) => {
    const userId = socket.user.id;

    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });

    socket.on("user_connect", async (userId) => {
      console.log("User connected", userId);
      onlineUsers.set(userId, socket.id);
      console.log(onlineUsers);
      await updateProfile(userId, { isOnline: true });
      io.emit("user_status_change", {
        userId,
        isOnline: true,
      });
    });

    // TODO update user online status also emit

    socket.on("send_message", async (data) => {
      try {
        const newMessage = await sendMessage({
          textContent: data.message,
          chatId: data.chatId,
          senderId: userId,
          mediaType: data?.mediaType,
          mediaUrl: data?.mediaUrl,
        });

        const messageDetails = {
          id: newMessage[0].id,
          chatId: data.chatId,
          sender: newMessage[0].senderId,
          message: newMessage[0].textContent,
          sentAt: newMessage[0].createdAt,
        };

        io.to(data.chatId).emit("receive_message", messageDetails);
      } catch (error) {
        console.log("Failed to send message", error);
      }
    });

    socket.on("typing", (data) => {
      const { chatId, username } = data;
      socket.to(chatId).emit("user_typing", { username });
    });

    socket.on("stop_typing", (data) => {
      const { chatId, username } = data;
      socket.to(chatId).emit("user_stopped_typing", { username });
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected", userId);
      onlineUsers.delete(userId);
      await updateProfile(userId, { isOnline: false, lastSeen: new Date() });
      io.emit("user_status_change", {
        userId,
        isOnline: false,
      });
      // TODO update user online status also emit
    });
  });
}
