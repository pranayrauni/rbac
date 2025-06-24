import express from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize('view_product'), getProducts);
router.post('/', authenticate, authorize('create_product'), createProduct);
router.put('/:id', authenticate, authorize('edit_product'), updateProduct);
router.delete('/:id', authenticate, authorize('delete_product'), deleteProduct);

export default router;
