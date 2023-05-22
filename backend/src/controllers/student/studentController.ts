import express, { Request, Response } from 'express';
import { ResponseMessagesEnum } from '../../constants/responseMessages';
import { Group } from '../../entities/Group';
import { Result } from '../../entities/Result';
import { Student } from '../../entities/Student';
import { Task } from '../../entities/Task';
import { UserRoleEnum } from '../../entities/User';
import { accessVerification } from '../../functions/accessVerification';

const STUDENT_NOT_FOUND_MESSAGE = ResponseMessagesEnum.STUDENT_NOT_FOUND;
const TASK_NOT_FOUND_MESSAGE = ResponseMessagesEnum.TASK_NOT_FOUND;
const GROUP_NOT_FOUND_MESSAGE = ResponseMessagesEnum.GROUP_NOT_FOUND;
const INSUFFICIENT_DATA_MESSAGE = ResponseMessagesEnum.INSUFFICIENT_DATA;
const INSUFFICIENT_PARAMS = ResponseMessagesEnum.STUDENT_INSUFFICIENT_PARAMS;
const INSUFFICIENT_PARAMS_TASK = ResponseMessagesEnum.TASK_INSUFFICIENT_PARAMS;
const CANNOT_BE_DELETED_MESSAGE = ResponseMessagesEnum.STUDENT_CANNOT_BE_DELETED_BECAUSE_OF_TASK;
const CREATED_MESSAGE = ResponseMessagesEnum.STUDENT_CREATED;
const UPDATED_MESSAGE = ResponseMessagesEnum.STUDENT_UPDATED;
const REMOVED_MESSAGE = ResponseMessagesEnum.STUDENT_REMOVED;

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const students = await Student.find();

    return res.status(200).json({ students });
  } catch (err) {
    console.log('[studentController getAll]', err);
    return;
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { studentId } = req.params;

    const student = await Student.findOne({
      where: { id: parseInt(studentId) },
      relations: ['group', 'group.specialization'],
    });

    if (!student) {
      return res.status(400).json({ message: STUDENT_NOT_FOUND_MESSAGE });
    }

    return res.status(200).json({ student });
  } catch (err) {
    console.log('[studentController getById]', err);
    return;
  }
};

export const getStudentsByTaskId = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS_TASK });
    }

    const task = await Task.findOne({ where: { id: parseInt(taskId) } });

    if (!task) {
      return res.status(400).json({ message: TASK_NOT_FOUND_MESSAGE });
    }

    const students = await Student.find({
      where: { group: { current_disciplines: { tasks: { id: parseInt(taskId) } } } },
    });

    return res.status(200).json({ students });
  } catch (err) {
    console.log('[ctudentController getStudentsByTaskId]', err);
    return;
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { first_name, patronumic, last_name, groupId } = req.body;

    if (!first_name || !last_name || !groupId) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const group = await Group.findOneBy({ id: parseInt(groupId) });

    if (!group) {
      return res.status(400).json({ message: GROUP_NOT_FOUND_MESSAGE });
    }

    const student = Student.create({
      first_name,
      patronumic,
      last_name,
      group,
    });

    await student.save();

    return res.status(201).json({ student, message: CREATED_MESSAGE });
  } catch (err) {
    console.log('[studentController create]', err);
    return;
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const { first_name, patronumic, last_name, groupId } = req.body;

    if (!first_name || !last_name || !groupId) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const group = await Group.findOneBy({ id: parseInt(groupId) });

    if (!group) {
      return res.status(400).json({ message: GROUP_NOT_FOUND_MESSAGE });
    }

    const student = await Student.findOne({ where: { id: parseInt(studentId) } });

    if (!student) {
      return res.status(400).json({ message: STUDENT_NOT_FOUND_MESSAGE });
    }

    Object.assign(student, { first_name, patronumic, last_name, group });

    await student.save();

    return res.status(200).json({ student, message: UPDATED_MESSAGE });
  } catch (err) {
    console.log('[studentController update]', err);
    return;
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const student = await Student.findOneBy({ id: parseInt(studentId) });

    if (!student) {
      return res.status(400).json({ message: STUDENT_NOT_FOUND_MESSAGE });
    }

    const result = await Result.findOne({ where: { student: { id: student.id } } });

    if (result) {
      return res.status(400).json({ message: CANNOT_BE_DELETED_MESSAGE });
    }

    await Student.delete(parseInt(studentId));

    return res.status(200).json({ mesage: REMOVED_MESSAGE });
  } catch (err) {
    console.log('[studentController delete]', err);
    return;
  }
};
