import React, { useMemo, useState } from 'react';
import { useAppDispatch } from '../../../core/hooks/redux';
import { createTeacher } from '../../../core/reducers/teacherReducer';
import { TextFieldForm } from '../../../organisms/TextFieldForm';
import { TextFieldGroupProps } from '../../../molecules/TextFieldGroup';
import { fieldLabels } from '../constants';

export const AddTeacherPage = () => {
  const dispatch = useAppDispatch();

  const [teacher, setTeacher] = useState({
    firstName: '',
    patronymic: '',
    lastName: '',
    login: '',
    password: ''
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createTeacher(teacher));
  };

  const handleChange = (event: any) => {
    setTeacher((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const fields: TextFieldGroupProps['fields'] = useMemo(() => {
    return Object.keys(teacher).reduce((acc, key) => {
      const required = key !== 'patronymic';
      return {
        ...acc,
        [key]: {
          required,
          id: key,
          name: key,
          value: teacher[key as keyof typeof teacher],
          onChange: handleChange,
          label: fieldLabels[key as keyof typeof fieldLabels],
          margin: 'normal'
        }
      }; ;
    }, {});
  }, [teacher]);

  return (
      <TextFieldForm fields={fields} onSubmit={handleSubmit} buttonText="Add"/>
  );
};
