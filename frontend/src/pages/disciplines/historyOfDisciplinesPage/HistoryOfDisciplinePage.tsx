import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { getCurrentDisciplinesByDisciplineId } from '../../../core/reducers/currentDisciplineReducer';

const columns: TableColumns = [
  { id: 'group', label: 'Group' },
  { id: 'year', label: 'Year' },
  { id: 'teachers', label: 'Teachers' }
];

export const HistoryOfDisciplinePage = () => {
  const dispatch = useAppDispatch();

  const { disciplineId } = useParams();

  useEffect(() => {
    dispatch(getCurrentDisciplinesByDisciplineId(disciplineId));
  }, []);

  const currentDisciplines = useAppSelector(
    (state) => state.currentDiscipline.currentDisciplines
  );

  const rows = useMemo(() => {
    return currentDisciplines
      .map((currentDiscipline) => ({
        id: currentDiscipline.id,
        group: currentDiscipline.group.name,
        year: currentDiscipline.year,
        teachers: currentDiscipline.disciplineTeachers.map(({ teacher, formOfConductingClasses }) => (
          <div key={`${teacher.firstName}${teacher.lastName}${teacher.patronymic}`}>
            {`${teacher.firstName} ${
              teacher.lastName
            } (${formOfConductingClasses.toUpperCase()})`}
            <br />
          </div>
        ))
      }))
      .sort((a, b) => b.year - a.year);
  }, [currentDisciplines]);

  return <Table columns={columns} rows={rows} />;
};
