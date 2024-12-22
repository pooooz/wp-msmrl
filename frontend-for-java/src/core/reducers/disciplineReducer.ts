import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';
import { ResponseMessagesEnum } from '../constants/responseMessages';

const initialState = {
  disciplines: [{ id: 0, name: '', controlForm: '' }],
  discipline: {
    id: 0,
    name: '',
    controlForm: ''
  },
  isLoading: false,
  status: '',
  message: ''
};

export const disciplineSlice = createSlice({
  name: 'discipline',
  initialState,
  reducers: {
    getAllDisciplines: (state) => {
      state.isLoading = true;
    },

    getAllDisciplinesSuccess: (state, action) => {
      state.disciplines = action.payload;
      state.isLoading = false;
    },

    getDisciplineById: (state, _) => {
      state.isLoading = true;
    },

    getDisciplineByIdSuccess: (state, action) => {
      state.discipline = action.payload;
      state.isLoading = false;
    },

    createDiscipline: (state, _) => {
      state.isLoading = true;
    },

    createDisciplineSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.DISCIPLINE_CREATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.DISCIPLINE_CREATED);
    },

    updateDiscipline: (state, _) => {
      state.isLoading = true;
    },

    updateDisciplineSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.DISCIPLINE_UPDATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.DISCIPLINE_UPDATED);
    },

    deleteDiscipline: (state, _) => {
      state.isLoading = true;
    },

    deleteDisciplineSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.DISCIPLINE_REMOVED;
      state.disciplines = state.disciplines.filter(
        (discipline) => discipline.id !== action.payload.id
      );
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.DISCIPLINE_REMOVED);
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
  getAllDisciplines,
  getAllDisciplinesSuccess,
  getDisciplineById,
  getDisciplineByIdSuccess,
  createDiscipline,
  createDisciplineSuccess,
  updateDiscipline,
  updateDisciplineSuccess,
  deleteDiscipline,
  deleteDisciplineSuccess,
  actionFailed
} = disciplineSlice.actions;

export default disciplineSlice.reducer;
