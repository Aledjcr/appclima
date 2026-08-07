import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

const DEFAULT_CENTER = [-31.75, -64.68]

function makeSpotIcon(selected, score) {
  const scoreClass = score >= 85 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'fair' : 'poor'
  return L.divIcon({
    className: 'spot-marker-wrapper',
    html: `<div class="spot-marker ${selected ? 'is-selected' : ''} ${score ? `score-${scoreClass}` : ''}"><span>▲</span></div>`,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
    popupAnchor: [0, -22],
  })
}

function makeUserIcon() {
  return L.divIcon({
    className: 'user-marker-wrapper',
    html: '<div class="user-marker"><span></span></div>',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })
}

function MapFocus({ spot, userLocation }) {
  const map = useMap()
  useEffect(() => {
    if (spot) map.flyTo([spot.coordinates.lat, spot.coordinates.lon], Math.max(map.getZoom(), 10), { duration: 0.7 })
    else if (userLocation) map.flyTo([userLocation.lat, userLocation.lon], Math.max(map.getZoom(), 9), { duration: 0.7 })
  }, [spot, userLocation, map])
  return null
}

export default function SpotMap({ spots, selectedSpot, onSelectSpot, scores, userLocation }) {
  const markerIcons = useMemo(
    () => Object.fromEntries(spots.map((spot) => [spot.id, makeSpotIcon(selectedSpot?.id === spot.id, scores[spot.id]?.score)])),
    [spots, selectedSpot, scores],
  )

  return (
    <MapContainer center={DEFAULT_CENTER} zoom={8} minZoom={6} className="spot-map" zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.coordinates.lat, spot.coordinates.lon]}
          icon={markerIcons[spot.id]}
          eventHandlers={{ click: () => onSelectSpot(spot) }}
        >
          <Popup>
            <strong>{spot.name}</strong><br />
            {scores[spot.id] ? `Sport Score: ${scores[spot.id].score}/100` : 'Esperando datos meteorológicos'}
          </Popup>
        </Marker>
      ))}
      {userLocation && <Marker position={[userLocation.lat, userLocation.lon]} icon={makeUserIcon()} />}
      <MapFocus spot={selectedSpot} userLocation={userLocation} />
    </MapContainer>
  )
}
