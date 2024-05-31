import { CommentItem } from "./CommentItem";
import PropTypes from "prop-types";

export const CommentList = ({
  userId,
  comments,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
}) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          upVoteComment={upVoteComment}
          downVoteComment={downVoteComment}
          neutralVoteComment={neutralVoteComment}
          userId={userId}
        />
      ))}
    </>
  );
};

CommentList.propTypes = {
  userId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
  neutralVoteComment: PropTypes.func.isRequired,
};
