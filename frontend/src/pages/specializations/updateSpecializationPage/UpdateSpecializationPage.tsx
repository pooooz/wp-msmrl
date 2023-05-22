import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import {
  getSpecializationById,
  updateSpecialization
} from '../../../core/reducers/specializationReducer';

export const UpdateSpecializationPage = () => {
  const dispatch = useAppDispatch();

  const { specializationId } = useParams();

  const { specialization, isLoading } = useAppSelector((state) => state.specialization);

  useEffect(() => {
    dispatch(getSpecializationById(specializationId));
  }, []);

  const [updatedSpecialization, setUpdatedSpecialization] = useState({ id: 0, name: '' });

  useEffect(() => {
    if (!isLoading) {
      setUpdatedSpecialization((prevState) => ({
        ...prevState,
        id: specialization.id,
        name: specialization.name
      }));
    }
  }, [specialization]);

  const handleChange = (event: any) => {
    setUpdatedSpecialization((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateSpecialization(updatedSpecialization));
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
          value={updatedSpecialization.name}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};
