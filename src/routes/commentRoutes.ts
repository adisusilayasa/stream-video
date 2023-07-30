// src/routes/commentRoutes.ts
import { Router } from 'express';
import { getCommentList, submitComment } from '../controllers/commentController';

const router = Router();

router.get('/list/:videoID', getCommentList);
router.post('/submit', submitComment);

export default router;
