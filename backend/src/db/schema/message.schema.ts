import {
  serial,
  varchar,
  timestamp,
  integer,
  pgTable,
  boolean,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";
import { chats } from "./chat.schema";
import { users } from "./user.schema";
import { relations } from "drizzle-orm";

export const mediaTypes = pgEnum("media_type", [
  "image",
  "video", // Add later
]);

export const chatMessagesRelation = relations(chats, ({ many }) => ({
  messages: many(messages),
}));

export const userMessagesRelation = relations(users, ({ many }) => ({
  messages: many(messages),
}));

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id")
    .notNull()
    .references(() => chats.id),
  senderId: integer("sender_id")
    .notNull()
    .references(() => users.id),
  textContent: text("text_content"),
  mediaType: mediaTypes("media_type"),
  mediaUrl: text("media_url"),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const messagesRelation = relations(messages, ({ one }) => ({
  chats: one(chats, {
    fields: [messages.senderId],
    references: [chats.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));

export type InsertMessage = typeof messages.$inferInsert;
export type SelectMessage = typeof messages.$inferSelect;
