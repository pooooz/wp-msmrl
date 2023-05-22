import express, { Request, Response } from 'express';
import { ResponseMessagesEnum } from '../../constants/responseMessages';
import { CurrentDiscipline } from '../../entities/CurrentDiscipline';
import { DisciplineTeacher, FormOfConductingClasses } from '../../entities/DisciplineTeacher';
import { Teacher } from '../../entities/Teacher';
import { UserRoleEnum } from '../../entities/User';
import { accessVerification } from '../../functions/accessVerification';

const DISCIPLINE_TEACHER_NOT_FOUND_MESSAGE = ResponseMessagesEnum.DISCIPLINE_TEACHER_NOT_FOUND;
const DISCIPLINE_TEACHER_ALREADY_EXIST = ResponseMessagesEnum.DISCIPLINE_TEACHER_ALREADY_EXIST;
const INSUFFICIENT_DATA_MESSAGE = ResponseMessagesEnum.INSUFFICIENT_DATA;
const INSUFFICIENT_PARAMS = ResponseMessagesEnum.DISCIPLINE_TEACHER_INSUFFICIENT_PARAMS;
const INSUFFICIENT_PARAMS_TEACHER = ResponseMessagesEnum.TEACHER_INSUFFICIENT_PARAMS;
const INSUFFICIENT_PARAMS_CURRENT_DISCIPLINE =
  ResponseMessagesEnum.CURRENT_DISCIPLINE_INSUFFICIENT_PARAMS;
const UNSUPPORTED_FORM_OF_CONDUCTING_CLASSES =
  ResponseMessagesEnum.DISCIPLINE_TEACHER_UNSUPPORTED_FORM_OF_CONDUCTING_CLASSES;
const CURRENT_DISCIPLINE_NOT_FOUND_MESSAGE = ResponseMessagesEnum.CURRENT_DISCIPLINE_NOT_FOUND;
const TEACHER_NOT_FOUND_MESSAGE = ResponseMessagesEnum.TEACHER_NOT_FOUND;
const CREATED_MESSAGE = ResponseMessagesEnum.DISCIPLINE_TEACHER_CREATED;
const UPDATED_MESSAGE = ResponseMessagesEnum.DISCIPLINE_TEACHER_UPDATED;
const REMOVED_MESSAGE = ResponseMessagesEnum.DISCIPLINE_TEACHER_REMOVED;

export const getAllDisciplineTeachers = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const disciplineTeachers = await DisciplineTeacher.find({
      relations: ['current_discipline', 'teacher'],
    });

    return res.status(200).json({ disciplineTeachers });
  } catch (err) {
    console.log('[disciplineTeacherController getAll]', err);
    return;
  }
};

export const getDisciplineTeacherById = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [
      UserRoleEnum.ADMIN,
      UserRoleEnum.TEACHER,
    ]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { disciplineTeacherId } = req.params;

    const disciplineTeacher = await DisciplineTeacher.findOne({
      where: { id: parseInt(disciplineTeacherId) },
      relations: ['current_discipline', 'teacher'],
    });

    if (!disciplineTeacher) {
      return res.status(400).json({ message: DISCIPLINE_TEACHER_NOT_FOUND_MESSAGE });
    }

    return res.status(200).json({ disciplineTeacher });
  } catch (err) {
    console.log('[disciplineTeacherController getById]', err);
    return;
  }
};

export const getCurrentDisciplinesByTeacherId = async (req: Request, res: Response) => {
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

    if (!teacherId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS_TEACHER });
    }

    const teacher = await Teacher.findOne({ where: { id: parseInt(teacherId) } });

    if (!teacher) {
      return res.status(400).json({ message: TEACHER_NOT_FOUND_MESSAGE });
    }

    const disciplines_teacher = await DisciplineTeacher.find({
      where: {
        teacher: { id: teacher.id },
        current_discipline: { year: new Date().getFullYear() },
      },
      relations: ['current_discipline.discipline', 'current_discipline.group'],
    });

    return res.status(200).json({ disciplines_teacher });
  } catch (err) {
    console.log('[disciplineTeacherController getDisciplinesByTeacherId]', err);
    return;
  }
};

