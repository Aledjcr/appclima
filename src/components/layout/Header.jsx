export default function Header({ sport, onLocate, locationStatus }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand__mark" aria-hidden="true">▲</div>
        <div>
          <strong>A escalar!</strong>
      
        </div>
      </div>

      <div className="topbar__actions">
        <div className="sport-chip" title="El soporte para más deportes llegará después del MVP">
          <span>{sport.icon}</span>
          <span>{sport.name}</span>
        </div>
        <button className="button button--ghost" onClick={onLocate} disabled={locationStatus === 'loading'}>
          <span aria-hidden="true">⌖</span>
          {locationStatus === 'loading' ? 'Ubicando…' : 'Mi ubicación'}
        </button>
      </div>
    </header>
  )
}
