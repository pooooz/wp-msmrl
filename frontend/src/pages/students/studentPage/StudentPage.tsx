import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { getResultsByStudentId } from '../../../core/reducers/resultReducer';

const columns: TableColumns = [
  { id: 'discipline', label: 'Discipline' },
  { id: 'mark', label: 'Mark' },
  { id: 'comment', label: 'Comment' },
  { id: 'date', label: 'Date' },
  { id: 'mandatory', label: 'Mandatory' }
];

export const StudentPage = () => {
  const dispatch = useAppDispatch();

  const { studentId } = useParams();

  const results = useAppSelector((state) => state.result.resultsByStudent);

  useEffect(() => {
    dispatch(getResultsByStudentId(studentId));
  }, []);

  const rows = useMemo(() => {
    return results
      .map((result) => ({
        discipline: result.task.current_discipline.discipline.name,
        mark: result.mark,
        comment: result.comment,
        date: new Date(result.date).toLocaleDateString('ru-Ru', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        mandatory: result.task.mandatory ? 'Yes' : 'No'
      }))
      .reverse();
  }, [results]);

  return <Table columns={columns} rows={rows} />;
};
