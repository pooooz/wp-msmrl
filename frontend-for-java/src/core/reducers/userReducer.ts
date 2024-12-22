import { createSlice } from '@reduxjs/toolkit';
import { LocalStorageItemsEnum } from '../constants/LocalStorageItemsEnum';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';

const initialState = {
  role: localStorage.getItem(LocalStorageItemsEnum.Role) || '',
  isLoading: false,
  status: '',
  message: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateToken: (state) => {
      state.isLoading = true;
    },

    updateTokenSuccess: (state, action) => {
      state.role = action.payload.role;
      state.isLoading = false;
    },

    updateTokenFailed: (state) => {
      state.role = initialState.role;
      state.status = ResponseStatusEnum.ERROR;
      localStorage.removeItem(LocalStorageItemsEnum.AccessToken);
      localStorage.removeItem(LocalStorageItemsEnum.RefreshToken);
      localStorage.removeItem(LocalStorageItemsEnum.Role);
      localStorage.removeItem(LocalStorageItemsEnum.UserId);
      state.isLoading = false;
    },

    signIn: (state, _) => {
      state.isLoading = true;
    },

    signInSuccess: (state, action) => {
      state.role = action.payload.role;
      state.isLoading = false;
    },

    signInFailed: (state, action) => {
      state.role = initialState.role;
      state.status = ResponseStatusEnum.ERROR;
      state.message = action.payload.message;
      state.isLoading = false;
    },

    logout: (state) => {
      state.role = initialState.role;
      localStorage.removeItem(LocalStorageItemsEnum.AccessToken);
      localStorage.removeItem(LocalStorageItemsEnum.RefreshToken);
      localStorage.removeItem(LocalStorageItemsEnum.Role);
      localStorage.removeItem(LocalStorageItemsEnum.UserId);
    }
  }
});

export const {
  updateToken,
  updateTokenSuccess,
  updateTokenFailed,
  signIn,
  signInSuccess,
  signInFailed,
  logout
} = userSlice.actions;

export default userSlice.reducer;
