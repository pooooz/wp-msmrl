import React, { useMemo } from 'react';
import { Routes, Route, Navigate, generatePath } from 'react-router-dom';
import { LocalStorageItemsEnum } from '../core/constants/LocalStorageItemsEnum';
import { UserRoleEnum } from '../core/constants/UserRoleEnum';
import { useAppSelector } from '../core/hooks/redux';
import { AddGroupPage } from './groups/addGroupPage/AddGroupPage';
import { AddSpecializationPage } from './specializations/addSpecializationPage/AddSpecializationPage';
import { GroupPage } from './groups/groupPage/GroupPage';
import { GroupsPage } from './groups/groupsPage/GroupsPage';
import { SignInPage } from './signInPage/SignInPage';
import { SpecializationPage } from './specializations/specializationPage/SpecializationPage';
import { SpecializationsPage } from './specializations/specializationsPage/SpecializationsPage';
import { UpdateGroupPage } from './groups/updateGroupPage/UpdateGroupPage';
import { UpdateSpecializationPage } from './specializations/updateSpecializationPage/UpdateSpecializationPage';
import { StudentsPage } from './students/studentsPage/StudentsPage';
import { StudentPage } from './students/studentPage/StudentPage';
import { AddStudentPage } from './students/addStudentPage/AddStudentPage';
import { UpdateStudentPage } from './students/updateStudentPage/UpdateStudentPage';
import { DisciplinesPage } from './disciplines/disciplinesPage/DisciplinesPage';
import { AddDisciplinePage } from './disciplines/addDisciplinePage/AddDisciplinePage';
import { TeachersPage } from './teachers/teachersPage/TeachersPage';
import { UpdateDisciplinePage } from './disciplines/updateDisciplinePage/UpdateDisciplinePage';
import { AddTeacherPage } from './teachers/addTeacherPage/AddTeacherPage';
import { TeacherPage } from './teachers/teacherPage/TeacherPage';
import { UpdateTeacherPage } from './teachers/updateTeacherPage/UpdateTeacherPage';
import { AdminsPage } from './admins/adminsPage/AdminsPage';
import { AddAdminPage } from './admins/addAdminPage/AddAdminPage';
import { UpdateAdminPage } from './admins/updateAdminPage/UpdateAdminPage';
import { DisciplinePage } from './disciplines/disciplinePage/DisciplinePage';
import { CurrentDisciplinePage } from './currentDisciplines/currentDisciplinePage/CurrentDisciplinePage';
import { AddCurrentDisciplinePage } from './currentDisciplines/addCurrentDisciplinePage/AddCurrentDisciplinePage';
import { AddTeacherToCurrentDisciplinePage } from './currentDisciplines/addTeacherToCurrentDiscipline/AddTeacherToCurrentDisciplinePage';
import { UpdateTeachersOfCurrentDisciplinePage } from './currentDisciplines/updateTeachersOfCurrentDisciplinePage/UpdateTeachersOfCurrentDisciplinePage';
import { HistoryOfDisciplinePage } from './disciplines/historyOfDisciplinesPage/HistoryOfDisciplinePage';
import { AddTaskPage } from './tasks/addTaskPage/AddTaskPage';
import { UpdateTaskPage } from './tasks/updateTaskPage/UpdateTaskPage';
import { TaskPage } from './tasks/taskPage/TaskPage';
import { AddResultPage } from './results/addResultPage/AddResultPage';
import { UpdateResultPage } from './results/updateResultPage/UpdateResultPage';

import { CircularProgress } from '@mui/material';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SIGN_IN_ROUTE = '/sign-in';

export const SPECIALIZATIONS_ROUTE = '/specializations';
export const SPECIALIZATION_ROUTE = '/specializations/:specializationId';
export const ADD_SPECIALIZATION_ROUTE = '/specializations/new';
export const UPDATE_SPECIALIZATION_ROUTE = '/specializations/:specializationId/update';

export const GROUPS_ROUTE = '/groups';
export const GROUP_ROUTE = '/groups/:groupId';
export const ADD_GROUP_ROUTE = '/groups/new';
export const UPDATE_GROUP_ROUTE = '/groups/:groupId/update';

export const STUDENTS_ROUTE = '/students';
export const STUDENT_ROUTE = '/students/:studentId';
export const ADD_STUDENT_ROUTE = '/students/new';
export const UPDATE_STUDENT_ROUTE = '/students/:studentId/update';

export const DISCIPLINES_ROUTE = '/disciplines';
export const DISCIPLINE_ROUTE = '/disciplines/:disciplineId';
export const ADD_DISCIPLINE_ROUTE = '/disciplines/new';
export const UPDATE_DISCIPLINE_ROUTE = '/disciplines/:disciplineId/update';
export const HISTORY_OF_DISCIPLINE_ROUTE = '/disciplines/:disciplineId/history';

