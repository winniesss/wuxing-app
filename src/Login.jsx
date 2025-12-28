import { useState, useEffect } from 'react';
import './App.css';
import { calculateBazi } from './utils/bazi/engine';
import { saveUserBaziProfile } from './utils/bazi/storage';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [birthday, setBirthday] = useState('');
  const [birthTime, setBirthTime] = useState('12:00');
  const [gender, setGender] = useState('male');

  useEffect(() => {
    // 检查是否已经登录
    const savedUser = localStorage.getItem('wuxing_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        onLogin(user);
      } catch (e) {
        // 如果解析失败，清除无效数据
        localStorage.removeItem('wuxing_user');
      }
    }
  }, [onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('请输入用户名');
      return;
    }

    if (isRegistering) {
      // 注册模式：检查用户名是否已存在
      const users = JSON.parse(localStorage.getItem('wuxing_users') || '{}');
      if (users[username]) {
        setError('用户名已存在');
        return;
      }
      
      // 创建新用户
      if (!password || password.length < 4) {
        setError('密码至少需要4位');
        return;
      }

      // 检查是否填写了生辰八字
      if (!birthday) {
        setError('请填写您的生辰八字（生日）');
        return;
      }

      users[username] = {
        username,
        password, // 实际应用中应该加密
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('wuxing_users', JSON.stringify(users));
      
      // 保存当前登录用户
      const user = { username, createdAt: users[username].createdAt };
      localStorage.setItem('wuxing_user', JSON.stringify(user));
      
      // 计算并保存生辰八字
      try {
        const bazi = calculateBazi(birthday, birthTime);
        const baziProfile = {
          birthday,
          birthTime,
          gender,
          ...bazi
        };
        saveUserBaziProfile(baziProfile);
      } catch (e) {
        console.error('保存八字失败', e);
        // 即使八字保存失败，也允许登录
      }
      
      onLogin(user);
    } else {
      // 登录模式：验证用户名和密码
      const users = JSON.parse(localStorage.getItem('wuxing_users') || '{}');
      const user = users[username];
      
      if (!user) {
        setError('用户名不存在');
        return;
      }
      
      if (user.password !== password) {
        setError('密码错误');
        return;
      }
      
      // 保存当前登录用户
      const userInfo = { username, createdAt: user.createdAt };
      localStorage.setItem('wuxing_user', JSON.stringify(userInfo));
      onLogin(userInfo);
    }
  };

  const handleWeChatLogin = async () => {
    try {
      setError('');
      
      // 微信登录逻辑
      // 注意：实际应用中需要配置微信开放平台的AppID和回调地址
      const WECHAT_APPID = process.env.VITE_WECHAT_APPID || '';
      
      if (!WECHAT_APPID) {
        // 如果没有配置AppID，使用模拟登录
        // 实际应用中应该跳转到微信授权页面
        const mockWeChatUser = {
          username: `微信用户_${Date.now()}`,
          loginType: 'wechat',
          createdAt: new Date().toISOString()
        };
        
        // 保存微信登录的用户信息
        localStorage.setItem('wuxing_user', JSON.stringify(mockWeChatUser));
        onLogin(mockWeChatUser);
        return;
      }

      // 如果有配置AppID，跳转到微信授权页面
      // 注意：这需要后端支持处理回调
      if (!window.location.protocol.includes('https')) {
        setError('微信登录需要 HTTPS 协议，当前为开发环境，使用模拟登录');
        // 即使有AppID，在非HTTPS环境下也使用模拟登录
        const mockWeChatUser = {
          username: `微信用户_${Date.now()}`,
          loginType: 'wechat',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('wuxing_user', JSON.stringify(mockWeChatUser));
        onLogin(mockWeChatUser);
        return;
      }

      // 生产环境：跳转到微信授权页面
      const redirectUri = encodeURIComponent(window.location.origin + '/auth/wechat');
      const wechatAuthUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${WECHAT_APPID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`;
      window.location.href = wechatAuthUrl;
    } catch (e) {
      console.error('微信登录失败', e);
      setError('微信登录失败，请稍后重试');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="login-logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="login-title">五行天干地支背诵</h1>
        </div>
        
        {/* 微信登录按钮 */}
        <button 
          type="button" 
          className="wechat-login-button"
          onClick={handleWeChatLogin}
          disabled={false}
        >
          <span className="wechat-icon-text">微信</span>
          微信登录
        </button>
        {!process.env.VITE_WECHAT_APPID && (
          <p style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '-10px', marginBottom: '10px' }}>
            （当前为模拟登录模式）
          </p>
        )}

        <div className="login-divider">
          <span className="login-divider-line"></span>
          <span className="login-divider-text">或</span>
          <span className="login-divider-line"></span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label htmlFor="username">用户名</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
              className="login-input"
              autoComplete="username"
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password">密码</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegistering ? "至少4位密码" : "请输入密码"}
              className="login-input"
              autoComplete="current-password"
            />
          </div>

          {isRegistering && (
            <>
              <div className="login-input-group">
                <label htmlFor="birthday">生辰八字 - 生日 *</label>
                <input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="login-input"
                  required
                />
              </div>

              <div className="login-input-group">
                <label htmlFor="birthTime">出生时间</label>
                <input
                  id="birthTime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="login-input"
                />
              </div>

              <div className="login-input-group">
                <label htmlFor="gender">性别</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="login-input"
                >
                  <option value="male">男</option>
                  <option value="female">女</option>
                </select>
              </div>
            </>
          )}

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            {isRegistering ? '注册' : '登录'}
          </button>

          <div className="login-switch">
            <button
              type="button"
              className="login-switch-button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
                setPassword('');
                setBirthday('');
                setBirthTime('12:00');
                setGender('male');
              }}
            >
              {isRegistering ? '已有账号？去登录' : '没有账号？去注册'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

