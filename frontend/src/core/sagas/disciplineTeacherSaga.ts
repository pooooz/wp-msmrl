import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE, GET, POST } from '../api/requests';
import {
  actionFailed,
  createDisciplineTeacher,
  createDisciplineTeacherSuccess,
  deleteDisciplineTeacher,
  deleteDisciplineTeacherSuccess,
  getCurrentDisciplinesByTeacherId,
  getCurrentDisciplinesByTeacherIdSuccess,
  getTeachersByCurrentDisciplineId,
  getTeachersByCurrentDisciplineIdSuccess
} from '../reducers/disciplineTeacterReducer';

const DISCIPLINE_TEACHER_BASE_URL = '/disciplineTeachers';

function* getCurrentDisciplinesByTeacherIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () =>
      await GET(`${DISCIPLINE_TEACHER_BASE_URL}/teachers/${payload}`)
    );

    yield put(getCurrentDisciplinesByTeacherIdSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* getTeachersByCurrentDisciplineIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () =>
      await GET(`${DISCIPLINE_TEACHER_BASE_URL}/currentDisciplines/${payload}`)
    );
    yield put(getTeachersByCurrentDisciplineIdSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* createDisciplineTeacherWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await POST(DISCIPLINE_TEACHER_BASE_URL, payload));
    yield put(createDisciplineTeacherSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* deleteDisciplineTeacherWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await DELETE(`${DISCIPLINE_TEACHER_BASE_URL}/${payload}`));
    yield put(deleteDisciplineTeacherSuccess({ ...response, id: payload }));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

export function* disciplineTeacherSaga() {
  yield takeEvery(getCurrentDisciplinesByTeacherId.type, getCurrentDisciplinesByTeacherIdWorker);
  yield takeEvery(getTeachersByCurrentDisciplineId.type, getTeachersByCurrentDisciplineIdWorker);
  yield takeEvery(createDisciplineTeacher.type, createDisciplineTeacherWorker);
  yield takeEvery(deleteDisciplineTeacher.type, deleteDisciplineTeacherWorker);
}
