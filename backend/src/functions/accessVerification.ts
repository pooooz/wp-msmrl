import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { ResponseMessagesEnum } from '../constants/responseMessages';
import { UserRoleEnum } from '../entities/User';
import { JWT_SECRET } from '../constants';

const DONT_HAVE_ACCESS = ResponseMessagesEnum.DONT_HAVE_ACCESS;

export const accessVerification = (token = '', requiredRoles: Array<UserRoleEnum>) => {
  try {
    if (!token) {
      return DONT_HAVE_ACCESS;
    }

    const { role } = <JwtPayload>jwt.verify(token, JWT_SECRET || '');

    if (requiredRoles.includes(role)) {
      return;
    } else {
      return DONT_HAVE_ACCESS;
    }
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return err.message;
    }
    return DONT_HAVE_ACCESS;
  }
};
