import { combineReducers } from '@reduxjs/toolkit';
import adminReducer from './adminReducer';
import currentDisciplineReducer from './currentDisciplineReducer';
import disciplineReducer from './disciplineReducer';
import disciplineTeacterReducer from './disciplineTeacterReducer';
import groupReducer from './groupReducer';
import resultReducer from './resultReducer';
import specializationReducer from './specializationReducer';
import studentReducer from './studentReducer';
import taskReducer from './taskReducer';
import teacherReducer from './teacherReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  specialization: specializationReducer,
  group: groupReducer,
  student: studentReducer,
  discipline: disciplineReducer,
  teacher: teacherReducer,
  admin: adminReducer,
  discipline_teacher: disciplineTeacterReducer,
  currentDiscipline: currentDisciplineReducer,
  task: taskReducer,
  result: resultReducer
});
