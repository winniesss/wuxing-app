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

// 计算立春日期（简化算法，精确值需要查表）
function getLiChunDate(year) {
  // 立春通常在2月4日或5日
  // 更准确的近似：1900-1979年多为2月5日，1980年后多为2月4日
  // 但有些年份是2月3日或2月6日，这里使用简化处理
  if (year >= 1980) {
    // 1980年后多为2月4日，但有些年份是2月3日
    // 简化处理：使用2月4日
    return new Date(year, 1, 4); // 2月4日
  } else {
    // 1900-1979年多为2月5日
    return new Date(year, 1, 5); // 2月5日
  }
}

// 计算年柱（根据日期，考虑立春）
export function calculateYearPillar(date) {
  const targetDate = new Date(date);
  const year = targetDate.getFullYear();
  const liChunDate = getLiChunDate(year);
  
  // 如果日期在立春之前，年柱算上一年的
  let actualYear = year;
  if (targetDate < liChunDate) {
    actualYear = year - 1;
  }
  
  // 使用1924年为基准（甲子年）
  const baseYear = 1924;
  const baseGanIndex = 0; // 甲
  const baseZhiIndex = 0; // 子
  
  const diff = actualYear - baseYear;
  const ganIndex = ((baseGanIndex + diff) % 10 + 10) % 10;
  const zhiIndex = ((baseZhiIndex + diff) % 12 + 12) % 12;
  
  return {
    stem: TIAN_GAN[ganIndex],
    branch: DI_ZHI[zhiIndex]
  };
}

// 节气对应月份（简化处理，精确值需要查表）
// 立春(2月)寅月、惊蛰(3月)卯月、清明(4月)辰月、立夏(5月)巳月、
// 芒种(6月)午月、小暑(7月)未月、立秋(8月)申月、白露(9月)酉月、
// 寒露(10月)戌月、立冬(11月)亥月、大雪(12月)子月、小寒(1月)丑月
function getLunarMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();
  
  // 简化的节气日期（精确值需要查表）
  // 这里使用近似值，实际应用中应该使用精确的节气表
  const jieqiDates = {
    1: { month: 1, day: 6 },   // 小寒 1月6日左右
    2: { month: 2, day: 4 },   // 立春 2月4日左右
    3: { month: 3, day: 6 },   // 惊蛰 3月6日左右
    4: { month: 4, day: 5 },   // 清明 4月5日左右
    5: { month: 5, day: 6 },   // 立夏 5月6日左右
    6: { month: 6, day: 6 },   // 芒种 6月6日左右
    7: { month: 7, day: 7 },   // 小暑 7月7日左右
    8: { month: 8, day: 8 },   // 立秋 8月8日左右
    9: { month: 9, day: 8 },   // 白露 9月8日左右
    10: { month: 10, day: 8 }, // 寒露 10月8日左右
    11: { month: 11, day: 7 }, // 立冬 11月7日左右
    12: { month: 12, day: 7 },  // 大雪 12月7日左右
  };
  
  // 确定当前日期所在的农历月份
  // 从立春开始：寅月(2)、卯月(3)、辰月(4)、巳月(5)、午月(6)、未月(7)、
  // 申月(8)、酉月(9)、戌月(10)、亥月(11)、子月(12)、丑月(1)
  let lunarMonth = month;
  
  // 检查是否在节气之前
  const currentJieqi = jieqiDates[month];
  if (currentJieqi && day < currentJieqi.day) {
    lunarMonth = month - 1;
    if (lunarMonth === 0) lunarMonth = 12;
  }
  
  // 转换为从立春开始的月份（寅月=1）
  // 立春(2月)是寅月(1)，惊蛰(3月)是卯月(2)...
  const monthMap = {
    2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6,
    8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 1: 12
  };
  
  return monthMap[lunarMonth] || 1;
}

// 计算月柱（根据日期，使用节气）
export function calculateMonthPillar(date) {
  const yearPillar = calculateYearPillar(date);
  const yearGan = yearPillar.stem;
  const yearGanIndex = TIAN_GAN.indexOf(yearGan);
  
  // 月干推算表（根据年干，五虎遁）
  // 口诀：甲己之年丙作首，乙庚之年戊为头，丙辛之年寻庚起，丁壬壬寅顺水流，若问戊癸何处起，甲寅之上好追求
  const monthGanTable = {
    0: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3], // 甲年：丙寅、丁卯、戊辰、己巳、庚午、辛未、壬申、癸酉、甲戌、乙亥、丙子、丁丑
    1: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5], // 乙年：戊寅、己卯、庚辰、辛巳、壬午、癸未、甲申、乙酉、丙戌、丁亥、戊子、己丑
    2: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7], // 丙年：庚寅、辛卯、壬辰、癸巳、甲午、乙未、丙申、丁酉、戊戌、己亥、庚子、辛丑
    3: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 丁年：壬寅、癸卯、甲辰、乙巳、丙午、丁未、戊申、己酉、庚戌、辛亥、壬子、癸丑
    4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1], // 戊年：甲寅、乙卯、丙辰、丁巳、戊午、己未、庚申、辛酉、壬戌、癸亥、甲子、乙丑
    5: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3], // 己年：丙寅、丁卯、戊辰、己巳、庚午、辛未、壬申、癸酉、甲戌、乙亥、丙子、丁丑
    6: [4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5], // 庚年：戊寅、己卯、庚辰、辛巳、壬午、癸未、甲申、乙酉、丙戌、丁亥、戊子、己丑
    7: [6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7], // 辛年：庚寅、辛卯、壬辰、癸巳、甲午、乙未、丙申、丁酉、戊戌、己亥、庚子、辛丑
    8: [8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], // 壬年：壬寅、癸卯、甲辰、乙巳、丙午、丁未、戊申、己酉、庚戌、辛亥、壬子、癸丑
    9: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1], // 癸年：甲寅、乙卯、丙辰、丁巳、戊午、己未、庚申、辛酉、壬戌、癸亥、甲子、乙丑
  };
  
  const lunarMonth = getLunarMonth(date); // 1-12，从寅月(1)开始
  const monthIndex = lunarMonth - 1; // 转换为0-11索引
  const ganIndex = monthGanTable[yearGanIndex][monthIndex];
  
  // 月支：寅月(1)、卯月(2)、辰月(3)...丑月(12)
  const zhiIndex = (monthIndex + 2) % 12; // 寅月对应索引2
  
  return {
    stem: TIAN_GAN[ganIndex],
    branch: DI_ZHI[zhiIndex]
  };
}

