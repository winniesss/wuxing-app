import { useState, useEffect } from 'react';
import { lessons } from './data';
import { stopSpeech, isSpeechSupported, speakQuestion, speakText } from './utils/speech';
import './App.css';

function ListenPage({ lesson, onBack, currentView, onNavClick }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const totalQuestions = lesson.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handlePlayQuestion = () => {
    if (isSpeechSupported()) {
      setIsPlaying(true);
      speakQuestion(currentQuestion);
      
      // 监听播放结束
      const checkEnd = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsPlaying(false);
          clearInterval(checkEnd);
        }
      }, 500);
      
      setTimeout(() => {
        clearInterval(checkEnd);
        setIsPlaying(false);
      }, 60000);
    }
  };

  const handlePlayExplanation = () => {
    if (currentQuestion.explanation && isSpeechSupported()) {
      setIsPlaying(true);
      speakText(currentQuestion.explanation, { rate: 0.85 });
      
      const checkEnd = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsPlaying(false);
          clearInterval(checkEnd);
        }
      }, 500);
      
      setTimeout(() => {
        clearInterval(checkEnd);
        setIsPlaying(false);
      }, 60000);
    }
  };

  const handleNext = () => {
    stopSpeech();
    setIsPlaying(false);
    setShowExplanation(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 播放完毕
      if (isSpeechSupported()) {
        speakText('课程播放完毕，感谢学习！', { rate: 0.8 });
      }
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      stopSpeech();
      setIsPlaying(false);
      setShowExplanation(false);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleStop = () => {
    stopSpeech();
    setIsPlaying(false);
  };

  return (
    <div className="listen-page-container">
      <div className="listen-header">
        <button className="back-button" onClick={onBack}>
          <span className="material-icons">arrow_back</span>
          <span>返回</span>
        </button>
        <h2 className="listen-title">{lesson.title}</h2>
        <div className="listen-progress">
          第 {currentQuestionIndex + 1} / {totalQuestions} 题
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="listen-content">
        <div className="listen-question-card">
          <div className="question-number-badge">
            第 {currentQuestionIndex + 1} 题
          </div>
          
          <h3 className="listen-question-text">{currentQuestion.question}</h3>

          {currentQuestion.type === 'single_choice' && currentQuestion.options && (
            <div className="listen-options">
              {currentQuestion.options.map((option, index) => {
                const letter = String.fromCharCode(65 + index);
                return (
                  <div key={index} className="listen-option">
                    <span className="option-letter">{letter}</span>
                    <span className="option-text">{option}</span>
                  </div>
                );
              })}
            </div>
          )}

          {currentQuestion.type === 'fill_in_blank' && (
            <div className="listen-fill-blank">
              <div className="fill-blank-hint">填空题</div>
            </div>
          )}

          <div className="listen-controls">
            {!isPlaying ? (
              <>
                <button 
                  className="listen-play-btn"
                  onClick={handlePlayQuestion}
                >
                  <span className="material-icons">play_arrow</span>
                  <span>播放题目</span>
                </button>
                {currentQuestion.explanation && !showExplanation && (
                  <button 
                    className="listen-show-explanation-btn"
                    onClick={() => setShowExplanation(true)}
                  >
                    <span className="material-icons">info</span>
                    <span>查看解释</span>
                  </button>
                )}
              </>
            ) : (
              <button 
                className="listen-stop-btn"
                onClick={handleStop}
              >
                <span className="material-icons">stop</span>
                <span>停止播放</span>
              </button>
            )}
          </div>

          {showExplanation && currentQuestion.explanation && (
            <div className="listen-explanation">
              <div className="explanation-header">
                <span className="material-icons">lightbulb</span>
                <span>解释</span>
              </div>
              <p className="explanation-text">{currentQuestion.explanation}</p>
              <div className="explanation-controls">
                <button 
                  className="listen-play-explanation-btn"
                  onClick={handlePlayExplanation}
                  disabled={isPlaying}
                >
                  <span className="material-icons">volume_up</span>
                  <span>播放解释</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="listen-navigation">
          <button 
            className="nav-btn prev-btn"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            <span className="material-icons">chevron_left</span>
            <span>上一题</span>
          </button>
          <button 
            className="nav-btn next-btn"
            onClick={handleNext}
          >
            <span>{currentQuestionIndex < totalQuestions - 1 ? '下一题' : '完成'}</span>
            <span className="material-icons">chevron_right</span>
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

export default ListenPage;

