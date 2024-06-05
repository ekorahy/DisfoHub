/**
 * Testing scenario for userReducer
 *
 * - userReducer function
 *  - should return the initial state when given an unknown action
 *  - should return the users when given RECEIVE_USERS action
 */

import { describe, expect, it } from "vitest";
import userReducer from "./reducer";
import { ActionType } from "./action";

describe("userReducer function", () => {
  it("should return the initial state when given an unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the users when given RECEIVE_USERS action", () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: { users: [{ id: "1", name: "User 1" }] },
    };

    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual(action.payload.users);
  });
});
