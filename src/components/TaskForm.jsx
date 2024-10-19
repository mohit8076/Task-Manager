import React, { useState, useEffect } from 'react';
import '../styles/styles.css';

const TaskForm = ({ onAddTask, taskToEdit, onEditTask, setSearch }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  // Effect to populate the form if editing an existing task
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
    } else {
      resetForm();
    }
  }, [taskToEdit]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      // Call the edit function if editing
      onEditTask({ ...taskToEdit, title, description, priority });
    } else {
      // Call the add function if creating a new task
      onAddTask({ id: Date.now(), title, description, priority, completed: false });
    }
    resetForm(); // Clear input fields after adding/editing
    setSearch(''); // Clear search after adding/editing
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Task Title" 
        required 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Task Description" 
        required 
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
