import { useState } from "react";
import './TaskForm.css';

interface TaskFormProps {
  onAddTask: (title: string) => Promise<void>;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const MAX_TASK_TITLE_LENGTH = 256;
  const PLACEHOLDERS = [
    "I need to...",
    "What do you need to get done?",
    "Can't forget to...",
    "My next to-do is..."
  ];


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let trimmedTitle = title.trim()
    if(trimmedTitle && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onAddTask(trimmedTitle);
        setTitle('');
      }
      catch(error) {
        console.error("Failed to submit task with error: ", error);
      }
      finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={MAX_TASK_TITLE_LENGTH}
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}