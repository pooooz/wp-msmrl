import express, { Request, Response } from 'express';
import { ResponseMessagesEnum } from '../../constants/responseMessages';
import { Group } from '../../entities/Group';
import { Specialization } from '../../entities/Specialization';
import { UserRoleEnum } from '../../entities/User';
import { accessVerification } from '../../functions/accessVerification';

const NOT_FOUND_MESSAGE = ResponseMessagesEnum.SPECIALIZATION_NOT_FOUND;
const INSUFFICIENT_DATA_MESSAGE = ResponseMessagesEnum.INSUFFICIENT_DATA;
const INSUFFICIENT_PARAMS = ResponseMessagesEnum.SPECIALIZATION_INSUFFICIENT_PARAMS;
const ALREADY_EXISTS_MESSAGE = ResponseMessagesEnum.SPECIALIZATION_ALREADY_EXISTS;
const CANNOT_BE_DELETED_MESSAGE =
  ResponseMessagesEnum.SPECIALIZATION_CANNOT_BE_DELETED_BECAUSE_OF_GROUP;
const CREATED_MESSAGE = ResponseMessagesEnum.SPECIALIZATION_CREATED;
const UPDATED_MESSAGE = ResponseMessagesEnum.SPECIALIZATION_UPDATED;
const REMOVED_MESSAGE = ResponseMessagesEnum.SPECIALIZATION_REMOVED;

export const getAllSpecializations = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);

    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const specializations = await Specialization.find();

    return res.status(200).json({ specializations });
  } catch (err) {
    console.log('[specializationController getAll]', err);
    return;
  }
};

export const getSpecializationById = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);

    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { specializationId } = req.params;

    const specialization = await Specialization.findOne({
      where: { id: parseInt(specializationId) },
      relations: ['groups'],
    });

    if (!specialization) {
      return res.status(400).json({ message: NOT_FOUND_MESSAGE });
    }

    return res.status(200).json({ specialization });
  } catch (err) {
    console.log('[specializationController getById]', err);
    return;
  }
};

export const createSpecialization = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);

    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const candidat = await Specialization.findOneBy({ name });

    if (candidat) {
      return res.status(400).json({ message: ALREADY_EXISTS_MESSAGE });
    }

    const specialization = Specialization.create({
      name,
    });

    await specialization.save();

    return res.status(201).json({ specialization, message: CREATED_MESSAGE });
  } catch (err) {
    console.log('[specializationController create]', err);
    return;
  }
};

export const updateSpecialization = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);

    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { specializationId } = req.params;

    if (!specializationId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    const specialization = await Specialization.findOneBy({ id: parseInt(specializationId) });

    if (specialization) {
      Object.assign(specialization, { name });

      await specialization.save();
    } else {
      return res.status(400).json({ message: NOT_FOUND_MESSAGE });
    }

    return res.status(200).json({ specialization, message: UPDATED_MESSAGE });
  } catch (err) {
    console.log('[specializationController update]', err);
    return;
  }
};

export const deleteSpecialization = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);

    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { specializationId } = req.params;

    if (!specializationId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const specialization = await Specialization.findOneBy({ id: parseInt(specializationId) });

    if (!specialization) {
      return res.status(400).json({ message: NOT_FOUND_MESSAGE });
    }

    const group = await Group.findOne({ where: { specialization: { id: specialization.id } } });

    if (group) {
      return res.status(400).json({ message: CANNOT_BE_DELETED_MESSAGE });
    }

    await Specialization.delete(parseInt(specializationId));

    return res.status(200).json({ message: REMOVED_MESSAGE });
  } catch (err) {
    console.log('[specializationController delete]', err);
    return;
  }
};
