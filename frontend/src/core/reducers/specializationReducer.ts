import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';
import { ResponseMessagesEnum } from '../constants/responseMessages';

const initialState = {
  specializations: [
    {
      id: 0,
      name: ''
    }
  ],
  specialization: {
    id: 0,
    name: '',
    groups: [{ id: 0, name: '', course: 0 }]
  },
  isLoading: false,
  status: '',
  message: ''
};

export const specializationSlice = createSlice({
  name: 'specialization',
  initialState,
  reducers: {
    getAllSpecializations: (state) => {
      state.isLoading = true;
    },

    getAllSpecializationsSuccess: (state, action) => {
      state.specializations = action.payload;
      state.isLoading = false;
    },

    getSpecializationById: (state, _) => {
      state.isLoading = true;
    },

    getSpecializationByIdSuccess: (state, action) => {
      state.specialization = action.payload;
      state.isLoading = false;
    },

    addSpecialization: (state, _) => {
      state.isLoading = true;
    },

    addSpecializationSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.SPECIALIZATION_CREATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.SPECIALIZATION_CREATED);
    },

    updateSpecialization: (state, _) => {
      state.isLoading = true;
    },

    updateSpecializationSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.SPECIALIZATION_UPDATED;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.SPECIALIZATION_UPDATED);
    },

    deleteSpecialization: (state, _) => {
      state.isLoading = true;
    },

    deleteSpecializationSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = ResponseMessagesEnum.SPECIALIZATION_REMOVED;
      state.specializations = state.specializations.filter(
        (specialization) => specialization.id !== action.payload.id
      );
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, ResponseMessagesEnum.SPECIALIZATION_REMOVED);
    },

    actionFailed: (state, action) => {
      state.message = action.payload.message;
      state.status = ResponseStatusEnum.ERROR;
      state.isLoading = false;
      showToast(ResponseStatusEnum.ERROR, action.payload.message);
    }
  }
});

export const {
  getAllSpecializations,
  getAllSpecializationsSuccess,
  getSpecializationById,
  getSpecializationByIdSuccess,
  addSpecialization,
  addSpecializationSuccess,
  updateSpecialization,
  updateSpecializationSuccess,
  deleteSpecialization,
  deleteSpecializationSuccess,
  actionFailed
} = specializationSlice.actions;

export default specializationSlice.reducer;
