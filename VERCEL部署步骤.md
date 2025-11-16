# Vercel 部署步骤（最优方案）

## ✅ 项目已构建完成！

构建文件已生成在 `dist` 文件夹中。

## 🚀 部署方法（选择一种）

### 方法一：网页拖拽（最简单，推荐）

1. **访问 Vercel**：
   - 打开 https://vercel.com
   - 使用 GitHub 账号登录（如果没有账号，先注册）

2. **创建项目**：
   - 点击 "Add New..." → "Project"
   - 如果代码在 GitHub，直接导入仓库
   - 如果不在，点击 "Browse" 或直接拖拽

3. **上传 dist 文件夹**：
   - 将 `wuxing-app/dist` 文件夹拖拽到 Vercel
   - 或者选择 "Import Git Repository" 连接 GitHub

4. **配置项目**（如果使用GitHub）：
   - Framework Preset: Vite
   - Root Directory: `./` (或 `wuxing-app` 如果仓库在根目录)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **部署**：
   - 点击 "Deploy"
   - 等待1-2分钟
   - 获得链接（如 `wuxing-app.vercel.app`）

### 方法二：命令行部署（快速）

1. **安装 Vercel CLI**：
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**：
   ```bash
   vercel login
   ```

3. **部署**：
   ```bash
   cd wuxing-app
   vercel --prod
   ```

4. **按照提示操作**：
   - 选择项目设置
   - 确认部署
   - 获得链接

### 方法三：连接 GitHub（自动部署）

1. **将代码推送到 GitHub**：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **在 Vercel 导入 GitHub 仓库**：
   - 登录 Vercel
   - 点击 "Add New..." → "Project"
   - 选择你的 GitHub 仓库
   - 自动检测 Vite 配置
   - 点击 "Deploy"

3. **自动部署**：
   - 以后每次 push 代码，Vercel 会自动重新部署

## 🎉 部署完成后的优势

- ✅ **永久免费**：个人项目完全免费
- ✅ **HTTPS自动**：自动配置SSL证书
- ✅ **全球CDN**：访问速度快
- ✅ **自定义域名**：可以绑定自己的域名
- ✅ **自动部署**：连接GitHub后，代码更新自动部署
- ✅ **预览环境**：每次push都有预览链接

## 📱 分享链接

部署完成后，你会得到一个类似这样的链接：
```
https://wuxing-app.vercel.app
```

这个链接可以：
- 在任何设备上访问
- 分享给任何人
- 添加到手机主屏幕（PWA功能）

## 🔧 后续操作

1. **自定义域名**（可选）：
   - 在 Vercel 项目设置中添加域名
   - 按照提示配置DNS

2. **环境变量**（如果需要）：
   - 在项目设置中添加环境变量

3. **自动部署**：
   - 连接GitHub后，每次代码更新自动部署

## 💡 推荐方案

**最快方式**：使用方法一（网页拖拽），5分钟搞定！

**长期使用**：使用方法三（连接GitHub），代码更新自动部署。

