const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

function getApiKey() {
  return import.meta.env.VITE_OPENWEATHER_API_KEY?.trim()
}

function normalizeForecastEntry(entry) {
  return {
    timestamp: entry.dt * 1000,
    temperature: entry.main.temp,
    feelsLike: entry.main.feels_like,
    tempMin: entry.main.temp_min,
    tempMax: entry.main.temp_max,
    humidity: entry.main.humidity,
    windSpeed: entry.wind.speed * 3.6,
    windGust: entry.wind.gust ? entry.wind.gust * 3.6 : null,
    precipitationProbability: Math.round((entry.pop ?? 0) * 100),
    rainMm: entry.rain?.['3h'] ?? 0,
    condition: entry.weather?.[0]?.main ?? '',
    description: entry.weather?.[0]?.description ?? '',
    icon: entry.weather?.[0]?.icon ?? '',
  }
}

export function hasWeatherApiKey() {
  return Boolean(getApiKey())
}

export async function fetchWeatherForSpot(spot, { signal } = {}) {
  const apiKey = getApiKey()

  if (!apiKey) {
    throw new Error('MISSING_API_KEY')
  }

  const params = new URLSearchParams({
    lat: String(spot.coordinates.lat),
    lon: String(spot.coordinates.lon),
    appid: apiKey,
    units: 'metric',
    lang: 'es',
  })

  const response = await fetch(`${FORECAST_URL}?${params}`, { signal })

  if (!response.ok) {
    if (response.status === 401) throw new Error('INVALID_API_KEY')
    if (response.status === 429) throw new Error('RATE_LIMIT')
    throw new Error(`WEATHER_HTTP_${response.status}`)
  }

  const data = await response.json()
  const forecast = data.list.map(normalizeForecastEntry)

  return {
    spotId: spot.id,
    cityName: data.city?.name ?? spot.name,
    timezoneOffset: data.city?.timezone ?? 0,
    current: forecast[0],
    hourly: forecast.slice(0, 16),
    updatedAt: Date.now(),
  }
}
