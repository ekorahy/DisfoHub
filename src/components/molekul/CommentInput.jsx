import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useState } from "react";
import PropTypes from "prop-types";

export const CommentInput = ({ comment }) => {
  const [content, setContent] = useState(() => EditorState.createEmpty());

  const onThreadCommentHandler = (event) => {
    event.preventDefault();

    const contentState = content.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    comment(htmlContent);
    setContent(EditorState.createEmpty());
  };

  return (
    <form className="grid gap-2" onSubmit={onThreadCommentHandler}>
      <div className="border p-2">
        <Editor
          editorState={content}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setContent}
        />
      </div>
      <button
        type="submit"
        className="bg-slate-600 py-2 text-white hover:bg-slate-700"
      >
        Add
      </button>
    </form>
  );
};

CommentInput.propTypes = {
  comment: PropTypes.func.isRequired,
};
