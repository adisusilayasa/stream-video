// src/app.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { swaggerDocument } from './swagger';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import winston from 'winston';
import videoRoutes from './routes/videoRoutes';
import productRoutes from './routes/productRoutes';
import commentRoutes from './routes/commentRoutes';

const app = express();

// Set up the logger for writing to a log file
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Output logs to the console
    new winston.transports.File({ filename: 'app.log' }) // Output logs to a log file named 'app.log'
  ],
});

// Create a custom morgan format to log HTTP requests immediately
const morganFormat = ':method :url :status :res[content-length] - :response-time ms';

// Apply morgan middleware for logging HTTP requests with the custom format
app.use(morgan(morganFormat, { stream: { write: (message: string) => logger.info(message.trim()) } }));

app.use(bodyParser.json());
app.use(cors());

// Use your productRoutes here
app.use('/api/products', productRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle undefined routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
