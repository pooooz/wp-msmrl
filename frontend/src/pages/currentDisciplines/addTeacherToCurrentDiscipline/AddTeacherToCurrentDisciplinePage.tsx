import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formOfConductingClasses } from '../../../core/constants/formOfConductingClasses';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { createDisciplineTeacher } from '../../../core/reducers/disciplineTeacterReducer';
import { getAllTeachers } from '../../../core/reducers/teacherReducer';

export const AddTeacherToCurrentDisciplinePage = () => {
  const dispatch = useAppDispatch();

  const { currentDisciplineId } = useParams();

  useEffect(() => {
    dispatch(getAllTeachers());
  }, []);

  const teachers = useAppSelector((state) => state.teacher.teachers);

  const [disciplineTeacher, setDisciplineTeacher] = useState({
    currentDisciplineId,
    teacherId: NaN,
    form_of_conducting_classes: ''
  });

  const dropdownTeacherItems = useMemo(() => {
    return teachers.map((teacher) => (
      <MenuItem
        value={teacher.id}
        key={teacher.id}
      >
        {`${teacher.first_name} ${teacher.last_name}`}
      </MenuItem>
    ));
  }, [teachers]);

  const dropdownFormOfConductingClassesItems = useMemo(() => {
    return formOfConductingClasses.map((form) => <MenuItem value={form} key={form}>{form}</MenuItem>);
  }, [formOfConductingClasses]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createDisciplineTeacher(disciplineTeacher));
  };

  const handleChangeTeacher = (event: any) => {
    setDisciplineTeacher((prevState) => ({
      ...prevState,
      teacherId: parseInt(event.target.value)
    }));
  };

  const handleChangeForm = (event: any) => {
    setDisciplineTeacher((prevState) => ({
      ...prevState,
      form_of_conducting_classes: event.target.value
    }));
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="teacher-label">Teacher</InputLabel>
          <Select
            labelId="cteacher-label"
            id="teacher-select"
            value={disciplineTeacher.teacherId}
            onChange={handleChangeTeacher}
            label="Teacher"
          >
            {dropdownTeacherItems}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="form-label">Form Of Conducting Classes</InputLabel>
          <Select
            labelId="form-label"
            id="form-select"
            value={disciplineTeacher.form_of_conducting_classes}
            onChange={handleChangeForm}
            label="Form Of Conducting Classes"
          >
            {dropdownFormOfConductingClassesItems}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
