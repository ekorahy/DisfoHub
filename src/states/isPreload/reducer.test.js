/**
 * Testing scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *  - should return the initial state when given an unknown action
 *  - should return the isPreload value when given SET_IS_PRELOAD action
 */

import { describe, expect, it } from "vitest";
import isPreloadReducer from "./reducer";
import { ActionType } from "./action";

describe("isPreloadReducer function", () => {
  it("should return the initial state when given an unknown action", () => {
    const initialState = true;
    const action = { type: "UNKNOWN" };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the isPreload value when given SET_IS_PRELOAD action", () => {
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: false },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.isPreload);
  });
});
