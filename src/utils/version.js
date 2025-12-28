// 版本管理工具

const CURRENT_VERSION = '1.0.0';
const VERSION_STORAGE_KEY = 'wuxing_app_version';

// 获取当前版本
export function getCurrentVersion() {
  return CURRENT_VERSION;
}

// 获取存储的版本
export function getStoredVersion() {
  return localStorage.getItem(VERSION_STORAGE_KEY) || CURRENT_VERSION;
}

// 保存版本
export function saveVersion(version) {
  localStorage.setItem(VERSION_STORAGE_KEY, version);
}

// 检查是否有新版本
export async function checkForUpdates() {
  try {
    // 方法1: 从package.json获取版本（开发环境）
    // 方法2: 从manifest.json或API获取版本（生产环境）
    // 这里使用简单的版本比较逻辑
    
    const storedVersion = getStoredVersion();
    const currentVersion = getCurrentVersion();
    
    // 比较版本号
    const hasUpdate = compareVersions(currentVersion, storedVersion) > 0;
    
    return {
      hasUpdate,
      currentVersion,
      storedVersion,
      latestVersion: currentVersion
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

