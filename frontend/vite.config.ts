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
    host: true,
    port: 5173,
    strictPort: true,
  }
});

