import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      onwarn: (warning, warn) => {
        if (warning.code === 'MODULE_NOT_FOUND') {
          return;
        }
        warn(warning);
      }
    }
  },
  optimizeDeps: {
    exclude: ['ag-grid-community', 'ag-grid-react', 'react-select']
  }
});