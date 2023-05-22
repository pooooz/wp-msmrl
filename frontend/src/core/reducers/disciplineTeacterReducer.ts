import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';

const initialState = {
  disciplines_teacher: [
    {
      id: 0,
      form_of_conducting_classes: '',
      current_discipline: {
        id: 0,
        discipline: { id: 0, name: '', control_form: '' },
        group: { id: 0, name: '', course: 0 }
      }
    }
  ],
  discipline_teachers: [
    {
      id: 0,
      form_of_conducting_classes: '',
      teacher: { id: 0, first_name: '', patronumic: '', last_name: '' }
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
      state.disciplines_teacher = action.payload.disciplines_teacher;
      state.isLoading = false;
    },

    getTeachersByCurrentDisciplineId: (state, _) => {
      state.isLoading = true;
    },

    getTeachersByCurrentDisciplineIdSuccess: (state, action) => {
      state.discipline_teachers = action.payload.discipline_teachers;
      state.isLoading = false;
    },

    createDisciplineTeacher: (state, _) => {
      state.isLoading = true;
    },

    createDisciplineTeacherSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    deleteDisciplineTeacher: (state, _) => {
      state.isLoading = true;
    },

    deleteDisciplineTeacherSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.discipline_teachers = state.discipline_teachers.filter(
        (disciplineTeacher) => disciplineTeacher.id !== action.payload.id
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
  getCurrentDisciplinesByTeacherId,
  getCurrentDisciplinesByTeacherIdSuccess,
  getTeachersByCurrentDisciplineId,
  getTeachersByCurrentDisciplineIdSuccess,
  createDisciplineTeacher,
  createDisciplineTeacherSuccess,
  deleteDisciplineTeacher,
  deleteDisciplineTeacherSuccess,
  actionFailid
} = disciplineTeacherSlice.actions;

export default disciplineTeacherSlice.reducer;
