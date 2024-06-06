import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../../core/hooks/redux';
import { UserRoleEnum } from '../../core/constants/UserRoleEnum';
import { useMemo } from 'react';
import {
  ADMINS_PAGE_ITEM,
  DISCIPLINES_PAGE_ITEM,
  GROUPS_PAGE_ITEM,
  SPECIALIZATIONS_PAGE_ITEM,
  STUDENTS_PAGE_ITEM,
  TEACHERS_PAGE_ITEM
} from '../../core/constants/NavbarItems';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../core/reducers/userReducer';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';
import { MenuItemProps } from '../../molecules/MenuItem/types';
import { Navbar } from '../../molecules/Navbar';

const adminPages = [
  ADMINS_PAGE_ITEM,
  TEACHERS_PAGE_ITEM,
  SPECIALIZATIONS_PAGE_ITEM,
  GROUPS_PAGE_ITEM,
  STUDENTS_PAGE_ITEM,
  DISCIPLINES_PAGE_ITEM
];

const teacherPages = [
  TEACHERS_PAGE_ITEM,
  SPECIALIZATIONS_PAGE_ITEM,
  GROUPS_PAGE_ITEM,
  STUDENTS_PAGE_ITEM,
  DISCIPLINES_PAGE_ITEM
];

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const getHandleOpenPage = (link: string) => () => {
    navigate(link);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const userMenuItems: MenuItemProps[] = useMemo(() => [{ text: 'Logout', onClick: handleLogout }], [handleLogout]);
  const navbarMenuItems: MenuItemProps[] = useMemo(() => pages.map((page) => ({ text: page.title, onClick: getHandleOpenPage(page.link) })), [handleLogout]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Navbar menuItems={navbarMenuItems} />
          <UserMenu menuItems={userMenuItems}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
