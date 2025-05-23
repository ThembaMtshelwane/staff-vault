import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        // target: "http://localhost:9000",
        // target: "http://localhost:8000",
        target: "https://staff-vault-server.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
