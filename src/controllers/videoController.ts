// src/controllers/videoController.ts
import { Request, Response } from 'express';
import Video from '../models/videoModel';

export const getVideoThumbnailList = async (req: Request, res: Response) => {
    try {

        const videos = await Video.find();
        const thumbnails = videos.map((video) => ({
            videoID: video.videoId,
            videoDesc: video.videoDesc,
            videoTitle: video.videoTitle,
        }));
        res.json(thumbnails);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
