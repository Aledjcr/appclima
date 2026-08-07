export default function SportScore({ result, compact = false }) {
  if (!result) return <div className="score score--empty">—</div>

  return (
    <div className={`score score--${result.rating.key} ${compact ? 'score--compact' : ''}`}>
      <div className="score__value"><strong>{result.score}</strong><span>/100</span></div>
      {!compact && (
        <div className="score__copy">
          <span>Sport Score</span>
          <strong>{result.rating.label}</strong>
        </div>
      )}
    </div>
  )
}
