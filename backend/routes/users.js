import express from 'express';
import { assignRole,  assignUserToEnterprise, updateUser, getMe, getAllUsers, deleteUser } from '../controllers/userController.js';
import { authenticate, authorize } from '../middlewares/auth.js';


const router = express.Router();

router.post('/assign-role', assignRole);
router.post('/assign-enterprise', authenticate, authorize('assign_user'), assignUserToEnterprise);
router.put('/:id', authenticate, authorize('edit_user'), updateUser);
router.get('/me', authenticate, getMe);
router.get('/', authenticate, authorize('view_user'), getAllUsers) 
router.delete('/:id', authenticate, authorize('delete_user'), deleteUser)



export default router;
