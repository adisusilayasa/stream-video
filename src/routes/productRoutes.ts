// src/routes/productRoutes.ts
import { Router } from 'express';
import { getProductList } from '../controllers/productController';

const router = Router();

router.get('/list', getProductList);

export default router;
