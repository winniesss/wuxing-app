import React, { useState, useRef, useEffect } from 'react';

import { 
  Play, CheckCircle2, BookOpen, User, MessageSquare, Home, 
  ChevronRight, Calendar, Trophy, MoreHorizontal, Map as MapIcon, 
  Award, Lock, Send, RefreshCw, Settings, Bell, Shield
} from 'lucide-react';

// --- 模拟数据 ---

const USER_DATA = {
  level: 2,
  completedStages: 2,
  totalProgress: 33,
  name: "修行者",
  avatar: "🧘"
};

const COURSE_LIST = [
  { id: 1, level: "关卡 1", title: "五行相生相克基础", subtitle: "记住五行的生克顺序和基本逻辑", progress: 5, total: 5, color: "bg-blue-500", lightColor: "bg-blue-50 text-blue-600", status: 'completed' },
  { id: 2, level: "关卡 2", title: "十天干阴阳属性", subtitle: "掌握十天干的阴阳分类", progress: 4, total: 5, color: "bg-indigo-500", lightColor: "bg-indigo-50 text-indigo-600", status: 'current' },
  { id: 3, level: "关卡 3", title: "十天干五行属性", subtitle: "掌握十天干对应的五行", progress: 0, total: 6, color: "bg-emerald-500", lightColor: "bg-emerald-50 text-emerald-600", status: 'locked' }
];

const BADGES = [
  { id: 1, name: "五行初探", locked: false },
  { id: 2, name: "阴阳行者", locked: true },
  { id: 3, name: "天干大师", locked: true },
  { id: 4, name: "未知成就", locked: true },
];

const CHAT_MESSAGES = [
  { id: 1, sender: 'bot', text: '你好！我是你的修行助手。有什么问题可以随时问我。' }
];

// --- 子页面组件 ---

