// src/models/videoModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Video {
    videoID: string;
    url: string;
}

export interface VideoDocument extends Video, Document { }

const videoSchema = new Schema<Video>({
    videoID: { type: String, required: true, unique: true },
    url: { type: String, required: true },
});

export default mongoose.model<VideoDocument>('Video', videoSchema);
