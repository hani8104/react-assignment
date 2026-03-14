import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="app-wrapper">
        {/* Background Orbs */}
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>

        <div className="app-container">
          {/* Header */}
          <header className="app-header">
            <div className="header-logo">
              <span className="logo-icon">✅</span>
              <div>
                <h1 className="app-title">TaskFlow</h1>
                <p className="app-subtitle">Stay organized, stay productive</p>
              </div>
            </div>
          </header>

          {/* Stats Summary */}
          <TaskSummary />

          {/* Input */}
          <TaskInput />

          {/* Task List */}
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
