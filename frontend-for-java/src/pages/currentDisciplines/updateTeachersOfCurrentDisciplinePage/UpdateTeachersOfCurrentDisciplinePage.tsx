import { Button, Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import {
  deleteDisciplineTeacher,
  getTeachersByCurrentDisciplineId
} from '../../../core/reducers/disciplineTeacterReducer';
import { ADD_TEACHER_TO_CURRENT_DISCIPLINE_ROUTE } from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'lastName', label: 'Last Name' },
  { id: 'firstName', label: 'first Name' },
  { id: 'patronymic', label: 'Patronumic' },
  { id: 'formOfConductingClasses', label: 'Form Of Conducing Classes' },
  { id: 'actions', label: 'Actions' }
];

export const UpdateTeachersOfCurrentDisciplinePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentDisciplineId } = useParams();

  useEffect(() => {
    dispatch(getTeachersByCurrentDisciplineId(currentDisciplineId));
  }, []);

  const disciplineTeachers = useAppSelector(
    (state) => state.discipline_teacher.disciplineTeachers
  );

  const handleDeleteDisciplineTeacher = (disciplineTeacherId: number) => {
    dispatch(deleteDisciplineTeacher(disciplineTeacherId));
  };

  const handleAddDisciplineTeacher = () => {
    const path = generatePath(ADD_TEACHER_TO_CURRENT_DISCIPLINE_ROUTE, {
      currentDisciplineId: `${currentDisciplineId}`
    });
    navigate(path);
  };

  const rows = useMemo(() => {
    return disciplineTeachers.map(({ id, teacher, formOfConductingClasses }) => ({
      id: teacher.id,
      firstName: teacher.firstName,
      patronymic: teacher.patronymic,
      lastName: teacher.lastName,
      formOfConductingClasses,
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.Admin]) && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => { handleDeleteDisciplineTeacher(id); }}
            >
              Delete
            </Button>
          )}
        </Stack>
      )
    }));
  }, [disciplineTeachers]);

  return (
    <>
      <Table rows={rows} columns={columns} />
      {checkPermissions([UserRoleEnum.Admin]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            onClick={handleAddDisciplineTeacher}
          >
            Add
          </Button>
        </Stack>
      )}
    </>
  );
};
