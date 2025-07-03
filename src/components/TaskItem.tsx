import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Task['status'];
    onStatusChange({ ...task, status: newStatus });
  };

  return (
    <div className="task-item">
      <div>
        <strong>{task.title}</strong>
        <p>{task.description}</p>
        <small>{task.date}</small>
      </div>
      <div>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={() => onEdit(task)}>✏️</button>
        <button onClick={() => onDelete(task.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default TaskItem;
