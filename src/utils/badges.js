// 徽章成就系统配置

// 课程ID与徽章ID的映射关系
export const lessonBadgeMap = {
  1: 'badge_wood',                    // 五行相生相克基础 → 五行·木
  2: 'badge_fire_yinyang',            // 十天干阴阳属性 → 阴阳·火
  3: 'badge_fiveElementsCycle',       // 十天干五行属性 → 五行运行图
  4: 'badge_talisman_basic',          // 十二地支阴阳属性 → 符箓入门
  // 可以继续扩展...
};

// 徽章信息配置
export const badgeConfig = {
  badge_wood: {
    id: 'badge_wood',
    name: '五行·木',
    description: '完成五行相生相克基础课程',
    svgPath: '/assets/badge/badge_wood.svg',
    pngPath: '/assets/badge/badge_wood.png',
    color: '#4CAF50', // 木色-绿色
  },
  badge_fire_yinyang: {
    id: 'badge_fire_yinyang',
    name: '阴阳·火',
    description: '完成十天干阴阳属性课程',
    svgPath: '/assets/badge/badge_fire_yinyang.svg',
    pngPath: '/assets/badge/badge_fire_yinyang.png',
    color: '#F44336', // 火色-红色
  },
  badge_fiveElementsCycle: {
    id: 'badge_fiveElementsCycle',
    name: '五行运行图',
    description: '完成十天干五行属性课程',
    svgPath: '/assets/badge/badge_fiveElementsCycle.svg',
    pngPath: '/assets/badge/badge_fiveElementsCycle.png',
    color: '#FF9800', // 土色-橙色
  },
  badge_talisman_basic: {
    id: 'badge_talisman_basic',
    name: '符箓入门',
    description: '完成十二地支阴阳属性课程',
    svgPath: '/assets/badge/badge_talisman_basic.svg',
    pngPath: '/assets/badge/badge_talisman_basic.png',
    color: '#FFC107', // 符箓色-黄色
  },
};

// 获取课程对应的徽章ID
export function getBadgeIdByLessonId(lessonId) {
  return lessonBadgeMap[lessonId] || null;
}

// 获取徽章配置
export function getBadgeConfig(badgeId) {
  return badgeConfig[badgeId] || null;
}

// 检查徽章是否已解锁
export function isBadgeUnlocked(badgeId) {
  if (!badgeId) return false;
  
  // 从localStorage获取已解锁的徽章列表
  const unlockedBadges = JSON.parse(
    localStorage.getItem('wuxing_unlocked_badges') || '[]'
  );
  
  return unlockedBadges.includes(badgeId);
}

// 解锁徽章
export function unlockBadge(badgeId) {
  if (!badgeId) return;
  
  const unlockedBadges = JSON.parse(
    localStorage.getItem('wuxing_unlocked_badges') || '[]'
  );
  
  if (!unlockedBadges.includes(badgeId)) {
    unlockedBadges.push(badgeId);
    localStorage.setItem('wuxing_unlocked_badges', JSON.stringify(unlockedBadges));
    
    // 触发自定义事件，通知其他组件徽章已解锁
    window.dispatchEvent(new CustomEvent('badgeUnlocked', { detail: { badgeId } }));
  }
}

// 获取所有已解锁的徽章
export function getUnlockedBadges() {
  const unlockedBadges = JSON.parse(
    localStorage.getItem('wuxing_unlocked_badges') || '[]'
  );
  
  return unlockedBadges.map(badgeId => getBadgeConfig(badgeId)).filter(Boolean);
}

// 获取所有徽章（包括未解锁的）
export function getAllBadges() {
  return Object.values(badgeConfig);
}

