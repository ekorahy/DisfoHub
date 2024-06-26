import parse from "html-react-parser";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { LiaCommentsSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Profile } from "../atom/Profile";

export const ThreadItem = ({
  id,
  title,
  category,
  createdAt,
  totalComments,
  body,
  user,
  upVotesBy,
  downVotesBy,
  onUpVote,
  onDownVote,
  onNeutralVote,
  authUser,
}) => {
  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = () => {
    if (!isThreadUpVoted && !isThreadDownVoted) {
      onUpVote(id);
    } else if (isThreadDownVoted) {
      onNeutralVote(id);
      onUpVote(id);
    } else if (isThreadUpVoted) {
      onNeutralVote(id);
    }
  };

  const onDownVoteClick = () => {
    if (!isThreadDownVoted && !isThreadUpVoted) {
      onDownVote(id);
    } else if (isThreadUpVoted) {
      onNeutralVote(id);
      onDownVote(id);
    } else if (isThreadDownVoted) {
      onNeutralVote(id);
    }
  };

  return (
    <div className="border-b p-4">
      <div className="mb-4">
        <p className="inline bg-slate-100 px-3 py-1 text-sm">#{category}</p>
      </div>
      <Profile avatar={user.avatar} name={user.name} createdAt={createdAt} avatarSize={50} textSize='text-md' />
      <div className="mb-4">
        <Link
          to={`/thread/${id}`}
          className="font-bold hover:text-purple-600 hover:underline"
        >
          {title}
        </Link>
        <div className="mt-2 max-w-4xl">{parse(`${body}`)}</div>
      </div>
      <div className="flex gap-4 text-lg">
        <button
          className="flex items-center gap-2 rounded bg-slate-100 px-3 py-1 hover:bg-slate-200"
          onClick={() => onUpVoteClick()}
        >
          {isThreadUpVoted ? <AiFillLike /> : <AiOutlineLike />}{" "}
          {upVotesBy.length}
        </button>
        <button
          className=" flex items-center gap-2 rounded bg-slate-100 px-3 py-1 hover:bg-slate-200"
          onClick={() => onDownVoteClick()}
        >
          {isThreadDownVoted ? <AiFillDislike /> : <AiOutlineDislike />}{" "}
          {downVotesBy.length}
        </button>
        <div className="px-3 py-1">
          <p className="flex items-center gap-2">
            <LiaCommentsSolid /> {totalComments}
          </p>
        </div>
      </div>
    </div>
  );
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralVote: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};
