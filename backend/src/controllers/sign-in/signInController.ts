import express, { Request, Response } from 'express';
import { Admin } from '../../entities/Admin';
import { Teacher } from '../../entities/Teacher';
import { User, UserRoleEnum } from '../../entities/User';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { accessVerification } from '../../functions/accessVerification';
import { ResponseMessagesEnum } from '../../constants/responseMessages';
import { JWT_SECRET } from '../../constants';

const NOT_FOUND_MESSAGE = ResponseMessagesEnum.SIGN_IN_NOT_FOUND;
const INSUFFICIENT_DATA_MESSAGE = ResponseMessagesEnum.INSUFFICIENT_DATA;
const INVALID_LOGIN_OR_PASSWORD = ResponseMessagesEnum.SIGN_IN_INVALID_LOGIN_OR_PASSWORD;
const UNKNOW_USER_ROLE = ResponseMessagesEnum.SIGN_IN_UNKNOW_USER_ROLE;
const DONT_HAVE_ACCESS = ResponseMessagesEnum.DONT_HAVE_ACCESS;

const generateAccessToken = (role: UserRoleEnum, user: any) => {
  try {
    const payload = {
      role,
      user,
    };

    return jwt.sign(payload, JWT_SECRET || '', { expiresIn: '7d' });
  } catch (err) {
    console.log('[signInController generateAccessToken]', err);
    return;
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const user = await User.findOneBy({ login });

    if (!user) {
      return res.status(400).json({ message: NOT_FOUND_MESSAGE });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: INVALID_LOGIN_OR_PASSWORD });
    }

    if (user.role === UserRoleEnum.ADMIN) {
      const admin = await Admin.findOneBy({ user: { id: user.id } });

      if (!admin) {
        return res.status(400).json({ message: NOT_FOUND_MESSAGE });
      }

      const token = generateAccessToken(user.role, admin);

      return res.status(200).json({ token });
    } else if (user.role === UserRoleEnum.TEACHER) {
      const teacher = await Teacher.findOneBy({ user: { id: user.id } });

      if (!teacher) {
        return res.status(400).json({ message: NOT_FOUND_MESSAGE });
      }

      const token = generateAccessToken(user.role, teacher);

      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: UNKNOW_USER_ROLE });
    }
  } catch (err) {
    console.log('[signInController signIn]', err);
    return;
  }
};

export const updateToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);

    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const payload = <JwtPayload>jwt.decode(token || '');

    switch (payload.role) {
      case UserRoleEnum.ADMIN:
        const current_admin = await Admin.findOne({ where: { id: payload.id } });
        if (!current_admin) {
          return res.status(400).json({ message: DONT_HAVE_ACCESS });
        }
        break;
      case UserRoleEnum.TEACHER:
        const current_teacher = await Teacher.findOne({ where: { id: payload.id } });
        if (!current_teacher) {
          return res.status(400).json({ message: DONT_HAVE_ACCESS });
        }
        break;
      default:
        return res.status(400).json({ message: DONT_HAVE_ACCESS });
    }

    const newToken = generateAccessToken(payload.role, payload.user);

    return res.status(200).json({ token: newToken });
  } catch (err) {
    console.log(['signInController updateToken', err]);
    return;
  }
};
