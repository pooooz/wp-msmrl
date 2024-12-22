import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EvaluationScaleEnum } from '../../../core/constants/EvaluationScaleEnum';
import { tenPointMarks, creditMarks } from '../../../core/constants/marks';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { getResultById, updateResult } from '../../../core/reducers/resultReducer';
import { getStudentsByTaskId } from '../../../core/reducers/studentReducer';

export const UpdateResultPage = () => {
  const dispatch = useAppDispatch();

  const { resultId } = useParams();

  useEffect(() => {
    dispatch(getResultById(resultId));
  }, []);

  const { result, isLoading } = useAppSelector((state) => state.result);

  const students = useAppSelector((state) => state.student.students);

  const [updatedResult, setUpdatedResult] = useState({
    id: NaN,
    comment: '',
    mark: NaN,
    studentId: NaN,
    taskId: NaN
  });

  useEffect(() => {
    if (!isLoading) {
      setUpdatedResult((prevState) => ({
        ...prevState,
        id: result.id,
        comment: result.comment,
        mark: result.mark,
        studentId: result.student.id,
        taskId: result.task.id
      }));
      dispatch(getStudentsByTaskId(result.task.id));
    }
  }, [result]);

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
    if (result.task.evaluationScale === EvaluationScaleEnum.TenPoint) {
      return tenPointMarks.map((mark) => <MenuItem value={mark} key={mark}>{mark}</MenuItem>);
    } else if (result.task.evaluationScale === EvaluationScaleEnum.Credit) {
      return creditMarks.map((mark) => <MenuItem value={mark.value} key={mark.value}>{mark.title}</MenuItem>);
    }
  }, [result]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(updateResult(updatedResult));
  };

  const handleChangeStudent = (event: any) => {
    setUpdatedResult((prevState) => ({ ...prevState, studentId: parseInt(event.target.value) }));
  };

  const handleChangeMark = (event: any) => {
    setUpdatedResult((prevState) => ({ ...prevState, mark: parseInt(event.target.value) }));
  };

  const handleChangeComment = (event: any) => {
    setUpdatedResult((prevState) => ({ ...prevState, comment: event.target.value }));
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
            value={updatedResult.studentId.toString()}
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
            value={updatedResult.mark.toString()}
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
          value={updatedResult.comment}
          onChange={handleChangeComment}
        />

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};
