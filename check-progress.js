// 检查本地存储的进度
if (typeof window !== 'undefined' && window.localStorage) {
  const progress = JSON.parse(localStorage.getItem('wuxing_progress') || '{}');
  console.log('当前进度:', progress);
  Object.keys(progress).forEach(key => {
    console.log(`课程 ${key}:`, progress[key]);
  });
} else {
  console.log('无法访问 localStorage');
}
