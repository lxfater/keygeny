import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-refine': ['@refinedev/core', '@refinedev/mantine', '@refinedev/react-router-v6', '@refinedev/react-table', '@refinedev/simple-rest'],
          'vendor-mantine': ['@mantine/core', '@mantine/form', '@mantine/hooks', '@mantine/notifications'],
          'vendor-table': ['@tanstack/react-table'],
          'vendor-icons': ['@tabler/icons-react'],
        },
      },
    },
  },
});
