/**
 * Testing Scenario
 *
 * - asyncGetThreads thunk
 *  - should dispatch actions correctly when data fetching succeeds
 *  - should dispatch error alert and hide loading when data fetching fails
 *
 * - asyncAddThread thunk
 *  - should dispatch actions correctly when adding a thread succeeds
 *  - should dispatch error alert and hide loading when adding a thread fails
 *
 * - asyncToggleUpvoteThread thunk
 *  - should dispatch actions correctly when toggling upvote succeeds
 *  - should dispatch error alert and revert state when toggling upvote fails
 *
 * - asyncToggleDownvoteThread thunk
 *  - should dispatch actions correctly when toggling downvote succeeds
 *  - should dispatch error alert and revert state when toggling downvote fails
 *
 * - asyncToggleNeutralvoteThread thunk
 *  - should dispatch actions correctly when toggling neutral vote succeeds
 *  - should dispatch error alert and revert state when toggling neutral vote fails
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  toggleUpvoteThread,
  toggleDownvoteThread,
  toggleNeutralvoteThread,
  asyncGetThreads,
  asyncAddThread,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  asyncToggleNeutralvoteThread,
  ActionType,
} from "./action";
import { receiveUsersActionCreator } from "../users/action";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import Swal from "sweetalert2";

const fakeThreadsResponse = [
  { id: 1, title: "Thread 1" },
  { id: 2, title: "Thread 2" },
];
const fakeThread = { id: 3, title: "New Thread" };
const fakeErrorResponse = new Error("error");

describe("asyncGetThreads thunk", () => {
  beforeEach(() => {
    api._getThreads = api.getThreads;
    api._getUsers = api.getUsers;
  });

  afterEach(() => {
    api.getThreads = api._getThreads;
    api.getUsers = api._getUsers;

    // delete backup data
    delete api._getThreads;
    delete api._getUsers;
  });

  it("should dispatch actions correctly when data fetching succeeds", async () => {
    // arrange
    // stub implementation
    api.getThreads = () => Promise.resolve(fakeThreadsResponse);
    api.getUsers = () => Promise.resolve([]);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncGetThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: fakeThreadsResponse },
    });
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator([]));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch error alert and hide loading when data fetching fails", async () => {
    // arrange
    // stub implementation
    api.getThreads = () => Promise.reject(fakeErrorResponse);
    api.getUsers = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock Swal.fire
    const swalSpy = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncGetThreads()(dispatch);

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

describe("asyncAddThread thunk", () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;

    // delete backup data
    delete api._createThread;
  });

  it("should dispatch actions correctly when adding a thread succeeds", async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.resolve(fakeThread);

    // mock dispatch
    const dispatch = vi.fn();

    // mock Swal.fire
    const swalSpy = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncAddThread({
      title: "New Thread",
      body: "Thread body",
      category: "General",
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.ADD_THREAD,
      payload: { thread: fakeThread },
    });
    expect(swalSpy).toHaveBeenCalledWith({
      icon: "success",
      title: "Successfully added a new thread",
      showConfirmButton: false,
      timer: 1500,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    // cleanup
    swalSpy.mockRestore();
  });

  it("should dispatch error alert and hide loading when adding a thread fails", async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock Swal.fire
    const swalSpy = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncAddThread({
      title: "New Thread",
      body: "Thread body",
      category: "General",
    })(dispatch);

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

describe("asyncToggleUpvoteThread thunk", () => {
  beforeEach(() => {
    api._toggleUpVoteThread = api.toggleUpVoteThread;
  });

  afterEach(() => {
    api.toggleUpVoteThread = api._toggleUpVoteThread;

    // delete backup data
    delete api._toggleUpVoteThread;
  });

  it("should dispatch actions correctly when toggling upvote succeeds", async () => {
    // arrange
    // stub implementation
    api.toggleUpVoteThread = () => Promise.resolve();

    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 123 } });

    // action
    await asyncToggleUpvoteThread(1)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleUpvoteThread({ threadId: 1, userId: 123 }),
    );
    expect(dispatch).not.toHaveBeenCalledWith(Swal.fire(expect.any(Object)));
  });

  it("should dispatch error alert and revert state when toggling upvote fails", async () => {
    // arrange
    // stub implementation
    api.toggleUpVoteThread = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 123 } });

    // mock Swal.fire
    const swalSpy = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncToggleUpvoteThread(1)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleUpvoteThread({ threadId: 1, userId: 123 }),
    );
    expect(swalSpy).toHaveBeenCalledWith({
      icon: "error",
      title: "Oops...",
      text: fakeErrorResponse.message,
    });

    // cleanup
    swalSpy.mockRestore();
  });
});

describe("asyncToggleDownvoteThread thunk", () => {
  beforeEach(() => {
    api._toggleDownVoteThread = api.toggleDownVoteThread;
  });

  afterEach(() => {
    api.toggleDownVoteThread = api._toggleDownVoteThread;

    // delete backup data
    delete api._toggleDownVoteThread;
  });

  it("should dispatch actions correctly when toggling downvote succeeds", async () => {
    // arrange
    // stub implementation
    api.toggleDownVoteThread = () => Promise.resolve();

    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 123 } });

    // action
    await asyncToggleDownvoteThread(1)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleDownvoteThread({ threadId: 1, userId: 123 }),
    );
    expect(dispatch).not.toHaveBeenCalledWith(Swal.fire(expect.any(Object)));
  });

  it("should dispatch error alert and revert state when toggling downvote fails", async () => {
    // arrange
    // stub implementation
    api.toggleDownVoteThread = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 123 } });

    // mock Swal.fire
    const swalSpy = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncToggleDownvoteThread(1)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleDownvoteThread({ threadId: 1, userId: 123 }),
    );
    expect(swalSpy).toHaveBeenCalledWith({
      icon: "error",
      title: "Oops...",
      text: fakeErrorResponse.message,
    });

    // cleanup
    swalSpy.mockRestore();
  });
});

describe("asyncToggleNeutralvoteThread thunk", () => {
  beforeEach(() => {
    api._toggleNeutralVoteThread = api.toggleNeutralVoteThread;
  });

  afterEach(() => {
    api.toggleNeutralVoteThread = api._toggleNeutralVoteThread;

    // delete backup data
    delete api._toggleNeutralVoteThread;
  });

  it("should dispatch actions correctly when toggling neutral vote succeeds", async () => {
    // arrange
    // stub implementation
    api.toggleNeutralVoteThread = () => Promise.resolve();

    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 123 } });

    // action
    await asyncToggleNeutralvoteThread(1)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleNeutralvoteThread({ threadId: 1, userId: 123 }),
    );
    expect(dispatch).not.toHaveBeenCalledWith(Swal.fire(expect.any(Object)));
  });

  it("should dispatch error alert and revert state when toggling neutral vote fails", async () => {
    // arrange
    // stub implementation
    api.toggleNeutralVoteThread = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    const getState = () => ({ authUser: { id: 123 } });

    // mock Swal.fire
    const swalSpy = vi
      .spyOn(Swal, "fire")
      .mockImplementation(() => Promise.resolve());

    // action
    await asyncToggleNeutralvoteThread(1)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleNeutralvoteThread({ threadId: 1, userId: 123 }),
    );
    expect(swalSpy).toHaveBeenCalledWith({
      icon: "error",
      title: "Oops...",
      text: fakeErrorResponse.message,
    });

    // cleanup
    swalSpy.mockRestore();
  });
});
