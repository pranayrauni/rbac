import express from 'express';
import { assignRole,  assignUserToEnterprise, updateUser, getMe } from '../controllers/userController.js';
import { authenticate, authorize } from '../middlewares/auth.js';


const router = express.Router();

router.post('/assign-role', assignRole);
router.post('/assign-enterprise', authenticate, authorize('assign_user'), assignUserToEnterprise);
router.put('/:id', authenticate, authorize('edit_user'), updateUser);
router.get('/me', authenticate, getMe);


export default router;
