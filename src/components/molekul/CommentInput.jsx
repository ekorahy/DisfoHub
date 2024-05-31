import useInput from "../../custom_hooks/useInput";

export const CommentInput = ({ comment }) => {
  const [content, onContentChange] = useInput("");

  const onThreadCommentHandler = (event) => {
    event.preventDefault()
    comment(content);
  };

  return (
    <form className="grid gap-2" onSubmit={onThreadCommentHandler}>
      <textarea
        className="h-28 border p-2"
        placeholder="Write your comment..."
        value={content}
        onChange={onContentChange}
        required
      ></textarea>
      <button type="submit" className="bg-slate-600 py-2 text-white hover:bg-slate-700">
        Add
      </button>
    </form>
  );
};
