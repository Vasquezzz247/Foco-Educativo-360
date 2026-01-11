import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
    assetsInclude: ['**/*.pptx', '**/*.pdf', '**/*.mp4', '**/*.jpg', '**/*.jpeg', '**/*.png'],
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
});
