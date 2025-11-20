import { useEffect, useState } from 'react';
import { getAllBadges, isBadgeUnlocked, getBadgeIdByLessonId } from '../utils/badges';
import { lessons } from '../data';
import './BadgeGallery.css';

function BadgeGallery() {
  const [unlockedBadges, setUnlockedBadges] = useState(new Set());

  useEffect(() => {
    // 检查所有徽章的解锁状态
    const badges = getAllBadges();
    const unlocked = new Set();
    
    badges.forEach(badge => {
      if (isBadgeUnlocked(badge.id)) {
        unlocked.add(badge.id);
      }
    });
    
    setUnlockedBadges(unlocked);
    
    // 监听存储变化，实时更新徽章状态
    const handleStorageChange = () => {
      const newUnlocked = new Set();
      badges.forEach(badge => {
        if (isBadgeUnlocked(badge.id)) {
          newUnlocked.add(badge.id);
        }
      });
      setUnlockedBadges(newUnlocked);
    };
    
    window.addEventListener('storage', handleStorageChange);
    // 自定义事件监听（同页面内的更新）
    window.addEventListener('badgeUnlocked', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('badgeUnlocked', handleStorageChange);
    };
  }, []);

  // 获取所有徽章，按课程顺序排列
  const allBadges = lessons.map(lesson => {
    const badgeId = getBadgeIdByLessonId(lesson.id);
    return badgeId ? { lessonId: lesson.id, badgeId, lesson } : null;
  }).filter(Boolean);

  // 计算网格布局（每行3个）
  const badgesPerRow = 3;
  const rows = Math.ceil(Math.max(allBadges.length, 6) / badgesPerRow); // 至少显示6个位置

  return (
    <div className="badge-gallery">
      <div className="badge-gallery-header">
        <h2 className="badge-gallery-title">征程</h2>
        <p className="badge-gallery-subtitle">完成课程解锁徽章</p>
      </div>
      
      <div className="badge-gallery-grid">
        {Array.from({ length: rows * badgesPerRow }).map((_, index) => {
          const badgeData = allBadges[index];
          const isUnlocked = badgeData && unlockedBadges.has(badgeData.badgeId);
          
          return (
            <div key={index} className="badge-frame">
              {badgeData ? (
                <div className={`badge-slot ${isUnlocked ? 'unlocked' : 'locked'}`}>
                  {isUnlocked ? (
                    <div className="badge-content">
                      <img 
                        src={badgeData.badgeId ? `/assets/badge/${badgeData.badgeId}.svg` : ''}
                        alt={badgeData.badgeId}
                        className="badge-image"
                        onError={(e) => {
                          // 如果SVG加载失败，尝试PNG
                          e.target.src = `/assets/badge/${badgeData.badgeId}.png`;
                        }}
                      />
                      <div className="badge-glow"></div>
                    </div>
                  ) : (
                    <div className="badge-placeholder">
                      <span className="material-icons">lock_outline</span>
                      <span className="badge-placeholder-text">关卡{badgeData.lessonId}</span>
                    </div>
                  )}
                  {/* 挂轴装饰 */}
                  <div className="badge-scroll-top"></div>
                  <div className="badge-scroll-bottom"></div>
                </div>
              ) : (
                <div className="badge-slot empty">
                  <div className="badge-placeholder empty-placeholder">
                    <span className="material-icons">add</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BadgeGallery;

