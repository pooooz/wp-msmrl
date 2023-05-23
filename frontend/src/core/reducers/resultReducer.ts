import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';

const initialState = {
  resultsByTask: [
    {
      id: 0,
      mark: 0,
      comment: '',
      date: '',
      student: { id: 0, first_name: '', patronumic: '', last_name: '' }
    }
  ],

  resultsByStudent: [
    {
      id: 0,
      mark: 0,
      comment: '',
      date: '',
      task: {
        current_discipline: { discipline: { name: '' }, year: NaN },
        mandatory: true,
        name: ''
      }
    }
  ],
  result: {
    id: 0,
    mark: 0,
    comment: '',
    date: '',
    student: { id: 0, first_name: '', patronumic: '', last_name: '' },
    task: { id: 0, name: '', evaluation_scale: '', mandatory: true }
  },
  isLoading: false,
  status: '',
  message: ''
};

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    getResultById: (state, _) => {
      state.isLoading = true;
    },

    getResultByIdSuccess: (state, action) => {
      state.result = action.payload.result;
      state.isLoading = false;
    },

    getResultsByTaskId: (state, _) => {
      state.isLoading = true;
    },

    getResultsByTaskIdSuccess: (state, action) => {
      state.resultsByTask = action.payload.results;
      state.isLoading = false;
    },

    getResultsByStudentId: (state, _) => {
      state.isLoading = true;
    },

    getResultsByStudentIdSuccess: (state, action) => {
      state.resultsByStudent = action.payload.results;
      state.isLoading = false;
    },

    createResult: (state, _) => {
      state.isLoading = true;
    },

    createResultSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    updateResult: (state, _) => {
      state.isLoading = true;
    },

    updateResultSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    deleteResult: (state, _) => {
      state.isLoading = true;
    },

    deleteResultSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.resultsByTask = state.resultsByTask.filter((result) => result.id !== action.payload.id);
      state.resultsByStudent = state.resultsByStudent.filter(
        (result) => result.id !== action.payload.id
      );
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    actionFailid: (state, action) => {
      state.status = ResponseStatusEnum.ERROR;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.ERROR, action.payload.message);
    }
  }
});

export const {
  getResultById,
  getResultByIdSuccess,
  getResultsByTaskId,
  getResultsByTaskIdSuccess,
  getResultsByStudentId,
  getResultsByStudentIdSuccess,
  createResult,
  createResultSuccess,
  updateResult,
  updateResultSuccess,
  deleteResult,
  deleteResultSuccess,
  actionFailid
} = resultSlice.actions;

export default resultSlice.reducer;
