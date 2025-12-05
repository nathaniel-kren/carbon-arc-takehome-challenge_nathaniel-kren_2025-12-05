import './TaskItem.css'

interface TaskItemProps {
  id: number;
  title: string;
  completed: boolean;
  onDeleteTask: (taskID: number) => Promise<void>;
  onToggleCompletion: (taskId: number) => Promise<void>;
}

export default function TaskItem({ id, title, completed, onDeleteTask, onToggleCompletion }: TaskItemProps) {
  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <div
        className="task-item-checkbox"
        onClick={() => onToggleCompletion(id)}
        role="checkbox"
        aria-checked={completed}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleCompletion(id);
          }
        }}
      />
      <div className="task-item-title">{title}</div>
      <div className="task-item-actions">
        <button
          className="toggle-btn"
          onClick={() => onToggleCompletion(id)}
        >
          Mark {completed ? 'Inc' : 'C'}omplete
        </button>
        <button
          className="delete-btn"
          onClick={() => onDeleteTask(id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}