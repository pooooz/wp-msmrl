import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';

const initialState = {
  task: { id: NaN, name: '', mandatory: true, evaluation_scale: '' },
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
      state.task = action.payload.task;
      state.isLoading = false;
    },

    createTask: (state, _) => {
      state.isLoading = true;
    },

    createTaskSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    updateTask: (state, _) => {
      state.isLoading = true;
    },

    updateTaskSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    deleteTask: (state, _) => {
      state.isLoading = true;
    },

    deleteTaskSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
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
