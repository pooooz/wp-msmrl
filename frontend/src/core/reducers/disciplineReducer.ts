import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';

const initialState = {
  disciplines: [{ id: 0, name: '', control_form: '' }],
  discipline: {
    id: 0,
    name: '',
    control_form: ''
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
      state.disciplines = action.payload.disciplines;
      state.isLoading = false;
    },

    getDisciplineById: (state, _) => {
      state.isLoading = true;
    },

    getDisciplineByIdSuccess: (state, action) => {
      state.discipline = action.payload.discipline;
      state.isLoading = false;
    },

    createDiscipline: (state, _) => {
      state.isLoading = true;
    },

    createDisciplineSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    updateDiscipline: (state, _) => {
      state.isLoading = true;
    },

    updateDisciplineSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    deleteDiscipline: (state, _) => {
      state.isLoading = true;
    },

    deleteDisciplineSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.disciplines = state.disciplines.filter(
        (discipline) => discipline.id !== action.payload.id
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
  actionFailid
} = disciplineSlice.actions;

export default disciplineSlice.reducer;
