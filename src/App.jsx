import { useMemo, useState } from 'react'
import Header from './components/layout/Header.jsx'
import AppLayout from './components/layout/AppLayout.jsx'
import SpotMap from './components/map/SpotMap.jsx'
import SpotDetails from './components/spots/SpotDetails.jsx'
import Ranking from './components/ranking/Ranking.jsx'
import ComparePanel from './components/comparison/ComparePanel.jsx'
import { spots } from './data/spots.js'
import { sports } from './data/sports.js'
import { useSpotWeather } from './hooks/useSpotWeather.js'
import { useGeolocation } from './hooks/useGeolocation.js'
import { calculateSportScore } from './utils/calculateSportScore.js'
import { calculateDistance } from './utils/calculateDistance.js'

const MAX_COMPARISON_SPOTS = 3

export default function App() {
  const [sportId] = useState('sport-climbing')
  const [selectedSpot, setSelectedSpot] = useState(spots[0])
  const [comparisonIds, setComparisonIds] = useState([])
  const { weatherBySpot, status: weatherStatus, error: weatherError } = useSpotWeather(spots)
  const { location, status: locationStatus, requestLocation } = useGeolocation()

  const activeSport = sports.find((sport) => sport.id === sportId)

  const scores = useMemo(
    () => Object.fromEntries(spots.map((spot) => [spot.id, calculateSportScore(weatherBySpot[spot.id]?.current, sportId)])),
    [weatherBySpot, sportId],
  )

  const distances = useMemo(
    () => Object.fromEntries(spots.map((spot) => [spot.id, calculateDistance(location, spot.coordinates)])),
    [location],
  )

  const comparedSpots = comparisonIds.map((id) => spots.find((spot) => spot.id === id)).filter(Boolean)

  function toggleComparison(spotId) {
    setComparisonIds((current) => {
      if (current.includes(spotId)) return current.filter((id) => id !== spotId)
      if (current.length >= MAX_COMPARISON_SPOTS) return [...current.slice(1), spotId]
      return [...current, spotId]
    })
  }

  return (
    <div className="app">
      <Header sport={activeSport} onLocate={requestLocation} locationStatus={locationStatus} />
      <AppLayout
        map={
          <div className="map-frame">
            <SpotMap
              spots={spots}
              selectedSpot={selectedSpot}
              onSelectSpot={setSelectedSpot}
              scores={scores}
              userLocation={location}
            />
            <div className="map-overlay map-overlay--top">
              <span className="map-kicker">Córdoba · Argentina</span>
              <strong>Explorá las mejores condiciones para escalar</strong>
            </div>
            <div className="map-legend">
              <span><i className="legend-dot legend-dot--excellent"></i> Excelente</span>
              <span><i className="legend-dot legend-dot--good"></i> Bueno</span>
              <span><i className="legend-dot legend-dot--fair"></i> Regular</span>
            </div>
          </div>
        }
        sidebar={
          <div className="sidebar-stack">
            <SpotDetails
              spot={selectedSpot}
              weather={weatherBySpot[selectedSpot.id]}
              score={scores[selectedSpot.id]}
              sportId={sportId}
              weatherStatus={weatherStatus}
              weatherError={weatherError}
              distance={distances[selectedSpot.id]}
              compared={comparisonIds.includes(selectedSpot.id)}
              onToggleCompare={() => toggleComparison(selectedSpot.id)}
            />
            <Ranking spots={spots} scores={scores} selectedSpotId={selectedSpot.id} onSelect={setSelectedSpot} />
          </div>
        }
        comparison={
          <ComparePanel
            spots={comparedSpots}
            weatherBySpot={weatherBySpot}
            scores={scores}
            distances={distances}
            onRemove={(id) => setComparisonIds((current) => current.filter((item) => item !== id))}
            onClear={() => setComparisonIds([])}
          />
        }
      />
    </div>
  )
}
