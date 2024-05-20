import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../contracts';

export const USER_ROLE_KEY = 'userRole';
export const RequiredUserRoles = (...roles: Array<UserRole>) =>
  SetMetadata(USER_ROLE_KEY, roles);
