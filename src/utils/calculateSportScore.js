import { sports } from '../data/sports.js'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

function rangeScore(value, { idealMin, idealMax, hardMin = idealMin - 10, hardMax = idealMax + 10 }) {
  if (value >= idealMin && value <= idealMax) return 1
  if (value < idealMin) return clamp((value - hardMin) / (idealMin - hardMin))
  return clamp((hardMax - value) / (hardMax - idealMax))
}

function maxScore(value, idealMax, hardMax) {
  if (value <= idealMax) return 1
  return clamp((hardMax - value) / (hardMax - idealMax))
}

function precipitationScore(probability, rainMm = 0) {
  const probabilityFactor = 1 - clamp(probability / 100)
  const rainPenalty = clamp(1 - rainMm / 3)
  return probabilityFactor * rainPenalty
}

function getRating(score) {
  if (score >= 85) return { key: 'excellent', label: 'Excelentes condiciones' }
  if (score >= 70) return { key: 'good', label: 'Buenas condiciones' }
  if (score >= 50) return { key: 'fair', label: 'Condiciones regulares' }
  return { key: 'poor', label: 'Poco recomendable' }
}

function getWarnings(weather) {
  const warnings = []
  if (weather.precipitationProbability >= 60 || weather.rainMm >= 1) warnings.push('Posible lluvia')
  if (weather.windSpeed >= 35) warnings.push('Viento fuerte')
  if (weather.temperature >= 32) warnings.push('Temperatura alta')
  if (weather.temperature <= 3) warnings.push('Temperatura muy baja')
  if (weather.humidity >= 85) warnings.push('Humedad elevada')
  return warnings
}

export function calculateSportScore(weather, sportId = 'sport-climbing') {
  if (!weather) return null

  const sport = sports.find((item) => item.id === sportId && item.scoring)
  if (!sport) return null

  const rules = sport.scoring
  const parts = {
    temperature: rangeScore(weather.temperature, rules.temperature),
    precipitation: precipitationScore(weather.precipitationProbability, weather.rainMm),
    wind: maxScore(weather.windSpeed, rules.wind.idealMax, rules.wind.hardMax),
    humidity: rangeScore(weather.humidity, {
      idealMin: rules.humidity.idealMin,
      idealMax: rules.humidity.idealMax,
      hardMin: 10,
      hardMax: 100,
    }),
    feelsLike: rangeScore(weather.feelsLike, rules.feelsLike),
  }

  const score = Math.round(
    parts.temperature * rules.temperature.weight * 100 +
      parts.precipitation * rules.precipitation.weight * 100 +
      parts.wind * rules.wind.weight * 100 +
      parts.humidity * rules.humidity.weight * 100 +
      parts.feelsLike * rules.feelsLike.weight * 100,
  )

  return {
    score,
    rating: getRating(score),
    warnings: getWarnings(weather),
    breakdown: Object.fromEntries(Object.entries(parts).map(([key, value]) => [key, Math.round(value * 100)])),
  }
}
