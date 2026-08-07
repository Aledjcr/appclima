import { calculateSportScore } from './calculateSportScore.js'

export function getWeatherEmoji(condition = '') {
  const key = condition.toLowerCase()
  if (key.includes('thunder')) return '⛈️'
  if (key.includes('rain') || key.includes('drizzle')) return '🌧️'
  if (key.includes('snow')) return '❄️'
  if (key.includes('clear')) return '☀️'
  if (key.includes('cloud')) return '☁️'
  if (key.includes('mist') || key.includes('fog')) return '🌫️'
  return '🌤️'
}

export function formatHour(timestamp) {
  return new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit' }).format(timestamp)
}

export function getBestWindow(hourly = [], sportId = 'sport-climbing') {
  if (!hourly.length) return null

  const scored = hourly.map((weather) => ({ weather, result: calculateSportScore(weather, sportId) }))
  const good = scored.filter(({ result }) => result && result.score >= 70)

  if (!good.length) {
    const best = [...scored].sort((a, b) => (b.result?.score ?? 0) - (a.result?.score ?? 0))[0]
    return best
      ? { label: `Mejor opción: ${formatHour(best.weather.timestamp)}`, score: best.result.score }
      : null
  }

  let bestRun = []
  let currentRun = []

  good.forEach((item, index) => {
    if (!currentRun.length) {
      currentRun = [item]
    } else {
      const previous = currentRun[currentRun.length - 1].weather.timestamp
      const isConsecutive = item.weather.timestamp - previous <= 3.5 * 60 * 60 * 1000
      currentRun = isConsecutive ? [...currentRun, item] : [item]
    }
    if (currentRun.length > bestRun.length) bestRun = [...currentRun]

    if (index === good.length - 1 && currentRun.length > bestRun.length) bestRun = [...currentRun]
  })

  const start = bestRun[0]
  const end = bestRun[bestRun.length - 1]
  const average = Math.round(bestRun.reduce((sum, item) => sum + item.result.score, 0) / bestRun.length)

  return {
    label: bestRun.length === 1
      ? `Buena ventana: ${formatHour(start.weather.timestamp)}`
      : `Mejor ventana: ${formatHour(start.weather.timestamp)}–${formatHour(end.weather.timestamp)}`,
    score: average,
  }
}
