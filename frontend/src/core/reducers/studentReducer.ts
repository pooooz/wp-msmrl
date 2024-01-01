import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';

const initialState = {
  students: [{ id: 0, firstName: '', patronymic: '', lastName: '' }],
  student: { id: 0, firstName: '', patronymic: '', lastName: '', group: { id: 0, name: '' } },
  isLoading: false,
  status: '',
  message: ''
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    getAllStudents: (state) => {
      state.isLoading = true;
    },

    getAllStudentsSuccess: (state, action) => {
      state.students = action.payload.students;
      state.isLoading = false;
    },

    getStudentById: (state, _) => {
      state.isLoading = true;
    },

    getStudentByIdSuccess: (state, action) => {
      state.student = action.payload.student;
      state.isLoading = false;
    },

    getStudentsByTaskId: (state, _) => {
      state.isLoading = true;
    },

    getStudentsByTaskIdSuccess: (state, action) => {
      state.students = action.payload.students;
      state.isLoading = false;
    },

    createStudent: (state, _) => {
      state.isLoading = true;
    },

    createStudentSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    updateStudent: (state, _) => {
      state.isLoading = true;
    },

    updateStudentSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    deleteStudent: (state, _) => {
      state.isLoading = true;
    },

    deleteStudentSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.response.message;
      state.students = state.students.filter((student) => student.id !== action.payload.id);
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
  getAllStudents,
  getAllStudentsSuccess,
  getStudentById,
  getStudentByIdSuccess,
  getStudentsByTaskId,
  getStudentsByTaskIdSuccess,
  createStudent,
  createStudentSuccess,
  updateStudent,
  updateStudentSuccess,
  deleteStudent,
  deleteStudentSuccess,
  actionFailed
} = studentSlice.actions;

export default studentSlice.reducer;
