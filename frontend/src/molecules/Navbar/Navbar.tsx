import { Box, IconButton, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { MenuItemProps } from '../MenuItem/types';
import { MenuItem } from '../MenuItem';

interface NavbarProps {
  menuItems: MenuItemProps[];
}

export const Navbar = ({ menuItems }: NavbarProps) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          {menuItems.map((menuItemProps) => {
            const handleMenuItemClick = () => {
              handleCloseNavMenu();
              menuItemProps.onClick();
            };
            return (
              <MenuItem key={menuItemProps.text} text={menuItemProps.text} onClick={handleMenuItemClick} />
            );
          })}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {menuItems.map((menuItemProps) => {
          const handleMenuItemClick = () => {
            handleCloseNavMenu();
            menuItemProps.onClick();
          };
          return (
              <MenuItem key={menuItemProps.text} text={menuItemProps.text} onClick={handleMenuItemClick} />
          );
        })}
      </Box>
    </>
  );
};
