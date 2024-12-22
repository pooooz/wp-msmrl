import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE, GET, PATCH, POST } from '../api/requests';
import {
  actionFailed,
  createGroup,
  createGroupSuccess,
  deleteGroup,
  deleteGroupSuccess,
  getAllGroups,
  getAllGroupsSuccess,
  getGroupById,
  getGroupByIdSuccess,
  updateGroup,
  updateGroupSuccess
} from '../reducers/groupReducer';

const GROUP_BASE_URL = '/groups';

function* getAllGroupsWorker() {
  try {
    const groups: any[] = yield call(async () => await GET(GROUP_BASE_URL));
    yield put(getAllGroupsSuccess(groups));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* getGroupByIdWorker({ payload }: any) {
  try {
    const group: object = yield call(async () => await GET(`${GROUP_BASE_URL}/${payload}`));
    yield put(getGroupByIdSuccess(group));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* createGroupWorker({ payload }: any) {
  try {
    const group: object = yield call(async () => await POST(GROUP_BASE_URL, payload));
    yield put(createGroupSuccess(group));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* updateGroupWorker({ payload }: any) {
  try {
    const { id, ...rest } = payload;
    const response: object = yield call(async () => await PATCH(`${GROUP_BASE_URL}/${id}`, rest));
    yield put(updateGroupSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* deleteGroupWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await DELETE(`${GROUP_BASE_URL}/${payload}`));
    yield put(deleteGroupSuccess({ id: payload, response }));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

export function* groupSaga() {
  yield takeEvery(getAllGroups.type, getAllGroupsWorker);
  yield takeEvery(getGroupById.type, getGroupByIdWorker);
  yield takeEvery(createGroup.type, createGroupWorker);
  yield takeEvery(updateGroup.type, updateGroupWorker);
  yield takeEvery(deleteGroup.type, deleteGroupWorker);
}
