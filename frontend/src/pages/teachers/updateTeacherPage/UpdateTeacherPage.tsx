import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/redux';
import { getTeacherById, updateTeacher } from '../../../core/reducers/teacherReducer';
import { TextFieldGroupProps } from '../../../molecules/TextFieldGroup';
import { fieldLabels } from '../constants';
import { TextFieldForm } from '../../../organisms/TextFieldForm';

export const UpdateTeacherPage = () => {
  const dispatch = useAppDispatch();

  const { teacherId } = useParams();

  useEffect(() => {
    dispatch(getTeacherById(teacherId));
  }, []);

  const { teacher, isLoading } = useAppSelector((state) => state.teacher);

  const [updatedTeacher, setUpdatedTeacher] = useState({
    id: 0,
    firstName: '',
    patronymic: '',
    lastName: '',
    login: '',
    password: ''
  });

  useEffect(() => {
    if (!isLoading) {
      setUpdatedTeacher((prevState) => ({
        ...prevState,
        id: teacher.id,
        firstName: teacher.firstName,
        patronymic: teacher.patronymic,
        lastName: teacher.lastName,
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

  const fields: TextFieldGroupProps['fields'] = useMemo(() => {
    return Object.keys(updatedTeacher).reduce((acc, key) => {
      const required = key !== 'patronymic';
      return {
        ...acc,
        [key]: {
          required,
          id: key,
          name: key,
          value: updatedTeacher[key as keyof typeof updatedTeacher],
          onChange: handleChange,
          label: fieldLabels[key as keyof typeof fieldLabels],
          margin: 'normal'
        }
      }; ;
    }, {});
  }, [teacher, updatedTeacher]);

  return (
    <TextFieldForm fields={fields} onSubmit={handleSubmit} buttonText="Update"/>
  );
};
