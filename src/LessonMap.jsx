import { useState } from 'react';
import { lessons } from './data';
import { isLessonUnlocked, getLessonProgress, getProgress } from './utils/progress';
import './App.css';

function LessonMap({ onSelectLesson, currentView, onNavClick }) {
  const [showReview, setShowReview] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRecords, setShowRecords] = useState(false);

  const getLessonStatus = (lesson) => {
    const unlocked = isLessonUnlocked(lesson.id);
    const progress = getLessonProgress(lesson.id);
    const totalQuestions = lesson.questions.length;
    
    if (!unlocked) {
      return { status: 'locked', progress: 0 };
    }
    // 只有全部答对（得分等于总题数）才算真正完成
    if (progress.completed && 
        progress.totalQuestions > 0 && 
        progress.score > 0 &&
        progress.score === progress.totalQuestions &&
        progress.totalQuestions === totalQuestions) {
      const percentage = Math.round((progress.score / progress.totalQuestions) * 100);
      return { status: 'completed', progress: percentage };
    }
    return { status: 'available', progress: 0 };
  };


  // 找到第一个可用的关卡（未完成的）
  const getNextAvailableLesson = () => {
    // 先找第一个未完成的可用关卡
    const available = lessons.find(lesson => {
      const { status } = getLessonStatus(lesson);
      return status === 'available';
    });
    if (available) return available;
    
    // 如果都完成了，返回第一个
    return lessons[0];
  };

  const nextLesson = getNextAvailableLesson();

  // 获取已完成的课程列表（用于复习）
  const getCompletedLessons = () => {
    const progress = getProgress();
    return lessons.filter(lesson => {
      const lessonProgress = progress[lesson.id];
      return lessonProgress && 
             lessonProgress.completed && 
             lessonProgress.totalQuestions > 0 &&
             lessonProgress.score === lessonProgress.totalQuestions &&
             lessonProgress.totalQuestions === lesson.questions.length;
    });
  };

  const completedLessons = getCompletedLessons();

  // 处理复习按钮点击
  const handleReview = () => {
    if (completedLessons.length > 0) {
      setShowReview(true);
    } else {
      alert('还没有完成的课程可以复习');
    }
  };

  // 处理日历按钮点击
  const handleCalendar = () => {
    setShowCalendar(true);
  };

  // 处理文档按钮点击
  const handleRecords = () => {
    setShowRecords(true);
  };

  return (
    <div className="lesson-map-container">
      <div className="map-header">
        <div className="map-header-left">
          <button className="map-icon-button" onClick={handleCalendar} title="学习日历">
            <span className="material-icons">calendar_today</span>
          </button>
          <button className="map-icon-button" onClick={handleRecords} title="学习记录">
            <span className="material-icons">description</span>
          </button>
        </div>
        <button className="review-button" onClick={handleReview}>复习</button>
        <div className="map-header-right">
          <div className="user-avatar" onClick={() => onNavClick('profile')} style={{ cursor: 'pointer' }}>
            <span className="material-icons">person</span>
          </div>
        </div>
      </div>

      <div className="map-content">
        <div className="map-path">
          {lessons.map((lesson, index) => {
            const { status, progress } = getLessonStatus(lesson);
            const isLast = index === lessons.length - 1;
            
            return (
              <div key={lesson.id} className="map-unit-group">
                <div 
                  className={`map-unit ${status}`}
                  onClick={() => status !== 'locked' && onSelectLesson(lesson)}
                  style={{ cursor: status === 'locked' ? 'not-allowed' : 'pointer' }}
                >
                  {status === 'locked' ? (
                    <>
                      <div className="unit-lock-icon">
                        <span className="material-icons">lock</span>
                      </div>
                    </>
                  ) : status === 'completed' ? (
                    <>
                      <div className="unit-check-icon">
                        <span className="material-icons">check_circle</span>
                      </div>
                      <div className="unit-title">{lesson.title}</div>
                      <div className="unit-progress-badge">{progress}%</div>
                    </>
                  ) : (
                    <>
                      <div className="unit-number">{lesson.id}</div>
                      <div className="unit-title">{lesson.title}</div>
                    </>
                  )}
                </div>
                {!isLast && <div className="map-path-line"></div>}
              </div>
            );
          })}
        </div>

        {nextLesson && (
          <div className="start-button-container">
            <button 
              className="start-button"
              onClick={() => onSelectLesson(nextLesson)}
            >
              <span className="material-icons start-icon">play_arrow</span>
              <span className="start-text">开始学习</span>
            </button>
          </div>
        )}
      </div>

      {/* 复习弹窗 */}
      {showReview && (
        <div className="modal-overlay" onClick={() => setShowReview(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>选择要复习的课程</h2>
              <button className="modal-close" onClick={() => setShowReview(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              {completedLessons.length === 0 ? (
                <p>还没有完成的课程</p>
              ) : (
                <div className="review-lessons-list">
                  {completedLessons.map(lesson => (
                    <div 
                      key={lesson.id} 
                      className="review-lesson-item"
                      onClick={() => {
                        onSelectLesson(lesson);
                        setShowReview(false);
                      }}
                    >
                      <div className="review-lesson-title">{lesson.title}</div>
                      <div className="review-lesson-desc">{lesson.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 日历弹窗 */}
      {showCalendar && (
        <div className="modal-overlay" onClick={() => setShowCalendar(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>学习日历</h2>
              <button className="modal-close" onClick={() => setShowCalendar(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="calendar-info">
                <p>今日已完成：{completedLessons.length} / {lessons.length} 个课程</p>
                <p>继续加油！</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 学习记录弹窗 */}
      {showRecords && (
        <div className="modal-overlay" onClick={() => setShowRecords(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>学习记录</h2>
              <button className="modal-close" onClick={() => setShowRecords(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="records-list">
                {lessons.map(lesson => {
                  const progress = getLessonProgress(lesson.id);
                  if (progress.totalQuestions === 0) return null;
                  return (
                    <div key={lesson.id} className="record-item">
                      <div className="record-title">{lesson.title}</div>
                      <div className="record-progress">
                        得分：{progress.score} / {progress.totalQuestions}
                        {progress.completed && progress.score === progress.totalQuestions && (
                          <span className="record-badge">已完成</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

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
        <div className="nav-item" onClick={() => onNavClick('profile')}>
          <span className="material-icons">person</span>
        </div>
        <div className="nav-item" onClick={() => onNavClick('settings')}>
          <span className="material-icons">settings</span>
        </div>
      </div>
    </div>
  );
}

export default LessonMap;

