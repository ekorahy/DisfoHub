import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncGetThreads,
  asyncToggleDownvoteThread,
  asyncToggleNeutralvoteThread,
  asyncToggleUpvoteThread,
} from "../states/threads/action";
import { ThreadList } from "../components/molekul/ThreadList";
import { IoMdAdd } from "react-icons/io";
import { Link, useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/atom/SearchBar";
import { CategoryList } from "../components/molekul/CategoryList";

export const Home = () => {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });

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

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredThreads = threads.filter((thread) => {
    const keywordLower = keyword.toLowerCase();
    const matchesTitle = thread.title.toLowerCase().includes(keywordLower);
    const matchesBody = thread.body.toLowerCase().includes(keywordLower);
    const matchesCategory = thread.category
      .toLowerCase()
      .includes(keywordLower);

    return matchesTitle || matchesBody || matchesCategory;
  });

  const threadsList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const threadCategoryList = threads.filter(
    (thread, index) =>
      threads.findIndex((obj) => obj.category === thread.category) === index,
  );

  return (
    <div className="relative">
      <div className="my-20 p-4">
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        <div className="mt-4 flex items-center">
          <p>Popular category :</p>
          <CategoryList
            threads={threadCategoryList}
            categoryClickHandler={onKeywordChangeHandler}
          />
        </div>
      </div>
      {threadsList.length === 0 ? (
        <p className="text-center text-rose-600">Empty data</p>
      ) : (
        <ThreadList
          threads={threadsList}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralVote={onNeutralVote}
          authUser={authUser.id}
        />
      )}
      <div className="absolute right-16">
        <Link
          to="/add"
          className="fixed bottom-6 rounded-full bg-slate-600 p-3 text-xl text-white"
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};
