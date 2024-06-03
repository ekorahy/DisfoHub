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
import Swal from "sweetalert2";

export const Home = () => {
  const {
    threads = [],
    users = [],
    authUser,
    loadingBar,
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
    if (authUser === null) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        html: 'Please <a class="text-purple-600 underline hover:text-purple-700" href="/login">login</a> first to vote.',
      });
    } else {
      dispatch(asyncToggleUpvoteThread(threadId));
    }
  };

  const onDownVote = (threadId) => {
    if (authUser === null) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        html: 'Please <a class="text-purple-600 underline hover:text-purple-700" href="/login">login</a> first to vote.',
      });
    } else {
      dispatch(asyncToggleDownvoteThread(threadId));
    }
  };

  const onNeutralVote = (threadId) => {
    if (authUser === null) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        html: 'Please <a class="text-purple-600 underline hover:text-purple-700" href="/login">login</a> first to vote.',
      });
    } else {
      dispatch(asyncToggleNeutralvoteThread(threadId));
    }
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const onRemoveSearchBarHandler = () => {
    setKeyword("");
    setSearchParams("");
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
    authUser: authUser !== null && authUser.id,
  }));

  const threadCategoryList = threads.filter(
    (thread, index) =>
      threads.findIndex((obj) => obj.category === thread.category) === index,
  );

  return (
    <div className="relative">
      <div className="absolute right-20 top-0 h-48 w-48 animate-blob rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter sm:h-72 sm:w-72"></div>
      <div className="animation-delay-2000 absolute right-40 top-0 h-48 w-48 animate-blob rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter sm:h-72 sm:w-72"></div>
      <div className="animation-delay-4000 absolute right-60 top-0 h-48 w-48 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter sm:h-72 sm:w-72"></div>
      <div className="mt-20 p-4">
        <SearchBar
          keyword={keyword}
          keywordChange={onKeywordChangeHandler}
          removeSearchBar={onRemoveSearchBarHandler}
        />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <p>Popular category :</p>
          <CategoryList
            threads={threadCategoryList}
            categoryClickHandler={onKeywordChangeHandler}
          />
        </div>
      </div>
      <div className="bg-white/30 backdrop-blur-sm">
        {threadsList.length === 0 ? (
          <div className={loadingBar.default === 1 ? 'hidden' : 'block'}>
            <img
              className="mx-auto w-80 p-8 md:w-96"
              src="/no_data.png"
              alt=""
            />
            <p className="md:text-md -mt-6 text-center text-sm text-slate-600">
              Data Not Found
            </p>
          </div>
        ) : (
          <ThreadList
            threads={threadsList}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            onNeutralVote={onNeutralVote}
            authUser={authUser !== null && authUser.id}
          />
        )}
      </div>
      {authUser !== null && (
        <div className="absolute right-16">
          <Link
            to="/add"
            className="fixed bottom-6 rounded-full bg-slate-600 p-3 text-xl text-white hover:bg-slate-700"
          >
            <IoMdAdd />
          </Link>
        </div>
      )}
    </div>
  );
};
