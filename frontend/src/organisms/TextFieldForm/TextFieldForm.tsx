import React from 'react';
import { TextFieldGroup, TextFieldGroupProps } from '../../molecules/TextFieldGroup';
import { Box, Button } from '@mui/material';

export interface TextFieldFormProps {
  fields: TextFieldGroupProps['fields'];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  buttonText: string;
}

export const TextFieldForm = ({ fields, onSubmit, buttonText }: TextFieldFormProps) => {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <TextFieldGroup fields={fields}/>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};
