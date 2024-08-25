import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { relations } from "drizzle-orm";

export const userProfileRelation = relations(users, ({ one }) => ({
  profile: one(profile),
}));

export const profile = pgTable("profile", {
  userId: integer("user_id")
    .references(() => users.id)
    .primaryKey(),
  isOnline: boolean("is_online").default(false).notNull(),
  avatarUrl: text("avatar"),
  lastSeen: timestamp("last_seen", { mode: "date" }).defaultNow().notNull(),
});
