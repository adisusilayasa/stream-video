// models/VideoModel.ts

import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

interface IVideo extends Document {
    videoId: string;
    videoDesc: string;
    videoTitle: string;
}
const videoSchema = new Schema<IVideo>(
    {
        videoId: { type: String, required: true },
        videoDesc: { type: String, required: true },
        videoTitle: { type: String, required: true }
    },
    { timestamps: true }
);

const VideoModel = mongoose.model<IVideo>('Video', videoSchema);

export default VideoModel;
