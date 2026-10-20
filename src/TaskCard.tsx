import { useState } from "react";
import type { Task } from "./schemas";

type TaskCardProps = Pick<Task, "title" | "done" | "dueDate">;

function TaskCard({ title, done: initialDone, dueDate }: TaskCardProps) {
  const [done, setDone] = useState(initialDone);

  return (
    <div className="task-card">
      <h3>{title}</h3>
      {dueDate && <p>Due: {dueDate}</p>}
      <input
        type="checkbox"
        checked={done}
        onChange={() => setDone(!done)}
      />
    </div>
  );
}

export default TaskCard;