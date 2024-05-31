import { useNavigate } from "react-router-dom";
import useInput from "../../custom_hooks/useInput";
import PropTypes from "prop-types";

export const ThreadInput = ({ addThread }) => {
  const [title, onTitleChange] = useInput("");
  const [category, onCategoryChange] = useInput("");
  const [body, onBodyChange] = useInput("");
  const navigate = useNavigate();

  const addThreadHandler = (event) => {
    event.preventDefault();
    addThread({ title, category, body });
    navigate("/");
  };

  return (
    <form className="grid w-full md:w-4/5" onSubmit={addThreadHandler}>
      <div className="mb-4">
        <label className="block" htmlFor="title">
          Title
        </label>
        <input
          className="w-full border"
          type="text"
          id="title"
          value={title}
          onChange={onTitleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block" htmlFor="category">
          Category
        </label>
        <input
          className="w-full border"
          type="text"
          id="category"
          value={category}
          onChange={onCategoryChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block" htmlFor="body">
          Body
        </label>
        <textarea
          className="min-h-36 w-full border"
          type="text"
          id="body"
          value={body}
          onChange={onBodyChange}
          required
        ></textarea>
      </div>
      <button
        className="bg-slate-600 py-2 text-white hover:bg-slate-700"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};
