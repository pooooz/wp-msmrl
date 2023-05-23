import { createSlice } from '@reduxjs/toolkit';
import { LocalStorageItemsEnum } from '../constants/LocalStorageItemsEnum';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';

const initialState = {
  role: '',
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

    updateTokenFailid: (state) => {
      state.role = initialState.role;
      state.status = ResponseStatusEnum.ERROR;
      localStorage.removeItem(LocalStorageItemsEnum.TOKEN);
      localStorage.removeItem(LocalStorageItemsEnum.ROLE);
      localStorage.removeItem(LocalStorageItemsEnum.USER_ID);
      state.isLoading = false;
    },

    signIn: (state, _) => {
      state.isLoading = true;
    },

    signInSuccess: (state, action) => {
      state.role = action.payload.role;
      state.isLoading = false;
    },

    signInFailid: (state, action) => {
      state.role = initialState.role;
      state.status = ResponseStatusEnum.ERROR;
      state.message = action.payload.message;
      state.isLoading = false;
    },

    logout: (state) => {
      state.role = initialState.role;
      localStorage.removeItem(LocalStorageItemsEnum.TOKEN);
      localStorage.removeItem(LocalStorageItemsEnum.ROLE);
      localStorage.removeItem(LocalStorageItemsEnum.USER_ID);
    }
  }
});

export const {
  updateToken,
  updateTokenSuccess,
  updateTokenFailid,
  signIn,
  signInSuccess,
  signInFailid,
  logout
} = userSlice.actions;

export default userSlice.reducer;
