/**
 * Testing scenario
 *
 * - asyncGetLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispacth action and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  asyncGetLeaderboards,
  receiveLeaderboardsActionCreator,
} from "../../states/leaderboards/action";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import Swal from "sweetalert2";

const fakeLeaderboardsResponse = [
  {
    user: {
      id: "users-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 10,
  },
  {
    user: {
      id: "users-2",
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 5,
  },
];

const fakeErrorResponse = new Error("error");

describe("asyncGetLeaderboards thunk", () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    // delete backup data
    delete api._getLeaderboards;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    // mock dispatch
    const dispacth = vi.fn();

    // action
    await asyncGetLeaderboards()(dispacth);

    // assert
    expect(dispacth).toHaveBeenCalledWith(showLoading());
    expect(dispacth).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispacth).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call alert correctly when data fetching", async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispacth = vi.fn();

    // mock alert
    const swal = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncGetLeaderboards()(dispacth);

    // assert
    expect(dispacth).toHaveBeenCalledWith(showLoading());
    expect(dispacth).toHaveBeenCalledWith(hideLoading());
    expect(swal).toHaveBeenCalledWith({
      title: "Oops...",
      text: fakeErrorResponse.message,
      icon: "error",
    });

    swal.mockRestore();
  });
});
