import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
  plugins: [react()],
  server: {
    host: "0.0.0.0", // 모든 IP에서 접근 가능
    port: 5173, // 필요한 포트로 변경 가능
  },
});
