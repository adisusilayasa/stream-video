
import { Request, Response } from 'express';
import Comment from '../models/commentModel';
import { Server } from 'ws';
import * as http from 'http';
import { WebSocket } from 'ws';

// WebSocket server instance
let websocketServer: Server;

export const initializeWebSocketServer = (server: http.Server) => {
    // Create WebSocket server and handle connections
    websocketServer = new Server({ noServer: true });

    // Handle WebSocket connections
    websocketServer.on('connection', (ws: WebSocket) => {
        console.log('New WebSocket connection established.');

        // Handle WebSocket messages (if needed)
        ws.on('message', (message: string) => {
            console.log('Received WebSocket message:', message);
            // You can process the message here and respond accordingly
        });

        // Handle WebSocket connection closing (if needed)
        ws.on('close', () => {
            console.log('WebSocket connection closed.');
        });
    });
};

// Function to handle WebSocket upgrade request (called from server.ts)
export const handleWebSocketUpgrade = (request: Request, socket: any, head: any) => {
    if (websocketServer) {
        websocketServer.handleUpgrade(request, socket, head, (ws) => {
            websocketServer.emit('connection', ws, request);
        });
    }
};

export const getCommentList = async (req: Request, res: Response) => {
    try {
        const { videoID } = req.params;
        const comments = await Comment.find({ videoID }).sort({ timestamp: 1 });

        // Respond to HTTP request with the comments
        res.json(comments);

        // Send comments to WebSocket client
        if (websocketServer) {
            websocketServer.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(
                        JSON.stringify({
                            type: 'comment_list',
                            videoID,
                            comments,
                        })
                    );
                }
            });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const submitComment = async (req: Request, res: Response) => {
    try {
        const { username, comment, videoID } = req.body;
        const newComment = new Comment({
            username,
            comment,
            videoID,
        });
        await newComment.save();

        // Broadcast the new comment to connected WebSocket clients for real-time update
        const updatedComments = await Comment.find({ videoID }).sort({ timestamp: 1 });
        if (websocketServer) {
            websocketServer.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(updatedComments));
                }
            });
        }

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
