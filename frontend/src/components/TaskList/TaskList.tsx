import type { Task } from '../types'
import TaskItem from '../TaskItem/TaskItem'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskID: number) => Promise<void>;
  onToggleCompletion: (taskID: number) => Promise<void>;
}

export default function TaskList({ tasks, onDeleteTask, onToggleCompletion }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id = {task.id}
          title = {task.title}
          completed = {task.completed}
          onDeleteTask={onDeleteTask}
          onToggleCompletion={onToggleCompletion}
        />
      ))}
    </div>
  )
}