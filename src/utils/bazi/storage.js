// 用户八字数据存储

const STORAGE_KEY = 'husky-bazi-profile';

// 获取用户八字配置
export function getUserBaziProfile() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error('读取八字配置失败', e);
    return null;
  }
}

// 保存用户八字配置
export function saveUserBaziProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return true;
  } catch (e) {
    console.error('保存八字配置失败', e);
    return false;
  }
}

// 清除用户八字配置
export function clearUserBaziProfile() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('清除八字配置失败', e);
    return false;
  }
}

