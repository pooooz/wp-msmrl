import React from 'react';
import { Avatar, Box, IconButton, Menu, Tooltip } from '@mui/material';
import { MenuItemProps } from '../MenuItem/types';
import { MenuItem } from '../MenuItem';

interface UserMenuProps {
  menuItems: MenuItemProps[];
}

export const UserMenu = ({ menuItems }: UserMenuProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menuItems.map((menuItemProps) => {
          const handleMenuItemClick = () => {
            handleCloseUserMenu();
            menuItemProps.onClick();
          };
          return (
            <MenuItem key={menuItemProps.text} text={menuItemProps.text} onClick={handleMenuItemClick} />
          );
        })}
      </Menu>
    </Box>
  );
};
