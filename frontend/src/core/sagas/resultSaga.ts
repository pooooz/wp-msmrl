import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE, GET, PATCH, POST } from '../api/requests';
import {
  actionFailed,
  createResult,
  createResultSuccess,
  deleteResult,
  deleteResultSuccess,
  getResultById,
  getResultByIdSuccess,
  getResultsByStudentId,
  getResultsByStudentIdSuccess,
  getResultsByTaskId,
  getResultsByTaskIdSuccess,
  updateResult,
  updateResultSuccess
} from '../reducers/resultReducer';

const RESULT_BASE_URL = '/results';

function* getResultByIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await GET(`${RESULT_BASE_URL}/${payload}`));
    yield put(getResultByIdSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* getResultsByTaskIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await GET(`${RESULT_BASE_URL}/tasks/${payload}`));
    yield put(getResultsByTaskIdSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* getResultsByStudentIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await GET(`${RESULT_BASE_URL}/students/${payload}`));
    yield put(getResultsByStudentIdSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* createResultWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await POST(RESULT_BASE_URL, payload));
    yield put(createResultSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* updateResultWorker({ payload }: any) {
  try {
    const { id, ...data } = payload;
    const response: object = yield call(async () => await PATCH(`${RESULT_BASE_URL}/${id}`, data));
    yield put(updateResultSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* deleteResultWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await DELETE(`${RESULT_BASE_URL}/${payload}`));
    yield put(deleteResultSuccess({ ...response, id: payload }));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

export function* resultSaga() {
  yield takeEvery(getResultById.type, getResultByIdWorker);
  yield takeEvery(getResultsByTaskId.type, getResultsByTaskIdWorker);
  yield takeEvery(getResultsByStudentId.type, getResultsByStudentIdWorker);
  yield takeEvery(createResult.type, createResultWorker);
  yield takeEvery(updateResult.type, updateResultWorker);
  yield takeEvery(deleteResult.type, deleteResultWorker);
}
