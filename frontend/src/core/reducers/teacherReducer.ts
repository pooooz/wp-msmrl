import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';

const initialState = {
  teachers: [{ id: 0, first_name: '', patronumic: '', last_name: '' }],
  teacher: { id: 0, first_name: '', patronumic: '', last_name: '', user: { login: '' } },
  isLoading: false,
  status: '',
  message: ''
};

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    getAllTeachers: (state) => {
      state.isLoading = true;
    },

    getAllTeachersSuccess: (state, action) => {
      state.teachers = action.payload.teachers;
      state.isLoading = false;
    },

    getTeacherById: (state, _) => {
      state.isLoading = true;
    },

    getTeacherByIdSuccess: (state, action) => {
      state.teacher = action.payload.teacher;
      state.isLoading = false;
    },

    createTeacher: (state, _) => {
      state.isLoading = true;
    },

    createTeacherSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    updateTeacher: (state, _) => {
      state.isLoading = true;
    },

    updateTeacherSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    deleteTeacher: (state, _) => {
      state.isLoading = true;
    },

    deleteTeacherSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.teachers = state.teachers.filter((teacher) => teacher.id !== action.payload.id);
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
  getAllTeachers,
  getAllTeachersSuccess,
  getTeacherById,
  getTeacherByIdSuccess,
  createTeacher,
  createTeacherSuccess,
  updateTeacher,
  updateTeacherSuccess,
  deleteTeacher,
  deleteTeacherSuccess,
  actionFailed
} = teacherSlice.actions;

export default teacherSlice.reducer;
