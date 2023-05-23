import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';

const initialState = {
  current_disciplines: [
    {
      id: 0,
      year: 0,
      group: { id: 0, name: '', course: 0 },
      discipline_teachers: [
        {
          form_of_conducting_classes: '',
          teacher: { id: 0, first_name: '', patronumic: '', last_name: '' }
        }
      ]
    }
  ],
  current_discipline: {
    id: 0,
    year: 0,
    tasks: [{ id: 0, name: '', evaluation_scale: '', mandatory: false }]
  },
  isLoading: false,
  status: '',
  message: ''
};

export const currentDisciplineSlice = createSlice({
  name: 'currentDiscipline',
  initialState,
  reducers: {
    getCurrentDisciplineById: (state, _) => {
      state.isLoading = true;
    },

    getCurrentDisciplineByIdSuccess: (state, action) => {
      state.current_discipline = action.payload.current_discipline;
      state.isLoading = false;
    },

    getCurrentDisciplinesByDisciplineIdInThisYear: (state, _) => {
      state.isLoading = true;
    },

    getCurrentDisciplinesByDisciplineIdInThisYearSuccess: (state, action) => {
      state.current_disciplines = action.payload.current_disciplines;
      state.isLoading = false;
    },

    getCurrentDisciplinesByDisciplineId: (state, _) => {
      state.isLoading = true;
    },

    getCurrentDisciplinesByDisciplineIdSuccess: (state, action) => {
      state.current_disciplines = action.payload.current_disciplines;
      state.isLoading = false;
    },

    createCurrentDiscipline: (state, _) => {
      state.isLoading = true;
    },

    createCurrentDisciplineSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
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
  getCurrentDisciplineById,
  getCurrentDisciplineByIdSuccess,
  getCurrentDisciplinesByDisciplineIdInThisYear,
  getCurrentDisciplinesByDisciplineIdInThisYearSuccess,
  getCurrentDisciplinesByDisciplineId,
  getCurrentDisciplinesByDisciplineIdSuccess,
  createCurrentDiscipline,
  createCurrentDisciplineSuccess,
  actionFailid
} = currentDisciplineSlice.actions;

export default currentDisciplineSlice.reducer;
