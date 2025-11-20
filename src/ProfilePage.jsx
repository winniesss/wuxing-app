import { lessons } from './data';
import { getOverallProgress, resetProgress } from './utils/progress';
import './App.css';

function ProfilePage({ currentView, onNavClick }) {

  const overallProgress = getOverallProgress(lessons.length);

  const handleResetProgress = () => {
    if (confirm('确定要重置所有学习进度吗？此操作不可恢复。')) {
      resetProgress();
      window.location.reload();
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">个人中心</h1>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-large">
            <span className="material-icons">person</span>
          </div>
          <h2 className="profile-name">学习者</h2>
          <p className="profile-subtitle">继续加油学习！</p>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <span className="material-icons">check_circle</span>
            </div>
            <div className="stat-content">
              <div className="stat-number">{overallProgress.completed}</div>
              <div className="stat-label">已完成关卡</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <span className="material-icons">trending_up</span>
            </div>
            <div className="stat-content">
              <div className="stat-number">{overallProgress.percentage}%</div>
              <div className="stat-label">总体进度</div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="action-button" onClick={handleResetProgress}>
            <span className="material-icons">refresh</span>
            <span>重置进度</span>
          </button>
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

export default ProfilePage;

