import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE, GET, PATCH, POST } from '../api/requests';
import {
  actionFailed,
  createTeacher,
  createTeacherSuccess,
  deleteTeacher,
  deleteTeacherSuccess,
  getAllTeachers,
  getAllTeachersSuccess,
  getTeacherById,
  getTeacherByIdSuccess,
  updateTeacher,
  updateTeacherSuccess
} from '../reducers/teacherReducer';

const TEACHER_BASE_URL = '/teachers';

function* getAllTeachersWorker() {
  try {
    const teachers: [] = yield call(async () => await GET(TEACHER_BASE_URL));
    yield put(getAllTeachersSuccess(teachers));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* getTeacherByIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await GET(`${TEACHER_BASE_URL}/${payload}`));
    yield put(getTeacherByIdSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* createTeacherWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await POST(TEACHER_BASE_URL, payload));
    yield put(createTeacherSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* updateTeacherWorker({ payload }: any) {
  try {
    const { id, ...data } = payload;
    const response: object = yield call(async () => await PATCH(`${TEACHER_BASE_URL}/${id}`, data));
    yield put(updateTeacherSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* deleteTeacherWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await DELETE(`${TEACHER_BASE_URL}/${payload}`));
    yield put(deleteTeacherSuccess({ ...response, id: payload }));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

export function* teacherSaga() {
  yield takeEvery(getAllTeachers.type, getAllTeachersWorker);
  yield takeEvery(getTeacherById.type, getTeacherByIdWorker);
  yield takeEvery(createTeacher.type, createTeacherWorker);
  yield takeEvery(updateTeacher.type, updateTeacherWorker);
  yield takeEvery(deleteTeacher.type, deleteTeacherWorker);
}
