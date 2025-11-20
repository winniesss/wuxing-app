# 在 Cursor 中运行 React + Tailwind CSS 项目指南

这是一个 React + Tailwind CSS 项目。本指南将帮助你在 Cursor 中设置和运行项目。

## 项目状态检查

✅ 项目已创建（使用 Vite）
✅ Tailwind CSS 已安装并配置
✅ Lucide React 图标库已安装
✅ 所有依赖已配置完成

## 快速开始

### 第一步：打开终端

在 Cursor 中：
- **Mac**: 使用快捷键 `Cmd + ~` 打开终端
- **Windows/Linux**: 使用快捷键 `Ctrl + ~` 打开终端

### 第二步：进入项目目录

```bash
cd wuxing-app
```

### 第三步：安装依赖（如果尚未安装）

```bash
npm install
```

> **注意**: 如果 `node_modules` 文件夹已存在，可以跳过此步骤。

### 第四步：启动开发服务器

```bash
npm run dev
```

### 第五步：查看应用

终端会显示类似以下的信息：

```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**在浏览器中打开应用**：
- **Mac**: 按住 `Cmd` 键，点击终端中的 `http://localhost:5173` 链接
- **Windows/Linux**: 按住 `Ctrl` 键，点击终端中的链接
- 或者直接在浏览器地址栏输入 `http://localhost:5173`

## 项目结构说明

```
wuxing-app/
├── src/
│   ├── App.jsx          # 主应用组件
│   ├── LessonHome.jsx   # 课程首页组件
│   ├── index.css        # 全局样式（包含 Tailwind）
│   └── ...
├── tailwind.config.js   # Tailwind CSS 配置
├── package.json         # 项目依赖配置
└── vite.config.js       # Vite 构建配置
```

## 如何利用 Cursor 的 AI 继续开发

项目运行起来后，你可以使用 Cursor 的 AI 功能进行后续修改：

### 快捷键
- **Mac**: `Cmd + K` 或 `Cmd + L`
- **Windows/Linux**: `Ctrl + K` 或 `Ctrl + L`

### 推荐的 Prompt（提示词）示例

1. **修改布局**：
   ```
   把首页的"今日课程"改成一个横向滚动的列表
   ```

2. **添加新功能**：
   ```
   在"我的"页面增加一个"历史记录"的入口
   ```

3. **主题切换**：
   ```
   帮我把颜色主题改成深色模式
   ```

4. **样式调整**：
   ```
   把课程卡片的圆角改成更大一些
   ```

5. **功能优化**：
   ```
   在课程卡片上添加一个进度条显示学习进度
   ```

## 常用命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

## 故障排除

### 问题 1: 端口被占用

如果 `5173` 端口被占用，Vite 会自动尝试下一个可用端口（如 `5174`）。查看终端输出获取实际端口号。

### 问题 2: 依赖安装失败

```bash
# 清除缓存并重新安装
rm -rf node_modules package-lock.json
npm install
```

### 问题 3: Tailwind 样式不生效

确保 `src/index.css` 文件包含以下内容：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 问题 4: 热更新不工作

尝试重启开发服务器：
1. 在终端按 `Ctrl + C` 停止服务器
2. 重新运行 `npm run dev`

## 下一步

- 📖 查看 `README.md` 了解项目详细信息
- 🎨 修改 `src/App.jsx` 或 `src/LessonHome.jsx` 开始自定义
- 🚀 使用 Cursor AI 功能快速添加新特性

## 需要帮助？

如果遇到问题，可以：
1. 使用 Cursor 的 AI 功能询问（`Cmd + K`）
2. 查看项目的其他文档文件
3. 检查终端中的错误信息

