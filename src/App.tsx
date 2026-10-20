import TaskCard from "./TaskCard";

function App() {
  return (
    <>
      <TaskCard title="Read Chapter 3" done={false} dueDate="2026-10-25" />
      <TaskCard title="Build TaskCard" done={true} />
    </>
  );
}

export default App;