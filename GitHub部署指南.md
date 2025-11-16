# GitHub + Vercel 部署指南（推荐方案）

## 为什么先存GitHub？

✅ **自动部署**：代码更新后，Vercel自动重新部署  
✅ **版本控制**：可以回退到之前的版本  
✅ **协作方便**：多人协作更容易  
✅ **备份安全**：代码不会丢失  

## 步骤一：创建GitHub仓库

1. **访问 GitHub**：
   - 打开 https://github.com
   - 登录你的账号（如果没有，先注册）

2. **创建新仓库**：
   - 点击右上角 "+" → "New repository"
   - Repository name: `wuxing-app`（或你喜欢的名字）
   - 选择 Public（公开）或 Private（私有）
   - **不要**勾选 "Initialize this repository with a README"
   - 点击 "Create repository"

3. **复制仓库地址**：
   - 创建后会显示仓库地址，类似：
   - `https://github.com/your-username/wuxing-app.git`
   - 复制这个地址

## 步骤二：初始化Git并推送代码

在项目目录执行以下命令：

```bash
cd /Users/litingsun/Desktop/Cursor-Tutorial/wuxing-app

# 初始化Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 五行天干地支背诵应用"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/your-username/wuxing-app.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

## 步骤三：连接Vercel自动部署

1. **访问 Vercel**：
   - 打开 https://vercel.com
   - 使用GitHub账号登录

2. **导入项目**：
   - 点击 "Add New..." → "Project"
   - 选择 "Import Git Repository"
   - 选择你的 `wuxing-app` 仓库
   - 点击 "Import"

3. **配置项目**：
   - Framework Preset: **Vite**（会自动检测）
   - Root Directory: `./` 
   - Build Command: `npm run build`（默认）
   - Output Directory: `dist`（默认）
   - Install Command: `npm install`（默认）

4. **部署**：
   - 点击 "Deploy"
   - 等待1-2分钟
   - 获得链接（如 `wuxing-app.vercel.app`）

## 步骤四：后续更新

以后每次更新代码：

```bash
git add .
git commit -m "更新说明"
git push
```

Vercel会自动检测到代码更新并重新部署！🎉

## 优势

- ✅ **一次配置，永久自动部署**
- ✅ **每次push自动更新网站**
- ✅ **可以查看部署历史**
- ✅ **可以回退到之前的版本**
- ✅ **代码安全备份在GitHub**

