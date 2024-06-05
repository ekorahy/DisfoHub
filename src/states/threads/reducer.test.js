/**
 * Testing scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given an unknown action
 *  - should return the threads when given RECEIVE_THREADS action
 *  - should return the threads with the new thread when given ADD_THREAD action
 *  - should return the threads with the toggled upvote thread when given TOGGLE_UPVOTE_THREAD action
 *  - should return the threads with the toggled downvote thread when given TOGGLE_DOWNVOTE_THREAD action
 *  - should return the threads with the toggled neutral vote thread when given TOGGLE_NEUTRALVOTE_THREAD action
 */

import { describe, expect, it } from "vitest";
import threadsReducer from "./reducer";
import { ActionType } from "./action";

describe("threadsReducer function", () => {
  it("should return the initial state when given an unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the threads when given RECEIVE_THREADS action", () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: [{ id: "1", title: "Thread 1" }] },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it("should return the threads with the new thread when given ADD_THREAD action", () => {
    const initialState = [{ id: "1", title: "Thread 1" }];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: { id: "2", title: "Thread 2" } },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it("should return the threads with the toggled upvote thread when given TOGGLE_UPVOTE_THREAD action", () => {
    const initialState = [
      { id: "1", title: "Thread 1", upVotesBy: ["user1"], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: { threadId: "1", userId: "user2" },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: "1",
        title: "Thread 1",
        upVotesBy: ["user1", "user2"],
        downVotesBy: [],
      },
    ]);
  });

  it("should return the threads with the toggled downvote thread when given TOGGLE_DOWNVOTE_THREAD action", () => {
    const initialState = [
      { id: "1", title: "Thread 1", upVotesBy: [], downVotesBy: ["user1"] },
    ];
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD,
      payload: { threadId: "1", userId: "user2" },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: "1",
        title: "Thread 1",
        upVotesBy: [],
        downVotesBy: ["user1", "user2"],
      },
    ]);
  });

  it("should return the threads with the toggled neutral vote thread when given TOGGLE_NEUTRALVOTE_THREAD action", () => {
    const initialState = [
      {
        id: "1",
        title: "Thread 1",
        upVotesBy: ["user1"],
        downVotesBy: ["user2"],
      },
    ];
    const action = {
      type: ActionType.TOGGLE_NEUTRALVOTE_THREAD,
      payload: { threadId: "1", userId: "user1" },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([
      { id: "1", title: "Thread 1", upVotesBy: [], downVotesBy: ["user2"] },
    ]);
  });
});
