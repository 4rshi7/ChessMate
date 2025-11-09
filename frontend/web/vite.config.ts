import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 👇 Load env vars from .env.development or .env.production

  return {
    plugins: [react(), tailwindcss(), flowbiteReact()],
    server: {
  proxy: {
    "/api/auth": {
      target: "http://localhost:5001",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
     "/api/users": {
      target: "http://localhost:5002",
      changeOrigin: true,
    },

  },
},
  };
});
