import { useDispatch } from "react-redux";
import { ThreadInput } from "../components/molekul/ThreadInput";
import { asyncAddThread } from "../states/threads/action";

export const AddThread = () => {
  const dispatch = useDispatch();

  const onAddThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
  };

  return (
    <div className="mt-20 flex items-center justify-center p-4">
      <div>
        <div className="border-b border-dashed py-4">
          <h2 className="text-lg font-bold">Add New Thread Form</h2>
          <p className="text-sm">
            Please fill in the details below to create a new thread. Be sure to
            provide a descriptive title, category and content to engage other
            users.
          </p>
        </div>
        <ThreadInput addThread={onAddThread} />
      </div>
    </div>
  );
};
