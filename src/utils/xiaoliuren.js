// 小六壬占卜工具

// 小六壬六个位置
const XIAOLIUREN_POSITIONS = [
  { name: '大安', meaning: '大吉', description: '身未动时，属木青龙，主一五七，凡事大吉，求谋一五七数' },
  { name: '留连', meaning: '凶', description: '卒未归时，属水玄武，主二八十，卒未归时，求谋二八十数' },
  { name: '速喜', meaning: '吉', description: '人便至时，属火朱雀，主三六九，人便至时，求谋三六九数' },
  { name: '赤口', meaning: '凶', description: '官事凶时，属金白虎，主四七十，官事凶时，求谋四七十数' },
  { name: '小吉', meaning: '大吉', description: '人来喜时，属木六合，主一五七，人来喜时，求谋一五七数' },
  { name: '空亡', meaning: '大凶', description: '音信稀时，属土勾陈，主三六九，音信稀时，求谋三六九数' }
];

// 根据3个数字进行小六壬占卜
export function calculateXiaoLiuRen(num1, num2, num3) {
  // 确保数字在1-6范围内
  const n1 = ((num1 - 1) % 6) + 1;
  const n2 = ((num2 - 1) % 6) + 1;
  const n3 = ((num3 - 1) % 6) + 1;
  
  // 从大安（索引0）开始，按数字移动
  let position = 0; // 起始位置：大安
  
  // 第一个数字：从大安开始，顺时针数
  position = (position + n1 - 1) % 6;
  
  // 第二个数字：从当前位置开始，顺时针数
  position = (position + n2 - 1) % 6;
  
  // 第三个数字：从当前位置开始，顺时针数
  position = (position + n3 - 1) % 6;
  
  return {
    position: position,
    result: XIAOLIUREN_POSITIONS[position],
    numbers: [n1, n2, n3]
  };
}

// 根据用户八字和数字生成占卜结果
export function generateXiaoLiuRenResult(num1, num2, num3, userBazi) {
  const result = calculateXiaoLiuRen(num1, num2, num3);
  const { name, meaning, description } = result.result;
  
  // 根据用户八字和结果生成个性化解读
  let interpretation = '';
  
  if (userBazi && userBazi.dayStem) {
    // 需要导入getElement函数，但为了避免循环依赖，这里简化处理
    const ganWuxing = {
      '甲': '木', '乙': '木',
      '丙': '火', '丁': '火',
      '戊': '土', '己': '土',
      '庚': '金', '辛': '金',
      '壬': '水', '癸': '水'
    };
    const userElement = ganWuxing[userBazi.dayStem] || '木';
    interpretation = `根据你的八字（日主${userBazi.dayStem}，五行${userElement}），结合小六壬占卜结果：`;
  } else {
    interpretation = '小六壬占卜结果：';
  }
  
  // 根据结果给出建议
  let advice = '';
  if (meaning === '大吉') {
    advice = '此卦大吉，宜把握时机，积极行动。适合学习新知识、开始新计划。';
  } else if (meaning === '吉') {
    advice = '此卦为吉，运势平稳，适合稳步推进。可以继续当前的学习计划。';
  } else if (meaning === '凶') {
    advice = '此卦为凶，需谨慎行事，避免冲动决策。建议多思考，稳中求进。';
  } else {
    advice = '此卦大凶，宜静不宜动。建议暂停重要决策，多观察，等待更好的时机。';
  }
  
  return {
    ...result,
    interpretation,
    advice,
    fullText: `${interpretation}\n\n【${name}】${meaning}\n\n${description}\n\n${advice}`
  };
}

// 从文本中提取3个数字
export function extractThreeNumbers(text) {
  // 匹配数字，包括中文数字
  const numberMap = {
    '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6,
    '七': 7, '八': 8, '九': 9, '十': 10,
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, '10': 10
  };
  
  // 提取所有数字
  const numbers = [];
  const regex = /[一二三四五六七八九十\d]/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const num = numberMap[match[0]] || parseInt(match[0]);
    if (num && num >= 1 && num <= 10) {
      numbers.push(num);
    }
  }
  
  // 如果找到3个或更多数字，返回前3个
  if (numbers.length >= 3) {
    return numbers.slice(0, 3);
  }
  
  return null;
}

