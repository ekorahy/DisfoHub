import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteComment,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralVoteComment,
  asyncToggleNeutralVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleUpVoteThreadDetail,
} from "../states/threadDetail/action";
import { ThreadDetailContent } from "../components/molekul/ThreadDetailContent";
import { CommentInput } from "../components/molekul/CommentInput";
import { CommentList } from "../components/molekul/CommentList";
import Swal from "sweetalert2";

export const ThreadDetail = () => {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onCommentThread = (content) => {
    dispatch(asyncAddComment({ content }));
  };

  const onUpVote = (threadId) => {
    if (authUser === null) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        html: 'Please <a class="text-purple-600 underline hover:text-purple-700" href="/login">login</a> first to vote.',
      });
    } else {
      dispatch(asyncToggleUpVoteThreadDetail(threadId));
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
      dispatch(asyncToggleDownVoteThreadDetail(threadId));
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
      dispatch(asyncToggleNeutralVoteThreadDetail(threadId));
    }
  };

  const onUpVoteComment = (commentId) => {
    if (authUser === null) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        html: 'Please <a class="text-purple-600 underline hover:text-purple-700" href="/login">login</a> first to vote.',
      });
    } else {
      dispatch(asyncToggleUpVoteComment({ threadId: id, commentId }));
    }
  };

  const onDownVoteComment = (commentId) => {
    if (authUser === null) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        html: 'Please <a class="text-purple-600 underline hover:text-purple-700" href="/login">login</a> first to vote.',
      });
    } else {
      dispatch(asyncToggleDownVoteComment({ threadId: id, commentId }));
    }
  };

  const onNeutralVoteComment = (commentId) => {
    if (authUser === null) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        html: 'Please <a class="text-purple-600 underline hover:text-purple-700" href="/login">login</a> first to vote.',
      });
    } else {
      dispatch(asyncToggleNeutralVoteComment({ threadId: id, commentId }));
    }
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="mt-20 p-4">
      <ThreadDetailContent
        {...threadDetail}
        authUser={authUser !== null && authUser.id}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onNeutralVote={onNeutralVote}
      />
      <div className="mb-4">
        <p className="mb-2 font-bold">Leave a comment</p>
        {authUser === null ? (
          <p>
            Please{" "}
            <Link
              className="text-purple-600 underline hover:text-purple-700"
              to="/login"
            >
              Log in
            </Link>{" "}
            first to leave a comment.
          </p>
        ) : (
          <CommentInput comment={onCommentThread} />
        )}
      </div>
      <div>
        <p className="mb-4 font-bold">
          Comments ({threadDetail.comments.length})
        </p>
        <div>
          {threadDetail.comments.length === 0 ? (
            <div>
              <img
                className="mx-auto w-80 p-8 md:w-96"
                src="/no_data.png"
                alt=""
              />
              <p className="md:text-md -mt-6 text-center text-sm text-slate-600">
                No Comments
              </p>
            </div>
          ) : (
            <CommentList
              userId={authUser !== null && authUser.id}
              comments={threadDetail.comments}
              upVoteComment={onUpVoteComment}
              downVoteComment={onDownVoteComment}
              neutralVoteComment={onNeutralVoteComment}
            />
          )}
        </div>
      </div>
    </div>
  );
};
