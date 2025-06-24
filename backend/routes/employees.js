import express from 'express';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';

import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize('view_employee'), getEmployees);
router.post('/', authenticate, authorize('add_employee'), createEmployee);
router.put('/:id', authenticate, authorize('edit_employee'), updateEmployee);
router.delete('/:id', authenticate, authorize('delete_employee'), deleteEmployee);

export default router;
