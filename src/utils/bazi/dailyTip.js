// 每日修行提醒生成器

import { calculateBazi, getElement } from './engine';

// 五行对应的建议（基于八字和万年历）
const ELEMENT_TIPS = {
  wood: {
    title: '木日宜生发 🌱',
    summary: '木主生长，今日适合培养、发展、规划。',
    focus: ['规划未来', '培养新习惯', '与朋友交流', '亲近自然', '早睡早起'],
    avoid: ['急躁决策', '过度消耗', '熬夜', '与人争执'],
    elementHint: '木主生长，今日宜静不宜动，宜养不宜耗'
  },
  fire: {
    title: '火日宜发光 🔥',
    summary: '火主热情，今日适合表达、行动、展现。',
    focus: ['主动沟通', '展现才华', '参加社交活动', '处理重要事务', '积极行动'],
    avoid: ['过度内耗', '拖延不决', '情绪化决策', '与人冲突'],
    elementHint: '火主热情，今日宜动不宜静，宜外不宜内'
  },
  earth: {
    title: '土日宜稳定 🏔️',
    summary: '土主稳定，今日适合积累、沉淀、巩固。',
    focus: ['处理财务', '整理家居', '稳定关系', '制定计划', '照顾身体'],
    avoid: ['好高骛远', '三心二意', '频繁变动', '过度消费'],
    elementHint: '土主稳定，今日宜稳不宜急，宜收不宜放'
  },
  metal: {
    title: '金日宜精进 ⚔️',
    summary: '金主锐利，今日适合决断、整理、提升。',
    focus: ['做重要决定', '整理物品', '锻炼身体', '提升自我', '断舍离'],
    avoid: ['优柔寡断', '浅尝辄止', '分散注意力', '过度纠结'],
    elementHint: '金主锐利，今日宜精不宜粗，宜断不宜拖'
  },
  water: {
    title: '水日宜流动 💧',
    summary: '水主流动，今日适合适应、变通、交流。',
    focus: ['灵活应对', '尝试新体验', '调整计划', '与人合作', '保持开放'],
    avoid: ['固执己见', '一成不变', '封闭自己', '拒绝变化'],
    elementHint: '水主流动，今日宜变不宜固，宜通不宜堵'
  }
};

// 根据日期和用户八字生成每日提醒
export function generateDailyTip(date, userBaziProfile) {
  const today = date || new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  // 优先使用用户日主的五行，如果没有用户八字，使用今日日柱的五行
  let element = 'wood'; // 默认
  let dayStem = null;
  let isUserBazi = false;
  
  if (userBaziProfile && userBaziProfile.dayStem) {
    // 使用用户日主的五行
    dayStem = userBaziProfile.dayStem;
    element = getElement(dayStem) || 'wood';
    isUserBazi = true;
  } else {
    // 计算今日日柱
    const todayBazi = calculateBazi(dateStr, '12:00');
    dayStem = todayBazi.dayStem;
    element = getElement(dayStem) || 'wood';
  }
  
  const tip = ELEMENT_TIPS[element] || ELEMENT_TIPS.wood;
  
  // 根据是否使用用户八字，调整标题和summary
  let title = tip.title;
  let summary = tip.summary;
  
  if (isUserBazi) {
    // 基于用户日主个性化标题
    const elementCN = {
      wood: '木',
      fire: '火',
      earth: '土',
      metal: '金',
      water: '水'
    }[element] || '木';
    
    title = `你的${elementCN}日主建议 🌟`;
    summary = `根据你的日主${dayStem}（${elementCN}），今日适合：`;
  }
  
  return {
    date: dateStr,
    title: title,
    summary: summary,
    focus: tip.focus,
    avoid: tip.avoid,
    elementHint: tip.elementHint,
    element: element,
    dayStem: dayStem,
    isUserBazi: isUserBazi
  };
}

// 获取今日天干地支
export function getTodayGanZhi(date) {
  const today = date || new Date();
  const dateStr = today.toISOString().split('T')[0];
  const bazi = calculateBazi(dateStr, '12:00');
  
  return {
    gan: bazi.dayStem,
    zhi: bazi.dayBranch,
    element: getElement(bazi.dayStem)
  };
}

