import express from 'express';
import {
  getAllCurrentDisciplines,
  getCurrentDisciplineById,
  createCurrentDiscipline,
  updateCurrentDiscipline,
  deleteCurrentDiscipline,
  getCurrentDisciplinesByDisciplineId,
} from '../../controllers/currentDiscipline/currentDisciplineController';

const router = express.Router();

router.get('/', getAllCurrentDisciplines);
router.get('/:currentDisciplineId', getCurrentDisciplineById);
router.get('/disciplines/:disciplineId', getCurrentDisciplinesByDisciplineId);
router.post('/', createCurrentDiscipline);
router.patch('/:currentDisciplineId', updateCurrentDiscipline);
router.delete('/:currentDisciplineId', deleteCurrentDiscipline);

export { router as currentDisciplineRouter };
