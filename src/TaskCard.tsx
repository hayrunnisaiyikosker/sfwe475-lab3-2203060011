import { useState } from "react";
import type { Task } from "./schemas";
import TaskCheckbox from "./TaskCheckbox";

type TaskCardProps = Pick<Task, "title" | "done" | "dueDate">;

function TaskCard({ title, done: initialDone, dueDate }: TaskCardProps) {
  const [done, setDone] = useState(initialDone);

  return (
    <div className="task-card">
      <h3>{title}</h3>
      {dueDate && <p>Due: {dueDate}</p>}
      <TaskCheckbox done={done} onToggle={() => setDone(!done)} />
    </div>
  );
}

export default TaskCard;