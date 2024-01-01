import { Button, Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { deleteResult, getResultsByTaskId } from '../../../core/reducers/resultReducer';
import { ADD_RESULT_ROUTE, UPDATE_RESULT_ROUTE } from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'student', label: 'Student' },
  { id: 'mark', label: 'Mark' },
  { id: 'comment', label: 'Comment' },
  { id: 'date', label: 'Date' },
  { id: 'actions', label: 'Actions' }
];

export const TaskPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { taskId } = useParams();

  useEffect(() => {
    dispatch(getResultsByTaskId(taskId));
  }, []);

  const results = useAppSelector((state) => state.result.resultsByTask);

  const handleUpdateResult = (resultId: number) => {
    const path = generatePath(UPDATE_RESULT_ROUTE, {
      resultId: `${resultId}`
    });

    navigate(path);
  };

  const handleDeleteResult = (resultId: number) => {
    dispatch(deleteResult(resultId));
  };

  const rows = useMemo(() => {
    return results
      .map((result) => ({
        student: `${result.student.lastName} ${result.student.firstName}`,
        mark: result.mark,
        comment: result.comment,
        date: new Date(result.date).toLocaleDateString('ru-Ru', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        actions: (
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
            {checkPermissions([UserRoleEnum.Teacher]) && (
              <Button
                variant="outlined"
                color="warning"
                onClick={() => { handleUpdateResult(result.id); }}
              >
                Update
              </Button>
            )}
            {checkPermissions([UserRoleEnum.Teacher]) && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => { handleDeleteResult(result.id); }}
              >
                Delete
              </Button>
            )}
          </Stack>
        )
      }))
      .reverse();
  }, [results]);

  const handleAddResult = () => {
    navigate(ADD_RESULT_ROUTE, { state: { taskId } });
  };

  return (
    <>
      <Table rows={rows} columns={columns} />
      {checkPermissions([UserRoleEnum.Teacher]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleAddResult}>
            Add
          </Button>
        </Stack>
      )}
    </>
  );
};
