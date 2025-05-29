import { spawn, ChildProcess } from 'child_process';
import path from 'path';

// Path to the server script
const serverScriptPath = path.resolve('./out/server.js');

let nodeProcess: ChildProcess | null = null;

function startServer() {
  console.log(`Starting server: node ${serverScriptPath}`);
  nodeProcess = spawn('node', [serverScriptPath], { stdio: 'inherit', env: { ...process.env } });

  nodeProcess.on('error', (error) => {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1); // Exit main process if server fails to start
  });

  nodeProcess.on('exit', (code, signal) => {
    if (signal) {
      console.log(`Server process exited due to signal: ${signal}`);
    } else if (code !== null) {
      console.log(`Server process exited with code: ${code}`);
    } else {
      console.log('Server process exited.');
    }
    // If the server process exits for any reason other than us sending SIGINT,
    // the main script should also exit.
    // If it was SIGINT, the main process's SIGINT handler will call process.exit().
    if (signal !== 'SIGINT') {
        process.exit(code ?? 1);
    }
  });
}

// Handle SIGINT (Ctrl+C) for the main script
process.on('SIGINT', () => {
  console.log('\nSIGINT received by startServer.ts. Shutting down server...');
  if (nodeProcess && nodeProcess.pid) {
    // Send SIGINT to the child process
    // This allows the child process to perform its own cleanup if it has a SIGINT handler.
    // If it doesn't, it will be terminated by this signal.
    const killed = nodeProcess.kill('SIGINT');
    if (killed) {
        console.log('SIGINT signal sent to server process.');
    } else {
        console.log('Failed to send SIGINT to server process. It might have already exited.');
        // If we couldn't send the signal (e.g., process already dead), exit directly.
        process.exit(1);
    }
  } else {
    // If there's no nodeProcess or it has no pid, exit directly.
    console.log('Server process was not running or already exited.');
    process.exit(0);
  }
  // The main process will exit when the child process exits (due to the 'exit' handler on nodeProcess)
  // or after a timeout if the child doesn't exit promptly.
  // This timeout is a safeguard.
  setTimeout(() => {
    console.log('Main process exiting after timeout.');
    process.exit(0);
  }, 2000); // Wait 2 seconds
});

// Start the server
startServer();
