import { Router, Request, Response } from 'express';
import { google } from 'googleapis';
import { isAuthenticated } from '../utils/isAuthenticated';
import { OAuth2Client } from 'google-auth-library';
import { type AuthenticatedUser } from './types';



const router = Router();

// API status route
router.get('/status', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

type UserProfile = Pick<AuthenticatedUser, 'id' | 'name' | 'profilePhoto' | 'givenName' | 'familyName'>;

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
