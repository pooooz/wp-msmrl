import express from 'express';
import {
  createSpecialization,
  deleteSpecialization,
  getAllSpecializations,
  getSpecializationById,
  updateSpecialization,
} from '../../controllers/specialization/specializationController';

const router = express.Router();

router.get('/', getAllSpecializations);
router.get('/:specializationId', getSpecializationById);
router.post('/', createSpecialization);
router.patch('/:specializationId', updateSpecialization);
router.delete('/:specializationId', deleteSpecialization);

export { router as specializationRouter };
