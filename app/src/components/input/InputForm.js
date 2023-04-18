import React, { useState } from "react";

function InputForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Title: ", title);
    console.log("Text: ", text);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input type="submit" value="Submit" />
    </form>
  );
}

export default InputForm;

