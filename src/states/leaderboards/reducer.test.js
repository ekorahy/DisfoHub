/**
 * Testing scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *  - should return the initial state when given an unknown action
 *  - should return the leaderboards when given RECEIVE_LEADERBOARDS action
 */

import { describe, expect, it } from "vitest";
import leaderboardsReducer from "./reducer";
import { ActionType } from "./action";

describe("leaderboardsReducer function", () => {
  it("should return the initial state when given an unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the leaderboards when given RECEIVE_LEADERBOARDS action", () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: { leaderboards: [{ id: "1", name: "Leaderboard 1" }] },
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
