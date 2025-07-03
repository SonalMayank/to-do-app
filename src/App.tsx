import React, { useState, useEffect } from 'react';
import { Task } from './types/Task';
import { getTasksFromStorage, saveTasksToStorage } from './utils/localStorage';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');

  useEffect(() => {
    const stored = getTasksFromStorage();
    setTasks(stored);
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const addTask = (task: Task) => setTasks([...tasks, task]);

  const updateTask = (updated: Task) => {
    setTasks(prev => prev.map(task => (task.id === updated.id ? updated : task)));
    setEditingTask(null);
  };

  const deleteTask = (id: string) => setTasks(tasks.filter(task => task.id !== id));

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleStatusChange = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const filteredTasks = filter === 'All' ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div className="App">
      <h1 className="app-title">📝 My Smart To-Do Hub</h1>
      <AddTaskForm
        onAdd={addTask}
        onUpdate={updateTask}
        editingTask={editingTask}
        clearEdit={() => setEditingTask(null)}
      />

      <div className="task-nav">
        {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
          <span
            key={status}
            className={filter === status ? 'active' : ''}
            onClick={() => setFilter(status as any)}
          >
            {status}
          </span>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onUpdate={handleStatusChange}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default App;
