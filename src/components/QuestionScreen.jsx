import { useEffect } from 'react'

export default function QuestionScreen({ question, revealed, onReveal, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    const onKey = (e) => {
      if (e.key === 'Escape') onBack()
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (revealed) onBack()
        else onReveal()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBack, onReveal, revealed])

  return (
    <div className="app page">
      <header className="topbar">
        <button className="btn ghost" onClick={onBack}>
          ← К полю
        </button>
        <div className="topbar-actions">
          <span className="badge">{question.theme}</span>
          <span className="badge price">{question.price}</span>
        </div>
      </header>

      <div className="page-body">
        {revealed ? (
          <>
            {question.a && <p className="answer-text">{question.a}</p>}
            {question.aVideo && <Video src={question.aVideo} key={question.aVideo} />}
          </>
        ) : (
          <>
            {question.q && <p className="question-text">{question.q}</p>}
            {question.qVideo && <Video src={question.qVideo} key={question.qVideo} />}
          </>
        )}
      </div>

      <button className="btn primary big wide" onClick={revealed ? onBack : onReveal}>
        {revealed ? 'К полю' : 'Показать ответ'}
      </button>
    </div>
  )
}

function Video({ src }) {
  return (
    <video className="media" src={src} controls autoPlay playsInline preload="metadata">
      Браузер не умеет проигрывать это видео.
    </video>
  )
}
