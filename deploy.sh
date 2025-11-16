#!/bin/bash
# 快速部署脚本

echo "🚀 开始构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo ""
    echo "📦 dist 文件夹已准备好，可以："
    echo ""
    echo "1. 使用 Vercel 部署："
    echo "   - 访问 https://vercel.com"
    echo "   - 拖拽 dist 文件夹上传"
    echo ""
    echo "2. 使用 Netlify 部署："
    echo "   - 访问 https://netlify.com"
    echo "   - 拖拽 dist 文件夹上传"
    echo ""
    echo "3. 上传到自己的服务器"
    echo ""
    echo "📁 构建文件位置: $(pwd)/dist"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

