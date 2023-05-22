import express, { Request, Response } from 'express';
import { ResponseMessagesEnum } from '../../constants/responseMessages';
import { Result } from '../../entities/Result';
import { Student } from '../../entities/Student';
import { Task } from '../../entities/Task';
import { UserRoleEnum } from '../../entities/User';
import { accessVerification } from '../../functions/accessVerification';

const RESULT_NOT_FOUND_MESSAGE = ResponseMessagesEnum.RESULT_NOT_FOUND;
const TASK_NOT_FOUND_MESSAGE = ResponseMessagesEnum.TASK_NOT_FOUND;
const STUDENT_NOT_FOUND_MESSAGE = ResponseMessagesEnum.STUDENT_NOT_FOUND;
const INSUFFICIENT_DATA_MESSAGE = ResponseMessagesEnum.INSUFFICIENT_DATA;
const INSUFFICIENT_PARAMS = ResponseMessagesEnum.RESULT_INSUFFICIENT_PARAMS;
const INSUFFICIENT_PARAMS_TASK = ResponseMessagesEnum.TASK_INSUFFICIENT_PARAMS;
const INSUFFICIENT_PARAMS_STUDENT = ResponseMessagesEnum.STUDENT_INSUFFICIENT_PARAMS;
const CREATED_MESSAGE = ResponseMessagesEnum.RESULT_CREATED;
const UPDATED_MESSAGE = ResponseMessagesEnum.RESULT_UPDATED;
const REMOVED_MESSAGE = ResponseMessagesEnum.RESULT_REMOVED;

export const getAllResults = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const results = await Result.find({ relations: ['student', 'task'] });

    return res.status(200).json({ results });
  } catch (err) {
    console.log('[resultController getAll]', err);
    return;
  }
};

export const getResultById = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { resultId } = req.params;

    const result = await Result.findOne({
      where: { id: parseInt(resultId) },
      relations: ['student', 'task'],
    });

    if (!result) {
      return res.status(400).json({ message: RESULT_NOT_FOUND_MESSAGE });
    }

    return res.status(200).json({ result });
  } catch (err) {
    console.log('[resultController getById]', err);
    return;
  }
};

export const getResultsByTaskId = async (req: Request, res: Response) => {
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

    const results = await Result.find({ where: { task: { id: task.id } }, relations: ['student'] });

    return res.status(200).json({ results });
  } catch (err) {
    console.log('[resultController getResultsByTaskId]', err);
    return;
  }
};

export const getResultsByStudentId = async (req: Request, res: Response) => {
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

    if (!studentId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS_STUDENT });
    }

    const student = await Student.findOne({ where: { id: parseInt(studentId) } });

    if (!student) {
      return res.status(400).json({ message: STUDENT_NOT_FOUND_MESSAGE });
    }

    const results = await Result.find({
      where: { student: { id: student.id } },
      relations: ['task.current_discipline.discipline'],
    });

    return res.status(200).json({ results });
  } catch (err) {
    console.log('[resultController getResultsByStudentId]');
    return;
  }
};

export const createResult = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.TEACHER]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { studentId, taskId, mark, comment } = req.body;

    if (!studentId || !taskId || !mark) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const student = await Student.findOne({ where: { id: parseInt(studentId) } });

    if (!student) {
      return res.status(400).json({ message: STUDENT_NOT_FOUND_MESSAGE });
    }

    const task = await Task.findOne({ where: { id: parseInt(taskId) } });

    if (!task) {
      return res.status(400).json({ message: TASK_NOT_FOUND_MESSAGE });
    }

    const result = Result.create({
      student,
      task,
      mark,
      comment,
      date: new Date(),
    });

    await result.save();

    return res.status(201).json({ result, message: CREATED_MESSAGE });
  } catch (err) {
    console.log('[resultController create]', err);
    return;
  }
};

export const updateResult = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.TEACHER]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { resultId } = req.params;

    if (!resultId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const result = await Result.findOne({ where: { id: parseInt(resultId) } });

    if (!result) {
      return res.status(400).json({ message: RESULT_NOT_FOUND_MESSAGE });
    }

    const { mark, comment } = req.body;

    if (!mark) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    Object.assign(result, { mark, comment, date: new Date() });

    await result.save();

    return res.status(200).json({ result, message: UPDATED_MESSAGE });
  } catch (err) {
    console.log('[resultController update]', err);
    return;
  }
};

export const deleteResult = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.TEACHER]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { resultId } = req.params;

    if (!resultId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const result = await Result.findOne({ where: { id: parseInt(resultId) } });

    if (!result) {
      return res.status(400).json({ message: RESULT_NOT_FOUND_MESSAGE });
    }

    await Result.delete(result.id);

    return res.status(200).json({ message: REMOVED_MESSAGE });
  } catch (err) {
    console.log('[resultController delete]', err);
    return;
  }
};
