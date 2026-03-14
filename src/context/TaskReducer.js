// Action Types
export const ADD_TASK = 'ADD_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CLEAR_TASKS = 'CLEAR_TASKS';

// Initial State
export const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

// Reducer Function
const TaskReducer = (state, action) => {
  let newTasks;

  switch (action.type) {
    case ADD_TASK:
      newTasks = [
        ...state.tasks,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };

    case TOGGLE_TASK:
      newTasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };

    case EDIT_TASK:
      newTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.text }
          : task
      );
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };

    case DELETE_TASK:
      newTasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };

    case CLEAR_TASKS:
      localStorage.removeItem('tasks');
      return { ...state, tasks: [] };

    default:
      return state;
  }
};

export default TaskReducer;
