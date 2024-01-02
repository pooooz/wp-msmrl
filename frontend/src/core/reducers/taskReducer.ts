import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';
import { ResponseMessagesEnum } from '../constants/responseMessages';

const initialState = {
  task: { id: NaN, name: '', mandatory: true, evaluationScale: '' },
  isLoading: false,
  status: '',
  message: ''
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTaskById: (state, _) => {
      state.isLoading = true;
    },

    getTaskByIdSuccess: (state, action) => {
      state.task = action.payload;
      state.isLoading = false;
    },

    createTask: (state, _) => {
      state.isLoading = true;
    },

    createTaskSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.TASK_CREATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.TASK_CREATED);
    },

    updateTask: (state, _) => {
      state.isLoading = true;
    },

    updateTaskSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.TASK_UPDATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.TASK_UPDATED);
    },

    deleteTask: (state, _) => {
      state.isLoading = true;
    },

    deleteTaskSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.TASK_REMOVED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.TASK_REMOVED);
    },

    actionFailed: (state, action) => {
      state.status = ResponseStatusEnum.ERROR;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.ERROR, action.payload.message);
    }
  }
});

export const {
  getTaskById,
  getTaskByIdSuccess,
  createTask,
  createTaskSuccess,
  updateTask,
  updateTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  actionFailed
} = taskSlice.actions;

export default taskSlice.reducer;
