import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';

const initialState = {
  admins: [{ id: 0, first_name: '', patronumic: '', last_name: '' }],
  admin: { id: 0, first_name: '', patronumic: '', last_name: '', user: { login: '' } },
  isLoading: false,
  status: '',
  message: ''
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    getAllAdmins: (state) => {
      state.isLoading = true;
    },

    getAllAdminsSuccess: (state, action) => {
      state.admins = action.payload.admins;
      state.isLoading = false;
    },

    getAdminById: (state, _) => {
      state.isLoading = true;
    },

    getAdminByIdSuccess: (state, action) => {
      state.admin = action.payload.admin;
      state.isLoading = false;
    },

    createAdmin: (state, _) => {
      state.isLoading = true;
    },

    createAdminSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    updateAdmin: (state, _) => {
      state.isLoading = true;
    },

    updateAdminSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    deleteAdmin: (state, _) => {
      state.isLoading = true;
    },

    deleteAdminSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.admins = state.admins.filter((admin) => admin.id !== action.payload.id);
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
  getAllAdmins,
  getAllAdminsSuccess,
  getAdminById,
  getAdminByIdSuccess,
  createAdmin,
  createAdminSuccess,
  updateAdmin,
  updateAdminSuccess,
  deleteAdmin,
  deleteAdminSuccess,
  actionFailed
} = adminSlice.actions;

export default adminSlice.reducer;
