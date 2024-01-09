import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';
import { ResponseMessagesEnum } from '../constants/responseMessages';

const initialState = {
  teachers: [{ id: 0, firstName: '', patronymic: '', lastName: '' }],
  teacher: { id: 0, firstName: '', patronymic: '', lastName: '', user: { login: '' } },
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
      state.teachers = action.payload;
      state.isLoading = false;
    },

    getTeacherById: (state, _) => {
      state.isLoading = true;
    },

    getTeacherByIdSuccess: (state, action) => {
      state.teacher = action.payload;
      state.isLoading = false;
    },

    createTeacher: (state, _) => {
      state.isLoading = true;
    },

    createTeacherSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.TEACHER_CREATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.TEACHER_CREATED);
    },

    updateTeacher: (state, _) => {
      state.isLoading = true;
    },

    updateTeacherSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.TEACHER_UPDATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.TEACHER_UPDATED);
    },

    deleteTeacher: (state, _) => {
      state.isLoading = true;
    },

    deleteTeacherSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.TEACHER_REMOVED;
      state.teachers = state.teachers.filter((teacher) => teacher.id !== action.payload.id);
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.TEACHER_REMOVED);
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
