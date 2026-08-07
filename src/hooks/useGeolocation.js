import { useCallback, useState } from 'react'
import { getCurrentPosition } from '../services/geolocationService.js'

export function useGeolocation() {
  const [location, setLocation] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const requestLocation = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const position = await getCurrentPosition()
      setLocation(position)
      setStatus('success')
      return position
    } catch (err) {
      setError(err.message)
      setStatus('error')
      return null
    }
  }, [])

  return { location, status, error, requestLocation }
}
