
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

    simulateFetchTasks()
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
    const newTask: Task = {
      id: Date.now(),
      title: input.title,
      dueDate: input.dueDate || undefined,
      done: input.status === "done",
    };

    setTasks((prev) => [...prev, newTask]);
    setStatus("success");
  }

  function handleToggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  const showContent = status === "success" || status === "empty";

  return (
    <main>
      <div aria-live="polite">
        {status === "loading" && <p>Loading tasks...</p>}

        {status === "error" && (
          <p>We couldn't load your tasks.</p>
        )}

        {status === "empty" && (
          <p>No tasks yet. Add your first one below.</p>
        )}
      </div>

      {status === "error" && (
        <button type="button" onClick={loadTasks}>
          Try again
        </button>
      )}

      {showContent && (
        <>
          <NewTaskForm onAddTask={handleAddTask} />

          {status === "success" && (
            <>
              <FilterBar
                filter={filter}
                onFilterChange={setFilter}
              />

              <TaskList
                tasks={tasks}
                filter={filter}
                onToggleTask={handleToggleTask}
              />
            </>
          )}
        </>
      )}
    </main>
  );
}

export default TaskBoard;
