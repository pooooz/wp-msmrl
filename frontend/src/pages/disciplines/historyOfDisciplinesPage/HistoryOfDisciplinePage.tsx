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
    (state) => state.current_discipline.current_disciplines
  );

  const rows = useMemo(() => {
    return currentDisciplines
      .map((currentDiscipline) => ({
        group: currentDiscipline.group.name,
        year: currentDiscipline.year,
        teachers: currentDiscipline.discipline_teachers.map(({ teacher, form_of_conducting_classes }) => (
          <div key={`${teacher.first_name}${teacher.last_name}${teacher.patronumic}`}>
            {`${teacher.first_name} ${
              teacher.last_name
            } (${form_of_conducting_classes.toUpperCase()})`}
            <br />
          </div>
        ))
      }))
      .sort((a, b) => b.year - a.year);
  }, [currentDisciplines]);

  return <Table columns={columns} rows={rows} />;
};
