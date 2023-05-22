import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../core/hooks/redux';
import { createAdmin } from '../../../core/reducers/adminReducer';

export const AddAdminPage = () => {
  const dispatch = useAppDispatch();

  const [admin, setAdmin] = useState({
    first_name: '',
    patronumic: '',
    last_name: '',
    login: '',
    password: ''
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createAdmin(admin));
  };

  const handleChange = (event: any) => {
    setAdmin((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
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
          value={admin.last_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="firstName"
          label="First Name"
          name="first_name"
          value={admin.first_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          id="patronumic"
          label="Patronumic"
          name="patronumic"
          value={admin.patronumic}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="login"
          label="Login"
          name="login"
          value={admin.login}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="password"
          label="Password"
          name="password"
          value={admin.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
