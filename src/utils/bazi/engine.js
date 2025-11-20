// 八字计算引擎

// 天干数组
const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支数组
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 天干五行映射
const GAN_WUXING = {
  '甲': 'wood', '乙': 'wood',
  '丙': 'fire', '丁': 'fire',
  '戊': 'earth', '己': 'earth',
  '庚': 'metal', '辛': 'metal',
  '壬': 'water', '癸': 'water'
};

// 地支五行映射
const ZHI_WUXING = {
  '寅': 'wood', '卯': 'wood',
  '巳': 'fire', '午': 'fire',
  '辰': 'earth', '戌': 'earth', '丑': 'earth', '未': 'earth',
  '申': 'metal', '酉': 'metal',
  '亥': 'water', '子': 'water'
};

// 计算年柱（根据年份）
export function calculateYearPillar(year) {
  // 1900年是庚子年，以此为基准计算
  const baseYear = 1900;
  const baseGanIndex = 6; // 庚
  const baseZhiIndex = 0; // 子
  
  const diff = year - baseYear;
  const ganIndex = (baseGanIndex + diff) % 10;
  const zhiIndex = (baseZhiIndex + diff) % 12;
  
  return {
    stem: TIAN_GAN[ganIndex],
    branch: DI_ZHI[zhiIndex]
  };
}

// 计算月柱（根据年份和月份）
export function calculateMonthPillar(year, month) {
  // 根据年干确定月干
  const yearGan = calculateYearPillar(year).stem;
  const yearGanIndex = TIAN_GAN.indexOf(yearGan);
  
  // 月干推算表（根据年干）
  const monthGanTable = {
    0: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3], // 甲年
    1: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3], // 乙年
    2: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5], // 丙年
    3: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5], // 丁年
    4: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7], // 戊年
    5: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7], // 己年
    6: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 庚年
    7: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 辛年
    8: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1], // 壬年
    9: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1], // 癸年
  };
  
  const monthIndex = month - 1; // 月份从0开始
  const ganIndex = monthGanTable[yearGanIndex][monthIndex];
  
  // 月支固定：正月寅、二月卯...十二月丑
  const zhiIndex = (monthIndex + 2) % 12; // 正月对应寅（索引2）
  
  return {
    stem: TIAN_GAN[ganIndex],
    branch: DI_ZHI[zhiIndex]
  };
}

// 计算日柱（根据日期）
export function calculateDayPillar(date) {
  // 简化算法：使用1900年1月1日为基准（甲子日）
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(date);
  
  const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  
  // 天干10天循环，地支12天循环
  const ganIndex = (diffDays + 0) % 10; // 1900-01-01是甲日
  const zhiIndex = (diffDays + 0) % 12; // 1900-01-01是子日
  
  return {
    stem: TIAN_GAN[ganIndex],
    branch: DI_ZHI[zhiIndex]
  };
}

// 计算时柱（根据日干和时辰）
export function calculateHourPillar(dayStem, hour) {
  // 时辰对应地支：23-1子，1-3丑，3-5寅...21-23亥
  const hourZhiMap = [
    { range: [23, 24, 0, 1], zhi: '子' },
    { range: [1, 3], zhi: '丑' },
    { range: [3, 5], zhi: '寅' },
    { range: [5, 7], zhi: '卯' },
    { range: [7, 9], zhi: '辰' },
    { range: [9, 11], zhi: '巳' },
    { range: [11, 13], zhi: '午' },
    { range: [13, 15], zhi: '未' },
    { range: [15, 17], zhi: '申' },
    { range: [17, 19], zhi: '酉' },
    { range: [19, 21], zhi: '戌' },
    { range: [21, 23], zhi: '亥' },
  ];
  
  let branch = '子';
  for (const item of hourZhiMap) {
    if (item.range.includes(hour)) {
      branch = item.zhi;
      break;
    }
  }
  
  // 根据日干确定时干（五鼠遁）
  const dayGanIndex = TIAN_GAN.indexOf(dayStem);
  const hourZhiIndex = DI_ZHI.indexOf(branch);
  
  const hourGanTable = {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // 甲日
    1: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1], // 乙日
    2: [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3], // 丙日
    3: [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5], // 丁日
    4: [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7], // 戊日
    5: [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 己日
    6: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // 庚日
    7: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1], // 辛日
    8: [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3], // 壬日
    9: [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5], // 癸日
  };
  
  const ganIndex = hourGanTable[dayGanIndex][hourZhiIndex] % 10;
  
  return {
    stem: TIAN_GAN[ganIndex],
    branch: branch
  };
}

// 计算完整八字
export function calculateBazi(birthday, birthTime) {
  const date = new Date(birthday);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // 解析时间
  let hour = 12; // 默认中午12点
  if (birthTime) {
    const [h, m] = birthTime.split(':').map(Number);
    hour = h || 12;
  }
  
  const yearPillar = calculateYearPillar(year);
  const monthPillar = calculateMonthPillar(year, month);
  const dayPillar = calculateDayPillar(birthday);
  const hourPillar = calculateHourPillar(dayPillar.stem, hour);
  
  return {
    yearStem: yearPillar.stem,
    yearBranch: yearPillar.branch,
    monthStem: monthPillar.stem,
    monthBranch: monthPillar.branch,
    dayStem: dayPillar.stem,
    dayBranch: dayPillar.branch,
    hourStem: hourPillar.stem,
    hourBranch: hourPillar.branch,
  };
}

// 获取五行
export function getElement(ganOrZhi) {
  return GAN_WUXING[ganOrZhi] || ZHI_WUXING[ganOrZhi] || null;
}

