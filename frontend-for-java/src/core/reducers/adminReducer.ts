import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';
import { ResponseMessagesEnum } from '../constants/responseMessages';

const initialState = {
  admins: [{ id: 0, firstName: '', patronymic: '', lastName: '' }],
  admin: { id: 0, firstName: '', patronymic: '', lastName: '', user: { login: '' } },
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
      state.admins = action.payload;
      state.isLoading = false;
    },

    getAdminById: (state, _) => {
      state.isLoading = true;
    },

    getAdminByIdSuccess: (state, action) => {
      state.admin = action.payload;
      state.isLoading = false;
    },

    createAdmin: (state, _) => {
      state.isLoading = true;
    },

    createAdminSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.ADMIN_CREATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.ADMIN_CREATED);
    },

    updateAdmin: (state, _) => {
      state.isLoading = true;
    },

    updateAdminSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.ADMIN_UPDATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.ADMIN_UPDATED);
    },

    deleteAdmin: (state, _) => {
      state.isLoading = true;
    },

    deleteAdminSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.ADMIN_REMOVED;
      state.admins = state.admins.filter((admin) => admin.id !== action.payload.id);
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.ADMIN_REMOVED);
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
