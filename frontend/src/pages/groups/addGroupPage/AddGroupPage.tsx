import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { COURSES } from '../../../core/constants/groupCourses';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { createGroup } from '../../../core/reducers/groupReducer';
import { getAllSpecializations } from '../../../core/reducers/specializationReducer';

export const AddGroupPage = () => {
  const dispatch = useAppDispatch();

  const { state }: any = useLocation();

  const [group, setGroup] = useState({ name: '', course: 0, specializationId: NaN });

  const specializations = useAppSelector((state) => state.specialization.specializations);

  useEffect(() => {
    if (state && 'specializationId' in state) {
      setGroup((prevState) => ({ ...prevState, specializationId: state.specializationId }));
    }
  }, []);

  useEffect(() => {
    dispatch(getAllSpecializations());
  }, []);

  const handleChangeSpecialization = (event: any) => {
    setGroup((prevState) => ({ ...prevState, specializationId: parseInt(event.target.value) }));
  };

  const handleChangeName = (event: any) => {
    setGroup((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const handleChangeCourse = (event: any) => {
    setGroup((prevState) => ({ ...prevState, course: parseInt(event.target.value) }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createGroup(group));
  };

  const dropdownSpecializationItems = useMemo(() => {
    return specializations.map((specialization) => (
      <MenuItem value={specialization.id} key={specialization.id}>{specialization.name}</MenuItem>
    ));
  }, [specializations]);

  const dropdownCourseItems = useMemo(() => {
    return COURSES.map((course) => <MenuItem value={course} key={course}>{course}</MenuItem>);
  }, [COURSES]);

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
          <InputLabel id="specialization-label">Specialization</InputLabel>
          <Select
            labelId="specialization-label"
            id="specialization-select"
            value={group.specializationId.toString()}
            onChange={handleChangeSpecialization}
            label="Specialization"
          >
            {dropdownSpecializationItems}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="course-label">Course</InputLabel>
          <Select
            labelId="course-label"
            id="course-select"
            value={group.course.toString()}
            onChange={handleChangeCourse}
            label="Course"
          >
            {dropdownCourseItems}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          id="name"
          label="Name"
          name="name"
          value={group.name}
          onChange={handleChangeName}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
