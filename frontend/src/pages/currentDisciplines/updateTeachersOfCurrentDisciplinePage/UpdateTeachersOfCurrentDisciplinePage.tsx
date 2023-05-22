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
  { id: 'last_name', label: 'Last Name' },
  { id: 'first_name', label: 'first Name' },
  { id: 'patronumic', label: 'Patronumic' },
  { id: 'form_of_conducting_classes', label: 'Form Of Conducing Classes' },
  { id: 'actions', label: 'Actions' }
];

export const UpdateTeachersOfCurrentDisciplinePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentDisciplineId } = useParams();

  useEffect(() => {
    dispatch(getTeachersByCurrentDisciplineId(currentDisciplineId));
  }, []);

  const discipline_teachers = useAppSelector(
    (state) => state.discipline_teacher.discipline_teachers
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
    return discipline_teachers.map(({ id, teacher, form_of_conducting_classes }) => ({
      first_name: teacher.first_name,
      patronumic: teacher.patronumic,
      last_name: teacher.last_name,
      form_of_conducting_classes,
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.ADMIN]) && (
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
  }, [discipline_teachers]);

  return (
    <>
      <Table rows={rows} columns={columns} />
      {checkPermissions([UserRoleEnum.ADMIN]) && (
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
