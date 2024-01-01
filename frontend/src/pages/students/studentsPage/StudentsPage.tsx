import { Button, Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { deleteStudent, getAllStudents } from '../../../core/reducers/studentReducer';
import { ADD_STUDENT_ROUTE, STUDENT_ROUTE, UPDATE_STUDENT_ROUTE } from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'lastName', label: 'LastName' },
  { id: 'firstName', label: 'First Name' },
  { id: 'patronumic', label: 'Patronumic' },
  { id: 'actions', label: 'Actions' }
];

export const StudentsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllStudents());
  }, []);

  const students = useAppSelector((state) => state.student.students);

  const handleOpenStudent = (studentId: number) => {
    const path = generatePath(STUDENT_ROUTE, {
      studentId: `${studentId}`
    });
    navigate(path);
  };

  const handleUpdateStudent = (studentId: number) => {
    const path = generatePath(UPDATE_STUDENT_ROUTE, {
      studentId: `${studentId}`
    });
    navigate(path);
  };

  const handleDeleteStudent = (studentId: number) => {
    dispatch(deleteStudent(studentId));
  };

  const handleAddStudent = () => {
    navigate(ADD_STUDENT_ROUTE);
  };

  const rows = useMemo(() => {
    return students.map((student) => ({
      firstName: student.first_name,
      patronumic: student.patronumic,
      lastName: student.last_name,
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.Admin, UserRoleEnum.Teacher]) && (
            <Button variant="outlined" onClick={() => { handleOpenStudent(student.id); }}>
              Open
            </Button>
          )}
          {checkPermissions([UserRoleEnum.Admin]) && (
            <Button
              variant="outlined"
              color="warning"
              onClick={() => { handleUpdateStudent(student.id); }}
            >
              Update
            </Button>
          )}
          {checkPermissions([UserRoleEnum.Admin]) && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => { handleDeleteStudent(student.id); }}
            >
              Delete
            </Button>
          )}
        </Stack>
      )
    }));
  }, [students]);

  return (
    <>
      <Table rows={rows} columns={columns} />
      {checkPermissions([UserRoleEnum.Admin]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleAddStudent}>
            Add
          </Button>
        </Stack>
      )}
    </>
  );
};
