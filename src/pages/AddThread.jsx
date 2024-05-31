import { useDispatch } from "react-redux";
import { ThreadInput } from "../components/molekul/ThreadInput";
import { asyncAddThread } from "../states/threads/action";

export const AddThread = () => {
  const dispatch = useDispatch();

  const onAddThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <ThreadInput addThread={onAddThread} />
    </div>
  );
};