// 计算一年中的第几天（从1月1日开始）
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

// 判断是否为闰年
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// 计算日柱（根据日期，使用标准公式）
// 公式：日干支序数 = [(年尾二位数 + 3) × 5 + 55 + (年尾二位数 - 1) ÷ 4 + 出生日期] mod 60
// 适用于1900-2099年
export function calculateDayPillar(date) {
  const targetDate = new Date(date);
  const year = targetDate.getFullYear();
  const yearTail = year % 100; // 年尾二位数
  const dayOfYear = getDayOfYear(targetDate); // 该年的第几天
  
  // 日干支序数公式
  // 注意：公式中的 (年尾二位数 - 1) ÷ 4 需要向下取整
  let ganZhiIndex = (yearTail + 3) * 5 + 55 + Math.floor((yearTail - 1) / 4) + dayOfYear;
  
  // 对于1900年，需要特殊处理（1900年不是闰年，但公式中按闰年处理）
  if (year === 1900) {
    // 1900年不是闰年，如果日期在3月1日之后，需要减1
    if (dayOfYear > 59) { // 3月1日是第60天
      ganZhiIndex -= 1;
    }
  }
  
  // 对于2000年及以后，需要根据是否闰年调整
  if (year >= 2000) {
    // 如果前一年不是闰年，且当前日期在3月1日之前，需要减1
    const prevYear = year - 1;
    if (!isLeapYear(prevYear) && dayOfYear <= 60) {
      ganZhiIndex -= 1;
    }
  }
  
  ganZhiIndex = ganZhiIndex % 60;
  if (ganZhiIndex < 0) ganZhiIndex += 60;
  
  // 天干序数 = ganZhiIndex % 10
  // 地支序数 = ganZhiIndex % 12
  const ganIndex = ganZhiIndex % 10;
  const zhiIndex = ganZhiIndex % 12;
  
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
  // 口诀：甲己还加甲，乙庚丙作初，丙辛从戊起，丁壬庚子居，戊癸何方发，壬子是真途
  const dayGanIndex = TIAN_GAN.indexOf(dayStem);
  const hourZhiIndex = DI_ZHI.indexOf(branch);
  
  // 五鼠遁表：根据日干确定各时辰的天干
  // 子时(0)、丑时(1)、寅时(2)、卯时(3)、辰时(4)、巳时(5)、
  // 午时(6)、未时(7)、申时(8)、酉时(9)、戌时(10)、亥时(11)
  const hourGanTable = {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // 甲日：甲子、乙丑、丙寅、丁卯、戊辰、己巳、庚午、辛未、壬申、癸酉、甲戌、乙亥
    1: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1], // 乙日：丙子、丁丑、戊寅、己卯、庚辰、辛巳、壬午、癸未、甲申、乙酉、丙戌、丁亥
    2: [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3], // 丙日：戊子、己丑、庚寅、辛卯、壬辰、癸巳、甲午、乙未、丙申、丁酉、戊戌、己亥
    3: [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5], // 丁日：庚子、辛丑、壬寅、癸卯、甲辰、乙巳、丙午、丁未、戊申、己酉、庚戌、辛亥
    4: [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7], // 戊日：壬子、癸丑、甲寅、乙卯、丙辰、丁巳、戊午、己未、庚申、辛酉、壬戌、癸亥
    5: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // 己日：甲子、乙丑、丙寅、丁卯、戊辰、己巳、庚午、辛未、壬申、癸酉、甲戌、乙亥（与甲日相同）
    6: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1], // 庚日：丙子、丁丑、戊寅、己卯、庚辰、辛巳、壬午、癸未、甲申、乙酉、丙戌、丁亥（与乙日相同）
    7: [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3], // 辛日：戊子、己丑、庚寅、辛卯、壬辰、癸巳、甲午、乙未、丙申、丁酉、戊戌、己亥（与丙日相同）
    8: [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5], // 壬日：庚子、辛丑、壬寅、癸卯、甲辰、乙巳、丙午、丁未、戊申、己酉、庚戌、辛亥（与丁日相同）
    9: [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7], // 癸日：壬子、癸丑、甲寅、乙卯、丙辰、丁巳、戊午、己未、庚申、辛酉、壬戌、癸亥（与戊日相同）
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
  
  // 解析时间
  let hour = 12; // 默认中午12点
  if (birthTime) {
    const [h, m] = birthTime.split(':').map(Number);
    hour = h || 12;
  }
  
  // 使用修正后的函数，传入完整日期对象
  const yearPillar = calculateYearPillar(date);
  const monthPillar = calculateMonthPillar(date);
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

