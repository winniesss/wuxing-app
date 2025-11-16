// Huskie 资源管理工具

// 资源映射配置
const assetsMap = {
  assets: {
    png: {
      husky_happy: '/assets/huskie-study/export/png/husky_happy.png',
      husky_study: '/assets/huskie-study/export/png/husky_study.png',
      husky_confused: '/assets/huskie-study/export/png/husky_confused.png',
      husky_sleep: '/assets/huskie-study/export/png/husky_sleep.png',
      husky_dragon: '/assets/huskie-study/export/png/husky_dragon.png',
      husky_crystal: '/assets/huskie-study/export/png/husky_crystal.png'
    },
    svg: {
      husky_happy: '/assets/huskie-study/export/svg/husky_happy.svg',
      husky_study: '/assets/huskie-study/export/svg/husky_study.svg',
      husky_confused: '/assets/huskie-study/export/svg/husky_confused.svg',
      husky_sleep: '/assets/huskie-study/export/svg/husky_sleep.svg',
      husky_dragon: '/assets/huskie-study/export/svg/husky_dragon.svg',
      husky_crystal: '/assets/huskie-study/export/svg/husky_crystal.svg'
    }
  },
  states: {
    happy: 'husky_happy',
    study: 'husky_study',
    confused: 'husky_confused',
    sleep: 'husky_sleep',
    dragon: 'husky_dragon',
    crystal: 'husky_crystal'
  }
};

/**
 * 获取 Huskie 图片资源路径
 * @param {string} state - 状态名称: 'happy', 'study', 'confused', 'sleep', 'dragon', 'crystal'
 * @param {string} format - 格式: 'png' 或 'svg'，默认为 'png'
 * @returns {string} 资源路径
 */
export const getHuskieImage = (state, format = 'png') => {
  const stateKey = assetsMap.states[state];
  if (!stateKey) {
    console.warn(`Unknown huskie state: ${state}`);
    return assetsMap.assets.png.husky_happy; // 默认返回 happy 状态
  }
  
  const formatKey = format === 'svg' ? 'svg' : 'png';
  return assetsMap.assets[formatKey][stateKey];
};

/**
 * 获取所有 Huskie 状态
 * @returns {Array<string>} 状态列表
 */
export const getHuskieStates = () => {
  return Object.keys(assetsMap.states);
};

/**
 * 根据学习状态获取对应的 Huskie 图片
 * @param {string} learningState - 学习状态: 'correct', 'incorrect', 'studying', 'idle', 'completed'
 * @returns {string} 资源路径
 */
export const getHuskieByLearningState = (learningState) => {
  const stateMap = {
    'correct': 'happy',
    'incorrect': 'confused',
    'studying': 'study',
    'idle': 'sleep',
    'completed': 'dragon',
    'achievement': 'crystal'
  };
  
  const huskieState = stateMap[learningState] || 'sleep';
  return getHuskieImage(huskieState);
};

