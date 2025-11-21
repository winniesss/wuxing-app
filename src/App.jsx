import { useState, useEffect, useRef } from 'react';
import './index.css';
import Login from './Login';
import Quiz from './Quiz';
import ChatPage from './components/ChatPage';
import SettingsPage from './SettingsPage';
import { 
  Play, CheckCircle2, BookOpen, User, MessageSquare, Home, 
  ChevronRight, Calendar, Trophy, MoreHorizontal, Map as MapIcon, 
  Award, Lock, Send, RefreshCw, Settings, Bell, Shield, FileText
} from 'lucide-react';
import { lessons } from './data';
import { getLessonProgress, getOverallProgress, isLessonUnlocked } from './utils/progress';
import { getBadgeIdByLessonId, getBadgeConfig, isBadgeUnlocked } from './utils/badges';
import { getUserBaziProfile } from './utils/bazi/storage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [subTab, setSubTab] = useState('map'); // for learn view

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
    setActiveTab('home');
    setSelectedLesson(null);
  };

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setActiveTab('quiz');
  };

  const handleBackToHome = () => {
    setSelectedLesson(null);
    setActiveTab('home');
  };

  // 如果未登录，显示登录页面
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // 如果选择了课程，显示 Quiz 页面
  if (activeTab === 'quiz' && selectedLesson) {
    return (
      <Quiz
        lesson={selectedLesson}
        onBackToList={handleBackToHome}
        currentView={activeTab}
        onNavClick={(view) => {
          if (view === 'home') {
            setActiveTab('home');
            setSelectedLesson(null);
          } else {
            setActiveTab(view);
            setSelectedLesson(null);
          }
        }}
        onRestart={() => {}}
      />
    );
  }

  // 获取用户数据
  const overallProgress = getOverallProgress(lessons.length);
  const userBazi = getUserBaziProfile();

  // 获取课程列表数据
  const unlockedLessons = lessons.filter(lesson => isLessonUnlocked(lesson.id));
  const courseList = lessons.map(lesson => {
    const progress = getLessonProgress(lesson.id);
    const totalQuestions = lesson.questions.length;
    const isCompleted = progress.completed && 
                       progress.totalQuestions > 0 && 
                       progress.score > 0 &&
                       progress.score === progress.totalQuestions &&
                       progress.totalQuestions === totalQuestions;
    
    let status = 'locked';
    if (isCompleted) {
      status = 'completed';
    } else if (isLessonUnlocked(lesson.id)) {
      status = 'current';
    }

    const colors = [
      { color: "bg-blue-500", lightColor: "bg-blue-50 text-blue-600" },
      { color: "bg-indigo-500", lightColor: "bg-indigo-50 text-indigo-600" },
      { color: "bg-emerald-500", lightColor: "bg-emerald-50 text-emerald-600" },
      { color: "bg-purple-500", lightColor: "bg-purple-50 text-purple-600" },
      { color: "bg-pink-500", lightColor: "bg-pink-50 text-pink-600" },
      { color: "bg-orange-500", lightColor: "bg-orange-50 text-orange-600" },
    ];

    return {
      id: lesson.id,
      level: `关卡 ${lesson.id}`,
      title: lesson.title,
      subtitle: lesson.description,
      progress: progress.score || 0,
      total: totalQuestions,
      ...colors[(lesson.id - 1) % colors.length],
      status,
      lesson: lesson
    };
  });

  // 动态头部标题
  const getHeaderContent = () => {
    switch(activeTab) {
      case 'home': return { title: '学习进度', showStats: true };
      case 'learn': return { title: '修行之路', showStats: false };
      case 'chat': return { title: '修行聊天', showStats: false };
      case 'profile': return { title: '个人中心', showStats: false };
      default: return { title: 'App', showStats: true };
    }
  };

  const headerData = getHeaderContent();

  // 首页组件
  const HomeView = () => {
    // 过滤出未完成的课程（排除已完成的）
    const incompleteCourses = courseList.filter(course => course.status !== 'completed');
    const remainingCount = unlockedLessons.filter(lesson => {
      const progress = getLessonProgress(lesson.id);
      return !progress.completed;
    }).length;
    
    return (
      <div className="space-y-0">
        {/* 顶部绿色区域 - 用户信息和进度 */}
        <div className="bg-gradient-to-b from-emerald-500 to-teal-600 px-6 pt-6 pb-6 -mx-6 -mt-6 mb-6">
          {/* 顶部导航栏 */}
          <div className="flex items-center justify-between mb-6">
            <BookOpen size={24} className="text-white" />
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl mb-1 shadow-lg">
                  {user?.username ? user.username.charAt(0).toUpperCase() : '🧘'}
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  Lv. {Math.max(1, Math.floor(overallProgress.completed / 3) + 1)}
                </div>
              </div>
            </div>
            <MoreHorizontal size={24} className="text-white" />
          </div>

          {/* 进度条区域 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Trophy size={20} />
              <span className="font-medium">学习进度</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                  style={{ width: `${overallProgress.percentage}%` }}
                ></div>
              </div>
              <span className="text-white font-semibold text-sm whitespace-nowrap">
                {overallProgress.completed}/{lessons.length} 关卡
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <FileText size={18} />
              <span className="text-sm">{remainingCount} 个课程待学习</span>
            </div>
          </div>
        </div>

        {/* 今日课程标题 */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 className="text-2xl font-bold text-slate-900">今日课程</h3>
        </div>
        {incompleteCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-slate-600 text-lg font-medium">恭喜！所有课程已完成</p>
            <p className="text-slate-400 text-sm mt-2">可以前往"学习"页面查看全部课程</p>
          </div>
        ) : (
          <div className="space-y-4">
            {incompleteCourses.map((course) => (
          <div 
            key={course.id} 
            className={`group bg-white border-2 rounded-xl p-6 transition-all touch-manipulation shadow-sm ${
              course.status !== 'locked' 
                ? 'cursor-pointer active:bg-slate-50 active:border-teal-400 active:shadow-md active:scale-[0.98] border-slate-200' 
                : 'cursor-not-allowed opacity-60 border-slate-200'
            }`}
            onClick={() => course.status !== 'locked' && handleSelectLesson(course.lesson)}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                course.status !== 'locked' 
                  ? 'bg-gradient-to-br from-teal-400 to-emerald-500 text-white shadow-md' 
                  : 'bg-slate-200 text-slate-400'
              }`}>
                <span className="text-xl font-bold">{course.id}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-medium text-slate-500">
                    {course.level}
                  </span>
                  {course.status === 'locked' && (
                    <Lock size={12} className="text-slate-400 shrink-0" />
                  )}
                </div>
                <h4 className="font-bold text-slate-900 text-lg mb-1.5 leading-tight">{course.title}</h4>
                <p className="text-slate-600 text-sm line-clamp-1">{course.subtitle}</p>
              </div>
              {course.status !== 'locked' && (
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Play size={20} className="text-teal-600 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 学习地图/征程组件
  const LearnView = () => {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* 顶部切换 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-full shadow-sm border border-slate-100 inline-flex">
            <button 
              onClick={() => setSubTab('map')}
              className={`flex items-center px-6 py-2.5 rounded-full text-sm font-medium transition-all touch-manipulation min-h-[44px] ${
                subTab === 'map' 
                  ? 'bg-teal-500 text-white shadow-md active:bg-teal-600' 
                  : 'text-slate-500 active:bg-slate-100'
              }`}
            >
              <MapIcon size={16} className="mr-2" /> 地图
            </button>
            <button 
              onClick={() => setSubTab('badges')}
              className={`flex items-center px-6 py-2.5 rounded-full text-sm font-medium transition-all touch-manipulation min-h-[44px] ${
                subTab === 'badges' 
                  ? 'bg-amber-500 text-white shadow-md active:bg-amber-600' 
                  : 'text-slate-500 active:bg-slate-100'
              }`}
            >
              <Award size={16} className="mr-2" /> 征程
            </button>
          </div>
        </div>

        {subTab === 'map' ? (
          <div className="relative max-w-xs mx-auto">
            {/* 连接线 */}
            <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-slate-200 -translate-x-1/2 rounded-full z-0"></div>
            
            <div className="space-y-12 relative z-10">
              {courseList.map((node, index) => (
                <div key={node.id} className="flex flex-col items-center">
                  <div 
                    className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white transition-transform touch-manipulation ${
                      node.status === 'completed' 
                        ? 'bg-teal-500 text-white active:scale-95 active:bg-teal-600' 
                        : node.status === 'current' 
                        ? 'bg-white text-teal-600 ring-4 ring-teal-100 active:scale-95 active:ring-teal-200' 
                        : 'bg-slate-100 text-slate-300'
                    } ${node.status !== 'locked' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    onClick={() => node.status !== 'locked' && handleSelectLesson(node.lesson)}
                  >
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  <div className="mt-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 text-center w-48">
                    <h4 className="font-bold text-sm text-slate-800">{node.title}</h4>
                    {node.status === 'locked' && <Lock size={12} className="inline-block mt-1 text-slate-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 px-4">
            {/* 征程/徽章网格 - 使用实际数据 */}
            {courseList.map((course, index) => {
              const isCompleted = course.status === 'completed';
              const badgeId = getBadgeIdByLessonId(course.id);
              const badgeConfig = badgeId ? getBadgeConfig(badgeId) : null;
              const isBadgeUnlockedState = badgeId ? isBadgeUnlocked(badgeId) : false;
              
              return (
                <div 
                  key={course.id} 
                  className={`aspect-[4/5] rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all relative overflow-hidden ${
                    isBadgeUnlockedState 
                      ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg' 
                      : 'border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100'
                  }`}
                >
                  {/* 徽章图片 */}
                  {badgeConfig ? (
                    <div className="w-20 h-20 mb-3 flex items-center justify-center">
                      <img
                        src={badgeConfig.svgPath}
                        alt={badgeConfig.name}
                        className={`w-full h-full object-contain transition-all ${
                          isBadgeUnlockedState 
                            ? 'opacity-100 drop-shadow-md' 
                            : 'opacity-50 grayscale brightness-75'
                        }`}
                        style={!isBadgeUnlockedState ? {
                          filter: 'grayscale(100%) brightness(0.6)'
                        } : {}}
                        onError={(e) => {
                          e.target.src = badgeConfig.pngPath;
                        }}
                      />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${
                      isCompleted ? 'bg-amber-200 text-amber-600' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {isCompleted ? <Award size={32} /> : <Lock size={24} />}
                    </div>
                  )}
                  <span className={`text-sm font-bold text-center ${isBadgeUnlockedState ? 'text-amber-800' : 'text-slate-500'}`}>
                    {badgeConfig ? badgeConfig.name : course.title}
                  </span>
                  <span className={`text-xs mt-1 ${isBadgeUnlockedState ? 'text-amber-600' : 'text-slate-400'}`}>
                    {isBadgeUnlockedState ? '✓ 已获得' : '🔒 待解锁'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // 个人中心组件
  const ProfileView = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 头部卡片 */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
        <div className="w-24 h-24 bg-blue-50 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 relative z-10">
          {user?.username ? user.username.charAt(0).toUpperCase() : '🧘'}
        </div>
        <h2 className="text-xl font-bold text-slate-800">{user?.username || '修行者'}</h2>
        <p className="text-slate-400 text-sm mt-1">继续加油学习！</p>
        
        {/* 装饰背景 */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent -z-0" />
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-center items-center shadow-sm">
          <div className="bg-green-100 p-2 rounded-full text-green-600 mb-2">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-2xl font-bold text-slate-800">{overallProgress.completed}</span>
          <span className="text-xs text-slate-400 mt-1">已完成关卡</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-center items-center shadow-sm">
          <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 mb-2">
            <Trophy size={20} />
          </div>
          <span className="text-2xl font-bold text-slate-800">{Math.round(overallProgress.percentage)}%</span>
          <span className="text-xs text-slate-400 mt-1">总体进度</span>
        </div>
      </div>

      {/* 设置菜单 */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <MenuItem 
          icon={<RefreshCw size={18} />} 
          label="重置进度" 
          danger 
          onClick={() => {
            if (confirm('确定要重置所有进度吗？')) {
              localStorage.removeItem('wuxing_progress');
              window.location.reload();
            }
          }}
        />
        <div className="h-px bg-slate-50" />
        <MenuItem 
          icon={<Bell size={18} />} 
          label="提醒设置" 
          onClick={() => setActiveTab('settings')}
        />
        <div className="h-px bg-slate-50" />
        <MenuItem icon={<Shield size={18} />} label="隐私政策" />
        <div className="h-px bg-slate-50" />
        <MenuItem 
          icon={<Settings size={18} />} 
          label="更多设置" 
          onClick={() => setActiveTab('settings')}
        />
      </div>
    </div>
  );

  const MenuItem = ({ icon, label, danger, onClick }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 active:bg-slate-50 transition-colors text-left touch-manipulation min-h-[44px]"
    >
      <div className={`flex items-center gap-3 ${danger ? 'text-red-500' : 'text-slate-600'}`}>
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      <ChevronRight size={16} className="text-slate-300" />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-hidden mx-auto max-w-md" style={{ width: '100%', maxWidth: '428px' }}>
      <div className="flex flex-col h-screen">
        {/* --- 主内容区域 --- */}
        <div className="flex-1 overflow-y-auto pb-20" style={{ paddingBottom: '80px' }}>
          {/* --- 头部区域 --- */}
          {activeTab !== 'chat' && activeTab !== 'home' && (
            <header className="bg-white border-b border-slate-200 px-6 pt-4 pb-6 sticky top-0 z-40">
              <h1 className="text-2xl font-bold text-slate-900">{headerData.title}</h1>
            </header>
          )}

          {/* --- 内容渲染区域 --- */}
          <main className={activeTab === 'chat' ? '' : activeTab === 'home' ? 'px-6 pt-0 pb-6' : 'px-6 py-6'}>
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'learn' && <LearnView />}
            {activeTab === 'chat' && (
              <ChatPage 
                currentView={activeTab} 
                onNavClick={(view) => {
                  setActiveTab(view);
                  setSelectedLesson(null);
                }} 
              />
            )}
            {activeTab === 'profile' && <ProfileView />}
            {activeTab === 'settings' && (
              <SettingsPage
                currentView={activeTab}
                onNavClick={(view) => {
                  setActiveTab(view);
                  setSelectedLesson(null);
                }}
                user={user}
                onLogout={handleLogout}
              />
            )}
          </main>
        </div>

        {/* --- 底部导航栏（移动端模式）--- */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 mx-auto max-w-md shadow-lg" style={{ maxWidth: '428px' }}>
          <div className="flex justify-around items-center h-16">
            <button 
              onClick={() => {
                setActiveTab('home');
                setSelectedLesson(null);
              }}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors touch-manipulation active:bg-slate-50 ${
                activeTab === 'home' ? 'text-teal-600' : 'text-slate-400'
              }`}
            >
              <Home size={22} />
              <span className="text-[10px] mt-0.5 font-medium">首页</span>
            </button>
            <button 
              onClick={() => {
                setActiveTab('learn');
                setSelectedLesson(null);
              }}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors touch-manipulation active:bg-slate-50 ${
                activeTab === 'learn' ? 'text-teal-600' : 'text-slate-400'
              }`}
            >
              <BookOpen size={22} />
              <span className="text-[10px] mt-0.5 font-medium">学习</span>
            </button>
            <button 
              onClick={() => {
                const nextLesson = unlockedLessons.find(lesson => {
                  const progress = getLessonProgress(lesson.id);
                  return !progress.completed;
                }) || unlockedLessons[0];
                if (nextLesson) {
                  handleSelectLesson(nextLesson);
                }
              }}
              className="flex flex-col items-center justify-center flex-1 h-full text-teal-600 touch-manipulation active:opacity-80"
            >
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center -mt-4 shadow-lg active:scale-95 transition-transform">
                <Play size={24} fill="white" className="text-white ml-0.5" />
              </div>
            </button>
            <button 
              onClick={() => {
                setActiveTab('chat');
                setSelectedLesson(null);
              }}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors touch-manipulation active:bg-slate-50 ${
                activeTab === 'chat' ? 'text-teal-600' : 'text-slate-400'
              }`}
            >
              <MessageSquare size={22} />
              <span className="text-[10px] mt-0.5 font-medium">聊天</span>
            </button>
            <button 
              onClick={() => {
                setActiveTab('profile');
                setSelectedLesson(null);
              }}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors touch-manipulation active:bg-slate-50 ${
                activeTab === 'profile' ? 'text-teal-600' : 'text-slate-400'
              }`}
            >
              <User size={22} />
              <span className="text-[10px] mt-0.5 font-medium">我的</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
