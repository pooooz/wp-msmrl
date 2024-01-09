import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { getAllGroups } from '../../../core/reducers/groupReducer';
import { getStudentById, updateStudent } from '../../../core/reducers/studentReducer';

export const UpdateStudentPage = () => {
  const dispatch = useAppDispatch();

  const { studentId } = useParams();

  const { student, isLoading } = useAppSelector((state) => state.student);

  const groups = useAppSelector((state) => state.group.groups);

  useEffect(() => {
    dispatch(getStudentById(studentId));
  }, []);

  const [updatedStudent, setUpdatedStudent] = useState({
    id: 0,
    firstName: '',
    patronymic: '',
    lastName: '',
    groupId: 0
  });

  useEffect(() => {
    if (!isLoading) {
      setUpdatedStudent((prevState) => ({
        ...prevState,
        id: student.id,
        firstName: student.firstName,
        patronymic: student.patronymic,
        lastName: student.lastName,
        groupId: student.group.id
      }));
    }
  }, [student]);

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(updateStudent(updatedStudent));
  };

  const handleChangeGroup = (event: any) => {
    setUpdatedStudent((prevState) => ({ ...prevState, groupId: parseInt(event.target.value) }));
  };

  const handleChangeName = (event: any) => {
    setUpdatedStudent((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const dropdownGroupItems = useMemo(() => {
    return groups.map((group) => <MenuItem value={group.id} key={group.id}>{group.name}</MenuItem>);
  }, [groups]);

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
          <InputLabel id="group-label">Group</InputLabel>
          <Select
            labelId="group-label"
            id="group-select"
            value={updatedStudent.groupId.toString()}
            onChange={handleChangeGroup}
            label="Specialization"
          >
            {dropdownGroupItems}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          id="lastName"
          label="Last Name"
          name="lastName"
          value={updatedStudent.lastName}
          onChange={handleChangeName}
        />
        <TextField
          margin="normal"
          required
          id="firstName"
          label="First Name"
          name="firstName"
          value={updatedStudent.firstName}
          onChange={handleChangeName}
        />
        <TextField
          margin="normal"
          id="patronymic"
          label="Patronumic"
          name="patronymic"
          value={updatedStudent.patronymic}
          onChange={handleChangeName}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};
