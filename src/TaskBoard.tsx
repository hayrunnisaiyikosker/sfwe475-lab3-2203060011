import { useState, useEffect } from "react";
import type { Task } from "./schemas";
import { simulateFetchTasks } from "./mockApi";
import TaskList from "./TaskList";
import NewTaskInput from "./NewTaskInput";
import FilterBar from "./FilterBar";
import type { Filter } from "./FilterBar";

function TaskBoard() {
  const [status, setStatus] =
    useState<"loading" | "success" | "empty" | "error">("loading");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    simulateFetchTasks()
      .then((data) => {
        setTasks(data);
        setStatus(data.length === 0 ? "empty" : "success");
      })
      .catch(() => setStatus("error"));
  }, []);

  function handleAddTask(title: string) {
    setTasks([...tasks, { id: tasks.length + 1, title, done: false }]);
  }

  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  if (status === "loading") return <p>Loading tasks...</p>;
  if (status === "error") return <p>We couldn't load your tasks.</p>;
  if (status === "empty") return <p>No tasks yet. Add your first one below.</p>;

  return (
    <div>
      <NewTaskInput onAddTask={handleAddTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TaskList
        tasks={tasks}
        filter={filter}
        onToggleTask={handleToggleTask}
      />
    </div>
  );
}

export default TaskBoard;