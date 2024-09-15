import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("Test fn _saveQuestion", () => {
  test("The saved question is returned and all expected fields are populated", async () => {
    const rawQuestion = {
      author: "me",
      optionOneText: "hello one",
      optionTwoText: "hello two",
    };
    const res = await _saveQuestion(rawQuestion);
    expect(res.author).toEqual(rawQuestion.author);
    expect(res.optionOne.text).toEqual(rawQuestion.optionOneText);
    expect(res.optionTwo.text).toEqual(rawQuestion.optionTwoText);
    expect(res.optionOne.votes).toHaveLength(0);
    expect(res.optionTwo.votes).toHaveLength(0);
  });

  test("An error is returned if incorrect author is passed", async () => {
    const rawQuestion = {
      // tend to make the wrong data so here we cast to pass ts
      author: null as unknown as string,
      optionOneText: "hello one",
      optionTwoText: "hello two",
    };
    await expect(_saveQuestion(rawQuestion)).rejects.toBeDefined();
  });

  test("An error is returned if empty `optionOneText` is passed", async () => {
    const rawQuestion = {
      // tend to make the wrong data so here we cast to pass ts
      author: "me",
      optionOneText: "",
      optionTwoText: "hello two",
    };
    await expect(_saveQuestion(rawQuestion)).rejects.toBeDefined();
  });

  test("An error is returned if empty `optionTwoText` is passed", async () => {
    const rawQuestion = {
      // tend to make the wrong data so here we cast to pass ts
      author: "me",
      optionOneText: "hello one",
      optionTwoText: "",
    };
    await expect(_saveQuestion(rawQuestion)).rejects.toBeDefined();
  });
});

describe("Test fn _saveQuestionAnswer", () => {
  test("true is returned when correctly formatted data is passed to the function", async () => {
    const populatedData = {
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
      authedUser: "sarahedo",
    } as const;
    const isSucceeded = await _saveQuestionAnswer(populatedData);
    expect(isSucceeded).toEqual(true);
  });

  test("An error is returned if null authedUser is passed to the function.", async () => {
    const populatedData = {
      qid: "11111aaaa",
      answer: "optionOne",
      authedUser: null as unknown as string,
    } as const;
    await expect(_saveQuestionAnswer(populatedData)).rejects.toEqual(
      `Please provide authedUser, qid, and answer`
    );
  });

  test("An error is returned if non-existing authedUser is passed to the function.", async () => {
    const populatedData = {
      qid: "11111aaaa",
      answer: "optionOne",
      authedUser: "me",
    } as const;
    await expect(_saveQuestionAnswer(populatedData)).rejects.toEqual(
      `Not found the authenticated user called ${populatedData.authedUser}`
    );
  });

  test("An error is returned if non-existing questionId is passed to the function.", async () => {
    const populatedData = {
      qid: "11111aaaa",
      answer: "optionOne",
      authedUser: "sarahedo",
    } as const;
    await expect(_saveQuestionAnswer(populatedData)).rejects.toEqual(
      `Not found the question with id ${populatedData.qid}`
    );
  });
});
