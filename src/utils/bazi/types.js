// 生辰八字数据类型定义

export const UserBaziProfile = {
  birthday: '',           // 生日 YYYY-MM-DD
  birthTime: '',         // 出生时间 HH:mm
  timezone: '',          // 时区（可选）
  gender: '',            // 性别：'male' | 'female' | ''

  // 计算出的八字
  yearStem: '',          // 年干
  yearBranch: '',        // 年支
  monthStem: '',         // 月干
  monthBranch: '',       // 月支
  dayStem: '',           // 日干
  dayBranch: '',         // 日支
  hourStem: '',          // 时干
  hourBranch: '',        // 时支

  favoriteElement: null, // 喜用神：'wood' | 'fire' | 'earth' | 'metal' | 'water' | null
};

export const DailyTip = {
  date: '',              // 日期 YYYY-MM-DD
  title: '',             // 标题
  summary: '',           // 摘要
  focus: [],             // 今日适合
  avoid: [],             // 今日避免
  elementHint: '',       // 五行提示
};

