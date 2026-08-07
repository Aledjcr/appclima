export function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('GEOLOCATION_UNSUPPORTED'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ lat: coords.latitude, lon: coords.longitude }),
      () => reject(new Error('GEOLOCATION_DENIED')),
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
        ...options,
      },
    )
  })
}
