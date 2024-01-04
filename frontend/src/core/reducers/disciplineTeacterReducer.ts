import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';
import { ResponseMessagesEnum } from '../constants/responseMessages';

const initialState = {
  disciplines_teacher: [
    {
      id: 0,
      formOfConductingClasses: '',
      currentDiscipline: {
        id: 0,
        discipline: { id: 0, name: '', controlForm: '' },
        group: { id: 0, name: '', course: 0 }
      }
    }
  ],
  disciplineTeachers: [
    {
      id: 0,
      formOfConductingClasses: '',
      teacher: { id: 0, firstName: '', patronymic: '', lastName: '' }
    }
  ],
  isLoading: false,
  status: '',
  message: ''
};

export const disciplineTeacherSlice = createSlice({
  name: 'disciplineTeacher',
  initialState,
  reducers: {
    getCurrentDisciplinesByTeacherId: (state, _) => {
      state.isLoading = true;
    },

    getCurrentDisciplinesByTeacherIdSuccess: (state, action) => {
      state.disciplines_teacher = action.payload;
      state.isLoading = false;
    },

    getTeachersByCurrentDisciplineId: (state, _) => {
      state.isLoading = true;
    },

    getTeachersByCurrentDisciplineIdSuccess: (state, action) => {
      state.disciplineTeachers = action.payload;
      state.isLoading = false;
    },

    createDisciplineTeacher: (state, _) => {
      state.isLoading = true;
    },

    createDisciplineTeacherSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.DISCIPLINE_TEACHER_CREATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.DISCIPLINE_TEACHER_CREATED);
    },

    deleteDisciplineTeacher: (state, _) => {
      state.isLoading = true;
    },

    deleteDisciplineTeacherSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.DISCIPLINE_TEACHER_REMOVED;
      state.disciplineTeachers = state.disciplineTeachers.filter(
        (disciplineTeacher) => disciplineTeacher.id !== action.payload.id
      );
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.DISCIPLINE_TEACHER_REMOVED);
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
  getCurrentDisciplinesByTeacherId,
  getCurrentDisciplinesByTeacherIdSuccess,
  getTeachersByCurrentDisciplineId,
  getTeachersByCurrentDisciplineIdSuccess,
  createDisciplineTeacher,
  createDisciplineTeacherSuccess,
  deleteDisciplineTeacher,
  deleteDisciplineTeacherSuccess,
  actionFailed
} = disciplineTeacherSlice.actions;

export default disciplineTeacherSlice.reducer;
