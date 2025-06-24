import express from 'express';
import {
  getPermissions,
  createPermission,
  deletePermission,
} from '../controllers/permissionController.js';

const router = express.Router();

router.get('/', getPermissions);
router.post('/', createPermission);
router.delete('/:id', deletePermission);

export default router;
