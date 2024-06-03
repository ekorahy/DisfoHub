import { ThreadItem } from "./ThreadItem";
import PropTypes from "prop-types";

export const ThreadList = ({
  threads,
  onUpVote,
  onDownVote,
  onNeutralVote,
  authUser,
}) => {
  return (
    <>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralVote={onNeutralVote}
          authUser={authUser}
        />
      ))}
    </>
  );
};

ThreadList.propTypes = {
  threads: PropTypes.array.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralVote: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};
