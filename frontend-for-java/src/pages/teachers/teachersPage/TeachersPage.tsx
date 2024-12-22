import { Button, Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { deleteTeacher, getAllTeachers } from '../../../core/reducers/teacherReducer';
import { ADD_TEACHER_ROUTE, TEACHER_ROUTE, UPDATE_TEACHER_ROUTE } from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'lastName', label: 'Last Name' },
  { id: 'firstName', label: 'First Name' },
  { id: 'patronymic', label: 'Patronumic' },
  { id: 'actions', label: 'Actions' }
];

export const TeachersPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const teachers = useAppSelector((state) => state.teacher.teachers);

  useEffect(() => {
    dispatch(getAllTeachers());
  }, []);

  const handleOpenTeacher = (teacherId: number) => {
    const path = generatePath(TEACHER_ROUTE, {
      teacherId: `${teacherId}`
    });
    navigate(path);
  };

  const handleUpdateTeacher = (teacherId: number) => {
    const path = generatePath(UPDATE_TEACHER_ROUTE, {
      teacherId: `${teacherId}`
    });
    navigate(path);
  };

  const handleDeleteTeacher = (teacherId: number) => {
    dispatch(deleteTeacher(teacherId));
  };

  const rows = useMemo(() => {
    return teachers.map((teacher) => ({
      firstName: teacher.firstName,
      patronymic: teacher.patronymic,
      lastName: teacher.lastName,
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.Admin, UserRoleEnum.Teacher]) && (
            <Button variant="outlined" onClick={() => { handleOpenTeacher(teacher.id); }}>
              Open
            </Button>
          )}
          {checkPermissions([UserRoleEnum.Admin]) && (
            <Button
              variant="outlined"
              color="warning"
              onClick={() => { handleUpdateTeacher(teacher.id); }}
            >
              Update
            </Button>
          )}
          {checkPermissions([UserRoleEnum.Admin]) && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => { handleDeleteTeacher(teacher.id); }}
            >
              Delete
            </Button>
          )}
        </Stack>
      )
    }));
  }, [teachers]);

  const handleAddTeacher = () => {
    navigate(ADD_TEACHER_ROUTE);
  };

  return (
    <>
      <Table rows={rows} columns={columns} />
      {checkPermissions([UserRoleEnum.Admin]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleAddTeacher}>
            Add
          </Button>
        </Stack>
      )}
    </>
  );
};
