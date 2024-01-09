import { put, takeEvery, call } from 'redux-saga/effects';
import decode from 'jwt-decode';
import { POST } from '../api/requests';
import {
  signIn,
  signInFailed,
  signInSuccess,
  updateToken,
  updateTokenFailed,
  updateTokenSuccess
} from '../reducers/userReducer';
import { LocalStorageItemsEnum } from '../constants/LocalStorageItemsEnum';

function* updateTokenWorker() {
  try {
    const { accessToken, refreshToken } = yield call(async () => await POST('/refresh'));

    yield localStorage.setItem(LocalStorageItemsEnum.AccessToken, accessToken);
    yield localStorage.setItem(LocalStorageItemsEnum.RefreshToken, refreshToken);

    const { sub, role } = yield decode(accessToken);

    yield localStorage.setItem(LocalStorageItemsEnum.UserId, sub);
    yield localStorage.setItem(LocalStorageItemsEnum.Role, role);

    yield put(updateTokenSuccess({ role }));
  } catch (err) {
    yield put(updateTokenFailed());
  }
}

function* signInWorker({ payload }: any) {
  try {
    const { accessToken, refreshToken } = yield call(async () => await POST('/sign-in', payload));

    yield localStorage.setItem(LocalStorageItemsEnum.AccessToken, accessToken);
    yield localStorage.setItem(LocalStorageItemsEnum.RefreshToken, refreshToken);

    const { role, sub } = yield decode(accessToken);

    yield localStorage.setItem(LocalStorageItemsEnum.Role, role);

    yield localStorage.setItem(LocalStorageItemsEnum.UserId, sub);

    yield put(signInSuccess({ role }));
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* userSaga() {
  yield takeEvery(updateToken.type, updateTokenWorker);
  yield takeEvery(signIn.type, signInWorker);
}