export const TEACHERS_ROUTE = '/teachers';
export const TEACHER_ROUTE = '/teachers/:teacherId';
export const ADD_TEACHER_ROUTE = '/teachers/new';
export const UPDATE_TEACHER_ROUTE = '/teachers/:teacherId/update';

export const ADMINS_ROUTE = '/admins';
export const ADD_ADMIN_ROUTE = '/admins/new';
export const UPDATE_ADMIN_ROUTE = '/admins/:adminId/update';

export const CURRENT_DISCIPLINE_ROUTE = '/currentDisciplines/:currentDisciplineId';
export const ADD_CURRENT_DISCIPLINE_ROUTE = '/currentDisciplines/new';
export const UPDATE_TEACHERS_OF_CURRENT_DISCIPLINE_ROUTE =
  '/currentDisciplines/:currentDisciplineId/teachers';
export const ADD_TEACHER_TO_CURRENT_DISCIPLINE_ROUTE =
  '/currentDisciplines/:currentDisciplineId/addTeacher';

export const TASK_ROUTE = '/tasks/:taskId';
export const ADD_TASK_ROUTE = '/tasks/new';
export const UPDATE_TASK_ROUTE = '/tasks/:taskId/update';

export const ADD_RESULT_ROUTE = '/results/new';
export const UPDATE_RESULT_ROUTE = '/results/:resultId';

const ANY_ROUTE = '*';

interface Page {
  path: string;
  component: JSX.Element;
}

const publicRoutes: Page[] = [
  { path: SIGN_IN_ROUTE, component: <SignInPage /> },
  { path: ANY_ROUTE, component: <Navigate to={SIGN_IN_ROUTE} /> }
];

const adminRoutes: Page[] = [
  { path: SPECIALIZATIONS_ROUTE, component: <SpecializationsPage /> },
  { path: SPECIALIZATION_ROUTE, component: <SpecializationPage /> },
  { path: ADD_SPECIALIZATION_ROUTE, component: <AddSpecializationPage /> },
  { path: UPDATE_SPECIALIZATION_ROUTE, component: <UpdateSpecializationPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: GROUPS_ROUTE, component: <GroupsPage /> },
  { path: GROUP_ROUTE, component: <GroupPage /> },
  { path: ADD_GROUP_ROUTE, component: <AddGroupPage /> },
  { path: UPDATE_GROUP_ROUTE, component: <UpdateGroupPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: STUDENTS_ROUTE, component: <StudentsPage /> },
  { path: STUDENT_ROUTE, component: <StudentPage /> },
  { path: ADD_STUDENT_ROUTE, component: <AddStudentPage /> },
  { path: UPDATE_STUDENT_ROUTE, component: <UpdateStudentPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: DISCIPLINES_ROUTE, component: <DisciplinesPage /> },
  { path: DISCIPLINE_ROUTE, component: <DisciplinePage /> },
  { path: ADD_DISCIPLINE_ROUTE, component: <AddDisciplinePage /> },
  { path: UPDATE_DISCIPLINE_ROUTE, component: <UpdateDisciplinePage /> },
  { path: HISTORY_OF_DISCIPLINE_ROUTE, component: <HistoryOfDisciplinePage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: TEACHERS_ROUTE, component: <TeachersPage /> },
  { path: TEACHER_ROUTE, component: <TeacherPage /> },
  { path: ADD_TEACHER_ROUTE, component: <AddTeacherPage /> },
  { path: UPDATE_TEACHER_ROUTE, component: <UpdateTeacherPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: ADMINS_ROUTE, component: <AdminsPage /> },
  { path: ADD_ADMIN_ROUTE, component: <AddAdminPage /> },
  { path: UPDATE_ADMIN_ROUTE, component: <UpdateAdminPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: CURRENT_DISCIPLINE_ROUTE, component: <CurrentDisciplinePage /> },
  { path: ADD_CURRENT_DISCIPLINE_ROUTE, component: <AddCurrentDisciplinePage /> },
  {
    path: UPDATE_TEACHERS_OF_CURRENT_DISCIPLINE_ROUTE,
    component: <UpdateTeachersOfCurrentDisciplinePage />
  },
  /// //////////////////////////////////////////////////////////////////////////////
  {
    path: ADD_TEACHER_TO_CURRENT_DISCIPLINE_ROUTE,
    component: <AddTeacherToCurrentDisciplinePage />
  },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: TASK_ROUTE, component: <TaskPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: ANY_ROUTE, component: <Navigate to={SPECIALIZATIONS_ROUTE} /> }
];

