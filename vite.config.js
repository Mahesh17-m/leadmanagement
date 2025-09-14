import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  optimizeDeps: {
    exclude: ['ag-grid-community', 'ag-grid-react', 'react-select']
  }
});
