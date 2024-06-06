import { TextField, TextFieldProps } from '@mui/material';
import React, { useMemo } from 'react';

export interface TextFieldGroupProps {
  fields: Record<string, TextFieldProps>;
}

export const TextFieldGroup = (props: TextFieldGroupProps) => {
  const fieldKeys = useMemo(() => Object.keys(props.fields), [props]);
  return (
    <>
      {fieldKeys.length && fieldKeys.map((key) => (
        <TextField
            key={key}
            {...props.fields[key]}
          />
      ))}
    </>
  );
};
