import { useState, useEffect } from 'react';
import { getUserBaziProfile, saveUserBaziProfile } from './utils/bazi/storage';
import { calculateBazi } from './utils/bazi/engine';
import { getCurrentVersion, checkForUpdates, updateToNewVersion } from './utils/version';
import './App.css';

// 天干地支选项
const TIAN_GAN_OPTIONS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DI_ZHI_OPTIONS = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

function SettingsPage({ currentView, onNavClick, user, onLogout }) {
  const [showBaziForm, setShowBaziForm] = useState(false);
  const [showManualEdit, setShowManualEdit] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [baziProfile, setBaziProfile] = useState({
    birthday: '',
    birthTime: '12:00',
    gender: ''
  });
  const [manualBazi, setManualBazi] = useState({
    yearStem: '',
    yearBranch: '',
    monthStem: '',
    monthBranch: '',
    dayStem: '',
    dayBranch: '',
    hourStem: '',
    hourBranch: ''
  });
  const [calculatedBazi, setCalculatedBazi] = useState(null);
  const [versionInfo, setVersionInfo] = useState(null);
  const [checkingUpdate, setCheckingUpdate] = useState(false);

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
        // 如果是手动编辑的，也加载到手动编辑表单
        if (saved.manualEdit) {
          setManualBazi({
            yearStem: saved.yearStem || '',
            yearBranch: saved.yearBranch || '',
            monthStem: saved.monthStem || '',
            monthBranch: saved.monthBranch || '',
            dayStem: saved.dayStem || '',
            dayBranch: saved.dayBranch || '',
            hourStem: saved.hourStem || '',
            hourBranch: saved.hourBranch || ''
          });
        }
      }
    }
    
    // 检查版本信息
    checkVersionInfo();
  }, []);

  // 检查版本信息
  const checkVersionInfo = async () => {
    const info = await checkForUpdates();
    setVersionInfo(info);
  };

  // 手动检查更新
  const handleCheckUpdate = async () => {
    setCheckingUpdate(true);
    try {
      const info = await checkForUpdates();
      setVersionInfo(info);
      if (info.hasUpdate) {
        alert(`发现新版本 ${info.latestVersion}！当前版本：${info.currentVersion}`);
      } else {
        alert('当前已是最新版本');
      }
    } catch (error) {
      alert('检查更新失败：' + error.message);
    } finally {
      setCheckingUpdate(false);
    }
  };

  // 更新到新版本
  const handleUpdateVersion = () => {
    if (confirm('确定要更新到新版本吗？页面将重新加载。')) {
      updateToNewVersion();
    }
  };

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

  // 手动编辑八字
  const handleManualBaziSubmit = (e) => {
    e.preventDefault();
    
    // 验证所有字段都已填写
    const requiredFields = ['yearStem', 'yearBranch', 'monthStem', 'monthBranch', 'dayStem', 'dayBranch', 'hourStem', 'hourBranch'];
    const missingFields = requiredFields.filter(field => !manualBazi[field]);
    
    if (missingFields.length > 0) {
      alert('请填写完整的八字信息');
      return;
    }

    // 验证天干地支是否有效
    const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    
    const isValidGan = (gan) => TIAN_GAN.includes(gan);
    const isValidZhi = (zhi) => DI_ZHI.includes(zhi);
    
    if (!isValidGan(manualBazi.yearStem) || !isValidZhi(manualBazi.yearBranch) ||
        !isValidGan(manualBazi.monthStem) || !isValidZhi(manualBazi.monthBranch) ||
        !isValidGan(manualBazi.dayStem) || !isValidZhi(manualBazi.dayBranch) ||
        !isValidGan(manualBazi.hourStem) || !isValidZhi(manualBazi.hourBranch)) {
      alert('请输入有效的天干地支（天干：甲乙丙丁戊己庚辛壬癸，地支：子丑寅卯辰巳午未申酉戌亥）');
      return;
    }

    // 保存手动输入的八字
    const fullProfile = {
      ...baziProfile,
      ...manualBazi,
      manualEdit: true // 标记为手动编辑
    };

    saveUserBaziProfile(fullProfile);
    setCalculatedBazi(fullProfile);
    setShowManualEdit(false);
    alert('八字已保存');
  };

  const handleManualBaziChange = (field, value) => {
    setManualBazi(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 导出所有数据
  const handleExportData = () => {
    try {
      const data = {
        progress: localStorage.getItem('wuxing_progress') || '{}',
        user: localStorage.getItem('wuxing_user') || '{}',
        badges: localStorage.getItem('wuxing_unlocked_badges') || '[]',
        bazi: localStorage.getItem('husky-bazi-profile') || '{}',
        users: localStorage.getItem('wuxing_users') || '{}',
        exportDate: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wuxing-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      alert('数据导出成功！');
    } catch (e) {
      console.error('导出失败', e);
      alert('导出失败：' + e.message);
    }
  };

  // 导入数据
  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        if (confirm('导入数据将覆盖当前所有数据，确定要继续吗？')) {
          if (data.progress) localStorage.setItem('wuxing_progress', data.progress);
          if (data.user) localStorage.setItem('wuxing_user', data.user);
          if (data.badges) localStorage.setItem('wuxing_unlocked_badges', data.badges);
          if (data.bazi) localStorage.setItem('husky-bazi-profile', data.bazi);
          if (data.users) localStorage.setItem('wuxing_users', data.users);
          
          alert('数据导入成功！页面将刷新。');
          window.location.reload();
        }
      } catch (e) {
        console.error('导入失败', e);
        alert('导入失败：文件格式不正确');
      }
    };
    reader.readAsText(file);
    // 重置input，以便可以重复选择同一文件
    e.target.value = '';
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
                  <span className="settings-item-label">通过生日修改</span>
                  <span className="settings-item-desc">输入生日和时间自动计算</span>
                </div>
                <div className="settings-item-action">
                  <span className="material-icons">chevron_right</span>
                </div>
              </div>
              
              <div className="settings-item" onClick={() => setShowManualEdit(true)}>
                <div className="settings-item-content">
                  <span className="settings-item-label">手动编辑八字</span>
                  <span className="settings-item-desc">直接输入天干地支</span>
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
          <h2 className="settings-section-title">数据管理</h2>
          
          <div className="settings-item" onClick={handleExportData}>
            <div className="settings-item-content">
              <span className="settings-item-label">保存现有记录</span>
              <span className="settings-item-desc">导出并备份学习进度和设置</span>
            </div>
            <div className="settings-item-action">
              <span className="material-icons">download</span>
            </div>
          </div>

          <div className="settings-item" onClick={() => {
            document.getElementById('import-data-input')?.click();
          }}>
            <div className="settings-item-content">
              <span className="settings-item-label">导入数据</span>
              <span className="settings-item-desc">恢复学习进度和设置</span>
            </div>
            <div className="settings-item-action">
              <span className="material-icons">upload</span>
            </div>
            <input
              id="import-data-input"
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImportData}
            />
          </div>
        </div>

        <div className="settings-section">
          <h2 className="settings-section-title">版本更新</h2>
          
          <div className="settings-item">
            <div className="settings-item-content">
              <span className="settings-item-label">当前版本</span>
              <span className="settings-item-desc">v{getCurrentVersion()}</span>
            </div>
          </div>

          {versionInfo && versionInfo.hasUpdate && (
            <div className="settings-item" onClick={handleUpdateVersion} style={{ backgroundColor: '#fff3cd' }}>
              <div className="settings-item-content">
                <span className="settings-item-label" style={{ color: '#856404', fontWeight: 'bold' }}>
                  发现新版本 v{versionInfo.latestVersion}
                </span>
                <span className="settings-item-desc">点击更新到最新版本</span>
              </div>
              <div className="settings-item-action">
                <span className="material-icons" style={{ color: '#856404' }}>system_update</span>
              </div>
            </div>
          )}

          <div className="settings-item" onClick={handleCheckUpdate} style={{ opacity: checkingUpdate ? 0.6 : 1 }}>
            <div className="settings-item-content">
              <span className="settings-item-label">检查更新</span>
              <span className="settings-item-desc">
                {checkingUpdate ? '正在检查...' : '检查是否有新版本可用'}
              </span>
            </div>
            <div className="settings-item-action">
              <span className="material-icons">refresh</span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="settings-section-title">关于</h2>
          
          <div className="settings-item">
            <div className="settings-item-content">
              <span className="settings-item-label">应用名称</span>
              <span className="settings-item-desc">五行天干地支背诵</span>
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

      {/* 手动编辑八字弹窗 */}
      {showManualEdit && (
        <div className="modal-overlay" onClick={() => setShowManualEdit(false)}>
          <div className="modal-content bazi-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>手动编辑八字</h2>
              <button className="modal-close" onClick={() => setShowManualEdit(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleManualBaziSubmit} className="bazi-form">
                <div className="form-group">
                  <label>年柱</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                      value={manualBazi.yearStem}
                      onChange={(e) => handleManualBaziChange('yearStem', e.target.value)}
                      className="form-input"
                      style={{ flex: 1 }}
                    >
                      <option value="">选择天干</option>
                      {TIAN_GAN_OPTIONS.map(gan => (
                        <option key={gan} value={gan}>{gan}</option>
                      ))}
                    </select>
                    <select
                      value={manualBazi.yearBranch}
                      onChange={(e) => handleManualBaziChange('yearBranch', e.target.value)}
                      className="form-input"
                      style={{ flex: 1 }}
                    >
                      <option value="">选择地支</option>
                      {DI_ZHI_OPTIONS.map(zhi => (
                        <option key={zhi} value={zhi}>{zhi}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>月柱</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                      value={manualBazi.monthStem}
                      onChange={(e) => handleManualBaziChange('monthStem', e.target.value)}
                      className="form-input"
                      style={{ flex: 1 }}
                    >
                      <option value="">选择天干</option>
                      {TIAN_GAN_OPTIONS.map(gan => (
                        <option key={gan} value={gan}>{gan}</option>
                      ))}
                    </select>
                    <select
                      value={manualBazi.monthBranch}
                      onChange={(e) => handleManualBaziChange('monthBranch', e.target.value)}
                      className="form-input"
                      style={{ flex: 1 }}
                    >
                      <option value="">选择地支</option>
                      {DI_ZHI_OPTIONS.map(zhi => (
                        <option key={zhi} value={zhi}>{zhi}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>日柱</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                      value={manualBazi.dayStem}
                      onChange={(e) => handleManualBaziChange('dayStem', e.target.value)}
                      className="form-input"
                      style={{ flex: 1 }}
                    >
                      <option value="">选择天干</option>
                      {TIAN_GAN_OPTIONS.map(gan => (
                        <option key={gan} value={gan}>{gan}</option>
                      ))}
                    </select>
                    <select
                      value={manualBazi.dayBranch}
                      onChange={(e) => handleManualBaziChange('dayBranch', e.target.value)}
                      className="form-input"
                      style={{ flex: 1 }}
                    >
                      <option value="">选择地支</option>
                      {DI_ZHI_OPTIONS.map(zhi => (
                        <option key={zhi} value={zhi}>{zhi}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>时柱</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                      value={manualBazi.hourStem}
                      onChange={(e) => handleManualBaziChange('hourStem', e.target.value)}
                      className="form-input"
                      style={{ flex: 1 }}
                    >
                      <option value="">选择天干</option>
                      {TIAN_GAN_OPTIONS.map(gan => (
                        <option key={gan} value={gan}>{gan}</option>
                      ))}
                    </select>
                    <select
                      value={manualBazi.hourBranch}
                      onChange={(e) => handleManualBaziChange('hourBranch', e.target.value)}
                      className="form-input"
                      style={{ flex: 1 }}
                    >
                      <option value="">选择地支</option>
                      {DI_ZHI_OPTIONS.map(zhi => (
                        <option key={zhi} value={zhi}>{zhi}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                  <p style={{ margin: '4px 0' }}><strong>示例：</strong>癸酉　丙辰　甲申　己巳</p>
                  <p style={{ margin: '4px 0' }}>天干：{TIAN_GAN_OPTIONS.join('、')}</p>
                  <p style={{ margin: '4px 0' }}>地支：{DI_ZHI_OPTIONS.join('、')}</p>
                </div>
                
                <button type="submit" className="form-submit-btn">
                  保存八字
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
}

export default SettingsPage;

