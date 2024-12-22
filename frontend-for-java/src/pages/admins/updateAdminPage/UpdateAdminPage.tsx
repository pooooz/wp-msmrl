import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { getAdminById, updateAdmin } from '../../../core/reducers/adminReducer';

export const UpdateAdminPage = () => {
  const dispatch = useAppDispatch();

  const { adminId } = useParams();

  useEffect(() => {
    dispatch(getAdminById(adminId));
  }, []);

  const { admin, isLoading } = useAppSelector((state) => state.admin);

  const [updatedAdmin, setUpdatedAdmin] = useState({
    id: 0,
    firstName: '',
    patronymic: '',
    lastName: '',
    login: '',
    password: ''
  });

  useEffect(() => {
    if (!isLoading) {
      setUpdatedAdmin((prevState) => ({
        ...prevState,
        id: admin.id,
        firstName: admin.firstName,
        patronymic: admin.patronymic,
        lastName: admin.lastName,
        login: admin.user.login
      }));
    }
  }, [admin]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(updateAdmin(updatedAdmin));
  };

  const handleChange = (event: any) => {
    setUpdatedAdmin((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
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
          id="lastName"
          label="Last Name"
          name="lastName"
          value={updatedAdmin.lastName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="firstName"
          label="First Name"
          name="firstName"
          value={updatedAdmin.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          id="patronymic"
          label="Patronumic"
          name="patronymic"
          value={updatedAdmin.patronymic}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="login"
          label="Login"
          name="login"
          value={updatedAdmin.login}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="password"
          label="Password"
          name="password"
          value={updatedAdmin.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};
