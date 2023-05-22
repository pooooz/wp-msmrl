import express, { Request, Response } from 'express';
import { ResponseMessagesEnum } from '../../constants/responseMessages';
import { CurrentDiscipline } from '../../entities/CurrentDiscipline';
import { Discipline, DisciplineControlFormEnum } from '../../entities/Discipline';
import { UserRoleEnum } from '../../entities/User';
import { accessVerification } from '../../functions/accessVerification';

const DISCIPLINE_NOT_FOUND_MESSAGE = ResponseMessagesEnum.DISCIPLINE_NOT_FOUND;
const INSUFFICIENT_DATA_MESSAGE = ResponseMessagesEnum.INSUFFICIENT_DATA;
const ALREADY_EXISTS_MESSAGE = ResponseMessagesEnum.DISCIPLINE_ALREADY_EXISTS;
const INSUFFICIENT_PARAMS = ResponseMessagesEnum.DISCIPLINE_INSUFFICIENT_PARAMS;
const UNSUPPORTED_CONTROL_FORM = ResponseMessagesEnum.DISCIPLINE_UNSUPPORTED_CONTROL_FORM;
const CANNOT_BE_DELETED_MESSAGE =
  ResponseMessagesEnum.DISCIPLINE_CANNOT_BE_DELETED_BECAUSE_OF_CURRENT_DISCIPLINE;
const CREATED_MESSAGE = ResponseMessagesEnum.DISCIPLINE_CREATED;
const UPDATED_MESSAGE = ResponseMessagesEnum.DISCIPLINE_UPDATED;
const REMOVED_MESSAGE = ResponseMessagesEnum.DISCIPLINE_REMOVED;

export const getAllDisciplines = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const disciplines = await Discipline.find();

    return res.status(200).json({ disciplines });
  } catch (err) {
    console.log('[disciplineController getAll]', err);
    return;
  }
};

export const getDisciplineById = async (req: Request, res: Response) => {
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

    const discipline = await Discipline.findOne({
      where: { id: parseInt(disciplineId) },
    });

    if (!discipline) {
      return res.status(400).json({ message: DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    return res.status(200).json({ discipline });
  } catch (err) {
    console.log('[disciplineController getById]', err);
    return;
  }
};

export const createDiscipline = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { name, control_form } = req.body;

    if (!name || !control_form) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    if (!Object.values(DisciplineControlFormEnum).includes(control_form)) {
      return res.status(400).json({ message: UNSUPPORTED_CONTROL_FORM });
    }

    const candidat = await Discipline.findOne({ where: { name, control_form } });

    if (candidat) {
      return res.status(400).json({ message: ALREADY_EXISTS_MESSAGE });
    }

    const discipline = Discipline.create({ name, control_form });

    await discipline.save();

    return res.status(201).json({ discipline, message: CREATED_MESSAGE });
  } catch (err) {
    console.log('[disciplineController create]', err);
    return;
  }
};

export const updateDiscipline = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { disciplineId } = req.params;

    if (!disciplineId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const discipline = await Discipline.findOne({ where: { id: parseInt(disciplineId) } });

    if (!discipline) {
      return res.status(400).json({ massage: DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    const { name, control_form } = req.body;

    if (!name || !control_form) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    if (!Object.values(DisciplineControlFormEnum).includes(control_form)) {
      return res.status(400).json({ message: UNSUPPORTED_CONTROL_FORM });
    }

    Object.assign(discipline, { name, control_form });

    await discipline.save();

    return res.status(200).json({ discipline, message: UPDATED_MESSAGE });
  } catch (err) {
    console.log('[disciplineController update]', err);
    return;
  }
};

export const deleteDiscipline = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { disciplineId } = req.params;

    if (!disciplineId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const candidat = await Discipline.findOneBy({ id: parseInt(disciplineId) });

    if (!candidat) {
      return res.status(400).json({ message: DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    const current_discipline = await CurrentDiscipline.findOne({
      where: { discipline: { id: parseInt(disciplineId) } },
    });

    if (current_discipline) {
      return res.status(400).json({ message: CANNOT_BE_DELETED_MESSAGE });
    }

    await Discipline.delete(parseInt(disciplineId));

    return res.status(200).json({ message: REMOVED_MESSAGE });
  } catch (err) {
    console.log('[disciplineController delete]', err);
    return;
  }
};
