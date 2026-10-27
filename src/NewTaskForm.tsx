import { useState } from "react";
import { CreateTaskSchema } from "./schemas";
import type { CreateTaskInput } from "./schemas";

type Props = {
  onAddTask: (input: CreateTaskInput) => void;
};

function NewTaskForm({ onAddTask }: Props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = CreateTaskSchema.safeParse({ title, dueDate });
    
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    onAddTask(result.data);
    setTitle("");
    setDueDate("");
    
  }

  return (
  <form onSubmit={handleSubmit}>
    <label htmlFor="title">Task title</label>
    <input
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    {errors.title && <p>{errors.title[0]}</p>}

    <label htmlFor="dueDate">Due date</label>
    <input
      id="dueDate"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
    />
    {errors.dueDate && <p>{errors.dueDate[0]}</p>}

    <button type="submit">Add task</button>
  </form>
);
}

export default NewTaskForm;