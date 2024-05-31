import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
    dispatch(asyncToggleUpVoteThreadDetail(threadId));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncToggleDownVoteThreadDetail(threadId));
  };

  const onNeutralVote = (threadId) => {
    dispatch(asyncToggleNeutralVoteThreadDetail(threadId));
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment({ threadId: id, commentId }));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment({ threadId: id, commentId }));
  };

  const onNeutralVoteComment = (commentId) => {
    dispatch(asyncToggleNeutralVoteComment({ threadId: id, commentId }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="p-4">
      <ThreadDetailContent
        {...threadDetail}
        authUser={authUser.id}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onNeutralVote={onNeutralVote}
      />
      <div className="mb-4">
        <p>Leave a comment</p>
        <CommentInput comment={onCommentThread} />
      </div>
      <div>
        <p className="mb-4">Comments ({threadDetail.comments.length})</p>
        <div>
          <CommentList
            userId={authUser.id}
            comments={threadDetail.comments}
            upVoteComment={onUpVoteComment}
            downVoteComment={onDownVoteComment}
            neutralVoteComment={onNeutralVoteComment}
          />
        </div>
      </div>
    </div>
  );
};
