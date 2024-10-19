// src/components/TaskList.js
import React from 'react';
import '../styles/styles.css'

const TaskList = ({ tasks, onEditTask, onDeleteTask, onToggleCompletion }) => {
  const uncompletedTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <ul className="task-list">
      {uncompletedTasks.map(task => (
        <li key={task.id} className={`task-item priority-${task.priority}`}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className={`priority-label ${task.priority}`}>{task.priority}</p>
          </div>
          <div>
            <button className="toggle-button" onClick={() => onToggleCompletion(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button className="edit-button" onClick={() => onEditTask(task)}>Edit</button>
            <button className="delete-button" onClick={() => onDeleteTask(task.id)}>Delete</button>
          </div>
        </li>
      ))}
      {completedTasks.map(task => (
        <li key={task.id} className={`task-item completed`}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className={`priority-label ${task.priority}`}>{task.priority}</p>
          </div>
          <div>
            <button className="toggle-button" onClick={() => onToggleCompletion(task.id)}>
              Undo
            </button>
            <button className="edit-button" onClick={() => onEditTask(task)}>Edit</button>
            <button className="delete-button" onClick={() => onDeleteTask(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
