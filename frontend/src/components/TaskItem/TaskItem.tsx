import './TaksItem.css'

interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  onDeleteTask: (taskID: number) => Promise<void>;
  onToggleCompletion: (taskId: number) => Promise<void>;
}

export default function TaskItem({ id, title, completed, onDeleteTask, onToggleCompletion }: TaskItemProps) {
  return (
    <div className="task-item">
      <div>{title}</div>
      <button
        onClick={() => onToggleCompletion(id)}
      >
        Mark { completed ? "Inc" : "C" }omplete
      </button>
      <button
        onClick={() => onDeleteTask(id)}
      >
        Delete
      </button>
    </div>
  )
}