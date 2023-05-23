import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../../../core/hooks/redux';
import { addSpecialization } from '../../../core/reducers/specializationReducer';

export const AddSpecializationPage = () => {
  const dispatch = useAppDispatch();

  const [specialization, setSpecialization] = useState({ name: '' });

  const handleChange = (event: any) => {
    setSpecialization((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addSpecialization(specialization));
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          value={specialization.name}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
