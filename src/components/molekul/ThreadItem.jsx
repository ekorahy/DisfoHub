import { postedAt } from "../../utils";
import parse from "html-react-parser";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { LiaCommentsSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
      <div className="mb-4 flex items-center gap-2">
        <img className="rounded-full" src={user.avatar} width={50} alt="" />
        <div className="">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm">{postedAt(createdAt)}</p>
        </div>
      </div>
      <div className="mb-4">
        <Link
          to={`/${id}`}
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
          {isThreadUpVoted ? <BiSolidUpvote /> : <BiUpvote />}{" "}
          {upVotesBy.length}
        </button>
        <button
          className=" flex items-center gap-2 rounded bg-slate-100 px-3 py-1 hover:bg-slate-200"
          onClick={() => onDownVoteClick()}
        >
          {isThreadDownVoted ? <BiSolidDownvote /> : <BiDownvote />}{" "}
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
  user: PropTypes.arrayOf(PropTypes.object).isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralVote: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};
