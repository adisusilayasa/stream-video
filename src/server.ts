// src/server.ts
import http from 'http';
import app from './app';
import { initializeWebSocketServer, handleWebSocketUpgrade } from './controllers/commentController'; // Import the necessary WebSocket functions
import dotenv from 'dotenv';
import { connectToDB } from './db/mongo';

dotenv.config(); // Load environment variables from .env file

connectToDB();

const port = process.env.PORT || 3000; // Use PORT environment variable or default to 3000
const server = http.createServer(app);

// Initialize the WebSocket server by passing the HTTP server instance
initializeWebSocketServer(server);

// Handle WebSocket upgrade requests
server.on('upgrade', handleWebSocketUpgrade);

server.listen(port, () => {
    console.info(`Server running on port ${port}`);
});
