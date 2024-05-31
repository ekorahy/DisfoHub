import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncGetThreads,
  asyncToggleDownvoteThread,
  asyncToggleNeutralvoteThread,
  asyncToggleUpvoteThread,
} from "../states/threads/action";
import { ThreadList } from "../components/molekul/ThreadList";

export const Home = () => {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetThreads());
  }, [dispatch]);

  const onUpVote = (threadId) => {
    dispatch(asyncToggleUpvoteThread(threadId));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncToggleDownvoteThread(threadId));
  };

  const onNeutralVote = (threadId) => {
    dispatch(asyncToggleNeutralvoteThread(threadId));
  };

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <div>
      <ThreadList
        threads={threadsList}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onNeutralVote={onNeutralVote}
        authUser={authUser.id}
      />
    </div>
  );
};
