import { Router, Request, Response } from 'express';
import { isAuthenticated } from '../utils/isAuthenticated';
import type { UserProfile, AuthenticatedUser } from './types';

const router = Router();

// API status route
router.get('/status', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});


// Protected API profile route
router.get('/profile', isAuthenticated, async (req: Request, res: Response) => {
  const user = req.user as AuthenticatedUser;

  const profile: UserProfile = {
    id: user.id,
    name: user.name,
    profilePhoto: user.profilePhoto,
    givenName: user.givenName,
    familyName: user.familyName
  }

  res.json(profile);
});

export { router as apiRouter };
