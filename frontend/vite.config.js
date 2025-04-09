import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server:{port:5173},
  json: {
    namedExports: true, // Allows named exports from JSON
    stringify: false,   // Ensures JSON is imported as an object
  },
});

