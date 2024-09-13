import { Question, User } from "@/types/app";
import { store } from "./app/store";

export async function getUsers() {
  const usersMap = store.getState().app.users;
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

export function getQuestions() {
  const questionMap = store.getState().app.questions;
  const plainQuestions = Object.entries(questionMap).map(([_, question]) => question);
  return plainQuestions.slice().sort(compareTimestamp("decs"));
}

export async function getQuestionGroupsByUserId(userId: User["id"]) {
  const questions = getQuestions();

  return questions.reduce<Record<"answered" | "unanswered", Question[]>>(
    (res, question) => {
      if (question.optionOne.votes.includes(userId) || question.optionTwo.votes.includes(userId)) {
        res.answered.push(question);
      } else {
        res.unanswered.push(question);
      }

      return res;
    },
    {
      answered: [],
      unanswered: [],
    }
  );
}

const compareTimestamp = (order: "asc" | "decs") => (a: Question, b: Question) =>
  (order === "asc" ? 1 : -1) * (a.timestamp - b.timestamp);

export function getQuestionById(id: string): Question | null | undefined {
  return store.getState().app.questions[id];
}
