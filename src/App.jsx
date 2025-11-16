import { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import LessonHome from './LessonHome';
import LessonMap from './LessonMap';
import Quiz from './Quiz';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'map', 'quiz'
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    // 检查是否已经登录
    const savedUser = localStorage.getItem('wuxing_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (e) {
        localStorage.removeItem('wuxing_user');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('wuxing_user');
    setUser(null);
    setIsLoggedIn(false);
    setCurrentView('home');
    setSelectedLesson(null);
  };

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentView('quiz');
  };

  const handleBackToHome = () => {
    setSelectedLesson(null);
    setCurrentView('home');
  };

  const handleGoToMap = () => {
    setCurrentView('map');
  };

  const handleBackFromMap = () => {
    setCurrentView('home');
  };

  const handleNavClick = (view) => {
    if (view === 'home') {
      setCurrentView('home');
      setSelectedLesson(null);
    } else if (view === 'map') {
      setCurrentView('map');
    } else if (view === 'profile') {
      setCurrentView('profile');
      setSelectedLesson(null);
    } else if (view === 'settings') {
      setCurrentView('settings');
      setSelectedLesson(null);
    }
  };

  // 如果未登录，显示登录页面
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      {currentView === 'quiz' && selectedLesson ? (
        <Quiz
          lesson={selectedLesson}
          onBackToList={handleBackToHome}
          currentView={currentView}
          onNavClick={handleNavClick}
          onRestart={() => {
            // Quiz 组件内部会处理重启逻辑
          }}
        />
      ) : currentView === 'map' ? (
        <LessonMap 
          onSelectLesson={handleSelectLesson}
          onBack={handleBackFromMap}
          currentView={currentView}
          onNavClick={handleNavClick}
        />
      ) : currentView === 'profile' ? (
        <ProfilePage
          currentView={currentView}
          onNavClick={handleNavClick}
        />
      ) : currentView === 'settings' ? (
        <SettingsPage
          currentView={currentView}
          onNavClick={handleNavClick}
          user={user}
          onLogout={handleLogout}
        />
      ) : (
        <LessonHome 
          onSelectLesson={handleSelectLesson}
          onGoToMap={handleGoToMap}
          currentView={currentView}
          onNavClick={handleNavClick}
        />
      )}
    </div>
  );
}

export default App;
