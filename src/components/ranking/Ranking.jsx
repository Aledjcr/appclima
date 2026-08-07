import SportScore from '../score/SportScore.jsx'

export default function Ranking({ spots, scores, selectedSpotId, onSelect }) {
  const ranked = spots
    .map((spot) => ({ spot, score: scores[spot.id] }))
    .sort((a, b) => (b.score?.score ?? -1) - (a.score?.score ?? -1))

  return (
    <section className="ranking-panel">
      <div className="section-heading section-heading--ranking">
        <div>
          <span className="eyebrow">Ranking en vivo</span>
          <h2>Mejores spots ahora</h2>
        </div>
      </div>
      <div className="ranking-list">
        {ranked.map(({ spot, score }, index) => (
          <button
            key={spot.id}
            className={`ranking-row ${selectedSpotId === spot.id ? 'is-active' : ''}`}
            onClick={() => onSelect(spot)}
          >
            <span className="ranking-row__position">{index + 1}</span>
            <span className="ranking-row__name"><strong>{spot.shortName}</strong><small>{spot.province}</small></span>
            <SportScore result={score} compact />
          </button>
        ))}
      </div>
    </section>
  )
}
