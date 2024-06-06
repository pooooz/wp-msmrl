import React from 'react';
import { Button } from '@mui/material';
import { ButtonProps } from './types';

export const SubmintButton = ({ children }: ButtonProps) => (
  <Button type="submit" variant="contained">
    {children}
  </Button>
);
