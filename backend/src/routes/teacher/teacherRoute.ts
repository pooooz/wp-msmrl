import express from 'express';
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
} from '../../controllers/teacher/teacherController';

const router = express.Router();

router.get('/', getAllTeachers);
router.get('/:teacherId', getTeacherById);
router.post('/', createTeacher);
router.patch('/:teacherId', updateTeacher);
router.delete('/:teacherId', deleteTeacher);

export { router as teacherRouter };
