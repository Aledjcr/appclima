import SportScore from '../score/SportScore.jsx'

function format(value, suffix = '') {
  return value == null ? '—' : `${Math.round(value)}${suffix}`
}

export default function ComparePanel({ spots, weatherBySpot, scores, distances, onRemove, onClear }) {
  if (!spots.length) return null

  return (
    <section className="compare-drawer">
      <div className="compare-drawer__header">
        <div>
          <span className="eyebrow">Comparador</span>
          <h2>{spots.length === 1 ? 'Elegí otro spot' : `Comparando ${spots.length} lugares`}</h2>
        </div>
        <button className="text-button" onClick={onClear}>Limpiar</button>
      </div>

      <div className="compare-grid" style={{ '--compare-columns': spots.length }}>
        <div className="compare-grid__labels" aria-hidden="true">
          <span></span><span>Sport Score</span><span>Temperatura</span><span>Lluvia</span><span>Viento</span><span>Humedad</span><span>Distancia</span>
        </div>
        {spots.map((spot) => {
          const current = weatherBySpot[spot.id]?.current
          return (
            <article className="compare-column" key={spot.id}>
              <div className="compare-column__title">
                <strong>{spot.shortName}</strong>
                <button aria-label={`Quitar ${spot.name}`} onClick={() => onRemove(spot.id)}>×</button>
              </div>
              <div className="compare-value"><SportScore result={scores[spot.id]} compact /></div>
              <div className="compare-value"><span>Temperatura</span><strong>{format(current?.temperature, '°')}</strong></div>
              <div className="compare-value"><span>Lluvia</span><strong>{format(current?.precipitationProbability, '%')}</strong></div>
              <div className="compare-value"><span>Viento</span><strong>{format(current?.windSpeed, ' km/h')}</strong></div>
              <div className="compare-value"><span>Humedad</span><strong>{format(current?.humidity, '%')}</strong></div>
              <div className="compare-value"><span>Distancia</span><strong>{distances[spot.id] == null ? '—' : `${distances[spot.id].toFixed(0)} km`}</strong></div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
