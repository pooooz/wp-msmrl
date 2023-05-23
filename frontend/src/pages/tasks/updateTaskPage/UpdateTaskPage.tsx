import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { getTaskById, updateTask } from '../../../core/reducers/taskReducer';

export const UpdateTaskPage = () => {
  const dispatch = useAppDispatch();

  const { taskId } = useParams();

  useEffect(() => {
    dispatch(getTaskById(taskId));
  }, []);

  const { task, isLoading } = useAppSelector((state) => state.task);

  const [updatedTask, setUpdatedTask] = useState({ id: NaN, name: '', mandatory: true });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(updateTask(updatedTask));
  };

  useEffect(() => {
    if (!isLoading) {
      setUpdatedTask((prevState) => ({ ...prevState, ...task }));
    }
  }, [task]);

  const handleChangeName = (event: any) => {
    setUpdatedTask((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const handleChangeMandatory = (event: any) => {
    setUpdatedTask((prevState) => ({ ...prevState, mandatory: event.target.checked }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <TextField
          margin="normal"
          required
          id="name"
          label="Name"
          name="name"
          value={updatedTask.name}
          onChange={handleChangeName}
        />
        <FormControlLabel
          sx={{ mt: 1 }}
          value="Mandatory"
          control={<Checkbox checked={updatedTask.mandatory} onChange={handleChangeMandatory} />}
          label="Mandatory"
          labelPlacement="top"
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};
