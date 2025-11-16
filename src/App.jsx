import { useState } from 'react';
import './App.css';
import LessonHome from './LessonHome';
import LessonMap from './LessonMap';
import Quiz from './Quiz';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'map', 'quiz'
  const [selectedLesson, setSelectedLesson] = useState(null);

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