const teacherRoutes: Page[] = [
  { path: SPECIALIZATIONS_ROUTE, component: <SpecializationsPage /> },
  { path: SPECIALIZATION_ROUTE, component: <SpecializationPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: GROUPS_ROUTE, component: <GroupsPage /> },
  { path: GROUP_ROUTE, component: <GroupPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: STUDENTS_ROUTE, component: <StudentsPage /> },
  { path: STUDENT_ROUTE, component: <StudentPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: DISCIPLINES_ROUTE, component: <DisciplinesPage /> },
  { path: DISCIPLINE_ROUTE, component: <DisciplinePage /> },
  { path: HISTORY_OF_DISCIPLINE_ROUTE, component: <HistoryOfDisciplinePage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: TEACHERS_ROUTE, component: <TeachersPage /> },
  { path: TEACHER_ROUTE, component: <TeacherPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: ADMINS_ROUTE, component: <AdminsPage /> },
  { path: ADD_ADMIN_ROUTE, component: <AddAdminPage /> },
  { path: UPDATE_ADMIN_ROUTE, component: <UpdateAdminPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: CURRENT_DISCIPLINE_ROUTE, component: <CurrentDisciplinePage /> },
  { path: ADD_CURRENT_DISCIPLINE_ROUTE, component: <AddCurrentDisciplinePage /> },
  {
    path: UPDATE_TEACHERS_OF_CURRENT_DISCIPLINE_ROUTE,
    component: <UpdateTeachersOfCurrentDisciplinePage />
  },
  /// //////////////////////////////////////////////////////////////////////////////
  {
    path: ADD_TEACHER_TO_CURRENT_DISCIPLINE_ROUTE,
    component: <AddTeacherToCurrentDisciplinePage />
  },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: TASK_ROUTE, component: <TaskPage /> },
  { path: ADD_TASK_ROUTE, component: <AddTaskPage /> },
  { path: UPDATE_TASK_ROUTE, component: <UpdateTaskPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: ADD_RESULT_ROUTE, component: <AddResultPage /> },
  { path: UPDATE_RESULT_ROUTE, component: <UpdateResultPage /> },
  /// //////////////////////////////////////////////////////////////////////////////
  { path: ANY_ROUTE, component: <Navigate to={TEACHERS_ROUTE} /> }
];

export const AppRoutes = () => {
  const isLoadingAdmin = useAppSelector((state) => state.admin.isLoading);
  const isLoadingCurrentDiscipline = useAppSelector((state) => state.currentDiscipline.isLoading);
  const isLoadingDiscipline = useAppSelector((state) => state.discipline.isLoading);
  const isLoadingDisciplineTeacher = useAppSelector((state) => state.discipline_teacher.isLoading);
  const isLoadingGroup = useAppSelector((state) => state.group.isLoading);
  const isLoadingResult = useAppSelector((state) => state.result.isLoading);
  const isLoadingSpecialization = useAppSelector((state) => state.specialization.isLoading);
  const isLoadingStudent = useAppSelector((state) => state.student.isLoading);
  const isLoadingTask = useAppSelector((state) => state.task.isLoading);
  const isLoadingTeacher = useAppSelector((state) => state.teacher.isLoading);
  const isLoadingUser = useAppSelector((state) => state.user.isLoading);

  const stateRole = useAppSelector((state) => state.user.role);

  const { role, userId } = useMemo(
    () => ({
      role: localStorage.getItem(LocalStorageItemsEnum.Role),
      userId: localStorage.getItem(LocalStorageItemsEnum.UserId)
    }),
    [stateRole]
  );

  const routes = useMemo(() => {
    if (role === UserRoleEnum.Admin) {
      return adminRoutes;
    } else if (role === UserRoleEnum.Teacher) {
      return teacherRoutes.map((route) => {
        if (route.path === ANY_ROUTE) {
          const teacherFirstRoute = generatePath(TEACHER_ROUTE, {
            teacherId: userId || ''
          });
          return { ...route, component: <Navigate to={teacherFirstRoute} /> };
        } else {
          return route;
        }
      });
    } else {
      return publicRoutes;
    }
  }, [role, userId]);

  return (
    <>
      {(isLoadingAdmin ||
        isLoadingCurrentDiscipline ||
        isLoadingDiscipline ||
        isLoadingDisciplineTeacher ||
        isLoadingGroup ||
        isLoadingResult ||
        isLoadingSpecialization ||
        isLoadingStudent ||
        isLoadingTask ||
        isLoadingTeacher ||
        isLoadingUser) && <CircularProgress />}
      <Routes>
        {routes.map((route) => {
          return <Route path={route.path} element={route.component} key={route.path} />;
        })}
      </Routes>
      <ToastContainer />
    </>
  );
};
