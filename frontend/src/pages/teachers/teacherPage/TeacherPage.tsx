import { Button, Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { getCurrentDisciplinesByTeacherId } from '../../../core/reducers/disciplineTeacterReducer';
import { CURRENT_DISCIPLINE_ROUTE } from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'group_name', label: 'Group' },
  { id: 'discipline_name', label: 'Discipline' },
  { id: 'controlForm', label: 'Control Form' },
  { id: 'form_of_conducing_classes', label: 'Form Of Conducing Classes' },
  { id: 'actions', label: 'Actions' }
];

export const TeacherPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { teacherId } = useParams();

  useEffect(() => {
    dispatch(getCurrentDisciplinesByTeacherId(teacherId));
  }, []);

  const currentDisciplines = useAppSelector(
    (state) => state.discipline_teacher.disciplines_teacher
  );

  const handleOpenCurrentDiscipline = (currentDisciplineId: number) => {
    const path = generatePath(CURRENT_DISCIPLINE_ROUTE, {
      currentDisciplineId: `${currentDisciplineId}`
    });

    navigate(path);
  };

  const rows = useMemo(() => {
    return currentDisciplines.map((disciplineTeacher) => ({
      discipline_name: disciplineTeacher.current_discipline.discipline.name,
      controlForm: disciplineTeacher.current_discipline.discipline.controlForm,
      form_of_conducing_classes: disciplineTeacher.form_of_conducting_classes,
      group_name: disciplineTeacher.current_discipline.group.name,
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.Admin, UserRoleEnum.Teacher]) && (
            <Button
              variant="outlined"
              onClick={() => { handleOpenCurrentDiscipline(disciplineTeacher.current_discipline.id); }}
            >
              Open
            </Button>
          )}
        </Stack>
      )
    }));
  }, [currentDisciplines]);

  return <Table columns={columns} rows={rows} />;
};
