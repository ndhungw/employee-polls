import { initQuestions, initUsers } from "@/_DATA";
import { Option, Question, User } from "@/types/app";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type AppState = {
  questions: Record<string, Question>;
  users: Record<string, User>;
};

const initialState: AppState = {
  users: initUsers,
  questions: initQuestions,
};

function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function formatQuestion({
  optionOneText,
  optionTwoText,
  author,
}: {
  optionOneText: string;
  optionTwoText: string;
  author: string;
}) {
  return <Question>{
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

type RawQuestion = {
  optionOneText: string;
  optionTwoText: string;
  author: string;
};

export const appSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveQuestion: (state, action: PayloadAction<RawQuestion>) => {
      const payload = action.payload;
      const formattedQuestion = formatQuestion(payload);
      state.questions[formattedQuestion.id] = formattedQuestion;
      if (!state.users[payload.author].questions.includes(formattedQuestion.id)) {
        state.users[payload.author].questions.push(formattedQuestion.id);
      }
    },
    saveQuestionAnswer: (
      state,
      action: PayloadAction<{
        authedUser: string;
        qid: string;
        answer: Option;
      }>
    ) => {
      const { qid, answer, authedUser } = action.payload;
      const theOtherOneAnswer = answer !== "optionOne" ? "optionOne" : "optionTwo";

      state.users[authedUser].answers[qid] = answer;

      state.questions[qid][answer].votes = [
        ...new Set(state.questions[qid][answer].votes.concat([authedUser])),
      ];

      state.questions[qid][theOtherOneAnswer].votes = [
        ...new Set(
          state.questions[qid][theOtherOneAnswer].votes.filter((user) => user !== authedUser)
        ),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const appActions = appSlice.actions;

export default appSlice.reducer;
