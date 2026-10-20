import { useState } from "react";
function NewTaskInput() {
 const [text, setText] = useState("");
 return (
 <input
 value={text}
 onChange={(e) => setText(e.target.value)}
 placeholder="Add a task..."
 />
 );
}
export default NewTaskInput;
