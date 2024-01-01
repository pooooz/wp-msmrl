import { createSlice } from '@reduxjs/toolkit';
import { ResponseStatusEnum } from '../constants/ResponseStatusEnum';
import { showToast } from '../functions/showToast';

const initialState = {
  groups: [{ id: 0, name: '', course: 0, specialization: { id: 0, name: '' } }],
  group: {
    id: 0,
    name: '',
    course: 0,
    students: [{ id: 0, first_name: '', patronumic: '', last_name: '' }],
    specialization: { id: 0, name: '' }
  },
  isLoading: false,
  status: '',
  message: ''
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    getAllGroups: (state) => {
      state.isLoading = true;
    },

    getAllGroupsSuccess: (state, action) => {
      state.groups = action.payload.groups;
      state.isLoading = false;
    },

    getGroupById: (state, _) => {
      state.isLoading = true;
    },

    getGroupByIdSuccess: (state, action) => {
      state.group = action.payload.group;
      state.isLoading = false;
    },

    createGroup: (state, _) => {
      state.isLoading = true;
    },

    createGroupSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    updateGroup: (state, _) => {
      state.isLoading = true;
    },

    updateGroupSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.message;
      state.isLoading = false;
      showToast(ResponseStatusEnum.OK, action.payload.message);
    },

    deleteGroup: (state, _) => {
      state.isLoading = true;
    },

    deleteGroupSuccess: (state, action) => {
      state.status = ResponseStatusEnum.OK;
      state.message = action.payload.response.message;
      state.groups = state.groups.filter((group) => group.id !== action.payload.id);
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
  getAllGroups,
  getAllGroupsSuccess,
  getGroupById,
  getGroupByIdSuccess,
  createGroup,
  createGroupSuccess,
  updateGroup,
  updateGroupSuccess,
  deleteGroup,
  deleteGroupSuccess,
  actionFailed
} = groupSlice.actions;

export default groupSlice.reducer;
