#!/bin/bash

# 打包 Huskie Study Assets 的 PNG 和 SVG 文件

# 设置工作目录
cd "$(dirname "$0")"

# 输出文件名
OUTPUT_FILE="../HuskieStudyAssets-PNG-SVG.zip"

# 源目录
SOURCE_DIR="public/assets/huskie-study"

# 检查源目录是否存在
if [ ! -d "$SOURCE_DIR" ]; then
    echo "错误: 目录 $SOURCE_DIR 不存在"
    exit 1
fi

# 创建 zip 文件，只包含 PNG 和 SVG 文件
zip -r "$OUTPUT_FILE" "$SOURCE_DIR" -i "*.png" "*.svg"

# 检查是否成功创建
if [ -f "$OUTPUT_FILE" ]; then
    FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo "✓ 成功创建压缩包: $OUTPUT_FILE"
    echo "  文件大小: $FILE_SIZE"
    
    # 列出包含的文件
    echo ""
    echo "包含的文件:"
    unzip -l "$OUTPUT_FILE" | grep -E "\.(png|svg)$" | tail -n +4 | head -n -2
else
    echo "警告: 压缩包可能为空（没有找到 PNG 或 SVG 文件）"
fi

