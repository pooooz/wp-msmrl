import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../../controllers/task/taskController';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:taskId', getTaskById);
router.post('/', createTask);
router.patch('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export { router as taskRouter };
