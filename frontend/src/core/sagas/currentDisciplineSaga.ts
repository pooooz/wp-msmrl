import { call, put, takeEvery } from 'redux-saga/effects';
import { GET, POST } from '../api/requests';
import {
  actionFailed,
  createCurrentDiscipline,
  createCurrentDisciplineSuccess,
  getCurrentDisciplineById,
  getCurrentDisciplineByIdSuccess,
  getCurrentDisciplinesByDisciplineId,
  getCurrentDisciplinesByDisciplineIdInThisYear,
  getCurrentDisciplinesByDisciplineIdInThisYearSuccess,
  getCurrentDisciplinesByDisciplineIdSuccess
} from '../reducers/currentDisciplineReducer';

const currentDisciplines_BASE_URL = '/currentDisciplines';

function* getCurrentDisciplineByIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await GET(`${currentDisciplines_BASE_URL}/${payload}`));
    yield put(getCurrentDisciplineByIdSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* getCurrentDisciplinesByDisciplineIdInThisYearWorker({ payload }: any) {
  try {
    const response: object = yield call(async () =>
      await GET(`${currentDisciplines_BASE_URL}/disciplines/${payload}?year=${new Date().getFullYear()}`)
    );
    yield put(getCurrentDisciplinesByDisciplineIdInThisYearSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* getCurrentDisciplinesByDisciplineIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () =>
      await GET(`${currentDisciplines_BASE_URL}/disciplines/${payload}`)
    );
    yield put(getCurrentDisciplinesByDisciplineIdSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* createCurrentDisciplineWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await POST(currentDisciplines_BASE_URL, payload));
    yield put(createCurrentDisciplineSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

export function* currentDisciplineSaga() {
  yield takeEvery(getCurrentDisciplineById.type, getCurrentDisciplineByIdWorker);
  yield takeEvery(
    getCurrentDisciplinesByDisciplineIdInThisYear.type,
    getCurrentDisciplinesByDisciplineIdInThisYearWorker
  );
  yield takeEvery(
    getCurrentDisciplinesByDisciplineId.type,
    getCurrentDisciplinesByDisciplineIdWorker
  );
  yield takeEvery(createCurrentDiscipline.type, createCurrentDisciplineWorker);
}
