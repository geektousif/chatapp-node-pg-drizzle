import { eq, ilike } from "drizzle-orm";
import { db } from "../db";
import { users, UserInsert } from "../db/schema/user.schema";

export const createUser = async (newUser: UserInsert) => {
  return await db
    .insert(users)
    .values({
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    })
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
    });
};

export const getUserByEmail = async (email: string) => {
  const response = await db
    .selectDistinct()
    .from(users)
    .where(eq(users.email, email));
  return response[0];
};
export const getUserById = async (id: any) => {
  const response = await db
    .selectDistinct()
    .from(users)
    .where(eq(users.id, id));
  return response[0];
};

// export const searchUsersByUsername = async (username: string) => {
//   const response = await db
//     .select({
//       id: users.id,
//       username: users.username,
//     })
//     .from(users)
//     .where(ilike(users.username, `%${username}%`));

//   return response;
// };
