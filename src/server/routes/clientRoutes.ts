import { Router, Request, Response } from 'express';
import { isAuthenticated } from '../utils/isAuthenticated';
import path from 'node:path';

export const clientRouter = Router();

clientRouter.get('/login', (req: Request, res: Response) => {
  res.send('Login page.  Go to /auth/google to start authentication.')
});

// Logout route - requires authentication
clientRouter.get('/logout', isAuthenticated, (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Default route handler - handles everything that doesn't need special treatment.
clientRouter.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});
