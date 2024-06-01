import api from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import Swal from "sweetalert2";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  TOGGLE_UPVOTE_THREAD: "TOGGLE_UPVOTE_THREAD",
  TOGGLE_DOWNVOTE_THREAD: "TOGGLE_DOWNVOTE_THREAD",
  TOGGLE_NEUTRALVOTE_THREAD: "TOGGLE_NEUTRALVOTE_THREAD",
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpvoteThread({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownvoteThread({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralvoteThread({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRALVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncGetThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getThreads();
      const users = await api.getUsers();
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
    dispatch(hideLoading());
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, category, body });
      dispatch(addThreadActionCreator(thread));
      Swal.fire({
        icon: "success",
        title: "Successfully added a new thread",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpvoteThread({ threadId, userId: authUser.id }));

    try {
      await api.toggleUpVoteThread(threadId);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      dispatch(toggleUpvoteThread({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownvoteThread({ threadId, userId: authUser.id }));

    try {
      await api.toggleDownVoteThread(threadId);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      dispatch(toggleDownvoteThread({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToggleNeutralvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralvoteThread({ threadId, userId: authUser.id }));

    try {
      await api.toggleNeutralVoteThread(threadId);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      dispatch(toggleNeutralvoteThread({ threadId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  asyncGetThreads,
  addThreadActionCreator,
  asyncAddThread,
  asyncToggleDownvoteThread,
  asyncToggleNeutralvoteThread,
  asyncToggleUpvoteThread,
};
