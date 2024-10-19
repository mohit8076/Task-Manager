// src/app/page.js
"use client"; // Ensure this is a client component

import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks, addTask, editTask, deleteTask, toggleCompletion } from '../utils/tasks';
import '../styles/styles.css'

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null); // Track the task being edited

  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks);
    setLoading(false);
  }, []);

  const handleAddTask = (newTask) => {
    addTask(newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEditTask = (updatedTask) => {
    editTask(updatedTask);
    setTasks((prevTasks) => prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setTaskToEdit(null); // Reset editing state
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  const handleToggleCompletion = (taskId) => {
    toggleCompletion(taskId);
    setTasks((prevTasks) => prevTasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Filter tasks based on the search input
  const filteredTasks = sortedTasks.filter(task => 
    task.title.toLowerCase().includes(search.toLowerCase()) || 
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Task Management App</h1>
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="search-input"
      />
      <TaskForm 
        onAddTask={handleAddTask} 
        taskToEdit={taskToEdit} 
        onEditTask={handleEditTask} 
        setSearch={setSearch} 
      />
      <TaskList 
        tasks={filteredTasks} 
        onEditTask={setTaskToEdit} // Set task to edit
        onDeleteTask={handleDeleteTask} 
        onToggleCompletion={handleToggleCompletion} 
      />
    </div>
  );
}
