// src/utils/tasks.js

const STORAGE_KEY = 'tasks';

export function getTasks() {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return tasks;
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(newTask) {
  const tasks = getTasks();
  tasks.push(newTask);
  saveTasks(tasks);
}

export function editTask(updatedTask) {
  const tasks = getTasks().map(task => 
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks(tasks);
}

export function deleteTask(taskId) {
  const tasks = getTasks().filter(task => task.id !== taskId);
  saveTasks(tasks);
}

export function toggleCompletion(taskId) {
  const tasks = getTasks().map(task => 
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks(tasks);
}
