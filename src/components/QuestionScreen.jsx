import { useEffect } from 'react'
import Score from './Score.jsx'

export default function QuestionScreen({ question, revealed, score, onReveal, onFinish }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    const onKey = (e) => {
      if (e.key === 'Escape') onFinish(null)
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (!revealed) onReveal()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onFinish, onReveal, revealed])

  return (
    <div className="app page">
      <header className="topbar">
        <button className="btn ghost" onClick={() => onFinish(null)}>
          ← К полю
        </button>
        <div className="topbar-actions">
          <Score value={score} />
          <span className="badge">{question.theme}</span>
          <span className="badge price">{question.price}</span>
        </div>
      </header>

      <div className="page-body">
        {revealed ? (
          <>
            {question.a && <p className="answer-text">{question.a}</p>}
            {question.aImage && <Image src={question.aImage} key={question.aImage} />}
            {question.aVideo && <Video src={question.aVideo} key={question.aVideo} />}
          </>
        ) : (
          <>
            {question.q && <p className="question-text">{question.q}</p>}
            {question.qImage && <Image src={question.qImage} key={question.qImage} />}
            {question.qVideo && <Video src={question.qVideo} key={question.qVideo} />}
          </>
        )}
      </div>

      {revealed ? (
        <div className="verdict">
          <button className="btn big right" onClick={() => onFinish(true)}>
            Правильно +{question.price}
          </button>
          <button className="btn big wrong" onClick={() => onFinish(false)}>
            Неправильно −{question.price}
          </button>
        </div>
      ) : (
        <button className="btn primary big wide" onClick={onReveal}>
          Показать ответ
        </button>
      )}
    </div>
  )
}

function Image({ src }) {
  return <img className="media" src={src} alt="" />
}

function Video({ src }) {
  return (
    <video className="media" src={src} controls autoPlay playsInline preload="metadata">
      Браузер не умеет проигрывать это видео.
    </video>
  )
}
