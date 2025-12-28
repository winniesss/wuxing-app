// 构建时注入版本号和构建时间的脚本
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取 package.json
const packagePath = join(__dirname, '../package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
const version = packageJson.version || '1.0.0';
const buildTime = new Date().toISOString();

// 读取 index.html
const indexPath = join(__dirname, '../index.html');
let html = readFileSync(indexPath, 'utf-8');

// 替换版本号和构建时间
html = html.replace(
  /window\.__APP_VERSION__ = '[^']*';/,
  `window.__APP_VERSION__ = '${version}';`
);
html = html.replace(
  /window\.__BUILD_TIME__ = [^;]*;/,
  `window.__BUILD_TIME__ = '${buildTime}';`
);

// 写回文件
writeFileSync(indexPath, html, 'utf-8');

console.log(`✓ 已注入版本信息: v${version} (${buildTime})`);

