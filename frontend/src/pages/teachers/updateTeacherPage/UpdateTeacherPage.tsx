import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { getTeacherById, updateTeacher } from '../../../core/reducers/teacherReducer';

export const UpdateTeacherPage = () => {
  const dispatch = useAppDispatch();

  const { teacherId } = useParams();

  useEffect(() => {
    dispatch(getTeacherById(teacherId));
  }, []);

  const { teacher, isLoading } = useAppSelector((state) => state.teacher);

  const [updatedTeacher, setUpdatedTeacher] = useState({
    id: 0,
    first_name: '',
    patronumic: '',
    last_name: '',
    login: '',
    password: ''
  });

  useEffect(() => {
    if (!isLoading) {
      setUpdatedTeacher((prevState) => ({
        ...prevState,
        id: teacher.id,
        first_name: teacher.first_name,
        patronumic: teacher.patronumic,
        last_name: teacher.last_name,
        login: teacher.user.login,
        password: ''
      }));
    }
  }, [teacher]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(updateTeacher(updatedTeacher));
  };

  const handleChange = (event: any) => {
    setUpdatedTeacher((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
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
          value={updatedTeacher.last_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="firstName"
          label="First Name"
          name="first_name"
          value={updatedTeacher.first_name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          id="patronumic"
          label="Patronumic"
          name="patronumic"
          value={updatedTeacher.patronumic}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          id="login"
          label="Login"
          name="login"
          value={updatedTeacher.login}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          id="password"
          label="Password"
          name="password"
          value={updatedTeacher.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};
