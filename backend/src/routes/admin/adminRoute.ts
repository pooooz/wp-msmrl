import express from 'express';
import {
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAllAdmins,
  updateAdmin,
} from '../../controllers/admin/adminController';

const router = express.Router();

router.get('/', getAllAdmins);
router.get('/:adminId', getAdminById);
router.post('/', createAdmin);
router.patch('/:adminId', updateAdmin);
router.delete('/:adminId', deleteAdmin);

export { router as adminRouter };
