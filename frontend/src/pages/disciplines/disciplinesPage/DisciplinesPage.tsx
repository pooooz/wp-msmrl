import { Button, Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { deleteDiscipline, getAllDisciplines } from '../../../core/reducers/disciplineReducer';
import { ADD_DISCIPLINE_ROUTE, DISCIPLINE_ROUTE, UPDATE_DISCIPLINE_ROUTE } from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'name', label: 'Name' },
  { id: 'control_form', label: 'Control Form' },
  { id: 'actions', label: 'Actions' }
];

export const DisciplinesPage = () => {
  const dispatch = useAppDispatch();

  const disciplines = useAppSelector((state) => state.discipline.disciplines);

  useEffect(() => {
    dispatch(getAllDisciplines());
  }, []);

  useEffect(() => {
    console.log(disciplines);
  }, [disciplines]);

  const handleOpenDiscipline = (disciplineId: number) => {
    const path = generatePath(DISCIPLINE_ROUTE, {
      disciplineId: `${disciplineId}`
    });
    navigate(path);
  };

  const handleUpdateDiscipline = (disciplineId: number) => {
    const path = generatePath(UPDATE_DISCIPLINE_ROUTE, {
      disciplineId: `${disciplineId}`
    });
    navigate(path);
  };

  const handleDeleteDiscipline = (disciplineId: number) => {
    dispatch(deleteDiscipline(disciplineId));
  };

  const rows = useMemo(() => {
    return disciplines.map((discipline) => ({
      name: discipline.name,
      control_form: discipline.control_form,
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER]) && (
            <Button variant="outlined" onClick={() => { handleOpenDiscipline(discipline.id); }}>
              Open
            </Button>
          )}
          {checkPermissions([UserRoleEnum.ADMIN]) && (
            <Button
              variant="outlined"
              color="warning"
              onClick={() => { handleUpdateDiscipline(discipline.id); }}
            >
              Update
            </Button>
          )}
          {checkPermissions([UserRoleEnum.ADMIN]) && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => { handleDeleteDiscipline(discipline.id); }}
            >
              Delete
            </Button>
          )}
        </Stack>
      )
    }));
  }, [disciplines]);

  const navigate = useNavigate();

  const handleAddDiscipline = () => {
    navigate(ADD_DISCIPLINE_ROUTE);
  };

  return (
    <>
      <Table rows={rows} columns={columns} />
      {checkPermissions([UserRoleEnum.ADMIN]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleAddDiscipline}>
            Add
          </Button>
        </Stack>
      )}
    </>
  );
};
