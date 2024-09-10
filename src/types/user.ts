export const options = ["optionOne", "optionTwo"] as const;

export type Option = (typeof options)[number];

export type User = {
  id: string;
  password: string;
  name: string;
  avatarURL: null;
  questions: string[];
  answers: AnswerMap;
};

export type AnswerMap = {
  [questionId: string]: Option;
};
