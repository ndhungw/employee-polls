import { sleep } from "@/lib/utils";
import { User } from "@/modules/auth/type";

export const defaultUsers: User[] = [
  { username: "User-1" },
  { username: "User-2" },
  { username: "User-3" },
  { username: "User-4" },
];

export async function getExistingUsers(): Promise<User[]> {
  await sleep(500);
  return defaultUsers;
}
