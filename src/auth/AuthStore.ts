import { User } from "@/types/app";

const key = "hungnd73.employee-polls-app.auth.user";

export async function getStoredUserId(): Promise<User["name"] | null> {
  const dataStr = localStorage.getItem(key);
  if (dataStr) {
    return JSON.parse(dataStr);
  }

  return null;
}

export async function setStoredUserId(userId: User["id"] | null) {
  if (userId) {
    localStorage.setItem(key, JSON.stringify(userId));
  } else {
    localStorage.removeItem(key);
  }
}
