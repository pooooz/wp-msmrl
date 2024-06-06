import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../core/hooks/redux';
import { createAdmin } from '../../../core/reducers/adminReducer';
import { TextFieldForm } from '../../../organisms/TextFieldForm';
import { TextFieldGroupProps } from '../../../molecules/TextFieldGroup';
import { fieldLabels } from '../../teachers/constants';

export const AddAdminPage = () => {
  const dispatch = useAppDispatch();

  const [admin, setAdmin] = useState({
    firstName: '',
    patronymic: '',
    lastName: '',
    login: '',
    password: ''
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createAdmin(admin));
  };

  const handleChange = (event: any) => {
    setAdmin((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const fields: TextFieldGroupProps['fields'] = Object.keys(admin).reduce((acc, key) => {
    const required = key !== 'patronymic';
    return {
      ...acc,
      [key]: {
        required,
        id: key,
        name: key,
        value: admin[key as keyof typeof admin],
        onChange: handleChange,
        label: fieldLabels[key as keyof typeof fieldLabels]
      }
    }; ;
  }, {});

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
        <TextFieldForm fields={fields} onSubmit={handleSubmit} buttonText="Add"/>
      </Box>
    </Box>
  );
};
