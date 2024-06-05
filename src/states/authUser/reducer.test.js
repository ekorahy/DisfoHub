/**
 * Testing scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given an unknown action
 *  - should return the auth user when given SET_AUTH_USER action
 *  - should return null when given UNSET_AUTH_USER action
 */

import { describe, expect, it } from "vitest";
import authUserReducer from "./reducer";
import { ActionType } from "./action";

describe("authUserReducer function", () => {
  it("should return the initial state when given an unknown action", () => {
    const initialState = null;
    const action = { type: "UNKNOWN" };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the auth user when given SET_AUTH_USER action", () => {
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: { id: "1", name: "John Doe" } },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  it("should return null when given UNSET_AUTH_USER action", () => {
    const initialState = { id: "1", name: "John Doe" };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});
