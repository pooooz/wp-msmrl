import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { UserRoleEnum } from '../../constants/UserRoleEnum';
import { useMemo } from 'react';
import {
  ADMINS_PAGE_ITEM,
  DISCIPLINES_PAGE_ITEM,
  GROUPS_PAGE_ITEM,
  SPECIALIZATIONS_PAGE_ITEM,
  STUDENTS_PAGE_ITEM,
  TEACHERS_PAGE_ITEM
} from '../../constants/NavbarItems';
import { NavbarItems } from '../../interfaces/NavbarItem';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../reducers/userReducer';

const settings = ['Logout'];

const adminPages: NavbarItems = [
  ADMINS_PAGE_ITEM,
  TEACHERS_PAGE_ITEM,
  SPECIALIZATIONS_PAGE_ITEM,
  GROUPS_PAGE_ITEM,
  STUDENTS_PAGE_ITEM,
  DISCIPLINES_PAGE_ITEM
];

const teacherPages: NavbarItems = [
  TEACHERS_PAGE_ITEM,
  SPECIALIZATIONS_PAGE_ITEM,
  GROUPS_PAGE_ITEM,
  STUDENTS_PAGE_ITEM,
  DISCIPLINES_PAGE_ITEM
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const role = useAppSelector((state) => state.user.role);

  const pages = useMemo(() => {
    if (role === UserRoleEnum.Admin) {
      return adminPages;
    } else if (role === UserRoleEnum.Teacher) {
      return teacherPages;
    } else {
      return [];
    }
  }, [role]);

  const handleOpenPage = (link: string) => {
    navigate(link);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={() => { handleOpenPage(page.link); }}>
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => {
                  handleCloseNavMenu();
                  handleOpenPage(page.link);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogout}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
