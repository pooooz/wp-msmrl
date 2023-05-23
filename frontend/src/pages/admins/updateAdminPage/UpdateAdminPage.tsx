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
    first_name: '',
    patronumic: '',
    last_name: '',
    login: '',
    password: ''
  });

  useEffect(() => {
    if (!isLoading) {
      setUpdatedAdmin((prevState) => ({
        ...prevState,
        id: admin.id,
        first_name: admin.first_name,
        patronumic: admin.patronumic,
        last_name: admin.last_name,
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
          name="last_name"
          value={updatedAdmin.last_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="firstName"
          label="First Name"
          name="first_name"
          value={updatedAdmin.first_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          id="patronumic"
          label="Patronumic"
          name="patronumic"
          value={updatedAdmin.patronumic}
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
