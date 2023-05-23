import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { createCurrentDiscipline } from '../../../core/reducers/currentDisciplineReducer';
import { getAllDisciplines } from '../../../core/reducers/disciplineReducer';
import { getAllGroups } from '../../../core/reducers/groupReducer';

export const AddCurrentDisciplinePage = () => {
  const dispatch = useAppDispatch();

  const { state }: any = useLocation();

  const [currentDiscipline, setCurrentDiscipline] = useState({
    disciplineId: NaN,
    groupId: NaN,
    year: new Date().getFullYear()
  });

  useEffect(() => {
    if (state && 'disciplineId' in state) {
      setCurrentDiscipline((prevState) => ({ ...prevState, disciplineId: state.disciplineId }));
    }
  }, []);

  useEffect(() => {
    dispatch(getAllDisciplines());
    dispatch(getAllGroups());
  }, []);

  const disciplines = useAppSelector((state) => state.discipline.disciplines);

  const groups = useAppSelector((state) => state.group.groups);

  const dropdownDisciplineItems = useMemo(() => {
    return disciplines.map(({ id, name }) => (
      <MenuItem value={id} key={id}>{name}</MenuItem>
    ));
  }, [disciplines]);

  const dropdownGroupItems = useMemo(() => {
    return groups.map(({ id, name }) => <MenuItem value={id} key={id}>{name}</MenuItem>);
  }, [groups]);

  const handleChange = (event: any) => {
    setCurrentDiscipline((prevState) => ({
      ...prevState,
      [event.target.name]: parseInt(event.target.value)
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createCurrentDiscipline(currentDiscipline));
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
          <InputLabel id="discipline-label">Discipline</InputLabel>
          <Select
            labelId="discipline-label"
            id="discipline-select"
            name="disciplineId"
            value={currentDiscipline.disciplineId.toString()}
            onChange={handleChange}
            label="Discipline"
          >
            {dropdownDisciplineItems}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="group-label">Group</InputLabel>
          <Select
            labelId="group-label"
            id="group-select"
            name="groupId"
            value={currentDiscipline.groupId.toString()}
            onChange={handleChange}
            label="Group"
          >
            {dropdownGroupItems}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          id="year"
          label="Year"
          name="year"
          value={currentDiscipline.year}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
