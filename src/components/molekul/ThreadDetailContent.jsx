import { postedAt } from "../../utils";
import parse from "html-react-parser";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import PropTypes from "prop-types";

export const ThreadDetailContent = ({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  onUpVote,
  onDownVote,
  onNeutralVote,
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
    if (!isThreadUpVoted && !isThreadDownVoted) {
      onDownVote(id);
    } else if (isThreadUpVoted) {
      onNeutralVote(id);
      onDownVote(id);
    } else if (isThreadDownVoted) {
      onNeutralVote(id);
    }
  };

  return (
    <div className="mb-4 border-b pb-6">
      <div className="mb-4 flex items-center gap-4">
        <img className="rounded-full" src={owner.avatar} width={50} alt="" />
        <div>
          <p className="font-bold">{owner.name}</p>
          <p className="text-sm">{postedAt(createdAt)}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="inline bg-slate-100 px-3 py-1 text-sm">#{category}</p>
      </div>
      <div className="mb-4">
        <h3 className="mb-2 font-bold">{title}</h3>
        <div>{parse(`${body}`)}</div>
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
          className="flex items-center gap-2 rounded bg-slate-100 px-3 py-1 hover:bg-slate-200"
          onClick={() => onDownVoteClick()}
        >
          {isThreadDownVoted ? <AiFillDislike /> : <AiOutlineDislike />}{" "}
          {downVotesBy.length}
        </button>
      </div>
    </div>
  );
};

ThreadDetailContent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralVote: PropTypes.func.isRequired,
};
