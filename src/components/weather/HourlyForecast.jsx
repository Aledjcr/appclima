import { calculateSportScore } from '../../utils/calculateSportScore.js'
import { formatHour, getWeatherEmoji } from '../../utils/weatherUtils.js'

export default function HourlyForecast({ hourly, sportId }) {
  if (!hourly?.length) return null

  return (
    <section className="forecast-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Próximas horas</span>
          <h3>Cómo evoluciona el día</h3>
        </div>
      </div>
      <div className="hourly-strip">
        {hourly.slice(0, 8).map((weather) => {
          const score = calculateSportScore(weather, sportId)
          return (
            <article className="hour-card" key={weather.timestamp}>
              <span className="hour-card__time">{formatHour(weather.timestamp)}</span>
              <span className="hour-card__icon">{getWeatherEmoji(weather.condition)}</span>
              <strong>{Math.round(weather.temperature)}°</strong>
              <span className={`mini-score mini-score--${score.rating.key}`}>{score.score}</span>
            </article>
          )
        })}
      </div>
    </section>
  )
}
