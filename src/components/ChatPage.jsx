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
  const [needsPadding, setNeedsPadding] = useState(false);

  useEffect(() => {
    // 加载每日修行提醒
    const userBazi = getUserBaziProfile();
    const tip = generateDailyTip(new Date(), userBazi);
    const ganZhi = getTodayGanZhi();
    
    setDailyTip(tip);
    setTodayGanZhi(ganZhi);
    
    // 初始化欢迎消息
    const welcomeMessage = userBazi 
      ? `你好呀！我是修行路上的伙伴，擅长五行之道。\n\n我可以根据你的生辰八字为你进行小六壬占卜，帮你解答疑惑。\n\n只需要告诉我3个数字（1-6之间）就可以开始占卜啦～\n\n例如：1 2 3 或 一二三`
      : `你好呀！我是修行路上的伙伴，擅长五行之道。\n\n我可以为你进行小六壬占卜，帮你解答疑惑。\n\n如果你先完善一下生辰八字信息，占卜会更准确哦～\n\n然后告诉我3个数字（1-6之间）就可以开始占卜啦！\n\n例如：1 2 3 或 一二三`;
    
    setMessages([{
      id: 1,
      role: 'system',
      text: welcomeMessage
    }]);
    
    // 确保页面滚动到顶部，显示提示卡
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  // 检查是否需要 paddingBottom
  useEffect(() => {
    const checkHeight = () => {
      if (contentRef.current) {
        const container = contentRef.current.parentElement;
        if (container) {
          const contentHeight = contentRef.current.scrollHeight;
          const containerHeight = container.clientHeight;
          // 只有当内容高度超过容器高度时才需要 paddingBottom
          // 加上 140px 的 padding 后，如果总高度超过容器，才需要 padding
          const totalHeightWithPadding = contentHeight + 140;
          setNeedsPadding(totalHeightWithPadding > containerHeight);
        }
      }
    };
    
    // 延迟检查，确保内容已渲染
    setTimeout(checkHeight, 100);
    setTimeout(checkHeight, 300);
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [messages, dailyTip]);

  // 自动滚动到底部（只在有新消息时滚动，初始加载时不滚动）
  useEffect(() => {
    // 如果消息数量大于1（即有新消息），才滚动到底部
    if (messages.length > 1) {
      scrollToBottom();
    }
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
      return '小六壬占卜需要3个数字（1-6之间）。\n\n请告诉我3个数字，例如：\n- 1 2 3\n- 一二三\n- 3,5,6\n\n我将根据你的生辰八字为你进行占卜。';
    }
    
    // 检查是否询问八字
    if (input.includes('八字') || input.includes('生辰')) {
      if (userBazi) {
        const dayStem = userBazi.dayStem || '未知';
        const element = userBazi.dayStem ? getElement(userBazi.dayStem) : null;
        const elementCN = element ? ELEMENT_MAP[element] || element : '未知';
        return `你的生辰八字信息：\n日主：${dayStem}\n五行：${elementCN}\n\n如需进行小六壬占卜，请告诉我3个数字（1-6之间）。`;
      } else {
        return '你还没有设置生辰八字信息。请前往个人中心完善信息，然后我可以根据你的八字为你进行更准确的占卜。';
      }
    }
    
    // 检查是否询问今日五行
    if (input.includes('今日') && (input.includes('五行') || input.includes('天干'))) {
      const elementCN = todayGanZhi?.element ? ELEMENT_MAP[todayGanZhi.element] || todayGanZhi.element : '木';
      return `今日天干地支：${todayGanZhi?.gan}${todayGanZhi?.zhi}\n五行属性：${elementCN}\n\n如需占卜，请告诉我3个数字（1-6之间）。`;
    }
    
    // 检查是否询问建议
    if (input.includes('适合') || input.includes('应该') || input.includes('建议')) {
      const elementCN = tip?.element ? ELEMENT_MAP[tip.element] || tip.element : '五行';
      return `根据今日的${elementCN}属性，建议你：${tip?.focus.join('、') || '保持专注学习'}。\n\n如需更详细的占卜，请告诉我3个数字进行小六壬占卜。`;
    }
    
    if (input.includes('避免') || input.includes('不要')) {
      return `今日建议避免：${tip?.avoid.join('、') || '急躁行事'}。`;
    }
    
    // 默认回复
    return '我是精通五行的道士，可以为你进行小六壬占卜。\n\n请告诉我3个数字（1-6之间），例如：1 2 3\n\n或者你可以问我关于八字、五行、今日运势等问题。';
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative mx-auto max-w-md" style={{ width: '100%', maxWidth: '428px' }}>
      <div className="flex flex-col h-screen">
        {/* 头部 - 固定在顶部 */}
        <header className="bg-white border-b border-slate-200 px-6 pt-3 pb-3 flex-shrink-0 sticky top-0 z-50">
          <h1 className="text-xl font-bold text-slate-900">修行聊天</h1>
        </header>
        
        {/* 内容区域 - 可滚动 */}
        <div 
          className="flex-1" 
          style={{ 
            minHeight: 0, 
            overflowY: needsPadding ? 'auto' : 'visible',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style>{`
            .flex-1::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div ref={contentRef} style={{ paddingBottom: needsPadding ? '140px' : '20px' }}>
        {/* 今日修行提醒卡片 */}
        {dailyTip && (
          <div className="px-4 pt-3 pb-2">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100 shadow-sm">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xl">🌱</span>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-900 mb-0.5">{dailyTip.title}</h3>
                  <p className="text-xs text-slate-600">{dailyTip.summary}</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-teal-600 font-medium min-w-[70px] text-xs" style={{ color: '#0d9488' }}>✨ 今日适合：</span>
                  <span className="text-slate-700 text-xs" style={{ color: '#334155' }}>{dailyTip.focus.join('、')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 font-medium min-w-[70px] text-xs" style={{ color: '#d97706' }}>⚠️ 今日避免：</span>
                  <span className="text-slate-700 text-xs" style={{ color: '#334155' }}>{dailyTip.avoid.join('、')}</span>
                </div>
                {todayGanZhi && (
                  <div className="flex items-start gap-2 pt-1.5 border-t border-teal-200">
                    <span className="text-slate-600 font-medium min-w-[70px] text-xs" style={{ color: '#475569' }}>📅 今日：</span>
                    <span className="text-slate-700 text-xs" style={{ color: '#334155', fontWeight: '600' }}>{todayGanZhi.gan}{todayGanZhi.zhi} ({ELEMENT_MAP[todayGanZhi.element] || todayGanZhi.element})</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 聊天消息列表 */}
        <div className="px-4 pb-3 space-y-3">
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
        </div>

      {/* 输入框 - 固定在底部 */}
      <div className="bg-white border-t border-slate-200 px-3 py-2 flex-shrink-0 sticky bottom-0 z-50">
        <form onSubmit={handleSend} className="flex items-center gap-2 mb-1.5">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入你的问题或3个数字（1-6）..."
            className="flex-1 px-3 py-2 bg-slate-100 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 placeholder-slate-400 text-sm"
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
    </div>
  );
}

export default ChatPage;
