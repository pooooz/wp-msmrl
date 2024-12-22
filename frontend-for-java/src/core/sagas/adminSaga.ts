import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE, GET, PATCH, POST } from '../api/requests';
import {
  actionFailed,
  createAdmin,
  createAdminSuccess,
  deleteAdmin,
  deleteAdminSuccess,
  getAdminById,
  getAdminByIdSuccess,
  getAllAdmins,
  getAllAdminsSuccess,
  updateAdmin,
  updateAdminSuccess
} from '../reducers/adminReducer';

const ADMIN_BASE_URL = '/admins';

function* getAllAdminsWorker() {
  try {
    const response: object[] = yield call(async () => await GET(ADMIN_BASE_URL));
    yield put(getAllAdminsSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* getAdminByIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await GET(`${ADMIN_BASE_URL}/${payload}`));
    yield put(getAdminByIdSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* createAdminWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await POST(ADMIN_BASE_URL, payload));
    yield put(createAdminSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* updateAdminWorker({ payload }: any) {
  try {
    const { id, ...data } = payload;
    const response: object = yield call(async () => await PATCH(`${ADMIN_BASE_URL}/${id}`, data));
    yield put(updateAdminSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* deleteAdminWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await DELETE(`${ADMIN_BASE_URL}/${payload}`));
    yield put(deleteAdminSuccess({ ...response, id: payload }));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

export function* adminSaga() {
  yield takeEvery(getAllAdmins.type, getAllAdminsWorker);
  yield takeEvery(getAdminById.type, getAdminByIdWorker);
  yield takeEvery(createAdmin.type, createAdminWorker);
  yield takeEvery(updateAdmin.type, updateAdminWorker);
  yield takeEvery(deleteAdmin.type, deleteAdminWorker);
}
