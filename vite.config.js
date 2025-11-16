import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 5173, // 默认端口
    strictPort: false, // 如果端口被占用，自动尝试下一个可用端口
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // 确保单页应用路由正常工作
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  // 如果部署到子目录，取消注释并设置base路径
  // base: '/wuxing-app/',
})
