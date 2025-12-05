import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string) => Promise<void>;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState<string>('');
  
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
    if(trimmedTitle) {
      try {
        await onAddTask(trimmedTitle);
        setTitle('');
      }
      catch(error) {
        console.error("Failed to submit task with error: ", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={MAX_TASK_TITLE_LENGTH}
      />
      <button type="submit">Add Task</button>
    </form>
  )
}