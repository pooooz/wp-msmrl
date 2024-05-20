import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { deleteGroup } from '../../../core/reducers/groupReducer';
import { getSpecializationById } from '../../../core/reducers/specializationReducer';
import { ADD_GROUP_ROUTE, GROUP_ROUTE } from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'name', label: 'Name' },
  { id: 'course', label: 'Course' },
  { id: 'actions', label: 'Actions' }
];

export const SpecializationPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { specializationId } = useParams();

  const specialization = useAppSelector((state) => state.specialization.specialization);

  useEffect(() => {
    dispatch(getSpecializationById(specializationId));
  }, []);

  const handleOpenGroup = (groupId: number) => {
    const path = generatePath(GROUP_ROUTE, {
      groupId: `${groupId}`
    });
    navigate(path);
  };

  const handleDeleteGroup = (groupId: number) => {
    dispatch(deleteGroup(groupId));
  };

  const handleAddGroup = () => {
    navigate(ADD_GROUP_ROUTE, { state: { specializationId } });
  };

  const rows = useMemo(() => {
    return specialization.groups.map((group) => ({
      id: group.id,
      name: group.name,
      course: group.course,
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.Admin, UserRoleEnum.Teacher]) && (
            <Button variant="outlined" onClick={() => { handleOpenGroup(group.id); }}>
              Open
            </Button>
          )}
          {checkPermissions([UserRoleEnum.Admin]) && (
            <Button variant="outlined" color="error" onClick={() => { handleDeleteGroup(group.id); }}>
              Delete
            </Button>
          )}
        </Stack>
      )
    }));
  }, [specialization]);

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
      <Typography component="h1" variant="h3">
        {specialization.name}
      </Typography>
      <Table columns={columns} rows={rows} />
      {checkPermissions([UserRoleEnum.Admin]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleAddGroup}>
            Add
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
