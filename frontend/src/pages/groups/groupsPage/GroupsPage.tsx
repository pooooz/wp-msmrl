import { Button, Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { deleteGroup, getAllGroups } from '../../../core/reducers/groupReducer';
import { ADD_GROUP_ROUTE, GROUP_ROUTE, UPDATE_GROUP_ROUTE } from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'name', label: 'Name' },
  { id: 'course', label: 'Course' },
  { id: 'specialization', label: 'Specialization' },
  { id: 'actions', label: 'Actions' }
];

export const GroupsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  const groups = useAppSelector((state) => state.group.groups);

  const handleOpenGroup = (groupId: number) => {
    const path = generatePath(GROUP_ROUTE, {
      groupId: `${groupId}`
    });
    navigate(path);
  };

  const handleUpdateGroup = (groupId: number) => {
    const path = generatePath(UPDATE_GROUP_ROUTE, {
      groupId: `${groupId}`
    });
    navigate(path);
  };

  const handleDeleteGroup = (groupId: number) => {
    dispatch(deleteGroup(groupId));
  };

  const handleAddGroup = () => {
    navigate(ADD_GROUP_ROUTE);
  };

  const rows = useMemo(() => {
    return groups.map((group) => ({
      name: group.name,
      course: group.course,
      specialization: group.specialization.name,
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.Admin, UserRoleEnum.Teacher]) && (
            <Button variant="outlined" onClick={() => { handleOpenGroup(group.id); }}>
              Open
            </Button>
          )}
          {checkPermissions([UserRoleEnum.Admin]) && (
            <Button variant="outlined" color="warning" onClick={() => { handleUpdateGroup(group.id); }}>
              Update
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
  }, [groups]);

  return (
    <>
      <Table rows={rows} columns={columns} />
      {checkPermissions([UserRoleEnum.Admin]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleAddGroup}>
            Add
          </Button>
        </Stack>
      )}
    </>
  );
};
