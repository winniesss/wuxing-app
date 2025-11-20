import { lessons } from './data';
import { getLessonProgress, getOverallProgress, isLessonUnlocked } from './utils/progress';
import { getHuskieImage } from './utils/huskieAssets';
import './App.css';

function LessonHome({ onSelectLesson, onGoToMap, currentView, onNavClick }) {

  const overallProgress = getOverallProgress(lessons.length);
  
  // 获取下一个可用的课程（未完成的已解锁课程）
  const getNextAvailableLesson = () => {
    return lessons.find(lesson => {
      if (!isLessonUnlocked(lesson.id)) return false;
      const progress = getLessonProgress(lesson.id);
      return !progress.completed;
    }) || lessons[0]; // 如果都完成了，返回第一个
  };

  const nextLesson = getNextAvailableLesson();
  const lessonProgress = getLessonProgress(nextLesson.id);
  const progressPercentage = lessonProgress.completed 
    ? Math.round((lessonProgress.score / lessonProgress.totalQuestions) * 100)
    : 0;

  // 获取所有已解锁的课程
  const unlockedLessons = lessons.filter(lesson => isLessonUnlocked(lesson.id));

  const handleGoClick = () => {
    onSelectLesson(nextLesson);
  };

  // 获取欢迎文本
  const getWelcomeText = () => {
    if (overallProgress.completed === 0) {
      return '那么，我们可以开始第一课了';
    } else if (overallProgress.completed === lessons.length) {
      return '恭喜！所有课程已完成，可以复习了';
    } else {
      return `继续学习第 ${nextLesson.id} 课`;
    }
  };

  // 计算今日剩余课程数
  const remainingLessons = unlockedLessons.filter(lesson => {
    const progress = getLessonProgress(lesson.id);
    return !progress.completed;
  }).length;

  return (
    <div className="lesson-home-container">
      {/* 顶部场景区域 */}
      <div className="home-scene">
        <div className="scene-background">
          <svg className="scene-svg" viewBox="0 0 750 340" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="wallGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CBECE8"/>
                <stop offset="100%" stopColor="#B9E0DB"/>
              </linearGradient>
              <linearGradient id="floorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6CC8C0"/>
                <stop offset="100%" stopColor="#56B6AF"/>
              </linearGradient>
              <filter id="softShadow" x="-20%" y="-20%" width="140%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.18"/>
              </filter>
            </defs>
            <rect x="0" y="0" width="750" height="220" fill="url(#wallGradient)"/>
            <path d="M0 180 Q375 230 750 180 L750 340 L0 340 Z" fill="url(#floorGradient)"/>
            <g transform="translate(560,80)">
              <path d="M0 80 Q0 0 40 0 Q80 0 80 80 L80 160 L0 160 Z" fill="#FDF8EC" filter="url(#softShadow)"/>
              <path d="M10 82 Q10 10 40 10 Q70 10 70 82 L70 152 L10 152 Z" fill="#F5A94A"/>
              <g transform="translate(40,45)">
                <circle cx="0" cy="0" r="20" fill="#FFFFFF"/>
                <circle cx="0" cy="0" r="16" fill="#D5EFFA"/>
                <line x1="-16" y1="0" x2="16" y2="0" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"/>
                <line x1="0" y1="-16" x2="0" y2="16" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"/>
              </g>
              <circle cx="63" cy="112" r="4" fill="#FFFFFF"/>
            </g>
            <ellipse cx="375" cy="245" rx="38" ry="12" fill="#3EA89C" opacity="0.35"/>
          </svg>
        </div>
        {/* Huskie 角色 */}
        <div className="scene-character">
          <img 
            src="/logo.png" 
            alt="招财哈士奇" 
            className="character-image"
            onError={(e) => {
              // 如果logo.png不存在，回退到原来的Huskie图片
              e.target.src = getHuskieImage(overallProgress.completed === lessons.length ? 'dragon' : 'happy');
            }}
          />
        </div>
      </div>

      {/* 进度和目标摘要 */}
      <div className="home-summary">
        <div className="summary-progress">
          <div className="progress-header">
            <span className="material-icons progress-icon">trending_up</span>
            <span className="progress-label">学习进度</span>
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${overallProgress.percentage}%` }}
              ></div>
            </div>
            <span className="progress-text">
              {overallProgress.completed} / {lessons.length} 关卡
            </span>
          </div>
        </div>
        <div className="summary-goals">
          <span className="material-icons goals-icon">calendar_today</span>
          <span className="goals-text">
            {remainingLessons > 0 ? `${remainingLessons} 个课程待学习` : '所有课程已完成！'}
          </span>
        </div>
      </div>

      {/* 课程列表 */}
      <div className="home-lessons">
        <div className="lessons-header">
          <h2 className="lessons-title">今日课程</h2>
        </div>
        <div className="lessons-list">
          {unlockedLessons.map((lesson) => {
            const progress = getLessonProgress(lesson.id);
            const totalQuestions = lesson.questions.length;
            // 只有全部答对（得分等于总题数）才算真正完成
            const isCompleted = progress.completed && 
                                 progress.totalQuestions > 0 && 
                                 progress.score > 0 &&
                                 progress.score === progress.totalQuestions &&
                                 progress.totalQuestions === totalQuestions;
            const currentScore = progress.completed && progress.totalQuestions > 0 
              ? progress.score 
              : 0;
            
            return (
              <div 
                key={lesson.id}
                className={`lesson-card ${isCompleted ? 'completed' : ''}`}
                onClick={() => onSelectLesson(lesson)}
              >
                <div className="lesson-card-status">
                  {isCompleted ? (
                    <div className="status-check">
                      <span className="material-icons">check_circle</span>
                    </div>
                  ) : (
                    <button className="status-button" onClick={(e) => {
                      e.stopPropagation();
                      onSelectLesson(lesson);
                    }}>
                      <span className="material-icons">play_arrow</span>
                    </button>
                  )}
                </div>
                <div className="lesson-card-content">
                  <div className="lesson-card-level">关卡{lesson.id}</div>
                  <div className="lesson-card-title">{lesson.title}</div>
                  <div className="lesson-card-meta">
                    <span className="lesson-card-category">{lesson.description}</span>
                  </div>
                </div>
                <div className="lesson-card-progress-text">
                  <span className="lesson-progress-text">
                    {currentScore} / {totalQuestions}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部导航 */}
      <div className="bottom-nav">
        <div 
          className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => onNavClick('home')}
        >
          <span className="material-icons">home</span>
        </div>
        <div 
          className={`nav-item ${currentView === 'map' ? 'active' : ''}`}
          onClick={() => onNavClick('map')}
        >
          <span className="material-icons">map</span>
        </div>
        <div 
          className={`nav-item ${currentView === 'profile' ? 'active' : ''}`}
          onClick={() => onNavClick('profile')}
        >
          <span className="material-icons">person</span>
        </div>
        <div 
          className={`nav-item ${currentView === 'chat' ? 'active' : ''}`}
          onClick={() => onNavClick('chat')}
        >
          <span className="material-icons">chat</span>
        </div>
      </div>
    </div>
  );
}

export default LessonHome;

