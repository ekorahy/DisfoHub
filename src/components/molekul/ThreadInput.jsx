import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../custom_hooks/useInput";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export const ThreadInput = ({ addThread }) => {
  const [title, onTitleChange] = useInput("");
  const [category, onCategoryChange] = useInput("");
  const [body, setBody] = useState(() => EditorState.createEmpty());
  const navigate = useNavigate();

  const addThreadHandler = (event) => {
    event.preventDefault();

    const contentState = body.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);

    addThread({ title, category, body: htmlContent });
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
        <div className="border p-2" id="body">
          <Editor
            editorState={body}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setBody}
          />
        </div>
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
