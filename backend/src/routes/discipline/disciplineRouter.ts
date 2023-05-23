import express from 'express';
import {
  createDiscipline,
  deleteDiscipline,
  getAllDisciplines,
  getDisciplineById,
  updateDiscipline,
} from '../../controllers/discipline/disciplineController';

const router = express.Router();

router.get('/', getAllDisciplines);
router.get('/:disciplineId', getDisciplineById);
router.post('/', createDiscipline);
router.patch('/:disciplineId', updateDiscipline);
router.delete('/:disciplineId', deleteDiscipline);

export { router as disciplineRouter };
