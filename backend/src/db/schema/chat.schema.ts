import {
  pgTable,
  serial,
  varchar,
  timestamp,
  pgEnum,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

import { users } from "./user.schema";
import { relations } from "drizzle-orm";

export const chatTypes = pgEnum("chat_type", ["private", "group"]);

export const usersRelation = relations(users, ({ many }) => ({
  chatsToUsers: many(chatsToUsers),
}));

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  type: chatTypes("type").default("private").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const chatRelation = relations(chats, ({ many }) => ({
  chatsToUsers: many(chatsToUsers),
}));

export const chatsToUsers = pgTable(
  "chatsToUsers",
  {
    chatId: integer("chat_id")
      .notNull()
      .references(() => chats.id),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.chatId, t.userId] }),
  })
);

export const chatsToUsersRelation = relations(chatsToUsers, ({ one }) => ({
  chat: one(chats, {
    fields: [chatsToUsers.chatId],
    references: [chats.id],
  }),
  user: one(users, {
    fields: [chatsToUsers.userId],
    references: [users.id],
  }),
}));
