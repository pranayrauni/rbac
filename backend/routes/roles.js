import express from 'express';
import { getRoles, createRole, deleteRole } from '../controllers/roleController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getRoles);
router.post('/', authenticate, authorize('manage_roles'), createRole);
router.delete('/:id', deleteRole);

export default router;
