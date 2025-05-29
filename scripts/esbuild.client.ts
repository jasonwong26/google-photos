import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

// Ensure the public directory exists
const publicDir = path.resolve(__dirname, '../../public/js');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Build the client
async function build() {
  try {
    // Build the React app
    await esbuild.build({
      entryPoints: ['src/client/index.tsx'],
      bundle: true,
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV !== 'production',
      outfile: 'public/js/bundle.js',
      platform: 'browser',
      jsx: 'automatic',  // Enable the new JSX transform
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    });
    
    console.log('Client build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
