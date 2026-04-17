import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      // Sửa alias để trỏ đúng vào thư mục hiện tại
      '@': path.resolve(__dirname, './src'), 
    },
  },
  // Loại bỏ phần define 'process.env' vì Vite đã có cơ chế import.meta.env xịn hơn
  build: {
    outDir: 'dist',
  }
});
