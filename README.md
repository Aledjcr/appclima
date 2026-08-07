# AppClima React V2
Rediseño de la aplicación original de clima para escalada. La nueva versión usa React + Vite y organiza el proyecto siguiendo el flujo:

**DATA → SERVICES → HOOKS / STATE → LOGIC / UTILS → COMPONENTS → UI**



## Funcionalidades incluidas
- Mapa interactivo con Leaflet + OpenStreetMap.
- Los cuatro spots originales: Cueva de las Brujas, Alta Gracia, La Ola y Copina hardcodeados.
- Selección de spots desde mapa o ranking.
- Pronóstico de OpenWeather por coordenadas.
- Sport Score de 0 a 100 para escalada deportiva.
- Ranking automático de spots.
- Pronóstico de las próximas horas.
- Mejor ventana estimada según Sport Score.
- Alertas de lluvia, viento, humedad y temperaturas extremas.
- Geolocalización del navegador.
- Distancia aproximada en línea recta desde el usuario.
- Diseño responsive para escritorio y móvil.

## Requisitos
- Node.js compatible con Vite 8.
- Una API key de OpenWeather.

## Instalación
```bash
npm install
cp .env.example .env
```

Luego editá `.env`:

```env
VITE_OPENWEATHER_API_KEY=tu_api_key
```

Ejecutá:

```bash
npm run dev
```

Para generar una versión de producción:

```bash
npm run build
```

## Nota sobre la API key
Las variables `VITE_*` se incluyen en el bundle del frontend. Para un proyecto escolar/MVP esto simplifica el desarrollo, pero no debe considerarse almacenamiento secreto. Si el proyecto evoluciona a producción, se recomienda mover el acceso a la API meteorológica a un backend o función serverless.

## Estructura

```text
src/
├── components/
│   ├── comparison/
│   ├── layout/
│   ├── map/
│   ├── ranking/
│   ├── score/
│   ├── spots/
│   └── weather/
├── data/
├── hooks/
├── services/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```