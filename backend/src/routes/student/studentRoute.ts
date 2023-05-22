import express from 'express';

import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByTaskId,
} from '../../controllers/student/studentController';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:studentId', getStudentById);
router.get('/tasks/:taskId', getStudentsByTaskId);
router.post('/', createStudent);
router.patch('/:studentId', updateStudent);
router.delete('/:studentId', deleteStudent);

export { router as studentRouter };
