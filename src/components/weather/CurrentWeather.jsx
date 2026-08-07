import { getWeatherEmoji } from '../../utils/weatherUtils.js'

export default function CurrentWeather({ weather }) {
  if (!weather) return null

  const items = [
    ['Sensación', `${Math.round(weather.feelsLike)}°`],
    ['Lluvia', `${weather.precipitationProbability}%`],
    ['Viento', `${Math.round(weather.windSpeed)} km/h`],
    ['Humedad', `${weather.humidity}%`],
  ]

  return (
    <section className="weather-now">
      <div className="weather-now__hero">
        <div className="weather-now__icon" aria-hidden="true">{getWeatherEmoji(weather.condition)}</div>
        <div>
          <div className="weather-now__temp">{Math.round(weather.temperature)}°</div>
          <div className="weather-now__description">{weather.description}</div>
        </div>
      </div>
      <div className="metric-grid">
        {items.map(([label, value]) => (
          <div className="metric" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
