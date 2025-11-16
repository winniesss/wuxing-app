#!/usr/bin/env node

// 检查 Huskie 资源文件是否存在

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, 'public/assets/huskie-study/export');
const requiredFiles = {
  png: [
    'husky_happy.png',
    'husky_study.png',
    'husky_confused.png',
    'husky_sleep.png',
    'husky_dragon.png',
    'husky_crystal.png'
  ],
  svg: [
    'husky_happy.svg',
    'husky_study.svg',
    'husky_confused.svg',
    'husky_sleep.svg',
    'husky_dragon.svg',
    'husky_crystal.svg'
  ]
};

console.log('🔍 检查 Huskie 资源文件...\n');

let allExists = true;

// 检查 PNG 文件
console.log('📦 PNG 文件:');
const pngDir = path.join(baseDir, 'png');
requiredFiles.png.forEach(file => {
  const filePath = path.join(pngDir, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`  ${status} ${file}`);
  if (!exists) allExists = false;
});

// 检查 SVG 文件
console.log('\n📦 SVG 文件:');
const svgDir = path.join(baseDir, 'svg');
requiredFiles.svg.forEach(file => {
  const filePath = path.join(svgDir, file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`  ${status} ${file}`);
  if (!exists) allExists = false;
});

console.log('\n' + '='.repeat(50));
if (allExists) {
  console.log('✅ 所有资源文件已就位！');
} else {
  console.log('⚠️  部分资源文件缺失');
  console.log('\n请将图片文件复制到以下目录:');
  console.log(`  PNG: ${pngDir}`);
  console.log(`  SVG: ${svgDir}`);
  console.log('\n详细说明请查看: public/assets/huskie-study/使用指南.md');
}
console.log('='.repeat(50));

