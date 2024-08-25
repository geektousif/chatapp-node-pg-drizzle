import { eq } from "drizzle-orm";
import { db } from "../db";
import { profile } from "../db/schema/profile.schema";

export const initProfile = async (id: any) => {
  return await db.insert(profile).values({ userId: id });
};

export const updateProfile = async (id: number, data: any) => {
  const response = await db
    .update(profile)
    .set(data)
    .where(eq(profile.userId, id));

  return response;
};
