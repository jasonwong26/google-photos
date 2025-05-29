import yargs from 'yargs';
import { red } from 'ansis';
import 'dotenv/config'

import { appClientCredentials, authorize } from '../src/auth_old';

// Process script args
const getArgs = () =>
  yargs(process.argv)
    .option('spaceName', {
      type: 'string',
      alias: 's',
      description: 'Name or ID of the space.',
      default: 'sandbox',
    })
    .parseSync();

// =================================================================================================
// Main execution
// =================================================================================================

const main = async (args: ReturnType<typeof getArgs>) => {
  console.info('XXXX main', {
    args
  });

  const credentials: appClientCredentials = {
    id: process.env.CLIENT_ID!,
    secret: process.env.CLIENT_SECRET!,
    redirectUri: process.env.REDIRECT_URL!
  }

  console.info('XXXX tempScript 1', { credentials})

  const authClient = await authorize(credentials);

  console.info('XXXX tempScript 3', { authClient: authClient.credentials })

  const albumResponse = await fetch('https://photoslibrary.googleapis.com/v1/albums', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authClient.credentials.access_token
    },
  });

  const pickerResponse = await fetch("https://photospicker.googleapis.com/v1/sessions", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authClient.credentials.access_token
    }
  })

  console.info('XXXX tempScript3', { albumResponse: albumResponse.ok, pickerResponse: pickerResponse.ok  })
}

/* EXECUTE ************************************************** */
    main(getArgs())
    .then(() => process.exit(0))
    .catch(unknownError => {
      const error = unknownError as Error;
      console.error(error.message, error.stack);
      process.stderr.write(red(error.message));
      process.exit(1);
    });
  