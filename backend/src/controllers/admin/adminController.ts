import express, { Request, Response } from 'express';
import { Admin } from '../../entities/Admin';
import { User, UserRoleEnum } from '../../entities/User';
import bcrypt from 'bcrypt';
import { accessVerification } from '../../functions/accessVerification';
import { checkPasswordLength } from '../../functions/checkPasswordLength';
import { ResponseMessagesEnum } from '../../constants/responseMessages';

const NOT_FOUND_MESSAGE = ResponseMessagesEnum.ADMIN_NOT_FOUND;
const INSUFFICIENT_DATA_MESSAGE = ResponseMessagesEnum.INSUFFICIENT_DATA;
const INSUFFICIENT_PARAMS = ResponseMessagesEnum.ADMIN_INSUFFICIENT_PARAMS;
const ALREADY_EXISTS_MESSAGE = ResponseMessagesEnum.ADMIN_ALREADY_EXISTS;
const CREATED_MESSAGE = ResponseMessagesEnum.ADMIN_CREATED;
const UPDATED_MESSAGE = ResponseMessagesEnum.ADMIN_UPDATED;
const REMOVED_MESSAGE = ResponseMessagesEnum.ADMIN_REMOVED;

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);

    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const admins = await Admin.find();
    return res.status(200).json({ admins });
  } catch (err) {
    console.log('[adminController getAll]', err);
    return;
  }
};

export const getAdminById = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);

    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { adminId } = req.params;

    // const admin = await Admin.createQueryBuilder('admin')
    //   .leftJoinAndSelect('admin.user', 'user')
    //   .select(['admin', 'user.login'])
    //   .where('admin.id = :id', { id: adminId })
    //   .getOne();

    const admin = await Admin.findOne({ where: { id: parseInt(adminId) }, relations: ['user'] });

    if (!admin) {
      return res.status(400).json({ message: NOT_FOUND_MESSAGE });
    }

    return res.status(200).json({ admin });
  } catch (err) {
    console.log('[adminController getById]', err);
    return;
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { login, password, first_name, patronumic, last_name } = req.body;

    if (!login || !password || !first_name || !last_name) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const checkPasswordLengthErrorMessage = checkPasswordLength(password);

    if (checkPasswordLengthErrorMessage) {
      return res.status(400).json({ message: checkPasswordLengthErrorMessage });
    }

    const candidate = await User.findOneBy({ login });

    if (candidate) {
      return res.status(400).json({ message: ALREADY_EXISTS_MESSAGE });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = User.create({
      login,
      password: hashPassword,
      role: UserRoleEnum.ADMIN,
    });

    await user.save();

    const admin = Admin.create({
      first_name,
      patronumic,
      last_name,
      user,
    });

    await admin.save();

    return res.status(201).json({
      admin,
      message: CREATED_MESSAGE,
    });
  } catch (err) {
    console.log('[adminController create]', err);
    return;
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { adminId } = req.params;

    if (!adminId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const { login, password, first_name, last_name, patronumic = null } = req.body;

    if (!login || !first_name || !last_name) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    if (password) {
      const checkPasswordLengthErrorMessage = checkPasswordLength(password);

      if (checkPasswordLengthErrorMessage) {
        return res.status(400).json({ message: checkPasswordLengthErrorMessage });
      }
    }

    const admin = await Admin.findOne({
      where: { id: parseInt(adminId) },
      relations: ['user'],
    });

    if (admin) {
      Object.assign(admin.user, { login });
      if (password) {
        Object.assign(admin.user, { password });
      }
      await admin.user.save();

      Object.assign(admin, { first_name, patronumic, last_name });
      await admin.save();
    } else {
      return res.status(400).json({ message: NOT_FOUND_MESSAGE });
    }
    return res.status(200).json({ admin, message: UPDATED_MESSAGE });
  } catch (err) {
    console.log('[adminController update]', err);
    return;
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { adminId } = req.params;

    if (!adminId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const admin = await Admin.findOne({ where: { id: parseInt(adminId) }, relations: ['user'] });

    if (!admin) {
      return res.status(400).json({ message: NOT_FOUND_MESSAGE });
    }

    await User.delete(admin.user.id);

    return res.status(200).json({ message: REMOVED_MESSAGE });
  } catch (err) {
    console.log('[adminController delete]', err);
    return;
  }
};
