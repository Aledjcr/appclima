export default function WeatherAlert({ warnings }) {
  if (!warnings?.length) return null
  return (
    <div className="weather-alert" role="status">
      <span aria-hidden="true">⚠</span>
      <div>
        <strong>Atención a las condiciones</strong>
        <span>{warnings.join(' · ')}</span>
      </div>
    </div>
  )
}
