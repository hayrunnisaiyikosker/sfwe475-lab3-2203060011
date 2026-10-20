import TaskCard from "./TaskCard";

function App() {
  return (
    <>
      <TaskCard title="Read Chapter 3" done={false} />
      <TaskCard title="Build TaskCard" done={true} />
    </>
  );
}

export default App;