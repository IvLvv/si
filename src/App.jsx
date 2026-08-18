import { useCallback, useEffect, useState } from 'react'
import { pack } from './data/pack.js'
import { loadUsed, saveUsed, loadScore, saveScore } from './storage.js'
import Gate from './components/Gate.jsx'
import Score from './components/Score.jsx'
import Board from './components/Board.jsx'
import QuestionScreen from './components/QuestionScreen.jsx'

const AUTH_KEY = 'si-game-auth'
const cellId = (t, q) => `${t}-${q}`

export default function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === '1')
  const [used, setUsed] = useState(loadUsed)
  const [score, setScore] = useState(loadScore)
  const [active, setActive] = useState(null) // { t, q, revealed } либо null — поле

  useEffect(() => {
    saveUsed(used)
  }, [used])

  useEffect(() => {
    saveScore(score)
  }, [score])

  // Закрыть вопрос: клетка гаснет, при verdict меняем счёт.
  const close = useCallback(
    (verdict) => {
      setActive((a) => {
        if (!a) return null
        const id = cellId(a.t, a.q)
        setUsed((u) => (u.includes(id) ? u : [...u, id]))
        if (verdict != null) {
          const price = pack.base * (a.q + 1)
          setScore((s) => s + (verdict ? price : -price))
        }
        return null
      })
    },
    []
  )

  // Кнопка «назад» в браузере/на телефоне возвращает к полю, а не уводит с сайта.
  useEffect(() => {
    if (!active) return
    window.history.pushState({ si: true }, '')
    const onPop = () => close(null)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [active, close])

  const leave = (verdict) => {
    if (window.history.state?.si) {
      close(verdict)
      window.history.back()
    } else {
      close(verdict)
    }
  }

  const pass = () => {
    localStorage.setItem(AUTH_KEY, '1')
    setAuthed(true)
  }

  const resetAll = () => {
    setUsed([])
    setScore(0)
  }

  if (!authed) return <Gate onPass={pass} />

  if (active) {
    const theme = pack.themes[active.t]
    const question = {
      theme: theme.name,
      price: pack.base * (active.q + 1),
      ...theme.questions[active.q],
    }
    return (
      <QuestionScreen
        question={question}
        revealed={active.revealed}
        score={score}
        onReveal={() => setActive({ ...active, revealed: true })}
        onFinish={leave}
      />
    )
  }

  const openQuestion = (t, q) => {
    if (used.includes(cellId(t, q))) return
    setActive({ t, q, revealed: false })
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>{pack.title}</h1>
        <div className="topbar-actions">
          <Score value={score} />
          <button className="btn ghost" onClick={resetAll}>
            Сбросить
          </button>
        </div>
      </header>

      <Board themes={pack.themes} base={pack.base} used={used} onPick={openQuestion} cellId={cellId} />
    </div>
  )
}
