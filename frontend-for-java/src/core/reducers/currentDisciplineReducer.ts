import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';
import { ResponseMessagesEnum } from '../constants/responseMessages';

const initialState = {
  currentDisciplines: [
    {
      id: 0,
      year: 0,
      group: { id: 0, name: '', course: 0 },
      disciplineTeachers: [
        {
          formOfConductingClasses: '',
          teacher: { id: 0, firstName: '', patronymic: '', lastName: '' }
        }
      ]
    }
  ],
  currentDiscipline: {
    id: 0,
    year: 0,
    tasks: [{ id: 0, name: '', evaluationScale: '', mandatory: false }]
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
      state.currentDiscipline = action.payload;
      state.isLoading = false;
    },

    getCurrentDisciplinesByDisciplineIdInThisYear: (state, _) => {
      state.isLoading = true;
    },

    getCurrentDisciplinesByDisciplineIdInThisYearSuccess: (state, action) => {
      state.currentDisciplines = action.payload;
      state.isLoading = false;
    },

    getCurrentDisciplinesByDisciplineId: (state, _) => {
      state.isLoading = true;
    },

    getCurrentDisciplinesByDisciplineIdSuccess: (state, action) => {
      state.currentDisciplines = action.payload;
      state.isLoading = false;
    },

    createCurrentDiscipline: (state, _) => {
      state.isLoading = true;
    },

    createCurrentDisciplineSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.CURRENT_DISCIPLINE_CREATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.CURRENT_DISCIPLINE_CREATED);
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
  getCurrentDisciplineById,
  getCurrentDisciplineByIdSuccess,
  getCurrentDisciplinesByDisciplineIdInThisYear,
  getCurrentDisciplinesByDisciplineIdInThisYearSuccess,
  getCurrentDisciplinesByDisciplineId,
  getCurrentDisciplinesByDisciplineIdSuccess,
  createCurrentDiscipline,
  createCurrentDisciplineSuccess,
  actionFailed
} = currentDisciplineSlice.actions;

export default currentDisciplineSlice.reducer;
