import { Button, Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { getCurrentDisciplinesByDisciplineIdInThisYear } from '../../../core/reducers/currentDisciplineReducer';
import {
  ADD_CURRENT_DISCIPLINE_ROUTE,
  CURRENT_DISCIPLINE_ROUTE,
  HISTORY_OF_DISCIPLINE_ROUTE,
  UPDATE_TEACHERS_OF_CURRENT_DISCIPLINE_ROUTE
} from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'group', label: 'Group' },
  { id: 'year', label: 'Year' },
  { id: 'teachers', label: 'Teachers' },
  { id: 'actions', label: 'Actions' }
];

export const DisciplinePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { disciplineId } = useParams();

  useEffect(() => {
    dispatch(getCurrentDisciplinesByDisciplineIdInThisYear(disciplineId));
  }, []);

  const currentDisciplines = useAppSelector(
    (state) => state.current_discipline.current_disciplines
  );

  const handleOpenCurrentDiscipline = (currentDisciplineId: number) => {
    const path = generatePath(CURRENT_DISCIPLINE_ROUTE, {
      currentDisciplineId: `${currentDisciplineId}`
    });
    navigate(path);
  };

  const handleUpdateCurrentDisciplineTeachers = (currentDisciplineId: number) => {
    const path = generatePath(UPDATE_TEACHERS_OF_CURRENT_DISCIPLINE_ROUTE, {
      currentDisciplineId: `${currentDisciplineId}`
    });
    navigate(path);
  };

  const rows = useMemo(() => {
    return currentDisciplines.map((currentDiscipline) => ({
      id: currentDiscipline.id,
      group: currentDiscipline.group.name,
      year: currentDiscipline.year,
      teachers: currentDiscipline.discipline_teachers.map(({ teacher, form_of_conducting_classes }) => (
        <div key={`${teacher.firstName}${teacher.lastName}${teacher.patronymic}`}>
          {`${teacher.firstName} ${
            teacher.lastName
          } (${form_of_conducting_classes.toUpperCase()})`}
          <br />
        </div>
      )),
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.Admin, UserRoleEnum.Teacher]) && (
            <Button
              variant="outlined"
              onClick={() => { handleUpdateCurrentDisciplineTeachers(currentDiscipline.id); }}
            >
              Teachers
            </Button>
          )}
          {checkPermissions([UserRoleEnum.Admin, UserRoleEnum.Teacher]) && (
            <Button
              variant="outlined"
              onClick={() => { handleOpenCurrentDiscipline(currentDiscipline.id); }}
            >
              Open
            </Button>
          )}
        </Stack>
      )
    }));
  }, [currentDisciplines]);

  const handleAddCurrentDiscipline = () => {
    navigate(ADD_CURRENT_DISCIPLINE_ROUTE, { state: { disciplineId } });
  };

  const handleOpenHistoryOfDiscipline = () => {
    const path = generatePath(HISTORY_OF_DISCIPLINE_ROUTE, {
      disciplineId: `${disciplineId}`
    });
    navigate(path);
  };

  return (
    <>
      <Table rows={rows} columns={columns} />
      {checkPermissions([UserRoleEnum.Admin]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            onClick={handleAddCurrentDiscipline}
          >
            Add
          </Button>
        </Stack>
      )}
      {checkPermissions([UserRoleEnum.Admin, UserRoleEnum.Teacher]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleOpenHistoryOfDiscipline}
          >
            History
          </Button>
        </Stack>
      )}
    </>
  );
};
