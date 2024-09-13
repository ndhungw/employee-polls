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

export type Question = {
  id: string;
  author: string;
  timestamp: number;
  optionOne: VotingOption;
  optionTwo: VotingOption;
};

export type VotingOption = {
  text: string; // text of the option
  votes: string[]; // ids of user who voted for that option
};
