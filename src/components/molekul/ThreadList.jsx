import { ThreadItem } from "./ThreadItem";

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
