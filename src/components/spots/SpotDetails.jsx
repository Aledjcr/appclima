import CurrentWeather from '../weather/CurrentWeather.jsx'
import HourlyForecast from '../weather/HourlyForecast.jsx'
import SportScore from '../score/SportScore.jsx'
import WeatherAlert from '../weather/WeatherAlert.jsx'
import { getBestWindow } from '../../utils/weatherUtils.js'

function WeatherStatus({ status, error }) {
  if (status === 'missing-key') {
    return (
      <div className="empty-state empty-state--config">
        <span className="empty-state__icon">🔑</span>
        <h3>Conectá OpenWeather</h3>
        <p>Copiá <code>.env.example</code> como <code>.env</code> y configurá <code>VITE_OPENWEATHER_API_KEY</code>.</p>
      </div>
    )
  }
  if (status === 'loading') return <div className="panel-loading"><span></span> Consultando el clima…</div>
  if (status === 'error') return <div className="empty-state"><h3>No pudimos cargar el clima</h3><p>{error ?? 'Revisá la conexión y la API key.'}</p></div>
  return null
}

export default function SpotDetails({ spot, weather, score, sportId, weatherStatus, weatherError, distance, compared, onToggleCompare }) {
  if (!spot) return null
  const bestWindow = weather ? getBestWindow(weather.hourly, sportId) : null

  return (
    <div className="spot-detail">
      <div className="spot-detail__header">
        <div>
          <span className="eyebrow">Spot seleccionado</span>
          <h1>{spot.name}</h1>
          <p>{spot.province}, {spot.country}{distance != null ? ` · ${distance.toFixed(0)} km desde vos` : ''}</p>
        </div>
        {score && <SportScore result={score} />}
      </div>

      {bestWindow && (
        <div className="best-window">
          <span aria-hidden="true">✦</span>
          <div><span>Recomendación</span><strong>{bestWindow.label}</strong></div>
          <b>{bestWindow.score}/100</b>
        </div>
      )}

      {weather ? (
        <>
          <WeatherAlert warnings={score?.warnings} />
          <CurrentWeather weather={weather.current} />
          <HourlyForecast hourly={weather.hourly} sportId={sportId} />
        </>
      ) : (
        <WeatherStatus status={weatherStatus} error={weatherError} />
      )}

      <div className="spot-detail__footer">
        <button className={`button button--wide ${compared ? 'button--selected' : 'button--primary'}`} onClick={onToggleCompare}>
          {compared ? '✓ Agregado a comparación' : '+ Comparar este lugar'}
        </button>
      </div>
    </div>
  )
}
