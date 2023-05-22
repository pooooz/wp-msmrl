import { call, put, takeEvery } from 'redux-saga/effects';
import { DELETE, GET, PATCH, POST } from '../api/requests';
import {
  actionFailid,
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
    const disciplines: [] = yield call(async () => await GET(DISCIPLINE_BASE_URL));
    yield put(getAllDisciplinesSuccess(disciplines));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* getDisciplineByIdWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await GET(`${DISCIPLINE_BASE_URL}/${payload}`));
    yield put(getDisciplineByIdSuccess(response));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* createDisciplineWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await POST(DISCIPLINE_BASE_URL, payload));
    yield put(createDisciplineSuccess(response));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* updateDisciplineWorker({ payload }: any) {
  try {
    const { id, ...data } = payload;
    const response: object = yield call(async () => await PATCH(`${DISCIPLINE_BASE_URL}/${id}`, data));
    put(updateDisciplineSuccess(response));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

function* deleteDisciplineWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await DELETE(`${DISCIPLINE_BASE_URL}/${payload}`));
    yield put(deleteDisciplineSuccess({ id: payload, ...response }));
  } catch (err) {
    yield put(actionFailid(err));
  }
}

export function* disciplineSaga() {
  yield takeEvery(getAllDisciplines.type, getAllDisciplinesWorker);
  yield takeEvery(getDisciplineById.type, getDisciplineByIdWorker);
  yield takeEvery(createDiscipline.type, createDisciplineWorker);
  yield takeEvery(updateDiscipline.type, updateDisciplineWorker);
  yield takeEvery(deleteDiscipline.type, deleteDisciplineWorker);
}
