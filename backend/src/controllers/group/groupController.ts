import express, { Request, Response } from 'express';
import { ResponseMessagesEnum } from '../../constants/responseMessages';
import { CurrentDiscipline } from '../../entities/CurrentDiscipline';
import { Group } from '../../entities/Group';
import { Specialization } from '../../entities/Specialization';
import { Student } from '../../entities/Student';
import { UserRoleEnum } from '../../entities/User';
import { accessVerification } from '../../functions/accessVerification';

const GROUP_NOT_FOUND_MESSAGE = ResponseMessagesEnum.GROUP_NOT_FOUND;
const SPECIALIZATION_NOT_FOUND_MESSAGE = ResponseMessagesEnum.SPECIALIZATION_NOT_FOUND;
const INSUFFICIENT_DATA_MESSAGE = ResponseMessagesEnum.INSUFFICIENT_DATA;
const INSUFFICIENT_PARAMS = ResponseMessagesEnum.GROUP_INSUFFICIENT_PARAMS;
const ALREADY_EXISTS_MESSAGE = ResponseMessagesEnum.GROUP_ALREADY_EXISTS;
const CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_STUDENT =
  ResponseMessagesEnum.GROUP_CANNOT_BE_DELETED_BECAUSE_OF_STUDENT;
const CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_CURRENT_DISCIPLINE =
  ResponseMessagesEnum.GROUP_CANNOT_BE_DELETED_BECAUSE_OF_CURRENT_DISCIPLINE;
const CREATED_MESSAGE = ResponseMessagesEnum.GROUP_CREATED;
const UPDATED_MESSAGE = ResponseMessagesEnum.GROUP_UPDATED;
const REMOVED_MESSAGE = ResponseMessagesEnum.GROUP_REMOVED;

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const groups = await Group.find({ relations: ['specialization'] });

    return res.status(200).json({ groups });
  } catch (err) {
    console.log('[groupController getAll]', err);
    return;
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { groupId } = req.params;

    const group = await Group.findOne({
      where: { id: parseInt(groupId) },
      relations: ['students', 'specialization'],
    });

    if (!group) {
      return res.status(400).json({ message: GROUP_NOT_FOUND_MESSAGE });
    }

    return res.status(200).json({ group });
  } catch (err) {
    console.log('[groupController getById]', err);
    return;
  }
};

export const createGroup = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { name, course, specializationId } = req.body;

    if (!name || !course || !specializationId) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const candidat = await Group.findOneBy({ name });

    if (candidat) {
      return res.status(400).json({ message: ALREADY_EXISTS_MESSAGE });
    }

    const specialization = await Specialization.findOneBy({ id: parseInt(specializationId) });

    if (!specialization) {
      return res.status(400).json({ message: SPECIALIZATION_NOT_FOUND_MESSAGE });
    }

    const group = Group.create({
      name,
      course,
      specialization,
    });

    await group.save();

    return res.status(201).json({ group, message: CREATED_MESSAGE });
  } catch (err) {
    console.log('[groupController create]', err);
    return;
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const group = await Group.findOne({
      where: { id: parseInt(groupId) },
      relations: ['specialization'],
    });

    if (!group) {
      return res.status(400).json({ massage: GROUP_NOT_FOUND_MESSAGE });
    }

    const { name, course, specializationId } = req.body;

    if (!name || !course || !specializationId) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const specialization = await Specialization.findOneBy({ id: parseInt(specializationId) });

    if (!specialization) {
      return res.status(400).json({ message: SPECIALIZATION_NOT_FOUND_MESSAGE });
    }

    group.specialization = specialization;

    Object.assign(group, { name, course });

    await group.save();

    return res.status(200).json({ group, message: UPDATED_MESSAGE });
  } catch (err) {
    console.log('[groupController update]', err);
    return;
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const candidat = await Group.findOneBy({ id: parseInt(groupId) });

    if (!candidat) {
      return res.status(400).json({ message: GROUP_NOT_FOUND_MESSAGE });
    }

    const student = await Student.findOne({ where: { group: { id: parseInt(groupId) } } });

    if (student) {
      return res.status(400).json({ message: CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_STUDENT });
    }

    const current_discipline = await CurrentDiscipline.findOne({
      where: { group: { id: parseInt(groupId) } },
    });

    if (current_discipline) {
      return res
        .status(400)
        .json({ message: CANNOT_BE_DELETED_MESSAGE_BECAUSE_OF_CURRENT_DISCIPLINE });
    }

    await Group.delete(parseInt(groupId));

    return res.status(200).json({ message: REMOVED_MESSAGE });
  } catch (err) {
    console.log('[groupController delete]', err);
    return;
  }
};
