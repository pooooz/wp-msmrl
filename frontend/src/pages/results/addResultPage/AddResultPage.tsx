import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EvaluationScaleEnum } from '../../../core/constants/EvaluationScaleEnum';
import { creditMarks, tenPointMarks } from '../../../core/constants/marks';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { createResult } from '../../../core/reducers/resultReducer';
import { getStudentsByTaskId } from '../../../core/reducers/studentReducer';
import { getTaskById } from '../../../core/reducers/taskReducer';

export const AddResultPage = () => {
  const dispatch = useAppDispatch();

  const { state }: any = useLocation();

  const [result, setResult] = useState({ taskId: NaN, studentId: NaN, mark: NaN, comment: '' });

  useEffect(() => {
    if (state && 'taskId' in state) {
      dispatch(getStudentsByTaskId(state.taskId));
      dispatch(getTaskById(state.taskId));
      setResult((prevState) => ({ ...prevState, taskId: state.taskId }));
    }
  }, []);

  const students = useAppSelector((state) => state.student.students);

  const task = useAppSelector((state) => state.task.task);

  const dropdownStudentItems = useMemo(() => {
    return students.map((student) => (
      <MenuItem
        value={student.id}
        key={student.id}
      >
        {`${student.firstName} ${student.lastName}`}
      </MenuItem>
    ));
  }, [students]);

  const dropdownMarkItems = useMemo(() => {
    if (task.evaluationScale === EvaluationScaleEnum.TenPoint) {
      return tenPointMarks.map((mark) => <MenuItem value={mark} key={mark}>{mark}</MenuItem>);
    } else if (task.evaluationScale === EvaluationScaleEnum.Credit) {
      return creditMarks.map((mark) => <MenuItem value={mark.value} key={mark.value}>{mark.title}</MenuItem>);
    }
  }, [task]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createResult(result));
  };

  const handleChangeStudent = (event: any) => {
    setResult((prevState) => ({ ...prevState, studentId: parseInt(event.target.value) }));
  };

  const handleChangeMark = (event: any) => {
    setResult((prevState) => ({ ...prevState, mark: parseInt(event.target.value) }));
  };

  const handleChangeComment = (event: any) => {
    setResult((prevState) => ({ ...prevState, comment: event.target.value }));
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
          <InputLabel id="student-label">Student</InputLabel>
          <Select
            labelId="student-label"
            id="student-select"
            value={result.studentId.toString()}
            onChange={handleChangeStudent}
            label="Student"
          >
            {dropdownStudentItems}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="mark-label">Mark</InputLabel>
          <Select
            labelId="mark-label"
            id="mark-select"
            value={result.mark.toString()}
            onChange={handleChangeMark}
            label="Mark"
          >
            {dropdownMarkItems}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          id="comment"
          label="Comment"
          name="comment"
          value={result.comment}
          onChange={handleChangeComment}
        />

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </Box>
    </Box>
  );
};
