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
