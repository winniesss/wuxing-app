# Huskie Study Assets

五行天干地支学习小程序的吉祥物资源文件。

## 目录结构

```
public/assets/huskie-study/
├── export/
│   ├── png/          # PNG 格式图片
│   ├── svg/          # SVG 格式图片
│   ├── react/        # React 组件
│   └── miniprogram/  # 小程序资源
├── design/           # 设计文件
└── assets-map.json   # 资源映射配置
```

## 使用方式

### 在 React 组件中使用

```javascript
import { getHuskieImage, getHuskieByLearningState } from '../utils/huskieAssets';

// 方式1: 直接指定状态
const happyImage = getHuskieImage('happy', 'png');
const studySvg = getHuskieImage('study', 'svg');

// 方式2: 根据学习状态自动选择
const image = getHuskieByLearningState('correct'); // 返回 happy 状态
const image2 = getHuskieByLearningState('incorrect'); // 返回 confused 状态

// 在 JSX 中使用
<img src={getHuskieImage('happy')} alt="Huskie Happy" />
```

### 可用状态

- `happy` - 开心状态（回答正确时）
- `study` - 学习状态（正在答题时）
- `confused` - 困惑状态（回答错误时）
- `sleep` - 睡觉状态（空闲时）
- `dragon` - 龙状态（完成关卡时）
- `crystal` - 水晶状态（达成成就时）

### 学习状态映射

- `correct` → `happy`
- `incorrect` → `confused`
- `studying` → `study`
- `idle` → `sleep`
- `completed` → `dragon`
- `achievement` → `crystal`

## 文件说明

请将对应的资源文件放置到相应的目录中：

- PNG 图片 → `export/png/`
- SVG 图片 → `export/svg/`
- React 组件 → `export/react/`
- 小程序资源 → `export/miniprogram/`
- 设计文件 → `design/`

