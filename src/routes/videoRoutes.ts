// src/routes/videoRoutes.ts
import { Router } from 'express';
import { getVideoThumbnailList } from '../controllers/videoController';

const router = Router();

router.route('/thumbnail-list').get(getVideoThumbnailList);

export default router;
