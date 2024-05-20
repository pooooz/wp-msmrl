import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { getAllGroups } from '../../../core/reducers/groupReducer';
import { createStudent } from '../../../core/reducers/studentReducer';

export const AddStudentPage = () => {
  const dispatch = useAppDispatch();

  const { state }: any = useLocation();

  const [student, setStudent] = useState({
    firstName: '',
    patronymic: '',
    lastName: '',
    groupId: NaN
  });

  const groups = useAppSelector((state) => state.group.groups);

  useEffect(() => {
    if (state && 'groupId' in state) {
      setStudent((prevState) => ({ ...prevState, groupId: state.groupId }));
    }
  }, []);

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createStudent(student));
  };

  const handleChangeGroup = (event: any) => {
    setStudent((prevState) => ({ ...prevState, groupId: parseInt(event.target.value) }));
  };

  const handleChangeName = (event: any) => {
    setStudent((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
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
            value={student.groupId.toString()}
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
          value={student.lastName}
          onChange={handleChangeName}
        />
        <TextField
          margin="normal"
          required
          id="firstName"
          label="First Name"
          name="firstName"
          value={student.firstName}
          onChange={handleChangeName}
        />
        <TextField
          margin="normal"
          id="patronymic"
          label="Patronumic"
          name="patronymic"
          value={student.patronymic}
          onChange={handleChangeName}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
