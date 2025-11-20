// 进度管理工具

const STORAGE_KEY = 'wuxing_progress';

// 获取所有进度
export const getProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    return {};
  }
};

// 保存进度
export const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('保存进度失败', e);
  }
};

// 获取特定关卡的进度
export const getLessonProgress = (lessonId) => {
  const progress = getProgress();
  return progress[lessonId] || {
    completed: false,
    score: 0,
    totalQuestions: 0,
    completedAt: null
  };
};

// 更新关卡进度
export const updateLessonProgress = (lessonId, score, totalQuestions) => {
  const progress = getProgress();
  const wasCompleted = progress[lessonId]?.completed || false;
  
  progress[lessonId] = {
    completed: true,
    score,
    totalQuestions,
    completedAt: Date.now()
  };
  saveProgress(progress);
  
  // 如果课程刚刚完成（之前未完成），解锁对应的徽章
  if (!wasCompleted && score === totalQuestions && totalQuestions > 0) {
    // 动态导入徽章工具，避免循环依赖
    import('./badges.js').then(({ unlockBadge, getBadgeIdByLessonId }) => {
      const badgeId = getBadgeIdByLessonId(lessonId);
      if (badgeId) {
        unlockBadge(badgeId);
      }
    });
  }
};

// 检查关卡是否已解锁
export const isLessonUnlocked = (lessonId) => {
  if (lessonId === 1) return true; // 第一关总是解锁的
  
  const progress = getProgress();
  // 检查前一关是否有进度（尝试过即可解锁下一关）
  const prevLessonId = lessonId - 1;
  const prevProgress = progress[prevLessonId];
  // 只要有进度记录（尝试过）就可以解锁下一关
  return prevProgress && prevProgress.totalQuestions > 0;
};

// 获取总体进度
export const getOverallProgress = (totalLessons) => {
  const progress = getProgress();
  const completedCount = Object.values(progress).filter(p => p.completed).length;
  return {
    completed: completedCount,
    total: totalLessons,
    percentage: Math.round((completedCount / totalLessons) * 100)
  };
};

// 重置所有进度
export const resetProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
};

