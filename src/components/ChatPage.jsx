import { useState, useEffect, useRef } from 'react';
import { generateDailyTip, getTodayGanZhi } from '../utils/bazi/dailyTip';
import { getUserBaziProfile } from '../utils/bazi/storage';
import { getElement } from '../utils/bazi/engine';
import { Send, Shuffle } from 'lucide-react';
import { extractThreeNumbers, generateXiaoLiuRenResult } from '../utils/xiaoliuren';

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
  const contentRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // 加载每日修行提醒
    const userBazi = getUserBaziProfile();
    const tip = generateDailyTip(new Date(), userBazi);
    const ganZhi = getTodayGanZhi();
    
    setDailyTip(tip);
    setTodayGanZhi(ganZhi);
    
    // 初始化欢迎消息
    const welcomeMessage = userBazi 
      ? `你好！我是修行助手。\n\n告诉我3个数字（1-6）即可占卜，例如：1 2 3`
      : `你好！我是修行助手。\n\n告诉我3个数字（1-6）即可占卜，例如：1 2 3\n\n完善八字信息可获得更准确的占卜。`;
    
    setMessages([{
      id: 1,
      role: 'assistant',
      text: welcomeMessage
    }]);
    
    // 确保页面滚动到顶部，显示提示卡
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);


  // 自动滚动到底部（只在有新消息时滚动，初始加载时不滚动）
  useEffect(() => {
    // 如果消息数量大于1（即有新消息），才滚动到底部
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  // 处理输入框聚焦时的布局
  useEffect(() => {
    const handleFocus = () => {
      // 延迟滚动，确保键盘已弹出
      setTimeout(() => {
        scrollToBottom();
      }, 300);
    };

    const handleBlur = () => {
      // 输入框失焦时，确保页面回到正常状态
      if (contentRef.current) {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      return () => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      };
    }
  }, []);

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

  // 随机摇卦功能
  const handleRandomDivination = () => {
    // 随机生成3个1-6之间的数字
    const num1 = Math.floor(Math.random() * 6) + 1;
    const num2 = Math.floor(Math.random() * 6) + 1;
    const num3 = Math.floor(Math.random() * 6) + 1;
    
    const userBazi = getUserBaziProfile();
    const result = generateXiaoLiuRenResult(num1, num2, num3, userBazi);
    
    // 添加用户消息（显示摇到的数字）
    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: `摇卦：${num1} ${num2} ${num3}`
    };
    
    // 添加系统回复（占卜结果）
    const systemReply = {
      id: Date.now() + 1,
      role: 'assistant',
      text: result.fullText
    };
    
    setMessages(prev => [...prev, userMessage, systemReply]);
  };

  const generateReply = (userInput, tip) => {
    const input = userInput.trim();
    const userBazi = getUserBaziProfile();
    
    // 检查是否是3个数字（小六壬占卜）
    const numbers = extractThreeNumbers(input);
    if (numbers && numbers.length === 3) {
      const [num1, num2, num3] = numbers;
      const result = generateXiaoLiuRenResult(num1, num2, num3, userBazi);
      return result.fullText;
    }
    
    // 检查是否询问小六壬
    if (input.includes('小六壬') || input.includes('占卜') || input.includes('算卦')) {
      return '告诉我3个数字（1-6），例如：1 2 3';
    }
    
    // 检查是否询问八字
    if (input.includes('八字') || input.includes('生辰') || input.includes('四柱')) {
      if (userBazi && userBazi.yearStem && userBazi.monthStem && userBazi.dayStem && userBazi.hourStem) {
        // 显示完整的四柱八字
        const dayStem = userBazi.dayStem || '未知';
        const element = userBazi.dayStem ? getElement(userBazi.dayStem) : null;
        const elementCN = element ? ELEMENT_MAP[element] || element : '未知';
        
        let reply = `📋 你的八字：\n`;
        reply += `${userBazi.yearStem}${userBazi.yearBranch} ${userBazi.monthStem}${userBazi.monthBranch} ${userBazi.dayStem}${userBazi.dayBranch} ${userBazi.hourStem}${userBazi.hourBranch}\n\n`;
        reply += `日主：${userBazi.dayStem}（${elementCN}）`;
        return reply;
      } else {
        return '请前往"我的" → "设置" → "生辰八字"完善信息。';
      }
    }
    
    // 检查是否询问今日五行
    if (input.includes('今日') && (input.includes('五行') || input.includes('天干'))) {
      const elementCN = todayGanZhi?.element ? ELEMENT_MAP[todayGanZhi.element] || todayGanZhi.element : '木';
      return `今日：${todayGanZhi?.gan}${todayGanZhi?.zhi}（${elementCN}）`;
    }
    
    // 检查是否询问建议
    if (input.includes('适合') || input.includes('应该') || input.includes('建议')) {
      const userBazi = getUserBaziProfile();
      const todayElementCN = todayGanZhi?.element ? ELEMENT_MAP[todayGanZhi.element] || todayGanZhi.element : '五行';
      const todayGanZhiStr = todayGanZhi ? `${todayGanZhi.gan}${todayGanZhi.zhi}` : '今日';
      
      let reply = `📅 今日：${todayGanZhiStr}（${todayElementCN}）\n\n`;
      
      if (userBazi && userBazi.dayStem) {
        const userElement = getElement(userBazi.dayStem);
        const userElementCN = userElement ? ELEMENT_MAP[userElement] || userElement : '未知';
        reply += `✨ 适合：${tip?.focus.join('、') || '保持稳定'}\n`;
        reply += `⚠️ 避免：${tip?.avoid.join('、') || '急躁行事'}`;
      } else {
        reply += `✨ 适合：${tip?.focus.join('、') || '保持稳定'}\n`;
        reply += `⚠️ 避免：${tip?.avoid.join('、') || '急躁行事'}`;
      }
      
      return reply;
    }
    
    if (input.includes('避免') || input.includes('不要')) {
      const userBazi = getUserBaziProfile();
      const todayElementCN = todayGanZhi?.element ? ELEMENT_MAP[todayGanZhi.element] || todayGanZhi.element : '五行';
      const todayGanZhiStr = todayGanZhi ? `${todayGanZhi.gan}${todayGanZhi.zhi}` : '今日';
      
      let reply = `📅 今日：${todayGanZhiStr}（${todayElementCN}）\n\n`;
      
      if (userBazi && userBazi.dayStem) {
        const userElement = getElement(userBazi.dayStem);
        const userElementCN = userElement ? ELEMENT_MAP[userElement] || userElement : '未知';
        reply += `⚠️ 避免：${tip?.avoid.join('、') || '急躁行事'}`;
      } else {
        reply += `⚠️ 避免：${tip?.avoid.join('、') || '急躁行事'}`;
      }
      
      return reply;
    }
    
    // 默认回复
    return '告诉我3个数字（1-6）可占卜，或询问八字、今日运势等。';
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-900 relative mx-auto max-w-md" style={{ 
      width: '100%', 
      maxWidth: '428px', 
      height: 'calc(100vh - 64px)',
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* 头部 - 固定在顶部 */}
      <header className="bg-white border-b border-slate-200 px-6 pt-3 pb-3 flex-shrink-0 z-50">
        <h1 className="text-xl font-bold text-slate-900">修行聊天</h1>
      </header>
      
      {/* 内容区域 - 可滚动 */}
      <div 
        className="flex-1 overflow-y-auto" 
        ref={contentRef}
        style={{ 
          minHeight: 0,
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingBottom: '140px'
        }}
      >
        <style>{`
          .flex-1::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div>
        {/* 基于用户四柱的建议卡片 */}
        {dailyTip && (() => {
          const userBazi = getUserBaziProfile();
          const userElement = userBazi && userBazi.dayStem ? getElement(userBazi.dayStem) : null;
          const userElementCN = userElement ? ELEMENT_MAP[userElement] || userElement : null;
          
          return (
            <div className="px-4 pt-3 pb-2">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100 shadow-sm">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-xl">🌟</span>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 mb-0.5">{dailyTip.title}</h3>
                    <p className="text-xs text-slate-600">{dailyTip.summary}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  {/* 今日适合和今日避免并排显示 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-teal-600 font-semibold text-xs mb-1.5 flex items-center gap-1" style={{ color: '#0d9488' }}>
                        <span>✨</span>
                        <span>今日适合</span>
                      </div>
                      <div className="text-slate-700 text-xs leading-relaxed" style={{ color: '#334155' }}>{dailyTip.focus.join('、')}</div>
                    </div>
                    <div>
                      <div className="text-amber-600 font-semibold text-xs mb-1.5 flex items-center gap-1" style={{ color: '#d97706' }}>
                        <span>⚠️</span>
                        <span>今日避免</span>
                      </div>
                      <div className="text-slate-700 text-xs leading-relaxed" style={{ color: '#334155' }}>{dailyTip.avoid.join('、')}</div>
                    </div>
                  </div>
                  {/* 只显示今日万年历 */}
                  <div className="pt-2 border-t border-teal-200">
                    {todayGanZhi && (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600 font-medium text-xs shrink-0" style={{ color: '#475569' }}>📅 今日：</span>
                        <span className="text-slate-700 text-xs font-semibold" style={{ color: '#334155' }}>{todayGanZhi.gan}{todayGanZhi.zhi} ({ELEMENT_MAP[todayGanZhi.element] || todayGanZhi.element})</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 聊天消息列表 */}
        <div className="px-4 pb-3 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              暂无消息
            </div>
          ) : (
            messages.map(msg => (
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
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        </div>
      </div>

      {/* 输入框 - 固定在底部，在导航栏上方 */}
      <div className="bg-white border-t border-slate-200 px-3 py-2 flex-shrink-0 z-40" style={{ 
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0.5rem))'
      }}>
        <form onSubmit={handleSend} className="flex items-center gap-2 mb-1.5">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入你的问题或3个数字（1-6）..."
            className="flex-1 px-3 py-2 bg-slate-100 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 placeholder-slate-400"
            style={{ fontSize: '16px' }}
          />
          <button 
            type="submit" 
            disabled={!inputText.trim()}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all touch-manipulation ${
              inputText.trim()
                ? 'bg-teal-500 text-white active:bg-teal-600 shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send size={16} />
          </button>
        </form>
        
        {/* 随机摇卦按钮 */}
        <button
          onClick={handleRandomDivination}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full font-medium active:from-teal-600 active:to-emerald-600 transition-all touch-manipulation shadow-md active:scale-95 text-sm"
        >
          <Shuffle size={16} />
          <span>摇一摇 随机占卜</span>
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
