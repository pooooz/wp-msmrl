import { put, takeEvery, call } from 'redux-saga/effects';
import { DELETE, GET, PATCH, POST } from '../api/requests';
import {
  actionFailed,
  addSpecialization,
  addSpecializationSuccess,
  deleteSpecialization,
  deleteSpecializationSuccess,
  getAllSpecializations,
  getAllSpecializationsSuccess,
  getSpecializationById,
  getSpecializationByIdSuccess,
  updateSpecialization,
  updateSpecializationSuccess
} from '../reducers/specializationReducer';

const SPECIALIZATION_BASE_URL = '/specializations';

function* getAllSpecializationsWorker() {
  try {
    const specializations: [] = yield call(async () => await GET(SPECIALIZATION_BASE_URL));

    yield put(getAllSpecializationsSuccess(specializations));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* getSpecializationByIdWorker({ payload }: any) {
  try {
    const specialization: object = yield call(async () => await GET(`${SPECIALIZATION_BASE_URL}/${payload}`));

    yield put(getSpecializationByIdSuccess(specialization));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* addSpecializationWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await POST(SPECIALIZATION_BASE_URL, payload));
    yield put(addSpecializationSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* updateSpecializationWorker({ payload }: any) {
  try {
    const response: object = yield call(async () =>
      await PATCH(`${SPECIALIZATION_BASE_URL}/${payload.id}`, payload)
    );
    yield put(updateSpecializationSuccess(response));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

function* deleteSpecializationWorker({ payload }: any) {
  try {
    const response: object = yield call(async () => await DELETE(`${SPECIALIZATION_BASE_URL}/${payload}`));
    yield put(deleteSpecializationSuccess({ id: payload, response }));
  } catch (err) {
    yield put(actionFailed(err));
  }
}

export function* specializationSaga() {
  yield takeEvery(getAllSpecializations.type, getAllSpecializationsWorker);
  yield takeEvery(getSpecializationById.type, getSpecializationByIdWorker);
  yield takeEvery(addSpecialization.type, addSpecializationWorker);
  yield takeEvery(updateSpecialization.type, updateSpecializationWorker);
  yield takeEvery(deleteSpecialization.type, deleteSpecializationWorker);
}
