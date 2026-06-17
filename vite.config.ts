import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Allow tunnels (ngrok, etc.) to reach the dev server without a
    // "Blocked request" host-check error.
    allowedHosts: true,
  },
});
