import { useEffect, useMemo, useState } from 'react'
import { fetchWeatherForSpot, hasWeatherApiKey } from '../services/weatherService.js'

export function useSpotWeather(spots) {
  const [weatherBySpot, setWeatherBySpot] = useState({})
  const [status, setStatus] = useState(hasWeatherApiKey() ? 'loading' : 'missing-key')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!hasWeatherApiKey()) {
      setStatus('missing-key')
      return undefined
    }

    const controller = new AbortController()
    let active = true

    async function load() {
      setStatus('loading')
      setError(null)
      const results = await Promise.allSettled(
        spots.map((spot) => fetchWeatherForSpot(spot, { signal: controller.signal })),
      )

      if (!active) return

      const next = {}
      let firstError = null
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') next[spots[index].id] = result.value
        else if (!firstError && result.reason?.name !== 'AbortError') firstError = result.reason
      })

      setWeatherBySpot(next)
      if (Object.keys(next).length) setStatus('success')
      else if (firstError) {
        setStatus('error')
        setError(firstError.message)
      }
    }

    load()
    return () => {
      active = false
      controller.abort()
    }
  }, [spots])

  return useMemo(() => ({ weatherBySpot, status, error }), [weatherBySpot, status, error])
}
