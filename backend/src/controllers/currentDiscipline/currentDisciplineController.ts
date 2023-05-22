import express, { Request, Response } from 'express';
import { ResponseMessagesEnum } from '../../constants/responseMessages';
import { CurrentDiscipline } from '../../entities/CurrentDiscipline';
import { Discipline } from '../../entities/Discipline';
import { DisciplineTeacher } from '../../entities/DisciplineTeacher';
import { Group } from '../../entities/Group';
import { Task } from '../../entities/Task';
import { UserRoleEnum } from '../../entities/User';
import { accessVerification } from '../../functions/accessVerification';

const CURRENT_DISCIPLINE_NOT_FOUND_MESSAGE = ResponseMessagesEnum.CURRENT_DISCIPLINE_NOT_FOUND;
const INSUFFICIENT_DATA_MESSAGE = ResponseMessagesEnum.INSUFFICIENT_DATA;
const INSUFFICIENT_PARAMS = ResponseMessagesEnum.CURRENT_DISCIPLINE_INSUFFICIENT_PARAMS;
const INSUFFICIENT_PARAMS_DISCIPLINE = ResponseMessagesEnum.DISCIPLINE_INSUFFICIENT_PARAMS;
const DISCIPLINE_NOT_FOUND_MESSAGE = ResponseMessagesEnum.DISCIPLINE_NOT_FOUND;
const GROUP_NOT_FOUND_MESSAGE = ResponseMessagesEnum.GROUP_NOT_FOUND;
const CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_TASK =
  ResponseMessagesEnum.CURRENT_DISCIPLINE_CANNOT_BE_DELETED_BECAUSE_OF_TASK;
const CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_DISCIPLINE_TEACHER =
  ResponseMessagesEnum.CURRENT_DISCIPLINE_CANNOT_BE_DELETED_BECAUSE_OF_DISCIPLINE_TEACHER;
const CREATED_MESSAGE = ResponseMessagesEnum.CURRENT_DISCIPLINE_CREATED;
const UPDATED_MESSAGE = ResponseMessagesEnum.CURRENT_DISCIPLINE_UPDATED;
const REMOVED_MESSAGE = ResponseMessagesEnum.CURRENT_DISCIPLINE_REMOVED;

export const getAllCurrentDisciplines = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const currentDisciplines = await CurrentDiscipline.find({ relations: ['discipline', 'group'] });

    return res.status(200).json({ currentDisciplines });
  } catch (err) {
    console.log('[currentDisciplineController getAll]');
    return;
  }
};

export const getCurrentDisciplineById = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { currentDisciplineId } = req.params;

    const currentDiscipline = await CurrentDiscipline.findOne({
      where: { id: parseInt(currentDisciplineId) },
      relations: ['discipline', 'group', 'tasks'],
    });

    if (!currentDiscipline) {
      return res.status(400).json({ message: CURRENT_DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    return res.status(200).json({ current_discipline: currentDiscipline });
  } catch (err) {
    console.log('[currentDisciplineController getById]');
    return;
  }
};

export const getCurrentDisciplinesByDisciplineId = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { disciplineId } = req.params;

    if (!disciplineId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS_DISCIPLINE });
    }

    const year = req.query.year;

    if (year && typeof year === 'string') {
      const current_disciplines = await CurrentDiscipline.find({
        where: { discipline: { id: parseInt(disciplineId) }, year: parseInt(year) },
        relations: ['group', 'discipline_teachers.teacher'],
      });

      return res.status(200).json({ current_disciplines });
    } else {
      const current_disciplines = await CurrentDiscipline.find({
        where: { discipline: { id: parseInt(disciplineId) } },
        relations: ['group', 'discipline_teachers.teacher'],
      });

      return res.status(200).json({ current_disciplines });
    }
  } catch (err) {
    console.log('[currentDisciplineController getCurrentDisciplinesByDisciplineId]', err);
    return;
  }
};

export const createCurrentDiscipline = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { disciplineId, groupId, year } = req.body;

    if (!disciplineId || !groupId || !year) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const discipline = await Discipline.findOneBy({ id: parseInt(disciplineId) });

    if (!discipline) {
      return res.status(400).json({ message: DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    const group = await Group.findOneBy({ id: parseInt(groupId) });

    if (!group) {
      return res.status(400).json({ message: GROUP_NOT_FOUND_MESSAGE });
    }

    const currentDiscipline = CurrentDiscipline.create({ discipline, group, year });

    await currentDiscipline.save();

    return res.status(201).json({ currentDiscipline, message: CREATED_MESSAGE });
  } catch (err) {
    console.log('[currentDisciplineController create]');
    return;
  }
};

export const updateCurrentDiscipline = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { currentDisciplineId } = req.params;

    if (!currentDisciplineId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const currentDiscipline = await CurrentDiscipline.findOne({
      where: { id: parseInt(currentDisciplineId) },
    });

    if (!currentDiscipline) {
      return res.status(400).json({ message: CURRENT_DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    const { disciplineId, groupId, year } = req.body;

    if (!disciplineId || !groupId || !year) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const discipline = await Discipline.findOneBy({ id: parseInt(disciplineId) });

    if (!discipline) {
      return res.status(400).json({ message: DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    const group = await Group.findOneBy({ id: parseInt(groupId) });

    if (!group) {
      return res.status(400).json({ message: GROUP_NOT_FOUND_MESSAGE });
    }

    Object.assign(currentDiscipline, { discipline, group, year });

    await currentDiscipline.save();

    return res.status(200).json({ currentDiscipline, message: UPDATED_MESSAGE });
  } catch (err) {
    console.log('[currentDisciplineController update]');
    return;
  }
};

export const deleteCurrentDiscipline = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { currentDisciplineId } = req.params;

    if (!currentDisciplineId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const candidat = await CurrentDiscipline.findOneBy({ id: parseInt(currentDisciplineId) });

    if (!candidat) {
      return res.status(400).json({ message: CURRENT_DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    const task = await Task.findOne({
      where: { current_discipline: { id: parseInt(currentDisciplineId) } },
    });

    if (task) {
      return res.status(400).json({ message: CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_TASK });
    }

    const discipline_teacher = await DisciplineTeacher.findOne({
      where: { current_discipline: { id: parseInt(currentDisciplineId) } },
    });

    if (discipline_teacher) {
      return res
        .status(400)
        .json({ message: CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_DISCIPLINE_TEACHER });
    }

    await CurrentDiscipline.delete(parseInt(currentDisciplineId));

    return res.status(200).json({ message: REMOVED_MESSAGE });
  } catch (err) {
    console.log('[currentDisciplineController delete]');
    return;
  }
};
