import express, { Request, Response } from 'express';
import { Teacher } from '../../entities/Teacher';
import { User, UserRoleEnum } from '../../entities/User';
import bcrypt from 'bcrypt';
import { accessVerification } from '../../functions/accessVerification';
import { checkPasswordLength } from '../../functions/checkPasswordLength';
import { DisciplineTeacher } from '../../entities/DisciplineTeacher';
import { Task } from '../../entities/Task';
import { ResponseMessagesEnum } from '../../constants/responseMessages';

const TEACHER_NOT_FOUND_MESSAGE = ResponseMessagesEnum.TEACHER_NOT_FOUND;
const INSUFFICIENT_DATA_MESSAGE = ResponseMessagesEnum.INSUFFICIENT_DATA;
const INSUFFICIENT_PARAMS = ResponseMessagesEnum.TEACHER_INSUFFICIENT_PARAMS;
const ALREADY_EXISTS_MESSAGE = ResponseMessagesEnum.TEACHER_ALREADY_EXISTS;
const CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_TASK =
  ResponseMessagesEnum.TEACHER_CANNOT_BE_DELETED_BECAUSE_OF_TASK;
const CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_DISCIPLINE_TEACHER =
  ResponseMessagesEnum.TEACHER_CANNOT_BE_DELETED_BECAUSE_OF_DISCIPLINE_TEACHER;
const CREATED_MESSAGE = ResponseMessagesEnum.TEACHER_CREATED;
const UPDATED_MESSAGE = ResponseMessagesEnum.TEACHER_UPDATED;
const REMOVED_MESSAGE = ResponseMessagesEnum.TEACHER_REMOVED;

export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const teachers = await Teacher.find();
    return res.status(200).json({ teachers });
  } catch (err) {
    console.log('[teacherController getAll]', err);
    return;
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { teacherId } = req.params;

    // const teacher = await Teacher.createQueryBuilder('teacher')
    //   .leftJoinAndSelect('teacher.user', 'user')
    //   .select(['teacher', 'user.login'])
    //   .where('teacher.id = :id', { id: teacherId })
    //   .getOne();

    const teacher = await Teacher.findOne({
      where: { id: parseInt(teacherId) },
      relations: ['user'],
    });

    if (!teacher) {
      return res.status(400).json({ message: TEACHER_NOT_FOUND_MESSAGE });
    }

    return res.status(200).json({ teacher });
  } catch (err) {
    console.log('[teacherController getById]', err);
    return;
  }
};

export const createTeacher = async (req: Request, res: Response) => {
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
      role: UserRoleEnum.TEACHER,
    });

    await user.save();

    const teacher = Teacher.create({
      first_name,
      patronumic,
      last_name,
      user,
    });

    await teacher.save();

    return res.status(201).json({
      teacher,
      message: CREATED_MESSAGE,
    });
  } catch (err) {
    console.log('[teacherController create]', err);
    return;
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { teacherId } = req.params;

    if (!teacherId) {
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

    const teacher = await Teacher.findOne({
      where: { id: parseInt(teacherId) },
      relations: ['user'],
    });

    if (teacher) {
      Object.assign(teacher.user, { login });

      if (password) {
        Object.assign(teacher.user, { password });
      }

      await teacher.user.save();

      Object.assign(teacher, { first_name, patronumic, last_name });
      await teacher.save();
    } else {
      return res.status(400).json({ message: TEACHER_NOT_FOUND_MESSAGE });
    }
    return res.status(200).json({ teacher, message: UPDATED_MESSAGE });
  } catch (err) {
    console.log('[teacherController update]', err);
    return;
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const teacher = await Teacher.findOne({
      where: { id: parseInt(teacherId) },
      relations: ['user'],
    });

    if (!teacher) {
      return res.status(400).json({ message: TEACHER_NOT_FOUND_MESSAGE });
    }

    const discipline_teacher = await DisciplineTeacher.findOne({
      where: { teacher: { id: teacher.id } },
    });

    if (discipline_teacher) {
      return res
        .status(400)
        .json({ message: CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_DISCIPLINE_TEACHER });
    }

    const task = await Task.findOne({ where: { creator: { id: teacher.id } } });

    if (task) {
      return res.status(400).json({ message: CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_TASK });
    }

    await User.delete(teacher.user.id);

    return res.status(200).json({ message: REMOVED_MESSAGE });
  } catch (err) {
    console.log('[teacherController delete]', err);
    return;
  }
};
