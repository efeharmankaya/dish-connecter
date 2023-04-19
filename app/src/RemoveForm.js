import React, { useState } from "react";

function DeleteForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDelete = () => {
    console.log("Deleting item with title:", title, "and text:", text);
    setTitle("");
    setText("");
  };

  return (
    <form>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        Text:
        <textarea value={text} onChange={handleTextChange} />
      </label>
      <br />
      <button onClick={handleDelete}>Delete</button>
    </form>
  );
}

export default DeleteForm;

