# 推送到GitHub的命令

## 第一步：在GitHub创建仓库

1. 访问 https://github.com
2. 点击右上角 "+" → "New repository"
3. 仓库名：`wuxing-app`（或你喜欢的名字）
4. 选择 Public 或 Private
5. **不要**勾选 "Initialize this repository with a README"
6. 点击 "Create repository"
7. **复制仓库地址**（类似：`https://github.com/your-username/wuxing-app.git`）

## 第二步：执行以下命令

```bash
cd /Users/litingsun/Desktop/Cursor-Tutorial/wuxing-app

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/your-username/wuxing-app.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

**注意**：将 `your-username` 替换为你的GitHub用户名，`wuxing-app` 替换为你的仓库名。

## 第三步：连接Vercel自动部署

1. 访问 https://vercel.com
2. 使用GitHub账号登录
3. 点击 "Add New..." → "Project"
4. 选择 "Import Git Repository"
5. 选择你的 `wuxing-app` 仓库
6. 点击 "Import"
7. Framework Preset 选择 **Vite**（会自动检测）
8. 点击 "Deploy"
9. 等待1-2分钟，获得部署链接

## 完成！

以后每次更新代码：
```bash
git add .
git commit -m "更新说明"
git push
```

Vercel会自动检测并重新部署！🎉

