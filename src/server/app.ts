import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config'

import { authRouter } from './routes/authRoutes';
import { apiRouter } from './routes/apiRoutes';
import { clientRouter } from './routes/clientRoutes';
import { directories } from './utils/directories';
import { initializeAuthorization } from './utils/auth';

// Initialize Express app
export const app = express();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize authorization
initializeAuthorization(app);

// Serve static files
app.use(express.static(directories.public));

// Use auth routes
app.use('/auth', authRouter);

// Use api routes
app.use('/api', apiRouter);

// Use client routes
app.use('/', clientRouter);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
