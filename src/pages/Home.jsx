import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncGetThreads,
  asyncToggleDownvoteThread,
  asyncToggleNeutralvoteThread,
  asyncToggleUpvoteThread,
} from "../states/threads/action";
import { ThreadList } from "../components/molekul/ThreadList";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

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
    <div className="relative">
      <ThreadList
        threads={threadsList}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onNeutralVote={onNeutralVote}
        authUser={authUser.id}
      />
      <div className="absolute right-16">
        <Link to='/add' className="fixed bottom-6 rounded-full bg-slate-600 p-3 text-xl text-white">
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};
