import { put, takeEvery, call } from 'redux-saga/effects';
import decode from 'jwt-decode';
import { POST } from '../api/requests';
import {
  signIn,
  signInFailid,
  signInSuccess,
  updateToken,
  updateTokenFailid,
  updateTokenSuccess
} from '../reducers/userReducer';
import { LocalStorageItemsEnum } from '../constants/LocalStorageItemsEnum';

function* updateTokenWorker() {
  try {
    const { token } = yield call(async () => await POST('/sign-in/updateToken'));

    yield localStorage.setItem(LocalStorageItemsEnum.TOKEN, token);

    const { role } = yield decode(token);

    yield localStorage.setItem(LocalStorageItemsEnum.ROLE, role);

    yield put(updateTokenSuccess({ role }));
  } catch (err) {
    yield put(updateTokenFailid());
  }
}

function* signInWorker({ payload }: any) {
  try {
    const { accessToken } = yield call(async () => await POST('/sign-in', payload));

    yield localStorage.setItem(LocalStorageItemsEnum.TOKEN, accessToken);

    const { role, sub } = yield decode(accessToken);

    yield localStorage.setItem(LocalStorageItemsEnum.ROLE, role);

    yield localStorage.setItem(LocalStorageItemsEnum.USER_ID, sub);

    yield put(signInSuccess({ role }));
  } catch (err) {
    yield put(signInFailid(err));
  }
}

export function* userSaga() {
  yield takeEvery(updateToken.type, updateTokenWorker);
  yield takeEvery(signIn.type, signInWorker);
}
