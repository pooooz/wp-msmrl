import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';
import { ResponseMessagesEnum } from '../constants/responseMessages';

const initialState = {
  resultsByTask: [
    {
      id: 0,
      mark: 0,
      comment: '',
      date: '',
      student: { id: 0, firstName: '', patronymic: '', lastName: '' }
    }
  ],

  resultsByStudent: [
    {
      id: 0,
      mark: 0,
      comment: '',
      date: '',
      task: {
        currentDiscipline: { discipline: { name: '' }, year: NaN },
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
    student: { id: 0, firstName: '', patronymic: '', lastName: '' },
    task: { id: 0, name: '', evaluationScale: '', mandatory: true }
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
      state.resultsByTask = action.payload;
      state.isLoading = false;
    },

    getResultsByStudentId: (state, _) => {
      state.isLoading = true;
    },

    getResultsByStudentIdSuccess: (state, action) => {
      state.resultsByStudent = action.payload;
      state.isLoading = false;
    },

    createResult: (state, _) => {
      state.isLoading = true;
    },

    createResultSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.RESULT_CREATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.RESULT_CREATED);
    },

    updateResult: (state, _) => {
      state.isLoading = true;
    },

    updateResultSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.RESULT_UPDATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.RESULT_UPDATED);
    },

    deleteResult: (state, _) => {
      state.isLoading = true;
    },

    deleteResultSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.RESULT_REMOVED;
      state.resultsByTask = state.resultsByTask.filter((result) => result.id !== action.payload.id);
      state.resultsByStudent = state.resultsByStudent.filter(
        (result) => result.id !== action.payload.id
      );
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.RESULT_REMOVED);
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
  actionFailed
} = resultSlice.actions;

export default resultSlice.reducer;
