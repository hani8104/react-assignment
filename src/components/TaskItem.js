import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TOGGLE_TASK, EDIT_TASK, DELETE_TASK } from '../context/TaskReducer';

const TaskItem = ({ task }) => {
  const { dispatch } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);

  const handleToggle = () => {
    dispatch({ type: TOGGLE_TASK, payload: task.id });
  };

  const handleDelete = () => {
    dispatch({ type: DELETE_TASK, payload: task.id });
  };

  const handleEditSave = () => {
    if (editValue.trim() === '') return;
    dispatch({ type: EDIT_TASK, payload: { id: task.id, text: editValue.trim() } });
    setIsEditing(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') {
      setEditValue(task.text);
      setIsEditing(false);
    }
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`task-item ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-left">
        <button
          className={`checkbox-btn ${task.completed ? 'checked' : ''}`}
          onClick={handleToggle}
          title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed && <span className="checkmark">✓</span>}
        </button>

        <div className="task-content">
          {isEditing ? (
            <input
              type="text"
              className="edit-input"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleEditKeyDown}
              autoFocus
            />
          ) : (
            <>
              <p className={`task-text ${task.completed ? 'strikethrough' : ''}`}>
                {task.text}
              </p>
              <span className="task-date">Added {formatDate(task.createdAt)}</span>
            </>
          )}
        </div>
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="action-btn save-btn" onClick={handleEditSave} title="Save">
              💾 Save
            </button>
            <button
              className="action-btn cancel-btn"
              onClick={() => {
                setEditValue(task.text);
                setIsEditing(false);
              }}
              title="Cancel"
            >
              ✕ Cancel
            </button>
          </>
        ) : (
          <>
            {!task.completed && (
              <button
                className="action-btn edit-btn"
                onClick={() => setIsEditing(true)}
                title="Edit task"
              >
                ✏️ Edit
              </button>
            )}
            <button className="action-btn delete-btn" onClick={handleDelete} title="Delete task">
              🗑️ Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
