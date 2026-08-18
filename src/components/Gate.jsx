import { useState } from 'react'

// Защита клиентская: пароль лежит в бандле, от целенаправленного взлома не спасает.
const PASSWORD = 'stefawife'

export default function Gate({ onPass }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (value.trim().toLowerCase() === PASSWORD) onPass()
    else {
      setError(true)
      setValue('')
    }
  }

  return (
    <form className="gate" onSubmit={submit}>
      <h1 className="setup-title">Своя игра</h1>
      <input
        type="password"
        autoFocus
        value={value}
        placeholder="Пароль"
        onChange={(e) => {
          setValue(e.target.value)
          setError(false)
        }}
      />
      {error && <p className="error">Неверный пароль</p>}
      <button className="btn primary big" type="submit">
        Войти
      </button>
    </form>
  )
}
