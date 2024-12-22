import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE, GET, PATCH, POST, PUT } from '../api/requests';
import {
  actionFailed,
  createDiscipline,
  createDisciplineSuccess,
  deleteDiscipline,
  deleteDisciplineSuccess,
  getAllDisciplines,
  getAllDisciplinesSuccess,
  getDisciplineById,
  getDisciplineByIdSuccess,
  updateDiscipline,
  updateDisciplineSuccess
} from '../reducers/disciplineReducer';

const DISCIPLINE_BASE_URL = '/disciplines';

function* getAllDisciplinesWorker() {
  try {
    const disciplines: [] = yield call(async () => await GET(DISCIPLINE_BASE_URL, true));
    yield put(getAllDisciplinesSuccess(disciplines));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* getDisciplineByIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await GET(`${DISCIPLINE_BASE_URL}?id=${payload}`, true));
    yield put(getDisciplineByIdSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* createDisciplineWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await POST(DISCIPLINE_BASE_URL, payload, true));
    yield put(createDisciplineSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* updateDisciplineWorker({ payload }: any) {
  try {
    const { id, ...data } = payload;
    const response: object = yield call(async () => await PUT(`${DISCIPLINE_BASE_URL}?id=${id}`, data, true));
    yield put(updateDisciplineSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* deleteDisciplineWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await DELETE(`${DISCIPLINE_BASE_URL}?id=${payload}`, true));
    yield put(deleteDisciplineSuccess({ id: payload, ...response }));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

export function* disciplineSaga() {
  yield takeEvery(getAllDisciplines.type, getAllDisciplinesWorker);
  yield takeEvery(getDisciplineById.type, getDisciplineByIdWorker);
  yield takeEvery(createDiscipline.type, createDisciplineWorker);
  yield takeEvery(updateDiscipline.type, updateDisciplineWorker);
  yield takeEvery(deleteDiscipline.type, deleteDisciplineWorker);
}
