import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../core/hooks/redux';
import { createTeacher } from '../../../core/reducers/teacherReducer';

export const AddTeacherPage = () => {
  const dispatch = useAppDispatch();

  const [teacher, setTeacher] = useState({
    first_name: '',
    patronumic: '',
    last_name: '',
    login: '',
    password: ''
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createTeacher(teacher));
  };

  const handleChange = (event: any) => {
    setTeacher((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
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
          value={teacher.last_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="firstName"
          label="First Name"
          name="first_name"
          value={teacher.first_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          id="patronumic"
          label="Patronumic"
          name="patronumic"
          value={teacher.patronumic}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="login"
          label="Login"
          name="login"
          value={teacher.login}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="password"
          label="Password"
          name="password"
          value={teacher.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
