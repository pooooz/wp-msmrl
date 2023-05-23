import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE, GET, PATCH, POST } from '../api/requests';
import {
  actionFailid,
  createTask,
  createTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  getTaskById,
  getTaskByIdSuccess,
  updateTask,
  updateTaskSuccess
} from '../reducers/taskReducer';

const TASK_BASE_URL = '/tasks';

function* getTaskByIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await GET(`${TASK_BASE_URL}/${payload}`));
    yield put(getTaskByIdSuccess(response));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* createTaskWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await POST(TASK_BASE_URL, payload));
    yield put(createTaskSuccess(response));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* updateTaskWorker({ payload }: any) {
  try {
    const { id, ...data } = payload;
    const response: object = yield call(async () => await PATCH(`${TASK_BASE_URL}/${id}`, data));
    yield put(updateTaskSuccess(response));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* deleteTaskWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await DELETE(`${TASK_BASE_URL}/${payload}`));
    yield put(deleteTaskSuccess(response));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

export function* taskSaga() {
  yield takeEvery(getTaskById.type, getTaskByIdWorker);
  yield takeEvery(createTask.type, createTaskWorker);
  yield takeEvery(updateTask.type, updateTaskWorker);
  yield takeEvery(deleteTask.type, deleteTaskWorker);
}
