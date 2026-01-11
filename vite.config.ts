import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  assetsInclude: ['**/*.pdf', '**/*.pptx', '**/*.docx'],
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
});