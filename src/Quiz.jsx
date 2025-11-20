import { useState, useMemo } from 'react';
import { updateLessonProgress } from './utils/progress';
import { getHuskieByLearningState, getHuskieImage } from './utils/huskieAssets';
import { Home, BookOpen, MessageSquare, User, ChevronLeft, Play } from 'lucide-react';

// 随机打乱数组的 Fisher-Yates 算法
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function Quiz({ lesson, onBackToList, onRestart, currentView, onNavClick }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  // 为所有题目生成随机化的选项
  const randomizedQuestions = useMemo(() => {
    return lesson.questions.map(question => {
      if (question.type === 'single_choice' && question.options) {
        const shuffledOptions = shuffleArray(question.options);
        return {
          ...question,
          options: shuffledOptions,
        };
      }
      return question;
    });
  }, [lesson.questions, shuffleKey]);

  const currentQuestion = randomizedQuestions[currentQuestionIndex];
  const totalQuestions = lesson.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSubmit = () => {
    if (!isAnswered) {
      let correct = false;
      
      if (currentQuestion.type === 'single_choice') {
        correct = selectedAnswer === currentQuestion.correctAnswer;
      } else if (currentQuestion.type === 'fill_in_blank') {
        const normalizeAnswer = (ans) => {
          return ans
            .trim()
            .replace(/[，,、。；：！？\s]/g, '')
            .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '');
        };
        const userAnswerNormalized = normalizeAnswer(userAnswer);
        const correctAnswerNormalized = normalizeAnswer(currentQuestion.correctAnswer);
        correct = userAnswerNormalized === correctAnswerNormalized;
      }

      setIsCorrect(correct);
      setIsAnswered(true);
      
      if (correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setUserAnswer('');
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      handleComplete();
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setShowSummary(false);
    setShuffleKey(prev => prev + 1);
  };

  const handleComplete = () => {
    updateLessonProgress(lesson.id, score, totalQuestions);
  };

  if (showSummary) {
    const accuracy = (score / totalQuestions) * 100;
    const huskieState = accuracy === 100 ? 'dragon' : accuracy >= 80 ? 'happy' : 'study';
    const huskieImage = getHuskieImage(huskieState);
    
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-hidden mx-auto max-w-md" style={{ width: '100%', maxWidth: '428px' }}>
        <div className="flex flex-col h-screen">
          <div className="flex-1 overflow-y-auto pb-20" style={{ paddingBottom: '80px' }}>
            <div className="px-6 py-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
                <div className="mb-6">
                  <img 
                    src={huskieImage} 
                    alt="Huskie" 
                    className="w-32 h-32 mx-auto rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">关卡完成！</h2>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <div className="text-5xl font-bold text-teal-600">{score}</div>
                  <div className="text-2xl text-slate-400">/ {totalQuestions}</div>
                </div>
                <p className="text-slate-600 mb-6">
                  正确率：{Math.round(accuracy)}%
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    className="w-full bg-slate-100 text-slate-700 font-medium py-3 px-6 rounded-xl active:bg-slate-200 transition-colors touch-manipulation"
                    onClick={handleRestart}
                  >
                    再刷一遍
                  </button>
                  <button 
                    className="w-full bg-teal-500 text-white font-medium py-3 px-6 rounded-xl active:bg-teal-600 transition-colors touch-manipulation shadow-lg"
                    onClick={onBackToList}
                  >
                    返回关卡列表
                  </button>
                </div>
              </div>
            </div>
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
                onClick={onBackToList}
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative overflow-hidden mx-auto max-w-md" style={{ width: '100%', maxWidth: '428px' }}>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto pb-20" style={{ paddingBottom: '80px' }}>
          {/* 头部 */}
          <header className="bg-white border-b border-slate-200 px-6 pt-4 pb-4 sticky top-0 z-40">
            <button 
              className="flex items-center gap-2 text-slate-600 active:text-slate-900 mb-3 touch-manipulation"
              onClick={onBackToList}
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">返回</span>
            </button>
            <h2 className="text-xl font-bold text-slate-900">{lesson.title}</h2>
            <p className="text-sm text-slate-600 mt-1">{lesson.description}</p>
          </header>

          {/* 进度条 */}
          <div className="px-6 pt-4">
            <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-slate-600 text-center">
              第 {currentQuestionIndex + 1} 题 / 共 {totalQuestions} 题
            </div>
          </div>

          {/* 题目卡片 */}
          <div className="px-6 py-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              {/* Huskie 吉祥物 */}
              <div className="flex justify-center mb-6">
                <img 
                  src={getHuskieByLearningState(
                    isAnswered 
                      ? (isCorrect ? 'correct' : 'incorrect')
                      : 'studying'
                  )} 
                  alt="Huskie" 
                  className="w-24 h-24 rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.type === 'single_choice' && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all touch-manipulation ${
                          selectedAnswer === option
                            ? isAnswered && isCorrect
                              ? 'border-teal-500 bg-teal-50'
                              : isAnswered && !isCorrect
                              ? 'border-red-300 bg-red-50'
                              : 'border-teal-300 bg-teal-50'
                            : isAnswered && option === currentQuestion.correctAnswer
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-slate-200 bg-white active:bg-slate-50'
                        } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                        onClick={() => !isAnswered && setSelectedAnswer(option)}
                        disabled={isAnswered}
                      >
                        <span className="text-slate-900 font-medium">{option}</span>
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'fill_in_blank' && (
                  <div>
                    <input
                      type="text"
                      className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none text-slate-900 bg-white"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="请输入答案（多个答案可用逗号分隔）"
                      disabled={isAnswered}
                    />
                  </div>
                )}
              </div>

              {!isAnswered && (
                <button
                  className={`w-full py-4 px-6 rounded-xl font-medium transition-colors touch-manipulation ${
                    (currentQuestion.type === 'single_choice' && !selectedAnswer) ||
                    (currentQuestion.type === 'fill_in_blank' && !userAnswer.trim())
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-teal-500 text-white active:bg-teal-600 shadow-lg'
                  }`}
                  onClick={handleSubmit}
                  disabled={
                    (currentQuestion.type === 'single_choice' && !selectedAnswer) ||
                    (currentQuestion.type === 'fill_in_blank' && !userAnswer.trim())
                  }
                >
                  提交答案
                </button>
              )}

              {isAnswered && (
                <div className={`mt-4 p-4 rounded-xl ${
                  isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      {isCorrect ? (
                        <div>
                          <strong className="text-green-800 block mb-2">回答正确！</strong>
                          {currentQuestion.explanation && (
                            <p className="text-green-700 text-sm">{currentQuestion.explanation}</p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <strong className="text-red-800 block mb-2">回答错误</strong>
                          <p className="text-red-700 text-sm mb-2">
                            正确答案：{currentQuestion.correctAnswer}
                          </p>
                          {currentQuestion.explanation && (
                            <p className="text-red-700 text-sm">{currentQuestion.explanation}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {isAnswered && (
                <button 
                  className="w-full mt-4 py-4 px-6 bg-teal-500 text-white rounded-xl font-medium active:bg-teal-600 transition-colors touch-manipulation shadow-lg"
                  onClick={handleNext}
                >
                  {currentQuestionIndex < totalQuestions - 1 ? '下一题' : '查看结果'}
                </button>
              )}
            </div>
          </div>
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
              onClick={onBackToList}
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

export default Quiz;
