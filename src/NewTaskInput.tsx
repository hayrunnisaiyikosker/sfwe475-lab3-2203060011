import { useState } from "react";

function NewTaskInput() {
  const [text, setText] = useState("");

  function handleAdd() {
    console.log(text);
    setText("");
  }

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default NewTaskInput;