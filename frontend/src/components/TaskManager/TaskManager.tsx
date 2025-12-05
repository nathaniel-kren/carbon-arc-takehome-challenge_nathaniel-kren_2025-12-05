import { useState, useEffect } from "react"
import axios from 'axios';
import type { Task, Stats } from '../types'
import TaskList from '../TaskList/TaskList'
import TaskForm from "../TaskForm/TaskForm";
import TaskStats from "../TaskStats/TaskStats";
import './TaskManager.css'


export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, completed: 0, pending: 0, rate: 100 })

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get<Record<string, Task>>("/tasks/");
        setTasks(Object.values(res.data));
      }
      catch(error) {
        console.error("Failed to fetch tasks with error: ", error);
      }
    };

    fetchTasks();
  }, []);

  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get<Stats>("/tasks/stats");
        setStats(res.data);
      }
      catch(error) {
        console.error("Failed to get stats with error: ", error);
      }
    };

    fetchStats();
  }, [tasks]);


  const handleAddTask = async (title: string) => {
    try {
      const res = await axios.post<Task>('/tasks/', { title });
      const newTask = res.data;

      setTasks(prev => [...prev, newTask]);
    }
    catch(error) {
      console.error("Failed to add tasks with error: ", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete<Task>(`/tasks/${id}`);
      setTasks(prev => prev.filter(task => task.id !== id));
    }
    catch(error) {
      console.error("Failed to delete task with error: ", error);
    }
  };

  const handleToggleCompletion = async (id: number) => {
    try {
      await axios.put<Task>(`/tasks/${id}/complete`);
      setTasks(prev => prev.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task 
      ));
    }
    catch(error) {
      console.error("Failed to toggle task completion with error: ", error);
    }
  };


  return  (
    <div className="task-manager">
      <TaskListTitle />
      <TaskStats stats={stats}/>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleCompletion={handleToggleCompletion} />
    </div>

  )
}

function TaskListTitle() {
  return (
    <div className="task-manager-title">
      My Task List
    </div>
  )
}