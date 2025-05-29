import * as esbuild from 'esbuild';
import copy from 'esbuild-copy-static-files';
import * as fs from 'fs';
import { resolve } from 'path';

// Ensure the public directory exists
const outDir = './out';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Build the client
async function build() {
  try {
    // Build the React app
    await esbuild.build({
      entryPoints: ['src/server/app.ts'],
      bundle: true,
      format: 'cjs',
      minify: false,
      outfile: resolve(outDir, 'server.js'),
      platform: 'node',
      tsconfig: 'tsconfig.json',
      jsx: 'automatic',  // Enable the new JSX transform
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      },
      plugins: [
        copy({
          src: 'src/static',
          dest: 'out',
        }),
      ],
    });
    
    console.log('Server build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
