import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { updateLessonProgress } from './utils/progress';
import { getHuskieByLearningState, getHuskieImage } from './utils/huskieAssets';

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
  const [shuffleKey, setShuffleKey] = useState(0); // 用于触发重新随机化

  // 为所有题目生成随机化的选项（每次 shuffleKey 变化时重新生成）
  const randomizedQuestions = useMemo(() => {
    return lesson.questions.map(question => {
      if (question.type === 'single_choice' && question.options) {
        // 随机打乱选项顺序
        const shuffledOptions = shuffleArray(question.options);
        return {
          ...question,
          options: shuffledOptions,
          // 正确答案保持不变，因为选项的值没变，只是顺序变了
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
        // 填空题答案处理：去除空格和标点符号，只比较内容
        const normalizeAnswer = (ans) => {
          return ans
            .trim()
            .replace(/[，,、。；：！？\s]/g, '') // 去除所有标点符号和空格
            .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''); // 只保留中文、英文和数字
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
      // 保存进度
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
    setShuffleKey(prev => prev + 1); // 触发重新随机化选项
  };

  const handleComplete = () => {
    // 保存进度
    updateLessonProgress(lesson.id, score, totalQuestions);
  };

  if (showSummary) {
    // 根据正确率选择 Huskie 状态
    const accuracy = (score / totalQuestions) * 100;
    const huskieState = accuracy === 100 ? 'dragon' : accuracy >= 80 ? 'happy' : 'study';
    const huskieImage = getHuskieImage(huskieState);
    
    return (
      <div className="quiz-container">
        <div className="summary-card">
          <div className="summary-huskie">
            <img 
              src={huskieImage} 
              alt="Huskie" 
              className="huskie-image"
              onError={(e) => {
                // 如果图片不存在，隐藏图片
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h2 className="summary-title">关卡完成！</h2>
          <div className="score-display">
            <div className="score-number">{score}</div>
            <div className="score-total">/ {totalQuestions}</div>
          </div>
          <p className="score-text">
            正确率：{Math.round(accuracy)}%
          </p>
          <div className="summary-buttons">
            <button className="btn btn-secondary" onClick={handleRestart}>
              再刷一遍
            </button>
            <button className="btn btn-primary" onClick={onBackToList}>
              返回关卡列表
            </button>
          </div>
        </div>

        {/* 底部导航 */}
        <div className="bottom-nav">
          <div 
            className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavClick('home')}
          >
            <span className="material-icons">home</span>
          </div>
          <div 
            className={`nav-item ${currentView === 'map' ? 'active' : ''}`}
            onClick={() => onNavClick('map')}
          >
            <span className="material-icons">map</span>
          </div>
          <div className="nav-item" onClick={() => onNavClick('profile')}>
            <span className="material-icons">person</span>
          </div>
          <div className="nav-item" onClick={() => onNavClick('settings')}>
            <span className="material-icons">settings</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="back-button" onClick={onBackToList}>
          ← 返回
        </button>
        <h2 className="quiz-lesson-title">{lesson.title}</h2>
        <p className="quiz-description">{lesson.description}</p>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-text">
        第 {currentQuestionIndex + 1} 题 / 共 {totalQuestions} 题
      </div>

      <div className="question-card">
        {/* Huskie 吉祥物显示 */}
        <div className="question-huskie">
          <img 
            src={getHuskieByLearningState(
              isAnswered 
                ? (isCorrect ? 'correct' : 'incorrect')
                : 'studying'
            )} 
            alt="Huskie" 
            className="huskie-image"
            onError={(e) => {
              // 如果图片不存在，隐藏图片
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        <div className="question-header">
          <h3 className="question-text">{currentQuestion.question}</h3>
        </div>

        {currentQuestion.type === 'single_choice' && (
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswer === option ? 'selected' : ''
                } ${isAnswered && option === currentQuestion.correctAnswer ? 'correct' : ''} ${
                  isAnswered && selectedAnswer === option && !isCorrect ? 'incorrect' : ''
                }`}
                onClick={() => !isAnswered && setSelectedAnswer(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'fill_in_blank' && (
          <div className="fill-blank-container">
            <input
              type="text"
              className="fill-blank-input"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="请输入答案（多个答案可用逗号分隔，也可不带标点）"
              disabled={isAnswered}
            />
          </div>
        )}

        {!isAnswered && (
          <button
            className="btn btn-submit"
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
          <div className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
            <div className="feedback-icon">
              {isCorrect ? '✅' : '❌'}
            </div>
            <div className="feedback-text">
              {isCorrect ? (
                <div>
                  <strong>回答正确！</strong>
                  {currentQuestion.explanation && (
                    <div className="explanation-container">
                      <p className="explanation">{currentQuestion.explanation}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <strong>回答错误</strong>
                  <p>正确答案：{currentQuestion.correctAnswer}</p>
                  {currentQuestion.explanation && (
                    <div className="explanation-container">
                      <p className="explanation">{currentQuestion.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {isAnswered && (
          <button 
            className="btn btn-next" 
            onClick={handleNext}
          >
            {currentQuestionIndex < totalQuestions - 1 ? '下一题' : '查看结果'}
          </button>
        )}
      </div>

      {/* 底部导航 */}
      <div className="bottom-nav">
        <div 
          className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => onNavClick('home')}
        >
          <span className="material-icons">home</span>
        </div>
        <div 
          className={`nav-item ${currentView === 'map' ? 'active' : ''}`}
          onClick={() => onNavClick('map')}
        >
          <span className="material-icons">map</span>
        </div>
        <div className="nav-item" onClick={() => onNavClick('profile')}>
          <span className="material-icons">person</span>
        </div>
        <div className="nav-item" onClick={() => onNavClick('settings')}>
          <span className="material-icons">settings</span>
        </div>
      </div>
    </div>
  );
}

export default Quiz;

