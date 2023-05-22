import express, { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ResponseMessagesEnum } from '../../constants/responseMessages';
import { CurrentDiscipline } from '../../entities/CurrentDiscipline';
import { DisciplineControlFormEnum } from '../../entities/Discipline';
import { Task, TaskEvaluationScaleEnum } from '../../entities/Task';
import { Teacher } from '../../entities/Teacher';
import { UserRoleEnum } from '../../entities/User';
import { accessVerification } from '../../functions/accessVerification';
import { JWT_SECRET } from '../../constants';

const TASK_NOT_FOUND_MESSAGE = ResponseMessagesEnum.TASK_NOT_FOUND;
const CURRENT_DISCIPLINE_NOT_FOUND_MESSAGE = ResponseMessagesEnum.CURRENT_DISCIPLINE_NOT_FOUND;
const TEACHER_NOT_FOUND_MESSAGE = ResponseMessagesEnum.TEACHER_NOT_FOUND;
const ALREADY_EXISTS_MESSAGE = ResponseMessagesEnum.TASK_ALREADY_EXISTS;
const INSUFFICIENT_DATA_MESSAGE = ResponseMessagesEnum.INSUFFICIENT_DATA;
const INSUFFICIENT_PARAMS = ResponseMessagesEnum.TASK_INSUFFICIENT_PARAMS;
const NO_CHANGE_RIGHTS_MESSAGE = ResponseMessagesEnum.TASK_NO_CHANGE_RIGHTS;
const NO_DELETION_RIGHTS_MESSAGE = ResponseMessagesEnum.TASK_NO_DELETION_RIGHTS;
const CREATED_MESSAGE = ResponseMessagesEnum.TASK_CREATED;
const UPDATED_MESSAGE = ResponseMessagesEnum.TASK_UPDATED;
const REMOVED_MESSAGE = ResponseMessagesEnum.TASK_REMOVED;

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const tasks = await Task.find();

    return res.status(200).json({ tasks });
  } catch (err) {
    console.log('taskController getAll', err);
    return;
  }
};

export const getTaskById = async (req: Request, res: Response) => {
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

    const task = await Task.findOne({ where: { id: parseInt(taskId) } });

    if (!task) {
      return res.status(400).json({ message: TASK_NOT_FOUND_MESSAGE });
    }

    return res.status(200).json({ task });
  } catch (err) {
    console.log('taskController getById', err);
    return;
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.TEACHER]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { user } = <JwtPayload>jwt.verify(token || '', JWT_SECRET || '');

    const { name, currentDisciplineId, mandatory } = req.body;

    if (!name || !currentDisciplineId || mandatory === undefined) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const currentDiscipline = await CurrentDiscipline.findOne({
      where: {
        id: parseInt(currentDisciplineId),
      },
      relations: ['discipline'],
    });

    if (!currentDiscipline) {
      return res.status(400).json({ message: CURRENT_DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    const teacher = await Teacher.findOneBy({ id: parseInt(user.id) });

    if (!teacher) {
      return res.status(400).json({ message: TEACHER_NOT_FOUND_MESSAGE });
    }

    let evaluation_scale;

    if (
      currentDiscipline.discipline.control_form === DisciplineControlFormEnum.EXAM ||
      currentDiscipline.discipline.control_form === DisciplineControlFormEnum.DIFFERENTIATED_CREDIT
    ) {
      evaluation_scale = TaskEvaluationScaleEnum.TEN_POINT;
    } else if (currentDiscipline.discipline.control_form === DisciplineControlFormEnum.CREDIT) {
      evaluation_scale = TaskEvaluationScaleEnum.CREDIT;
    } else {
      evaluation_scale = TaskEvaluationScaleEnum.TEN_POINT;
    }

    const candidate = await Task.findOne({
      where: {
        name,
        current_discipline: { id: currentDiscipline.id },
        creator: { id: teacher.id },
        evaluation_scale,
        mandatory,
      },
    });

    if (candidate) {
      return res.status(400).json({ message: ALREADY_EXISTS_MESSAGE });
    }

    const task = Task.create({
      name,
      current_discipline: currentDiscipline,
      creator: teacher,
      evaluation_scale,
      mandatory,
    });

    await task.save();

    return res.status(201).json({ task, message: CREATED_MESSAGE });
  } catch (err) {
    console.log('[taskController create]', err);
    return;
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.TEACHER]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const task = await Task.findOne({ where: { id: parseInt(taskId) }, relations: ['creator'] });

    if (!task) {
      return res.status(400).json({ message: TASK_NOT_FOUND_MESSAGE });
    }

    const { user } = <JwtPayload>jwt.verify(token || '', JWT_SECRET || '');

    const { name, mandatory } = req.body;

    if (!name || mandatory === undefined) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const teacher = await Teacher.findOneBy({ id: parseInt(user.id) });

    if (!teacher) {
      return res.status(400).json({ message: TEACHER_NOT_FOUND_MESSAGE });
    }

    if (task.creator.id !== teacher.id) {
      return res.status(400).json({ message: NO_CHANGE_RIGHTS_MESSAGE });
    }

    Object.assign(task, { name, mandatory });

    await task.save();

    return res.status(200).json({ task, message: UPDATED_MESSAGE });
  } catch (err) {
    console.log('[taskController update]', err);
    return;
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.TEACHER]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const task = await Task.findOne({ where: { id: parseInt(taskId) }, relations: ['creator'] });

    if (!task) {
      return res.status(400).json({ message: TASK_NOT_FOUND_MESSAGE });
    }

    const { user } = <JwtPayload>jwt.verify(token || '', JWT_SECRET || '');

    if (task.creator.id !== user.id) {
      return res.status(400).json({ message: NO_DELETION_RIGHTS_MESSAGE });
    }

    await Task.delete(task.id);

    return res.status(200).json({ message: REMOVED_MESSAGE });
  } catch (err) {
    console.log('taskController delete', err);
    return;
  }
};
