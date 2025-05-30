import { app } from './app';

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('close', () => {
  console.info('Server has been shut down.')
  process.exit(0);
});

function shutDown(signal: number) {
  console.info(`${signal} received, shutting down server...`);  

  server.close();

  setTimeout(() => {
    console.info(`server shutdown not detected, forcing exit...`);  
    process.exit(1);
  }, 2000);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
