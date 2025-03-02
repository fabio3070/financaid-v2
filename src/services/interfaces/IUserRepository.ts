import { Session } from "inspector/promises";
import { User } from "next-auth";

export interface IUserRepository {
  getUserByUsername(username: string): Promise<User | null>;
  authenticateUser(email: string, password: string): Promise<Session | null>;
} 