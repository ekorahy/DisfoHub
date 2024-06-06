/**
 * Testing Scenario
 *
 * - asyncReceiveThreadDetail thunk
 *  - should dispatch action correctly when thread detail is fetched successfull
 *  - should dispatch action correctly when thread detail fetching fails
 *
 * - [Other tests are still under development]
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { asyncReceiveThreadDetail } from "./action";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import Swal from "sweetalert2";

// Mocked responses and errors...
const fakeThreadId = "fakeThreadId";
const fakeThreadDetail = {
  id: fakeThreadId,
  title: "Fake Thread",
  content: "This is a fake thread.",
};
const fakeErrorResponse = new Error("Thread detail not found");

describe("asyncReceiveThreadDetail thunk", () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
    Swal._fire = Swal.fire;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;
    Swal.fire = Swal._fire;

    // delete backup data
    delete api._getThreadDetail;
    delete Swal._fire;
  });

  it("should dispatch action correctly when thread detail is fetched successfully", async () => {
    // arrange
    // stub implementation
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetail);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail(fakeThreadId)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: "RECEIVE_THREAD_DETAIL",
      payload: {
        detailThread: fakeThreadDetail,
      },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action correctly when thread detail fetching fails", async () => {
    // arrange
    // stub implementation
    api.getThreadDetail = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock Swal.fire
    const swalSpy = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncReceiveThreadDetail(fakeThreadId)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(swalSpy).toHaveBeenCalledWith({
      icon: "error",
      title: "Oops...",
      text: fakeErrorResponse.message,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    // cleanup
    swalSpy.mockRestore();
  });
});
