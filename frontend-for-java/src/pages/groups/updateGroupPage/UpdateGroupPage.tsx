import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { COURSES } from '../../../core/constants/groupCourses';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { getGroupById, updateGroup } from '../../../core/reducers/groupReducer';
import { getAllSpecializations } from '../../../core/reducers/specializationReducer';

export const UpdateGroupPage = () => {
  const dispatch = useAppDispatch();

  const { groupId } = useParams();

  const { group, isLoading } = useAppSelector((state) => state.group);

  const specializations = useAppSelector((state) => state.specialization.specializations);

  useEffect(() => {
    dispatch(getGroupById(groupId));
  }, []);

  useEffect(() => {
    dispatch(getAllSpecializations());
  }, []);

  const [updatedGroup, setUpdatedGroup] = useState({
    id: 0,
    name: '',
    course: 0,
    specializationId: NaN
  });

  useEffect(() => {
    if (!isLoading) {
      setUpdatedGroup((prevState) => ({
        ...prevState,
        id: group.id,
        name: group.name,
        course: group.course,
        specializationId: group.specialization.id
      }));
    }
  }, [group]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(updateGroup(updatedGroup));
  };

  const handleChangeSpecialization = (event: any) => {
    setUpdatedGroup((prevState) => ({
      ...prevState,
      specializationId: parseInt(event.target.value)
    }));
  };

  const handleChangeName = (event: any) => {
    setUpdatedGroup((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const handleChangeCourse = (event: any) => {
    setUpdatedGroup((prevState) => ({ ...prevState, course: parseInt(event.target.value) }));
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
            value={updatedGroup.specializationId.toString()}
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
            value={updatedGroup.course.toString()}
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
          value={updatedGroup.name}
          onChange={handleChangeName}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};
