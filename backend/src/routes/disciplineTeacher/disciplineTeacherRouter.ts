import express from 'express';
import {
  getAllDisciplineTeachers,
  getDisciplineTeacherById,
  createDisciplineTeacher,
  updateDisciplineTeacher,
  deleteDisciplineTeacher,
  getCurrentDisciplinesByTeacherId,
  getTeachersByCurrentDisciplineId,
} from '../../controllers/disciplineTeacher/disciplineTeacherController';

const router = express.Router();

router.get('/', getAllDisciplineTeachers);
router.get('/:disciplineTeacherId', getDisciplineTeacherById);
router.get('/teachers/:teacherId', getCurrentDisciplinesByTeacherId);
router.get('/currentDisciplines/:currentDisciplineId', getTeachersByCurrentDisciplineId);
router.post('/', createDisciplineTeacher);
router.patch('/:disciplineTeacherId', updateDisciplineTeacher);
router.delete('/:disciplineTeacherId', deleteDisciplineTeacher);

export { router as disciplineTeacherRouter };
