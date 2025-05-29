import { PassportStatic } from 'passport';

import 'dotenv/config'
import { Strategy as GoogleStrategy, VerifyFunctionWithRequest } from 'passport-google-oauth2';
import { AuthenticatedUser, GoogleProfile } from './server/routes/types';

export const scopes = [
  "profile",
  // https://developers.google.com/photos/picker/reference/rest/v1/sessions
  "https://www.googleapis.com/auth/photospicker.mediaitems.readonly",
  // https://developers.google.com/photos/overview/authorization
  "https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata",
  "https://www.googleapis.com/auth/photoslibrary.appendonly",
  "https://www.googleapis.com/auth/photoslibrary.edit.appcreateddata",
];

export const configurePassport = (passport: PassportStatic) => {
  // Passport serialization
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user: AuthenticatedUser, done) => {
    done(null, user);
  });
  
  const googleStrategyCallback: VerifyFunctionWithRequest = (_request, accessToken, refreshToken, profile: GoogleProfile, done) => {
    // Store user profile in session
    return done(null, {
      id: profile.id,
      name: profile.displayName,
      profilePhoto: profile.picture,
      givenName: profile.given_name,
      familyName: profile.family_name,
      accessToken,
      refreshToken
    } as AuthenticatedUser);
  };
  
  const googleStrategy = new GoogleStrategy({
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: process.env.REDIRECT_URL!,
    passReqToCallback: true
  }, googleStrategyCallback);
  
  // Use the strategy with passport
  passport.use('google', googleStrategy);
}
