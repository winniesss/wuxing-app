import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'

// 读取 package.json 获取版本号
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))
const appVersion = packageJson.version || '1.0.0'
const buildTime = new Date().toISOString()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // 注入版本号和构建时间到代码中
    '__APP_VERSION__': JSON.stringify(appVersion),
    '__BUILD_TIME__': JSON.stringify(buildTime),
  },
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
