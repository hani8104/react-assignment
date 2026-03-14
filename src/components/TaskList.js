import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { CLEAR_TASKS } from '../context/TaskReducer';

const TaskList = () => {
  const { state, dispatch } = useTaskContext();
  const [filter, setFilter] = useState('all');

  const { tasks } = state;

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      dispatch({ type: CLEAR_TASKS });
    }
  };

  return (
    <div className="task-list-container">
      {tasks.length > 0 && (
        <div className="task-list-header">
          <div className="filter-tabs">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                className={`filter-tab ${filter === f ? 'active-filter' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="filter-count">
                  {f === 'all'
                    ? tasks.length
                    : f === 'active'
                    ? tasks.filter((t) => !t.completed).length
                    : tasks.filter((t) => t.completed).length}
                </span>
              </button>
            ))}
          </div>

          <button className="clear-all-btn" onClick={handleClearAll}>
            🗑️ Clear All
          </button>
        </div>
      )}

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            {tasks.length === 0 ? (
              <>
                <div className="empty-icon">📋</div>
                <h3>No tasks yet</h3>
                <p>Add your first task above to get started!</p>
              </>
            ) : (
              <>
                <div className="empty-icon">🎉</div>
                <h3>No {filter} tasks</h3>
                <p>
                  {filter === 'active'
                    ? 'All tasks are completed!'
                    : 'No completed tasks yet.'}
                </p>
              </>
            )}
          </div>
        ) : (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default TaskList;
