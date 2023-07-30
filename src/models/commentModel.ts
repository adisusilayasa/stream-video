// src/models/commentModel.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Comment {
    username: string;
    comment: string;
    timestamp: Date;
    videoID: string;
}

export interface CommentDocument extends Comment, Document { }

const commentSchema = new Schema<Comment>({
    username: { type: String, required: true },
    comment: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    videoID: { type: String, required: true },
});

export default mongoose.model<CommentDocument>('Comment', commentSchema);
