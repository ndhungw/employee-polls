import { User } from "./type";

const key = "hungnd73.employee-polls-app.auth.user";

export async function getStoredUser(): Promise<User | null> {
  const dataStr = localStorage.getItem(key);
  if (dataStr) {
    return JSON.parse(dataStr);
  }

  return null;
}

export async function setStoredUser(user: User | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
}
