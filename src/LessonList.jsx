import { useEffect } from 'react';
import { lessons } from './data';
import './App.css';
import { speakText, stopSpeech, isSpeechSupported } from './utils/speech';

function LessonList({ onSelectLesson }) {
  // 组件卸载时停止语音
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // 播放关卡信息
  const handlePlayLesson = (lesson) => {
    const text = `关卡 ${lesson.id}：${lesson.title}。${lesson.description}。共 ${lesson.questions.length} 道题。`;
    speakText(text);
  };

  return (
    <div className="lesson-list-container">
      <div className="app-header">
        <h1 className="app-title">五行 · 天干地支</h1>
        {isSpeechSupported() && (
          <button 
            className="play-title-button" 
            onClick={() => speakText('五行天干地支背诵练习小程序')}
            title="听标题"
          >
            🔊
          </button>
        )}
      </div>
      <p className="app-subtitle">背诵练习小程序</p>
      
      <div className="lessons-grid">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="lesson-card"
          >
            <div className="lesson-card-header">
              <span className="lesson-number">关卡 {lesson.id}</span>
              {isSpeechSupported() && (
                <button 
                  className="play-lesson-button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayLesson(lesson);
                  }}
                  title="听关卡介绍"
                >
                  🔊
                </button>
              )}
            </div>
            <div onClick={() => onSelectLesson(lesson)} className="lesson-card-content">
              <h2 className="lesson-title">{lesson.title}</h2>
              <p className="lesson-description">{lesson.description}</p>
              <div className="lesson-footer">
                <span className="question-count">{lesson.questions.length} 道题</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonList;

