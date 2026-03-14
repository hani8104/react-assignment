import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskSummary = () => {
  const { state } = useTaskContext();
  const { tasks } = state;

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="task-summary">
      <div className="summary-cards">
        <div className="summary-card total-card">
          <div className="card-icon">📝</div>
          <div className="card-info">
            <span className="card-number">{total}</span>
            <span className="card-label">Total Tasks</span>
          </div>
        </div>

        <div className="summary-card active-card">
          <div className="card-icon">⏳</div>
          <div className="card-info">
            <span className="card-number">{active}</span>
            <span className="card-label">Active</span>
          </div>
        </div>

        <div className="summary-card completed-card">
          <div className="card-icon">✅</div>
          <div className="card-info">
            <span className="card-number">{completed}</span>
            <span className="card-label">Completed</span>
          </div>
        </div>
      </div>

      {total > 0 && (
        <div className="progress-container">
          <div className="progress-header">
            <span className="progress-label">Overall Progress</span>
            <span className="progress-percentage">{progress}%</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSummary;
