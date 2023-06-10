import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const directories = ['views', 'assets', 'application', 'infrastructure'];

const alias = directories.reduce(
  (acc, cur) => ({ ...acc, [cur]: `/src/${cur}` }),
  { src: '/src' }
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias },
});
