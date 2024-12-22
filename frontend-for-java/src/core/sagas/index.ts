import { all } from 'redux-saga/effects';
import { adminSaga } from './adminSaga';
import { currentDisciplineSaga } from './currentDisciplineSaga';
import { disciplineSaga } from './disciplineSaga';
import { disciplineTeacherSaga } from './disciplineTeacherSaga';
import { groupSaga } from './groupSaga';
import { resultSaga } from './resultSaga';
import { specializationSaga } from './specializationSaga';
import { studentSaga } from './studentSaga';
import { taskSaga } from './taskSaga';
import { teacherSaga } from './teacherSaga';
import { userSaga } from './userSaga';

export function* rootSaga() {
  yield all([
    userSaga(),
    specializationSaga(),
    groupSaga(),
    studentSaga(),
    disciplineSaga(),
    teacherSaga(),
    adminSaga(),
    disciplineTeacherSaga(),
    currentDisciplineSaga(),
    taskSaga(),
    resultSaga()
  ]);
}
