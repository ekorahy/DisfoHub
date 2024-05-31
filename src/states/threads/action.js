import api from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";

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
    try {
      const threads = await api.getThreads();
      const users = await api.getUsers();
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, category, body });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpvoteThread({ threadId, userId: authUser.id }));

    try {
      await api.toggleUpVoteThread(threadId);
    } catch (error) {
      alert(error.message);
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
      alert(error.message);
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
      alert(error.message);
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
