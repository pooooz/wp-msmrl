import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { getGroupById } from '../../../core/reducers/groupReducer';
import { ADD_STUDENT_ROUTE, STUDENT_ROUTE } from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'lastName', label: 'Last Name' },
  { id: 'firstName', label: 'First Name' },
  { id: 'patronymic', label: 'Patronumic' },
  { id: 'actions', label: 'Actions' }
];

export const GroupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { groupId } = useParams();

  const group = useAppSelector((state) => state.group.group);

  useEffect(() => {
    dispatch(getGroupById(groupId));
  }, []);

  const handleOpenStudent = (studentId: number) => {
    const path = generatePath(STUDENT_ROUTE, {
      studentId: `${studentId}`
    });

    navigate(path);
  };

  const handleAddStudent = () => {
    navigate(ADD_STUDENT_ROUTE, { state: { groupId } });
  };

  const rows = useMemo(() => {
    return group.students.map((student) => ({
      id: student.id,
      firstName: student.firstName,
      patronymic: student.patronymic,
      lastName: student.lastName,
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.Admin, UserRoleEnum.Teacher]) && (
            <Button variant="outlined" onClick={() => { handleOpenStudent(student.id); }}>
              Open
            </Button>
          )}
        </Stack>
      )
    }));
  }, [group]);

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={4}>
        <Typography component="h1" variant="h4">
          Group: {group.name}
        </Typography>
        <Typography component="h1" variant="h4">
          Course: {group.course}
        </Typography>
      </Stack>
      <Table columns={columns} rows={rows} />
      {checkPermissions([UserRoleEnum.Admin]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleAddStudent}>
            Add
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
