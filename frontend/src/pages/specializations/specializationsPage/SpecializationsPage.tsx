import React, { useEffect, useMemo } from 'react';
import Table from '../../../core/components/Table/Table';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import {
  deleteSpecialization,
  getAllSpecializations
} from '../../../core/reducers/specializationReducer';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  ADD_SPECIALIZATION_ROUTE,
  SPECIALIZATION_ROUTE,
  UPDATE_SPECIALIZATION_ROUTE
} from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'name', label: 'Name' },
  { id: 'actions', label: 'Actions' }
];

export const SpecializationsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const specializations = useAppSelector((state) => state.specialization.specializations);

  useEffect(() => {
    dispatch(getAllSpecializations());
  }, []);

  const handleOpenSpecialization = (specializationId: number) => {
    const path = generatePath(SPECIALIZATION_ROUTE, {
      specializationId: `${specializationId}`
    });
    navigate(path);
  };

  const handleUpdateSpecialization = (specializationId: number) => {
    const path = generatePath(UPDATE_SPECIALIZATION_ROUTE, {
      specializationId: `${specializationId}`
    });
    navigate(path);
  };

  const handleDeleteSpecialization = (id: number) => {
    dispatch(deleteSpecialization(id));
  };

  const handleAddSpecialization = () => {
    navigate(ADD_SPECIALIZATION_ROUTE);
  };

  const rows = useMemo(() => {
    return specializations.map((specialization) => ({
      name: specialization.name,
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER]) && (
            <Button variant="outlined" onClick={() => { handleOpenSpecialization(specialization.id); }}>
              Open
            </Button>
          )}
          {checkPermissions([UserRoleEnum.ADMIN]) && (
            <Button
              variant="outlined"
              color="warning"
              onClick={() => { handleUpdateSpecialization(specialization.id); }}
            >
              Update
            </Button>
          )}
          {checkPermissions([UserRoleEnum.ADMIN]) && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => { handleDeleteSpecialization(specialization.id); }}
            >
              Delete
            </Button>
          )}
        </Stack>
      )
    }));
  }, [specializations]);

  return (
    <>
      <Table rows={rows} columns={columns} />
      {checkPermissions([UserRoleEnum.ADMIN]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            onClick={handleAddSpecialization}
          >
            Add
          </Button>
        </Stack>
      )}
    </>
  );
};
