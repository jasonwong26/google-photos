import { google, Auth } from 'googleapis';
import { AuthClient, GoogleAuth } from 'google-auth-library'
import 'dotenv/config'



// NOTE: fails - API doesn't support service accounts...
const getServiceAccountCredentials = async () => {
  console.info('XXXX getServiceAccountCredentials', { GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS});

  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/photoslibrary.readonly']
  });
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  const url = 'https://photoslibrary.googleapis.com/v1/albums';
  const res = await client.request({ url });
  console.log(res.data);
}

const getApiKeyCredentials = async () => {
  console.info('XXXX getApiKeyCredentials', { GOOGLE_APPLICATION_CREDENTIALS: process.env.API_KEY});

  const auth = new GoogleAuth({
    apiKey: process.env.API_KEY,
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/photoslibrary.readonly']
  });
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  const url = 'https://photoslibrary.googleapis.com/v1/albums';
  const res = await client.request({ url });
  console.log(res.data);
}

const getUserCredentials = async () => {

  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/photoslibrary.readonly'],
    projectId: 'spherical-treat-459602-q3',
  });
  const client = await auth.getClient();

  console.info('XXXX getUserCredentials', { client });
  const url = 'https://photoslibrary.googleapis.com/v1/albums';
  const res = await client.request({ url });
  console.log(res.data);
}

// const listAlbums_v2 = async () => {
//   const client = new Photos();

//   return await client.albums.list();
// }

const getOauthCredentials = async () => {
const oauth2Client = new google.auth.OAuth2('{client_id}', '{client_secret}', 'https://google.developermouse.com');

const scopes = ['https://www.googleapis.com/auth/photoslibrary.readonly'];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,
});

// copy this to browser... then copy the code value from the redirect to google.developermouse.com
console.info('XXXX getOauthCredentails', {
  url
});
}

// use the code value to request auth and refresh tokens...
const getTokensFromCode = async () => {
  const code = '{code}';
  const oauth2Client = new google.auth.OAuth2('{client_id}', '{client_secret}', 'https://google.developermouse.com');
  const {tokens} = await oauth2Client.getToken(code);

  console.info('XXXX getTokensFromCode', {tokens})

  return tokens;
}

const makeRequest = async () => {
  const response = await fetch('https://photoslibrary.googleapis.com/v1/albums', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + '{access_token}'
    },
  });

  console.info('XXXX makeRequest', {
    isOk: response.ok,
    status: response.status,
  });

  if(!response.ok) {
    throw new Error(await response.text())
  }

  const body =await response.json();

  console.info('XXXX makeRequest', {body});
}


export const temp = async () => {

  // await getServiceAccountCredentials();
  // await getOauthCredentials();
  // await getTokensFromCode();
  await makeRequest();

  return 1;
}