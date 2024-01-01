import { Button, Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { deleteAdmin, getAllAdmins } from '../../../core/reducers/adminReducer';
import { ADD_ADMIN_ROUTE, UPDATE_ADMIN_ROUTE } from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'lastName', label: 'Last Name' },
  { id: 'firstName', label: 'First Name' },
  { id: 'patronymic', label: 'Patronumic' },
  { id: 'actions', label: 'Actions' }
];

export const AdminsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const admins = useAppSelector((state) => state.admin.admins);

  useEffect(() => {
    dispatch(getAllAdmins());
  }, []);

  const handleUpdateAdmin = (adminId: number) => {
    const path = generatePath(UPDATE_ADMIN_ROUTE, {
      adminId: `${adminId}`
    });
    navigate(path);
  };

  const handleDeleteAdmin = (adminId: number) => {
    dispatch(deleteAdmin(adminId));
  };

  const rows = useMemo(() => {
    return admins.map((admin) => ({
      firstName: admin.firstName,
      patronymic: admin.patronymic,
      lastName: admin.lastName,
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.Admin]) && (
            <Button variant="outlined" color="warning" onClick={() => { handleUpdateAdmin(admin.id); }}>
              Update
            </Button>
          )}
          {checkPermissions([UserRoleEnum.Admin]) && (
            <Button variant="outlined" color="error" onClick={() => { handleDeleteAdmin(admin.id); }}>
              Delete
            </Button>
          )}
        </Stack>
      )
    }));
  }, [admins]);

  const handleAddAdmin = () => {
    navigate(ADD_ADMIN_ROUTE);
  };

  return (
    <>
      <Table rows={rows} columns={columns} />
      {checkPermissions([UserRoleEnum.Admin]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleAddAdmin}>
            Add
          </Button>
        </Stack>
      )}
    </>
  );
};
