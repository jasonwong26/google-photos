import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import 'dotenv/config'

// Import scopes from auth.ts
import { configurePassport } from '../auth';
import { authRouter } from './routes/authRoutes';
import { apiRouter } from './routes/apiRoutes';
import { isAuthenticated } from './utils/isAuthenticated';
import { clientRouter } from './routes/clientRoutes';
import 'dotenv/config';

// Initialize Express app
const app = express();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport Google OAuth2 strategy
configurePassport(passport);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;