import React, { useState, useEffect } from 'react';
import { Task } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';

interface AddTaskFormProps {
  onAdd: (task: Task) => void;
  onUpdate: (task: Task) => void;
  editingTask: Task | null;
  clearEdit: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd, onUpdate, editingTask, clearEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editingTask) {
      onUpdate({ ...editingTask, title, description });
    } else {
      const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        date: new Date().toDateString(),
        status: 'Pending',
      };
      onAdd(newTask);
    }

    setTitle('');
    setDescription('');
    clearEdit();
  };

  return (
    <div className="add-task">
      <input
        placeholder="Enter the title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter the description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editingTask ? 'Update' : 'Add'}
      </button>
    </div>
  );
};

export default AddTaskForm;
