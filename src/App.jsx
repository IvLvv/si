import { useCallback, useEffect, useState } from 'react'
import { pack } from './data/pack.js'
import { loadUsed, saveUsed } from './storage.js'
import Gate from './components/Gate.jsx'
import Board from './components/Board.jsx'
import QuestionScreen from './components/QuestionScreen.jsx'

const AUTH_KEY = 'si-game-auth'
const cellId = (t, q) => `${t}-${q}`

export default function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === '1')
  const [used, setUsed] = useState(loadUsed)
  const [active, setActive] = useState(null) // { t, q, revealed } либо null — поле
  const [pending, setPending] = useState(null)

  useEffect(() => {
    saveUsed(used)
  }, [used])

  // Кнопка «назад» в браузере/на телефоне возвращает к полю, а не уводит с сайта.
  const back = useCallback(() => {
    if (pending) {
      setUsed((u) => (u.includes(pending) ? u : [...u, pending]))
      setPending(null)
    }
    setActive(null)
  }, [pending])

  useEffect(() => {
    if (!active) return
    window.history.pushState({ si: true }, '')
    const onPop = () => back()
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [active, back])

  const pass = () => {
    localStorage.setItem(AUTH_KEY, '1')
    setAuthed(true)
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
        onReveal={() => setActive({ ...active, revealed: true })}
        onBack={() => {
          if (window.history.state?.si) window.history.back()
          else back()
        }}
      />
    )
  }

  const openQuestion = (t, q) => {
    const id = cellId(t, q)
    if (used.includes(id)) return
    setPending(id)
    setActive({ t, q, revealed: false })
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>{pack.title}</h1>
        <button className="btn ghost" onClick={() => setUsed([])}>
          Сбросить
        </button>
      </header>

      <Board themes={pack.themes} base={pack.base} used={used} onPick={openQuestion} cellId={cellId} />
    </div>
  )
}
