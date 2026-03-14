import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { ADD_TASK } from '../context/TaskReducer';

const TaskInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useTaskContext();

  const handleAddTask = () => {
    if (inputValue.trim() === '') {
      setError('Task cannot be empty!');
      return;
    }
    dispatch({ type: ADD_TASK, payload: inputValue.trim() });
    setInputValue('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddTask();
  };

  return (
    <div className="task-input-container">
      <div className="task-input-wrapper">
        <div className="input-group">
          <span className="input-icon">✏️</span>
          <input
            type="text"
            className={`task-input ${error ? 'input-error' : ''}`}
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyDown}
          />
          <button className="add-btn" onClick={handleAddTask}>
            <span className="btn-icon">+</span>
            <span className="btn-text">Add Task</span>
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default TaskInput;
