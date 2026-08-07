export const sports = [
  {
    id: 'sport-climbing',
    name: 'Escalada deportiva',
    icon: '🧗',
    enabled: true,
    scoring: {
      temperature: { weight: 0.3, idealMin: 10, idealMax: 24, hardMin: 0, hardMax: 34 },
      precipitation: { weight: 0.3 },
      wind: { weight: 0.15, idealMax: 25, hardMax: 55 },
      humidity: { weight: 0.15, idealMin: 30, idealMax: 70 },
      feelsLike: { weight: 0.1, idealMin: 8, idealMax: 26, hardMin: -2, hardMax: 36 },
    },
  },
  { id: 'trekking', name: 'Trekking', icon: '🥾', enabled: false },
  { id: 'mountain-bike', name: 'Mountain bike', icon: '🚵', enabled: false },
  { id: 'kayak', name: 'Kayak', icon: '🛶', enabled: false },
]
