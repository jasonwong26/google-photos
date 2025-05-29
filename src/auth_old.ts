import path from 'node:path';
import fs from 'node:fs/promises';
import readline from 'node:readline/promises';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { PassportStatic } from 'passport';

import 'dotenv/config'
import { Strategy as GoogleStrategy, VerifyFunctionWithRequest } from 'passport-google-oauth2';

// TODO: delete this file after finishing configuration of other stuff.

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
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
  
  const googleStrategyCallback: VerifyFunctionWithRequest = (_request, accessToken, refreshToken, profile, done) => {
    // Store user profile in session
    return done(null, {
      id: profile.id,
      email: profile.email,
      name: profile.displayName,
      accessToken,
      refreshToken
    });
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

const refreshAccessToken = async (oAuth2Client: OAuth2Client) => {
  const fileContents = await fs.readFile(path.join('/credentials/credentials.json'));
  const credentials = JSON.parse(fileContents.toString());

//   await oAuth2Client.refreshAccessToken(credentials.();

//   const response = await oAuth2Client.getToken(code);
}

const requestAccessToken = async (oAuth2Client: OAuth2Client) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes
    });
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Authorize this app by visiting this url:", authUrl);


    const redirectedTo = await rl.question("Enter redirect URL you end up at here:");
    rl.close();

    const url = new URL(redirectedTo);
    const code = url.searchParams.get('code');

    if(!code) {
      throw new Error('No code found in redirect URL');
    }

    const response = await oAuth2Client.getToken(code);

    // PLACEHOLDER: retrieve and store refresh token into a credentials.json file
    const test = await oAuth2Client.refreshAccessToken();
    
    // store credentials in local file for later use
    await fs.writeFile(path.join(process.cwd(), 'credentials.json'), JSON.stringify(response.tokens), { });

    oAuth2Client.setCredentials(response.tokens);
};

export interface appClientCredentials {
  id: string;
  secret: string;
  redirectUri: string;
}

export const authorize = async (credentials: appClientCredentials): Promise<OAuth2Client> => {
    const oAuth2Client = new google.auth.OAuth2(
        credentials.id,
        credentials.secret,
        credentials.redirectUri,
    );

    await requestAccessToken(oAuth2Client);

    return oAuth2Client;
};
