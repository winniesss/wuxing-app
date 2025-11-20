# Husky Dao 学习小程序 · 产品与开发说明

本项目是一款以 **玄学学习 + 游戏化激励** 为核心的 App。

包含学习课程、成就墙、卷轴徽章系统、生辰八字推导 + 每日修行提醒、Chat 聊天助手等完整功能。

## 📌 目录

- [项目结构](#项目结构)
- [页面架构说明](#页面架构说明)
- [徽章成就系统](#徽章成就系统)
- [生辰八字系统](#生辰八字系统)
- [每日修行提醒](#每日修行提醒)
- [Chat 修行助手](#chat-修行助手)
- [数据结构定义](#数据结构定义)
- [资源文件结构](#资源文件结构)

## 项目结构

```
src/
  assets/
    badges/          ← 卷轴徽章 SVG
    icons/
    mascot/
  components/
    Chat/
    Profile/
    DailyTip/
    BadgeGallery/    ← 徽章展示组件
  pages/
    Home/            ← 首页（课程学习）
    Achievements/     ← 成就墙（卷轴徽章）
    ChatPage/         ← 修行聊天
    ProfilePage/      ← 我的（个人 + 设置 + 八字）
  utils/
    badges.js         ← 徽章系统工具
    progress.js       ← 进度管理
    bazi/
      engine.ts       ← 八字计算（可先 stub）
      dailyTip.ts     ← 每日提示生成器
      storage.ts      ← 用户八字本地存储
```

## 页面架构说明

### 1) 首页（课程学习）

- 展示课程列表
- 点击进入每节课内容（背知识点）
- 完成课程 → 调用 `unlockBadge(badgeId)`
- 支持课程进度、章节导航、背诵模式等

### 2) 成就墙（卷轴徽章）- "征程"

展示用户已解锁的卷轴成就。

布局类似艺术陈列墙：

```
+----------+----------+----------+
|  badge1  |  badge2  |  empty  |
+----------+----------+----------+
|  badge3  |  empty   |  empty  |
+----------+----------+----------+
```

每个徽章是一幅"国风卷轴"，对应一个课程。
资源来自 `/public/assets/badge/*.svg`。

**访问方式：**
- 进入第二个Tab（地图页面）
- 点击顶部"征程"按钮

### 3) 修行聊天（Chat）

聊天助手页面，具备两个核心功能：

#### ● 今日修行提醒（Daily Tip）

根据：
- 今日日期
- 今日天干地支
- 今日五行
- 用户八字 Profile

生成每日一句：
> 「今天适合温柔地学习，不必急着输出。」

#### ● 聊天互动

用户可以继续对话，例如：
- "我今天适合背哪一章节？"
- "我焦虑怎么办？"
- "火土太旺是什么意思？"

可以接 LLM 或规则回复。

### 4) 我的（个人 + 设置 + 八字）

合并"个人中心"与"设置页"。

包含：

#### ● 用户信息
- 头像、昵称、登录信息等

#### ● 生辰八字设置（核心）

字段：
- 生日（年月日）
- 出生时间
- 出生地区（用于时区推断）
- 性别（可选）

计算出的八字字段（天干地支）
- 喜用神（后期可拓展）

保存 `UserBaziProfile` 到 localStorage。

#### ● 设置
- 是否开启"每日修行提醒"
- 提醒发送时间
- 语言、主题

## 徽章成就系统

课程完成时触发：
```
completeLesson(lessonId) → unlockBadge(badgeId)
```

关系为 1:1：

| lessonId | badgeId |
|----------|---------|
| 1 | badge_wood |
| 2 | badge_fire_yinyang |
| 3 | badge_fiveElementsCycle |
| 4 | badge_talisman_basic |

### 已完成徽章资源

- `badge_wood.svg` - 五行·木
- `badge_fire_yinyang.svg` - 阴阳·火
- `badge_fiveElementsCycle.svg` - 五行运行图
- `badge_talisman_basic.svg` - 符箓入门

四枚均为国风卷轴，无字版，可直接挂墙。

**文件位置：** `public/assets/badge/`

**配置位置：** `src/utils/badges.js`

## 生辰八字系统

配置在「我的页」。

### 数据结构

```typescript
export type UserBaziProfile = {
  birthday: string;
  birthTime?: string;
  timezone?: string;
  gender?: string;

  yearStem?: string;
  yearBranch?: string;
  monthStem?: string;
  monthBranch?: string;
  dayStem?: string;
  dayBranch?: string;
  hourStem?: string;
  hourBranch?: string;

  favoriteElement?: 'wood' | 'fire' | 'earth' | 'metal' | 'water' | null;
};
```

### 存储

```javascript
localStorage.setItem('husky-bazi-profile', JSON.stringify(profile));
```

## 每日修行提醒

入口：Chat 页顶部固定展示。

### 使用

```javascript
import { generateDailyTip } from '@/bazi/dailyTip';

const tip = generateDailyTip(new Date(), userBaziProfile);
```

### 结构

```typescript
export type DailyTip = {
  date: string;
  title: string;
  summary: string;
  focus: string[];
  avoid: string[];
  elementHint?: string;
};
```

### 示例

```javascript
{
  title: "今天适合温柔地长一截 🌱",
  summary: "木日重在扎根，适合稳定输入。",
  focus: ["复习上一节课", "做一点整理"],
  avoid: ["临时改变太多计划"]
}
```

## Chat 修行助手

页面结构：
- 顶部：今日修行卡片
- 聊天区：消息列表
- 输入框：发送消息

### 例子

```javascript
// 初始化系统消息
{
  role: "system",
  text: `【${tip.title}】\n${tip.summary}`
}
```

用户发送后追加回复即可。

## 数据结构定义

### Lesson → Badge 映射

```javascript
export const lessonBadgeMap = {
  1: 'badge_wood',
  2: 'badge_fire_yinyang',
  3: 'badge_fiveElementsCycle',
  4: 'badge_talisman_basic',
};
```

### 激活徽章

```javascript
function unlockBadge(badgeId) {
  const unlocked = loadUnlockedBadges();
  unlocked.add(badgeId);
  saveUnlockedBadges(unlocked);
}
```

## 资源文件结构

```
public/
  assets/
    badge/
      badge_wood.svg
      badge_fire_yinyang.svg
      badge_fiveElementsCycle.svg
      badge_talisman_basic.svg
    mascot/
      husky.png
      husky_idle.svg
    icons/
    logo.png
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 部署

项目已配置 Vercel，可直接部署：

1. 推送到 GitHub
2. 在 Vercel 导入仓库
3. 自动部署

## 功能状态

- ✅ 课程学习系统
- ✅ 徽章成就系统（征程）
- ✅ 用户登录系统
- ✅ 微信登录（模拟）
- ⏳ 生辰八字系统（待开发）
- ⏳ 每日修行提醒（待开发）
- ⏳ Chat 修行助手（待开发）

## 技术栈

- React 19
- Vite
- CSS3
- LocalStorage（数据存储）

## 许可证

MIT
