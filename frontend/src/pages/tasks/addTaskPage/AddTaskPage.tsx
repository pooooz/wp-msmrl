import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../core/hooks/redux';
import { createTask } from '../../../core/reducers/taskReducer';

export const AddTaskPage = () => {
  const dispatch = useAppDispatch();

  const { state }: any = useLocation();

  const [task, setTask] = useState({ name: '', currentDisciplineId: NaN, mandatory: true });

  useEffect(() => {
    if (state && 'currentDisciplineId' in state) {
      setTask((prevState) => ({ ...prevState, currentDisciplineId: Number(state.currentDisciplineId) }));
    }
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createTask(task));
  };

  const handleChangeName = (event: any) => {
    setTask((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const handleChangeMandatory = (event: any) => {
    setTask((prevState) => ({ ...prevState, mandatory: event.target.checked }));
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
          value={task.name}
          onChange={handleChangeName}
        />
        <FormControlLabel
          sx={{ mt: 1 }}
          value="Mandatory"
          control={<Checkbox checked={task.mandatory} onChange={handleChangeMandatory} />}
          label="Mandatory"
          labelPlacement="top"
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
