import express from 'express';
import {
  createEnterprise,
  getEnterprises,
  updateEnterprise,
  deleteEnterprise
} from '../controllers/enterpriseController.js';

import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize('view_enterprise'), getEnterprises);
router.post('/', authenticate, authorize('create_enterprise'), createEnterprise);
router.put('/:id', authenticate, authorize('edit_enterprise'), updateEnterprise);
router.delete('/:id', authenticate, authorize('delete_enterprise'), deleteEnterprise);

export default router;
