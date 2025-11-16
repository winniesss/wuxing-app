// 语音播放工具函数

// 检查浏览器是否支持语音合成
export const isSpeechSupported = () => {
  return 'speechSynthesis' in window;
};

// 停止当前播放
export const stopSpeech = () => {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
};

// 获取中文普通话语音 - 优先选择普通话（zh-CN）
const getChineseVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  
  // 优先选择普通话（简体中文）语音，排除其他方言
  const preferredVoices = [
    'Ting-Ting',           // macOS/iOS 普通话女声
    'Sinji',               // macOS/iOS 普通话男声
    'Tingting',            // Windows 普通话女声
    'Huihui',              // Windows 普通话女声
    'Yaoyao',              // Windows 普通话女声
    'Microsoft Yaoyao',    // Windows 普通话
    'Microsoft Huihui',    // Windows 普通话
    'Google 普通话',       // Google 普通话
    '普通话',              // 普通话
    'Mandarin',            // 普通话（英文名）
    'Chinese (Simplified)' // 简体中文
  ];
  
  // 先尝试匹配偏好的普通话语音（必须是 zh-CN）
  for (const preferred of preferredVoices) {
    const voice = voices.find(v => 
      v.name.includes(preferred) && 
      (v.lang === 'zh-CN' || v.lang === 'zh_CN' || v.lang.startsWith('zh-CN'))
    );
    if (voice) return voice;
  }
  
  // 然后尝试精确匹配 zh-CN（排除其他中文方言）
  const zhCNVoice = voices.find(voice => 
    voice.lang === 'zh-CN' || voice.lang === 'zh_CN' || voice.lang === 'cmn-CN'
  );
  if (zhCNVoice) return zhCNVoice;
  
  // 最后匹配任何简体中文语音（排除繁体和其他方言）
  const simplifiedChinese = voices.find(voice => 
    voice.lang.includes('zh') && 
    !voice.lang.includes('TW') &&  // 排除台湾
    !voice.lang.includes('HK') &&  // 排除香港
    !voice.lang.includes('MO') &&  // 排除澳门
    !voice.name.includes('Cantonese') &&  // 排除粤语
    !voice.name.includes('Traditional')   // 排除繁体
  );
  if (simplifiedChinese) return simplifiedChinese;
  
  // 如果都没有，返回第一个中文语音
  return voices.find(voice => voice.lang.includes('zh'));
};

// 优化文本格式，添加适当的停顿
const optimizeText = (text) => {
  // 将多个标点符号替换为单个，避免停顿过长
  text = text.replace(/[。，；：！？]{2,}/g, '。');
  
  // 在选项之间添加适当停顿
  text = text.replace(/([A-Z]、)/g, '，$1');
  
  // 确保问号后有停顿
  text = text.replace(/\?/g, '？');
  
  return text;
};

// 播放文本
export const speakText = (text, options = {}) => {
  if (!isSpeechSupported()) {
    console.warn('浏览器不支持语音合成');
    return;
  }

  // 停止之前的播放
  stopSpeech();

  // 优化文本格式
  const optimizedText = optimizeText(text);
  const utterance = new SpeechSynthesisUtterance(optimizedText);
  
  // 设置普通话语音参数
  utterance.lang = options.lang || 'zh-CN'; // 明确使用简体中文（普通话）
  utterance.rate = options.rate || 0.85; // 稍慢的语速，更清晰自然
  utterance.pitch = options.pitch || 1.0; // 正常音调
  utterance.volume = options.volume || 0.9; // 稍微降低音量，更舒适

  // 获取并设置中文语音
  const setVoice = () => {
    const chineseVoice = getChineseVoice();
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  // 如果语音列表还没加载，等待加载完成
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    // 一次性事件监听器
    const onVoicesChanged = () => {
      setVoice();
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
    };
    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    // 设置超时，防止一直等待
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      setVoice();
    }, 1000);
  } else {
    setVoice();
  }
};

// 播放题目内容（包括题目和选项）
export const speakQuestion = (question) => {
  let text = question.question;
  
  if (question.type === 'single_choice' && question.options) {
    // 添加停顿，让选项更清晰
    text += '。选项有：';
    question.options.forEach((option, index) => {
      const letter = String.fromCharCode(65 + index); // A, B, C, D
      text += ` ${letter}，${option}。`;
    });
  }
  
  speakText(text, { rate: 0.8 }); // 题目朗读稍慢一些
};

// 播放解释
export const speakExplanation = (explanation) => {
  if (explanation) {
    // 解释部分可以稍快一些，但保持清晰
    speakText(explanation, { rate: 0.85 });
  }
};

// 播放整个课程（已废弃，改用 PPT 模式）
export const speakLesson = (lesson) => {
  // 这个函数保留用于兼容，但实际使用 ListenPage 组件
  console.log('请使用 ListenPage 组件进行 PPT 模式听课');
};

