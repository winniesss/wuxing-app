import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

console.log('🚀 开始加载应用...')

// 检查root元素是否存在
const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('❌ 找不到 #root 元素！')
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-size: 20px;">错误：找不到 #root 元素</div>'
} else {
  console.log('✓ 找到 #root 元素')
  
  // 先显示加载提示
  rootElement.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>正在加载应用...</h1><p>如果长时间无响应，请检查浏览器控制台</p></div>'
  
  // 异步加载App组件
  import('./App.jsx')
    .then(({ default: App }) => {
      console.log('✓ App组件加载成功')
      try {
        const root = createRoot(rootElement)
        root.render(
          <StrictMode>
            <App />
          </StrictMode>
        )
        console.log('✓ React应用已成功渲染')
      } catch (error) {
        console.error('✗ React渲染失败:', error)
        rootElement.innerHTML = `<div style="padding: 20px; color: red;">
          <h2>应用渲染失败</h2>
          <p>错误信息: ${error.message}</p>
          <pre style="background: #f0f0f0; padding: 10px; overflow: auto;">${error.stack}</pre>
        </div>`
      }
    })
    .catch(error => {
      console.error('✗ 加载App.jsx失败:', error)
      rootElement.innerHTML = `<div style="padding: 20px; color: red;">
        <h2>加载App.jsx失败</h2>
        <p>错误信息: ${error.message}</p>
        <pre style="background: #f0f0f0; padding: 10px; overflow: auto;">${error.stack}</pre>
        <p style="margin-top: 20px;">请打开浏览器控制台（F12）查看详细错误信息</p>
      </div>`
    })
}
