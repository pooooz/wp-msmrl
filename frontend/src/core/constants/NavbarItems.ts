import {
  ADMINS_ROUTE,
  DISCIPLINES_ROUTE,
  GROUPS_ROUTE,
  SPECIALIZATIONS_ROUTE,
  STUDENTS_ROUTE,
  TEACHERS_ROUTE
} from '../../pages/AppRoutes';
import { NavbarItem } from '../interfaces/NavbarItem';

export const ADMINS_PAGE_ITEM: NavbarItem = { title: 'Admins', link: ADMINS_ROUTE };
export const TEACHERS_PAGE_ITEM: NavbarItem = { title: 'Teachers', link: TEACHERS_ROUTE };
export const SPECIALIZATIONS_PAGE_ITEM: NavbarItem = {
  title: 'Specilizations',
  link: SPECIALIZATIONS_ROUTE
};
export const GROUPS_PAGE_ITEM: NavbarItem = { title: 'Groups', link: GROUPS_ROUTE };
export const STUDENTS_PAGE_ITEM: NavbarItem = { title: 'Students', link: STUDENTS_ROUTE };
export const DISCIPLINES_PAGE_ITEM: NavbarItem = { title: 'Disciplines', link: DISCIPLINES_ROUTE };
