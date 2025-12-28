import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 检查root元素是否存在
const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('找不到 #root 元素！')
  document.body.innerHTML = '<div style="padding: 20px; color: red;">错误：找不到 #root 元素</div>'
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    console.log('✓ React应用已成功渲染')
  } catch (error) {
    console.error('✗ React渲染失败:', error)
    rootElement.innerHTML = `<div style="padding: 20px; color: red;">
      <h2>应用加载失败</h2>
      <p>错误信息: ${error.message}</p>
      <pre>${error.stack}</pre>
    </div>`
  }
}
