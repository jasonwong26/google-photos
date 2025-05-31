import { Router } from 'express';
import passport from 'passport';

import { scopes } from '../utils/auth';

export const authRouter = Router();

// Authentication routes - mounted under /auth
authRouter.get('/google', passport.authenticate('google', {
  scope: scopes
}));

authRouter.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login',      // This will redirect to the global /login route in app.ts
    successRedirect: '/profile'     // This will redirect to the global /profile route in app.ts
  })
);
