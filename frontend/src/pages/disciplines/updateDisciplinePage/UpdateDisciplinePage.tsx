import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { disciplineControlForms } from '../../../core/constants/disciplineControlForms';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { getDisciplineById, updateDiscipline } from '../../../core/reducers/disciplineReducer';

export const UpdateDisciplinePage = () => {
  const dispatch = useAppDispatch();

  const { disciplineId } = useParams();

  useEffect(() => {
    dispatch(getDisciplineById(disciplineId));
  }, []);

  const { discipline, isLoading } = useAppSelector((state) => state.discipline);

  const [updatedDiscipline, setUpdatedDiscipline] = useState({ name: '', control_form: '' });

  useEffect(() => {
    if (!isLoading) {
      setUpdatedDiscipline((prevState) => ({ ...prevState, ...discipline }));
    }
  }, [discipline]);

  const handleChange = (event: any) => {
    setUpdatedDiscipline((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(updateDiscipline(updatedDiscipline));
  };

  const dropdownControlFormItems = useMemo(() => {
    return disciplineControlForms.map((controlForm) => (
      <MenuItem value={controlForm} key={controlForm}>{controlForm}</MenuItem>
    ));
  }, [disciplineControlForms]);

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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="control-form-label">Control Form</InputLabel>
          <Select
            labelId="control-form-label"
            id="control-form-select"
            name="control_form"
            value={updatedDiscipline.control_form}
            onChange={handleChange}
            label="Specialization"
          >
            {dropdownControlFormItems}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          id="name"
          label="Name"
          name="name"
          value={updatedDiscipline.name}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};
