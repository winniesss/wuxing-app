import { useState, useEffect } from 'react';
import { getUserBaziProfile, saveUserBaziProfile } from './utils/bazi/storage';
import { calculateBazi } from './utils/bazi/engine';
import './App.css';

function SettingsPage({ currentView, onNavClick, user, onLogout }) {
  const [showBaziForm, setShowBaziForm] = useState(false);
  const [baziProfile, setBaziProfile] = useState({
    birthday: '',
    birthTime: '12:00',
    gender: ''
  });
  const [calculatedBazi, setCalculatedBazi] = useState(null);

  useEffect(() => {
    // 加载已保存的八字配置
    const saved = getUserBaziProfile();
    if (saved) {
      setBaziProfile({
        birthday: saved.birthday || '',
        birthTime: saved.birthTime || '12:00',
        gender: saved.gender || ''
      });
      if (saved.dayStem) {
        setCalculatedBazi(saved);
      }
    }
  }, []);

  const handleBaziSubmit = (e) => {
    e.preventDefault();
    
    if (!baziProfile.birthday) {
      alert('请选择生日');
      return;
    }

    // 计算八字
    const bazi = calculateBazi(baziProfile.birthday, baziProfile.birthTime);
    
    const fullProfile = {
      ...baziProfile,
      ...bazi
    };

    // 保存
    saveUserBaziProfile(fullProfile);
    setCalculatedBazi(fullProfile);
    setShowBaziForm(false);
    alert('八字配置已保存');
  };

  const handleBaziChange = (field, value) => {
    setBaziProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1 className="settings-title">设置</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2 className="settings-section-title">账户</h2>
          
          {user && (
            <div className="settings-item">
              <div className="settings-item-content">
                <span className="settings-item-label">用户名</span>
                <span className="settings-item-desc">{user.username}</span>
              </div>
            </div>
          )}
          
          <div className="settings-item" onClick={onLogout}>
            <div className="settings-item-content">
              <span className="settings-item-label" style={{ color: '#f44336' }}>退出登录</span>
            </div>
            <div className="settings-item-action">
              <span className="material-icons">logout</span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="settings-section-title">生辰八字</h2>
          
          {calculatedBazi ? (
            <>
              <div className="settings-item">
                <div className="settings-item-content">
                  <span className="settings-item-label">八字</span>
                  <div className="bazi-display">
                    <span className="bazi-pillar">
                      {calculatedBazi.yearStem}{calculatedBazi.yearBranch}
                    </span>
                    <span className="bazi-pillar">
                      {calculatedBazi.monthStem}{calculatedBazi.monthBranch}
                    </span>
                    <span className="bazi-pillar">
                      {calculatedBazi.dayStem}{calculatedBazi.dayBranch}
                    </span>
                    <span className="bazi-pillar">
                      {calculatedBazi.hourStem}{calculatedBazi.hourBranch}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="settings-item" onClick={() => setShowBaziForm(true)}>
                <div className="settings-item-content">
                  <span className="settings-item-label">修改八字</span>
                </div>
                <div className="settings-item-action">
                  <span className="material-icons">chevron_right</span>
                </div>
              </div>
            </>
          ) : (
            <div className="settings-item" onClick={() => setShowBaziForm(true)}>
              <div className="settings-item-content">
                <span className="settings-item-label">设置生辰八字</span>
                <span className="settings-item-desc">用于生成每日修行提醒</span>
              </div>
              <div className="settings-item-action">
                <span className="material-icons">chevron_right</span>
              </div>
            </div>
          )}
        </div>

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

      {/* 八字设置弹窗 */}
      {showBaziForm && (
        <div className="modal-overlay" onClick={() => setShowBaziForm(false)}>
          <div className="modal-content bazi-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>设置生辰八字</h2>
              <button className="modal-close" onClick={() => setShowBaziForm(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleBaziSubmit} className="bazi-form">
                <div className="form-group">
                  <label htmlFor="birthday">生日 *</label>
                  <input
                    id="birthday"
                    type="date"
                    value={baziProfile.birthday}
                    onChange={(e) => handleBaziChange('birthday', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="birthTime">出生时间</label>
                  <input
                    id="birthTime"
                    type="time"
                    value={baziProfile.birthTime}
                    onChange={(e) => handleBaziChange('birthTime', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="gender">性别</label>
                  <select
                    id="gender"
                    value={baziProfile.gender}
                    onChange={(e) => handleBaziChange('gender', e.target.value)}
                    className="form-input"
                  >
                    <option value="">不选择</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                  </select>
                </div>
                
                <button type="submit" className="form-submit-btn">
                  保存并计算八字
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

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

export default SettingsPage;