// 1. 首页组件
const HomeView = () => (
  <div className="space-y-6 pb-24 animate-in fade-in duration-500">
    <div className="flex justify-between items-end px-2">
      <h3 className="text-xl font-bold text-slate-800">今日课程</h3>
      <button className="text-sm text-teal-600 font-medium hover:text-teal-700">查看全部</button>
    </div>
    <div className="space-y-4">
      {COURSE_LIST.map((course) => (
        <div key={course.id} className="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-[0.99]">
          <div className="flex items-start justify-between mb-3">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${course.lightColor}`}>
              {course.level}
            </span>
            <span className="text-xs font-medium text-slate-400">{course.progress}/{course.total} 节</span>
          </div>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${course.color} bg-opacity-10 flex items-center justify-center shrink-0`}>
              {course.progress === course.total ? <CheckCircle2 size={20} className={course.color.replace('bg-', 'text-')} /> : <Play size={20} fill="currentColor" className={course.color.replace('bg-', 'text-')} />}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 text-base mb-0.5">{course.title}</h4>
              <p className="text-slate-500 text-xs line-clamp-1">{course.subtitle}</p>
            </div>
            <ChevronRight size={20} className="text-slate-300 group-hover:text-teal-500" />
          </div>
          <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${course.color} opacity-80`} style={{ width: `${(course.progress / course.total) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 2. 学习地图/征程组件
const LearnView = () => {
  const [subTab, setSubTab] = useState('map'); // 'map' or 'badges'

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 顶部切换 */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-full shadow-sm border border-slate-100 inline-flex">
          <button 
            onClick={() => setSubTab('map')}
            className={`flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all ${subTab === 'map' ? 'bg-teal-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <MapIcon size={16} className="mr-2" /> 地图
          </button>
          <button 
            onClick={() => setSubTab('badges')}
            className={`flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all ${subTab === 'badges' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
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
            {COURSE_LIST.map((node, index) => (
              <div key={node.id} className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white transition-transform hover:scale-105 ${
                  node.status === 'completed' ? 'bg-teal-500 text-white' : 
                  node.status === 'current' ? 'bg-white text-teal-600 ring-4 ring-teal-100' : 'bg-slate-100 text-slate-300'
                }`}>
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
           {/* 征程/徽章网格 */}
           {BADGES.map((badge) => (
             <div key={badge.id} className={`aspect-[4/5] rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all ${badge.locked ? 'border-dashed border-slate-200 bg-slate-50' : 'border-amber-200 bg-amber-50'}`}>
               <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${badge.locked ? 'bg-slate-200 text-slate-400' : 'bg-amber-200 text-amber-600'}`}>
                 {badge.locked ? <Lock size={24} /> : <Award size={32} />}
               </div>
               <span className={`text-sm font-bold ${badge.locked ? 'text-slate-400' : 'text-amber-800'}`}>{badge.name}</span>
               <span className="text-xs text-slate-400 mt-1">{badge.locked ? '待解锁' : '已获得'}</span>
             </div>
           ))}
           <div className="aspect-[4/5] rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50/50">
             <span className="text-slate-300 text-2xl">+</span>
           </div>
        </div>
      )}
    </div>
  );
};

// 3. 聊天组件
const ChatView = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const scrollRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages([...messages, newMsg]);
    setInput('');
    // 模拟回复
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: '我在听，请继续修行。' }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-500">
      {/* 每日运势卡片 (对应截图) */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl border border-amber-100 mb-4 mx-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-600 text-lg">🌱</span>
          <h3 className="font-bold text-slate-700">今天适合精准地打磨</h3>
        </div>
        <p className="text-xs text-slate-500 mb-3">金日重在精进，适合专注深入。</p>
        <div className="flex flex-wrap gap-2 text-[10px]">
          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded">✨ 宜：深入学习</span>
          <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded">⚠️ 忌：浅尝辄止</span>
        </div>
      </div>

      {/* 聊天记录 */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.sender === 'user' 
                ? 'bg-teal-500 text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* 输入框 */}
      <div className="mt-4 relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你的问题..."
          className="w-full bg-white border border-slate-200 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white hover:bg-teal-600 transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

// 4. 个人中心组件
const ProfileView = () => (
  <div className="space-y-6 pb-24 animate-in fade-in duration-500">
    {/* 头部卡片 */}
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
      <div className="w-24 h-24 bg-blue-50 rounded-full mx-auto flex items-center justify-center text-4xl mb-4 relative z-10">
        {USER_DATA.avatar}
      </div>
      <h2 className="text-xl font-bold text-slate-800">{USER_DATA.name}</h2>
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
        <span className="text-2xl font-bold text-slate-800">{USER_DATA.completedStages}</span>
        <span className="text-xs text-slate-400 mt-1">已完成关卡</span>
      </div>
      <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-center items-center shadow-sm">
        <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 mb-2">
          <Trophy size={20} />
        </div>
        <span className="text-2xl font-bold text-slate-800">{USER_DATA.totalProgress}%</span>
        <span className="text-xs text-slate-400 mt-1">总体进度</span>
      </div>
    </div>

    {/* 设置菜单 */}
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <MenuItem icon={<RefreshCw size={18} />} label="重置进度" danger />
      <div className="h-px bg-slate-50" />
      <MenuItem icon={<Bell size={18} />} label="提醒设置" />
      <div className="h-px bg-slate-50" />
      <MenuItem icon={<Shield size={18} />} label="隐私政策" />
      <div className="h-px bg-slate-50" />
      <MenuItem icon={<Settings size={18} />} label="更多设置" />
    </div>
  </div>
);

const MenuItem = ({ icon, label, danger }) => (
  <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left">
    <div className={`flex items-center gap-3 ${danger ? 'text-red-500' : 'text-slate-600'}`}>
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </div>
    <ChevronRight size={16} className="text-slate-300" />
  </button>
);

// --- 主程序入口 ---

export default function NewApp() {
  const [activeTab, setActiveTab] = useState('home');

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

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans text-slate-800 relative overflow-hidden mx-auto max-w-md shadow-2xl">
      
      {/* --- 通用头部区域 --- */}
      <header className={`relative transition-all duration-500 ease-in-out z-20 ${activeTab === 'home' ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white pt-12 pb-16 rounded-b-[2.5rem]' : 'bg-white text-slate-800 pt-12 pb-6'}`}>
        <div className="px-6 flex justify-between items-center mb-4 relative z-10">
          {activeTab === 'home' ? (
             <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full"><BookOpen size={20} /></div>
          ) : (
             <h1 className="text-2xl font-bold">{headerData.title}</h1>
          )}
          
          <div className={`${activeTab === 'home' ? 'p-2 bg-white/20 backdrop-blur-sm' : 'p-2 bg-slate-100'} rounded-full`}>
             <MoreHorizontal size={20} className={activeTab === 'home' ? 'text-white' : 'text-slate-600'} />
          </div>
        </div>

        {/* 首页特有的统计面板 */}
        {headerData.showStats && (
          <div className="px-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy size={18} className="text-yellow-300" />
                <h2 className="font-semibold text-lg tracking-wide">学习进度</h2>
              </div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">2 / 6 关卡</span>
            </div>
            <div className="relative h-3 bg-black/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full w-1/3" />
            </div>
            <div className="flex items-center space-x-2 text-teal-50 text-sm">
              <Calendar size={14} /> <span>1 个课程待学习</span>
            </div>
          </div>
        )}

        {/* 首页特有的背景装饰 */}
        {activeTab === 'home' && (
          <>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
          </>
        )}
      </header>

      {/* --- 内容渲染区域 --- */}
      <main className={`px-6 relative z-10 transition-all duration-300 ${activeTab === 'home' ? '-mt-8' : 'mt-4'}`}>
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'learn' && <LearnView />}
        {activeTab === 'chat' && <ChatView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* --- 底部导航栏 --- */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-slate-100 px-6 py-2 pb-6 z-50">
        <ul className="flex justify-between items-center">
          <NavItem icon={<Home size={24} />} label="首页" id="home" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<BookOpen size={24} />} label="学习" id="learn" activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* 悬浮按钮 - 点击通常是继续学习 */}
          <li className="-mt-8 relative z-10">
            <button className="bg-teal-600 text-white p-4 rounded-full shadow-lg shadow-teal-600/30 hover:bg-teal-700 transition-transform active:scale-95">
              <Play size={24} fill="currentColor" className="ml-0.5" />
            </button>
          </li>
          
          <NavItem icon={<MessageSquare size={24} />} label="聊天" id="chat" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<User size={24} />} label="我的" id="profile" activeTab={activeTab} setActiveTab={setActiveTab} />
        </ul>
      </nav>
    </div>
  );
}

// 底部导航辅助组件
function NavItem({ icon, label, id, activeTab, setActiveTab }) {
  const isActive = activeTab === id;
  return (
    <li className="flex-1 flex justify-center">
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex flex-col items-center space-y-1 transition-colors duration-300 ${
          isActive ? 'text-teal-600' : 'text-slate-300 hover:text-slate-400'
        }`}
      >
        <div className={`transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 hidden'}`}>
          {label}
        </span>
        {/* 激活时的小圆点 */}
        <div className={`w-1 h-1 rounded-full bg-teal-600 transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
      </button>
    </li>
  );
}

