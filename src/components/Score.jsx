export default function Score({ value }) {
  return (
    <div className={'score' + (value < 0 ? ' negative' : '')}>
      <span className="score-label">Очки</span>
      <span className="score-value">{value}</span>
    </div>
  )
}
