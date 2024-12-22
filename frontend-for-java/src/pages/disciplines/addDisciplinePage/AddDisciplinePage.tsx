import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { disciplineControlForms } from '../../../core/constants/disciplineControlForms';
import { useAppDispatch } from '../../../core/hooks/redux';
import { createDiscipline } from '../../../core/reducers/disciplineReducer';

export const AddDisciplinePage = () => {
  const dispatch = useAppDispatch();

  const [discipline, setDiscipline] = useState({ name: '', controlForm: '' });

  const handleChange = (event: any) => {
    setDiscipline((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createDiscipline(discipline));
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
            name="controlForm"
            value={discipline.controlForm}
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
          value={discipline.name}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
