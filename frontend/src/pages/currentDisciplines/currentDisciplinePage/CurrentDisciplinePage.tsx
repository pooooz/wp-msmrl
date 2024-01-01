import { Button, Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Table from '../../../core/components/Table/Table';
import { UserRoleEnum } from '../../../core/constants/UserRoleEnum';
import { checkPermissions } from '../../../core/functions/checkPermissions';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { TableColumns } from '../../../core/interfaces/TableColumn';
import { getCurrentDisciplineById } from '../../../core/reducers/currentDisciplineReducer';
import { deleteTask } from '../../../core/reducers/taskReducer';
import { ADD_TASK_ROUTE, TASK_ROUTE, UPDATE_TASK_ROUTE } from '../../AppRoutes';

const columns: TableColumns = [
  { id: 'task', label: 'Task' },
  { id: 'mandatory', label: 'Mandatory' },
  { id: 'actions', label: 'Actions' }
];

export const CurrentDisciplinePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentDisciplineId } = useParams();

  useEffect(() => {
    dispatch(getCurrentDisciplineById(currentDisciplineId));
  }, []);

  const current_discipline = useAppSelector((state) => state.current_discipline.current_discipline);

  const handleOpenTask = (taskId: number) => {
    const path = generatePath(TASK_ROUTE, {
      taskId: `${taskId}`
    });
    navigate(path);
  };

  const handleUpdateTask = (taskId: number) => {
    const path = generatePath(UPDATE_TASK_ROUTE, {
      taskId: `${taskId}`
    });

    navigate(path);
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId));
    setTimeout(() => dispatch(getCurrentDisciplineById(currentDisciplineId)), 100);
  };

  const rows = useMemo(() => {
    return current_discipline.tasks.map((task) => ({
      task: task.name,
      mandatory: task.mandatory ? 'Yes' : 'No',
      actions: (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          {checkPermissions([UserRoleEnum.Admin, UserRoleEnum.Teacher]) && (
            <Button variant="outlined" onClick={() => { handleOpenTask(task.id); }}>
              Open
            </Button>
          )}
          {checkPermissions([UserRoleEnum.Teacher]) && (
            <Button variant="outlined" color="warning" onClick={() => { handleUpdateTask(task.id); }}>
              Update
            </Button>
          )}
          {checkPermissions([UserRoleEnum.Teacher]) && (
            <Button variant="outlined" color="error" onClick={() => { handleDeleteTask(task.id); }}>
              Delete
            </Button>
          )}
        </Stack>
      )
    }));
  }, [current_discipline]);

  const handleAddTask = () => {
    navigate(ADD_TASK_ROUTE, { state: { currentDisciplineId } });
  };

  return (
    <>
      <Table rows={rows} columns={columns} />
      {checkPermissions([UserRoleEnum.Teacher]) && (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleAddTask}>
            Add
          </Button>
        </Stack>
      )}
    </>
  );
};
