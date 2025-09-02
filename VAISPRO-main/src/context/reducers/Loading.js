import { LOADER } from "../../utils/constants";

const initialState = {
  isLoading: false,
  loadingMessage: "",
  loadingProgress: 0,
  loadingTasks: {},
  errors: {}
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER:
      return { 
        ...state, 
        isLoading: action.payload,
        loadingMessage: action.message || "",
        loadingProgress: action.progress || 0
      };

    case "SET_LOADING_MESSAGE":
      return {
        ...state,
        loadingMessage: action.payload
      };

    case "SET_LOADING_PROGRESS":
      return {
        ...state,
        loadingProgress: Math.max(0, Math.min(100, action.payload))
      };

    case "START_TASK_LOADING":
      return {
        ...state,
        loadingTasks: {
          ...state.loadingTasks,
          [action.taskId]: {
            isLoading: true,
            message: action.message || "",
            startTime: new Date().toISOString()
          }
        }
      };

    case "FINISH_TASK_LOADING":
      const { [action.taskId]: removedTask, ...remainingTasks } = state.loadingTasks;
      return {
        ...state,
        loadingTasks: remainingTasks,
        isLoading: Object.keys(remainingTasks).length > 0
      };

    case "UPDATE_TASK_PROGRESS":
      return {
        ...state,
        loadingTasks: {
          ...state.loadingTasks,
          [action.taskId]: {
            ...state.loadingTasks[action.taskId],
            progress: action.progress,
            message: action.message || state.loadingTasks[action.taskId]?.message || ""
          }
        }
      };

    case "SET_LOADING_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.errorId]: {
            message: action.message,
            timestamp: new Date().toISOString(),
            code: action.code || null
          }
        }
      };

    case "CLEAR_LOADING_ERROR":
      const { [action.errorId]: removedError, ...remainingErrors } = state.errors;
      return {
        ...state,
        errors: remainingErrors
      };

    case "CLEAR_ALL_LOADING_ERRORS":
      return {
        ...state,
        errors: {}
      };

    case "RESET_LOADING_STATE":
      return initialState;

    default:
      return state;
  }
};

// Action creators for loading states
export const startTaskLoading = (taskId, message) => ({
  type: "START_TASK_LOADING",
  taskId,
  message
});

export const finishTaskLoading = (taskId) => ({
  type: "FINISH_TASK_LOADING",
  taskId
});

export const updateTaskProgress = (taskId, progress, message) => ({
  type: "UPDATE_TASK_PROGRESS",
  taskId,
  progress,
  message
});

export const setLoadingError = (errorId, message, code) => ({
  type: "SET_LOADING_ERROR",
  errorId,
  message,
  code
});

export const clearLoadingError = (errorId) => ({
  type: "CLEAR_LOADING_ERROR",
  errorId
});

export const clearAllLoadingErrors = () => ({
  type: "CLEAR_ALL_LOADING_ERRORS"
});

export const resetLoadingState = () => ({
  type: "RESET_LOADING_STATE"
});
