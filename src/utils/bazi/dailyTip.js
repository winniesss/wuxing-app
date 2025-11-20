// 每日修行提醒生成器

import { calculateBazi, getElement } from './engine';

// 五行对应的建议
const ELEMENT_TIPS = {
  wood: {
    title: '今天适合温柔地长一截 🌱',
    summary: '木日重在扎根，适合稳定输入。',
    focus: ['复习上一节课', '做一点整理', '静心思考'],
    avoid: ['临时改变太多计划', '急躁行事'],
    elementHint: '木主生长，今日宜静不宜动'
  },
  fire: {
    title: '今天适合热情地发光 🔥',
    summary: '火日重在表达，适合主动输出。',
    focus: ['学习新内容', '与人交流', '实践应用'],
    avoid: ['过度内耗', '拖延不决'],
    elementHint: '火主热情，今日宜动不宜静'
  },
  earth: {
    title: '今天适合稳稳地积累 🏔️',
    summary: '土日重在沉淀，适合巩固基础。',
    focus: ['复习旧知识', '整理笔记', '制定计划'],
    avoid: ['好高骛远', '三心二意'],
    elementHint: '土主稳定，今日宜稳不宜急'
  },
  metal: {
    title: '今天适合精准地打磨 ⚔️',
    summary: '金日重在精进，适合专注深入。',
    focus: ['深入学习', '反复练习', '精益求精'],
    avoid: ['浅尝辄止', '分散注意力'],
    elementHint: '金主锐利，今日宜精不宜粗'
  },
  water: {
    title: '今天适合灵活地流动 💧',
    summary: '水日重在适应，适合灵活变通。',
    focus: ['调整学习方法', '尝试新角度', '融会贯通'],
    avoid: ['固执己见', '一成不变'],
    elementHint: '水主流动，今日宜变不宜固'
  }
};

// 根据日期和用户八字生成每日提醒
export function generateDailyTip(date, userBaziProfile) {
  const today = date || new Date();
  const dateStr = today.toISOString().split('T')[0];
  
  // 如果没有用户八字，使用今日日柱的五行
  let element = 'wood'; // 默认
  
  if (userBaziProfile && userBaziProfile.dayStem) {
    // 使用用户日干的五行
    element = getElement(userBaziProfile.dayStem) || 'wood';
  } else {
    // 计算今日日柱
    const todayBazi = calculateBazi(dateStr, '12:00');
    element = getElement(todayBazi.dayStem) || 'wood';
  }
  
  const tip = ELEMENT_TIPS[element] || ELEMENT_TIPS.wood;
  
  return {
    date: dateStr,
    title: tip.title,
    summary: tip.summary,
    focus: tip.focus,
    avoid: tip.avoid,
    elementHint: tip.elementHint,
    element: element
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

