import { useState, useEffect, useRef } from 'react';
import { generateDailyTip, getTodayGanZhi } from '../utils/bazi/dailyTip';
import { getUserBaziProfile } from '../utils/bazi/storage';
import { Home, BookOpen, MessageSquare, User, Send, Play } from 'lucide-react';

// 五行英文转中文映射
const ELEMENT_MAP = {
  wood: '木',
  fire: '火',
  earth: '土',
  metal: '金',
  water: '水'
};

function ChatPage({ currentView, onNavClick }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [dailyTip, setDailyTip] = useState(null);
  const [todayGanZhi, setTodayGanZhi] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // 加载每日修行提醒
    const userBazi = getUserBaziProfile();
    const tip = generateDailyTip(new Date(), userBazi);
    const ganZhi = getTodayGanZhi();
    
    setDailyTip(tip);
    setTodayGanZhi(ganZhi);
    
    // 初始化欢迎消息
    setMessages([{
      id: 1,
      role: 'system',
      text: '你好！我是你的修行助手。有什么问题可以随时问我。'
    }]);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: inputText
    };

    // 添加系统回复
    const systemReply = {
      id: Date.now() + 1,
      role: 'assistant',
      text: generateReply(inputText, dailyTip)
    };

    setMessages(prev => [...prev, userMessage, systemReply]);
    setInputText('');
  };

  const generateReply = (userInput, tip) => {
    const input = userInput.toLowerCase();
    
    // 简单的规则回复
    if (input.includes('适合') || input.includes('应该')) {
      const elementCN = tip?.element ? ELEMENT_MAP[tip.element] || tip.element : '五行';
      return `根据今日的${elementCN}属性，建议你：${tip?.focus.join('、') || '保持专注学习'}。`;
    }
    
    if (input.includes('避免') || input.includes('不要')) {
      return `今日建议避免：${tip?.avoid.join('、') || '急躁行事'}。`;
    }
    
    if (input.includes('焦虑') || input.includes('紧张')) {
      return '学习是一个循序渐进的过程，不必急于一时。今天适合稳定输入，慢慢积累。';
    }
    
    if (input.includes('章节') || input.includes('课程')) {
      return '建议你按照课程顺序学习，先完成基础课程，再逐步深入。';
    }
    
    if (input.includes('八字') || input.includes('五行')) {
      const elementCN = todayGanZhi?.element ? ELEMENT_MAP[todayGanZhi.element] || todayGanZhi.element : '木';
      return `今日天干地支：${todayGanZhi?.gan}${todayGanZhi?.zhi}，五行属性：${elementCN}。`;
    }
    
    // 默认回复
    return '我理解你的问题。建议你专注于当前的学习内容，保持稳定的学习节奏。如有具体问题，可以详细描述。';
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-hidden mx-auto max-w-md" style={{ width: '100%', maxWidth: '428px' }}>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto pb-20" style={{ paddingBottom: '80px' }}>
          {/* 头部 */}
          <header className="bg-white border-b border-slate-200 px-6 pt-4 pb-4 sticky top-0 z-40">
            <h1 className="text-2xl font-bold text-slate-900">修行聊天</h1>
          </header>

          {/* 今日修行提醒卡片 */}
          {dailyTip && (
            <div className="px-6 py-4">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-5 border border-teal-100 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">🌱</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{dailyTip.title}</h3>
                    <p className="text-sm text-slate-600">{dailyTip.summary}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-teal-600 font-medium min-w-[80px]">✨ 今日适合：</span>
                    <span className="text-slate-700">{dailyTip.focus.join('、')}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-600 font-medium min-w-[80px]">⚠️ 今日避免：</span>
                    <span className="text-slate-700">{dailyTip.avoid.join('、')}</span>
                  </div>
                  {todayGanZhi && (
                    <div className="flex items-start gap-2 pt-2 border-t border-teal-200">
                      <span className="text-slate-600 font-medium min-w-[80px]">📅 今日：</span>
                      <span className="text-slate-700">{todayGanZhi.gan}{todayGanZhi.zhi} ({ELEMENT_MAP[todayGanZhi.element] || todayGanZhi.element})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 聊天消息列表 */}
          <div className="px-6 pb-4 space-y-4">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user' 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-white text-slate-900 border border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 输入框 */}
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 mx-auto max-w-md z-40" style={{ maxWidth: '428px' }}>
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="输入你的问题..."
              className="flex-1 px-4 py-3 bg-slate-100 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 placeholder-slate-400"
            />
            <button 
              type="submit" 
              disabled={!inputText.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all touch-manipulation ${
                inputText.trim()
                  ? 'bg-teal-500 text-white active:bg-teal-600 shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </form>
        </div>

        {/* 底部导航栏 */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 mx-auto max-w-md shadow-lg" style={{ maxWidth: '428px' }}>
          <div className="flex justify-around items-center h-16">
            <button 
              onClick={() => onNavClick('home')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors touch-manipulation active:bg-slate-50 ${
                currentView === 'home' ? 'text-teal-600' : 'text-slate-400'
              }`}
            >
              <Home size={22} />
              <span className="text-[10px] mt-0.5 font-medium">首页</span>
            </button>
            <button 
              onClick={() => onNavClick('learn')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors touch-manipulation active:bg-slate-50 ${
                currentView === 'learn' ? 'text-teal-600' : 'text-slate-400'
              }`}
            >
              <BookOpen size={22} />
              <span className="text-[10px] mt-0.5 font-medium">学习</span>
            </button>
            <button 
              onClick={() => {
                // 可以添加快速开始学习的逻辑
              }}
              className="flex flex-col items-center justify-center flex-1 h-full text-teal-600 touch-manipulation active:opacity-80"
            >
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center -mt-4 shadow-lg active:scale-95 transition-transform">
                <Play size={24} fill="white" className="text-white ml-0.5" />
              </div>
            </button>
            <button 
              onClick={() => onNavClick('chat')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors touch-manipulation active:bg-slate-50 ${
                currentView === 'chat' ? 'text-teal-600' : 'text-slate-400'
              }`}
            >
              <MessageSquare size={22} />
              <span className="text-[10px] mt-0.5 font-medium">聊天</span>
            </button>
            <button 
              onClick={() => onNavClick('profile')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors touch-manipulation active:bg-slate-50 ${
                currentView === 'profile' ? 'text-teal-600' : 'text-slate-400'
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

export default ChatPage;
