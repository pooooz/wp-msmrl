import express from 'express';

import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
} from '../../controllers/group/groupController';

const router = express.Router();

router.get('/', getAllGroups);
router.get('/:groupId', getGroupById);
router.post('/', createGroup);
router.patch('/:groupId', updateGroup);
router.delete('/:groupId', deleteGroup);

export { router as groupRouter };
