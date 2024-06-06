import React from 'react';
import { MenuItem as MUIMenuItem, Typography } from '@mui/material';
import { MenuItemProps } from './types';

export const MenuItem = ({ text, onClick }: MenuItemProps) => (
  <MUIMenuItem key={text}>
    <Typography textAlign="center" onClick={onClick}>
      {text}
    </Typography>
  </MUIMenuItem>
);
