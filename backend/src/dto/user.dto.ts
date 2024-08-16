import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "../db/schema/user.schema";

export const registerUserDto = createInsertSchema(users, {
  username: (schema) => schema.username.min(3),
  email: (schema) => schema.email.email(),
  password: (schema) => schema.password.min(6),
}).pick({
  username: true,
  email: true,
  password: true,
});

export const loginUserDto = registerUserDto.omit({
  username: true,
});

export const selectUserDto = createSelectSchema(users).omit({
  password: true,
});

export type RegisterUserDto = z.infer<typeof registerUserDto>;
export type SelectUserDto = z.infer<typeof selectUserDto>;
