import './App.css';

function SettingsPage({ currentView, onNavClick }) {

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">设置</h1>
      </div>

      <div className="settings-content">

        <div className="settings-section">
          <h2 className="settings-section-title">关于</h2>
          
          <div className="settings-item">
            <div className="settings-item-content">
              <span className="settings-item-label">版本信息</span>
              <span className="settings-item-desc">v1.0.0</span>
            </div>
          </div>

          <div className="settings-item">
            <div className="settings-item-content">
              <span className="settings-item-label">帮助与反馈</span>
            </div>
            <div className="settings-item-action">
              <span className="material-icons">chevron_right</span>
            </div>
          </div>
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
        <div className="nav-item" onClick={() => onNavClick('profile')}>
          <span className="material-icons">person</span>
        </div>
        <div className="nav-item active">
          <span className="material-icons">settings</span>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;

