import { useState, useEffect } from 'react';
import './App.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

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

      users[username] = {
        username,
        password, // 实际应用中应该加密
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('wuxing_users', JSON.stringify(users));
      
      // 保存当前登录用户
      const user = { username, createdAt: users[username].createdAt };
      localStorage.setItem('wuxing_user', JSON.stringify(user));
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

  const handleWeChatLogin = () => {
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
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/wechat');
    const wechatAuthUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${WECHAT_APPID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`;
    window.location.href = wechatAuthUrl;
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
        >
          <span className="wechat-icon-text">微信</span>
          微信登录
        </button>

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

