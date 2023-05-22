import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE, GET, PATCH, POST } from '../api/requests';
import {
  actionFailid,
  createStudent,
  createStudentSuccess,
  deleteStudent,
  deleteStudentSuccess,
  getAllStudents,
  getAllStudentsSuccess,
  getStudentById,
  getStudentByIdSuccess,
  getStudentsByTaskId,
  getStudentsByTaskIdSuccess,
  updateStudent,
  updateStudentSuccess
} from '../reducers/studentReducer';

const STUDENT_BASE_URL = '/students';

function* getAllStudentsWorker() {
  try {
    const students: any[] = yield call(async () => await GET(STUDENT_BASE_URL));
    yield put(getAllStudentsSuccess(students));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* getStudentByIdWorker({ payload }: any) {
  try {
    const student: object = yield call(async () => await GET(`${STUDENT_BASE_URL}/${payload}`));
    yield put(getStudentByIdSuccess(student));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* getStudentsByTaskIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await GET(`${STUDENT_BASE_URL}/tasks/${payload}`));
    yield put(getStudentsByTaskIdSuccess(response));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* createStudentWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await POST(STUDENT_BASE_URL, payload));
    yield put(createStudentSuccess(response));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* updateStudentWorker({ payload }: any) {
  try {
    const { id, ...rest } = payload;
    const response: object = yield call(async () => await PATCH(`${STUDENT_BASE_URL}/${id}`, rest));
    yield put(updateStudentSuccess(response));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* deleteStudentWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await DELETE(`${STUDENT_BASE_URL}/${payload}`));
    yield put(deleteStudentSuccess({ id: payload, response }));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

export function* studentSaga() {
  yield takeEvery(getAllStudents.type, getAllStudentsWorker);
  yield takeEvery(getStudentById.type, getStudentByIdWorker);
  yield takeEvery(getStudentsByTaskId.type, getStudentsByTaskIdWorker);
  yield takeEvery(createStudent.type, createStudentWorker);
  yield takeEvery(updateStudent.type, updateStudentWorker);
  yield takeEvery(deleteStudent.type, deleteStudentWorker);
}
