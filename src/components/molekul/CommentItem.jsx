import { postedAt } from "../../utils";
import parse from "html-react-parser";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import PropTypes from "prop-types";

export const CommentItem = ({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  userId,
}) => {
  const isCommentUpVoted = upVotesBy.includes(userId);
  const isCommentDownVoted = downVotesBy.includes(userId);

  const upVoteCommentHandler = () => {
    if (!isCommentUpVoted && !isCommentDownVoted) {
      upVoteComment(id);
    } else if (isCommentDownVoted) {
      neutralVoteComment(id);
      upVoteComment(id);
    } else {
      neutralVoteComment(id);
    }
  };

  const downVoteCommentHandler = () => {
    if (!isCommentUpVoted && !isCommentDownVoted) {
      downVoteComment(id);
    } else if (isCommentUpVoted) {
      neutralVoteComment(id);
      downVoteComment(id);
    } else {
      neutralVoteComment(id);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <img className="rounded-full" src={owner.avatar} width={40} alt="" />
        <div className="text-sm">
          <p className="font-semibold">{owner.name}</p>
          <p className="text-sm">{postedAt(createdAt)}</p>
        </div>
      </div>
      <div className="ml-12 mt-2 bg-slate-50 p-2">{parse(`${content}`)}</div>
      <div className="ml-12 mt-2 flex gap-2">
        <button
          className="flex items-center gap-2 rounded bg-slate-50 px-3 py-1 hover:bg-slate-100"
          onClick={() => upVoteCommentHandler()}
        >
          {isCommentUpVoted ? <BiSolidUpvote /> : <BiUpvote />}{" "}
          {upVotesBy.length}
        </button>
        <button
          className="flex items-center gap-2 rounded bg-slate-50 px-3 py-1 hover:bg-slate-100"
          onClick={() => downVoteCommentHandler()}
        >
          {isCommentDownVoted ? <BiSolidDownvote /> : <BiDownvote />}{" "}
          {downVotesBy.length}
        </button>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
  neutralVoteComment: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
