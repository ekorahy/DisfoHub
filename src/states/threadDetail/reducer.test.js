/**
 * Testing scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 *  - should return the initial state when given an unknown action
 *  - should return the detail thread when given RECEIVE_THREAD_DETAIL action
 *  - should return null when given CLEAR_THREAD_DETAIL action
 *  - should return the detail thread with the new comment when given ADD_COMMENT action
 *  - should return the detail thread with the toggled upvote when given TOGGLE_UPVOTE_THREAD_DETAIL action
 *  - should return the detail thread with the toggled downvote when given TOGGLE_DOWNVOTE_THREAD_DETAIL action
 *  - should return the detail thread with the toggled neutral vote when given TOGGLE_NEUTRAL_THREAD_DETAIL action
 *  - should return the detail thread with the toggled upvote comment when given TOGGLE_UPVOTE_COMMENT action
 *  - should return the detail thread with the toggled downvote comment when given TOGGLE_DOWNVOTE_COMMENT action
 *  - should return the detail thread with the toggled neutral comment when given TOGGLE_NEUTRAL_COMMENT action
 */

import { describe, expect, it } from "vitest";
import threadDetailReducer from "./reducer";
import { ActionType } from "./action";

describe("threadDetailReducer function", () => {
  it("should return the initial state when given an unknown action", () => {
    const initialState = null;
    const action = { type: "UNKNOWN" };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the detail thread when given RECEIVE_THREAD_DETAIL action", () => {
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        detailThread: {
          id: "1",
          title: "Thread 1",
          comments: [],
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(action.payload.detailThread);
  });

  it("should return null when given CLEAR_THREAD_DETAIL action", () => {
    const initialState = {
      id: "1",
      title: "Thread 1",
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(null);
  });

  it("should return the detail thread with the new comment when given ADD_COMMENT action", () => {
    const initialState = {
      id: "1",
      title: "Thread 1",
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: { id: "comment-1", content: "Comment 1" } },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it("should return the detail thread with the toggled upvote when given TOGGLE_UPVOTE_THREAD_DETAIL action", () => {
    const initialState = {
      id: "1",
      title: "Thread 1",
      comments: [],
      upVotesBy: ["user1"],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
      payload: { userId: "user2" },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: ["user1", "user2"],
    });
  });

  it("should return the detail thread with the toggled downvote when given TOGGLE_DOWNVOTE_THREAD_DETAIL action", () => {
    const initialState = {
      id: "1",
      title: "Thread 1",
      comments: [],
      upVotesBy: [],
      downVotesBy: ["user1"],
    };
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
      payload: { userId: "user2" },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: ["user1", "user2"],
    });
  });

  it("should return the detail thread with the toggled upvote comment when given TOGGLE_UPVOTE_COMMENT action", () => {
    const initialState = {
      id: "1",
      title: "Thread 1",
      comments: [
        {
          id: "comment-1",
          content: "Comment 1",
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.TOGGLE_UPVOTE_COMMENT,
      payload: { commentId: "comment-1", userId: "user1" },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          id: "comment-1",
          content: "Comment 1",
          upVotesBy: ["user1"],
          downVotesBy: [],
        },
      ],
    });
  });

  it("should return the detail thread with the toggled downvote comment when given TOGGLE_DOWNVOTE_COMMENT action", () => {
    const initialState = {
      id: "1",
      title: "Thread 1",
      comments: [
        {
          id: "comment-1",
          content: "Comment 1",
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
      payload: { commentId: "comment-1", userId: "user1" },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          id: "comment-1",
          content: "Comment 1",
          downVotesBy: ["user1"],
          upVotesBy: [],
        },
      ],
    });
  });

  it("should return the detail thread with the toggled neutral comment when given TOGGLE_NEUTRAL_COMMENT action", () => {
    const initialState = {
      id: "1",
      title: "Thread 1",
      comments: [
        {
          id: "comment-1",
          content: "Comment 1",
          upVotesBy: ["user1"],
          downVotesBy: ["user2"],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.TOGGLE_NEUTRAL_COMMENT,
      payload: { commentId: "comment-1", userId: "user1" },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          id: "comment-1",
          content: "Comment 1",
          upVotesBy: [],
          downVotesBy: ["user2"],
        },
      ],
    });
  });
});
