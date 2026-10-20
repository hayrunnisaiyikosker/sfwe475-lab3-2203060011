import type { Task } from "./schemas";
import TaskCard from "./TaskCard";
function TaskList({ tasks }: { tasks: Task[] }) {
 return (
 <div>
 {tasks.map((task) => (
 <TaskCard key={task.id} title={task.title} done={task.done} />
 ))}
 </div>
 );
}
export default TaskList;
