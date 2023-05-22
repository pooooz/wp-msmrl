import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';

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
      state.specializations = action.payload.specializations;
      state.isLoading = false;
    },

    getSpecializationById: (state, _) => {
      state.isLoading = true;
    },

    getSpecializationByIdSuccess: (state, action) => {
      state.specialization = action.payload.specialization;
      state.isLoading = false;
    },

    addSpecialization: (state, _) => {
      state.isLoading = true;
    },

    addSpecializationSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    updateSpecialization: (state, _) => {
      state.isLoading = true;
    },

    updateSpecializationSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    deleteSpecialization: (state, _) => {
      state.isLoading = true;
    },

    deleteSpecializationSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.response.message;
      state.specializations = state.specializations.filter(
        (specialization) => specialization.id !== action.payload.id
      );
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    actionFailid: (state, action) => {
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
  actionFailid
} = specializationSlice.actions;

export default specializationSlice.reducer;
