import { and, asc, desc, eq, ilike, inArray, ne, sql } from "drizzle-orm";
import { db } from "../db";
import { chats, chatsToUsers } from "../db/schema/chat.schema";
import { InsertMessage, messages } from "../db/schema/message.schema";
import { users } from "../db/schema/user.schema";
import { alias } from "drizzle-orm/pg-core";

const getUserChatsFunction = (userId: number) => {
  return db
    .$with("user_chats")
    .as(
      db
        .select({ chatId: chatsToUsers.chatId })
        .from(chatsToUsers)
        .where(eq(chatsToUsers.userId, userId))
    );
};

export const createChat = async (
  type: "private" | "group",
  { userId, friendId }: { userId: number; friendId: number }
) => {
  // TODO validation
  const [chat] = await db.insert(chats).values({ type }).returning();

  await db.insert(chatsToUsers).values({
    chatId: chat.id,
    userId: userId,
  });

  const chatDetails = await db
    .insert(chatsToUsers)
    .values({
      chatId: chat.id,
      userId: friendId,
    })
    .returning();

  return chatDetails;
};

export const getChatsByUser = async (userId: number) => {
  //  GET ALL MY CHATS

  const userChats = getUserChatsFunction(userId);

  const lastMessage = db.$with("last_message").as(
    db
      .select({
        chatId: messages.chatId,
        lastMsgTime: sql`MAX(${messages.createdAt})`.as("lastMsgTime"),
      })
      .from(messages)
      .groupBy(messages.chatId)
  );

  const sender = alias(users, "sender");

  return await db
    .with(userChats, lastMessage)
    .select({
      chatId: chats.id,
      friend: {
        id: users.id,
        username: users.username,
      },
      lastMessage: messages,
      lastSender: {
        id: sender.id,
        username: sender.username,
      },
    })
    .from(userChats)
    .innerJoin(chats, eq(userChats.chatId, chats.id))
    .innerJoin(lastMessage, eq(chats.id, lastMessage.chatId))
    .innerJoin(messages, eq(lastMessage.chatId, messages.chatId))
    .innerJoin(sender, eq(messages.senderId, sender.id))
    .innerJoin(chatsToUsers, eq(lastMessage.chatId, chatsToUsers.chatId))
    .innerJoin(users, eq(chatsToUsers.userId, users.id))
    .where(
      and(
        ne(users.id, userId),
        eq(messages.chatId, lastMessage.chatId),
        eq(messages.createdAt, lastMessage.lastMsgTime)
      )
    )
    .orderBy(desc(messages.createdAt));
};

export const searchChats = async (query: string, userId: number) => {
  // RETURN ALL CHATS (PRIVATE - USERNAME) THAT MATCH THE QUERY

  const matchingUsers = db.$with("matching_users").as(
    db
      .select({ userId: users.id, username: users.username })
      .from(users)
      .where(and(ilike(users.username, `%${query}%`), ne(users.id, userId)))
  );

  const userChats = getUserChatsFunction(userId);

  const privateChats = db.$with("private_chats").as(
    db
      .with(userChats)
      .select({ chatId: chats.id, userId: chatsToUsers.userId })
      .from(chats)
      .innerJoin(userChats, eq(chats.id, userChats.chatId))
      .innerJoin(chatsToUsers, eq(chats.id, chatsToUsers.chatId))
      .where(and(eq(chats.type, "private"), ne(chatsToUsers.userId, userId)))
  );

  const chatsUsers = await db
    .with(matchingUsers, privateChats)
    .select({
      user: {
        id: matchingUsers.userId,
        username: matchingUsers.username,
      },
      chatId: privateChats.chatId,
    })
    .from(matchingUsers)
    .leftJoin(privateChats, eq(matchingUsers.userId, privateChats.userId))
    .orderBy(matchingUsers.username);

  return chatsUsers;
};

export const sendMessage = async (messageData: InsertMessage) => {
  const message = await db.insert(messages).values(messageData).returning();
  return message;
};

export const getMessagesByChat = async (
  chatId: number,
  limit: number,
  offset: number
) => {
  return (
    db
      .select({
        id: messages.id,
        chatId: messages.chatId,
        message: messages.textContent,
        sentAt: messages.createdAt,
        sender: messages.senderId,
        // sender: users.id,
      })
      .from(messages)
      // .innerJoin(users, eq(messages.senderId, users.id))
      .where(eq(messages.chatId, chatId))
      .orderBy(asc(messages.createdAt))
      .limit(limit)
      .offset(offset)
  );
};