export const getTeachersByCurrentDisciplineId = async (req: Request, res: Response) => {
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

    if (!currentDisciplineId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS_CURRENT_DISCIPLINE });
    }

    const current_discipline = await CurrentDiscipline.findOne({
      where: { id: parseInt(currentDisciplineId) },
    });

    if (!current_discipline) {
      return res.status(400).json({ message: CURRENT_DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    const discipline_teachers = await DisciplineTeacher.find({
      where: { current_discipline: { id: current_discipline.id } },
      relations: ['teacher'],
    });

    return res.status(200).json({ discipline_teachers });
  } catch (err) {
    console.log('[disciplineTeacherController getTeachersByCurrentDisciplineId]', err);
    return;
  }
};

export const createDisciplineTeacher = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { currentDisciplineId, teacherId, form_of_conducting_classes } = req.body;

    if (!currentDisciplineId || !teacherId || !form_of_conducting_classes) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    if (!Object.values(FormOfConductingClasses).includes(form_of_conducting_classes)) {
      return res.status(400).json({ message: UNSUPPORTED_FORM_OF_CONDUCTING_CLASSES });
    }

    const currentDiscipline = await CurrentDiscipline.findOneBy({
      id: parseInt(currentDisciplineId),
    });

    if (!currentDiscipline) {
      return res.status(400).json({ message: CURRENT_DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    const teacher = await Teacher.findOneBy({ id: parseInt(teacherId) });

    if (!teacher) {
      return res.status(400).json({ message: TEACHER_NOT_FOUND_MESSAGE });
    }

    const candidat = await DisciplineTeacher.findOne({
      where: {
        current_discipline: { id: parseInt(currentDisciplineId) },
        teacher: { id: parseInt(teacherId) },
        form_of_conducting_classes,
      },
    });

    if (candidat) {
      return res.status(400).json({ message: DISCIPLINE_TEACHER_ALREADY_EXIST });
    }

    const disciplineTeacher = DisciplineTeacher.create({
      current_discipline: currentDiscipline,
      teacher,
      form_of_conducting_classes,
    });

    await disciplineTeacher.save();

    return res.status(201).json({ disciplineTeacher, message: CREATED_MESSAGE });
  } catch (err) {
    console.log('[disciplineTeacherController create]', err);
    return;
  }
};

export const updateDisciplineTeacher = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { disciplineTeacherId } = req.params;

    if (!disciplineTeacherId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const disciplineTeacher = await DisciplineTeacher.findOne({
      where: { id: parseInt(disciplineTeacherId) },
    });

    if (!disciplineTeacher) {
      return res.status(400).json({ message: DISCIPLINE_TEACHER_NOT_FOUND_MESSAGE });
    }

    const { currentDisciplineId, teacherId, form_of_conducting_classes } = req.body;

    if (!currentDisciplineId || !teacherId || !form_of_conducting_classes) {
      return res.status(400).json({ message: INSUFFICIENT_DATA_MESSAGE });
    }

    if (!Object.values(FormOfConductingClasses).includes(form_of_conducting_classes)) {
      return res.status(400).json({ message: UNSUPPORTED_FORM_OF_CONDUCTING_CLASSES });
    }

    const currentDiscipline = await CurrentDiscipline.findOneBy({
      id: parseInt(currentDisciplineId),
    });

    if (!currentDiscipline) {
      return res.status(400).json({ message: CURRENT_DISCIPLINE_NOT_FOUND_MESSAGE });
    }

    const teacher = await Teacher.findOneBy({ id: parseInt(teacherId) });

    if (!teacher) {
      return res.status(400).json({ message: TEACHER_NOT_FOUND_MESSAGE });
    }

    Object.assign(disciplineTeacher, {
      current_discipline: currentDiscipline,
      teacher,
      form_of_conducting_classes,
    });

    await disciplineTeacher.save();

    return res.status(200).json({ disciplineTeacher, message: UPDATED_MESSAGE });
  } catch (err) {
    console.log('[disciplineTeacherController update]', err);
    return;
  }
};

export const deleteDisciplineTeacher = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const accessVerificationErrorMessage = accessVerification(token, [UserRoleEnum.ADMIN]);
    if (accessVerificationErrorMessage) {
      return res.status(400).json({ message: accessVerificationErrorMessage });
    }

    const { disciplineTeacherId } = req.params;

    if (!disciplineTeacherId) {
      return res.status(400).json({ message: INSUFFICIENT_PARAMS });
    }

    const disciplineTeacher = await DisciplineTeacher.findOne({
      where: { id: parseInt(disciplineTeacherId) },
    });

    if (!disciplineTeacher) {
      return res.status(400).json({ message: DISCIPLINE_TEACHER_NOT_FOUND_MESSAGE });
    }

    await DisciplineTeacher.delete(parseInt(disciplineTeacherId));

    return res.status(200).json({ message: REMOVED_MESSAGE });
  } catch (err) {
    console.log('[disciplineTeacherController delete]', err);
    return;
  }
};
