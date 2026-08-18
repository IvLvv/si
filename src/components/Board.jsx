export default function Board({ themes, base, used, onPick, cellId }) {
  const cols = Math.max(...themes.map((t) => t.questions.length))

  return (
    <div className="board-scroll">
      <div className="board">
        {themes.map((theme, t) => (
          <div className="board-row" key={t}>
            <div className="theme">{theme.name}</div>
            <div className="cells" style={{ '--cols': cols }}>
              {theme.questions.length === 0 && <div className="cells-empty">Скоро</div>}
              {theme.questions.map((_, q) => {
                const isUsed = used.includes(cellId(t, q))
                return (
                  <button
                    key={q}
                    className={'cell' + (isUsed ? ' used' : '')}
                    disabled={isUsed}
                    onClick={() => onPick(t, q)}
                  >
                    {isUsed ? '' : base * (q + 1)}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
