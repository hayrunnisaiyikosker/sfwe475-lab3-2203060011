import { useState, useEffect, useCallback } from "react";
import type { Task, CreateTaskInput } from "./schemas";
import { simulateFetchTasks } from "./mockApi";
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import FilterBar from "./FilterBar";
import type { Filter } from "./FilterBar";

const MIN_LOADING_MS = 400;

function TaskBoard() {
  const [status, setStatus] =
    useState<"loading" | "success" | "empty" | "error">("loading");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const loadTasks = useCallback(() => {
    setStatus("loading");
    const start = Date.now();

    const finish = (apply: () => void) => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
      setTimeout(apply, remaining);
    };

    simulateFetchTasks() // delayMs: 50 testini kaldırdım
      .then((data) =>
        finish(() => {
          setTasks(data);
          setStatus(data.length === 0 ? "empty" : "success");
        })
      )
      .catch(() => finish(() => setStatus("error")));
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  function handleAddTask(input: CreateTaskInput) {
    setTasks((prev) => [
      ...prev,
      { id: prev.length + 1, title: input.title, done: false },
    ]);
    setStatus("success");
  }

  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  if (status === "loading") return <p>Loading tasks...</p>;
  if (status === "error")
    return (
      <div>
        <p>We couldn't load your tasks.</p>
        <button onClick={loadTasks}>Try again</button>
      </div>
    );

  return (
    <div>
      <NewTaskForm onAddTask={handleAddTask} />
      {status === "empty" ? (
        <p>No tasks yet. Add your first one below.</p>
      ) : (
        <>
          <FilterBar filter={filter} onFilterChange={setFilter} />
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggleTask={handleToggleTask}
          />
        </>
      )}
    </div>
  );
}

export default TaskBoard;