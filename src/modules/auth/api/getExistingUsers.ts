import { _getUsers } from "@/_DATA";
import { User } from "@/types/user";

async function getUsers() {
  const usersMap = await _getUsers();
  return Object.entries(usersMap).map(([_, user]) => user);
}

export async function getExistingUsernames(): Promise<User["name"][]> {
  const users = await getUsers();
  return users.map((user) => user.name);
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((user) => user.name === username) ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((user) => user.id === id) ?? null;
}
