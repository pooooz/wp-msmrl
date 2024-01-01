import { LocalStorageItemsEnum } from '../constants/LocalStorageItemsEnum';
import { UserRoleEnum } from '../constants/UserRoleEnum';

export const checkPermissions = (requiredRoles: UserRoleEnum[]) => {
  const role: UserRoleEnum = localStorage.getItem(LocalStorageItemsEnum.Role) as UserRoleEnum;

  if (requiredRoles.includes(role)) {
    return true;
  } else {
    return false;
  }
};
