import express from 'express';
import {
  getAllResults,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
  getResultsByTaskId,
  getResultsByStudentId,
} from '../../controllers/result/resultController';

const router = express.Router();

router.get('/', getAllResults);
router.get('/:resultId', getResultById);
router.get('/tasks/:taskId', getResultsByTaskId);
router.get('/students/:studentId', getResultsByStudentId);
router.post('/', createResult);
router.patch('/:resultId', updateResult);
router.delete('/:resultId', deleteResult);

export { router as resultRouter };
