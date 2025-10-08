import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Virtual_Memory_Simulator_OSDS/" : "/", // 👈 only for build/deploy
  plugins: [react()],
  server: {
    allowedHosts: ['cc976d635b29.ngrok-free.app'],
  },
}))
