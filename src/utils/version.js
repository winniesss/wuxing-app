// 版本管理工具

// 从 package.json 导入版本（构建时会注入）
// 如果无法获取，使用默认版本
const DEFAULT_VERSION = '1.0.0';
const VERSION_STORAGE_KEY = 'wuxing_app_version';
const BUILD_TIME_KEY = 'wuxing_build_time';

// 获取当前版本（从 package.json 或环境变量）
export function getCurrentVersion() {
  // 尝试从 window 对象获取（HTML 中注入）
  if (typeof window !== 'undefined' && window.__APP_VERSION__) {
    return window.__APP_VERSION__;
  }
  // 尝试从全局变量获取（Vite define 注入）
  if (typeof __APP_VERSION__ !== 'undefined') {
    return __APP_VERSION__;
  }
  // 尝试从 import.meta.env 获取（Vite 构建时注入）
  if (import.meta.env.VITE_APP_VERSION) {
    return import.meta.env.VITE_APP_VERSION;
  }
  // 使用默认版本
  return DEFAULT_VERSION;
}

// 获取构建时间
export function getBuildTime() {
  // 尝试从 window 对象获取（HTML 中注入）
  if (typeof window !== 'undefined' && window.__BUILD_TIME__) {
    return window.__BUILD_TIME__;
  }
  // 尝试从全局变量获取（Vite define 注入）
  if (typeof __BUILD_TIME__ !== 'undefined') {
    return __BUILD_TIME__;
  }
  // 尝试从环境变量获取
  if (import.meta.env.VITE_BUILD_TIME) {
    return import.meta.env.VITE_BUILD_TIME;
  }
  return null;
}

// 获取存储的版本
export function getStoredVersion() {
  return localStorage.getItem(VERSION_STORAGE_KEY) || getCurrentVersion();
}

// 获取存储的构建时间
export function getStoredBuildTime() {
  return localStorage.getItem(BUILD_TIME_KEY);
}

// 保存版本和构建时间
export function saveVersion(version, buildTime = null) {
  localStorage.setItem(VERSION_STORAGE_KEY, version);
  if (buildTime) {
    localStorage.setItem(BUILD_TIME_KEY, buildTime);
  }
}

// 检查是否有新版本
export async function checkForUpdates() {
  try {
    const currentVersion = getCurrentVersion();
    const currentBuildTime = getBuildTime();
    const storedVersion = getStoredVersion();
    const storedBuildTime = getStoredBuildTime();
    
    // 判断是否是开发环境
    const isDev = import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    let hasUpdate = false;
    let versionChanged = false;
    let buildTimeChanged = false;
    
    if (isDev) {
      // 开发环境：只比较版本号，不比较构建时间（因为每次启动都会变）
      versionChanged = compareVersions(currentVersion, storedVersion) !== 0;
      hasUpdate = versionChanged;
    } else {
      // 生产环境：优先使用构建时间判断（更可靠）
      versionChanged = compareVersions(currentVersion, storedVersion) !== 0;
      buildTimeChanged = currentBuildTime && currentBuildTime !== storedBuildTime;
      
      // 如果有构建时间，优先使用构建时间判断
      // 如果没有构建时间，使用版本号判断
      hasUpdate = currentBuildTime ? buildTimeChanged : versionChanged;
    }
    
    // 如果检测到更新，更新存储的版本和构建时间
    if (hasUpdate) {
      saveVersion(currentVersion, currentBuildTime);
    }
    
    return {
      hasUpdate,
      currentVersion,
      storedVersion,
      latestVersion: currentVersion,
      currentBuildTime,
      storedBuildTime,
      versionChanged,
      buildTimeChanged,
      isDev
    };
  } catch (error) {
    console.error('检查更新失败', error);
    return {
      hasUpdate: false,
      currentVersion: getCurrentVersion(),
      storedVersion: getStoredVersion(),
      error: error.message
    };
  }
}

// 比较版本号 (例如: "1.0.0" vs "1.0.1")
function compareVersions(version1, version2) {
  const v1parts = version1.split('.').map(Number);
  const v2parts = version2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const v1part = v1parts[i] || 0;
    const v2part = v2parts[i] || 0;
    
    if (v1part > v2part) return 1;
    if (v1part < v2part) return -1;
  }
  
  return 0;
}

// 更新到新版本
export function updateToNewVersion() {
  try {
    const currentVersion = getCurrentVersion();
    saveVersion(currentVersion);
    
    // 清除可能的缓存
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    // 重新加载页面以应用更新
    window.location.reload();
    
    return true;
  } catch (error) {
    console.error('更新失败', error);
    return false;
  }
}

// 从远程检查版本（可选，需要配置API端点）
export async function checkRemoteVersion(apiUrl) {
  try {
    const response = await fetch(apiUrl || '/api/version', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('无法获取版本信息');
    }
    
    const data = await response.json();
    const remoteVersion = data.version || data.latestVersion;
    const currentVersion = getCurrentVersion();
    
    return {
      hasUpdate: compareVersions(remoteVersion, currentVersion) > 0,
      currentVersion,
      latestVersion: remoteVersion
    };
  } catch (error) {
    console.error('检查远程版本失败', error);
    return {
      hasUpdate: false,
      error: error.message
    };
  }
}

